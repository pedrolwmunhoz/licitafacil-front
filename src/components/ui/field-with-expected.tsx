import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

/** Só exibe mensagem de erro abaixo do campo (sem "Esperado" nem "Válido"). */
export function FieldExpectedStatus({ error }: { error?: string | null }) {
  if (!error?.trim()) return null;
  return (
    <p role="alert" className="text-xs text-destructive mt-1 leading-snug">
      {error}
    </p>
  );
}

export interface FieldWithExpectedProps {
  /** Nome do campo (para id/label) */
  name?: string;
  label: React.ReactNode;
  required?: boolean;
  expected?: string;
  /** Mensagem de erro (quando inválido) */
  error?: string | null;
  /** Mostrar status "Válido" quando não há erro e o campo foi preenchido/tocado */
  showValid?: boolean;
  /** Exibir a linha "Esperado: ..." abaixo do campo (default true) */
  showExpected?: boolean;
  /** Conteúdo do campo (Input, Select, etc.) */
  children: React.ReactNode;
  className?: string;
}

/**
 * Envolve um campo de formulário com:
 * - Label (com indicador de obrigatório)
 * - children (Input/Select/Textarea)
 * - "Esperado: ..." (sempre visível)
 * - Erro em vermelho OU status "Válido" em verde (quando showValid e sem erro)
 */
export function FieldWithExpected({
  name,
  label,
  required,
  expected,
  error,
  showValid,
  showExpected = true,
  children,
  className,
}: FieldWithExpectedProps) {
  const hasError = !!error?.trim();
  const showValidStatus = showValid && !hasError;

  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <Label htmlFor={name} required={required} className="text-sm font-medium">
          {label}
        </Label>
      )}
      {children}
      {showExpected && !!expected?.trim() && (
      <p className="text-xs text-muted-foreground">
        Esperado: {expected}
      </p>
      )}
      {hasError && (
        <p role="alert" className="text-sm text-destructive flex items-center gap-1">
          {error}
        </p>
      )}
      {showValidStatus && (
        <p className="text-sm text-green-600 dark:text-green-500 flex items-center gap-1">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
          Válido
        </p>
      )}
    </div>
  );
}
