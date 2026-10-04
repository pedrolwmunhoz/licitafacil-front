import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import api from "@/lib/api";
import Navbar from "@/components/landing/Navbar";
import { SegPontoWordmark } from "@/components/landing/SegPontoWordmark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldWithExpected } from "@/components/ui/field-with-expected";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useValidation } from "@/hooks/useValidation";
import { maskEmailInput } from "@/lib/format";
import { validateEmail, validateCodigoRecuperacao, validateSenha, getFieldExpected } from "@/lib/validations";
import { PageSeo } from "@/components/seo/PageSeo";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";

type Step = "email" | "codigo" | "nova-senha" | "sucesso";

function mensagemDoErro(error: unknown): string | undefined {
  return isAxiosError<{ mensagem?: string }>(error) ? error.response?.data?.mensagem : undefined;
}

export default function RecuperarSenhaPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [token, setToken] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { getError, handleBlur, handleChange, validateAll } = useValidation();

  const handleEnviarEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll([["email", email, (v) => validateEmail(v, true)]])) return;
    setLoading(true);
    try {
      await api.post("/api/pub/auth/recuperar-senha", { email });
      setStep("codigo");
      toast({ title: "Código enviado", description: "Verifique seu email." });
    } catch (error) {
      toast({ variant: "destructive", title: "Erro", description: mensagemDoErro(error) || "Email não encontrado." });
    } finally {
      setLoading(false);
    }
  };

  const handleValidarCodigo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll([["codigo", codigo, validateCodigoRecuperacao]])) return;
    setLoading(true);
    try {
      const { data } = await api.post("/api/pub/auth/validar-codigo", { codigo });
      setToken(data.token);
      setStep("nova-senha");
    } catch (error) {
      toast({ variant: "destructive", title: "Erro", description: mensagemDoErro(error) || "Código inválido." });
    } finally {
      setLoading(false);
    }
  };

  const handleResetarSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    if (senhaNova !== confirmarSenha) {
      toast({ variant: "destructive", title: "Erro", description: "As senhas não coincidem." });
      return;
    }
    if (!validateAll([["senhaNova", senhaNova, (v) => validateSenha(v, true, "Nova senha")]])) return;
    setLoading(true);
    try {
      await api.post("/api/pub/auth/resetar-senha", { token, senhaNova });
      setStep("sucesso");
    } catch (error) {
      toast({ variant: "destructive", title: "Erro", description: mensagemDoErro(error) || "Erro ao redefinir senha." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-landing-canvas text-landing-ink antialiased">
      <PageSeo {...PUBLIC_PAGE_SEO.recuperarSenha} />
      <Navbar />
      <main id="conteudo-principal" tabIndex={-1} className="flex min-h-screen items-center justify-center px-4 pt-24 pb-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <SegPontoWordmark variant="page" />
        </div>

        <Card className="border border-landing-ink/10 bg-white shadow-sm rounded-xl overflow-hidden">
          {step === "email" && (
            <>
              <CardHeader>
                <CardTitle className="font-display text-xl text-landing-ink">Recuperar senha</CardTitle>
                <CardDescription className="text-landing-muted">Informe seu email para receber o código de recuperação</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEnviarEmail} className="space-y-4">
                  <FieldWithExpected name="email" label="Email" required expected={getFieldExpected("email")} error={getError("email")} showValid={email.trim().length > 0}>
                    <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => { const next = maskEmailInput(e.target.value); setEmail(next); handleChange("email", next, (v) => validateEmail(v, true)); }} onBlur={() => handleBlur("email", email, (v) => validateEmail(v, true))} aria-invalid={!!getError("email")} className="mt-1" />
                  </FieldWithExpected>
                  <Button type="submit" className="w-full rounded-full bg-landing-ink text-white hover:bg-landing-ink/90 shadow-none" disabled={loading}>{loading ? "Enviando..." : "Enviar código"}</Button>
                </form>
              </CardContent>
            </>
          )}

          {step === "codigo" && (
            <>
              <CardHeader>
                <CardTitle className="font-display text-xl text-landing-ink">Verificar código</CardTitle>
                <CardDescription className="text-landing-muted">Insira o código de 6 dígitos enviado para {email}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleValidarCodigo} className="space-y-4">
                  <FieldWithExpected name="codigo" label="Código" required expected={getFieldExpected("codigo")} error={getError("codigo")} showValid={codigo.trim().length > 0}>
                    <Input id="codigo" placeholder="000000" value={codigo} onChange={(e) => { setCodigo(e.target.value); handleChange("codigo", e.target.value, validateCodigoRecuperacao); }} onBlur={() => handleBlur("codigo", codigo, validateCodigoRecuperacao)} maxLength={6} className="mt-1 text-center text-2xl tracking-[0.5em]" aria-invalid={!!getError("codigo")} />
                  </FieldWithExpected>
                  <Button type="submit" className="w-full rounded-full bg-landing-ink text-white hover:bg-landing-ink/90 shadow-none" disabled={loading}>{loading ? "Verificando..." : "Verificar"}</Button>
                </form>
              </CardContent>
            </>
          )}

          {step === "nova-senha" && (
            <>
              <CardHeader>
                <CardTitle className="font-display text-xl text-landing-ink">Nova senha</CardTitle>
                <CardDescription className="text-landing-muted">Crie uma nova senha para sua conta</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleResetarSenha} className="space-y-4">
                  <FieldWithExpected name="senhaNova" label="Nova senha" required expected={getFieldExpected("senhaNova")} error={getError("senhaNova")} showValid={senhaNova.length > 0}>
                    <Input id="senhaNova" type="password" placeholder="••••••••" value={senhaNova} onChange={(e) => { setSenhaNova(e.target.value); handleChange("senhaNova", e.target.value, (v) => validateSenha(v, true, "Nova senha")); }} onBlur={() => handleBlur("senhaNova", senhaNova, (v) => validateSenha(v, true, "Nova senha"))} aria-invalid={!!getError("senhaNova")} className="mt-1" />
                  </FieldWithExpected>
                  <div className="space-y-1">
                    <Label htmlFor="confirmar" required>Confirmar senha</Label>
                    <Input id="confirmar" type="password" placeholder="••••••••" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} className="mt-1" />
                    <p className="text-xs text-muted-foreground">Esperado: {getFieldExpected("confirmarSenha")}</p>
                    {confirmarSenha && senhaNova !== confirmarSenha && <p role="alert" className="text-sm text-destructive">As senhas não coincidem.</p>}
                    {confirmarSenha && senhaNova === confirmarSenha && <p className="text-sm text-green-600 dark:text-green-500">Válido</p>}
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-full bg-landing-ink text-white hover:bg-landing-ink/90 shadow-none"
                    disabled={
                      loading ||
                      !!validateSenha(senhaNova, true, "Nova senha") ||
                      senhaNova !== confirmarSenha ||
                      !senhaNova.trim()
                    }
                  >
                    {loading ? "Salvando..." : "Redefinir senha"}
                  </Button>
                </form>
              </CardContent>
            </>
          )}

          {step === "sucesso" && (
            <>
              <CardHeader className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <CardTitle className="font-display text-xl text-landing-ink">Senha redefinida!</CardTitle>
                <CardDescription className="text-landing-muted">Sua senha foi alterada com sucesso</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full rounded-full bg-landing-ink text-white hover:bg-landing-ink/90 shadow-none" onClick={() => navigate("/login")}>Ir para o login</Button>
              </CardContent>
            </>
          )}

          <div className="px-6 pb-6">
            <Link to="/login" className="flex items-center gap-1 text-sm text-landing-muted hover:text-landing-ink">
              <ArrowLeft className="h-3 w-3" /> Voltar ao login
            </Link>
          </div>
        </Card>
      </div>
      </main>
    </div>
  );
}
