import { useId, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { GRID_STROKE, LIME, LIME_SOFT, monotoneLinePath, useElementSize } from "@/components/charts/lime-chart-geometry";

function niceTicks(min: number, max: number, count = 5): number[] {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return [0, 1];
  if (min === max) return [min, min + 1];
  const span = max - min;
  const step = span / (count - 1);
  return Array.from({ length: count }, (_, i) => min + step * i);
}

function computeXTickIndexes(length: number, interval: number): number[] {
  if (length <= 0) return [];
  if (interval <= 0) return Array.from({ length }, (_, i) => i);
  const idxs: number[] = [];
  for (let i = 0; i < length; i += interval + 1) idxs.push(i);
  if (idxs[idxs.length - 1] !== length - 1) idxs.push(length - 1);
  return idxs;
}

function computeXTickInterval(length: number) {
  const n = length || 1;
  if (n <= 14) return 0;
  if (n <= 31) return 1;
  return Math.max(1, Math.floor(n / 10));
}

type Point = { label: string; value: number };

type TooltipState = { x: number; y: number; label: string; value: string } | null;

type LimeLineChartProps = {
  points: Point[];
  className?: string;
  height?: number;
  yTickFormatter?: (v: number) => string;
  tooltipFormat?: (v: number) => string;
  xTickFormatter?: (label: string) => string;
  xTickInterval?: number;
  yMinFloor?: number;
  allowDecimals?: boolean;
  margin?: { top: number; right: number; bottom: number; left: number };
  yAxisWidth?: number;
};

export function LimeLineChart({
  points,
  className,
  height = 260,
  yTickFormatter = (v) => String(Math.round(v)),
  tooltipFormat = (v) => String(v),
  xTickFormatter = (l) => l,
  xTickInterval,
  yMinFloor = 1,
  margin = { top: 8, right: 8, bottom: 22, left: 8 },
  yAxisWidth = 36,
}: LimeLineChartProps) {
  const uid = useId().replace(/:/g, "");
  const gradientId = `${uid}-grad`;
  const { ref, w, h } = useElementSize<HTMLDivElement>();
  const [tip, setTip] = useState<TooltipState>(null);

  const values = points.map((p) => p.value);
  const dataMax = values.length ? Math.max(...values) : 0;
  const y0 = 0;
  const y1 = Math.max(dataMax, yMinFloor);

  const interval = xTickInterval ?? computeXTickInterval(points.length);
  const xIdxs = useMemo(() => computeXTickIndexes(points.length, interval), [points.length, interval]);
  const yTicks = useMemo(() => niceTicks(y0, y1, 5), [y0, y1]);

  const plotL = margin.left + yAxisWidth;
  const plotR = Math.max(plotL + 1, w - margin.right);
  const plotT = margin.top;
  const plotB = Math.max(plotT + 1, h - margin.bottom);
  const plotW = plotR - plotL;
  const plotH = plotB - plotT;

  const n = points.length;
  const xs = points.map((_, i) => plotL + (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW));
  const ys = points.map((p) => plotB - ((p.value - y0) / (y1 - y0 || 1)) * plotH);
  const lineD = w > 0 && h > 0 && n > 0 ? monotoneLinePath(xs, ys) : "";
  const areaD = lineD ? `${lineD}L${xs[n - 1]},${plotB}L${xs[0]},${plotB}Z` : "";

  const onMove = (clientX: number, clientY: number, rect: DOMRect) => {
    if (n === 0 || plotW <= 0) return;
    const localX = clientX - rect.left;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < n; i++) {
      const d = Math.abs(xs[i] - localX);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    setTip({
      x: xs[best],
      y: ys[best],
      label: points[best].label,
      value: tooltipFormat(points[best].value),
    });
  };

  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ height }}
      onMouseLeave={() => setTip(null)}
      onMouseMove={(e) => onMove(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect())}
    >
      {w > 0 && h > 0 ? (
        <svg width={w} height={h} className="block overflow-visible" aria-hidden>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={LIME} stopOpacity={0.55} />
              <stop offset="50%" stopColor="#a3e635" stopOpacity={0.2} />
              <stop offset="100%" stopColor={LIME} stopOpacity={0} />
            </linearGradient>
          </defs>
          {yTicks.map((t) => {
            const y = plotB - ((t - y0) / (y1 - y0 || 1)) * plotH;
            return (
              <line key={`g-${t}`} x1={plotL} x2={plotR} y1={y} y2={y} stroke={GRID_STROKE} strokeWidth={1} />
            );
          })}
          {yTicks.map((t) => {
            const y = plotB - ((t - y0) / (y1 - y0 || 1)) * plotH;
            return (
              <text
                key={`yt-${t}`}
                x={plotL - 6}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fill="currentColor"
                className="fill-muted-foreground"
                style={{ fontSize: 11 }}
              >
                {yTickFormatter(t)}
              </text>
            );
          })}
          {xIdxs.map((i) => (
            <text
              key={`xt-${i}`}
              x={xs[i]}
              y={h - 4}
              textAnchor="middle"
              fill="currentColor"
              className="fill-muted-foreground"
              style={{ fontSize: 11 }}
            >
              {xTickFormatter(points[i].label)}
            </text>
          ))}
          {areaD ? <path d={areaD} fill={`url(#${gradientId})`} stroke="none" /> : null}
          {lineD ? (
            <path
              d={lineD}
              fill="none"
              stroke={LIME}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          {tip ? (
            <>
              <circle cx={tip.x} cy={tip.y} r={5} fill={LIME} stroke={LIME_SOFT} strokeWidth={2} />
              <line x1={tip.x} x2={tip.x} y1={plotT} y2={plotB} stroke={GRID_STROKE} strokeWidth={1} />
            </>
          ) : null}
        </svg>
      ) : null}
      {tip ? (
        <div
          className="pointer-events-none absolute z-10 rounded-lg border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md"
          style={{
            left: Math.min(Math.max(tip.x + 8, 8), Math.max(8, w - 140)),
            top: Math.max(8, tip.y - 40),
          }}
        >
          <p className="font-medium">{tip.label}</p>
          <p className="text-muted-foreground">{tip.value}</p>
        </div>
      ) : null}
    </div>
  );
}

