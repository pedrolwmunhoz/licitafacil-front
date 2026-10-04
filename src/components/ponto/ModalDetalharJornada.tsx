import { useMemo, useState } from "react";
import { Plus, Trash2, Pencil, FileDown, History, Clock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ModalHistoricoCartaoPonto } from "@/components/ponto/ModalHistoricoCartaoPonto";
import { intervaloDaJornada } from "@/components/ponto/intervalo-cartao-ponto";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PontoDiaResponse } from "@/types/empresa";
import { assinarComprovanteJornada } from "@/lib/api-funcionario";
import { dataIsoFromHorario, formatDataCurtaIso, jornadaAtravessaOutroDia } from "@/lib/espelho-ui";
import {
  appendAssinaturaDigitalPage,
  exportarComprovanteJornadaPdf,
  slotLabelEspelho,
  type EspelhoDocumentoEmpresa,
  type EspelhoDocumentoFuncionario,
} from "@/lib/espelho-export";
import { cn, formatData as formatDataUtil, formatHora, getBrowserTimezone } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { InconsistenciasHoverPopover } from "./InconsistenciasHoverPopover";
import { CoordenadasHoverPopover } from "./CoordenadasHoverPopover";

function formatData(horario: string, _tz: string): string {
  return formatDataUtil(horario) || "";
}

function formatHorario(horario: string, _tz: string): string {
  return formatHora(horario, undefined, true);
}

function formatStatusLabel(status: string | null | undefined): string {
  const s = (status ?? "normal").toLowerCase();
  if (s === "em_aberto") return "Em aberto";
  if (s === "inconsistente") return "Inconsistente";
  if (s === "falta") return "Falta";
  return status ?? "Normal";
}

function statusBadgeClass(status: string | null | undefined): string {
  const s = (status ?? "normal").toLowerCase();
  if (s === "normal") {
    return "bg-emerald-500/15 text-emerald-900 ring-1 ring-emerald-500/25 dark:text-emerald-100";
  }
  if (s === "em_aberto") {
    return "bg-sky-500/15 text-sky-950 ring-1 ring-sky-500/25 dark:text-sky-100";
  }
  if (s === "inconsistente" || s === "falta") {
    return "bg-amber-500/15 text-amber-950 ring-1 ring-amber-500/30 dark:text-amber-100";
  }
  return "bg-muted text-muted-foreground ring-1 ring-border";
}

function subtituloJornada(data: string | undefined, diaSemana: string | undefined): string {
  if (!data) return "—";
  const parts = data.split("-");
  if (parts.length !== 3) return data;
  const [y, mo, d] = parts;
  const dataFmt = `${d}/${mo}/${y}`;
  return diaSemana ? `${diaSemana} · ${dataFmt}` : dataFmt;
}

export type ModalDetalharJornadaModo = "empresa" | "funcionario";

export interface ModalDetalharJornadaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jornada: PontoDiaResponse | null;
  modo: ModalDetalharJornadaModo;
  onRemover: (registroId: string) => void;
  onAdicionarRegistro: () => void;
  onEditar?: (registroId: string) => void;
  timezone?: string;
  funcionarioId?: string;
  /** Dados para o PDF no mesmo formato do espelho */
  documentoEmpresa?: EspelhoDocumentoEmpresa;
  documentoFuncionario?: EspelhoDocumentoFuncionario;
  jornadaLabel?: string;
}

