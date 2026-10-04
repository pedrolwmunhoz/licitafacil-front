import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LabelComAjuda } from "@/components/empresa/LabelComAjuda";
import { FieldExpectedStatus } from "@/components/ui/field-with-expected";
import type { JornadaFuncionarioConfigRequest, TipoEscalaJornada } from "@/types/empresa";
import {
  TIPO_ESCALA_JORNADA_OPCOES,
  tipoEscalaJornadaFromId,
} from "@/types/empresa";
import {
  ESCALA_DEFAULTS,
  ESCALA_HORARIOS,
  ESCALA_FOLGAS_DEFAULT,
  DIAS_SEMANA_ISO,
  escalaTemDiaFolga,
  addDaysIso,
  weekdayLabelFromIso,
  JORNADA_FIELD_HELP,
} from "@/lib/jornada-escala-defaults";
import {
  durationToHHmm,
  hhmmToDuration,
  clampDurationHHmmTo12,
  clampDurationHHmmTo44,
  clampDurationHHmmTo6,
} from "@/lib/duration";
import {
  validateDurationHhmm,
  validateDurationHhmmCargaDiaria,
  validateDurationHhmmTolerancia,
  validateHorario,
  validateRequiredSelect,
} from "@/lib/validations";
import type { ValidationResult } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { ChevronDown, Minus, Plus } from "lucide-react";

type Props = {
  value: JornadaFuncionarioConfigRequest;
  onChange: (next: JornadaFuncionarioConfigRequest) => void;
  durationDisplays: Record<string, string>;
  setDurationDisplays: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleChange: (key: string, val: string, fn: (x: string) => ValidationResult) => void;
  handleBlur: (key: string, val: string, fn: (x: string) => ValidationResult) => void;
  getError: (key: string) => string | undefined;
  mostrarAlmoco: boolean;
  setMostrarAlmoco: (v: boolean) => void;
};

function patch(
  value: JornadaFuncionarioConfigRequest,
  partial: Partial<JornadaFuncionarioConfigRequest>
): JornadaFuncionarioConfigRequest {
  return { ...value, ...partial };
}

