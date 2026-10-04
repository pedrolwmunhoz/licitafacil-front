import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { addDays, format, startOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Users, ClipboardList, Wallet, Fingerprint, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LimeBarChart, LimeLineChart } from "@/components/charts/native-lime-charts";
import { getMetricasDia, getMetricasDiaPorPeriodo } from "@/lib/api-empresa";
import { durationToMinutes } from "@/lib/duration";
import { CACHE_LIVE, queryKeys, invalidateUserMutation } from "@/lib/query-cache-policy";
import { cn } from "@/lib/utils";
import type { DashboardMetricasResponse } from "@/types/empresa";

/** Formata Duration ISO-8601 (ex: PT8H30M) para exibição. */
function formatDuration(iso?: string | null): string {
  if (!iso || iso === "PT0S") return "0 h";
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/i);
  const h = match ? parseInt(match[1] || "0", 10) : 0;
  const m = match ? parseInt(match[2] || "0", 10) : 0;
  if (h === 0 && m === 0) return "0 h";
  if (m === 0) return `${h} h`;
  return `${h}h ${m}m`;
}

function formatMinutesToHours(m: number): string {
  if (m === 0) return "0h";
  const h = Math.floor(m / 60);
  const min = Math.round(m % 60);
  if (min === 0) return `${h}h`;
  return `${h}h ${min}m`;
}

type ChartRow = {
  dia: string;
  totalDoDiaHoras: number;
  acumHorasHoras: number;
  totalPontoHoje: number;
  acumPontos: number;
  quantidadeFuncionarios: number;
};

function EmpresaLimeLineBlock({
  data,
  dataKey,
  yTickFormatter,
  tooltipFormat,
  yMinRange = 1,
}: {
  data: ChartRow[];
  dataKey: "acumHorasHoras" | "acumPontos" | "quantidadeFuncionarios";
  yTickFormatter: (v: number) => string;
  tooltipFormat: (v: number) => string;
  yMinRange?: number;
}) {
  return (
    <LimeLineChart
      points={data.map((d) => ({ label: d.dia, value: d[dataKey] }))}
      yTickFormatter={yTickFormatter}
      tooltipFormat={tooltipFormat}
      yMinFloor={yMinRange}
    />
  );
}

