/** Fallback leve para Suspense (code splitting por rota). */
export function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-background px-4">
      <p className="text-sm text-muted-foreground">Carregando…</p>
    </div>
  );
}
