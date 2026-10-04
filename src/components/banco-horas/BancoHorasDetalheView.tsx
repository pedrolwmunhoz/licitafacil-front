import { useMemo, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LIST_CARD, LIST_CARD_CONTENT_FLUSH, LIST_CARD_HEADER } from "@/lib/list-card-layout";
import type { BancoHorasEscalaDiaResponse, ResumoBancoHorasResponse } from "@/types/empresa";
import {
  DIAS_SEMANA_CURTO,
  MESES_BH,
  formatHhmmPlain,
  formatMinutesAsSaldo,
  formatSaldoDisplay,
  formatDataCurta,
  montarGradeEscala,
  saldoSituacaoLabel,
  parseHhmmToMinutes,
  statusDiaClasses,
  statusDiaDot,
  statusDiaLabel,
  type MovimentacaoBh,
} from "@/lib/banco-horas-ui";
import { cn } from "@/lib/utils";

type Props = {
  titulo?: string;
  headerExtra?: ReactNode;
  saldoAtual?: ResumoBancoHorasResponse | null;
  saldoLoading?: boolean;
  resumoPeriodo?: ResumoBancoHorasResponse | null;
  resumoLoading?: boolean;
  ano: number;
  mes: number;
  onPrevMes: () => void;
  onNextMes: () => void;
  /** Se false, desabilita voltar o mês (limite = início da escala). */
  canPrevMes?: boolean;
  /** Se false, desabilita avançar o mês (limite = mês atual). */
  canNextMes?: boolean;
  hojeLabel: string;
  movimentacoes: MovimentacaoBh[];
  movLoading?: boolean;
  onSelectMov: (m: MovimentacaoBh) => void;
  escala?: BancoHorasEscalaDiaResponse[] | null;
};

const LEGENDA = [
  { status: "TRABALHO", label: "Trabalho" },
  { status: "FOLGA", label: "Folga" },
  { status: "FERIADO", label: "Feriado" },
  { status: "FERIAS", label: "Férias" },
  { status: "AFASTAMENTO", label: "Afastamento" },
  { status: "FALTA", label: "Falta" },
] as const;

