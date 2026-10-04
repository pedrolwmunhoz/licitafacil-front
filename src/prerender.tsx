import type { ComponentType, ReactElement } from "react";
import { renderToReadableStream } from "react-dom/server";
import { Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { parse } from "node-html-parser";

type PrerenderData = { url: string };

type HeadElement = {
  type: string;
  props: Record<string, string>;
  children?: string;
};

type PageLoader = () => Promise<{ default: ComponentType }>;

function noop() {}

function createMatchMedia(query: string): MediaQueryList {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: noop,
    removeListener: noop,
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: () => false,
  } as MediaQueryList;
}

function createClassList(attrs: Map<string, string>) {
  const read = () => (attrs.get("class") ?? "").split(/\s+/).filter(Boolean);
  const write = (parts: string[]) => {
    attrs.set("class", parts.join(" "));
  };
  return {
    get value() {
      return attrs.get("class") ?? "";
    },
    set value(v: string) {
      attrs.set("class", v);
    },
    add: (...tokens: string[]) => {
      const next = new Set(read());
      for (const t of tokens) next.add(t);
      write([...next]);
    },
    remove: (...tokens: string[]) => {
      const drop = new Set(tokens);
      write(read().filter((t) => !drop.has(t)));
    },
    toggle: (token: string, force?: boolean) => {
      const has = read().includes(token);
      const on = force ?? !has;
      if (on) {
        const next = new Set(read());
        next.add(token);
        write([...next]);
      } else {
        write(read().filter((t) => t !== token));
      }
      return on;
    },
    contains: (token: string) => read().includes(token),
  };
}

/** Elemento DOM mínimo para libs que tocam document no SSR (ex.: next-themes). */
function createDomStub(tagName = "div", extra: Record<string, unknown> = {}) {
  const attrs = new Map<string, string>();
  const style: Record<string, string> = {};
  return {
    tagName: tagName.toUpperCase(),
    nodeType: 1,
    style,
    classList: createClassList(attrs),
    getAttribute: (name: string) => attrs.get(name) ?? null,
    setAttribute: (name: string, value: string) => {
      attrs.set(name, String(value));
    },
    removeAttribute: (name: string) => {
      attrs.delete(name);
    },
    hasAttribute: (name: string) => attrs.has(name),
    appendChild: <T extends Node>(n: T) => n,
    removeChild: <T extends Node>(n: T) => n,
    insertBefore: <T extends Node>(n: T) => n,
    contains: () => false,
    remove: noop,
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: () => false,
    focus: noop,
    blur: noop,
    click: noop,
    getBoundingClientRect: () => ({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
      toJSON: () => ({}),
    }),
    ...extra,
  };
}

/**
 * Stub de browser para o prerender no Node.
 * Nunca apontar `window = globalThis`: isso faz `typeof window !== "undefined"`
 * passar sem ter APIs de DOM (ex.: dispatchEvent) e quebra libs no SSR.
 */
