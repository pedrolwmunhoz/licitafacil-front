"use client";

import { AlertTriangle } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

/** Badge + tooltip no portal (não corta dentro de modal com overflow). */
export function InconsistenciasHoverPopover({ inconsistencias }: { inconsistencias: string[] }) {
  if (!inconsistencias?.length) return null;

  return (
    <HoverCard openDelay={80} closeDelay={80}>
      <HoverCardTrigger asChild>
        <span
          className="inline-flex cursor-help items-center justify-center rounded-full bg-amber-400 px-1.5 py-0.5 text-xs font-bold text-amber-950 shadow-sm ring-2 ring-amber-500/50 transition-colors hover:bg-amber-300 hover:ring-amber-500"
          aria-label="Inconsistências"
        >
          <AlertTriangle className="h-3.5 w-3.5" />
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        align="end"
        side="bottom"
        sideOffset={6}
        className="w-auto min-w-[200px] border-amber-200 bg-amber-50 p-3 text-amber-800"
      >
        <ul className="space-y-0.5 text-xs">
          {inconsistencias.map((item) => (
            <li key={item} className="capitalize">
              {item.replace(/_/g, " ").toLowerCase()}
            </li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
}
