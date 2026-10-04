"use client";

import { MapPin } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

/** Badge + tooltip no portal (não corta dentro de modal com overflow). */
export function CoordenadasHoverPopover({
  geoLatitude,
  geoLongitude,
}: {
  geoLatitude: number | null | undefined;
  geoLongitude: number | null | undefined;
}) {
  const lat = geoLatitude != null ? Number(geoLatitude) : null;
  const lng = geoLongitude != null ? Number(geoLongitude) : null;
  const hasCoord = lat != null && lng != null && !Number.isNaN(lat) && !Number.isNaN(lng);

  if (!hasCoord) return null;

  const latStr = lat.toFixed(6);
  const lngStr = lng.toFixed(6);
  const mapsUrl = `https://www.google.com/maps?q=${latStr},${lngStr}`;

  return (
    <HoverCard openDelay={80} closeDelay={80}>
      <HoverCardTrigger asChild>
        <span
          className="inline-flex cursor-help items-center justify-center rounded-full bg-emerald-400 px-1.5 py-0.5 text-xs font-bold text-emerald-950 shadow-sm ring-2 ring-emerald-500/50 transition-colors hover:bg-emerald-300 hover:ring-emerald-500"
          aria-label="Coordenadas"
          title="Coordenadas — passe o mouse para ver"
        >
          <MapPin className="h-3.5 w-3.5" />
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        align="end"
        side="bottom"
        sideOffset={6}
        className="w-auto min-w-[220px] border-emerald-200 bg-emerald-50 p-3 text-emerald-800"
      >
        <p className="mb-1.5 text-xs font-semibold text-emerald-900">Coordenadas</p>
        <p className="font-mono text-xs text-emerald-800">
          Lat: {latStr}
          <br />
          Long: {lngStr}
        </p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 inline-block text-xs text-emerald-700 underline hover:text-emerald-900"
          onClick={(e) => e.stopPropagation()}
        >
          Abrir no Google Maps →
        </a>
      </HoverCardContent>
    </HoverCard>
  );
}