function EmpresaLimeBarBlock({
  data,
  dataKey,
  yTickFormatter,
  tooltipFormat,
}: {
  data: ChartRow[];
  dataKey: "totalDoDiaHoras" | "totalPontoHoje";
  yTickFormatter: (v: number) => string;
  tooltipFormat: (v: number) => string;
}) {
  return (
    <LimeBarChart
      points={data.map((d) => ({ label: d.dia, value: d[dataKey] }))}
      yTickFormatter={yTickFormatter}
      tooltipFormat={tooltipFormat}
    />
  );
}

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const hoje = useMemo(() => new Date(), []);
  const inicioMes = startOfMonth(hoje);
  const diaDoMes = hoje.getDate();
  /** Na primeira semana (dias 1–10), exibir 10 dias no gráfico; senão, até hoje. */
  const dataFimChart = diaDoMes <= 10 ? addDays(inicioMes, 9) : hoje;
  const dataInicio = format(inicioMes, "yyyy-MM-dd");
  const dataFim = format(dataFimChart, "yyyy-MM-dd");

  const {
    data: metricas,
    isLoading,
    isFetching: isFetchingMetricas,
  } = useQuery({
    queryKey: queryKeys.empresa.dashboard.metricasDia(),
    queryFn: async () => {
      try {
        return await getMetricasDia();
      } catch (e: unknown) {
        if (
          e &&
          typeof e === "object" &&
          "response" in e &&
          (e as { response?: { status?: number } }).response?.status === 404
        ) {
          return null;
        }
        throw e;
      }
    },
    ...CACHE_LIVE,
  });

  const {
    data: listaMetricas,
    isLoading: isLoadingPeriodo,
    isFetching: isFetchingPeriodo,
  } = useQuery({
    queryKey: queryKeys.empresa.dashboard.metricasPeriodo(dataInicio, dataFim),
    queryFn: () => getMetricasDiaPorPeriodo(dataInicio, dataFim),
    enabled: !!dataInicio && !!dataFim && dataInicio <= dataFim,
    ...CACHE_LIVE,
  });

  const isRefreshing = isFetchingMetricas || isFetchingPeriodo;

  const recarregarDashboard = () => {
    invalidateUserMutation(queryClient, "dashboard");
  };
  const chartData = useMemo(() => {
    const inicioMes = startOfMonth(hoje);
    const diaDoMes = hoje.getDate();
    const fimChart = diaDoMes <= 10 ? addDays(inicioMes, 9) : hoje;
    const dias: Date[] = [];
    for (let d = inicioMes; d <= fimChart; d = addDays(d, 1)) {
      dias.push(d);
    }

    const mapPorData = new Map<string, DashboardMetricasResponse>();
    if (listaMetricas && listaMetricas.length > 0) {
      for (const m of listaMetricas) {
        mapPorData.set(m.dataRef, m);
      }
    }

    const temMetricas = !!listaMetricas && listaMetricas.length > 0;

    let acumHorasMin = 0;
    let acumPontos = 0;
    let ultimoAcumHorasHoras = 0;
    let ultimoAcumPontos = 0;
    let ultimoQtdFunc = 0;

    let primeiraDataMetrica: Date | null = null;
    if (temMetricas) {
      const ordenadas = [...listaMetricas].sort((a, b) =>
        a.dataRef.localeCompare(b.dataRef)
      );
      primeiraDataMetrica = new Date(ordenadas[0].dataRef);
    }

    return dias.map((dia) => {
      const chave = format(dia, "yyyy-MM-dd");
      const m = mapPorData.get(chave);

      let totalDoDiaMin = 0;
      let pontosDoDia = 0;
      let qtdFunc = ultimoQtdFunc;

      if (m) {
        const minDoDia = durationToMinutes(m.totalDoDia);
        totalDoDiaMin = minDoDia;
        pontosDoDia = m.totalPontoHoje ?? 0;
        qtdFunc = m.quantidadeFuncionarios ?? ultimoQtdFunc;

        acumHorasMin += minDoDia;
        acumPontos += pontosDoDia;

        ultimoAcumHorasHoras = Math.round((acumHorasMin / 60) * 100) / 100;
        ultimoAcumPontos = acumPontos;
        ultimoQtdFunc = qtdFunc;
      } else if (!temMetricas) {
        ultimoAcumHorasHoras = 0;
        ultimoAcumPontos = 0;
        ultimoQtdFunc = 0;
      } else if (primeiraDataMetrica && dia < primeiraDataMetrica) {
        ultimoAcumHorasHoras = 0;
        ultimoAcumPontos = 0;
        ultimoQtdFunc = 0;
      }

      return {
        dia: format(dia, "dd/MM", { locale: ptBR }),
        totalDoDiaHoras: Math.round((totalDoDiaMin / 60) * 100) / 100,
        acumHorasHoras: ultimoAcumHorasHoras,
        totalPontoHoje: pontosDoDia,
        acumPontos: ultimoAcumPontos,
        quantidadeFuncionarios: ultimoQtdFunc,
      };
    });
  }, [hoje, listaMetricas]);

  /** Um ponto zerado para exibir os gráficos com eixo em 0 quando a resposta for vazia. */
  const chartDataOuZerado: ChartRow[] =
    chartData.length > 0
      ? chartData
      : [{ dia: "-", totalDoDiaHoras: 0, acumHorasHoras: 0, totalPontoHoje: 0, acumPontos: 0, quantidadeFuncionarios: 0 }];

  const ultimoChart = chartDataOuZerado.length > 0 ? chartDataOuZerado[chartDataOuZerado.length - 1] : null;
  const totalMesHoras = ultimoChart ? formatMinutesToHours(Math.round(ultimoChart.acumHorasHoras * 60)) : "0h";
  const registroMes = ultimoChart ? String(ultimoChart.acumPontos) : "0";

  const stats = [
    { label: "Horas dia", value: metricas ? formatDuration(metricas.totalDoDia) : "0 h", icon: Wallet, color: "text-primary" },
    { label: "Horas mês", value: totalMesHoras, icon: Wallet, color: "text-primary" },
    { label: "Registros dia", value: metricas ? String(metricas.totalPontoHoje) : "0", icon: Fingerprint, color: "text-info" },
    { label: "Registros mês", value: registroMes, icon: Fingerprint, color: "text-info" },
    { label: "Funcionários", value: metricas ? String(metricas.quantidadeFuncionarios) : "0", icon: Users, color: "text-primary" },
    { label: "Solicitações Pendentes", value: metricas ? String(metricas.solicitacoesPendentes) : "0", icon: ClipboardList, color: "text-black dark:text-foreground" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Visão geral do ponto eletrônico</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5 shrink-0"
          onClick={recarregarDashboard}
          disabled={isRefreshing}
          aria-label="Atualizar dashboard"
        >
          <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          Atualizar
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className={cn(
              "overflow-hidden text-center",
              ["Horas dia", "Registros dia"].includes(stat.label) ? "hidden sm:block" : undefined,
            )}
          >
            <CardContent className="px-3 pb-4 pt-4 sm:px-4">
              <stat.icon className={cn("mx-auto mb-2 h-5 w-5", stat.color)} />
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-bold tabular-nums text-foreground sm:text-2xl">
                {(isLoading || (["Horas mês", "Registros mês"].includes(stat.label) && isLoadingPeriodo)) ? "…" : stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="border-b border-border pb-1 font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:text-sm">
          Gráficos do mês
        </h2>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border bg-muted/30 py-3">
              <CardTitle className="text-base">Total de horas mensal (acumulado)</CardTitle>
              <p className="text-xs text-muted-foreground">Soma dia a dia das horas trabalhadas</p>
            </CardHeader>
            <CardContent className="p-3 pt-4 sm:p-4">
              <EmpresaLimeLineBlock
                data={chartDataOuZerado}
                dataKey="acumHorasHoras"
                yTickFormatter={(v) => formatMinutesToHours(v * 60)}
                tooltipFormat={(v) => formatMinutesToHours(v * 60)}
              />
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border bg-muted/30 py-3">
              <CardTitle className="text-base">Total de horas por dia</CardTitle>
              <p className="text-xs text-muted-foreground">Horas trabalhadas em cada dia</p>
            </CardHeader>
            <CardContent className="p-3 pt-4 sm:p-4">
              <EmpresaLimeBarBlock
                data={chartDataOuZerado}
                dataKey="totalDoDiaHoras"
                yTickFormatter={(v) => formatMinutesToHours(v * 60)}
                tooltipFormat={(v) => formatMinutesToHours(v * 60)}
              />
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border bg-muted/30 py-3">
              <CardTitle className="text-base">Total registro de pontos (acumulado)</CardTitle>
              <p className="text-xs text-muted-foreground">Soma dia a dia dos registros de ponto</p>
            </CardHeader>
            <CardContent className="p-3 pt-4 sm:p-4">
              <EmpresaLimeLineBlock
                data={chartDataOuZerado}
                dataKey="acumPontos"
                yTickFormatter={(v) => String(Math.round(v))}
                tooltipFormat={(v) => String(v)}
              />
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border bg-muted/30 py-3">
              <CardTitle className="text-base">Registros de ponto por dia</CardTitle>
              <p className="text-xs text-muted-foreground">Registros de ponto em cada dia</p>
            </CardHeader>
            <CardContent className="p-3 pt-4 sm:p-4">
              <EmpresaLimeBarBlock
                data={chartDataOuZerado}
                dataKey="totalPontoHoje"
                yTickFormatter={(v) => String(Math.round(v))}
                tooltipFormat={(v) => String(v)}
              />
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border bg-muted/30 py-3">
            <CardTitle className="text-base">Total de funcionários</CardTitle>
            <p className="text-xs text-muted-foreground">Quantidade de funcionários por dia</p>
          </CardHeader>
          <CardContent className="p-3 pt-4 sm:p-4">
            <EmpresaLimeLineBlock
              data={chartDataOuZerado}
              dataKey="quantidadeFuncionarios"
              yTickFormatter={(v) => String(Math.round(v))}
              tooltipFormat={(v) => String(v)}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