export function BancoHorasDetalheView({
  titulo,
  headerExtra,
  saldoAtual,
  saldoLoading,
  resumoPeriodo,
  resumoLoading,
  ano,
  mes,
  onPrevMes,
  onNextMes,
  canPrevMes = true,
  canNextMes = true,
  hojeLabel,
  movimentacoes,
  movLoading,
  onSelectMov,
  escala,
}: Props) {
  const saldoMin = parseHhmmToMinutes(saldoAtual?.totalHorasExtras);
  const credMin = parseHhmmToMinutes(saldoAtual?.totalCreditos);
  const debMin = parseHhmmToMinutes(saldoAtual?.totalDebitos);

  const grade = useMemo(
    () => montarGradeEscala(escala ?? resumoPeriodo?.escala, ano, mes),
    [escala, resumoPeriodo?.escala, ano, mes]
  );

  return (
    <div className="space-y-4">
      {(titulo || headerExtra) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          {titulo ? <h2 className="font-display text-lg font-semibold">{titulo}</h2> : <span />}
          {headerExtra}
        </div>
      )}

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Saldo atual
          </CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} px-4 pb-5 sm:px-5`}>
          {saldoLoading && <p className="text-sm text-muted-foreground">Carregando…</p>}
          {!saldoLoading && saldoAtual && (
            <div className="space-y-4">
              <div className="text-center">
                <p
                  className={cn(
                    "font-display text-4xl font-bold tabular-nums tracking-tight sm:text-5xl",
                    saldoMin > 0 && "text-emerald-700 dark:text-emerald-400",
                    saldoMin < 0 && "text-rose-700 dark:text-rose-400"
                  )}
                >
                  {formatMinutesAsSaldo(saldoMin)}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">{saldoSituacaoLabel(saldoMin)}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Acumulado até {hojeLabel}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-border/60 pt-3">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Créditos</p>
                  <p className="font-medium tabular-nums text-emerald-700 dark:text-emerald-400">
                    {formatMinutesAsSaldo(credMin)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Débitos</p>
                  <p className="font-medium tabular-nums text-rose-700 dark:text-rose-400">
                    {formatMinutesAsSaldo(debMin)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Saldo</p>
                  <p className="font-medium tabular-nums">{formatMinutesAsSaldo(saldoMin)}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-foreground">Período</p>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={onPrevMes}
            disabled={!canPrevMes}
            aria-label="Mês anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-[9.5rem] text-center text-sm font-medium tabular-nums">
            {MESES_BH[mes - 1]}/{ano}
          </span>
          <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={onNextMes} disabled={!canNextMes} aria-label="Próximo mês">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="text-base">Resumo do período</CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} px-4 pb-4 sm:px-5`}>
          {resumoLoading && <p className="text-sm text-muted-foreground">Carregando…</p>}
          {!resumoLoading && resumoPeriodo && (
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Horas trabalhadas</dt>
                <dd className="tabular-nums font-medium">{formatHhmmPlain(resumoPeriodo.totalHorasTrabalhadas)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Horas previstas do mês</dt>
                <dd className="tabular-nums font-medium">{formatHhmmPlain(resumoPeriodo.totalHorasEsperadas)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Créditos</dt>
                <dd className="tabular-nums font-medium text-emerald-700 dark:text-emerald-400">
                  {formatSaldoDisplay(resumoPeriodo.totalCreditos)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Débitos</dt>
                <dd className="tabular-nums font-medium text-rose-700 dark:text-rose-400">
                  {formatSaldoDisplay(resumoPeriodo.totalDebitos)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-border/60 pt-2">
                <dt className="text-muted-foreground">Saldo gerado</dt>
                <dd className="tabular-nums font-semibold">{formatSaldoDisplay(resumoPeriodo.totalHorasExtras)}</dd>
              </div>
            </dl>
          )}
        </CardContent>
      </Card>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="text-base">Escala · {MESES_BH[mes - 1]}/{ano}</CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-3 px-4 pb-4 sm:px-5`}>
          {resumoLoading && <p className="text-sm text-muted-foreground">Carregando…</p>}
          {!resumoLoading && (
            <>
              <div
                className="grid gap-1.5"
                style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}
              >
                {DIAS_SEMANA_CURTO.map((d) => (
                  <div
                    key={d}
                    className="pb-1 text-center text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs"
                  >
                    {d}
                  </div>
                ))}
                {grade.map((cell, i) => {
                  if (!cell) {
                    return (
                      <div
                        key={`pad-${i}`}
                        className="min-h-[3.75rem] rounded-md sm:min-h-[4.5rem]"
                        aria-hidden
                      />
                    );
                  }
                  const status = cell.item?.status;
                  const label = cell.item?.label;
                  const detalhe = cell.item?.detalhe;
                  return (
                    <div
                      key={cell.data}
                      title={detalhe ? `${label} · ${detalhe}` : label ?? undefined}
                      className={cn(
                        "flex min-h-[3.75rem] flex-col items-center justify-center gap-0.5 rounded-md border border-transparent px-0.5 py-1.5 text-center sm:min-h-[4.5rem]",
                        status
                          ? statusDiaClasses(status)
                          : "border-border/50 bg-background text-foreground"
                      )}
                    >
                      <span className="text-sm font-semibold tabular-nums leading-none">{cell.dia}</span>
                      {label && (
                        <span className="max-w-full truncate text-[9px] leading-tight opacity-80 sm:text-[10px]">
                          {label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <ul className="flex flex-wrap gap-x-3 gap-y-1.5 border-t border-border/60 pt-3">
                {LEGENDA.map((l) => (
                  <li key={l.status} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className={cn("h-2 w-2 shrink-0 rounded-full", statusDiaDot(l.status))} />
                    {l.label}
                  </li>
                ))}
              </ul>
            </>
          )}
        </CardContent>
      </Card>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="text-base">
            Movimentações · {MESES_BH[mes - 1]}/{ano}
          </CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} px-0 pb-2`}>
          {movLoading && <p className="px-4 text-sm text-muted-foreground sm:px-5">Carregando…</p>}
          {!movLoading && movimentacoes.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground sm:px-5">
              Nenhuma movimentação neste período.
            </p>
          )}
          {!movLoading && movimentacoes.length > 0 && (
            <ul className="divide-y divide-border/60">
              {movimentacoes.map((m) => (
                <li key={m.data}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors sm:px-5",
                      m.jornada ? "hover:bg-muted/50" : "cursor-default"
                    )}
                    onClick={() => {
                      if (m.jornada) onSelectMov(m);
                    }}
                    disabled={!m.jornada}
                  >
                    <span className="w-12 shrink-0 text-sm tabular-nums text-muted-foreground">
                      {formatDataCurta(m.data)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{m.tipo}</span>
                      {m.observacao && (
                        <span className="block truncate text-xs text-muted-foreground">{m.observacao}</span>
                      )}
                    </span>
                    {m.statusDia && (
                      <span
                        className={cn(
                          "hidden shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium sm:inline",
                          statusDiaClasses(m.statusDia)
                        )}
                      >
                        {statusDiaLabel(m.statusDia)}
                      </span>
                    )}
                    <span
                      className={cn(
                        "shrink-0 text-right text-sm font-semibold tabular-nums",
                        m.deltaMin < 0 && "text-rose-700 dark:text-rose-400",
                        m.deltaMin > 0 && "text-emerald-700 dark:text-emerald-400"
                      )}
                    >
                      {m.deltaMin < 0
                        ? formatMinutesAsSaldo(m.deltaMin)
                        : formatMinutesAsSaldo(m.trabalhadasMin).replace(/^[+\u2007-]/, "")}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
