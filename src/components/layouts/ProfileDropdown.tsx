import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CACHE_SHORT, CACHE_LONG, queryKeys } from "@/lib/query-cache-policy";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCobrancaConfigurado, getPerfilEmpresa } from "@/lib/api-empresa";
import { getPerfilFuncionario } from "@/lib/api-funcionario";
import { getNomeTipoAssinatura } from "@/constants/tipoAssinatura";
import { useAuth } from "@/contexts/AuthContext";
import type { TipoUsuario } from "@/types/auth";

interface ProfileDropdownProps {
  userType: TipoUsuario;
  logout: () => void;
}

/** Empresa: primeira letra do nome (razaoSocial). Funcionário: primeira letra do primeiro nome + primeira letra do último nome. */
function getIniciais(
  userType: TipoUsuario,
  perfil: { razaoSocial?: string; nomeCompleto?: string; primeiroNome?: string; ultimoNome?: string } | undefined
): string {
  if (!perfil) return "?";
  if (userType === "EMPRESA") {
    const nome = (perfil.razaoSocial ?? "").trim();
    return nome ? nome[0].toUpperCase() : "E";
  }
  const primeiro = (perfil.primeiroNome ?? "").trim();
  const ultimo = (perfil.ultimoNome ?? "").trim();
  if (primeiro && ultimo) return (primeiro[0] + ultimo[0]).toUpperCase();
  const completo = (perfil.nomeCompleto ?? "").trim();
  if (!completo) return "?";
  const partes = completo.split(/\s+/).filter(Boolean);
  if (partes.length >= 2) return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  return partes[0][0].toUpperCase();
}

export function ProfileDropdown({ userType, logout }: ProfileDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isEmpresa = userType === "EMPRESA";
  const { usuarioId } = useAuth();
  const empresaId = isEmpresa ? (usuarioId ?? "") : "";

  const { data: perfil, isLoading } = useQuery({
    queryKey: queryKeys.perfilDropdown(userType),
    queryFn: () => (isEmpresa ? getPerfilEmpresa() : getPerfilFuncionario()),
    enabled: userType === "EMPRESA" || userType === "FUNCIONARIO",
    retry: false,
    ...CACHE_LONG,
  });

  const { data: cobrancaCfg } = useQuery({
    queryKey: queryKeys.empresa.cobranca(empresaId),
    queryFn: () => getCobrancaConfigurado(empresaId),
    enabled: isEmpresa && !!empresaId,
    ...CACHE_SHORT,
  });

  const nomePlano = useMemo(() => {
    if (!isEmpresa) return null;
    return getNomeTipoAssinatura(cobrancaCfg?.tipoAssinaturaId);
  }, [isEmpresa, cobrancaCfg?.tipoAssinaturaId]);

  const nome = isEmpresa
    ? (perfil as { razaoSocial?: string })?.razaoSocial
    : (perfil as { nomeCompleto?: string })?.nomeCompleto;
  const email = (perfil as { email?: string })?.email;
  const username = (perfil as { username?: string })?.username;
  const subtitulo = email || username || null;
  const iniciais = getIniciais(userType, perfil as Parameters<typeof getIniciais>[1]);

  return (
    <div className="flex items-center gap-2.5">
      {nome && (
        <span
          className="hidden max-w-[14rem] truncate text-sm text-muted-foreground sm:inline"
          title={nome}
        >
          {nome}
        </span>
      )}
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-landing-cta bg-muted text-sm font-medium text-muted-foreground shadow-[0_0_10px_hsl(var(--landing-cta)/0.55)] ring-offset-background transition hover:bg-muted/80 hover:text-foreground hover:shadow-[0_0_14px_hsl(var(--landing-cta)/0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-cta focus-visible:ring-offset-2"
            aria-label="Abrir perfil"
          >
            {isLoading ? (
              <User className="h-5 w-5" />
            ) : (
              <span>{iniciais}</span>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 p-0">
          <div className="px-4 pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-landing-cta bg-muted text-sm font-medium text-foreground shadow-[0_0_10px_hsl(var(--landing-cta)/0.55)]">
                {iniciais}
              </div>
              <div className="min-w-0 flex-1">
                {isLoading ? (
                  <p className="text-sm text-muted-foreground">Carregando...</p>
                ) : (
                  <>
                    <p className="truncate text-sm font-medium text-foreground">
                      {nome ?? "—"}
                    </p>
                    {subtitulo ? (
                      <p className="truncate text-xs text-muted-foreground">
                        {subtitulo}
                      </p>
                    ) : null}
                    {nomePlano ? (
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        Plano {nomePlano}
                      </p>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-muted-foreground hover:text-foreground"
        onClick={logout}
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Sair</span>
      </Button>
    </div>
  );
}
