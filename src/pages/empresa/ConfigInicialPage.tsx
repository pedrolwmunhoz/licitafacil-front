import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
  Settings2,
  Plus,
  Minus,
  Trash2,
  Locate,
  Check,
  HelpCircle,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Building2,
  CalendarClock,
  Clock,
  Sparkles,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LabelComAjuda } from "@/components/empresa/LabelComAjuda";
import { ESCALA_DEFAULTS, ESCALA_HORARIOS, ESCALA_FOLGAS_DEFAULT, JORNADA_FIELD_HELP } from "@/lib/jornada-escala-defaults";
import { invalidateUserMutation, queryKeys } from "@/lib/query-cache-policy";
import { useToast } from "@/hooks/use-toast";
import { useValidation } from "@/hooks/useValidation";
import {
  validateDurationHhmm,
  validateDurationHhmmCargaDiaria,
  validateDurationHhmmIntervalo,
  validateDurationHhmmTolerancia,
  validateHorario,
  validateRequiredSelect,
  validateTimezone,
} from "@/lib/validations";
import { FieldExpectedStatus } from "@/components/ui/field-with-expected";
import { cn, getBrowserTimezone } from "@/lib/utils";
import { configInicialEmpresa } from "@/lib/api-empresa";
import { durationToHHmm, hhmmToDuration, clampDurationHHmmTo44, clampDurationHHmmTo6, clampDurationHHmmTo12 } from "@/lib/duration";
import type {
  EmpresaConfigInicialRequest,
  EmpresaJornadaConfigRequest,
  EmpresaBancoHorasConfigRequest,
  UsuarioGeofenceRequest,
  TipoEscalaJornada,
} from "@/types/empresa";
import { tipoEscalaJornadaFromId, tipoEscalaJornadaToId } from "@/types/empresa";

/** Modelos de jornada (cards do wizard). Horários/cargas vêm de ESCALA_*. */
const MODELOS_JORNADA = [
  {
    descricao: "5x2" as const,
    title: "Semana comercial",
    subtitle: "Cinco dias por semana — o mais comum em escritórios e serviços.",
    hint: "5×2",
    icon: Building2,
  },
  {
    descricao: "6x1" as const,
    title: "Seis dias por semana",
    subtitle: "Jornada com um dia de folga na semana (ex.: comércio).",
    hint: "6×1",
    icon: CalendarClock,
  },
  {
    descricao: "5x1" as const,
    title: "Ciclo 5×1",
    subtitle: "Cinco dias de trabalho e um de folga em ciclo contínuo.",
    hint: "5×1",
    icon: CalendarClock,
  },
  {
    descricao: "12x36" as const,
    title: "Plantão 12 horas",
    subtitle: "Turnos longos com folgas compensadas (12 h trabalho / 36 h descanso).",
    hint: "12×36",
    icon: Clock,
  },
] as const;

const WIZARD_STEPS = [
  { n: 1, label: "Jornada" },
  { n: 2, label: "Carga" },
  { n: 3, label: "Pausas" },
  { n: 4, label: "Avançado" },
  { n: 5, label: "Locais" },
] as const;

const defaultJornada: EmpresaJornadaConfigRequest = {
  tipoEscalaJornadaId: 1,
  cargaHorariaDiaria: ESCALA_DEFAULTS["5x2"].cargaHorariaDiaria,
  cargaHorariaSemanal: ESCALA_DEFAULTS["5x2"].cargaHorariaSemanal,
  toleranciaPadrao: "PT0S",
  intervaloPadrao: "PT0S",
  tempoDescansoEntreJornada: ESCALA_DEFAULTS["5x2"].tempoDescansoEntreJornada,
  entradaPadrao: ESCALA_HORARIOS["5x2"].entrada,
  saidaPadrao: ESCALA_HORARIOS["5x2"].saida,
  inicioEscala: new Date().toISOString().slice(0, 10),
  diasFolga: [...ESCALA_FOLGAS_DEFAULT["5x2"]],
  almocoInicio: null,
  almocoFim: null,
  timezone: typeof window !== "undefined" ? getBrowserTimezone() : "UTC",
  gravaGeoObrigatoria: false,
  gravaPontoApenasEmGeofence: false,
  permiteAjustePonto: false,
};

const defaultBanco: EmpresaBancoHorasConfigRequest = {
  ativo: true,
};

/** Cor de destaque alinhada aos gráficos do dashboard (lime). */
const ACCENT_LINE = "bg-[#bef264]";

/** Inputs e controles — levemente maiores que o padrão compacto. */
const inp = "h-10 px-3 text-sm";

/** Fusos comuns no Brasil (+ UTC). O do navegador é incluído se não estiver na lista. */
const FUSOS_EMPRESA: { value: string; label: string }[] = [
  { value: "America/Sao_Paulo", label: "Brasília (America/Sao_Paulo)" },
  { value: "America/Fortaleza", label: "Fortaleza (America/Fortaleza)" },
  { value: "America/Recife", label: "Recife (America/Recife)" },
  { value: "America/Bahia", label: "Bahia (America/Bahia)" },
  { value: "America/Belem", label: "Belém (America/Belem)" },
  { value: "America/Manaus", label: "Manaus (America/Manaus)" },
  { value: "America/Cuiaba", label: "Cuiabá (America/Cuiaba)" },
  { value: "America/Campo_Grande", label: "Campo Grande (America/Campo_Grande)" },
  { value: "America/Porto_Velho", label: "Porto Velho (America/Porto_Velho)" },
  { value: "America/Boa_Vista", label: "Boa Vista (America/Boa_Vista)" },
  { value: "America/Rio_Branco", label: "Rio Branco (America/Rio_Branco)" },
  { value: "America/Noronha", label: "Fernando de Noronha (America/Noronha)" },
  { value: "UTC", label: "UTC" },
];

