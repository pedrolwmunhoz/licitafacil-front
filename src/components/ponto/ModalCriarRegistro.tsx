import { useEffect, useMemo, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useValidation } from "@/hooks/useValidation";
import { validateData, validateHorario, validateJustificativa } from "@/lib/validations";
import { FieldExpectedStatus } from "@/components/ui/field-with-expected";
import { getBrowserTimezone } from "@/lib/utils";

/** Valores iguais aos INSERT em doc/schema.sql (tipo_justificativa). */
const TIPO_JUSTIFICATIVA_OPCOES = [
  { value: "ATRASO_TRANSPORTE", label: "Atraso no transporte" },
  { value: "EMERGENCIA_MEDICA", label: "Emergência médica" },
  { value: "PROBLEMA_TECNICO", label: "Problema técnico" },
  { value: "ESQUECI_BATER", label: "Esqueci de bater o ponto" },
  { value: "AJUSTE_MANUAL", label: "Ajuste manual" },
  { value: "FALHA_SISTEMA", label: "Falha do sistema" },
  { value: "REGISTRO_DUPLICADO", label: "Registro duplicado" },
  { value: "REGISTRO_ERRADO", label: "Registro errado" },
  { value: "OUTROS", label: "Outros" },
] as const;

function formatDataPreview(dataIso: string): string {
  const [y, mo, d] = dataIso.split("-");
  if (!y || !mo || !d) return dataIso;
  return `${d}/${mo}/${y}`;
}

function formatDataLongaPreview(dataIso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataIso)) return dataIso;
  const dt = new Date(`${dataIso}T12:00:00`);
  if (Number.isNaN(dt.getTime())) return formatDataPreview(dataIso);
  const diaSemana = dt.toLocaleDateString("pt-BR", { weekday: "long" });
  const capitalizado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
  return `${capitalizado} · ${formatDataPreview(dataIso)}`;
}

export type ModalCriarRegistroVariant = "empresa" | "funcionario";

export interface ModalCriarRegistroProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    horarioUtc: string;
    timezone: string;
    justificativa: string;
    observacao?: string | null;
  }) => void;
  isLoading: boolean;
  variant: ModalCriarRegistroVariant;
  /** Data inicial (yyyy-MM-dd) */
  dataInicial?: string;
  /** Ex.: "Funcionário: João" */
  subtitulo?: string;
}

