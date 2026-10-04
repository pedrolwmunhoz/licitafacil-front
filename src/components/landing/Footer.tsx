import { Link } from "react-router-dom";
import { SegPontoWordmark } from "@/components/landing/SegPontoWordmark";
import {
  FOOTER_ACCOUNT_LINKS,
  FOOTER_HELP_LINKS,
  FOOTER_INSTITUTIONAL_LINKS,
  FOOTER_PRODUCT_LINKS,
  type FooterNavLink,
} from "@/content/landing-nav";

const footerLinkClass =
  "text-sm text-landing-muted hover:text-landing-ink transition-colors leading-snug";

function FooterNav({ title, links }: { title: string; links: FooterNavLink[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-landing-muted mb-4">{title}</p>
      <nav className="flex flex-col gap-2.5">
        {links.map((link) =>
          link.external ? (
            <a key={`${link.label}-${link.to}`} href={link.to} className={footerLinkClass}>
              {link.label}
            </a>
          ) : (
            <Link key={`${link.label}-${link.to}`} to={link.to} className={footerLinkClass}>
              {link.label}
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}

const Footer = () => (
  <footer className="border-t border-landing-ink/10 py-12 md:py-14 bg-landing-bar">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col gap-2">
          <SegPontoWordmark variant="nav" />
          <p className="text-xs text-landing-muted max-w-[14rem]">
            Sistema de ponto eletrônico para empresas.
          </p>
        </div>

        <FooterNav title="Produto" links={FOOTER_PRODUCT_LINKS} />
        <FooterNav title="Ajuda" links={FOOTER_HELP_LINKS} />
        <FooterNav title="Institucional" links={FOOTER_INSTITUTIONAL_LINKS} />
        <FooterNav title="Conta" links={FOOTER_ACCOUNT_LINKS} />
      </div>

      <p className="mt-10 pt-6 border-t border-landing-ink/10 text-sm text-landing-muted text-center lg:text-left">
        © {new Date().getFullYear()} SegPonto. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
