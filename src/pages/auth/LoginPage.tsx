import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/landing/Navbar";
import { SegPontoWordmark } from "@/components/landing/SegPontoWordmark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FieldWithExpected } from "@/components/ui/field-with-expected";
import { CheckCircle2, Eye, EyeOff, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useValidation } from "@/hooks/useValidation";
import { maskCpfInput, maskCnpjInput, maskUsernameInput, maskEmailInput, maskDddInput, maskNumeroTelefoneInput } from "@/lib/format";
import {
  validateCredencialByTipo,
  validateSenha,
  getFieldExpected,
  validateCodigoPais,
  validateDdd,
  validateNumeroTelefone,
} from "@/lib/validations";
import type { TipoCredencial } from "@/types/auth";
import { cn } from "@/lib/utils";
import { PageSeo } from "@/components/seo/PageSeo";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";

type PaisDdd = { codigo: string; fone: string; nome: string };

function foneSemZerosEsquerda(fone: string): string {
  return (fone || "").replace(/^0+/, "") || "0";
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [valor, setValor] = useState("");
  const [tipoCredencial, setTipoCredencial] = useState<TipoCredencial>("EMAIL");
  const [codigoPais, setCodigoPais] = useState("55");
  const [ddd, setDdd] = useState("");
  const [telefoneNumero, setTelefoneNumero] = useState("");
  const [paises, setPaises] = useState<PaisDdd[]>([]);
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { getError, getTouched, handleBlur, handleChange, validateAll, clearError } = useValidation();

  const validateValor = (v: string) => validateCredencialByTipo(v, tipoCredencial, true);

  useEffect(() => {
    fetch("/pais-ddd.json")
      .then((res) => res.json())
      .then((data: PaisDdd[]) => {
        const sorted = [...(data || [])].sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));
        setPaises(sorted);
      })
      .catch(() => setPaises([]));
  }, []);

  useEffect(() => {
    if (searchParams.get("unauthorized") === "1") {
      toast({
        variant: "destructive",
        title: "Não autorizado",
        description: "Seu usuário não tem permissão para acessar esta área. Entre com a conta correta.",
      });
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams, toast]);

  useEffect(() => {
    if (tipoCredencial === "CPF") setValor((v) => (v ? maskCpfInput(v) : v));
    if (tipoCredencial === "CNPJ") setValor((v) => (v ? maskCnpjInput(v) : v));
    if (tipoCredencial === "USERNAME") setValor((v) => (v ? maskUsernameInput(v) : v));
    if (tipoCredencial === "EMAIL") setValor((v) => (v ? maskEmailInput(v) : v));
  }, [tipoCredencial]);

  const telefoneFormularioValido =
    !validateCodigoPais(codigoPais.replace(/\D/g, "") || null, true) &&
    !validateDdd(ddd, true) &&
    !validateNumeroTelefone(telefoneNumero, true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok =
      tipoCredencial === "TELEFONE"
        ? validateAll([
            ["codigoPais", codigoPais.replace(/\D/g, ""), (v) => validateCodigoPais(v || null, true)],
            ["ddd", ddd, (v) => validateDdd(v, true)],
            ["telefone", telefoneNumero, (v) => validateNumeroTelefone(v, true)],
            ["senha", senha, (v) => validateSenha(v, true)],
          ])
        : validateAll([
            ["valor", valor, validateValor],
            ["senha", senha, (v) => validateSenha(v, true)],
          ]);
    if (!ok) return;

    let valorEnvio: string;
    if (tipoCredencial === "TELEFONE") {
      valorEnvio =
        foneSemZerosEsquerda(codigoPais.replace(/\D/g, "")) +
        ddd.replace(/\D/g, "") +
        telefoneNumero.replace(/\D/g, "");
    } else if (tipoCredencial === "CPF") {
      valorEnvio = valor.replace(/\D/g, "");
    } else if (tipoCredencial === "CNPJ") {
      valorEnvio = valor.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    } else {
      valorEnvio = valor;
    }

    try {
      await login({ valor: valorEnvio, tipoCredencial, senha });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { mensagem?: string } } };
      toast({
        variant: "destructive",
        title: "Erro ao entrar",
        description: err.response?.data?.mensagem || "Credenciais inválidas. Tente novamente.",
      });
    }
  };

  const placeholders: Record<TipoCredencial, string> = {
    EMAIL: "seu@email.com",
    USERNAME: "seu.usuario",
    CPF: "000.000.000-00",
    CNPJ: "00.000.000/0000-00",
    TELEFONE: "(00) 00000-0000",
  };

  const credencialPreenchida =
    tipoCredencial === "TELEFONE"
      ? telefoneFormularioValido && codigoPais.replace(/\D/g, "").length > 0
      : valor.trim().length > 0 && !validateValor(valor);

  const submitDisabled =
    isLoading || !credencialPreenchida || !senha || !!validateSenha(senha, true);

  return (
    <div className="min-h-screen bg-landing-canvas text-landing-ink antialiased">
      <PageSeo {...PUBLIC_PAGE_SEO.login} />
      <Navbar />
      <main id="conteudo-principal" tabIndex={-1} className="flex min-h-screen items-center justify-center pt-24 pb-8 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center">
            <SegPontoWordmark variant="page" />
          </div>

          <Card className="min-h-0 w-full border border-landing-ink/10 bg-white shadow-sm rounded-xl">
            <CardHeader className="border-b border-landing-ink/[0.08] bg-gradient-to-b from-landing-cta/[0.06] to-transparent pb-6 pt-6 text-center sm:pb-8 sm:pt-8">
              <div
                className="mx-auto mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-landing-cta/25 bg-white shadow-sm ring-1 ring-landing-ink/[0.06] sm:mb-5 sm:h-16 sm:w-16"
                aria-hidden
              >
                <LogIn className="h-7 w-7 text-landing-cta sm:h-8 sm:w-8" strokeWidth={1.75} />
              </div>
              <CardTitle className="font-display text-xl text-landing-ink sm:text-2xl">Entrar na sua conta</CardTitle>
              <CardDescription className="mx-auto max-w-md text-sm leading-relaxed text-landing-muted sm:text-base">
                Escolha o tipo de credencial, preencha e digite sua senha para acessar o sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-4 pt-6 sm:p-6 sm:pt-8">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="tipoCredencial" required>
                    Tipo de credencial
                  </Label>
                  <Select
                    value={tipoCredencial}
                    onValueChange={(v) => {
                      setTipoCredencial(v as TipoCredencial);
                      setValor("");
                      setCodigoPais("55");
                      setDdd("");
                      setTelefoneNumero("");
                      clearError("valor");
                      clearError("codigoPais");
                      clearError("ddd");
                      clearError("telefone");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EMAIL">Email</SelectItem>
                      <SelectItem value="USERNAME">Usuário</SelectItem>
                      <SelectItem value="CPF">CPF</SelectItem>
                      <SelectItem value="CNPJ">CNPJ</SelectItem>
                      <SelectItem value="TELEFONE">Telefone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {tipoCredencial === "TELEFONE" ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-landing-ink">
                      <WhatsAppIcon className="h-5 w-5 shrink-0 text-lime-400 dark:text-lime-300 sm:h-6 sm:w-6" />
                      <span className="text-sm font-medium">Telefone (mesmo da contratação)</span>
                    </div>
                    <div className={cn("grid grid-cols-4 gap-2 sm:gap-3")}>
                      <FieldWithExpected
                        label="País"
                        required
                        expected={getFieldExpected("codigoPais")}
                        error={getError("codigoPais")}
                        showValid={codigoPais.replace(/\D/g, "").length > 0}
                        showExpected={false}
                      >
                        <Select
                          value={codigoPais || undefined}
                          onValueChange={(pv) => {
                            setCodigoPais(pv);
                            handleChange("codigoPais", pv.replace(/\D/g, ""), (x) => validateCodigoPais(x || null, true));
                            handleBlur("codigoPais", pv.replace(/\D/g, ""), (x) => validateCodigoPais(x || null, true));
                          }}
                          disabled={paises.length === 0}
                        >
                          <SelectTrigger aria-invalid={!!getError("codigoPais")} className="h-9 text-sm sm:h-10 sm:text-base">
                            <SelectValue placeholder="País" />
                          </SelectTrigger>
                          <SelectContent>
                            {paises.map((p) => {
                              const cod = foneSemZerosEsquerda(p.fone);
                              return (
                                <SelectItem key={p.codigo} value={cod}>
                                  {p.nome} {cod}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FieldWithExpected>
                      <FieldWithExpected
                        label="DDD"
                        required
                        expected={getFieldExpected("ddd")}
                        error={getError("ddd")}
                        showValid={ddd.trim().length > 0}
                        showExpected={false}
                      >
                        <Input
                          placeholder="11"
                          maxLength={5}
                          value={ddd}
                          onChange={(e) => {
                            const next = maskDddInput(e.target.value);
                            setDdd(next);
                            handleChange("ddd", next, (vl) => validateDdd(vl, true));
                          }}
                          onBlur={() => handleBlur("ddd", ddd, (vl) => validateDdd(vl, true))}
                          aria-invalid={!!getError("ddd")}
                          className="h-9 text-sm sm:h-10 sm:text-base"
                        />
                      </FieldWithExpected>
                      <div className="col-span-2">
                        <FieldWithExpected
                          label="Número"
                          required
                          expected={getFieldExpected("numeroTelefone")}
                          error={getError("telefone")}
                          showValid={getTouched("telefone") || telefoneNumero.trim().length > 0}
                          showExpected={false}
                        >
                          <Input
                            placeholder="99999-9999"
                            value={telefoneNumero}
                            onChange={(e) => {
                              const next = maskNumeroTelefoneInput(e.target.value);
                              setTelefoneNumero(next);
                              handleChange("telefone", next, (vl) => validateNumeroTelefone(vl, true));
                            }}
                            onBlur={() => handleBlur("telefone", telefoneNumero, (vl) => validateNumeroTelefone(vl, true))}
                            aria-invalid={!!getError("telefone")}
                            className="h-9 text-sm sm:h-10 sm:text-base"
                          />
                        </FieldWithExpected>
                      </div>
                    </div>
                  </div>
                ) : (
                  <FieldWithExpected
                    name="valor"
                    label="Credencial"
                    required
                    expected={getFieldExpected(tipoCredencial.toLowerCase())}
                    error={getError("valor")}
                    showValid={valor.trim().length > 0}
                  >
                    <Input
                      id="valor"
                      placeholder={placeholders[tipoCredencial]}
                      value={valor}
                      onChange={(e) => {
                        const raw = e.target.value;
                        const next =
                          tipoCredencial === "CPF"
                            ? maskCpfInput(raw)
                            : tipoCredencial === "CNPJ"
                              ? maskCnpjInput(raw)
                              : tipoCredencial === "USERNAME"
                                ? maskUsernameInput(raw)
                                : tipoCredencial === "EMAIL"
                                  ? maskEmailInput(raw)
                                  : raw;
                        setValor(next);
                        handleChange("valor", next, validateValor);
                      }}
                      onBlur={() => handleBlur("valor", valor, validateValor)}
                      aria-invalid={!!getError("valor")}
                      className="mt-1"
                    />
                  </FieldWithExpected>
                )}

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="senha" required>
                      Senha
                    </Label>
                    <Link
                      to="/recuperar-senha"
                      className="text-xs font-medium text-landing-ink/80 hover:text-landing-ink hover:underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="senha"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={senha}
                      onChange={(e) => {
                        setSenha(e.target.value);
                        handleChange("senha", e.target.value, (vl) => validateSenha(vl, true));
                      }}
                      onBlur={() => handleBlur("senha", senha, (vl) => validateSenha(vl, true))}
                      aria-invalid={!!getError("senha")}
                      className="mt-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Esperado: {getFieldExpected("senha")}</p>
                  {getError("senha") && (
                    <p role="alert" className="text-sm text-destructive">
                      {getError("senha")}
                    </p>
                  )}
                  {!getError("senha") && senha.length > 0 && (
                    <p className="text-sm text-green-600 dark:text-green-500 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                      Válido
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-lg bg-landing-cta text-landing-cta-foreground font-semibold hover:bg-landing-cta hover:brightness-[0.97] shadow-none border-0"
                  disabled={submitDisabled}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-landing-muted">
                É uma empresa?{" "}
                <Link
                  to="/cadastro"
                  className="font-semibold text-landing-ink underline-offset-4 transition-colors hover:text-landing-ink hover:underline hover:decoration-2 hover:decoration-landing-cta"
                >
                  Contrate agora
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
