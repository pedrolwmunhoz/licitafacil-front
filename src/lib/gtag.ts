/** ID da conta Google Ads (tag global). */
export const GTAG_AW_ID = "AW-18190542566";

/** Conversão "Compra confirmada - SegPonto" (Google Ads). */
export const GTAG_CONVERSION_COMPRA_CONFIRMADA = "AW-18190542566/QtqpCJTN6LMcEObN9uFD";

const GTAG_SCRIPT_SRC = `https://www.googletagmanager.com/gtag/js?id=${GTAG_AW_ID}`;

let loadPromise: Promise<void> | null = null;
let resolveLoad: (() => void) | null = null;
let scriptInjected = false;
let idleArmed = false;

function installGtagStub(): void {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // Mesmo contrato do snippet oficial (Arguments, não array).
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
}

function injectGtagScript(): void {
  if (scriptInjected) return;
  scriptInjected = true;
  installGtagStub();

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${GTAG_SCRIPT_SRC}"]`);
  if (existing) {
    window.gtag!("js", new Date());
    window.gtag!("config", GTAG_AW_ID);
    resolveLoad?.();
    resolveLoad = null;
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = GTAG_SCRIPT_SRC;
  script.onload = () => {
    window.gtag!("js", new Date());
    window.gtag!("config", GTAG_AW_ID);
    resolveLoad?.();
    resolveLoad = null;
  };
  script.onerror = () => {
    resolveLoad?.();
    resolveLoad = null;
  };
  document.head.appendChild(script);
}

function armIdleLoad(): void {
  if (idleArmed || scriptInjected) return;
  idleArmed = true;

  const afterLoad = () => {
    const ric = window.requestIdleCallback;
    if (typeof ric === "function") {
      ric(() => injectGtagScript(), { timeout: 4000 });
    } else {
      window.setTimeout(() => injectGtagScript(), 1);
    }
  };

  if (document.readyState === "complete") afterLoad();
  else window.addEventListener("load", afterLoad, { once: true });
}

/**
 * Carrega gtag fora do critical path (após `load` + idle).
 * `urgent: true` injeta na hora (page_path / conversão).
 */
export function ensureGtagLoaded(options?: { urgent?: boolean }): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (!loadPromise) {
    loadPromise = new Promise<void>((resolve) => {
      resolveLoad = resolve;
    });
  }

  if (scriptInjected) return loadPromise;

  if (options?.urgent) {
    injectGtagScript();
  } else {
    armIdleLoad();
  }

  return loadPromise;
}

/** Agenda carga preguiçosa (chamar no boot da página). */
export function scheduleGtagIdleLoad(): void {
  void ensureGtagLoaded({ urgent: false });
}

/** Envia page view após garantir que a tag existe. */
export function gtagSendPagePath(pagePath: string): void {
  if (typeof window === "undefined") return;
  void ensureGtagLoaded({ urgent: true }).then(() => {
    window.gtag?.("config", GTAG_AW_ID, { page_path: pagePath });
  });
}

/**
 * Conversão Google Ads genérica — `send_to` no formato `AW-XXX/YYY`.
 * Carrega a tag na hora se ainda não estiver no ar.
 */
export function gtagSendConversion(
  sendTo: string,
  options?: { value?: number; currency?: string; transaction_id?: string },
): void {
  if (typeof window === "undefined") return;
  const payload: Record<string, unknown> = { send_to: sendTo };
  if (options?.value != null) payload.value = options.value;
  if (options?.currency != null) payload.currency = options.currency;
  if (options?.transaction_id != null && options.transaction_id !== "") {
    payload.transaction_id = options.transaction_id;
  }
  void ensureGtagLoaded({ urgent: true }).then(() => {
    window.gtag?.("event", "conversion", payload);
  });
}

/** Dispara conversão de compra confirmada (após pagamento validado no servidor). */
export function gtagSendCompraConfirmada(options: {
  value?: number;
  transaction_id: string;
}): void {
  if (!options.transaction_id) return;
  gtagSendConversion(GTAG_CONVERSION_COMPRA_CONFIRMADA, {
    value: options.value ?? 1.0,
    currency: "BRL",
    transaction_id: options.transaction_id,
  });
}
