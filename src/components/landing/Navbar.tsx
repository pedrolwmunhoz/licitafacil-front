import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { sessaoHint } from "@/lib/sessao-hint";
import { SegPontoWordmark } from "@/components/landing/SegPontoWordmark";
import { HomeNavLinks } from "@/components/landing/HomeNavLinks";
import { isHomePath, isPublicHeaderShell } from "@/content/landing-nav";

const landingNavLinkHover =
  "text-landing-muted underline-offset-4 transition-colors hover:text-landing-ink hover:underline hover:decoration-2 hover:decoration-landing-cta";

/** Dica local; se a sessão já expirou, o painel confirma em /auth/me e manda para o login. */
function panelHrefFromUserType(): string {
  const userType = sessaoHint.tipo();
  if (userType === "EMPRESA") return "/empresa";
  if (userType === "FUNCIONARIO") return "/funcionario";
  return "/login";
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const loginHref = panelHrefFromUserType();
  const isHome = isHomePath(location.pathname);
  const isMarketingShell = isPublicHeaderShell(location.pathname);
  const isLogin = location.pathname === "/login" || location.pathname === "/recuperar-senha";
  const isCadastro = location.pathname === "/cadastro";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToHash = (hashWithOrWithoutHash: string) => {
    const hash = hashWithOrWithoutHash.replace(/^#/, "");
    navigate({ pathname: "/", hash });
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const handleHomeNavClick = (hash: string) => {
    setOpen(false);
    const clean = hash.replace(/^#/, "");
    if (!isHome) {
      // Outra rota MPA → full load da home com âncora.
      window.location.href = `/#${clean}`;
      return;
    }
    scrollToHash(clean);
  };

  const ctaLabel =
    isLogin || isCadastro
      ? "Contratar"
      : isHome && new URLSearchParams(location.search).get("de") === "blog"
        ? "Cadastrar"
        : "Contratar agora";
  const headerSolid = scrolled || !isHome;

  const loginLinkClass = `shrink-0 text-xs font-medium whitespace-nowrap leading-none ${landingNavLinkHover}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        headerSolid ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center px-4 max-w-6xl relative">
        <a href="/" className="shrink-0">
          <SegPontoWordmark variant="nav" />
        </a>

        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 xl:gap-8">
          <HomeNavLinks onHashClick={(hash) => handleHomeNavClick(hash)} />
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 ml-auto shrink-0 min-w-0">
          {(isHome || isMarketingShell) && (
            <a href={loginHref} className={loginLinkClass}>
              Login
            </a>
          )}
          {!isCadastro && (
            <Button
              asChild
              size="sm"
              className={`hidden md:inline-flex shrink-0 rounded-full h-[30px] px-3 text-xs font-medium leading-none bg-landing-ink text-white shadow-none transition-colors duration-200 hover:bg-landing-cta hover:text-landing-cta-foreground hover:brightness-[0.98]`}
            >
              <a href="/cadastro">{ctaLabel}</a>
            </Button>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden shrink-0">
              <Button variant="ghost" size="icon" aria-label="Menu" className="text-landing-ink">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                <HomeNavLinks variant="mobile" onHashClick={(hash) => handleHomeNavClick(hash)} />
                {!isCadastro && (
                  <Button
                    asChild
                    className="w-full rounded-full bg-landing-ink text-white transition-colors duration-200 hover:bg-landing-cta hover:text-landing-cta-foreground hover:brightness-[0.98]"
                  >
                    <a href="/cadastro" onClick={() => setOpen(false)}>
                      {ctaLabel}
                    </a>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
