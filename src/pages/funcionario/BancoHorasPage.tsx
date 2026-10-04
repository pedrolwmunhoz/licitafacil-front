import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FileDown, Loader2 } from "lucide-react";
import { BancoHorasDetalheView } from "@/components/banco-horas/BancoHorasDetalheView";
import { ModalDetalharJornada } from "@/components/ponto/ModalDetalharJornada";
import { Button } from "@/components/ui/button";
import {
  getPerfilEmpresaDoFuncionario,
  getPerfilFuncionario,
  listarMeuPonto,
  resumoBancoHorasFuncionario,
} from "@/lib/api-funcionario";
import { exportarBancoHorasPdf } from "@/lib/banco-horas-export";
import {
  formatDataLonga,
  movimentacoesFromResumo,
  type MovimentacaoBh,
} from "@/lib/banco-horas-ui";
import { useToast } from "@/hooks/use-toast";
import { CACHE_MEDIUM, CACHE_LONG, queryKeys } from "@/lib/query-cache-policy";
import { useAuth } from "@/contexts/AuthContext";
import type { PontoDiaResponse } from "@/types/empresa";

export default function BancoHorasPage() {
  const hoje = new Date();
  const { toast } = useToast();
  const { usuarioId: userId } = useAuth();
  const [ano, setAno] = useState(hoje.getFullYear());
  const [mes, setMes] = useState(hoje.getMonth() + 1);
  const [jornadaModal, setJornadaModal] = useState<PontoDiaResponse | null>(null);
  const [pdfPending, setPdfPending] = useState(false);

  const { data: perfil } = useQuery({
    queryKey: queryKeys.funcionario.perfil(),
    queryFn: getPerfilFuncionario,
    enabled: !!userId,
    ...CACHE_LONG,
  });

  const { data: perfilEmpresa } = useQuery({
    queryKey: queryKeys.funcionario.empresaPerfil(),
    queryFn: getPerfilEmpresaDoFuncionario,
    enabled: !!userId,
    ...CACHE_LONG,
  });

  const nomeExibicao =
    perfil?.nomeCompleto?.trim() ||
    [perfil?.primeiroNome, perfil?.ultimoNome].filter(Boolean).join(" ").trim() ||
    "Funcionário";

  const { data: saldoAtual, isLoading: saldoLoading } = useQuery({
    queryKey: queryKeys.funcionario.bancoHorasTudo(),
    queryFn: () => resumoBancoHorasFuncionario({ periodo: "TUDO" }),
    enabled: !!userId,
    ...CACHE_MEDIUM,
  });

  const { data: resumoPeriodo, isLoading: resumoLoading } = useQuery({
    queryKey: queryKeys.funcionario.bancoHorasMensal(ano, mes),
    queryFn: () => resumoBancoHorasFuncionario({ periodo: "MENSAL", ano, mes }),
    enabled: !!userId,
    ...CACHE_MEDIUM,
  });

  const { data: pontoData } = useQuery({
    queryKey: queryKeys.funcionario.pontoBh(userId!, ano, mes),
    queryFn: () => listarMeuPonto(userId!, ano, mes, 0, 100),
    enabled: !!userId,
    ...CACHE_MEDIUM,
  });

  const movimentacoes = useMemo(
    () => movimentacoesFromResumo(resumoPeriodo?.movimentacoes, pontoData?.jornadas),
    [resumoPeriodo?.movimentacoes, pontoData?.jornadas]
  );

  const shiftMes = (delta: number) => {
    const d = new Date(ano, mes - 1 + delta, 1);
    setAno(d.getFullYear());
    setMes(d.getMonth() + 1);
  };

  const hojeLabel = formatDataLonga(
    `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`
  );

  const onSelectMov = (m: MovimentacaoBh) => {
    if (m.jornada) setJornadaModal(m.jornada);
  };

  const handleGerarPdf = async () => {
    if (pdfPending) return;
    setPdfPending(true);
    try {
      await exportarBancoHorasPdf({
        empresa: {
          razaoSocial: perfilEmpresa?.razaoSocial,
          cnpj: perfilEmpresa?.cnpj,
          email: perfilEmpresa?.email,
          rua: perfilEmpresa?.rua,
          numeroEndereco: perfilEmpresa?.numeroEndereco,
          complemento: perfilEmpresa?.complemento ?? undefined,
          bairro: perfilEmpresa?.bairro,
          cidade: perfilEmpresa?.cidade,
          uf: perfilEmpresa?.uf,
          cep: perfilEmpresa?.cep,
        },
        funcionario: {
          nome: nomeExibicao,
          cpf: perfil?.cpf,
          matricula: perfil?.matricula,
          email: perfil?.email,
        },
        ano,
        mes,
        hojeLabel,
        saldoAtual,
        resumoPeriodo,
        movimentacoes,
        fileName: `banco-horas-${ano}-${String(mes).padStart(2, "0")}`,
      });
      toast({ title: "PDF salvo" });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro ao gerar PDF",
        description: err instanceof Error ? err.message : "Tente novamente.",
      });
    } finally {
      setPdfPending(false);
    }
  };

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Banco de horas</h1>
          <p className="text-sm text-muted-foreground">
            Saldo e movimentações pela escala, feriados, férias e afastamentos.
          </p>
        </div>
        {userId ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            disabled={pdfPending || resumoLoading}
            onClick={() => void handleGerarPdf()}
          >
            {pdfPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileDown className="h-4 w-4" />
            )}
            Gerar PDF
          </Button>
        ) : null}
      </div>

      {!userId && (
        <div className="py-8 text-center text-sm text-muted-foreground">
          Sessão inválida. Faça login novamente.
        </div>
      )}

      {userId && (
        <BancoHorasDetalheView
          saldoAtual={saldoAtual}
          saldoLoading={saldoLoading}
          resumoPeriodo={resumoPeriodo}
          resumoLoading={resumoLoading}
          ano={ano}
          mes={mes}
          onPrevMes={() => shiftMes(-1)}
          onNextMes={() => shiftMes(1)}
          hojeLabel={hojeLabel}
          movimentacoes={movimentacoes}
          movLoading={resumoLoading}
          onSelectMov={onSelectMov}
          escala={resumoPeriodo?.escala}
        />
      )}

      <ModalDetalharJornada
        open={!!jornadaModal}
        onOpenChange={(open) => {
          if (!open) setJornadaModal(null);
        }}
        jornada={jornadaModal}
        modo="funcionario"
        timezone={pontoData?.timezone}
        documentoEmpresa={{
          razaoSocial: perfilEmpresa?.razaoSocial,
          cnpj: perfilEmpresa?.cnpj,
          email: perfilEmpresa?.email,
          rua: perfilEmpresa?.rua,
          numeroEndereco: perfilEmpresa?.numeroEndereco,
          complemento: perfilEmpresa?.complemento ?? undefined,
          bairro: perfilEmpresa?.bairro,
          cidade: perfilEmpresa?.cidade,
          uf: perfilEmpresa?.uf,
          cep: perfilEmpresa?.cep,
        }}
        documentoFuncionario={{
          nome: nomeExibicao,
          cpf: perfil?.cpf,
          matricula: perfil?.matricula,
          email: perfil?.email,
        }}
        onRemover={() => undefined}
        onAdicionarRegistro={() => undefined}
      />
    </div>
  );
}
