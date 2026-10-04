import type { ReactNode } from "react";
import { HelpCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function LabelComAjuda({
  children,
  required,
  help,
}: {
  children: ReactNode;
  required?: boolean;
  help: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Label required={required} className="text-sm">
        {children}
      </Label>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex rounded p-0.5 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Ajuda"
          >
            <HelpCircle className="h-3.5 w-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="z-[100] max-w-[260px]" sideOffset={6}>
          {help}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
