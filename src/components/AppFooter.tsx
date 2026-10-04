export function AppFooter() {
  return (
    <footer className="shrink-0 border-t border-border bg-card px-4 py-3 lg:px-6">
      <p className="text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SegPonto. Todos os direitos reservados.
      </p>
    </footer>
  );
}
