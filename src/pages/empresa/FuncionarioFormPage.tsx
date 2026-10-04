import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { cn } from "@/lib/utils";
import { Users, UserRound, Plus, Minus, PencilLine, Check, Calendar, ChevronLeft, Phone, Briefcase, Clock, MapPin, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LIST_CARD, LIST_CARD_CONTENT_FLUSH, LIST_CARD_HEADER } from "@/lib/list-card-layout";
import { CACHE_MEDIUM, invalidateUserMutation, queryKeys } from "@/lib/query-cache-policy";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LabelComAjuda } from "@/components/empresa/LabelComAjuda";
import { JornadaFuncionarioFields } from "@/components/empresa/JornadaFuncionarioFields";
import { useToast } from "@/hooks/use-toast";
import { useValidation, type ValidationEntry } from "@/hooks/useValidation";
import { formatCpf, formatSalarioDisplay, formatTitleCase, maskCpfInput, maskDddInput, maskNumeroTelefoneInput, maskPisPasepInput, maskUsernameInput, maskEmailInput } from "@/lib/format";
import {
  validateUsername,
  validateEmail,
  validateCpf,
  validateNomeCompleto,
  validatePrimeiroNome,
  validateUltimoNome,
  validateSenha,
  validateCargo,
  validateCodigoPais,
  validateDdd,
  validateNumeroTelefone,
  validateData,
  validateDataAdmissao,
  validateMatricula,
  validateComplemento,
  validatePisPasep,
  validateSalarioOpcional,
  validateDurationHhmm,
  validateDurationHhmmCargaDiaria,
  validateDurationHhmmTolerancia,
  validateHorario,
  validateRequiredSelect,
} from "@/lib/validations";
import { FieldExpectedStatus } from "@/components/ui/field-with-expected";
import {
  listarGeofences,
  criarFuncionario,
  atualizarFuncionario,
  getPerfilFuncionario,
} from "@/lib/api-empresa";
import type {
  FuncionarioCreateRequest,
  FuncionarioUpdateRequest,
  ContratoFuncionarioRequest,
  JornadaFuncionarioConfigRequest,
  TipoEscalaJornada,
} from "@/types/empresa";
import {
  TIPO_CONTRATO_OPCOES,
  TIPO_ESCALA_JORNADA_OPCOES,
  tipoEscalaJornadaFromId,
} from "@/types/empresa";
import { durationToHHmm, hhmmToDuration, clampDurationHHmmTo44, clampDurationHHmmTo6, clampDurationHHmmTo12 } from "@/lib/duration";
import { ESCALA_DEFAULTS, ESCALA_HORARIOS, ESCALA_FOLGAS_DEFAULT, DIAS_SEMANA_ISO, escalaTemDiaFolga, JORNADA_FIELD_HELP } from "@/lib/jornada-escala-defaults";

function hojeIsoLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const emptyForm = (): FuncionarioCreateRequest => ({
  username: "",
  nomeCompleto: "",
  primeiroNome: "",
  ultimoNome: "",
  cpf: "",
  dataNascimento: null,
  email: "",
  senha: "",
  usuarioTelefone: null,
  contratoFuncionario: null,
  jornadaFuncionarioConfig: emptyJornada(),
  geofenceIds: null,
});

/** Auto-completa primeiro, último e username a partir do nome completo. Só preenche sobrenome e ".sobrenome" no usuário quando houver mais de um nome. */
function fillFromNomeCompleto(nomeCompleto: string): { primeiroNome: string; ultimoNome: string; username: string } {
  const t = nomeCompleto.trim();
  if (!t) return { primeiroNome: "", ultimoNome: "", username: "" };
  const parts = t.split(/\s+/).filter(Boolean);
  const primeiro = parts[0] ?? "";
  if (parts.length === 1) {
    return { primeiroNome: primeiro, ultimoNome: "", username: maskUsernameInput(primeiro) };
  }
  const ultimo = parts[parts.length - 1] ?? "";
  const usernameRaw = [primeiro, ultimo].filter(Boolean).join(".");
  const username = maskUsernameInput(usernameRaw);
  return { primeiroNome: primeiro, ultimoNome: ultimo, username };
}

/** Primeiro e sobrenome derivados do nome completo (mesma regra do envio à API). */
function partesNomeDoCompleto(nomeCompleto: string): { primeiroNome: string; ultimoNome: string } {
  const { primeiroNome, ultimoNome } = fillFromNomeCompleto(nomeCompleto);
  return { primeiroNome, ultimoNome };
}

const emptyTelefone = () => ({ codigoPais: "55", ddd: "", numero: "" });

/** Valores iniciais para Contrato (opcional). */
const emptyContrato = (): ContratoFuncionarioRequest => ({
  matricula: null,
  pisPasep: null,
  cargo: "",
  departamento: null,
  tipoContratoId: 0,
  ativo: true,
  dataAdmissao: "",
  dataDemissao: null,
  salarioMensal: null,
  salarioHora: null,
});

/** Valores iniciais para aba Jornada — sem escala selecionada (campos abaixo ficam desabilitados). */
const emptyJornada = (): JornadaFuncionarioConfigRequest => ({
  tipoEscalaJornadaId: 0,
  cargaHorariaDiaria: ESCALA_DEFAULTS["5x2"].cargaHorariaDiaria,
  cargaHorariaSemanal: ESCALA_DEFAULTS["5x2"].cargaHorariaSemanal,
  toleranciaPadrao: "PT0S",
  tempoDescansoEntreJornada: ESCALA_DEFAULTS["5x2"].tempoDescansoEntreJornada,
  entradaPadrao: ESCALA_HORARIOS["5x2"].entrada,
  saidaPadrao: ESCALA_HORARIOS["5x2"].saida,
  inicioEscala: hojeIsoLocal(),
  diasFolga: [],
  almocoInicio: null,
  almocoFim: null,
  gravaGeoObrigatoria: false,
  gravaPontoApenasEmGeofence: false,
});

function resumoLinhasJornada(j: JornadaFuncionarioConfigRequest) {
  const escala = tipoEscalaJornadaFromId(j.tipoEscalaJornadaId) ?? "Jornada";
  const diaria = durationToHHmm(j.cargaHorariaDiaria ?? "") || "—";
  const semanal = durationToHHmm(j.cargaHorariaSemanal ?? "") || "—";
  const entrada = j.entradaPadrao?.slice(0, 5) || "—";
  const saida = j.saidaPadrao?.slice(0, 5) || "—";
  const almoco =
    j.almocoInicio && j.almocoFim
      ? `${j.almocoInicio.slice(0, 5)}–${j.almocoFim.slice(0, 5)}`
      : null;
  return {
    titulo: escala,
    detalhe: `${semanal} semanais · ${diaria} diárias`,
    horario: almoco
      ? `${entrada} — ${saida} · Almoço ${almoco}`
      : `${entrada} — ${saida}`,
  };
}

