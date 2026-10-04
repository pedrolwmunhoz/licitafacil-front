import { useState } from "react";
import { Heart, Link2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type BlogPostRailProps = {
  curtido: boolean;
  qntCurtidas: number | null;
  qntComentarios: number | null;
  onCurtir: () => void;
  comentariosAncora: string;
};

const BOTAO =
  "flex h-11 w-11 items-center justify-center rounded-full border border-landing-ink/25 bg-white text-landing-muted transition-colors hover:text-landing-ink";
const CONTADOR = "-mt-1.5 text-center text-xs tabular-nums text-landing-muted";

export function BlogPostRail({ curtido, qntCurtidas, qntComentarios, onCurtir, comentariosAncora }: BlogPostRailProps) {
  const [copiado, setCopiado] = useState(false);

  const copiarLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopiado(true);
        window.setTimeout(() => setCopiado(false), 2000);
      })
      .catch(() => undefined);
  };

  return (
    <div className="sticky top-[100px] hidden flex-col items-center gap-2.5 self-start lg:flex">
      <button
        type="button"
        onClick={onCurtir}
        aria-pressed={curtido}
        aria-label={curtido ? "Descurtir" : "Curtir"}
        className={cn(BOTAO, curtido && "border-landing-ink bg-landing-ink text-landing-cta hover:text-landing-cta")}
      >
        <Heart className="h-[19px] w-[19px]" fill={curtido ? "currentColor" : "none"} aria-hidden />
      </button>
      <span className={CONTADOR}>{qntCurtidas ?? "\u00a0"}</span>
      <a href={`#${comentariosAncora}`} aria-label="Ir para os comentários" className={BOTAO}>
        <MessageCircle className="h-[19px] w-[19px]" aria-hidden />
      </a>
      <span className={CONTADOR}>{qntComentarios ?? "\u00a0"}</span>
      <button type="button" onClick={copiarLink} aria-label="Copiar link do post" className={BOTAO}>
        <Link2 className="h-[19px] w-[19px]" aria-hidden />
      </button>
      <span role="status" className={cn(CONTADOR, "w-16")}>
        {copiado ? "Copiado" : ""}
      </span>
    </div>
  );
}