function ensureSsrGlobals() {
  const g = globalThis as typeof globalThis & {
    window?: Window;
    document?: Document;
    navigator?: Navigator;
    localStorage?: Storage;
    IntersectionObserver?: typeof IntersectionObserver;
    ResizeObserver?: typeof ResizeObserver;
    MutationObserver?: typeof MutationObserver;
    getComputedStyle?: typeof getComputedStyle;
  };

  if (typeof g.localStorage === "undefined") {
    const store = new Map<string, string>();
    g.localStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
      clear: () => store.clear(),
      key: (index: number) => Array.from(store.keys())[index] ?? null,
      get length() {
        return store.size;
      },
    };
  }

  const needsDocument =
    typeof g.document === "undefined" ||
    typeof (g.document as Document).documentElement?.getAttribute !== "function";

  if (needsDocument) {
    const body = createDomStub("body");
    const head = createDomStub("head");
    const documentElement = createDomStub("html", { lang: "pt-BR" });
    g.document = {
      body,
      head,
      documentElement,
      createElement: (tag: string) => createDomStub(tag),
      createElementNS: (_ns: string, tag: string) => createDomStub(tag),
      createTextNode: (text: string) => ({ textContent: text, nodeType: 3 }),
      createComment: () => ({ nodeType: 8 }),
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementsByTagName: () => [],
      getElementsByClassName: () => [],
      addEventListener: noop,
      removeEventListener: noop,
      dispatchEvent: () => false,
      visibilityState: "visible",
      hidden: false,
      readyState: "complete",
      cookie: "",
    } as unknown as Document;
  }

  if (typeof g.window === "undefined" || typeof g.window.dispatchEvent !== "function") {
    const win = {
      ...g,
      document: g.document,
      localStorage: g.localStorage,
      navigator: g.navigator ?? ({ userAgent: "ssr" } as Navigator),
      location: { href: "http://localhost/", pathname: "/", search: "", hash: "" },
      history: { replaceState: noop, pushState: noop },
      matchMedia: createMatchMedia,
      requestAnimationFrame: (cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 0) as unknown as number,
      cancelAnimationFrame: (id: number) => clearTimeout(id),
      getComputedStyle: () =>
        ({
          getPropertyValue: () => "",
        }) as unknown as CSSStyleDeclaration,
      addEventListener: noop,
      removeEventListener: noop,
      dispatchEvent: () => false,
      CustomEvent: class CustomEvent<T = unknown> {
        type: string;
        detail: T | undefined;
        constructor(type: string, init?: CustomEventInit<T>) {
          this.type = type;
          this.detail = init?.detail;
        }
      },
      Event: class Event {
        type: string;
        constructor(type: string) {
          this.type = type;
        }
      },
      innerWidth: 1280,
      innerHeight: 720,
      scrollY: 0,
      scrollX: 0,
      pageYOffset: 0,
      devicePixelRatio: 1,
    };
    g.window = win as unknown as typeof window;
  } else if (g.document) {
    // Mantém window.document alinhado se o document foi recriado.
    (g.window as Window & { document: Document }).document = g.document;
  }

  if (typeof g.IntersectionObserver === "undefined") {
    g.IntersectionObserver = class {
      observe = noop;
      unobserve = noop;
      disconnect = noop;
      takeRecords = () => [];
      root = null;
      rootMargin = "";
      thresholds = [];
      constructor(_cb?: IntersectionObserverCallback, _opts?: IntersectionObserverInit) {}
    } as unknown as typeof IntersectionObserver;
  }

  if (typeof g.ResizeObserver === "undefined") {
    g.ResizeObserver = class {
      observe = noop;
      unobserve = noop;
      disconnect = noop;
      constructor(_cb?: ResizeObserverCallback) {}
    } as unknown as typeof ResizeObserver;
  }

  if (typeof g.MutationObserver === "undefined") {
    g.MutationObserver = class {
      observe = noop;
      disconnect = noop;
      takeRecords = () => [];
      constructor(_cb?: MutationCallback) {}
    } as unknown as typeof MutationObserver;
  }

  if (typeof g.getComputedStyle !== "function") {
    g.getComputedStyle = () =>
      ({
        getPropertyValue: () => "",
      }) as unknown as CSSStyleDeclaration;
  }
}

