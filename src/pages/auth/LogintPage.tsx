import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import type { SessaoWebResponse } from "@/types/auth";
import { PageSeo } from "@/components/seo/PageSeo";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";

/**
 * Onboarding / CRM: abre sessão via token em `?redirect=` (link emitido pela equipe).
 * Não é fluxo de recuperação de senha.
 */
export default function LogintPage() {
  const [searchParams] = useSearchParams();
  const { applyLoginResponse } = useAuth();
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("redirect");
    if (!token?.trim()) {
      setErro("Este link está incompleto. Use o link completo enviado pela equipe.");
      return;
    }

    let cancelado = false;
    (async () => {
      try {
        const r = await api.post<SessaoWebResponse>("/api/pub/auth/magic-link/redeem", { token: token.trim() });
        if (cancelado) return;
        applyLoginResponse(r.data);
      } catch {
        if (cancelado) return;
        setErro("Não foi possível abrir seu acesso. O link pode ter expirado ou já ter sido usado.");
      }
    })();

    return () => {
      cancelado = true;
    };
  }, [searchParams, applyLoginResponse]);

  const seo = <PageSeo {...PUBLIC_PAGE_SEO.logint} />;

  if (erro) {
    return (
      <>
        {seo}
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-muted-foreground max-w-md">{erro}</p>
          <Link to="/login" className="text-primary underline underline-offset-4">
            Ir para o login
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      {seo}
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 px-4 text-center">
        <p className="text-foreground font-medium">Abrindo seu acesso…</p>
        <p className="text-sm text-muted-foreground">Aguarde um instante.</p>
      </div>
    </>
  );
}
