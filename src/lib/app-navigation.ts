/**
 * Navegação entre zonas do app (login ↔ painéis).
 * No web: full page load. No shell mobile (HashRouter): callback registrado em runtime.
 */

type MobileNav = (path: string) => void;

let mobileNav: MobileNav | null = null;

export function registerMobileNavigation(nav: MobileNav | null) {
  mobileNav = nav;
}

export function isMobileShell(): boolean {
  return mobileNav != null;
}

/** Redireciona para um path absoluto do app (ex.: /login, /funcionario). */
export function navigateApp(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (mobileNav) {
    mobileNav(normalized);
    return;
  }
  window.location.assign(normalized);
}

export function navigateAppReplace(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (mobileNav) {
    mobileNav(normalized);
    return;
  }
  window.location.replace(normalized);
}
