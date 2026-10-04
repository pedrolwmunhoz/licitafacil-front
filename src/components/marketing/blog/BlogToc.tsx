import { cn } from "@/lib/utils";

type BlogTocProps = {
  itens: { id: string; titulo: string }[];
  atual: string;
};

export function BlogToc({ itens, atual }: BlogTocProps) {
  return (
    <nav aria-label="Neste post" className="text-sm">
      <h2 className="mb-2.5 text-sm font-semibold">Neste post</h2>
      {itens.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-current={item.id === atual ? "location" : undefined}
          className={cn(
            "block border-l-2 py-1.5 pl-3 leading-snug transition-colors",
            item.id === atual
              ? "border-landing-cta font-medium text-landing-ink"
              : "border-landing-ink/10 text-landing-muted hover:text-landing-ink",
          )}
        >
          {item.titulo}
        </a>
      ))}
    </nav>
  );
}