function opcoesFusoEmpresa(atual: string) {
  if (FUSOS_EMPRESA.some((f) => f.value === atual)) return FUSOS_EMPRESA;
  return [{ value: atual, label: atual }, ...FUSOS_EMPRESA];
}

export default function ConfigInicialPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { getError, handleBlur, handleChange, validateAll } = useValidation();
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeExiting, setWelcomeExiting] = useState(false);
  const [wizardEntering, setWizardEntering] = useState(true);
  const [wizardStep, setWizardStep] = useState(1);
  const [jornada, setJornada] = useState<EmpresaJornadaConfigRequest>(defaultJornada);
  const [geofences, setGeofences] = useState<UsuarioGeofenceRequest[]>([]);
  const [buscandoLocal, setBuscandoLocal] = useState<number | null>(null);
  const [durationInputs, setDurationInputs] = useState<Record<string, string>>({});
  const [mostrarTolerancia, setMostrarTolerancia] = useState(false);
  const [mostrarAlmoco, setMostrarAlmoco] = useState(false);

  useEffect(() => {
    document.getElementById("conteudo-principal")?.scrollTo(0, 0);
  }, [wizardStep]);

  useEffect(() => {
    if (showWelcome) return;
    const timer = window.setTimeout(() => setWizardEntering(false), 20);
    return () => window.clearTimeout(timer);
  }, [showWelcome]);

  const getDurationDisplay = (key: string, iso: string) =>
    durationInputs[key] !== undefined ? durationInputs[key] : durationToHHmm(iso ?? "");

  const commitDuration = (key: string, jornadaKey: keyof EmpresaJornadaConfigRequest, display: string) => {
    const iso = display.trim() === "" ? "" : hhmmToDuration(display) || "";
    setJornada((p) => ({ ...p, [jornadaKey]: iso }));
    setDurationInputs((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    return iso;
  };

  const aplicarModelo = (descricao: TipoEscalaJornada) => {
    const defaults = ESCALA_DEFAULTS[descricao];
    const horarios = ESCALA_HORARIOS[descricao];
    const escalaId = tipoEscalaJornadaToId(descricao);
    if (!defaults || !horarios || escalaId == null) return;
    setJornada((p) => ({
      ...p,
      tipoEscalaJornadaId: escalaId,
      cargaHorariaDiaria: defaults.cargaHorariaDiaria,
      cargaHorariaSemanal: defaults.cargaHorariaSemanal,
      tempoDescansoEntreJornada: defaults.tempoDescansoEntreJornada,
      entradaPadrao: horarios.entrada,
      saidaPadrao: horarios.saida,
      diasFolga: [...ESCALA_FOLGAS_DEFAULT[descricao]],
      inicioEscala: p.inicioEscala || new Date().toISOString().slice(0, 10),
    }));
    handleChange("tipoEscalaJornadaId", String(escalaId), (x) => validateRequiredSelect(x, "Selecione o tipo de jornada."));
  };

  const aplicarRecomendacaoEscritorio = () => {
    aplicarModelo("5x2");
    toast({ title: "Jornada definida", description: "Semana comercial 8h–17h. Confira os horários no próximo passo." });
    setWizardStep(2);
  };

  const mutation = useMutation({
    mutationFn: (payload: { body: EmpresaConfigInicialRequest }) => {
      const { body } = payload;
      const validators: Parameters<typeof validateAll>[0] = [
        ["tipoEscalaJornadaId", String(body.empresaJornadaConfig.tipoEscalaJornadaId ?? ""), (v) => validateRequiredSelect(v as string, "Selecione o tipo de jornada.")],
        ["cargaDiariaPadrao", durationToHHmm(body.empresaJornadaConfig.cargaHorariaDiaria ?? ""), (v) => validateDurationHhmmCargaDiaria(v as string)],
        ["cargaSemanalPadrao", durationToHHmm(body.empresaJornadaConfig.cargaHorariaSemanal ?? ""), (v) => validateDurationHhmm(v as string, true, "Carga semanal")],
        ["intervaloPadrao", durationToHHmm(body.empresaJornadaConfig.intervaloPadrao ?? ""), (v) => validateDurationHhmmIntervalo(v as string)],
        ["tempoDescansoEntreJornada", durationToHHmm(body.empresaJornadaConfig.tempoDescansoEntreJornada ?? ""), (v) => validateDurationHhmm(v as string, true, "Mínimo entre turnos")],
        ["entradaPadrao", body.empresaJornadaConfig.entradaPadrao ?? "", (v) => validateHorario(v as string, true, "Entrada")],
        ["saidaPadrao", body.empresaJornadaConfig.saidaPadrao ?? "", (v) => validateHorario(v as string, true, "Saída")],
        ["timezone", body.empresaJornadaConfig.timezone ?? "", (v) => validateTimezone(v as string, true)],
      ];
      const ok = validateAll(validators);
      if (!ok) {
        toast({ variant: "destructive", title: "Corrija os campos indicados antes de concluir." });
        throw new Error("Validação falhou");
      }
      return configInicialEmpresa(body);
    },
    onSuccess: async () => {
      // Pacote (perfil/dropdown/status) + await no status pra liberar o gate do layout antes do navigate.
      invalidateUserMutation(queryClient, "configInicial");
      await queryClient.refetchQueries({ queryKey: queryKeys.empresa.configInicial() });
      toast({ title: "Tudo certo", description: "Seu ponto está no padrão da empresa. Você pode ajustar depois em Configurações." });
      navigate("/empresa", { replace: true });
    },
    onError: (err: AxiosError<{ mensagem?: string }>) => {
      toast({
        variant: "destructive",
        title: "Não foi possível salvar",
        description: err.response?.data?.mensagem ?? "Tente de novo em instantes.",
      });
    },
  });

  const addGeofence = () => {
    const novo: UsuarioGeofenceRequest = {
      descricao: "",
      latitude: 0,
      longitude: 0,
      raioMetros: 100,
      ativo: true,
    };
    setGeofences((prev) => [...prev, novo]);
  };

  const updateGeofence = (index: number, field: keyof UsuarioGeofenceRequest, value: unknown) => {
    setGeofences((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const removeGeofence = (index: number) => {
    setGeofences((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (next.length === 0) {
        setJornada((p) => ({ ...p, gravaPontoApenasEmGeofence: false }));
      }
      return next;
    });
  };

  const puxarLocal = (index: number) => {
    if (!navigator.geolocation) {
      toast({ variant: "destructive", title: "Geolocalização não disponível neste aparelho." });
      return;
    }
    setBuscandoLocal(index);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        updateGeofence(index, "latitude", pos.coords.latitude);
        updateGeofence(index, "longitude", pos.coords.longitude);
        setBuscandoLocal(null);
        toast({ title: "Local preenchido" });
      },
      () => {
        setBuscandoLocal(null);
        toast({ variant: "destructive", title: "Não foi possível obter o local." });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const validarPasso = (passo: number): boolean => {
    if (passo === 1) {
      if (!jornada.tipoEscalaJornadaId) {
        toast({ variant: "destructive", title: "Escolha um tipo de jornada", description: "Toque em uma das opções acima antes de continuar." });
        return false;
      }
      return true;
    }
    if (passo === 2) {
      return validateAll([
        ["cargaDiariaPadrao", getDurationDisplay("cargaDiaria", jornada.cargaHorariaDiaria ?? ""), (v) => validateDurationHhmmCargaDiaria(v as string)],
        ["cargaSemanalPadrao", getDurationDisplay("cargaSemanal", jornada.cargaHorariaSemanal ?? ""), (v) => validateDurationHhmm(v as string, true, "Carga semanal")],
        ["entradaPadrao", jornada.entradaPadrao ?? "", (v) => validateHorario(v as string, true, "Entrada")],
        ["saidaPadrao", jornada.saidaPadrao ?? "", (v) => validateHorario(v as string, true, "Saída")],
        ["tempoDescansoEntreJornada", getDurationDisplay("descanso", jornada.tempoDescansoEntreJornada ?? ""), (v) => validateDurationHhmm(v as string, true, "Mínimo entre turnos")],
      ]);
    }
    if (passo === 3) {
      const fields: Parameters<typeof validateAll>[0] = [];
      if (mostrarAlmoco) {
        fields.push([
          "intervaloPadrao",
          getDurationDisplay("intervalo", jornada.intervaloPadrao ?? ""),
          (v) => validateDurationHhmmIntervalo(v as string),
        ]);
      }
      if (mostrarTolerancia) {
        fields.push([
          "toleranciaPadrao",
          getDurationDisplay("tolerancia", jornada.toleranciaPadrao ?? ""),
          (v) => validateDurationHhmmTolerancia(v as string, false),
        ]);
      }
      return fields.length === 0 ? true : validateAll(fields);
    }
    if (passo === 4) {
      return validateAll([["timezone", jornada.timezone ?? "", (v) => validateTimezone(v as string, true)]]);
    }
    return true;
  };

  const avancar = () => {
    if (!validarPasso(wizardStep)) return;
    setWizardStep((s) => Math.min(s + 1, WIZARD_STEPS.length));
  };

  const voltar = () => setWizardStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    if (!jornada.tipoEscalaJornadaId || !jornada.cargaHorariaDiaria || !jornada.cargaHorariaSemanal || !jornada.entradaPadrao || !jornada.saidaPadrao || !jornada.tempoDescansoEntreJornada) {
      toast({ variant: "destructive", title: "Dados incompletos", description: "Volte aos passos anteriores e preencha jornada e horários." });
      return;
    }
    const validGeofences = geofences.filter(
      (g) => g.ativo && g.descricao?.trim() && typeof g.latitude === "number" && typeof g.longitude === "number" && g.raioMetros >= 1
    );
    if (jornada.gravaPontoApenasEmGeofence && validGeofences.length === 0) {
      toast({
        variant: "destructive",
        title: "Áreas de ponto necessárias",
        description:
          "Você marcou batida só nos locais da empresa. Cadastre pelo menos um local ou desmarque essa opção.",
      });
      setWizardStep(6);
      return;
    }
    const body: EmpresaConfigInicialRequest = {
      empresaJornadaConfig: jornada,
      empresaBancoHorasConfig: defaultBanco,
      usuarioGeofence: validGeofences.length ? validGeofences : undefined,
    };
    mutation.mutate({ body });
  };

  const progressPct = (wizardStep / WIZARD_STEPS.length) * 100;
  const iniciarConfiguracaoInicial = () => {
    setWelcomeExiting(true);
    setWizardEntering(true);
    window.setTimeout(() => {
      setWizardStep(1);
      setShowWelcome(false);
      setWelcomeExiting(false);
    }, 220);
  };

  return (
    <div className="mx-auto max-w-xl lg:max-w-2xl space-y-5 pb-20 lg:pb-6">
      {showWelcome ? (
        <section
          className={cn(
            "space-y-6 transition-all duration-200 ease-out",
            welcomeExiting ? "opacity-0 translate-y-1 scale-[0.99]" : "opacity-100 translate-y-0 scale-100",
          )}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-landing-cta/25 bg-white shadow-sm ring-1 ring-landing-ink/[0.06]">
                <Settings2 className="h-5 w-5 text-landing-cta" />
              </div>
              <Badge variant="outline" className="h-7 rounded-full border-landing-cta/30 bg-landing-cta/[0.06] px-3 text-xs text-foreground">
                Configuração guiada
              </Badge>
            </div>
            <div className="space-y-1.5">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Bem-vindo(a) ao SegPonto</h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-snug max-w-2xl">
                A gente vai te guiar em uma configuração inicial rápida para deixar sua empresa pronta para começar,
                com regras claras e tudo organizado.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-landing-ink/[0.08] bg-landing-cta/[0.07] px-4 py-3">
            <p className="text-sm text-foreground leading-snug">
              Nossa equipe também vai entrar em contato para apoiar as configurações iniciais.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-y border-border/70 py-4">
            <div className="space-y-2.5">
              <p className="text-base font-semibold text-foreground">O que você vai configurar</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-[15px] leading-snug text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  Jornada padrão, horas diárias e horários
                </li>
                <li className="flex items-start gap-2 text-[15px] leading-snug text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  Regras de ponto, tolerância e geolocalização
                </li>
                <li className="flex items-start gap-2 text-[15px] leading-snug text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  Locais permitidos (opcional)
                </li>
              </ul>
            </div>
            <div className="space-y-2.5">
              <p className="text-base font-semibold text-foreground">Como vai funcionar</p>
              <p className="text-[15px] text-muted-foreground leading-snug">
                Você responde um fluxo guiado em 5 etapas. No final, o padrão já fica aplicado para novos funcionários.
              </p>
              <p className="text-sm text-muted-foreground">Dura poucos minutos e pode ser editado depois.</p>
            </div>
          </div>

          <div className="flex justify-end border-t border-border pt-3">
            <Button
              type="button"
              size="sm"
              onClick={iniciarConfiguracaoInicial}
              className="gap-1.5 h-10 px-5 min-w-[220px] bg-[#bef264] text-[#1a2e05] hover:bg-[#d9f99d] border-0 shadow-sm"
            >
              Começar configuração inicial
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </section>
      ) : (
        <div
          className={cn(
            "space-y-5 transition-all duration-300 ease-out",
            wizardEntering ? "opacity-0 translate-y-2 scale-[0.99]" : "opacity-100 translate-y-0 scale-100",
          )}
        >
      <div className="space-y-2.5">
        <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
          <Settings2 className="h-6 w-6 sm:h-7 sm:w-7 shrink-0 text-primary" />
          Configuração inicial
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-snug max-w-lg">
          Jornada, registro de ponto e itens opcionais. O que você definir aqui pode ser alterado depois em Configurações.
        </p>
        <div className="h-1 w-full max-w-xs rounded-full bg-muted overflow-hidden">
          <div className={cn("h-full rounded-full transition-all duration-300", ACCENT_LINE)} style={{ width: `${progressPct}%` }} />
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {WIZARD_STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center gap-1 sm:gap-1.5">
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  wizardStep >= s.n ? "bg-foreground text-background" : "bg-muted text-muted-foreground border border-border",
                )}
              >
                {s.n}
              </div>
              <span className={cn("hidden text-xs sm:inline", wizardStep >= s.n ? "text-foreground font-medium" : "text-muted-foreground")}>{s.label}</span>
              {i < WIZARD_STEPS.length - 1 && (
                <div className={cn("mx-0.5 h-0.5 w-2 sm:w-4 shrink-0 rounded-full", wizardStep > s.n ? "bg-[#bef264]" : "bg-muted")} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden border-border shadow-sm">
        <CardHeader className="border-b border-border bg-muted/30 space-y-1.5 p-5">
          <CardTitle className="font-display text-lg">
            {wizardStep === 1 && "Qual escala da maior parte do time?"}
            {wizardStep === 2 && "Carga horária, entrada/saída e interjornada"}
            {wizardStep === 3 && "Pausas e margem nas batidas"}
            {wizardStep === 4 && "Como o ponto será registrado?"}
            {wizardStep === 5 && "Locais e localização"}
          </CardTitle>
          <CardDescription className="text-sm leading-snug">
            {wizardStep === 1 && "Escolha o que mais se parece com o seu time. Dá para refinar por pessoa depois."}
            {wizardStep === 2 && "Base para novos colaboradores: horas, faixa de entrada/saída e folga mínima entre turnos."}
            {wizardStep === 3 && "Se quiser, defina o tempo de almoço e a tolerância de atraso."}
            {wizardStep === 4 && "Fuso horário e política de ajuste de batida."}
            {wizardStep === 5 &&
              "Gravar localização nas batidas, restringir por área e, se quiser, cadastrar locais no mapa."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 p-5 pt-5">
          {wizardStep === 1 && (
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full justify-between gap-2 h-auto py-2.5 px-3 border-dashed border-primary/40 bg-primary/[0.04] hover:bg-primary/[0.07]"
                onClick={aplicarRecomendacaoEscritorio}
              >
                <span className="flex items-start gap-2 text-left">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ecfccb] text-foreground">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="font-semibold text-base text-foreground block">Recomendado: 5x2 escritório (8h–17h)</span>
                    <span className="text-xs text-muted-foreground font-normal leading-snug">Semana comercial.</span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </Button>

              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Ou selecione o tipo de jornada</p>
              <div className="grid gap-2 sm:grid-cols-3 sm:items-stretch">
                {MODELOS_JORNADA.map((m) => {
                  const Icon = m.icon;
                  const selected = tipoEscalaJornadaFromId(jornada.tipoEscalaJornadaId) === m.descricao;
                  return (
                    <button
                      key={m.descricao}
                      type="button"
                      onClick={() => aplicarModelo(m.descricao)}
                      className={cn(
                        "flex h-full flex-col gap-1.5 rounded-lg border-2 p-3 text-left transition-all hover:border-primary/50",
                        selected ? "border-[#bef264] bg-[#ecfccb]/40 ring-1 ring-[#bef264]/40" : "border-border bg-card",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Icon
                          className={cn(
                            "h-5 w-5 shrink-0",
                            selected ? "text-foreground" : "text-muted-foreground",
                          )}
                        />
                        <span className="font-display text-base font-bold leading-none text-foreground">
                          {m.hint}
                        </span>
                      </span>
                      <span className="font-display text-sm font-semibold leading-tight text-foreground">
                        {m.title}
                      </span>
                      <span className="min-h-[2.75rem] text-xs leading-snug text-muted-foreground">
                        {m.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
              <FieldExpectedStatus error={getError("tipoEscalaJornadaId")} />
            </div>
          )}

          {wizardStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:items-start">
                <div className="space-y-1.5 flex flex-col">
                  <LabelComAjuda
                    required
                    help={JORNADA_FIELD_HELP.cargaDiaria}
                  >
                    Carga horária por dia
                  </LabelComAjuda>
                  <Input
                    className={inp}
                    value={getDurationDisplay("cargaDiaria", jornada.cargaHorariaDiaria ?? "")}
                    onChange={(e) => {
                      const next = clampDurationHHmmTo12(e.target.value);
                      setDurationInputs((p) => ({ ...p, cargaDiaria: next }));
                      handleChange("cargaDiariaPadrao", next, (x) => validateDurationHhmmCargaDiaria(x));
                    }}
                    onBlur={() => {
                      const display = getDurationDisplay("cargaDiaria", jornada.cargaHorariaDiaria ?? "");
                      const iso = commitDuration("cargaDiaria", "cargaHorariaDiaria", display);
                      handleBlur("cargaDiariaPadrao", durationToHHmm(iso || ""), (x) => validateDurationHhmmCargaDiaria(x));
                    }}
                    placeholder="08:00"
                    maxLength={5}
                  />
                  <FieldExpectedStatus error={getError("cargaDiariaPadrao")} />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <LabelComAjuda
                    required
                    help={JORNADA_FIELD_HELP.cargaSemanal}
                  >
                    Carga horária semana
                  </LabelComAjuda>
                  <Input
                    className={inp}
                    value={getDurationDisplay("cargaSemanal", jornada.cargaHorariaSemanal ?? "")}
                    onChange={(e) => {
                      const next = clampDurationHHmmTo44(e.target.value);
                      setDurationInputs((p) => ({ ...p, cargaSemanal: next }));
                      handleChange("cargaSemanalPadrao", next, (x) => validateDurationHhmm(x, true, "Carga semanal"));
                    }}
                    onBlur={() => {
                      const display = getDurationDisplay("cargaSemanal", jornada.cargaHorariaSemanal ?? "");
                      const iso = commitDuration("cargaSemanal", "cargaHorariaSemanal", display);
                      handleBlur("cargaSemanalPadrao", durationToHHmm(iso || ""), (x) => validateDurationHhmm(x, true, "Carga semanal"));
                    }}
                    placeholder="40:00"
                    maxLength={5}
                  />
                  <FieldExpectedStatus error={getError("cargaSemanalPadrao")} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:items-start">
                <div className="space-y-1.5 flex flex-col">
                  <LabelComAjuda
                    required
                    help={JORNADA_FIELD_HELP.entrada}
                  >
                    Horário entrada comum
                  </LabelComAjuda>
                  <Input
                    className={inp}
                    type="time"
                    value={jornada.entradaPadrao}
                    onChange={(e) => {
                      const v = e.target.value;
                      setJornada((p) => ({ ...p, entradaPadrao: v }));
                      handleChange("entradaPadrao", v, (x) => validateHorario(x, true, "Entrada"));
                    }}
                    onBlur={() => handleBlur("entradaPadrao", jornada.entradaPadrao ?? "", (x) => validateHorario(x, true, "Entrada"))}
                  />
                  <FieldExpectedStatus error={getError("entradaPadrao")} />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <LabelComAjuda
                    required
                    help={JORNADA_FIELD_HELP.saida}
                  >
                    Horário saída comum
                  </LabelComAjuda>
                  <Input
                    className={inp}
                    type="time"
                    value={jornada.saidaPadrao}
                    onChange={(e) => {
                      const v = e.target.value;
                      setJornada((p) => ({ ...p, saidaPadrao: v }));
                      handleChange("saidaPadrao", v, (x) => validateHorario(x, true, "Saída"));
                    }}
                    onBlur={() => handleBlur("saidaPadrao", jornada.saidaPadrao ?? "", (x) => validateHorario(x, true, "Saída"))}
                  />
                  <FieldExpectedStatus error={getError("saidaPadrao")} />
                </div>
              </div>

              <div className="space-y-1.5">
                <LabelComAjuda
                  required
                  help={JORNADA_FIELD_HELP.descanso}
                >
                  Mínimo descanso entre turnos
                </LabelComAjuda>
                <Input
                  className={cn(inp, "max-w-[120px]")}
                  value={getDurationDisplay("descanso", jornada.tempoDescansoEntreJornada ?? "")}
                  onChange={(e) => {
                    const next = clampDurationHHmmTo44(e.target.value);
                    setDurationInputs((p) => ({ ...p, descanso: next }));
                  }}
                  onBlur={() => {
                    const display = getDurationDisplay("descanso", jornada.tempoDescansoEntreJornada ?? "");
                    const iso = commitDuration("descanso", "tempoDescansoEntreJornada", display);
                    handleBlur("tempoDescansoEntreJornada", durationToHHmm(iso || ""), (x) => validateDurationHhmm(x, true, "Mínimo entre turnos"));
                  }}
                  placeholder="11:00"
                  maxLength={5}
                />
                <FieldExpectedStatus error={getError("tempoDescansoEntreJornada")} />
              </div>
            </div>
          )}

          {wizardStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-medium text-foreground">Duração horário almoço</span>
                  {!mostrarAlmoco && (
                    <Badge className="text-[11px] px-1.5 py-0 font-normal border-0 bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
                      Opcional
                    </Badge>
                  )}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded p-0.5"
                        aria-label="Ajuda"
                      >
                        <HelpCircle className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[260px] z-[100]" sideOffset={6}>
                      Quanto tempo dura a pausa de almoço/refeição. Esse tempo não conta como horas trabalhadas. Ex.: 01:00 = 1 hora de pausa.
                    </TooltipContent>
                  </Tooltip>
                  {mostrarAlmoco && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="gap-1 h-8 text-muted-foreground"
                      onClick={() => {
                        setMostrarAlmoco(false);
                        setJornada((p) => ({ ...p, intervaloPadrao: "PT0S" }));
                        setDurationInputs((prev) => {
                          const next = { ...prev };
                          delete next.intervalo;
                          return next;
                        });
                      }}
                    >
                      <Minus className="h-3.5 w-3.5" />
                      Remover
                    </Button>
                  )}
                </div>
                {!mostrarAlmoco ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5 h-9"
                    onClick={() => {
                      setMostrarAlmoco(true);
                      setDurationInputs((p) => ({ ...p, intervalo: "01:00" }));
                      setJornada((p) => ({ ...p, intervaloPadrao: "PT1H" }));
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar horário almoço
                  </Button>
                ) : (
                  <div className="space-y-1.5">
                    <p className="text-xs text-muted-foreground leading-snug">
                      Quanto tempo dura a pausa de almoço
                    </p>
                    <Input
                      className={cn(inp, "max-w-[120px]")}
                      value={getDurationDisplay("intervalo", jornada.intervaloPadrao ?? "")}
                      onChange={(e) => {
                        const next = clampDurationHHmmTo6(e.target.value);
                        setDurationInputs((p) => ({ ...p, intervalo: next }));
                        handleChange("intervaloPadrao", next, (x) => validateDurationHhmmIntervalo(x));
                      }}
                      onBlur={() => {
                        const display = getDurationDisplay("intervalo", jornada.intervaloPadrao ?? "");
                        const iso = commitDuration("intervalo", "intervaloPadrao", display);
                        handleBlur("intervaloPadrao", durationToHHmm(iso || ""), (x) => validateDurationHhmmIntervalo(x));
                      }}
                      placeholder="01:00"
                      maxLength={5}
                    />
                    <FieldExpectedStatus error={getError("intervaloPadrao")} />
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-medium text-foreground">Tolerância CLT</span>
                  {!mostrarTolerancia && (
                    <Badge className="text-[11px] px-1.5 py-0 font-normal border-0 bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
                      Opcional
                    </Badge>
                  )}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded p-0.5"
                        aria-label="Ajuda"
                      >
                        <HelpCircle className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[260px] z-[100]" sideOffset={6}>
                      Margem de atraso na entrada ou de saída antecipada em relação ao horário previsto. Previsto na CLT (art. 58, §1º): até 5 minutos por marcação e no máximo 10 minutos no dia — em geral 5 na entrada e 5 na saída.
                    </TooltipContent>
                  </Tooltip>
                  {mostrarTolerancia && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="gap-1 h-8 text-muted-foreground"
                      onClick={() => {
                        setMostrarTolerancia(false);
                        setJornada((p) => ({ ...p, toleranciaPadrao: "PT0S" }));
                        setDurationInputs((prev) => {
                          const next = { ...prev };
                          delete next.tolerancia;
                          return next;
                        });
                      }}
                    >
                      <Minus className="h-3.5 w-3.5" />
                      Remover
                    </Button>
                  )}
                </div>
                {!mostrarTolerancia ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5 h-9"
                    onClick={() => {
                      setMostrarTolerancia(true);
                      setDurationInputs((p) => ({ ...p, tolerancia: "00:10" }));
                      setJornada((p) => ({ ...p, toleranciaPadrao: "PT10M" }));
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar tolerância CLT
                  </Button>
                ) : (
                  <div className="space-y-1.5">
                    <p className="text-xs text-muted-foreground leading-snug">
                      Geralmente 10 minutos, previsto na CLT
                    </p>
                    <Input
                      className={cn(inp, "max-w-[120px]")}
                      value={getDurationDisplay("tolerancia", jornada.toleranciaPadrao ?? "")}
                      onChange={(e) => {
                        const next = clampDurationHHmmTo6(e.target.value);
                        setDurationInputs((p) => ({ ...p, tolerancia: next }));
                        handleChange("toleranciaPadrao", next, (x) => validateDurationHhmmTolerancia(x, false));
                      }}
                      onBlur={() => {
                        const display = getDurationDisplay("tolerancia", jornada.toleranciaPadrao ?? "");
                        let iso = commitDuration("tolerancia", "toleranciaPadrao", display);
                        if (iso === "") {
                          setJornada((p) => ({ ...p, toleranciaPadrao: "PT0S" }));
                          iso = "PT0S";
                        }
                        handleBlur("toleranciaPadrao", durationToHHmm(iso), (x) => validateDurationHhmmTolerancia(x, false));
                      }}
                      placeholder="00:10"
                      maxLength={5}
                    />
                    <FieldExpectedStatus error={getError("toleranciaPadrao")} />
                  </div>
                )}
              </div>
            </div>
          )}

          {wizardStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label required className="text-sm">Fuso horário</Label>
                <p className="text-xs text-muted-foreground leading-snug">
                  O fuso padrão da empresa. Só mude se a sede estiver em outro fuso (outro estado ou país).
                </p>
                <div className="max-w-sm">
                  <Select
                    value={jornada.timezone}
                    onValueChange={(v) => {
                      setJornada((p) => ({ ...p, timezone: v }));
                      handleChange("timezone", v, (x) => validateTimezone(x, true));
                      handleBlur("timezone", v, (x) => validateTimezone(x, true));
                    }}
                  >
                    <SelectTrigger className={cn(inp, "w-full")}>
                      <SelectValue placeholder={getBrowserTimezone()} />
                    </SelectTrigger>
                    <SelectContent>
                      {opcoesFusoEmpresa(jornada.timezone).map((f) => (
                        <SelectItem key={f.value} value={f.value}>
                          {f.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FieldExpectedStatus error={getError("timezone")} />
              </div>

              <Separator className="my-1" />

              <div className="flex items-start gap-2 rounded-md border border-transparent bg-muted/30 p-2.5">
                <Checkbox
                  id="permite-ajuste"
                  className="mt-0.5"
                  checked={jornada.permiteAjustePonto}
                  onCheckedChange={(c) => setJornada((p) => ({ ...p, permiteAjustePonto: !!c }))}
                />
                <div>
                  <Label htmlFor="permite-ajuste" className="text-sm font-medium cursor-pointer leading-snug">
                    Colaborador pode incluir ou excluir batida manual no app sem aprovação
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                    Em geral deixe desmarcado (é o mais comum). Marque só se o funcionário puder incluir ou apagar batida manualmente no app sem aprovação da empresa.
                  </p>
                </div>
              </div>
            </div>
          )}

          {wizardStep === 5 && (
            <div className="space-y-5">
              <div className="flex items-start gap-2 rounded-md border border-border bg-muted/30 p-3.5">
                <Checkbox
                  id="grava-geo"
                  className="mt-0.5"
                  checked={jornada.gravaGeoObrigatoria}
                  onCheckedChange={(c) => setJornada((p) => ({ ...p, gravaGeoObrigatoria: !!c }))}
                />
                <div>
                  <Label htmlFor="grava-geo" className="text-sm font-medium cursor-pointer leading-snug">
                    Salvar localização em toda batida
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                    A cada batida, grava a localização do dispositivo.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-snug">
                    Isso só registra onde a batida foi feita — é diferente de exigir que o colaborador esteja em um local permitido (opção abaixo).
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  "flex items-start gap-2 rounded-md border p-3.5 transition-colors",
                  geofences.length === 0
                    ? "pointer-events-none select-none border-dashed border-border bg-muted/40 opacity-50"
                    : "border-border bg-muted/30",
                )}
                aria-disabled={geofences.length === 0}
              >
                <Checkbox
                  id="grava-geofence"
                  className="mt-0.5"
                  checked={jornada.gravaPontoApenasEmGeofence}
                  disabled={geofences.length === 0}
                  onCheckedChange={(c) => setJornada((p) => ({ ...p, gravaPontoApenasEmGeofence: !!c }))}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <Label
                      htmlFor="grava-geofence"
                      className={cn(
                        "text-sm font-medium leading-snug",
                        geofences.length === 0 ? "cursor-not-allowed text-muted-foreground" : "cursor-pointer",
                      )}
                    >
                      Restringir batidas por localização
                    </Label>
                    {geofences.length === 0 && (
                      <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                    Só permite ponto nos locais cadastrados pela empresa.
                  </p>
                  {geofences.length === 0 && (
                    <p className="text-xs text-muted-foreground mt-1 leading-snug">
                      Cadastre pelo menos uma área abaixo para liberar.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-muted/20 p-5 space-y-3.5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                    <h3 className="font-display text-base font-semibold">Áreas no mapa</h3>
                    <Badge className="text-[11px] px-1.5 py-0 font-normal border-0 bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">Opcional</Badge>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addGeofence} className="gap-1.5 shrink-0 h-9">
                    <Plus className="h-4 w-4" />
                    Adicionar área
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground leading-snug">Sede ou filiais.</p>
                {geofences.length === 0 ? (
                  <p className="text-xs text-muted-foreground rounded-md border border-dashed border-border bg-muted/20 px-3 py-4 text-center leading-snug">
                    Nenhuma área ainda.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {geofences.map((g, i) => (
                      <div key={i} className="rounded-lg border border-border bg-card p-3 space-y-2 shadow-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium font-display">Área {i + 1}</span>
                          <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeGeofence(i)} aria-label="Remover área">
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox checked={g.ativo} onCheckedChange={(c) => updateGeofence(i, "ativo", !!c)} />
                          <Label className="cursor-pointer font-normal text-sm">{g.ativo ? "Ativa" : "Desligada"}</Label>
                        </div>
                        <div className={cn("space-y-2", !g.ativo && "opacity-60 pointer-events-none")}>
                          <div className="grid gap-1">
                            <Label required className="text-sm">Nome do local</Label>
                            <Input
                              className={inp}
                              value={g.descricao}
                              onChange={(e) => updateGeofence(i, "descricao", e.target.value)}
                              placeholder="Ex.: Sede"
                              disabled={!g.ativo}
                            />
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Label required className="text-sm">Coordenadas</Label>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button type="button" className="inline-flex text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded p-0.5" aria-label="Ajuda sobre localização">
                                  <HelpCircle className="h-3.5 w-3.5" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="right" className="max-w-[260px] z-[100]" sideOffset={8}>
                                Quando o navegador pedir permissão, escolha Permitir para preencher o mapa automaticamente.
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="grid gap-1.5">
                              <Label className="text-sm">Latitude</Label>
                              <Input
                                className={inp}
                                type="number"
                                step="any"
                                value={g.latitude || ""}
                                onChange={(e) => updateGeofence(i, "latitude", parseFloat(e.target.value) || 0)}
                                placeholder="-23.5505"
                                disabled={!g.ativo}
                              />
                            </div>
                            <div className="grid gap-1.5">
                              <Label className="text-sm">Longitude</Label>
                              <Input
                                className={inp}
                                type="number"
                                step="any"
                                value={g.longitude || ""}
                                onChange={(e) => updateGeofence(i, "longitude", parseFloat(e.target.value) || 0)}
                                placeholder="-46.6333"
                                disabled={!g.ativo}
                              />
                            </div>
                          </div>
                          <Button type="button" variant="outline" size="sm" className="w-full gap-1.5 text-xs h-8" onClick={() => puxarLocal(i)} disabled={buscandoLocal === i || !g.ativo}>
                            <Locate className="h-3.5 w-3.5 text-green-600 shrink-0" />
                            {buscandoLocal === i ? "Obtendo…" : "Usar minha localização"}
                          </Button>
                          <div className="grid gap-1 max-w-[100px]">
                            <Label className="text-sm">Raio (m)</Label>
                            <Input
                              className={inp}
                              type="number"
                              min={1}
                              max={5000}
                              value={g.raioMetros || ""}
                              onChange={(e) => updateGeofence(i, "raioMetros", parseInt(e.target.value, 10) || 100)}
                              disabled={!g.ativo}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-border pt-3">
        <Button type="button" variant="ghost" size="sm" className="text-muted-foreground h-10 sm:order-1" onClick={voltar} disabled={wizardStep === 1 || mutation.isPending}>
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          Voltar
        </Button>
        <div className="flex justify-end gap-2 sm:order-2">
          {wizardStep < WIZARD_STEPS.length ? (
            <Button
              type="button"
              size="sm"
              onClick={avancar}
              className="gap-1.5 h-10 px-5 min-w-[128px] bg-[#bef264] text-[#1a2e05] hover:bg-[#d9f99d] border-0 shadow-sm"
            >
              Continuar
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              onClick={handleSubmit}
              disabled={mutation.isPending}
              className="gap-1.5 h-10 px-5 min-w-[158px] bg-[#bef264] text-[#1a2e05] hover:bg-[#d9f99d] border-0 shadow-sm"
            >
              {mutation.isPending ? "Salvando…" : "Começar a usar"}
              {!mutation.isPending && <ArrowRight className="h-3.5 w-3.5" />}
            </Button>
          )}
        </div>
      </div>
        </div>
      )}
    </div>
  );
}