type LimeBarChartProps = {
  points: Point[];
  className?: string;
  height?: number;
  yTickFormatter?: (v: number) => string;
  tooltipFormat?: (v: number) => string;
  xTickFormatter?: (label: string) => string;
  xTickInterval?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  yAxisWidth?: number;
};

export function LimeBarChart({
  points,
  className,
  height = 260,
  yTickFormatter = (v) => String(Math.round(v)),
  tooltipFormat = (v) => String(v),
  xTickFormatter = (l) => l,
  xTickInterval,
  margin = { top: 8, right: 8, bottom: 22, left: 8 },
  yAxisWidth = 36,
}: LimeBarChartProps) {
  const uid = useId().replace(/:/g, "");
  const glowId = `${uid}-bar-glow`;
  const { ref, w, h } = useElementSize<HTMLDivElement>();
  const [tip, setTip] = useState<TooltipState>(null);

  const values = points.map((p) => p.value);
  const dataMax = values.length ? Math.max(...values, 0) : 0;
  const y0 = 0;
  const y1 = Math.max(dataMax * 1.05, 1);

  const interval = xTickInterval ?? computeXTickInterval(points.length);
  const xIdxs = useMemo(() => computeXTickIndexes(points.length, interval), [points.length, interval]);
  const yTicks = useMemo(() => niceTicks(y0, y1, 5), [y0, y1]);

  const plotL = margin.left + yAxisWidth;
  const plotR = Math.max(plotL + 1, w - margin.right);
  const plotT = margin.top;
  const plotB = Math.max(plotT + 1, h - margin.bottom);
  const plotW = plotR - plotL;
  const plotH = plotB - plotT;

  const n = points.length;
  const gap = plotW * 0.08;
  const band = n > 0 ? plotW / n : plotW;
  const barW = Math.max(2, band - gap / n);

  const bars = points.map((p, i) => {
    const hBar = Math.max(2, ((p.value - y0) / (y1 - y0 || 1)) * plotH);
    const x = plotL + i * band + (band - barW) / 2;
    const y = plotB - hBar;
    return { ...p, x, y, hBar, cx: x + barW / 2 };
  });

  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ height }}
      onMouseLeave={() => setTip(null)}
      onMouseMove={(e) => {
        if (n === 0) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const localX = e.clientX - rect.left;
        let best = 0;
        let bestDist = Infinity;
        for (let i = 0; i < bars.length; i++) {
          const d = Math.abs(bars[i].cx - localX);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        }
        const b = bars[best];
        setTip({ x: b.cx, y: b.y, label: b.label, value: tooltipFormat(b.value) });
      }}
    >
      {w > 0 && h > 0 ? (
        <svg width={w} height={h} className="block overflow-visible" aria-hidden>
          <defs>
            <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {yTicks.map((t) => {
            const y = plotB - ((t - y0) / (y1 - y0 || 1)) * plotH;
            return (
              <line key={`g-${t}`} x1={plotL} x2={plotR} y1={y} y2={y} stroke={GRID_STROKE} strokeWidth={1} />
            );
          })}
          {yTicks.map((t) => {
            const y = plotB - ((t - y0) / (y1 - y0 || 1)) * plotH;
            return (
              <text
                key={`yt-${t}`}
                x={plotL - 6}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fill="currentColor"
                className="fill-muted-foreground"
                style={{ fontSize: 11 }}
              >
                {yTickFormatter(t)}
              </text>
            );
          })}
          {xIdxs.map((i) => (
            <text
              key={`xt-${i}`}
              x={bars[i]?.cx ?? 0}
              y={h - 4}
              textAnchor="middle"
              fill="currentColor"
              className="fill-muted-foreground"
              style={{ fontSize: 11 }}
            >
              {xTickFormatter(points[i].label)}
            </text>
          ))}
          <g filter={`url(#${glowId})`}>
            {bars.map((b, i) => {
              const r = 3;
              const d = `M${b.x},${b.y + r} Q${b.x},${b.y} ${b.x + r},${b.y} L${b.x + barW - r},${b.y} Q${b.x + barW},${b.y} ${b.x + barW},${b.y + r} L${b.x + barW},${plotB} L${b.x},${plotB} Z`;
              return <path key={i} d={d} fill={LIME} fillOpacity={i % 2 === 0 ? 0.92 : 1} />;
            })}
          </g>
          {tip ? (
            <line x1={tip.x} x2={tip.x} y1={plotT} y2={plotB} stroke={GRID_STROKE} strokeWidth={1} />
          ) : null}
        </svg>
      ) : null}
      {tip ? (
        <div
          className="pointer-events-none absolute z-10 rounded-lg border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md"
          style={{
            left: Math.min(Math.max(tip.x + 8, 8), Math.max(8, w - 140)),
            top: Math.max(8, tip.y - 40),
          }}
        >
          <p className="font-medium">{tip.label}</p>
          <p className="text-muted-foreground">{tip.value}</p>
        </div>
      ) : null}
    </div>
  );
}
