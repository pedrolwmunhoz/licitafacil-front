import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageSeo } from "@/components/seo/PageSeo";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import { confirmarPagamentoCobranca } from "@/lib/api-empresa";
import { gtagSendCompraConfirmada } from "@/lib/gtag";
import { useAuth } from "@/contexts/AuthContext";
import type { CobrancaConfirmacaoResponse } from "@/types/empresa";

const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 40;

type PageState = "loading" | "aguardando" | "sucesso" | "invalido" | "timeout";

const GTAG_DEDUP_PREFIX = "segponto_gtag_compra_";

function dispararConversaoSeConfirmado(res: CobrancaConfirmacaoResponse): void {
  if (!res.confirmado || !res.transactionId) return;
  const key = GTAG_DEDUP_PREFIX + res.transactionId;
  if (sessionStorage.getItem(key)) return;
  gtagSendCompraConfirmada({
    value: res.valor ?? 1,
    transaction_id: res.transactionId,
  });
  sessionStorage.setItem(key, "1");
}

export default function CobrancaConcluidoPage() {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref");
  const [state, setState] = useState<PageState>("loading");
  const attemptsRef = useRef(0);
  const conversionSentRef = useRef(false);
  const { isAuthenticated, isCheckingSession, isSessionUnavailable } = useAuth();

  useEffect(() => {
    if (isCheckingSession) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const temAcesso = () => !!(ref?.trim() || isAuthenticated || isSessionUnavailable);

    async function verificar() {
      if (!temAcesso()) {
        if (!cancelled) setState("invalido");
        return;
      }

      try {
        const res = await confirmarPagamentoCobranca(ref);
        if (cancelled) return;

        if (res.confirmado) {
          if (!conversionSentRef.current) {
            dispararConversaoSeConfirmado(res);
            conversionSentRef.current = true;
          }
          setState("sucesso");
          return;
        }

        attemptsRef.current += 1;
        if (attemptsRef.current >= MAX_POLL_ATTEMPTS) {
          setState("timeout");
          return;
        }

        setState("aguardando");
        timer = setTimeout(verificar, POLL_INTERVAL_MS);
      } catch {
        if (cancelled) return;
        if (!temAcesso()) {
          setState("invalido");
          return;
        }
        attemptsRef.current += 1;
        if (attemptsRef.current >= MAX_POLL_ATTEMPTS) {
          setState("timeout");
          return;
        }
        setState("aguardando");
        timer = setTimeout(verificar, POLL_INTERVAL_MS);
      }
    }

    verificar();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [ref, isAuthenticated, isCheckingSession, isSessionUnavailable]);

  return (
    <>
      <PageSeo {...PUBLIC_PAGE_SEO.cobrancaConcluido} />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <main
          id="conteudo-principal"
          tabIndex={-1}
          className="bg-white rounded-2xl shadow-sm border p-10 max-w-md w-full text-center space-y-6"
        >
          {state === "loading" || state === "aguardando" ? (
            <>
              <div className="flex justify-center">
                <Loader2 className="h-16 w-16 text-primary animate-spin" aria-hidden />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">Confirmando pagamento…</h1>
                <p className="text-gray-500">
                  Aguarde enquanto validamos o pagamento com a operadora. Isso pode levar alguns segundos.
                </p>
              </div>
            </>
          ) : null}

          {state === "sucesso" ? (
            <>
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" aria-hidden />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">Pagamento realizado!</h1>
                <p className="text-gray-500">
                  Seu pagamento foi confirmado. Você já pode usar o SegPonto com o plano contratado.
                </p>
              </div>
              <Button asChild className="w-full">
                <Link to="/empresa">Ir para o painel</Link>
              </Button>
            </>
          ) : null}

          {state === "invalido" ? (
            <>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">Link inválido</h1>
                <p className="text-gray-500">
                  Esta página só pode ser acessada após concluir o pagamento no checkout. Se você acabou de pagar,
                  aguarde o e-mail de confirmação ou faça login no painel.
                </p>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link to="/login">Fazer login</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/">Voltar ao site</Link>
              </Button>
            </>
          ) : null}

          {state === "timeout" ? (
            <>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">Pagamento em processamento</h1>
                <p className="text-gray-500">
                  Ainda não recebemos a confirmação do pagamento. Se o cartão foi cobrado, aguarde alguns minutos e
                  acesse o painel ou a página de cobrança.
                </p>
              </div>
              <Button asChild className="w-full">
                <Link to="/login">Fazer login</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Voltar ao site</Link>
              </Button>
            </>
          ) : null}
        </main>
      </div>
    </>
  );
}
