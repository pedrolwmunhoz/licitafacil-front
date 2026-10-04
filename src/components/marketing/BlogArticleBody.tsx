import { Fragment } from "react";
import { blogAncora } from "@/content/blog/paths";
import { expandBlogTokens } from "@/content/blog/tokens";
import { LANDING_PROSE_LINK_CLASS } from "@/content/landing-site";
import type { BlogFaqItem, BlogSection } from "@/content/blog/types";

export const BLOG_FAQ_ANCORA = "perguntas-frequentes";

type BlogArticleBodyProps = {
  abertura: string[];
  sections: BlogSection[];
  /** Botão da calculadora logo após a primeira seção (H2). */
  calculatorLink?: { to: string; label: string };
};

function BlogInlineLink({ label, href }: { label: string; href: string }) {
  const external = /^https?:\/\//i.test(href);
  return (
    <a
      href={href}
      className={LANDING_PROSE_LINK_CLASS}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  );
}

/** Renderiza links `[texto](url)` (usado também dentro de negrito). */
function BlogRichLinks({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          // `[**rótulo**](url)` — remove ** do texto do link (já é semibold via CSS)
          const label = link[1].replace(/\*\*([^*]+)\*\*/g, "$1");
          return <BlogInlineLink key={i} label={label} href={link[2]} />;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

/** Renderiza `**negrito**` e links `[texto](url)` no artigo. */
export function BlogRichText({ text }: { text: string }) {
  const expanded = expandBlogTokens(text);
  const parts = expanded.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const label = link[1].replace(/\*\*([^*]+)\*\*/g, "$1");
          return <BlogInlineLink key={i} label={label} href={link[2]} />;
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-landing-ink">
              <BlogRichLinks text={part.slice(2, -2)} />
            </strong>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

/** Espaçamento do protótipo: mobile `blog-caderno-aberto.html`, web `blog-caderno-aberto-web.html`. */
const P_CLASS = "mb-[14px] lg:mb-[1.2em]";

function Paragrafos({ itens }: { itens: string[] }) {
  return (
    <>
      {itens.map((p, i) => (
        <p key={i} className={P_CLASS}>
          <BlogRichText text={p} />
        </p>
      ))}
    </>
  );
}

const H2_CLASS =
  "mb-2 mt-[18px] scroll-mt-20 text-[17px] font-medium leading-snug tracking-tight text-landing-ink lg:mb-[0.5em] lg:mt-[1.6em] lg:scroll-mt-28 lg:text-2xl";

const H3_CLASS =
  "mb-2 mt-[18px] text-[17px] font-medium leading-snug text-landing-ink lg:mb-[0.4em] lg:mt-[1.2em] lg:text-xl";

export function BlogArticleBody({ abertura, sections, calculatorLink }: BlogArticleBodyProps) {
  return (
    <div className="text-base leading-[1.75] text-landing-ink/90 lg:text-[19px] lg:leading-[1.8]">
      <Paragrafos itens={abertura} />
      {sections.map((section, index) => (
        <section key={section.title}>
          <h2 id={blogAncora(section.title)} className={H2_CLASS}>
            {section.title}
          </h2>
          <Paragrafos itens={section.paragraphs} />
          {section.table ? (
            <div className={`overflow-x-auto rounded-xl border border-landing-ink/10 bg-white ${P_CLASS}`}>
              <table className="w-full min-w-[28rem] text-left text-base">
                <thead className="bg-landing-canvas">
                  <tr>
                    {section.table.headers.map((h, hIndex) => (
                      <th
                        key={h}
                        className={`px-4 py-3 text-sm font-semibold text-landing-ink ${
                          section.table!.headers.length === 2 && hIndex === 1 ? "text-right" : "text-left"
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row) => (
                    <tr key={row.join("|")} className="border-t border-landing-ink/10">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={`${row[0]}-${cellIndex}`}
                          className={`px-4 py-3 text-landing-muted ${
                            section.table!.headers.length === 2 && cellIndex === row.length - 1
                              ? "text-right tabular-nums text-landing-ink"
                              : ""
                          }`}
                        >
                          <BlogRichText text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
          {section.subsections?.map((sub) => (
            <Fragment key={sub.title}>
              <h3 className={H3_CLASS}>{sub.title}</h3>
              <Paragrafos itens={sub.paragraphs} />
            </Fragment>
          ))}
          {section.bullets?.length ? (
            <ul className={`list-disc space-y-1.5 pl-6 marker:text-landing-muted ${P_CLASS}`}>
              {section.bullets.map((b) => (
                <li key={b}>
                  <BlogRichText text={b} />
                </li>
              ))}
            </ul>
          ) : null}
          {section.closingParagraphs?.length ? <Paragrafos itens={section.closingParagraphs} /> : null}
          {index === 0 && calculatorLink ? (
            <p className={P_CLASS}>
              <a
                href={calculatorLink.to}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-landing-ink bg-landing-cta px-5 py-3 text-sm font-semibold text-landing-cta-foreground transition hover:brightness-[0.97]"
              >
                {calculatorLink.label}
              </a>
            </p>
          ) : null}
        </section>
      ))}
    </div>
  );
}

export function BlogFaq({ faqs }: { faqs: BlogFaqItem[] }) {
  return (
    <section className="mt-10">
      <h2 id={BLOG_FAQ_ANCORA} className={H2_CLASS}>
        Perguntas frequentes
      </h2>
      <div className="divide-y divide-landing-ink/10 rounded-xl border border-landing-ink/10 bg-white">
        {faqs.map((faq) => (
          <details key={faq.q} className="group px-4 py-3.5 lg:px-5 lg:py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-landing-ink lg:text-base [&::-webkit-details-marker]:hidden">
              {faq.q}
              <span aria-hidden className="text-xl leading-none text-landing-muted transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-landing-muted lg:text-base">
              <BlogRichText text={faq.a} />
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
