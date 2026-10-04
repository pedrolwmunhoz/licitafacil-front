import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthProvider";
import { GLOBAL_QUERY_DEFAULTS } from "@/lib/query-cache-policy";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...GLOBAL_QUERY_DEFAULTS,
      retry: 1,
    },
  },
});

/** Providers only for login / cadastro / cobrança concluído (auth-adjacent marketing routes). */
export default function AuthAdjacentShell() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={0}>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
