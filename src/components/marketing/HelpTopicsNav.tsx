import { Link } from "react-router-dom";
import { LANDING_PROSE_LINK_CLASS } from "@/content/landing-site";
import { cn } from "@/lib/utils";

type HelpTopicsNavProps = {
  items: { id: string; label: string }[];
  className?: string;
  /** Link para a outra página de ajuda (FAQ ↔ documentação). */
  crossLink?: { to: string; label: string };
};

/** Índice lateral / topo para pular entre tópicos da página. */
export function HelpTopicsNav({ items, className, crossLink }: HelpTopicsNavProps) {
  return (
    <nav
      className={cn(
        "rounded-xl border border-landing-ink/10 bg-white p-4 md:p-5 shadow-sm",
        className,
      )}
      aria-label="Índice de tópicos"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-landing-muted mb-3">
        Nesta página
      </p>
      <ul className="flex flex-col gap-2 text-sm">
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="text-landing-muted underline-offset-4 hover:text-landing-ink hover:underline"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      {crossLink ? (
        <p className="mt-4 pt-4 border-t border-landing-ink/10 text-sm text-landing-muted">
          Veja também{" "}
          <Link to={crossLink.to} className={cn(LANDING_PROSE_LINK_CLASS, "whitespace-nowrap")}>
            {crossLink.label}
          </Link>
          .
        </p>
      ) : null}
    </nav>
  );
}
