import { useEffect, useRef, useState, type RefObject } from "react";
import { registrarMetrica } from "@/lib/api-blog";

/** Distância do topo em que um H2 passa a ser a seção atual (abaixo do header fixo). */
const LINHA_SECAO_ATUAL = 160;
const INTERVALO_METRICA_MS = 2_000;

/**
 * Barra de leitura, seção atual do sumário e métrica do post.
 * A cada 2s (e ao sair) envia tempo na página + % máximo da barra ao backend.
 */
export function useBlogLeitura(slug: string, artigo: RefObject<HTMLElement>, ancoras: string[]) {
  const [progresso, setProgresso] = useState(0);
  const [ancoraAtual, setAncoraAtual] = useState(ancoras[0] ?? "");
  const maiorPercentualLido = useRef(0);
  const sessaoId = useRef(crypto.randomUUID());

  useEffect(() => {
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      const rolavel = document.documentElement.scrollHeight - window.innerHeight;
      const pctBarra = rolavel > 0 ? Math.min(100, Math.round((window.scrollY / rolavel) * 100)) : 0;
      setProgresso(pctBarra);

      const el = artigo.current;
      if (el) {
        const caixa = el.getBoundingClientRect();
        const lido = ((window.innerHeight - caixa.top) / caixa.height) * 100;
        const pctArtigo = Math.min(100, Math.max(0, Math.round(lido)));
        maiorPercentualLido.current = Math.max(maiorPercentualLido.current, pctBarra, pctArtigo);
      } else {
        maiorPercentualLido.current = Math.max(maiorPercentualLido.current, pctBarra);
      }

      let atual = ancoras[0] ?? "";
      for (const id of ancoras) {
        const h2 = document.getElementById(id);
        if (h2 && h2.getBoundingClientRect().top < LINHA_SECAO_ATUAL) atual = id;
      }
      setAncoraAtual(atual);
    };
    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, [artigo, ancoras]);

  useEffect(() => {
    sessaoId.current = crypto.randomUUID();
    maiorPercentualLido.current = 0;
    const inicio = Date.now();

    const enviar = () => {
      const segundos = Math.min(86_400, Math.round((Date.now() - inicio) / 1000));
      registrarMetrica(slug, sessaoId.current, segundos, maiorPercentualLido.current).catch(() => undefined);
    };

    const intervalo = window.setInterval(() => {
      if (document.visibilityState === "visible") enviar();
    }, INTERVALO_METRICA_MS);

    const aoMudarVisibilidade = () => {
      if (document.visibilityState === "hidden") enviar();
    };
    document.addEventListener("visibilitychange", aoMudarVisibilidade);
    window.addEventListener("pagehide", enviar);

    return () => {
      window.clearInterval(intervalo);
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
      window.removeEventListener("pagehide", enviar);
      enviar();
    };
  }, [slug]);

  return { progresso, ancoraAtual };
}