/** Só a página da URL — sem árvore de rotas no client entry. */
const PAGE_LOADERS: Record<string, { load: PageLoader; shell: "plain" | "auth"; pattern?: string }> = {
  "/": { load: () => import("./pages/Index"), shell: "plain" },
  "/login": { load: () => import("./pages/auth/LoginPage"), shell: "auth" },
  "/logint": { load: () => import("./pages/auth/LogintPage"), shell: "auth" },
  "/recuperar-senha": { load: () => import("./pages/auth/RecuperarSenhaPage"), shell: "auth" },
  "/cadastro": { load: () => import("./pages/CadastroPage"), shell: "auth" },
  "/cobranca/concluido": { load: () => import("./pages/CobrancaConcluidoPage"), shell: "auth" },
  "/sobre": { load: () => import("./pages/legal/SobrePage"), shell: "plain" },
  "/privacidade": { load: () => import("./pages/legal/PrivacidadePage"), shell: "plain" },
  "/termos": { load: () => import("./pages/legal/TermosPage"), shell: "plain" },
  "/exclusao-conta": { load: () => import("./pages/legal/ExclusaoContaPage"), shell: "plain" },
  "/precos": { load: () => import("./pages/marketing/PrecosSeoPage"), shell: "plain" },
  "/perguntas-frequentes": { load: () => import("./pages/marketing/PerguntasFrequentesPage"), shell: "plain" },
  "/documentacao": { load: () => import("./pages/marketing/DocumentacaoPage"), shell: "plain" },
  "/blog": { load: () => import("./pages/marketing/BlogIndexPage"), shell: "plain" },
  "/calculadoras": { load: () => import("./pages/marketing/CalculadorasIndexPage"), shell: "plain" },
  "/calculadoras/hora-extra": { load: () => import("./pages/marketing/CalculadoraHoraExtraPage"), shell: "plain" },
  "/calculadoras/horas-noturnas": {
    load: () => import("./pages/marketing/CalculadoraHorasNoturnasPage"),
    shell: "plain",
  },
  "/calculadoras/ferias": { load: () => import("./pages/marketing/CalculadoraFeriasPage"), shell: "plain" },
  "/calculadoras/ferias-empregada-domestica": {
    load: () => import("./pages/marketing/CalculadoraFeriasEmpregadaDomesticaPage"),
    shell: "plain",
  },
  "/calculadoras/folha-de-pagamento": {
    load: () => import("./pages/marketing/CalculadoraFolhaDePagamentoPage"),
    shell: "plain",
  },
  "/calculadoras/imposto-de-renda": {
    load: () => import("./pages/marketing/CalculadoraImpostoDeRendaPage"),
    shell: "plain",
  },
  "/calculadoras/inss": {
    load: () => import("./pages/marketing/CalculadoraInssPage"),
    shell: "plain",
  },
  "/calculadoras/fgts": {
    load: () => import("./pages/marketing/CalculadoraFgtsPage"),
    shell: "plain",
  },
  "/ponto-eletronico-para-construcao": {
    load: () => import("./pages/marketing/PontoEletronicoParaConstrucaoPage"),
    shell: "plain",
  },
  "/ponto-eletronico-para-clinicas": {
    load: () => import("./pages/marketing/PontoEletronicoParaClinicasPage"),
    shell: "plain",
  },
  "/ponto-eletronico-para-varejo": {
    load: () => import("./pages/marketing/PontoEletronicoParaVarejoPage"),
    shell: "plain",
  },
  "/ponto-eletronico-para-industria": {
    load: () => import("./pages/marketing/PontoEletronicoParaIndustriaPage"),
    shell: "plain",
  },
  "/ponto-eletronico-empregada-domestica": {
    load: () => import("./pages/marketing/PontoEletronicoEmpregadaDomesticaPage"),
    shell: "plain",
  },
  "/ponto-eletronico-para-transportes": {
    load: () => import("./pages/marketing/PontoEletronicoParaTransportesPage"),
    shell: "plain",
  },
  "/ponto-eletronico-para-contabilidades": {
    load: () => import("./pages/marketing/PontoEletronicoParaContabilidadesPage"),
    shell: "plain",
  },
  "/ponto-eletronico-para-restaurantes": {
    load: () => import("./pages/marketing/PontoEletronicoParaRestaurantesPage"),
    shell: "plain",
  },
  "/ponto-eletronico-para-escolas": {
    load: () => import("./pages/marketing/PontoEletronicoParaEscolasPage"),
    shell: "plain",
  },
  "/ponto-eletronico-para-condominios": {
    load: () => import("./pages/marketing/PontoEletronicoParaCondominiosPage"),
    shell: "plain",
  },
  "/ponto-eletronico-para-saloes": {
    load: () => import("./pages/marketing/PontoEletronicoParaSaloesPage"),
    shell: "plain",
  },
  "/ponto-eletronico-para-call-center": {
    load: () => import("./pages/marketing/PontoEletronicoParaCallCenterPage"),
    shell: "plain",
  },
  "/ponto-eletronico-para-hoteis": {
    load: () => import("./pages/marketing/PontoEletronicoParaHoteisPage"),
    shell: "plain",
  },
  "/ponto-eletronico-para-advocacia": {
    load: () => import("./pages/marketing/PontoEletronicoParaAdvocaciaPage"),
    shell: "plain",
  },
  "/ponto-eletronico-para-franquias": {
    load: () => import("./pages/marketing/PontoEletronicoParaFranquiasPage"),
    shell: "plain",
  },
  "/calculadoras/folha-de-ponto": {
    load: () => import("./pages/marketing/CalculadoraFolhaDePontoPage"),
    shell: "plain",
  },
  "/calculadoras/domingo-trabalhado": {
    load: () => import("./pages/marketing/CalculadoraDomingoTrabalhadoPage"),
    shell: "plain",
  },
  "/calculadoras/feriado-trabalhado": {
    load: () => import("./pages/marketing/CalculadoraFeriadoTrabalhadoPage"),
    shell: "plain",
  },
  "/calculadoras/banco-de-horas": {
    load: () => import("./pages/marketing/CalculadoraBancoDeHorasPage"),
    shell: "plain",
  },
  "/calculadoras/custo-ponto-eletronico": {
    load: () => import("./pages/marketing/CalculadoraCustoPontoPage"),
    shell: "plain",
  },
  "/segmentos": { load: () => import("./pages/marketing/SegmentosPage"), shell: "plain" },
};