export function ModalCriarRegistro({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  variant,
  dataInicial,
  subtitulo,
}: ModalCriarRegistroProps) {
  const hoje = new Date();
  const dataHoje = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
  const timeHoje = `${String(hoje.getHours()).padStart(2, "0")}:${String(hoje.getMinutes()).padStart(2, "0")}`;

  const [data, setData] = useState(dataInicial ?? dataHoje);
  const [time, setTime] = useState(timeHoje);
  const [justificativa, setJustificativa] = useState("");
  const [observacao, setObservacao] = useState("");
  const { getError, handleBlur, handleChange, validateAll, clearAll } = useValidation();

  useEffect(() => {
    if (!open) return;
    const now = new Date();
    const d =
      dataInicial ??
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const t = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setData(d);
    setTime(t);
    setJustificativa("");
    setObservacao("");
    clearAll();
  }, [open, dataInicial, clearAll]);

  const handleSubmit = () => {
    const ok = validateAll([
      ["data", data, (v) => validateData(v, true)],
      ["time", time, (v) => validateHorario(v, true)],
      ["justificativa", justificativa, (v) => validateJustificativa(v, true)],
    ]);
    if (!ok) return;
    const timezone = getBrowserTimezone();
    const localAsUtcGuess = new Date(`${data}T${time}:00`);
    const horarioUtc = Number.isNaN(localAsUtcGuess.getTime())
      ? new Date().toISOString()
      : localAsUtcGuess.toISOString();
    onSubmit({
      horarioUtc,
      timezone,
      justificativa: justificativa.trim(),
      observacao: observacao.trim() || null,
    });
  };

  const canSubmit = !!data && !!time && !!justificativa.trim();
  const isEmpresa = variant === "empresa";

  const preview = useMemo(() => {
    if (!data || !time) return null;
    return {
      dataLabel: formatDataLongaPreview(data),
      hora: time,
    };
  }, [data, time]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[min(92vh,640px)] w-[min(100vw-1.5rem,28rem)] max-w-lg flex-col gap-0 overflow-hidden p-0 sm:w-full sm:max-w-xl sm:rounded-xl"
        aria-describedby="criar-registro-desc"
      >
        <div className="shrink-0 border-b border-border/70 px-5 pb-4 pt-5 pr-12 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40">
              <Plus className="h-5 w-5 text-foreground/80" strokeWidth={1.75} aria-hidden />
            </div>
            <div className="min-w-0 flex-1 space-y-1.5">
              <DialogTitle className="font-display text-lg leading-tight sm:text-xl">
                {isEmpresa ? "Novo registro" : "Solicitar registro"}
              </DialogTitle>
              {!isEmpresa ? (
                <DialogDescription id="criar-registro-desc" className="text-sm text-muted-foreground">
                  Envia uma solicitação para a empresa incluir a batida.
                </DialogDescription>
              ) : (
                <DialogDescription id="criar-registro-desc" className="sr-only">
                  Formulário para criar registro de ponto.
                </DialogDescription>
              )}
              {subtitulo ? (
                <p className="text-xs text-muted-foreground">{subtitulo}</p>
              ) : null}
              {preview ? (
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="inline-flex items-center rounded-md bg-muted/70 px-2 py-0.5 text-xs text-foreground ring-1 ring-border/70">
                    {preview.dataLabel}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted/40 px-2 py-0.5 font-mono text-xs font-semibold tabular-nums text-foreground ring-1 ring-border/60">
                    {preview.hora}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4 sm:px-6">
          <section className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-foreground">Quando</h3>
              <p className="text-xs text-muted-foreground">Data e horário da batida.</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="min-w-0 space-y-1.5">
                <Label required htmlFor="criar-registro-data">
                  Data
                </Label>
                <Input
                  id="criar-registro-data"
                  type="date"
                  value={data}
                  onChange={(e) => {
                    setData(e.target.value);
                    handleChange("data", e.target.value, (v) => validateData(v, true));
                  }}
                  onBlur={() => handleBlur("data", data, (v) => validateData(v, true))}
                  aria-invalid={!!getError("data")}
                  className="h-10 [color-scheme:light]"
                />
                <FieldExpectedStatus error={getError("data")} />
              </div>
              <div className="min-w-0 space-y-1.5">
                <Label required htmlFor="criar-registro-hora">
                  Horário
                </Label>
                <Input
                  id="criar-registro-hora"
                  type="time"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    handleChange("time", e.target.value, (v) => validateHorario(v, true));
                  }}
                  onBlur={() => handleBlur("time", time, (v) => validateHorario(v, true))}
                  aria-invalid={!!getError("time")}
                  className="h-10 font-mono tabular-nums [color-scheme:light]"
                />
                <FieldExpectedStatus error={getError("time")} />
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-foreground">Motivo</h3>
              <p className="text-xs text-muted-foreground">
                Justificativa {isEmpresa ? "do ajuste" : "da solicitação"}.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label required>Tipo</Label>
              <Select
                value={justificativa || undefined}
                onValueChange={(v) => {
                  setJustificativa(v);
                  handleChange("justificativa", v, (x) => validateJustificativa(x, true));
                }}
              >
                <SelectTrigger
                  className="h-10 w-full"
                  aria-invalid={!!getError("justificativa")}
                >
                  <SelectValue placeholder="Selecione o motivo" />
                </SelectTrigger>
                <SelectContent>
                  {TIPO_JUSTIFICATIVA_OPCOES.map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldExpectedStatus error={getError("justificativa")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="criar-registro-obs">Observação</Label>
              <Textarea
                id="criar-registro-obs"
                value={observacao}
                onChange={(e) => {
                  setObservacao(e.target.value);
                  handleChange("observacao", e.target.value, (v) => validateJustificativa(v, false));
                }}
                onBlur={() =>
                  handleBlur("observacao", observacao, (v) => validateJustificativa(v, false))
                }
                placeholder="Detalhes opcionais (opcional)"
                rows={3}
                aria-invalid={!!getError("observacao")}
                className="min-h-[88px] resize-none text-sm"
              />
              <FieldExpectedStatus error={getError("observacao")} />
            </div>
          </section>
        </div>

        <DialogFooter className="shrink-0 flex-col gap-2 border-t border-border bg-muted/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Button
            type="button"
            variant="ghost"
            className="w-full sm:w-auto"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            className="w-full gap-1.5 sm:w-auto"
            disabled={!canSubmit || isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            {isLoading
              ? isEmpresa
                ? "Criando..."
                : "Enviando..."
              : isEmpresa
                ? "Criar registro"
                : "Enviar solicitação"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ModalCriarRegistro;
