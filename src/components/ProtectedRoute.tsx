import { useAuth } from "@/contexts/AuthContext";
import type { TipoUsuario } from "@/types/auth";
import { RouteFallback } from "@/components/RouteFallback";
import { Button } from "@/components/ui/button";
import { navigateApp } from "@/lib/app-navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedTypes?: TipoUsuario[];
}

export function ProtectedRoute({ children, allowedTypes }: ProtectedRouteProps) {
  const { isAuthenticated, isCheckingSession, isSessionUnavailable, userType } = useAuth();

  if (isCheckingSession) {
    return <RouteFallback />;
  }

  if (isSessionUnavailable) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-background px-4 text-center">
        <p className="text-sm text-muted-foreground">
          Não foi possível confirmar sua sessão agora. Verifique a conexão e tente de novo.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Leave app zone → marketing bootstrap mounts /login
    if (typeof window !== "undefined") {
      navigateApp("/login");
    }
    return <RouteFallback />;
  }

  if (allowedTypes && userType && !allowedTypes.includes(userType)) {
    if (typeof window !== "undefined") {
      navigateApp("/");
    }
    return <RouteFallback />;
  }

  return <>{children}</>;
}