const blogPageLoaders = import.meta.glob("./pages/marketing/blog-posts/*Page.tsx");

async function resolvePage(pathname: string) {
  if (pathname.startsWith("/blog/") && pathname !== "/blog") {
    const slug = pathname.slice("/blog/".length);
    const loader = blogPageLoaders[`./pages/marketing/blog-posts/${slug}Page.tsx`];
    if (!loader) {
      const mod = await import("./pages/NotFound");
      return { Page: mod.default, pathPattern: "*", shell: "plain" as const };
    }
    const mod = (await loader()) as { default: ComponentType };
    return { Page: mod.default, pathPattern: pathname, shell: "plain" as const };
  }
  const entry = PAGE_LOADERS[pathname];
  if (!entry) {
    const mod = await import("./pages/NotFound");
    return { Page: mod.default, pathPattern: "*", shell: "plain" as const };
  }
  const mod = await entry.load();
  return { Page: mod.default, pathPattern: pathname, shell: entry.shell };
}

function helmetHtmlToHeadElements(helmet: HelmetServerState): Set<HeadElement> {
  const elements = new Set<HeadElement>();
  const chunks = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ].join("");
  const root = parse(`<wrap>${chunks}</wrap>`);
  root.querySelectorAll("meta").forEach((node) => {
    elements.add({ type: "meta", props: { ...node.attributes } });
  });
  root.querySelectorAll("link").forEach((node) => {
    elements.add({ type: "link", props: { ...node.attributes } });
  });
  root.querySelectorAll("script").forEach((node) => {
    const props: Record<string, string> = { ...node.attributes };
    const children = node.text?.trim();
    elements.add(children ? { type: "script", props, children } : { type: "script", props });
  });
  return elements;
}

function titleFromHelmet(helmet: HelmetServerState): string | undefined {
  const node = parse(helmet.title.toString()).querySelector("title");
  return node?.text?.trim() || undefined;
}

async function renderToHtml(element: ReactElement): Promise<string> {
  const stream = await renderToReadableStream(element);
  await stream.allReady;
  return new Response(stream).text();
}

export async function prerender(data: PrerenderData) {
  ensureSsrGlobals();
  const location = data.url.startsWith("/") ? data.url : `/${data.url}`;
  const pathname = location.split("?")[0] || "/";
  const { Page, pathPattern, shell } = await resolvePage(pathname);

  const helmetContext: { helmet?: HelmetServerState } = {};

  const tree: ReactElement =
    shell === "auth" ? (
      await (async () => {
        const { default: AuthAdjacentShell } = await import("./apps/AuthAdjacentShell");
        return (
          <Routes>
            <Route element={<AuthAdjacentShell />}>
              <Route path={pathPattern} element={<Page />} />
            </Route>
          </Routes>
        );
      })()
    ) : (
      <Routes>
        <Route path={pathPattern} element={<Page />} />
      </Routes>
    );

  const html = await renderToHtml(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={location}>{tree}</StaticRouter>
    </HelmetProvider>,
  );

  const helmet = helmetContext.helmet;
  if (!helmet) return { html };

  return {
    html,
    head: {
      lang: "pt-BR",
      title: titleFromHelmet(helmet),
      elements: helmetHtmlToHeadElements(helmet),
    },
  };
}
