import {
  BarChart3,
  Calendar,
  CalendarDays,
  ClipboardList,
  Clock,
  Receipt,
  ChevronLeft,
  Fingerprint,
  LayoutDashboard,
  MapPin,
  Shield,
  User,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GRID_STROKE, LIME, monotoneLinePath, useElementSize } from "@/components/charts/lime-chart-geometry";

/** Mock com 5 dias — preview na landing. Gráficos: SVG nativo (sem recharts). */
const MOCK_SERIES = [
  { dia: "01/04", totalDoDiaHoras: 5.1, acumHorasHoras: 38, totalPontoHoje: 14, acumPontos: 92, quantidadeFuncionarios: 12 },
  { dia: "02/04", totalDoDiaHoras: 5.4, acumHorasHoras: 43.4, totalPontoHoje: 16, acumPontos: 108, quantidadeFuncionarios: 12 },
  { dia: "03/04", totalDoDiaHoras: 4.9, acumHorasHoras: 48.3, totalPontoHoje: 15, acumPontos: 123, quantidadeFuncionarios: 13 },
  { dia: "04/04", totalDoDiaHoras: 6.0, acumHorasHoras: 54.3, totalPontoHoje: 18, acumPontos: 141, quantidadeFuncionarios: 14 },
  { dia: "05/04", totalDoDiaHoras: 5.5, acumHorasHoras: 59.8, totalPontoHoje: 17, acumPontos: 158, quantidadeFuncionarios: 14 },
];

/** Margens iguais ao ComposedChart/BarChart do mock original. */
const MARGIN = { top: 4, right: 8, bottom: 0, left: 0 };
const Y_WIDTH = 22;

/** Mesma ordem e rótulos do menu lateral em EmpresaLayout (baseNavItems + Cobrança). */
const SIDEBAR_NAV: { icon: LucideIcon; label: string; active?: boolean }[] = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Funcionários" },
  { icon: Clock, label: "Espelho de ponto" },
  { icon: Wallet, label: "Banco de horas" },
  { icon: ClipboardList, label: "Solicitações" },
  { icon: CalendarDays, label: "Férias" },
  { icon: Calendar, label: "Feriados" },
  { icon: MapPin, label: "Áreas de ponto" },
  { icon: BarChart3, label: "Relatórios" },
  { icon: Shield, label: "Auditoria" },
  { icon: Receipt, label: "Cobrança" },
];

const STATS = [
  { label: "Horas dia", value: "5h 48m", icon: Wallet },
  { label: "Registros dia", value: "19", icon: Fingerprint },
  { label: "Horas mês", value: "67h 36m", icon: Wallet },
  { label: "Funcionários", value: "14", icon: Users },
];