export default function FuncionarioFormPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { usuarioId } = useParams<{ usuarioId?: string }>();
  const formOpen: "create" | "edit" = usuarioId ? "edit" : "create";
  const returnToPerfil =
    formOpen === "edit" &&
    (location.state as { returnTo?: string } | null)?.returnTo === "perfil";
  const nomeListaRetorno =
    (location.state as { nomeLista?: string } | null)?.nomeLista?.trim() || "";

  const voltarAposForm = () => {
    if (returnToPerfil && usuarioId) {
      navigate("/empresa/funcionarios", {
        state: { openPerfilId: usuarioId, nomeLista: nomeListaRetorno },
      });
      return;
    }
    navigate("/empresa/funcionarios");
  };

  const queryClient = useQueryClient();
  const { getError, handleBlur, handleChange, validateAll } = useValidation();
  const [form, setForm] = useState<FuncionarioCreateRequest>(emptyForm());
  const [ativarTelefone, setAtivarTelefone] = useState(false);
  const [telefoneExpandida, setTelefoneExpandida] = useState(false);
  const [ativarNascimento, setAtivarNascimento] = useState(false);
  const [nascimentoExpandida, setNascimentoExpandida] = useState(false);
  const [ativarContrato, setAtivarContrato] = useState(false);
  const [contratoExpandida, setContratoExpandida] = useState(false);
  const [mostrarAlmoco, setMostrarAlmoco] = useState(false);
  const [ativarJornada, setAtivarJornada] = useState(false);
  const [jornadaExpandida, setJornadaExpandida] = useState(false);
  const [ativarGeofences, setAtivarGeofences] = useState(false);
  const [geofencesExpandida, setGeofencesExpandida] = useState(false);
  const [salarioInput, setSalarioInput] = useState("");
  const [tipoSalario, setTipoSalario] = useState<"mensal" | "hora">("mensal");
  const [editUsername, setEditUsername] = useState(false);
  const [durationDisplays, setDurationDisplays] = useState<Record<string, string>>({});
  const [loadingPerfil, setLoadingPerfil] = useState(!!usuarioId);
  const refUsername = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (editUsername && refUsername.current && !refUsername.current.contains(t)) setEditUsername(false);
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [editUsername]);

  const { data: geofencesData } = useQuery({
    queryKey: queryKeys.empresa.geofences("all"),
    queryFn: () => listarGeofences({ page: 0, size: 500 }),
    ...CACHE_MEDIUM,
  });
  const geofencesList = geofencesData?.conteudo ?? [];

  const createMutation = useMutation({
    mutationFn: (body: FuncionarioCreateRequest) => criarFuncionario(body),
    onSuccess: () => {
      invalidateUserMutation(queryClient, "funcionario");
      toast({ title: "Funcionário criado", description: "Novo funcionário cadastrado com sucesso." });
      navigate("/empresa/funcionarios");
    },
    onError: (err: AxiosError<{ mensagem?: string }>) => {
      const status = err?.response?.status;
      const mensagem = String(err?.response?.data?.mensagem ?? "").toLowerCase();
      if (status === 409 && (mensagem.includes("máxima") || mensagem.includes("limite"))) {
        toast({
          variant: "destructive",
          title: "Limite atingido",
          description: "Você atingiu o limite de funcionários do seu plano. Faça upgrade na cobrança para adicionar mais.",
        });
        navigate("/empresa/cobranca");
        return;
      }
      toast({
        variant: "destructive",
        title: "Erro ao criar",
        description: err.response?.data?.mensagem ?? "Não foi possível criar o funcionário.",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: FuncionarioUpdateRequest }) =>
      atualizarFuncionario(id, body),
    onSuccess: () => {
      invalidateUserMutation(queryClient, "funcionario");
      toast({ title: "Funcionário atualizado", description: "Dados salvos com sucesso." });
      voltarAposForm();
    },
    onError: (err: AxiosError<{ mensagem?: string }>) => {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar",
        description: err.response?.data?.mensagem ?? "Não foi possível atualizar.",
      });
    },
  });

  /** Usuário digita só números; últimos 2 = centavos. Converte para decimal e guarda no form. Ex: "150050" -> 1500.50 */
  const salarioFromDigits = (digits: string) => (digits ? Math.round(parseInt(digits.replace(/\D/g, ""), 10) || 0) / 100 : 0);
  /** Para exibir no input ao carregar: decimal do form vira string de dígitos. Ex: 1500.50 -> "150050" */
  const digitsFromSalario = (n: number) => (n != null && !Number.isNaN(n) && n > 0 ? String(Math.round(n * 100)) : "");

  useEffect(() => {
    let cancelled = false;

    const resetCreate = () => {
      setForm({
        ...emptyForm(),
        contratoFuncionario: emptyContrato(),
        jornadaFuncionarioConfig: emptyJornada(),
        geofenceIds: [],
      });
      setDurationDisplays({});
      setAtivarTelefone(false);
      setTelefoneExpandida(false);
      setAtivarNascimento(false);
      setNascimentoExpandida(false);
      setAtivarContrato(false);
      setContratoExpandida(false);
      setAtivarJornada(true);
      setJornadaExpandida(true);
      setMostrarAlmoco(false);
      setAtivarGeofences(false);
      setGeofencesExpandida(false);
      setSalarioInput("");
      setTipoSalario("mensal");
      setEditUsername(false);
      setLoadingPerfil(false);
    };

    if (!usuarioId) {
      resetCreate();
      return;
    }

    setLoadingPerfil(true);
    (async () => {
      try {
        const p = await getPerfilFuncionario(usuarioId);
        if (cancelled) return;
        const j = p.jornadaFuncionarioConfig;
        const toTime = (v: string | undefined) => (v && v.length >= 5 ? v.slice(0, 5) : "08:00");
        setAtivarTelefone(!!p.usuarioTelefone);
        setTelefoneExpandida(!!p.usuarioTelefone);
        setAtivarNascimento(!!p.dataNascimento);
        setNascimentoExpandida(!!p.dataNascimento);
        setAtivarContrato(!!p.contratoFuncionario);
        setContratoExpandida(!!p.contratoFuncionario);
        setMostrarAlmoco(!!((j as JornadaFuncionarioConfigRequest | undefined)?.almocoInicio));
        setAtivarJornada(!!j);
        setJornadaExpandida(!!j);
        setAtivarGeofences((p.geofenceIds?.length ?? 0) > 0);
        setGeofencesExpandida((p.geofenceIds?.length ?? 0) > 0);
        const nomeCompletoInicial =
          (p.nomeCompleto?.trim()) ||
          [p.primeiroNome, p.ultimoNome].filter(Boolean).join(" ").trim() ||
          "";
        const nomeTitulo = formatTitleCase(nomeCompletoInicial);
        const partesNc = fillFromNomeCompleto(nomeTitulo);
        setForm({
          username: p.username ?? "",
          nomeCompleto: nomeTitulo,
          primeiroNome: partesNc.primeiroNome,
          ultimoNome: partesNc.ultimoNome,
          cpf: p.cpf ? (formatCpf(p.cpf) || p.cpf) : "",
          dataNascimento: p.dataNascimento ?? null,
          email: p.email ?? "",
          senha: "",
          usuarioTelefone: p.usuarioTelefone ?? null,
          contratoFuncionario: p.contratoFuncionario
            ? {
                ...p.contratoFuncionario,
                pisPasep: p.contratoFuncionario.pisPasep ? maskPisPasepInput(p.contratoFuncionario.pisPasep) : null,
              }
            : emptyContrato(),
          jornadaFuncionarioConfig: j
            ? {
                tipoEscalaJornadaId: j.tipoEscalaJornadaId ?? 0,
                cargaHorariaDiaria: j.cargaHorariaDiaria ?? "PT8H",
                cargaHorariaSemanal: j.cargaHorariaSemanal ?? "PT44H",
                toleranciaPadrao: j.toleranciaPadrao ?? "PT0S",
                tempoDescansoEntreJornada: j.tempoDescansoEntreJornada ?? null,
                entradaPadrao: toTime(j.entradaPadrao),
                saidaPadrao: toTime(j.saidaPadrao),
                inicioEscala: (j as JornadaFuncionarioConfigRequest).inicioEscala || hojeIsoLocal(),
                diasFolga: (j as JornadaFuncionarioConfigRequest).diasFolga ?? [],
                almocoInicio: (j as JornadaFuncionarioConfigRequest).almocoInicio ?? null,
                almocoFim: (j as JornadaFuncionarioConfigRequest).almocoFim ?? null,
                gravaGeoObrigatoria: j.gravaGeoObrigatoria ?? false,
                gravaPontoApenasEmGeofence: j.gravaPontoApenasEmGeofence ?? false,
              }
            : null,
          geofenceIds: p.geofenceIds ?? [],
        });
        setDurationDisplays(
          j
            ? {
                cargaHorariaDiaria: durationToHHmm(j.cargaHorariaDiaria ?? ""),
                cargaHorariaSemanal: durationToHHmm(j.cargaHorariaSemanal ?? ""),
                toleranciaPadrao: durationToHHmm(j.toleranciaPadrao ?? "PT0S"),
                tempoDescansoEntreJornada: j.tempoDescansoEntreJornada ? durationToHHmm(j.tempoDescansoEntreJornada) : "",
              }
            : {},
        );
        const salM = p.contratoFuncionario?.salarioMensal;
        const salH = p.contratoFuncionario?.salarioHora;
        if (salH != null && Number(salH) > 0 && !(salM != null && Number(salM) > 0)) {
          setTipoSalario("hora");
          setSalarioInput(digitsFromSalario(salH));
        } else {
          setTipoSalario("mensal");
          setSalarioInput(digitsFromSalario(salM ?? 0));
        }
        setEditUsername(false);
      } catch (err: unknown) {
        if (cancelled) return;
        toast({
          variant: "destructive",
          title: "Erro ao carregar perfil",
          description: (err as { response?: { data?: { mensagem?: string } } })?.response?.data?.mensagem ?? "Não foi possível carregar os dados do funcionário.",
        });
        navigate("/empresa/funcionarios");
      } finally {
        if (!cancelled) setLoadingPerfil(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [usuarioId, navigate, toast]);

  /** Telefone: enviar à API sem máscara (só dígitos). Nome e texto ficam com formatação. */
  const buildTelefone = () => {
    if (!ativarTelefone) return null;
    const t = form.usuarioTelefone;
    if (!t?.codigoPais?.trim() || !t?.ddd?.trim() || !t?.numero?.trim()) return null;
    return {
      codigoPais: t.codigoPais.replace(/\D/g, "").trim(),
      ddd: t.ddd.replace(/\D/g, "").trim(),
      numero: t.numero.replace(/\D/g, "").trim(),
    };
  };

  /** Contrato: cargo/departamento com formatação (texto). PIS/PASEP sem máscara (só dígitos). */
  const buildContrato = (): ContratoFuncionarioRequest | null => {
    if (!ativarContrato) return null;
    const c = form.contratoFuncionario;
    if (!c || !c.cargo?.trim() || !c.tipoContratoId || !c.dataAdmissao?.trim()) return null;
    return {
      matricula: c.matricula?.trim() || null,
      pisPasep: c.pisPasep?.replace(/\D/g, "").trim() || null,
      cargo: c.cargo.trim(),
      departamento: c.departamento?.trim() || null,
      tipoContratoId: c.tipoContratoId,
      ativo: true,
      dataAdmissao: c.dataAdmissao.trim(),
      dataDemissao: c.dataDemissao?.trim() || null,
      salarioMensal:
        tipoSalario === "mensal" && c.salarioMensal != null && !Number.isNaN(Number(c.salarioMensal))
          ? Number(c.salarioMensal)
          : null,
      salarioHora:
        tipoSalario === "hora" && c.salarioHora != null && !Number.isNaN(Number(c.salarioHora))
          ? Number(c.salarioHora)
          : null,
    };
  };

  const buildJornada = (): JornadaFuncionarioConfigRequest | null => {
    const j = form.jornadaFuncionarioConfig;
    if (!ativarJornada || !j || !j.tipoEscalaJornadaId || !j.cargaHorariaDiaria || !j.cargaHorariaSemanal || !j.entradaPadrao || !j.saidaPadrao || !j.tempoDescansoEntreJornada || !j.inicioEscala) {
      return null;
    }
    return {
      tipoEscalaJornadaId: j.tipoEscalaJornadaId,
      cargaHorariaDiaria: j.cargaHorariaDiaria,
      cargaHorariaSemanal: j.cargaHorariaSemanal,
      toleranciaPadrao: j.toleranciaPadrao ?? null,
      tempoDescansoEntreJornada: j.tempoDescansoEntreJornada ?? null,
      entradaPadrao: j.entradaPadrao,
      saidaPadrao: j.saidaPadrao,
      inicioEscala: j.inicioEscala || hojeIsoLocal(),
      diasFolga: j.diasFolga ?? [],
      almocoInicio: j.almocoInicio || null,
      almocoFim: j.almocoFim || null,
      gravaGeoObrigatoria: j.gravaGeoObrigatoria ?? false,
      gravaPontoApenasEmGeofence: j.gravaPontoApenasEmGeofence ?? false,
    };
  };

  const handleSubmitCreate = () => {
    const partes = partesNomeDoCompleto(form.nomeCompleto ?? "");
    const ok = validateAll([
      ["nomeCompleto", form.nomeCompleto ?? "", (v) => validateNomeCompleto(v, true)],
      ["primeiroNome", partes.primeiroNome, (v) => validatePrimeiroNome(v, true)],
      ["ultimoNome", partes.ultimoNome, (v) => validateUltimoNome(v, true)],
      ["username", form.username ?? "", (v) => validateUsername(v, true)],
      ["cpf", form.cpf ?? "", (v) => validateCpf(v, true)],
      ["email", form.email ?? "", (v) => validateEmail(v, true)],
      ["senha", form.senha ?? "", (v) => validateSenha(v, true)],
      ...(ativarNascimento
        ? ([
            ["dataNascimento", form.dataNascimento ?? "", (v) => validateData(v, true)],
          ] satisfies ValidationEntry[])
        : []),
      ...(ativarTelefone
        ? ([
            ["codigoPais", form.usuarioTelefone?.codigoPais ?? "", (v) => validateCodigoPais(v, true)],
            ["ddd", form.usuarioTelefone?.ddd ?? "", (v) => validateDdd(v, true)],
            ["numero", form.usuarioTelefone?.numero ?? "", (v) => validateNumeroTelefone(v, true)],
          ] satisfies ValidationEntry[])
        : []),
      ...(ativarContrato && form.contratoFuncionario
        ? ([
            ["cargo", form.contratoFuncionario.cargo ?? "", (v) => validateCargo(v, true)],
            ["pisPasep", form.contratoFuncionario.pisPasep ?? "", (v) => validatePisPasep(v, false)],
            ["tipoContratoId", form.contratoFuncionario.tipoContratoId ? String(form.contratoFuncionario.tipoContratoId) : "", (v) => validateRequiredSelect(v, "Tipo de contrato é obrigatório.")],
            ["dataAdmissao", form.contratoFuncionario.dataAdmissao ?? "", (v) => validateDataAdmissao(v, true)],
            [
              tipoSalario === "mensal" ? "salarioMensal" : "salarioHora",
              salarioInput,
              (v) => validateSalarioOpcional(v ? salarioFromDigits(v) : null, tipoSalario === "mensal" ? "Salário mensal" : "Salário hora"),
            ],
          ] satisfies ValidationEntry[])
        : []),
      ...(ativarJornada && form.jornadaFuncionarioConfig
        ? ([
            ["tipoEscalaJornadaId", form.jornadaFuncionarioConfig.tipoEscalaJornadaId ? String(form.jornadaFuncionarioConfig.tipoEscalaJornadaId) : "", (v) => validateRequiredSelect(v, "Tipo de escala jornada é obrigatório.")],
            ["cargaHorariaDiaria", durationToHHmm(form.jornadaFuncionarioConfig.cargaHorariaDiaria ?? ""), (v) => validateDurationHhmmCargaDiaria(v)],
            ["cargaHorariaSemanal", durationToHHmm(form.jornadaFuncionarioConfig.cargaHorariaSemanal ?? ""), (v) => validateDurationHhmm(v, true, "Carga semanal")],
            ["tempoDescansoEntreJornada", durationToHHmm(form.jornadaFuncionarioConfig.tempoDescansoEntreJornada ?? ""), (v) => validateDurationHhmm(v, true, "Mínimo entre turnos")],
            ["entradaPadrao", form.jornadaFuncionarioConfig.entradaPadrao ?? "", (v) => validateHorario(v, true, "Entrada padrão")],
            ["saidaPadrao", form.jornadaFuncionarioConfig.saidaPadrao ?? "", (v) => validateHorario(v, true, "Saída padrão")],
            ["inicioEscala", form.jornadaFuncionarioConfig.inicioEscala ?? "", (v) => validateData(v, true)],
          ] satisfies ValidationEntry[])
        : []),
    ]);
    if (!ok) {
      toast({ variant: "destructive", title: "Corrija os erros antes de salvar." });
      return;
    }
    // CPF: usuário vê com máscara; envia para API sem máscara (11 dígitos).
    const body: FuncionarioCreateRequest = {
      username: form.username.trim(),
      nomeCompleto: form.nomeCompleto.trim(),
      primeiroNome: partes.primeiroNome.trim(),
      ultimoNome: partes.ultimoNome.trim(),
      cpf: form.cpf.replace(/\D/g, "").trim(),
      dataNascimento: ativarNascimento ? (form.dataNascimento ?? null) : null,
      email: form.email.trim(),
      senha: form.senha,
      usuarioTelefone: buildTelefone(),
      contratoFuncionario: buildContrato(),
      jornadaFuncionarioConfig: buildJornada(),
      geofenceIds: ativarGeofences && form.geofenceIds?.length ? form.geofenceIds : null,
    };
    createMutation.mutate(body);
  };

  const handleSubmitEdit = () => {
    if (!usuarioId) return;
    const partes = partesNomeDoCompleto(form.nomeCompleto ?? "");
    const ok = validateAll([
      ["nomeCompleto", form.nomeCompleto ?? "", (v) => validateNomeCompleto(v, true)],
      ["primeiroNome", partes.primeiroNome, (v) => validatePrimeiroNome(v, true)],
      ["ultimoNome", partes.ultimoNome, (v) => validateUltimoNome(v, true)],
      ["username", form.username ?? "", (v) => validateUsername(v, true)],
      ["cpf", form.cpf ?? "", (v) => validateCpf(v, true)],
      ["email", form.email ?? "", (v) => validateEmail(v, true)],
      ...(ativarNascimento
        ? ([
            ["dataNascimento", form.dataNascimento ?? "", (v) => validateData(v, true)],
          ] satisfies ValidationEntry[])
        : []),
      ...(ativarTelefone
        ? ([
            ["codigoPais", form.usuarioTelefone?.codigoPais ?? "", (v) => validateCodigoPais(v, true)],
            ["ddd", form.usuarioTelefone?.ddd ?? "", (v) => validateDdd(v, true)],
            ["numero", form.usuarioTelefone?.numero ?? "", (v) => validateNumeroTelefone(v, true)],
          ] satisfies ValidationEntry[])
        : []),
      ...(ativarContrato && form.contratoFuncionario
        ? ([
            ["cargo", form.contratoFuncionario.cargo ?? "", (v) => validateCargo(v, true)],
            ["pisPasep", form.contratoFuncionario.pisPasep ?? "", (v) => validatePisPasep(v, false)],
            ["tipoContratoId", form.contratoFuncionario.tipoContratoId ? String(form.contratoFuncionario.tipoContratoId) : "", (v) => validateRequiredSelect(v, "Tipo de contrato é obrigatório.")],
            ["dataAdmissao", form.contratoFuncionario.dataAdmissao ?? "", (v) => validateDataAdmissao(v, true)],
            [
              tipoSalario === "mensal" ? "salarioMensal" : "salarioHora",
              salarioInput,
              (v) => validateSalarioOpcional(v ? salarioFromDigits(v) : null, tipoSalario === "mensal" ? "Salário mensal" : "Salário hora"),
            ],
          ] satisfies ValidationEntry[])
        : []),
      ...(ativarJornada && form.jornadaFuncionarioConfig
        ? ([
            ["tipoEscalaJornadaId", form.jornadaFuncionarioConfig.tipoEscalaJornadaId ? String(form.jornadaFuncionarioConfig.tipoEscalaJornadaId) : "", (v) => validateRequiredSelect(v, "Tipo de escala jornada é obrigatório.")],
            ["cargaHorariaDiaria", durationToHHmm(form.jornadaFuncionarioConfig.cargaHorariaDiaria ?? ""), (v) => validateDurationHhmmCargaDiaria(v)],
            ["cargaHorariaSemanal", durationToHHmm(form.jornadaFuncionarioConfig.cargaHorariaSemanal ?? ""), (v) => validateDurationHhmm(v, true, "Carga semanal")],
            ["tempoDescansoEntreJornada", durationToHHmm(form.jornadaFuncionarioConfig.tempoDescansoEntreJornada ?? ""), (v) => validateDurationHhmm(v, true, "Mínimo entre turnos")],
            ["entradaPadrao", form.jornadaFuncionarioConfig.entradaPadrao ?? "", (v) => validateHorario(v, true, "Entrada padrão")],
            ["saidaPadrao", form.jornadaFuncionarioConfig.saidaPadrao ?? "", (v) => validateHorario(v, true, "Saída padrão")],
            ["inicioEscala", form.jornadaFuncionarioConfig.inicioEscala ?? "", (v) => validateData(v, true)],
          ] satisfies ValidationEntry[])
        : []),
    ]);
    if (!ok) {
      toast({ variant: "destructive", title: "Corrija os erros antes de salvar." });
      return;
    }
    // CPF: envia para API sem máscara (11 dígitos).
    const body: FuncionarioUpdateRequest = {
      username: form.username.trim(),
      nomeCompleto: form.nomeCompleto.trim(),
      primeiroNome: partes.primeiroNome.trim(),
      ultimoNome: partes.ultimoNome.trim(),
      cpf: form.cpf.replace(/\D/g, "").trim(),
      dataNascimento: ativarNascimento ? (form.dataNascimento ?? null) : null,
      email: form.email.trim(),
      usuarioTelefone: buildTelefone(),
      contratoFuncionario: buildContrato(),
      jornadaFuncionarioConfig: buildJornada(),
      geofenceIds: ativarGeofences && form.geofenceIds?.length ? form.geofenceIds : null,
    };
    updateMutation.mutate({ id: usuarioId, body });
  };

  const partesNomeBotao = partesNomeDoCompleto(form.nomeCompleto ?? "");
  const submitDisabled =
    createMutation.isPending ||
    updateMutation.isPending ||
    (formOpen === "create" &&
      (!form.username?.trim() ||
        !form.nomeCompleto?.trim() ||
        !partesNomeBotao.primeiroNome.trim() ||
        !partesNomeBotao.ultimoNome.trim() ||
        !form.cpf?.trim() ||
        !form.email?.trim() ||
        !form.senha?.trim() ||
        !!validateCpf(form.cpf, true))) ||
    (formOpen === "edit" && !!form.cpf?.trim() && !!validateCpf(form.cpf, true));

  if (loadingPerfil) {
    return (
      <div className="space-y-4 p-4 sm:p-6">
        <p className="text-sm text-muted-foreground">Carregando funcionário…</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="-ml-2"
          onClick={voltarAposForm}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />{" "}
          {returnToPerfil ? "Perfil" : "Funcionários"}
        </Button>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={voltarAposForm}
          >
            Cancelar
          </Button>
          <Button
            size="sm"
            className="gap-1.5"
            onClick={formOpen === "create" ? handleSubmitCreate : handleSubmitEdit}
            disabled={submitDisabled}
          >
            {formOpen === "create" ? "Criar" : "Salvar"}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        <div>
          <h1 className="font-display text-xl font-semibold">
            {formOpen === "create" ? "Novo funcionário" : "Editar funcionário"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {formOpen === "create"
              ? "Preencha os campos obrigatórios para cadastrar o funcionário."
              : "Preencha os campos obrigatórios para salvar as alterações."}
          </p>
        </div>
      </div>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <UserRound className="h-5 w-5" />
            {formOpen === "create" ? "Cadastro" : "Dados do funcionário"}
            <Badge className="text-[11px] px-1.5 py-0 font-normal border-0 bg-red-100 text-red-900 dark:bg-red-950/50 dark:text-red-200">Obrigatório</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-4 px-4 py-4 sm:px-5 sm:py-5`}>
              <div className="space-y-3">
                <h4 className="border-b border-border/60 pb-1.5 text-sm font-semibold text-foreground">
                  Informações Pessoais
                </h4>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label required className="text-xs sm:text-sm">
                    Nome completo
                  </Label>
                  <Input
                    value={form.nomeCompleto}
                    onChange={(e) => {
                      const formatted = formatTitleCase(e.target.value);
                      const filled = fillFromNomeCompleto(formatted);
                      setForm((prev) => ({
                        ...prev,
                        nomeCompleto: formatted,
                        primeiroNome: filled.primeiroNome,
                        ultimoNome: filled.ultimoNome,
                        username: filled.username,
                      }));
                      handleChange("nomeCompleto", formatted, (x) => validateNomeCompleto(x, true));
                    }}
                    onBlur={() => handleBlur("nomeCompleto", form.nomeCompleto ?? "", (x) => validateNomeCompleto(x, true))}
                    placeholder="Ex: João Pedro da Silva"
                    className="h-10 border-border bg-background text-sm"
                  />
                  <FieldExpectedStatus error={getError("nomeCompleto")} />
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="border-b border-border/60 pb-1.5 text-sm font-semibold text-foreground">
                  Identificação
                </h4>
                <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="min-w-0 space-y-2">
                    <Label required>CPF</Label>
                    <Input
                      value={form.cpf}
                      onChange={(e) => {
                        const next = maskCpfInput(e.target.value);
                        setForm((prev) => ({ ...prev, cpf: next }));
                        handleChange("cpf", next, (v) => validateCpf(v, true));
                      }}
                      onBlur={() => handleBlur("cpf", form.cpf ?? "", (v) => validateCpf(v, true))}
                      placeholder="000.000.000-00"
                      className="h-10 min-w-0 border-border bg-background text-sm"
                    />
                    <FieldExpectedStatus error={getError("cpf")} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="border-b border-border/60 pb-1.5 text-sm font-semibold text-foreground">
                  Credenciais e Contato
                </h4>
                <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="min-w-0 space-y-2">
                    <Label required>Usuário (login)</Label>
                    <div ref={refUsername} className="relative">
                      <Input
                        value={form.username}
                        disabled={!editUsername}
                        onChange={(e) => {
                          const next = maskUsernameInput(e.target.value);
                          setForm((prev) => ({ ...prev, username: next }));
                          handleChange("username", next, (v) => validateUsername(v, true));
                        }}
                        onBlur={() => {
                          handleBlur("username", form.username ?? "", (v) => validateUsername(v, true));
                          setEditUsername(false);
                        }}
                        placeholder="primeiro.ultimonome"
                        className={cn("h-10 min-w-0 border-border pr-12 text-sm", !editUsername && "bg-muted")}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => (editUsername ? setEditUsername(false) : setEditUsername(true))}
                      >
                        {editUsername ? <Check className="h-4 w-4 text-green-600" /> : <PencilLine className="h-4 w-4" />}
                      </Button>
                    </div>
                    <FieldExpectedStatus error={getError("username")} />
                  </div>
                  <div className="min-w-0 space-y-1.5 sm:space-y-2">
                    <Label required>E-mail</Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => {
                        const next = maskEmailInput(e.target.value);
                        setForm((prev) => ({ ...prev, email: next }));
                        handleChange("email", next, (v) => validateEmail(v, true));
                      }}
                      onBlur={() => handleBlur("email", form.email ?? "", (v) => validateEmail(v, true))}
                      placeholder="email@empresa.com"
                      className="h-10 min-w-0 border-border bg-background text-sm"
                    />
                    <FieldExpectedStatus error={getError("email")} />
                  </div>
                </div>
                {formOpen === "create" && (
                  <div className="space-y-2">
                    <Label required>Senha</Label>
                    <Input
                      type="password"
                      value={form.senha}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, senha: e.target.value }));
                        handleChange("senha", e.target.value, (v) => validateSenha(v, true));
                      }}
                      onBlur={() => handleBlur("senha", form.senha ?? "", (v) => validateSenha(v, true))}
                      placeholder="••••••••"
                      className="h-10 border-border bg-background text-sm"
                    />
                    <FieldExpectedStatus error={getError("senha")} />
                  </div>
                )}
              </div>
        </CardContent>
      </Card>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Clock className="h-5 w-5" />
            Jornada
            <Badge className="text-[11px] px-1.5 py-0 font-normal border-0 bg-red-100 text-red-900 dark:bg-red-950/50 dark:text-red-200">Obrigatório</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-3 px-4 py-4 sm:px-5 sm:py-5`}>
              <div className="space-y-3">
                {!jornadaExpandida && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => {
                      if (!ativarJornada) {
                        setForm((prev) => ({
                          ...prev,
                          jornadaFuncionarioConfig: emptyJornada(),
                        }));
                        setDurationDisplays({
                          cargaHorariaDiaria: durationToHHmm(emptyJornada().cargaHorariaDiaria ?? ""),
                          cargaHorariaSemanal: durationToHHmm(emptyJornada().cargaHorariaSemanal ?? ""),
                          toleranciaPadrao: durationToHHmm(emptyJornada().toleranciaPadrao ?? "PT0S"),
                          tempoDescansoEntreJornada: emptyJornada().tempoDescansoEntreJornada
                            ? durationToHHmm(emptyJornada().tempoDescansoEntreJornada)
                            : "",
                        });
                        setAtivarJornada(true);
                      }
                      setJornadaExpandida(true);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar jornada
                  </Button>
                )}

                {jornadaExpandida && form.jornadaFuncionarioConfig && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, jornadaFuncionarioConfig: null }));
                        setDurationDisplays({});
                        setMostrarAlmoco(false);
                        setAtivarJornada(false);
                        setJornadaExpandida(false);
                      }}
                    >
                      <Minus className="h-4 w-4" />
                      Jornada
                    </Button>
                    <JornadaFuncionarioFields
                      value={form.jornadaFuncionarioConfig}
                      onChange={(next) =>
                        setForm((prev) => ({
                          ...prev,
                          jornadaFuncionarioConfig: next,
                        }))
                      }
                      durationDisplays={durationDisplays}
                      setDurationDisplays={setDurationDisplays}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      getError={getError}
                      mostrarAlmoco={mostrarAlmoco}
                      setMostrarAlmoco={setMostrarAlmoco}
                    />
                  </>
                )}
              </div>
        </CardContent>
      </Card>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Calendar className="h-5 w-5" />
            Data de nascimento
            <Badge className="text-[11px] px-1.5 py-0 font-normal border-0 bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">Opcional</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-3 px-4 py-4 sm:px-5 sm:py-5`}>
              <div className="space-y-3">
                {!nascimentoExpandida && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => {
                      if (!ativarNascimento) {
                        setForm((prev) => ({ ...prev, dataNascimento: null }));
                        setAtivarNascimento(true);
                      }
                      setNascimentoExpandida(true);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar data de nascimento
                  </Button>
                )}

                {nascimentoExpandida && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, dataNascimento: null }));
                        setAtivarNascimento(false);
                        setNascimentoExpandida(false);
                      }}
                    >
                      <Minus className="h-4 w-4" />
                      Data de nascimento
                    </Button>
                    <div className="max-w-xs space-y-2">
                      <Label required>Data de nascimento</Label>
                      <div className="relative">
                        <Input
                          type="date"
                          value={form.dataNascimento ?? ""}
                          onChange={(e) => {
                            const v = e.target.value || null;
                            setForm((prev) => ({ ...prev, dataNascimento: v }));
                            handleChange("dataNascimento", v ?? "", (x) => validateData(x, true));
                          }}
                          onBlur={() =>
                            handleBlur("dataNascimento", form.dataNascimento ?? "", (x) => validateData(x, true))
                          }
                          aria-invalid={!!getError("dataNascimento")}
                          className="h-10 min-w-0 border-border bg-background pr-10 text-sm [color-scheme:light]"
                        />
                        <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                      <FieldExpectedStatus error={getError("dataNascimento")} />
                    </div>
                  </>
                )}
              </div>
        </CardContent>
      </Card>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Phone className="h-5 w-5" />
            Telefone
            <Badge className="text-[11px] px-1.5 py-0 font-normal border-0 bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">Opcional</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-3 px-4 py-4 sm:px-5 sm:py-5`}>
              <div className="space-y-3">
                {!telefoneExpandida && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => {
                      if (!ativarTelefone) {
                        setForm((prev) => ({ ...prev, usuarioTelefone: emptyTelefone() }));
                        setAtivarTelefone(true);
                      }
                      setTelefoneExpandida(true);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar telefone
                  </Button>
                )}

                {telefoneExpandida && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => {
                      setForm((prev) => ({ ...prev, usuarioTelefone: null }));
                      setAtivarTelefone(false);
                      setTelefoneExpandida(false);
                    }}
                    >
                      <Minus className="h-4 w-4" />
                      Telefone
                    </Button>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="space-y-2">
                        <Label required>Cód. país</Label>
                        <Input
                          value={form.usuarioTelefone?.codigoPais ?? "55"}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "").slice(0, 3) || "55";
                            setForm((prev) => ({
                              ...prev,
                              usuarioTelefone: {
                                ...(prev.usuarioTelefone ?? emptyTelefone()),
                                codigoPais: v,
                              },
                            }));
                            handleChange("codigoPais", v, (x) => validateCodigoPais(x, true));
                          }}
                          onBlur={() => handleBlur("codigoPais", form.usuarioTelefone?.codigoPais ?? "", (x) => validateCodigoPais(x, true))}
                          placeholder="55"
                        />
                        <FieldExpectedStatus error={getError("codigoPais")} />
                      </div>
                      <div className="space-y-2">
                        <Label required>DDD</Label>
                        <Input
                          value={form.usuarioTelefone?.ddd ?? ""}
                          onChange={(e) => {
                            const next = maskDddInput(e.target.value);
                            setForm((prev) => ({
                              ...prev,
                              usuarioTelefone: {
                                ...(prev.usuarioTelefone ?? emptyTelefone()),
                                ddd: next,
                              },
                            }));
                            handleChange("ddd", next, (x) => validateDdd(x, true));
                          }}
                          onBlur={() => handleBlur("ddd", form.usuarioTelefone?.ddd ?? "", (x) => validateDdd(x, true))}
                          placeholder="11"
                        />
                        <FieldExpectedStatus error={getError("ddd")} />
                      </div>
                      <div className="space-y-2">
                        <Label required>Número</Label>
                        <Input
                          value={form.usuarioTelefone?.numero ?? ""}
                          onChange={(e) => {
                            const next = maskNumeroTelefoneInput(e.target.value);
                            setForm((prev) => ({
                              ...prev,
                              usuarioTelefone: {
                                ...(prev.usuarioTelefone ?? emptyTelefone()),
                                numero: next,
                              },
                            }));
                            handleChange("numero", next, (x) => validateNumeroTelefone(x, true));
                          }}
                          onBlur={() => handleBlur("numero", form.usuarioTelefone?.numero ?? "", (x) => validateNumeroTelefone(x, true))}
                          placeholder="98765-4321"
                        />
                        <FieldExpectedStatus error={getError("numero")} />
                      </div>
                    </div>
                  </>
                )}
              </div>
        </CardContent>
      </Card>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Briefcase className="h-5 w-5" />
            Contrato
            <Badge className="text-[11px] px-1.5 py-0 font-normal border-0 bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">Opcional</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-3 px-4 py-4 sm:px-5 sm:py-5`}>
              <div className="space-y-3">
                {!contratoExpandida && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => {
                      if (!ativarContrato) {
                        setForm((prev) => ({ ...prev, contratoFuncionario: emptyContrato() }));
                        setSalarioInput("");
                        setTipoSalario("mensal");
                        setAtivarContrato(true);
                      }
                      setContratoExpandida(true);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar contrato
                  </Button>
                )}

                {contratoExpandida && form.contratoFuncionario && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, contratoFuncionario: null }));
                        setSalarioInput("");
                        setTipoSalario("mensal");
                        setAtivarContrato(false);
                        setContratoExpandida(false);
                      }}
                    >
                      <Minus className="h-4 w-4" />
                      Contrato
                    </Button>
                    <div className="space-y-4 rounded-lg border border-border/60 p-3 sm:p-4">
                      <div className="space-y-2">
                        <Label required>Tipo de contrato</Label>
                        <Select
                          value={form.contratoFuncionario.tipoContratoId ? String(form.contratoFuncionario.tipoContratoId) : ""}
                          onValueChange={(v) => {
                            const id = v ? parseInt(v, 10) : 0;
                            setForm((prev) => ({
                              ...prev,
                              contratoFuncionario: prev.contratoFuncionario
                                ? { ...prev.contratoFuncionario, tipoContratoId: id }
                                : emptyContrato(),
                            }));
                            handleChange("tipoContratoId", v ?? "", (x) =>
                              validateRequiredSelect(x, "Tipo de contrato é obrigatório."),
                            );
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIPO_CONTRATO_OPCOES.map((opt) => (
                              <SelectItem key={opt.id} value={String(opt.id)}>
                                {opt.descricao}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FieldExpectedStatus error={getError("tipoContratoId")} />
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <Label required>Cargo</Label>
                          <Input
                            value={form.contratoFuncionario.cargo}
                            onChange={(e) => {
                              const formatted = formatTitleCase(e.target.value);
                              setForm((prev) => ({
                                ...prev,
                                contratoFuncionario: prev.contratoFuncionario
                                  ? { ...prev.contratoFuncionario, cargo: formatted }
                                  : { ...emptyContrato(), cargo: formatted },
                              }));
                              handleChange("cargo", formatted, (x) => validateCargo(x, true));
                            }}
                            onBlur={() =>
                              handleBlur("cargo", form.contratoFuncionario?.cargo ?? "", (x) =>
                                validateCargo(x, true),
                              )
                            }
                            placeholder="Cargo"
                          />
                          <FieldExpectedStatus error={getError("cargo")} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label>Departamento</Label>
                            <Badge className="text-[11px] px-1.5 py-0 font-normal border-0 bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">Opcional</Badge>
                          </div>
                          <Input
                            value={form.contratoFuncionario.departamento ?? ""}
                            onChange={(e) => {
                              const formatted = formatTitleCase(e.target.value);
                              setForm((prev) => ({
                                ...prev,
                                contratoFuncionario: prev.contratoFuncionario
                                  ? { ...prev.contratoFuncionario, departamento: formatted || null }
                                  : { ...emptyContrato(), departamento: formatted || null },
                              }));
                              handleChange("departamento", formatted || "", (x) => validateComplemento(x));
                            }}
                            onBlur={() =>
                              handleBlur(
                                "departamento",
                                form.contratoFuncionario?.departamento ?? "",
                                (x) => validateComplemento(x),
                              )
                            }
                            placeholder="Departamento"
                            aria-invalid={!!getError("departamento")}
                          />
                          <FieldExpectedStatus error={getError("departamento")} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label>Matrícula</Label>
                            <Badge className="text-[11px] px-1.5 py-0 font-normal border-0 bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">Opcional</Badge>
                          </div>
                          <Input
                            value={form.contratoFuncionario.matricula ?? ""}
                            onChange={(e) => {
                              const v = e.target.value || null;
                              setForm((prev) => ({
                                ...prev,
                                contratoFuncionario: prev.contratoFuncionario
                                  ? { ...prev.contratoFuncionario, matricula: v }
                                  : emptyContrato(),
                              }));
                              handleChange("matricula", v ?? "", (x) => validateMatricula(x, false));
                            }}
                            onBlur={() =>
                              handleBlur(
                                "matricula",
                                form.contratoFuncionario?.matricula ?? "",
                                (x) => validateMatricula(x, false),
                              )
                            }
                            placeholder="Matrícula"
                            aria-invalid={!!getError("matricula")}
                          />
                          <FieldExpectedStatus error={getError("matricula")} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label>PIS/PASEP</Label>
                            <Badge className="text-[11px] px-1.5 py-0 font-normal border-0 bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">Opcional</Badge>
                          </div>
                          <Input
                            value={form.contratoFuncionario.pisPasep ?? ""}
                            onChange={(e) => {
                              const next = maskPisPasepInput(e.target.value);
                              setForm((prev) => ({
                                ...prev,
                                contratoFuncionario: prev.contratoFuncionario
                                  ? { ...prev.contratoFuncionario, pisPasep: next || null }
                                  : { ...emptyContrato(), pisPasep: next || null },
                              }));
                              handleChange("pisPasep", next || "", (v) => validatePisPasep(v, false));
                            }}
                            onBlur={() =>
                              handleBlur("pisPasep", form.contratoFuncionario?.pisPasep ?? "", (v) =>
                                validatePisPasep(v, false),
                              )
                            }
                            placeholder="000.00000.00-0"
                            aria-invalid={!!getError("pisPasep")}
                          />
                          <FieldExpectedStatus error={getError("pisPasep")} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <Label required>Data admissão</Label>
                          <Input
                            type="date"
                            value={form.contratoFuncionario.dataAdmissao}
                            onChange={(e) => {
                              const v = e.target.value;
                              setForm((prev) => ({
                                ...prev,
                                contratoFuncionario: prev.contratoFuncionario
                                  ? { ...prev.contratoFuncionario, dataAdmissao: v }
                                  : emptyContrato(),
                              }));
                              handleChange("dataAdmissao", v, (x) => validateDataAdmissao(x, true));
                            }}
                            onBlur={() =>
                              handleBlur(
                                "dataAdmissao",
                                form.contratoFuncionario?.dataAdmissao ?? "",
                                (x) => validateDataAdmissao(x, true),
                              )
                            }
                          />
                          <FieldExpectedStatus error={getError("dataAdmissao")} />
                        </div>
                        {formOpen === "edit" ? (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label>Data demissão</Label>
                              <Badge className="text-[11px] px-1.5 py-0 font-normal border-0 bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">Opcional</Badge>
                            </div>
                            <Input
                              type="date"
                              value={form.contratoFuncionario.dataDemissao ?? ""}
                              onChange={(e) => {
                                const v = e.target.value || null;
                                setForm((prev) => ({
                                  ...prev,
                                  contratoFuncionario: prev.contratoFuncionario
                                    ? { ...prev.contratoFuncionario, dataDemissao: v }
                                    : emptyContrato(),
                                }));
                                handleChange("dataDemissao", v ?? "", (x) => validateData(x, false));
                              }}
                              onBlur={() =>
                                handleBlur(
                                  "dataDemissao",
                                  form.contratoFuncionario?.dataDemissao ?? "",
                                  (x) => validateData(x, false),
                                )
                              }
                              aria-invalid={!!getError("dataDemissao")}
                            />
                            <FieldExpectedStatus error={getError("dataDemissao")} />
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Label>Salário</Label>
                            <Badge className="text-[11px] px-1.5 py-0 font-normal border-0 bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">Opcional</Badge>
                          </div>
                          <ToggleGroup
                            type="single"
                            value={tipoSalario}
                            onValueChange={(v) => {
                              if (v !== "mensal" && v !== "hora") return;
                              setTipoSalario(v);
                              setSalarioInput("");
                              setForm((prev) => ({
                                ...prev,
                                contratoFuncionario: prev.contratoFuncionario
                                  ? { ...prev.contratoFuncionario, salarioMensal: null, salarioHora: null }
                                  : { ...emptyContrato(), salarioMensal: null, salarioHora: null },
                              }));
                            }}
                            variant="outline"
                            size="sm"
                            className="justify-start"
                          >
                            <ToggleGroupItem value="mensal" aria-label="Salário mensal">
                              Mensal
                            </ToggleGroupItem>
                            <ToggleGroupItem value="hora" aria-label="Salário por hora">
                              Por hora
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </div>
                        <Input
                          type="text"
                          inputMode="numeric"
                          value={salarioInput ? formatSalarioDisplay(salarioFromDigits(salarioInput)) : ""}
                          onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, "").slice(0, 12);
                            setSalarioInput(digits);
                            const valorDecimal = digits.length === 0 ? null : salarioFromDigits(digits);
                            setForm((prev) => ({
                              ...prev,
                              contratoFuncionario: prev.contratoFuncionario
                                ? {
                                    ...prev.contratoFuncionario,
                                    salarioMensal: tipoSalario === "mensal" ? valorDecimal : null,
                                    salarioHora: tipoSalario === "hora" ? valorDecimal : null,
                                  }
                                : {
                                    ...emptyContrato(),
                                    salarioMensal: tipoSalario === "mensal" ? valorDecimal : null,
                                    salarioHora: tipoSalario === "hora" ? valorDecimal : null,
                                  },
                            }));
                            const fieldKey = tipoSalario === "mensal" ? "salarioMensal" : "salarioHora";
                            const label = tipoSalario === "mensal" ? "Salário mensal" : "Salário hora";
                            handleChange(fieldKey, valorDecimal, (val: number | null) =>
                              validateSalarioOpcional(val, label),
                            );
                          }}
                          onBlur={() => {
                            const fieldKey = tipoSalario === "mensal" ? "salarioMensal" : "salarioHora";
                            const label = tipoSalario === "mensal" ? "Salário mensal" : "Salário hora";
                            const value =
                              tipoSalario === "mensal"
                                ? form.contratoFuncionario?.salarioMensal ?? null
                                : form.contratoFuncionario?.salarioHora ?? null;
                            handleBlur(fieldKey, value, (val: number | null) =>
                              validateSalarioOpcional(val, label),
                            );
                          }}
                          placeholder="0,00"
                        />
                        <FieldExpectedStatus error={getError(tipoSalario === "mensal" ? "salarioMensal" : "salarioHora")} />
                      </div>
                    </div>
                  </>
                )}
              </div>
        </CardContent>
      </Card>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <MapPin className="h-5 w-5" />
            Áreas
            <Badge className="text-[11px] px-1.5 py-0 font-normal border-0 bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">Opcional</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-3 px-4 py-4 sm:px-5 sm:py-5`}>
              <div className="space-y-3">
                <div className="flex items-start gap-2 rounded-md border border-border bg-muted/30 p-3.5">
                  <Checkbox
                    id="grava-geo-func"
                    className="mt-0.5"
                    checked={form.jornadaFuncionarioConfig?.gravaGeoObrigatoria ?? false}
                    onCheckedChange={(c) =>
                      setForm((prev) => ({
                        ...prev,
                        jornadaFuncionarioConfig: {
                          ...(prev.jornadaFuncionarioConfig ?? emptyJornada()),
                          gravaGeoObrigatoria: !!c,
                        },
                      }))
                    }
                  />
                  <div>
                    <Label htmlFor="grava-geo-func" className="text-sm font-medium cursor-pointer leading-snug">
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
                    geofencesList.length === 0
                      ? "pointer-events-none select-none border-dashed border-border bg-muted/40 opacity-50"
                      : "border-border bg-muted/30",
                  )}
                  aria-disabled={geofencesList.length === 0}
                >
                  <Checkbox
                    id="grava-geofence-func"
                    className="mt-0.5"
                    checked={form.jornadaFuncionarioConfig?.gravaPontoApenasEmGeofence ?? false}
                    disabled={geofencesList.length === 0}
                    onCheckedChange={(c) =>
                      setForm((prev) => ({
                        ...prev,
                        jornadaFuncionarioConfig: {
                          ...(prev.jornadaFuncionarioConfig ?? emptyJornada()),
                          gravaPontoApenasEmGeofence: geofencesList.length === 0 ? false : !!c,
                        },
                      }))
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <Label
                        htmlFor="grava-geofence-func"
                        className={cn(
                          "text-sm font-medium leading-snug",
                          geofencesList.length === 0 ? "cursor-not-allowed text-muted-foreground" : "cursor-pointer",
                        )}
                      >
                        Restringir batidas por localização
                      </Label>
                      {geofencesList.length === 0 && (
                        <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                      Só permite ponto nos locais cadastrados pela empresa.
                    </p>
                    {geofencesList.length === 0 && (
                      <p className="text-xs text-muted-foreground mt-1 leading-snug">
                        Cadastre pelo menos uma área em Configurações para liberar.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {geofencesList.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhuma área de ponto cadastrada. Cadastre em Configurações.</p>
              ) : (
                <div className="space-y-3">
                  {!geofencesExpandida && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => {
                        setForm((prev) => ({
                          ...prev,
                          geofenceIds: prev.geofenceIds ?? [],
                        }));
                        setAtivarGeofences(true);
                        setGeofencesExpandida(true);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      Adicionar áreas
                    </Button>
                  )}

                  {geofencesExpandida && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                        onClick={() => {
                          setForm((prev) => ({ ...prev, geofenceIds: null }));
                          setAtivarGeofences(false);
                          setGeofencesExpandida(false);
                        }}
                      >
                        <Minus className="h-4 w-4" />
                        Áreas
                      </Button>
                      <div className="max-h-48 space-y-2 overflow-y-auto rounded-md border p-3">
                        {geofencesList.map((g) => {
                          const id = g.id;
                          const checked = form.geofenceIds?.includes(id) ?? false;
                          return (
                            <div
                              key={id}
                              className="flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 hover:bg-muted/50"
                              onClick={() =>
                                setForm((prev) => {
                                  const ids = prev.geofenceIds ?? [];
                                  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
                                  return { ...prev, geofenceIds: next };
                                })
                              }
                            >
                              <Checkbox checked={checked} onCheckedChange={() => {}} />
                              <span className="text-sm font-medium">{g.nome}</span>
                              <span className="text-xs text-muted-foreground">({g.coordenadas})</span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              )}
        </CardContent>
      </Card>

      <div className="flex justify-end border-t border-border pt-4">
        <Button
          size="sm"
          className="gap-1.5"
          onClick={formOpen === "create" ? handleSubmitCreate : handleSubmitEdit}
          disabled={submitDisabled}
        >
          {formOpen === "create" ? "Criar" : "Salvar"}
        </Button>
      </div>
    </div>
  );
}
