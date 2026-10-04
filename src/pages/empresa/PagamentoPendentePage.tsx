import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";

/**
 * Após 403 de cobrança (empresa): página estável — sem redirect automático (evita loop com outras chamadas à API).
 */
export default function PagamentoPendentePage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-2">
        <p className="text-lg font-medium">Assinatura pendente</p>
        <p className="max-w-md text-sm text-muted-foreground">
          Regularize a assinatura do plano na página de cobrança para liberar o acesso. O pagamento é no cartão e as renovações são automáticas.
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild variant="default">
          <Link to="/empresa/cobranca" replace>
            Regularizar pagamento
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/empresa/cobranca" replace>
            <Receipt className="mr-2 h-4 w-4" />
            Ver cobrança
          </Link>
        </Button>
      </div>
    </div>
  );
}