export function ModalDetalharJornada({
  open,
  onOpenChange,
  jornada,
  modo,
  onRemover,
  onAdicionarRegistro,
  onEditar,
  timezone: timezoneProp,
  funcionarioId: funcionarioIdProp,
  documentoEmpresa,
  documentoFuncionario,
  jornadaLabel,
}: ModalDetalharJornadaProps) {
  const tz = timezoneProp ?? getBrowserTimezone();
  const { toast } = useToast();
  const [historicoCartaoOpen, setHistoricoCartaoOpen] = useState(false);
  const [pdfPending, setPdfPending] = useState(false);
  const { usuarioId } = useAuth();
  const funcionarioId =
    funcionarioIdProp ?? (modo === "funcionario" ? usuarioId ?? undefined : undefined);
  const intervaloHistorico = intervaloDaJornada(jornada?.marcacoes);
  const podeVerHistorico = !!funcionarioId && !!intervaloHistorico;

  const cruzaDia = useMemo(
    () => jornadaAtravessaOutroDia(jornada?.data ?? "", jornada?.marcacoes),
    [jornada?.data, jornada?.marcacoes]
  );

  const gerarPdfSemGravar = async () => {
    if (!jornada) return;
    await exportarComprovanteJornadaPdf({
      empresa: documentoEmpresa ?? {},
      funcionario: documentoFuncionario ?? { nome: "Funcionário" },
      jornada,
      jornadaLabel,
      beforeSave:
        modo === "funcionario"
          ? async (doc) => {
              try {
                const pdfArrayBuffer = doc.output("arraybuffer") as ArrayBuffer;
                const hashBuffer = await crypto.subtle.digest("SHA-256", pdfArrayBuffer);
                const hashBase64 = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
                const res = await assinarComprovanteJornada(hashBase64);
                if (
                  res?.assinaturaDigital != null &&
                  res?.certificadoSerial != null &&
                  res?.timestampAssinatura != null
                ) {
                  appendAssinaturaDigitalPage(doc, {
                    assinaturaDigital: res.assinaturaDigital,
                    certificadoSerial: res.certificadoSerial,
                    timestampAssinatura: res.timestampAssinatura,
                  });
                }
              } catch {
                // sem certificado: segue sem assinatura
              }
            }
          : undefined,
    });
  };

  const handleGerarPdf = async () => {
    if (!jornada || pdfPending) return;
    setPdfPending(true);
    try {
      await gerarPdfSemGravar();
      toast({ title: "PDF gerado", description: "Comprovante baixado." });
    } finally {
      setPdfPending(false);
    }
  };

  const statusLabel = formatStatusLabel(jornada?.status);
  const marcacoes = jornada?.marcacoes ?? [];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="flex max-h-[min(92vh,680px)] w-[min(100vw-1.5rem,28rem)] max-w-lg flex-col gap-0 overflow-hidden p-0 sm:w-full sm:max-w-xl sm:rounded-xl"
          aria-describedby="detalhar-jornada-desc"
        >
          <div className="shrink-0 border-b border-border/70 px-5 pb-4 pt-5 pr-12 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40">
                <Clock className="h-5 w-5 text-foreground/80" strokeWidth={1.75} aria-hidden />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <DialogTitle className="font-display text-lg leading-tight sm:text-xl">
                  Cartão de ponto
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {subtituloJornada(jornada?.data, jornada?.diaSemana)}
                </p>
                <DialogDescription id="detalhar-jornada-desc" className="sr-only">
                  Detalhes das batidas da jornada selecionada.
                </DialogDescription>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-md bg-muted/70 px-2 py-0.5 text-xs text-foreground ring-1 ring-border/70">
                    Total{" "}
                    <span className="font-mono font-semibold tabular-nums">
                      {jornada?.totalHoras ?? "—"}
                    </span>
                  </span>
                  {jornada?.horasEsperadas ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground ring-1 ring-border/60">
                      Esperado{" "}
                      <span className="font-mono tabular-nums">{jornada.horasEsperadas}</span>
                    </span>
                  ) : null}
                  {jornada?.saldo ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground ring-1 ring-border/60">
                      Saldo <span className="font-mono tabular-nums">{jornada.saldo}</span>
                    </span>
                  ) : null}
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                      statusBadgeClass(jornada?.status)
                    )}
                  >
                    {statusLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-medium text-foreground">Batidas</h3>
                <p className="text-xs text-muted-foreground">
                  {marcacoes.length === 0
                    ? "Nenhum registro"
                    : `${marcacoes.length} registro${marcacoes.length === 1 ? "" : "s"}`}
                  {cruzaDia ? " · atravessa meia-noite" : ""}
                </p>
              </div>
              <Button type="button" size="sm" variant="outline" className="h-8 gap-1.5" onClick={onAdicionarRegistro}>
                <Plus className="h-3.5 w-3.5" />
                {modo === "empresa" ? "Novo" : "Adicionar"}
              </Button>
            </div>

            {marcacoes.length > 0 ? (
              <ul className="overflow-hidden rounded-lg border border-border/80 divide-y divide-border/70">
                {marcacoes.map((m, i) => {
                  const dataBatida =
                    dataIsoFromHorario(m.horario) != null
                      ? formatDataCurtaIso(dataIsoFromHorario(m.horario)!)
                      : formatData(m.horario, tz);
                  return (
                    <li
                      key={m.registroId}
                      className="flex items-center gap-3 bg-background px-3 py-2.5 transition-colors hover:bg-muted/30"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/60 text-[11px] font-semibold tabular-nums text-muted-foreground">
                        {i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                          {slotLabelEspelho(i)}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="inline-flex flex-col leading-tight">
                            <span className="text-[10px] text-muted-foreground">{dataBatida}</span>
                            <span className="font-mono text-lg font-semibold tabular-nums tracking-tight">
                              {formatHorario(m.horario, tz)}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-0.5">
                        <InconsistenciasHoverPopover inconsistencias={m.inconsistencias ?? []} />
                        <CoordenadasHoverPopover
                          geoLatitude={m.geoLatitude}
                          geoLongitude={m.geoLongitude}
                        />
                        {modo === "empresa" && onEditar ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            aria-label="Editar batida"
                            onClick={() => onEditar(m.registroId)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                        ) : null}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          aria-label={modo === "funcionario" ? "Solicitar remoção" : "Excluir batida"}
                          onClick={() => onRemover(m.registroId)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="rounded-lg border border-dashed border-border px-4 py-12 text-center">
                <p className="text-sm text-muted-foreground">Nenhuma batida neste dia.</p>
                <Button type="button" size="sm" variant="secondary" className="mt-3 gap-1.5" onClick={onAdicionarRegistro}>
                  <Plus className="h-3.5 w-3.5" />
                  Registrar batida
                </Button>
              </div>
            )}
          </div>

          <DialogFooter className="shrink-0 flex-col gap-2 border-t border-border bg-muted/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <Button
              type="button"
              variant="ghost"
              className="w-full sm:w-auto"
              onClick={() => onOpenChange(false)}
            >
              Fechar
            </Button>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="w-full gap-1.5 sm:w-auto"
                disabled={!podeVerHistorico}
                onClick={() => setHistoricoCartaoOpen(true)}
              >
                <History className="h-4 w-4" />
                Histórico
              </Button>
              <Button
                type="button"
                className="w-full gap-1.5 sm:w-auto"
                disabled={pdfPending}
                onClick={() => void handleGerarPdf()}
              >
                {pdfPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
                Gerar PDF
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ModalHistoricoCartaoPonto
        open={historicoCartaoOpen}
        onOpenChange={setHistoricoCartaoOpen}
        modo={modo}
        funcionarioId={funcionarioId ?? ""}
        intervalo={intervaloHistorico}
        timezone={tz}
      />
    </>
  );
}
