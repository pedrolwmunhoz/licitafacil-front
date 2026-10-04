import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FieldWithExpected } from "@/components/ui/field-with-expected";
import { PlanosAssinaturaGrid } from "@/components/empresa/PlanosAssinaturaGrid";
import { cadastroComPlano } from "@/lib/api-empresa";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useValidation } from "@/hooks/useValidation";
import {
  formatTitleCase,
  maskCnpjInput,
  maskDddInput,
  maskEmailInput,
  maskNumeroTelefoneInput,
} from "@/lib/format";
import {
  validateCnpj,
  validateCodigoPais,
  validateDdd,
  validateEmail,
  validateNumeroTelefone,
  validateRazaoSocial,
  validateSenha,
} from "@/lib/validations";
import { cn } from "@/lib/utils";
import type { EmpresaCadastroComPlanoRequest } from "@/types/empresa";
import {
  getTipoAssinatura,
  isTipoAssinaturaId,
  type TipoAssinaturaId,
} from "@/constants/tipoAssinatura";

type PaisDdd = { codigo: string; fone: string; nome: string };

function foneSemZerosEsquerda(fone: string): string {
  return (fone || "").replace(/^0+/, "") || "0";
}

function normalizeCnpjForApi(v: string): string {
  return v.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
}

const inputClass =
  "mt-1.5 h-11 rounded-lg border-landing-ink/12 bg-white text-sm text-landing-ink placeholder:text-landing-muted/55 focus-visible:border-landing-cta/40 focus-visible:ring-landing-cta/15";

type Props = {
  initialPlanoId?: TipoAssinaturaId;
};

function StepIndicator({ step, centered }: { step: 1 | 2; centered?: boolean }) {
  return (
    <div
      className={cn("flex items-center gap-2 text-sm", centered && "justify-center")}
      aria-label="Etapas do cadastro"
    >
      <span
        className={cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
          step === 1
            ? "border-2 border-landing-cta bg-landing-ink text-white"
            : step > 1
              ? "bg-landing-ink text-white"
              : "border border-landing-ink/20 text-landing-muted",
        )}
      >
        1
      </span>
      <span className={cn("font-medium", step >= 1 ? "text-landing-ink" : "text-landing-muted")}>Plano</span>
      <span className="mx-1 h-px w-8 bg-landing-ink/15" aria-hidden />
      <span
        className={cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
          step === 2
            ? "border-2 border-landing-cta bg-landing-ink text-white"
            : "border border-landing-ink/20 text-landing-muted",
        )}
      >
        2
      </span>
      <span className={cn("font-medium", step >= 2 ? "text-landing-ink" : "text-landing-muted")}>Dados</span>
    </div>
  );
}