function MockDateAxisRow() {
  return (
    <div
      className="w-full shrink-0 rounded-b-[inherit] border-t border-landing-ink/12 bg-white/70 pb-1 pt-0.5 text-landing-muted pl-[22px] pr-2"
      aria-hidden
    >
      <div className="grid w-full min-w-0 grid-cols-5 gap-x-0">
        {MOCK_SERIES.map((d) => (
          <span
            key={d.dia}
            className="min-w-0 text-center text-[7px] font-medium tabular-nums leading-none sm:text-[9px]"
            title={d.dia}
          >
            {d.dia.slice(0, 2)}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Domínio Y no estilo Recharts (padding ~5%, nice ticks). */
function yDomain(values: number[]): [number, number] {
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  if (lo === hi) return [lo - 1, hi + 1];
  const pad = (hi - lo) * 0.05;
  return [lo - pad, hi + pad];
}

function niceTicks(min: number, max: number, count = 4): number[] {
  const span = max - min || 1;
  const step = span / (count - 1);
  const ticks: number[] = [];
  for (let i = 0; i < count; i++) ticks.push(min + step * i);
  return ticks;
}

function NativeLineChart({
  values,
  gradientId,
  glowId,
  tickSuffix,
}: {
  values: number[];
  gradientId: string;
  glowId: string;
  tickSuffix?: string;
}) {
  const { ref, w, h } = useElementSize<HTMLDivElement>();
  const [y0, y1] = yDomain(values);
  const ticks = niceTicks(y0, y1, 4);

  const plotL = MARGIN.left + Y_WIDTH;
  const plotR = Math.max(plotL + 1, w - MARGIN.right);
  const plotT = MARGIN.top;
  const plotB = Math.max(plotT + 1, h - MARGIN.bottom);
  const plotW = plotR - plotL;
  const plotH = plotB - plotT;

  const n = values.length;
  const xs = values.map((_, i) => plotL + (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW));
  const ys = values.map((v) => plotB - ((v - y0) / (y1 - y0)) * plotH);
  const lineD = w > 0 && h > 0 ? monotoneLinePath(xs, ys) : "";
  const areaD =
    lineD &&
    `${lineD}L${xs[n - 1]},${plotB}L${xs[0]},${plotB}Z`;

  return (
    <div ref={ref} className="absolute inset-0">
      {w > 0 && h > 0 ? (
        <svg width={w} height={h} className="block overflow-visible" aria-hidden>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={LIME} stopOpacity={0.5} />
              <stop offset="50%" stopColor="#a3e635" stopOpacity={0.15} />
              <stop offset="100%" stopColor={LIME} stopOpacity={0} />
            </linearGradient>
            <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {ticks.map((t) => {
            const y = plotB - ((t - y0) / (y1 - y0)) * plotH;
            return (
              <line
                key={`g-${t}`}
                x1={plotL}
                x2={plotR}
                y1={y}
                y2={y}
                stroke={GRID_STROKE}
                strokeWidth={1}
              />
            );
          })}
          {ticks.map((t) => {
            const y = plotB - ((t - y0) / (y1 - y0)) * plotH;
            const label = tickSuffix != null ? `${Math.round(t)}${tickSuffix}` : String(Math.round(t));
            return (
              <text
                key={`ty-${t}`}
                x={Y_WIDTH - 2}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fill="currentColor"
                className="text-landing-muted"
                style={{ fontSize: 8 }}
              >
                {label}
              </text>
            );
          })}
          {areaD ? <path d={areaD} fill={`url(#${gradientId})`} stroke="none" /> : null}
          {lineD ? (
            <path
              d={lineD}
              fill="none"
              stroke={LIME}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
              filter={`url(#${glowId})`}
            />
          ) : null}
        </svg>
      ) : null}
    </div>
  );
}

function NativeBarChart({ values, glowFilterId }: { values: number[]; glowFilterId: string }) {
  const { ref, w, h } = useElementSize<HTMLDivElement>();
  const [y0, y1] = yDomain([0, ...values]);
  const domainMin = Math.min(0, y0);
  const domainMax = Math.max(...values) * 1.05;
  const ticks = niceTicks(domainMin, domainMax, 4);

  const plotL = MARGIN.left + Y_WIDTH;
  const plotR = Math.max(plotL + 1, w - MARGIN.right);
  const plotT = MARGIN.top;
  const plotB = Math.max(plotT + 1, h - MARGIN.bottom);
  const plotW = plotR - plotL;
  const plotH = plotB - plotT;

  const n = values.length;
  const gap = plotW * 0.08;
  const band = plotW / n;
  const barW = Math.max(2, band - gap);

  return (
    <div ref={ref} className="absolute inset-0">
      {w > 0 && h > 0 ? (
        <svg width={w} height={h} className="block overflow-visible" aria-hidden>
          <defs>
            <filter id={glowFilterId} x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {ticks.map((t) => {
            const y = plotB - ((t - domainMin) / (domainMax - domainMin)) * plotH;
            return (
              <line
                key={`g-${t}`}
                x1={plotL}
                x2={plotR}
                y1={y}
                y2={y}
                stroke={GRID_STROKE}
                strokeWidth={1}
              />
            );
          })}
          {ticks.map((t) => {
            const y = plotB - ((t - domainMin) / (domainMax - domainMin)) * plotH;
            return (
              <text
                key={`ty-${t}`}
                x={Y_WIDTH - 2}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fill="currentColor"
                className="text-landing-muted"
                style={{ fontSize: 8 }}
              >
                {Math.round(t)}
              </text>
            );
          })}
          <g filter={`url(#${glowFilterId})`}>
            {values.map((v, i) => {
              const hBar = Math.max(2, ((v - domainMin) / (domainMax - domainMin)) * plotH);
              const x = plotL + i * band + (band - barW) / 2;
              const y = plotB - hBar;
              const r = 3;
              // top rounded rect path (radius [3,3,0,0])
              const d = `M${x},${y + r} Q${x},${y} ${x + r},${y} L${x + barW - r},${y} Q${x + barW},${y} ${x + barW},${y + r} L${x + barW},${plotB} L${x},${plotB} Z`;
              return <path key={i} d={d} fill={LIME} fillOpacity={i % 2 === 0 ? 0.92 : 1} />;
            })}
          </g>
        </svg>
      ) : null}
    </div>
  );
}

function LimeLineBlock({
  title,
  dataKey,
  gradientId,
  glowId,
  tickSuffix,
}: {
  title: string;
  dataKey: "acumHorasHoras" | "acumPontos";
  gradientId: string;
  glowId: string;
  tickSuffix?: string;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-lg border border-landing-ink/10 bg-landing-ink/[0.02] overflow-hidden">
      <div className="flex h-10 shrink-0 items-center border-b border-landing-ink/10 bg-white/80 px-2.5 sm:h-11 sm:px-4">
        <p className="line-clamp-2 w-full text-[10px] font-semibold leading-snug text-landing-ink sm:text-[11px]">{title}</p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-2.5 pb-0.5 pt-1 sm:px-4 sm:pb-1 sm:pt-1.5">
        <div className="relative min-h-[78px] min-w-0 flex-1 sm:min-h-[86px]">
          <NativeLineChart
            values={MOCK_SERIES.map((d) => d[dataKey])}
            gradientId={gradientId}
            glowId={glowId}
            tickSuffix={tickSuffix}
          />
        </div>
        <MockDateAxisRow />
      </div>
    </div>
  );
}

function LimeBarsBlock({
  title,
  dataKey,
  glowFilterId,
}: {
  title: string;
  dataKey: "totalDoDiaHoras" | "totalPontoHoje";
  glowFilterId: string;
  formatter?: (v: number) => [string, string];
}) {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-lg border border-landing-ink/10 bg-landing-ink/[0.02] overflow-hidden">
      <div className="flex h-10 shrink-0 items-center border-b border-landing-ink/10 bg-white/80 px-2.5 sm:h-11 sm:px-4">
        <p className="line-clamp-2 w-full text-[10px] font-semibold leading-snug text-landing-ink sm:text-[11px]">{title}</p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-2.5 pb-0.5 pt-1 sm:px-4 sm:pb-1 sm:pt-1.5">
        <div className="relative min-h-[78px] min-w-0 flex-1 sm:min-h-[86px]">
          <NativeBarChart values={MOCK_SERIES.map((d) => d[dataKey])} glowFilterId={glowFilterId} />
        </div>
        <MockDateAxisRow />
      </div>
    </div>
  );
}

export default function HeroDashboardMock() {
  return (
    <div className="flex max-h-[min(500px,65vh)] overflow-hidden rounded-xl border border-landing-ink/10 bg-background shadow-2xl sm:max-h-[min(600px,74vh)] lg:max-h-[min(680px,78vh)]">
      <aside className="flex w-[120px] sm:w-[140px] shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="flex h-10 items-center gap-1.5 border-b border-sidebar-border px-2 sm:h-12 sm:gap-2 sm:px-2.5">
          <Clock className="h-4 w-4 shrink-0 text-sidebar-primary sm:h-6 sm:w-6" />
          <span className="font-display text-[11px] font-bold leading-tight tracking-tight sm:text-sm">
            SegPonto
          </span>
        </div>
        <nav className="min-h-0 flex-1 overflow-hidden py-1.5 sm:overflow-y-auto sm:overscroll-contain sm:py-2">
          <ul className="space-y-0 px-1 sm:space-y-0.5 sm:px-1.5">
            {SIDEBAR_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <div
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[8px] font-medium leading-snug transition-colors pointer-events-none select-none sm:gap-2 sm:px-2 sm:py-1.5 sm:text-[10px]",
                      item.active
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-muted",
                    )}
                  >
                    <Icon className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
                    <span className="break-words">{item.label}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="hidden sm:block border-t border-sidebar-border p-1.5">
          <div
            className="flex w-full items-center justify-center rounded-md py-1 text-sidebar-muted"
            aria-hidden
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-background">
        <header className="flex h-8 shrink-0 items-center justify-end border-b border-border bg-card px-2 sm:h-10 sm:px-3">
          <div
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted sm:h-8 sm:w-8"
            aria-hidden
          >
            <User className="h-3.5 w-3.5 text-muted-foreground sm:h-4 sm:w-4" strokeWidth={2} />
          </div>
        </header>

        <div className="min-h-0 flex-1 space-y-2 overflow-hidden p-2.5 sm:space-y-2.5 sm:overflow-y-auto sm:overscroll-contain sm:p-4">
          <div>
            <h2 className="font-display text-[13px] font-bold leading-tight text-foreground sm:text-sm">Dashboard</h2>
            <p className="text-[10px] leading-snug text-muted-foreground sm:text-[11px]">Visão geral do ponto eletrônico</p>
          </div>

          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-lg border border-border bg-card px-1.5 py-1.5 text-center sm:px-2 sm:py-2"
                >
                  <Icon className="mx-auto mb-0.5 h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
                  <p className="text-[8px] leading-tight text-muted-foreground sm:text-[9px]">{s.label}</p>
                  <p className="text-xs font-bold tabular-nums text-foreground sm:text-sm">{s.value}</p>
                </div>
              );
            })}
          </div>

          <div className="rounded-lg border border-border bg-muted/40 p-1.5 sm:p-2">
            <p className="mb-1 font-display text-[10px] font-semibold text-foreground sm:mb-1.5 sm:text-[11px]">Atividade recente</p>
            <div className="space-y-0.5 sm:space-y-1">
              {["Maria Silva — 08:02 ✓", "João Santos — 08:05 ✓"].map((entry) => (
                <div
                  key={entry}
                  className="flex items-center justify-between rounded-md border border-border bg-card px-1.5 py-1 text-[10px] sm:px-2 sm:py-1.5 sm:text-[11px]"
                >
                  <span className="truncate text-foreground">{entry}</span>
                  <span className="ml-1 shrink-0 text-[8px] font-semibold text-emerald-800 sm:text-[9px]">Geoloc. OK</span>
                </div>
              ))}
            </div>
          </div>

          <p className="border-b border-border pb-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground sm:pb-1 sm:text-[10px]">
            Gráficos do mês
          </p>

          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2">
            <LimeLineBlock
              title="Total de horas mensal (acumulado)"
              dataKey="acumHorasHoras"
              gradientId="heroHrsGrad"
              glowId="heroHrsGlow"
              tickSuffix="h"
            />
            <LimeBarsBlock
              title="Total de horas por dia"
              dataKey="totalDoDiaHoras"
              glowFilterId="heroBarHGlow"
            />
            <LimeLineBlock
              title="Total registro de pontos (acumulado)"
              dataKey="acumPontos"
              gradientId="heroPtGrad"
              glowId="heroPtGlow"
            />
            <LimeBarsBlock
              title="Registros de ponto por dia"
              dataKey="totalPontoHoje"
              glowFilterId="heroBarPGlow"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
