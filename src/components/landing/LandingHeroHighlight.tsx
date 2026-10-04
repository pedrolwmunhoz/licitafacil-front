import type { ReactNode } from "react";

/** Destaque verde do H1 — mesmo chip da home. */
export function LandingHeroHighlight({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block max-w-full rounded-lg border-2 border-landing-ink bg-landing-cta px-3 py-2 text-landing-cta-foreground shadow-sm align-middle">
      {children}
    </span>
  );
}
