import { BLOG_BOTAO_ESCURO } from "@/components/marketing/blog/blog-ui";
import { BLOG_HOME_CTA_HREF } from "@/content/blog/constants";
import { cn } from "@/lib/utils";

export function BlogCtaContratacao({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-landing-ink/10 bg-white p-5", className)}>
      <p className="text-sm font-semibold">Ponto eletrônico dentro da Portaria 671</p>
      <p className="mb-3 mt-1 text-[13px] leading-relaxed text-landing-muted">
        Registro pelo celular, espelho detalhado e banco de horas de acordo com as Leis Trabalhistas.
      </p>
      <a href={BLOG_HOME_CTA_HREF} className={BLOG_BOTAO_ESCURO}>
        Contratar agora
      </a>
    </div>
  );
}