export function JornadaFuncionarioFields({
  value,
  onChange,
  durationDisplays,
  setDurationDisplays,
  handleChange,
  handleBlur,
  getError,
  mostrarAlmoco,
  setMostrarAlmoco,
}: Props) {
  const escalaDesc = tipoEscalaJornadaFromId(value.tipoEscalaJornadaId);
  const escalaSelecionada = !!value.tipoEscalaJornadaId && !!escalaDesc;
  const disabled = !escalaSelecionada;

  const aplicarEscala = (id: number) => {
    const descricao = tipoEscalaJornadaFromId(id);
    if (!descricao) {
      onChange(patch(value, { tipoEscalaJornadaId: id }));
      handleChange("tipoEscalaJornadaId", id ? String(id) : "", (x) =>
        validateRequiredSelect(x, "Tipo de escala jornada é obrigatório.")
      );
      return;
    }
    const defaults = ESCALA_DEFAULTS[descricao];
    const horarios = ESCALA_HORARIOS[descricao];
    const folgas = ESCALA_FOLGAS_DEFAULT[descricao];
    onChange(
      patch(value, {
        tipoEscalaJornadaId: id,
        cargaHorariaDiaria: defaults.cargaHorariaDiaria,
        cargaHorariaSemanal: defaults.cargaHorariaSemanal,
        tempoDescansoEntreJornada: defaults.tempoDescansoEntreJornada,
        entradaPadrao: horarios.entrada,
        saidaPadrao: horarios.saida,
        diasFolga: [...folgas],
      })
    );
    setDurationDisplays((p) => ({
      ...p,
      cargaHorariaDiaria: durationToHHmm(defaults.cargaHorariaDiaria),
      cargaHorariaSemanal: durationToHHmm(defaults.cargaHorariaSemanal),
      tempoDescansoEntreJornada: durationToHHmm(defaults.tempoDescansoEntreJornada),
    }));
    handleChange("tipoEscalaJornadaId", String(id), (x) =>
      validateRequiredSelect(x, "Tipo de escala jornada é obrigatório.")
    );
  };

  const maxFolgas = escalaDesc === "5x2" ? 2 : 1;

  const toggleFolga = (dia: number, checked: boolean) => {
    const cur = new Set(value.diasFolga ?? []);
    if (checked) {
      if (cur.size >= maxFolgas && !cur.has(dia)) {
        // 6x1: troca o dia; 5x2: bloqueia além de 2
        if (maxFolgas === 1) cur.clear();
        else return;
      }
      cur.add(dia);
    } else {
      cur.delete(dia);
    }
    onChange(patch(value, { diasFolga: Array.from(cur).sort() }));
  };

  const folgas = value.diasFolga ?? [];
  const labelFolgas =
    folgas.length > 0
      ? folgas
          .map((v) => DIAS_SEMANA_ISO.find((d) => d.value === v)?.label ?? String(v))
          .join(", ")
      : maxFolgas === 1
        ? "Selecione o dia de folga"
        : "Selecione os dias de folga";

  return (
    <div className="space-y-4 rounded-lg border border-border/60 p-3 sm:p-4">
      <div className="space-y-2">
        <LabelComAjuda required help={JORNADA_FIELD_HELP.escala}>
          Escala
        </LabelComAjuda>
        <Select
          value={value.tipoEscalaJornadaId ? String(value.tipoEscalaJornadaId) : ""}
          onValueChange={(v) => aplicarEscala(v ? parseInt(v, 10) : 0)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a escala" />
          </SelectTrigger>
          <SelectContent>
            {TIPO_ESCALA_JORNADA_OPCOES.map((opt) => (
              <SelectItem key={opt.id} value={String(opt.id)}>
                {opt.descricao}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldExpectedStatus error={getError("tipoEscalaJornadaId")} />
      </div>

      {escalaTemDiaFolga(escalaDesc) && (
        <div className="space-y-2">
          <LabelComAjuda required help={JORNADA_FIELD_HELP.diaFolga}>
            {maxFolgas === 1 ? "Dia de folga" : "Dias de folga"}
          </LabelComAjuda>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                disabled={disabled}
                className={cn(
                  "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  folgas.length === 0 && "text-muted-foreground",
                )}
              >
                <span className="line-clamp-1 text-left">{labelFolgas}</span>
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-[var(--radix-popper-anchor-width)] p-1"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <div className="flex flex-col">
                {DIAS_SEMANA_ISO.map((d) => {
                  const checked = folgas.includes(d.value);
                  const bloqueado = maxFolgas > 1 && !checked && folgas.length >= maxFolgas;
                  return (
                    <label
                      key={d.value}
                      className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent",
                        (disabled || bloqueado) && "cursor-not-allowed opacity-50",
                      )}
                    >
                      <Checkbox
                        disabled={disabled || bloqueado}
                        checked={checked}
                        onCheckedChange={(c) => toggleFolga(d.value, !!c)}
                      />
                      {d.label}
                    </label>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}

      {escalaDesc === "5x1" ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <LabelComAjuda required help={JORNADA_FIELD_HELP.inicioEscala}>
              Início da escala
            </LabelComAjuda>
            <Input
              type="date"
              disabled={disabled}
              value={value.inicioEscala ?? ""}
              onChange={(e) => onChange(patch(value, { inicioEscala: e.target.value }))}
            />
            {value.inicioEscala && (
              <p className="text-xs text-muted-foreground">{weekdayLabelFromIso(value.inicioEscala)}</p>
            )}
          </div>
          <div className="space-y-2">
            <LabelComAjuda required help={JORNADA_FIELD_HELP.primeiraFolga5x1}>
              Dia da primeira folga
            </LabelComAjuda>
            <Input
              type="date"
              disabled={disabled || !value.inicioEscala}
              value={value.inicioEscala ? addDaysIso(value.inicioEscala, 5) : ""}
              onChange={(e) => {
                const folga = e.target.value;
                if (!folga) return;
                onChange(patch(value, { inicioEscala: addDaysIso(folga, -5) }));
              }}
            />
            {value.inicioEscala && (
              <p className="text-xs text-muted-foreground">
                {weekdayLabelFromIso(addDaysIso(value.inicioEscala, 5))}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <LabelComAjuda required help={JORNADA_FIELD_HELP.inicioEscala}>
            Início da escala
          </LabelComAjuda>
          <Input
            type="date"
            disabled={disabled}
            value={value.inicioEscala ?? ""}
            onChange={(e) => onChange(patch(value, { inicioEscala: e.target.value }))}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <LabelComAjuda required help={JORNADA_FIELD_HELP.entrada}>
            Horário — entrada
          </LabelComAjuda>
          <Input
            type="time"
            disabled={disabled}
            value={value.entradaPadrao}
            onChange={(e) => {
              const v = e.target.value;
              onChange(patch(value, { entradaPadrao: v }));
              handleChange("entradaPadrao", v, (x) => validateHorario(x, true, "Entrada"));
            }}
            onBlur={() => handleBlur("entradaPadrao", value.entradaPadrao ?? "", (x) => validateHorario(x, true, "Entrada"))}
          />
          <FieldExpectedStatus error={getError("entradaPadrao")} />
        </div>
        <div className="space-y-2">
          <LabelComAjuda required help={JORNADA_FIELD_HELP.saida}>
            Horário — saída
          </LabelComAjuda>
          <Input
            type="time"
            disabled={disabled}
            value={value.saidaPadrao}
            onChange={(e) => {
              const v = e.target.value;
              onChange(patch(value, { saidaPadrao: v }));
              handleChange("saidaPadrao", v, (x) => validateHorario(x, true, "Saída"));
            }}
            onBlur={() => handleBlur("saidaPadrao", value.saidaPadrao ?? "", (x) => validateHorario(x, true, "Saída"))}
          />
          <FieldExpectedStatus error={getError("saidaPadrao")} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <LabelComAjuda help={JORNADA_FIELD_HELP.almoco}>Horário almoço</LabelComAjuda>
          <Badge className="border-0 bg-amber-100 px-1.5 py-0 text-[11px] font-normal text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
            Opcional
          </Badge>
        </div>
        {!mostrarAlmoco ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            disabled={disabled}
            onClick={() => {
              onChange(patch(value, { almocoInicio: "12:00", almocoFim: "13:00" }));
              setMostrarAlmoco(true);
            }}
          >
            <Plus className="h-4 w-4" />
            Adicionar horário almoço
          </Button>
        ) : (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              disabled={disabled}
              onClick={() => {
                onChange(patch(value, { almocoInicio: null, almocoFim: null }));
                setMostrarAlmoco(false);
              }}
            >
              <Minus className="h-4 w-4" />
              Horário almoço
            </Button>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Início</Label>
                <Input
                  type="time"
                  disabled={disabled}
                  value={value.almocoInicio ?? ""}
                  onChange={(e) => onChange(patch(value, { almocoInicio: e.target.value || null }))}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Fim</Label>
                <Input
                  type="time"
                  disabled={disabled}
                  value={value.almocoFim ?? ""}
                  onChange={(e) => onChange(patch(value, { almocoFim: e.target.value || null }))}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <LabelComAjuda required help={JORNADA_FIELD_HELP.cargaDiaria}>
            Carga diária
          </LabelComAjuda>
          <Input
            disabled={disabled}
            value={durationDisplays.cargaHorariaDiaria ?? durationToHHmm(value.cargaHorariaDiaria ?? "")}
            onChange={(e) => {
              const hhmm = clampDurationHHmmTo12(e.target.value);
              setDurationDisplays((p) => ({ ...p, cargaHorariaDiaria: hhmm }));
              handleChange("cargaHorariaDiaria", hhmm, (x) => validateDurationHhmmCargaDiaria(x));
            }}
            onBlur={() => {
              const d = durationDisplays.cargaHorariaDiaria ?? durationToHHmm(value.cargaHorariaDiaria ?? "");
              const iso = hhmmToDuration(d);
              onChange(patch(value, { cargaHorariaDiaria: iso }));
              setDurationDisplays((p) => ({ ...p, cargaHorariaDiaria: durationToHHmm(iso) }));
              handleBlur("cargaHorariaDiaria", durationToHHmm(iso), (x) => validateDurationHhmmCargaDiaria(x));
            }}
            placeholder="08:00"
            maxLength={5}
          />
          <FieldExpectedStatus error={getError("cargaHorariaDiaria")} />
        </div>
        <div className="space-y-2">
          <LabelComAjuda required help={JORNADA_FIELD_HELP.cargaSemanal}>
            Carga semanal
          </LabelComAjuda>
          <Input
            disabled={disabled}
            value={durationDisplays.cargaHorariaSemanal ?? durationToHHmm(value.cargaHorariaSemanal ?? "")}
            onChange={(e) => {
              const hhmm = clampDurationHHmmTo44(e.target.value);
              setDurationDisplays((p) => ({ ...p, cargaHorariaSemanal: hhmm }));
              handleChange("cargaHorariaSemanal", hhmm, (x) => validateDurationHhmm(x, true, "Carga semanal"));
            }}
            onBlur={() => {
              const d = durationDisplays.cargaHorariaSemanal ?? durationToHHmm(value.cargaHorariaSemanal ?? "");
              const iso = hhmmToDuration(d);
              onChange(patch(value, { cargaHorariaSemanal: iso }));
              setDurationDisplays((p) => ({ ...p, cargaHorariaSemanal: durationToHHmm(iso) }));
              handleBlur("cargaHorariaSemanal", durationToHHmm(iso), (x) => validateDurationHhmm(x, true, "Carga semanal"));
            }}
            placeholder="40:00"
            maxLength={5}
          />
          <FieldExpectedStatus error={getError("cargaHorariaSemanal")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <LabelComAjuda required help={JORNADA_FIELD_HELP.descanso}>
            Descanso entre jornadas
          </LabelComAjuda>
          <Input
            disabled={disabled}
            value={
              durationDisplays.tempoDescansoEntreJornada ??
              durationToHHmm(value.tempoDescansoEntreJornada ?? "")
            }
            onChange={(e) => {
              const hhmm = clampDurationHHmmTo44(e.target.value);
              setDurationDisplays((p) => ({ ...p, tempoDescansoEntreJornada: hhmm }));
              handleChange("tempoDescansoEntreJornada", hhmm, (x) =>
                validateDurationHhmm(x, true, "Mínimo entre turnos")
              );
            }}
            onBlur={() => {
              const d =
                durationDisplays.tempoDescansoEntreJornada ??
                durationToHHmm(value.tempoDescansoEntreJornada ?? "");
              const iso = hhmmToDuration(d);
              onChange(patch(value, { tempoDescansoEntreJornada: iso }));
              setDurationDisplays((p) => ({ ...p, tempoDescansoEntreJornada: durationToHHmm(iso) }));
              handleBlur("tempoDescansoEntreJornada", durationToHHmm(iso), (x) =>
                validateDurationHhmm(x, true, "Mínimo entre turnos")
              );
            }}
            placeholder="11:00"
            maxLength={5}
          />
          <FieldExpectedStatus error={getError("tempoDescansoEntreJornada")} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <LabelComAjuda help={JORNADA_FIELD_HELP.tolerancia}>Tolerância</LabelComAjuda>
            <Badge className="border-0 bg-amber-100 px-1.5 py-0 text-[11px] font-normal text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
              Opcional
            </Badge>
          </div>
          <Input
            disabled={disabled}
            value={durationDisplays.toleranciaPadrao ?? durationToHHmm(value.toleranciaPadrao ?? "PT0S")}
            onChange={(e) => {
              const hhmm = clampDurationHHmmTo6(e.target.value);
              setDurationDisplays((p) => ({ ...p, toleranciaPadrao: hhmm }));
              handleChange("toleranciaPadrao", hhmm, (x) => validateDurationHhmmTolerancia(x, false));
            }}
            onBlur={() => {
              const d = durationDisplays.toleranciaPadrao ?? durationToHHmm(value.toleranciaPadrao ?? "PT0S");
              const iso = hhmmToDuration(d) || "PT0S";
              onChange(patch(value, { toleranciaPadrao: iso }));
              setDurationDisplays((p) => ({ ...p, toleranciaPadrao: durationToHHmm(iso) }));
              handleBlur("toleranciaPadrao", durationToHHmm(iso), (x) => validateDurationHhmmTolerancia(x, false));
            }}
            placeholder="00:05"
          />
          <FieldExpectedStatus error={getError("toleranciaPadrao")} />
        </div>
      </div>
    </div>
  );
}

/** unused import guard for type-only re-exports */
export type { TipoEscalaJornada };