export function CadastroContratacaoForm({ initialPlanoId }: Props) {
  const { toast } = useToast();
  const { applyLoginResponse } = useAuth();
  const { getError, handleBlur, handleChange, validateAll } = useValidation();
  const [step, setStep] = useState<1 | 2>(1);
  const [tipoAssinaturaId, setTipoAssinaturaId] = useState<TipoAssinaturaId | null>(
    initialPlanoId ?? null,
  );

  const [razaoSocial, setRazaoSocial] = useState("");
  const [codigoPais, setCodigoPais] = useState("55");
  const [ddd, setDdd] = useState("");
  const [telefone, setTelefone] = useState("");
  const [paises, setPaises] = useState<PaisDdd[]>([]);
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [email, setEmail] = useState("");
  const [taxId, setTaxId] = useState("");

  const plano = tipoAssinaturaId != null ? getTipoAssinatura(tipoAssinaturaId) : undefined;

  useEffect(() => {
    if (initialPlanoId != null && isTipoAssinaturaId(initialPlanoId)) {
      setStep(2);
      setTipoAssinaturaId(initialPlanoId);
      return;
    }
    setStep(1);
    setTipoAssinaturaId(null);
  }, [initialPlanoId]);

  useEffect(() => {
    fetch("/pais-ddd.json")
      .then((res) => res.json())
      .then((data: PaisDdd[]) => {
        const sorted = [...(data || [])].sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));
        setPaises(sorted);
      })
      .catch(() => setPaises([]));
  }, []);

  const mut = useMutation({
    mutationFn: (body: EmpresaCadastroComPlanoRequest) => cadastroComPlano(body),
    onSuccess: (res) => {
      applyLoginResponse({ usuarioId: res.usuarioId, tipoUsuario: res.tipoUsuario }, { redirect: false });
      if (res.urlPagamento) {
        window.location.href = res.urlPagamento;
        return;
      }
      toast({
        variant: "destructive",
        title: "Pagamento indisponível",
        description: "Conta criada, mas não recebemos o link de pagamento. Acesse Cobrança no painel.",
      });
    },
    onError: (error: { response?: { data?: { mensagem?: string } } }) => {
      toast({
        variant: "destructive",
        title: "Não foi possível concluir",
        description: error.response?.data?.mensagem ?? "Verifique os dados e tente novamente.",
      });
    },
  });

  const handleConfirmar = () => {
    if (senha !== confirmarSenha) {
      toast({ variant: "destructive", title: "Erro", description: "As senhas não coincidem." });
      return;
    }
    const ok = validateAll([
      ["email", email, (v) => validateEmail(v, true)],
      ["taxId", taxId, (v) => validateCnpj(v, true)],
      ["razaoSocial", razaoSocial, (v) => validateRazaoSocial(v, true)],
      ["codigoPais", codigoPais.replace(/\D/g, ""), (v) => validateCodigoPais(v || null, true)],
      ["ddd", ddd, (v) => validateDdd(v, true)],
      ["telefone", telefone, (v) => validateNumeroTelefone(v, true)],
      ["senha", senha, (v) => validateSenha(v, true)],
    ]);
    if (!ok || tipoAssinaturaId == null || !isTipoAssinaturaId(tipoAssinaturaId)) return;

    const codigoPaisDigits = foneSemZerosEsquerda(codigoPais.replace(/\D/g, ""));
    const dddDigits = ddd.replace(/\D/g, "");
    const numeroDigits = telefone.replace(/\D/g, "");

    mut.mutate({
      senha,
      razaoSocial: razaoSocial.trim(),
      usuarioTelefone: {
        codigoPais: codigoPaisDigits,
        ddd: dddDigits,
        numero: numeroDigits,
      },
      tipoAssinaturaId,
      nome: razaoSocial.trim(),
      cellphone: `${codigoPaisDigits}${dddDigits}${numeroDigits}`,
      email: email.trim(),
      taxId: normalizeCnpjForApi(taxId),
    });
  };

  return (
    <div className="mx-auto w-full">
      <header
        className={cn(
          "mb-8 space-y-4 md:mb-10",
          step === 2 && "text-center",
        )}
      >
        <StepIndicator step={step} centered={step === 2} />
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-landing-ink md:text-[2.5rem]">
            {step === 1 ? "Escolha o plano" : "Dados da empresa"}
          </h1>
          <p
            className={cn(
              "mt-2 max-w-lg text-[15px] leading-relaxed text-landing-muted",
              step === 2 && "mx-auto",
            )}
          >
            {step === 1
              ? "Selecione a faixa de funcionários e avance para criar a conta."
              : "Preencha os dados abaixo para criar a conta e concluir o pagamento."}
          </p>
        </div>
      </header>

      {step === 1 && (
        <PlanosAssinaturaGrid
          selectedId={tipoAssinaturaId}
          onSelectTipo={(id) => {
            setTipoAssinaturaId(id);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <div className="mx-auto max-w-xl">
          {plano && (
            <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-landing-ink/10 pb-4">
              <p className="text-sm text-landing-muted">
                Plano: <span className="font-medium text-landing-ink">{plano.nome}</span>
              </p>
              <p className="shrink-0 font-display text-base font-semibold tabular-nums text-landing-ink">
                {plano.priceDisplay}
                <span className="ml-1 text-sm font-normal text-landing-muted">/mês</span>
              </p>
            </div>
          )}

          <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldWithExpected
                  name="email"
                  label="E-mail"
                  required
                  expected=""
                  showExpected={false}
                  error={getError("email")}
                >
                  <Input
                    id="email"
                    type="email"
                    className={inputClass}
                    placeholder="contato@empresa.com.br"
                    value={email}
                    onChange={(e) => {
                      const next = maskEmailInput(e.target.value);
                      setEmail(next);
                      handleChange("email", next, (v) => validateEmail(String(v), true));
                    }}
                    onBlur={() => handleBlur("email", email, (v) => validateEmail(String(v), true))}
                  />
                </FieldWithExpected>
                <FieldWithExpected
                  name="taxId"
                  label="CNPJ"
                  required
                  expected=""
                  showExpected={false}
                  error={getError("taxId")}
                >
                  <Input
                    id="taxId"
                    className={inputClass}
                    placeholder="00.000.000/0000-00"
                    value={taxId}
                    onChange={(e) => {
                      const next = maskCnpjInput(e.target.value);
                      setTaxId(next);
                      handleChange("taxId", next, (v) => validateCnpj(String(v), true));
                    }}
                    onBlur={() => handleBlur("taxId", taxId, (v) => validateCnpj(String(v), true))}
                  />
                </FieldWithExpected>
              </div>

              <FieldWithExpected
                name="razaoSocial"
                label="Razão social / nome da empresa"
                required
                expected=""
                showExpected={false}
                error={getError("razaoSocial")}
              >
                <Input
                  id="razaoSocial"
                  className={inputClass}
                  placeholder="Ex.: Acme Serviços LTDA"
                  value={razaoSocial}
                  onChange={(e) => {
                    const next = formatTitleCase(e.target.value);
                    setRazaoSocial(next);
                    handleChange("razaoSocial", next, (v) => validateRazaoSocial(String(v), true));
                  }}
                  onBlur={() =>
                    handleBlur("razaoSocial", razaoSocial, (v) => validateRazaoSocial(String(v), true))
                  }
                />
              </FieldWithExpected>

              <div>
                <p className="mb-2 text-sm font-medium text-landing-ink">Telefone (login)</p>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  <FieldWithExpected
                    name="codigoPais"
                    label="País"
                    required
                    expected=""
                    showExpected={false}
                    error={getError("codigoPais")}
                  >
                    <Select value={codigoPais || undefined} onValueChange={setCodigoPais} disabled={paises.length === 0}>
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="País" />
                      </SelectTrigger>
                      <SelectContent>
                        {paises.map((p) => {
                          const cod = foneSemZerosEsquerda(p.fone);
                          return (
                            <SelectItem key={p.codigo} value={cod}>
                              {p.nome} (+{cod})
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FieldWithExpected>
                  <FieldWithExpected
                    name="ddd"
                    label="DDD"
                    required
                    expected=""
                    showExpected={false}
                    error={getError("ddd")}
                  >
                    <Input
                      id="ddd"
                      className={inputClass}
                      inputMode="numeric"
                      placeholder="11"
                      value={ddd}
                      onChange={(e) => {
                        const next = maskDddInput(e.target.value);
                        setDdd(next);
                        handleChange("ddd", next, (v) => validateDdd(String(v), true));
                      }}
                      onBlur={() => handleBlur("ddd", ddd, (v) => validateDdd(String(v), true))}
                    />
                  </FieldWithExpected>
                  <div className="col-span-2">
                    <FieldWithExpected
                      name="telefone"
                      label="Número"
                      required
                      expected=""
                      showExpected={false}
                      error={getError("telefone")}
                    >
                      <Input
                        id="telefone"
                        className={inputClass}
                        inputMode="numeric"
                        placeholder="99999-9999"
                        value={telefone}
                        onChange={(e) => {
                          const next = maskNumeroTelefoneInput(e.target.value);
                          setTelefone(next);
                          handleChange("telefone", next, (v) => validateNumeroTelefone(String(v), true));
                        }}
                        onBlur={() =>
                          handleBlur("telefone", telefone, (v) => validateNumeroTelefone(String(v), true))
                        }
                      />
                    </FieldWithExpected>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FieldWithExpected
                  name="senha"
                  label="Senha"
                  required
                  expected=""
                  showExpected={false}
                  error={getError("senha")}
                >
                  <Input
                    id="senha"
                    type="password"
                    className={inputClass}
                    autoComplete="new-password"
                    placeholder="Mín. 8 caracteres"
                    value={senha}
                    onChange={(e) => {
                      setSenha(e.target.value);
                      handleChange("senha", e.target.value, (v) => validateSenha(String(v), true));
                    }}
                    onBlur={() => handleBlur("senha", senha, (v) => validateSenha(String(v), true))}
                  />
                </FieldWithExpected>
                <FieldWithExpected
                  name="confirmarSenha"
                  label="Confirmar senha"
                  required
                  expected=""
                  showExpected={false}
                >
                  <Input
                    id="confirmarSenha"
                    type="password"
                    className={inputClass}
                    autoComplete="new-password"
                    placeholder="Repita a senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                  />
                </FieldWithExpected>
              </div>

            <div className="flex w-full items-center justify-between gap-3 border-t border-landing-ink/10 pt-6">
              <Button
                type="button"
                variant="ghost"
                className="h-11 shrink-0 text-landing-muted hover:bg-transparent hover:text-landing-ink"
                disabled={mut.isPending}
                onClick={() => setStep(1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Trocar plano
              </Button>
              <Button
                type="button"
                className="h-11 shrink-0 gap-2 rounded-lg bg-landing-cta px-7 font-semibold text-landing-cta-foreground shadow-none hover:bg-landing-cta hover:brightness-[0.97]"
                disabled={mut.isPending}
                onClick={handleConfirmar}
              >
                {mut.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Criando conta…
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" aria-hidden />
                    Contratar e pagar
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
