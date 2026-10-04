import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Lock,
  Plus,
  Trash2,
  Locate,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { JornadaFuncionarioFields } from "@/components/empresa/JornadaFuncionarioFields";
import { LIST_CARD, LIST_CARD_CONTENT_FLUSH, LIST_CARD_HEADER } from "@/lib/list-card-layout";
import { CACHE_LONG, invalidateUserMutation, queryKeys } from "@/lib/query-cache-policy";
import { FieldExpectedStatus } from "@/components/ui/field-with-expected";
import { useToast } from "@/hooks/use-toast";
import { useValidation } from "@/hooks/useValidation";
import { useEstadosCidades } from "@/lib/useEstadosCidades";
import {
  getPerfilEmpresa,
  atualizarEnderecoEmpresa,
  atualizarJornadaPadrao,
  listarGeofences,
  criarGeofence,
  atualizarGeofence,
  excluirGeofence,
} from "@/lib/api-empresa";
import {
  atualizarPerfilUsuario,
  atualizarEmail,
  adicionarEmail,
  adicionarTelefone,
  removerTelefone,
} from "@/lib/api-usuario";
import {
  validateUsername,
  validateEmail,
  validateCodigoPais,
  validateDdd,
  validateNumeroTelefone,
  validateRua,
  validateNumeroEndereco,
  validateComplemento,
  validateBairro,
  validateCidade,
  validateUf,
  validateCep,
  validateDurationHhmm,
  validateDurationHhmmCargaDiaria,
  validateDurationHhmmTolerancia,
  validateHorario,
  validateRequiredSelect,
  validateTimezone,
  validateData,
} from "@/lib/validations";
import { durationToHHmm } from "@/lib/duration";
import { ESCALA_DEFAULTS, ESCALA_HORARIOS } from "@/lib/jornada-escala-defaults";
import { cn, getBrowserTimezone } from "@/lib/utils";
import {
  formatCnpj,
  formatTitleCase,
  maskCepInput,
  maskDddInput,
  maskNumeroTelefoneInput,
  maskNumeroEnderecoInput,
  maskUsernameInput,
  maskEmailInput,
} from "@/lib/format";
import type { JornadaFuncionarioConfigRequest } from "@/types/empresa";

const inp = "h-10 px-3 text-sm";

function hojeIsoLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function toTime(v: string | null | undefined): string {
  if (!v) return "";
  return v.length >= 5 ? v.slice(0, 5) : v;
}

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

type GeofenceDraft = {
  key: string;
  id?: string;
  descricao: string;
  latitude: number;
  longitude: number;
  raioMetros: number;
  ativo: boolean;
};

function parseCoordenadas(coordenadas: string | null | undefined): { lat: number; lng: number } {
  const parts = String(coordenadas ?? "")
    .split(",")
    .map((s) => s.trim());
  return {
    lat: parseFloat(parts[0] ?? "") || 0,
    lng: parseFloat(parts[1] ?? "") || 0,
  };
}

function jornadaSnapshot(j: JornadaFuncionarioConfigRequest) {
  return JSON.stringify({
    tipoEscalaJornadaId: j.tipoEscalaJornadaId,
    cargaHorariaDiaria: j.cargaHorariaDiaria,
    cargaHorariaSemanal: j.cargaHorariaSemanal,
    toleranciaPadrao: j.toleranciaPadrao ?? "PT0S",
    tempoDescansoEntreJornada: j.tempoDescansoEntreJornada ?? null,
    entradaPadrao: toTime(j.entradaPadrao),
    saidaPadrao: toTime(j.saidaPadrao),
    inicioEscala: j.inicioEscala,
    diasFolga: j.diasFolga ?? [],
    almocoInicio: j.almocoInicio ? toTime(j.almocoInicio) : null,
    almocoFim: j.almocoFim ? toTime(j.almocoFim) : null,
  });
}

function PerfilEmpresaPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { getError, handleBlur, handleChange, validateAll, clearAll } = useValidation();
  const { estados, getCidadesByUf, loading: loadingEstados } = useEstadosCidades();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.empresa.perfil(),
    ...CACHE_LONG,
    queryFn: getPerfilEmpresa,
  });

  const { data: geofencesData } = useQuery({
    queryKey: queryKeys.empresa.geofences("perfil"),
    queryFn: () => listarGeofences({ page: 0, size: 100 }),
    ...CACHE_LONG,
  });

  const [form, setForm] = useState({
    username: "",
    email: "",
    codigoPais: "55",
    ddd: "",
    numero: "",
    rua: "",
    numeroEndereco: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    timezone: getBrowserTimezone(),
    gravarGeolocalizacaoObrigatoria: false,
    gravaPontoApenasEmGeofence: false,
    permitirAjustePontoDireto: false,
  });
  const [jornada, setJornada] = useState<JornadaFuncionarioConfigRequest>(emptyJornada());
  const [jornadaBaseline, setJornadaBaseline] = useState("");
  const [durationDisplays, setDurationDisplays] = useState<Record<string, string>>({});
  const [mostrarAlmoco, setMostrarAlmoco] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [geofences, setGeofences] = useState<GeofenceDraft[]>([]);
  const [geofencesBaseline, setGeofencesBaseline] = useState<GeofenceDraft[]>([]);
  const [geofencesRemovidos, setGeofencesRemovidos] = useState<string[]>([]);
  const [buscandoLocal, setBuscandoLocal] = useState<number | null>(null);
  const [geofencesHydrated, setGeofencesHydrated] = useState(false);

  useEffect(() => {
    if (isError && error) {
      const msg =
        (error as { response?: { data?: { mensagem?: string } }; message?: string })?.response?.data
          ?.mensagem ??
        (error as Error)?.message ??
        "Erro ao carregar perfil.";
      toast({ variant: "destructive", title: "Erro", description: msg });
    }
  }, [isError, error, toast]);

  useEffect(() => {
    if (!data) return;
    const jSrc = data.jornada;
    const j: JornadaFuncionarioConfigRequest = jSrc
      ? {
          tipoEscalaJornadaId: jSrc.tipoEscalaJornadaId ?? 0,
          cargaHorariaDiaria: jSrc.cargaHorariaDiaria ?? "PT8H",
          cargaHorariaSemanal: jSrc.cargaHorariaSemanal ?? "PT44H",
          toleranciaPadrao: jSrc.toleranciaPadrao ?? "PT0S",
          intervaloPadrao: jSrc.intervaloPadrao ?? null,
          tempoDescansoEntreJornada: jSrc.tempoDescansoEntreJornada ?? "PT11H",
          entradaPadrao: toTime(jSrc.entradaPadrao) || "08:00",
          saidaPadrao: toTime(jSrc.saidaPadrao) || "17:00",
          inicioEscala: jSrc.inicioEscala || hojeIsoLocal(),
          diasFolga: jSrc.diasFolga ?? [],
          almocoInicio: jSrc.almocoInicio ? toTime(jSrc.almocoInicio) : null,
          almocoFim: jSrc.almocoFim ? toTime(jSrc.almocoFim) : null,
          gravaGeoObrigatoria: jSrc.gravaGeoObrigatoria ?? false,
          gravaPontoApenasEmGeofence: jSrc.gravaPontoApenasEmGeofence ?? false,
        }
      : {
          ...emptyJornada(),
          cargaHorariaDiaria: data.cargaDiariaPadrao ?? emptyJornada().cargaHorariaDiaria,
          cargaHorariaSemanal: data.cargaSemanalPadrao ?? emptyJornada().cargaHorariaSemanal,
          toleranciaPadrao: data.toleranciaPadrao ?? "PT0S",
          tipoEscalaJornadaId: 1,
        };
    setJornada(j);
    setJornadaBaseline(jornadaSnapshot(j));
    setMostrarAlmoco(!!(j.almocoInicio && j.almocoFim));
    setDurationDisplays({
      cargaHorariaDiaria: durationToHHmm(j.cargaHorariaDiaria ?? ""),
      cargaHorariaSemanal: durationToHHmm(j.cargaHorariaSemanal ?? ""),
      toleranciaPadrao: durationToHHmm(j.toleranciaPadrao ?? "PT0S"),
      tempoDescansoEntreJornada: j.tempoDescansoEntreJornada
        ? durationToHHmm(j.tempoDescansoEntreJornada)
        : "",
    });
    setForm({
      username: data.username ?? "",
      email: data.email ?? "",
      codigoPais: data.codigoPais ?? "55",
      ddd: data.ddd ?? "",
      numero: data.numero ?? "",
      rua: data.rua ?? "",
      numeroEndereco: data.numeroEndereco ?? "",
      complemento: data.complemento ?? "",
      bairro: data.bairro ?? "",
      cidade: data.cidade ?? "",
      uf: (data.uf ?? "").toUpperCase(),
      cep: data.cep ?? "",
      timezone: data.timezone ?? getBrowserTimezone(),
      gravarGeolocalizacaoObrigatoria: data.gravarGeolocalizacaoObrigatoria ?? false,
      gravaPontoApenasEmGeofence: data.gravaPontoApenasEmGeofence ?? false,
      permitirAjustePontoDireto: data.permitirAjustePontoDireto ?? false,
    });
    clearAll();
    setHydrated(true);
  }, [data, clearAll]);

  useEffect(() => {
    if (!geofencesData || geofencesHydrated) return;
    const drafts: GeofenceDraft[] = (geofencesData.conteudo ?? []).map((g) => {
      const { lat, lng } = parseCoordenadas(g.coordenadas);
      return {
        key: g.id,
        id: g.id,
        descricao: g.descricao || g.nome || "",
        latitude: lat,
        longitude: lng,
        raioMetros: g.raio || 100,
        ativo: g.ativo,
      };
    });
    setGeofences(drafts);
    setGeofencesBaseline(drafts);
    setGeofencesRemovidos([]);
    setGeofencesHydrated(true);
  }, [geofencesData, geofencesHydrated]);

  const addGeofence = () => {
    setGeofences((prev) => [
      ...prev,
      {
        key: `new-${crypto.randomUUID()}`,
        descricao: "",
        latitude: 0,
        longitude: 0,
        raioMetros: 100,
        ativo: true,
      },
    ]);
  };

  const updateGeofence = (index: number, field: keyof GeofenceDraft, value: unknown) => {
    setGeofences((prev) => {
      const next = [...prev];
      next[index] = { ...next[index]!, [field]: value };
      return next;
    });
  };

  const removeGeofence = (index: number) => {
    setGeofences((prev) => {
      const target = prev[index];
      if (target?.id) {
        setGeofencesRemovidos((ids) => (ids.includes(target.id!) ? ids : [...ids, target.id!]));
      }
      const next = prev.filter((_, i) => i !== index);
      if (next.length === 0) {
        setForm((p) => ({ ...p, gravaPontoApenasEmGeofence: false }));
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
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  };

  const geofencesChanged = useMemo(() => {
    if (geofencesRemovidos.length > 0) return true;
    if (geofences.length !== geofencesBaseline.length) return true;
    return geofences.some((g, i) => {
      const b = geofencesBaseline[i];
      if (!b) return true;
      return (
        g.id !== b.id ||
        g.descricao !== b.descricao ||
        g.latitude !== b.latitude ||
        g.longitude !== b.longitude ||
        g.raioMetros !== b.raioMetros ||
        g.ativo !== b.ativo
      );
    });
  }, [geofences, geofencesBaseline, geofencesRemovidos]);

  const cidades = getCidadesByUf(form.uf);

  const jornadaChanged = jornadaSnapshot(jornada) !== jornadaBaseline;

  const hasChanges =
    !!data &&
    (form.username.trim() !== (data.username ?? "") ||
      form.email.trim().toLowerCase() !== (data.email ?? "").toLowerCase() ||
      form.codigoPais !== (data.codigoPais ?? "55") ||
      form.ddd !== (data.ddd ?? "") ||
      form.numero !== (data.numero ?? "") ||
      form.rua !== (data.rua ?? "") ||
      form.numeroEndereco !== (data.numeroEndereco ?? "") ||
      form.complemento !== (data.complemento ?? "") ||
      form.bairro !== (data.bairro ?? "") ||
      form.cidade !== (data.cidade ?? "") ||
      form.uf !== (data.uf ?? "").toUpperCase() ||
      form.cep !== (data.cep ?? "") ||
      form.timezone !== (data.timezone ?? "") ||
      form.gravarGeolocalizacaoObrigatoria !== (data.gravarGeolocalizacaoObrigatoria ?? false) ||
      form.gravaPontoApenasEmGeofence !== (data.gravaPontoApenasEmGeofence ?? false) ||
      form.permitirAjustePontoDireto !== (data.permitirAjustePontoDireto ?? false) ||
      jornadaChanged ||
      geofencesChanged);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!data) return;
      const ok = validateAll([
        ["username", form.username, (v) => validateUsername(v, true)],
        ["email", form.email, (v) => validateEmail(v, true)],
        ["codigoPais", form.codigoPais, (v) => validateCodigoPais(v, true)],
        ["ddd", form.ddd, (v) => validateDdd(v, true)],
        ["numero", form.numero, (v) => validateNumeroTelefone(v, true)],
        ["rua", form.rua, (v) => validateRua(v, true)],
        ["numeroEndereco", form.numeroEndereco, (v) => validateNumeroEndereco(v, true)],
        ["complemento", form.complemento, validateComplemento],
        ["bairro", form.bairro, (v) => validateBairro(v, true)],
        ["cidade", form.cidade, (v) => validateCidade(v, true)],
        ["uf", form.uf, (v) => validateUf(v, true)],
        ["cep", form.cep, (v) => validateCep(v, true)],
        [
          "tipoEscalaJornadaId",
          jornada.tipoEscalaJornadaId ? String(jornada.tipoEscalaJornadaId) : "",
          (v) => validateRequiredSelect(v as string, "Tipo de escala jornada é obrigatório."),
        ],
        [
          "cargaHorariaDiaria",
          durationToHHmm(jornada.cargaHorariaDiaria ?? ""),
          (v) => validateDurationHhmmCargaDiaria(v as string),
        ],
        [
          "cargaHorariaSemanal",
          durationToHHmm(jornada.cargaHorariaSemanal ?? ""),
          (v) => validateDurationHhmm(v as string, true, "Carga semanal"),
        ],
        [
          "tempoDescansoEntreJornada",
          durationToHHmm(jornada.tempoDescansoEntreJornada ?? ""),
          (v) => validateDurationHhmm(v as string, true, "Mínimo entre turnos"),
        ],
        ["entradaPadrao", jornada.entradaPadrao ?? "", (v) => validateHorario(v as string, true, "Entrada")],
        ["saidaPadrao", jornada.saidaPadrao ?? "", (v) => validateHorario(v as string, true, "Saída")],
        ["inicioEscala", jornada.inicioEscala ?? "", (v) => validateData(v as string, true)],
        [
          "toleranciaPadrao",
          durationToHHmm(jornada.toleranciaPadrao ?? "PT0S"),
          (v) => validateDurationHhmmTolerancia(v as string, true),
        ],
        ["timezone", form.timezone, (v) => validateTimezone(v, true)],
      ]);
      if (!ok) {
        toast({ variant: "destructive", title: "Corrija os erros antes de salvar." });
        return;
      }
      const tasks: Array<() => Promise<void>> = [];
      if (form.username.trim() !== (data.username ?? "")) {
        tasks.push(() => atualizarPerfilUsuario({ username: form.username.trim() }));
      }
      const emailChanged = form.email.trim().toLowerCase() !== (data.email ?? "").toLowerCase();
      if (emailChanged && form.email.trim()) {
        if (data.email) {
          tasks.push(() => atualizarEmail({ novoEmail: form.email.trim().toLowerCase() }));
        } else {
          tasks.push(() => adicionarEmail({ novoEmail: form.email.trim().toLowerCase() }));
        }
      }
      const telefoneChanged =
        form.codigoPais !== (data.codigoPais ?? "") ||
        form.ddd !== (data.ddd ?? "") ||
        form.numero !== (data.numero ?? "");
      if (telefoneChanged) {
        const hadTelefone = !!data.telefoneId && (data.codigoPais ?? data.ddd ?? data.numero);
        const hasNewTelefone = !!(form.codigoPais?.trim() && form.ddd?.trim() && form.numero?.trim());
        if (hadTelefone && data.telefoneId) tasks.push(() => removerTelefone(data.telefoneId!));
        if (hasNewTelefone) {
          tasks.push(() =>
            adicionarTelefone({
              codigoPais: form.codigoPais.replace(/\D/g, "").trim(),
              ddd: form.ddd.replace(/\D/g, "").trim(),
              numero: form.numero.replace(/\D/g, "").trim(),
            }),
          );
        }
      }
      const enderecoChanged =
        form.rua !== (data.rua ?? "") ||
        form.numeroEndereco !== (data.numeroEndereco ?? "") ||
        form.complemento !== (data.complemento ?? "") ||
        form.bairro !== (data.bairro ?? "") ||
        form.cidade !== (data.cidade ?? "") ||
        form.uf !== (data.uf ?? "").toUpperCase() ||
        form.cep !== (data.cep ?? "");
      if (
        enderecoChanged &&
        form.rua?.trim() &&
        form.numeroEndereco?.trim() &&
        form.bairro?.trim() &&
        form.cidade?.trim() &&
        form.uf?.length === 2 &&
        form.cep?.replace(/\D/g, "").length === 8
      ) {
        tasks.push(() =>
          atualizarEnderecoEmpresa({
            rua: form.rua.trim(),
            numero: form.numeroEndereco.replace(/\D/g, "") || form.numeroEndereco,
            complemento: form.complemento?.trim() ?? null,
            bairro: form.bairro.trim(),
            cidade: form.cidade.trim(),
            uf: form.uf.toUpperCase(),
            cep: form.cep.replace(/\D/g, ""),
          }),
        );
      }
      const jornadaFlagsChanged =
        form.gravarGeolocalizacaoObrigatoria !== (data.gravarGeolocalizacaoObrigatoria ?? false) ||
        form.gravaPontoApenasEmGeofence !== (data.gravaPontoApenasEmGeofence ?? false) ||
        form.permitirAjustePontoDireto !== (data.permitirAjustePontoDireto ?? false) ||
        form.timezone !== (data.timezone ?? "");
      if (jornadaChanged || jornadaFlagsChanged) {
        if (
          !jornada.tipoEscalaJornadaId ||
          !jornada.cargaHorariaDiaria ||
          !jornada.cargaHorariaSemanal ||
          !jornada.entradaPadrao ||
          !jornada.saidaPadrao ||
          !jornada.tempoDescansoEntreJornada ||
          !jornada.inicioEscala
        ) {
          toast({
            variant: "destructive",
            title: "Jornada incompleta",
            description: "Preencha escala, cargas, horários e início da escala.",
          });
          throw new Error("Jornada incompleta");
        }
        tasks.push(() =>
          atualizarJornadaPadrao({
            tipoEscalaJornadaId: jornada.tipoEscalaJornadaId,
            cargaHorariaDiaria: jornada.cargaHorariaDiaria,
            cargaHorariaSemanal: jornada.cargaHorariaSemanal,
            toleranciaPadrao: jornada.toleranciaPadrao || "PT0S",
            tempoDescansoEntreJornada: jornada.tempoDescansoEntreJornada,
            entradaPadrao: toTime(jornada.entradaPadrao),
            saidaPadrao: toTime(jornada.saidaPadrao),
            inicioEscala: jornada.inicioEscala,
            diasFolga: jornada.diasFolga?.length ? jornada.diasFolga : null,
            almocoInicio: jornada.almocoInicio ? toTime(jornada.almocoInicio) : null,
            almocoFim: jornada.almocoFim ? toTime(jornada.almocoFim) : null,
            timezone: form.timezone || getBrowserTimezone(),
            gravaGeoObrigatoria: form.gravarGeolocalizacaoObrigatoria,
            gravaPontoApenasEmGeofence: form.gravaPontoApenasEmGeofence,
            permiteAjustePonto: form.permitirAjustePontoDireto,
          }),
        );
      }
      if (geofencesChanged) {
        if (form.gravaPontoApenasEmGeofence) {
          const valid = geofences.filter(
            (g) =>
              g.ativo &&
              g.descricao?.trim() &&
              typeof g.latitude === "number" &&
              typeof g.longitude === "number" &&
              g.raioMetros >= 1,
          );
          if (valid.length === 0) {
            toast({
              variant: "destructive",
              title: "Áreas de ponto necessárias",
              description:
                "Você marcou batida só nos locais da empresa. Cadastre pelo menos um local ou desmarque essa opção.",
            });
            throw new Error("Geofences inválidos");
          }
        }
        for (const id of geofencesRemovidos) {
          tasks.push(() => excluirGeofence(id));
        }
        for (const g of geofences) {
          const nome = g.descricao.trim() || "Área";
          const body = {
            nome,
            descricao: g.descricao.trim() || nome,
            latitude: g.latitude,
            longitude: g.longitude,
            raioMetros: g.raioMetros,
            ativo: g.ativo,
          };
          if (!g.id) {
            if (!g.descricao.trim() && g.latitude === 0 && g.longitude === 0) continue;
            tasks.push(() => criarGeofence(body));
          } else {
            const baseline = geofencesBaseline.find((b) => b.id === g.id);
            if (
              !baseline ||
              baseline.descricao !== g.descricao ||
              baseline.latitude !== g.latitude ||
              baseline.longitude !== g.longitude ||
              baseline.raioMetros !== g.raioMetros ||
              baseline.ativo !== g.ativo
            ) {
              tasks.push(() => atualizarGeofence(g.id!, body));
            }
          }
        }
      }
      if (tasks.length === 0) {
        toast({ title: "Nenhuma alteração detectada." });
        return;
      }
      for (const task of tasks) await task();
    },
    onSuccess: async () => {
      setGeofencesHydrated(false);
      setGeofencesRemovidos([]);
      setJornadaBaseline(jornadaSnapshot(jornada));
      invalidateUserMutation(queryClient, "perfilEmpresa");
      toast({ title: "Perfil atualizado.", description: "As alterações foram salvas." });
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { mensagem?: string } }; message?: string })?.response?.data
          ?.mensagem ?? (err as Error)?.message;
      toast({ variant: "destructive", title: "Erro ao salvar", description: msg });
    },
  });

  if (isLoading || !hydrated) {
    return <div className="py-8 text-center text-sm text-muted-foreground">Carregando...</div>;
  }

  if (!data) {
    return (
      <div className="py-8 text-center text-sm text-destructive">
        Não foi possível carregar o perfil da empresa.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Configurações</h1>
          <p className="text-sm text-muted-foreground">
            Dados cadastrais, telefone, jornada padrão, endereço e locais da empresa.
          </p>
        </div>
        <Button
          className="shrink-0"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending || !hasChanges}
        >
          {mutation.isPending ? "Salvando..." : "Salvar alterações"}
        </Button>
      </div>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Building2 className="h-5 w-5" />
            Empresa

            <Badge className="border-0 bg-red-100 px-1.5 py-0 text-[11px] font-normal text-red-900 dark:bg-red-950/50 dark:text-red-200">
              Obrigatório
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-4 px-4 py-4 sm:px-5 sm:py-5`}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <Label className="text-sm font-medium">CNPJ</Label>
              <Input
                value={data.cnpj ? formatCnpj(data.cnpj) : ""}
                disabled
                className="mt-1 h-10 bg-muted"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Razão Social</Label>
              <Input value={data.razaoSocial ?? ""} disabled className="mt-1 h-10 bg-muted" />
            </div>
            <div>
              <Label className="text-sm font-medium" required>
                Username
              </Label>
              <Input
                value={form.username}
                onChange={(e) => {
                  const next = maskUsernameInput(e.target.value);
                  setForm((p) => ({ ...p, username: next }));
                  handleChange("username", next, (v) => validateUsername(v, true));
                }}
                onBlur={() => handleBlur("username", form.username, (v) => validateUsername(v, true))}
                className="mt-1 h-10"
                aria-invalid={!!getError("username")}
              />
              <FieldExpectedStatus error={getError("username")} />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-sm font-medium" required>
                E-mail
              </Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => {
                  const next = maskEmailInput(e.target.value);
                  setForm((p) => ({ ...p, email: next }));
                  handleChange("email", next, (v) => validateEmail(v, true));
                }}
                onBlur={() => handleBlur("email", form.email, (v) => validateEmail(v, true))}
                className="mt-1 h-10"
                aria-invalid={!!getError("email")}
              />
              <FieldExpectedStatus error={getError("email")} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Phone className="h-5 w-5" />
            Telefone

            <Badge className="border-0 bg-red-100 px-1.5 py-0 text-[11px] font-normal text-red-900 dark:bg-red-950/50 dark:text-red-200">
              Obrigatório
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-4 px-4 py-4 sm:px-5 sm:py-5`}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-4">
            <div>
              <Label className="text-sm font-medium" required>
                Código País
              </Label>
              <Input
                value={form.codigoPais}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, 3);
                  setForm((p) => ({ ...p, codigoPais: v }));
                  handleChange("codigoPais", v, (x) => validateCodigoPais(x, true));
                }}
                onBlur={() => handleBlur("codigoPais", form.codigoPais, (v) => validateCodigoPais(v, true))}
                placeholder="55"
                className="mt-1 h-10"
                aria-invalid={!!getError("codigoPais")}
              />
              <FieldExpectedStatus error={getError("codigoPais")} />
            </div>
            <div>
              <Label className="text-sm font-medium" required>
                DDD
              </Label>
              <Input
                value={form.ddd}
                onChange={(e) => {
                  const next = maskDddInput(e.target.value);
                  setForm((p) => ({ ...p, ddd: next }));
                  handleChange("ddd", next, (v) => validateDdd(v, true));
                }}
                onBlur={() => handleBlur("ddd", form.ddd, (v) => validateDdd(v, true))}
                placeholder="11"
                className="mt-1 h-10"
                aria-invalid={!!getError("ddd")}
              />
              <FieldExpectedStatus error={getError("ddd")} />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-sm font-medium" required>
                Número
              </Label>
              <Input
                value={form.numero}
                onChange={(e) => {
                  const next = maskNumeroTelefoneInput(e.target.value);
                  setForm((p) => ({ ...p, numero: next }));
                  handleChange("numero", next, (v) => validateNumeroTelefone(v, true));
                }}
                onBlur={() => handleBlur("numero", form.numero, (v) => validateNumeroTelefone(v, true))}
                placeholder="98765-4321"
                className="mt-1 h-10"
                aria-invalid={!!getError("numero")}
              />
              <FieldExpectedStatus error={getError("numero")} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Clock className="h-5 w-5" />
            Jornada

            <Badge className="border-0 bg-red-100 px-1.5 py-0 text-[11px] font-normal text-red-900 dark:bg-red-950/50 dark:text-red-200">
              Obrigatório
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-3 px-4 py-4 sm:px-5 sm:py-5`}>
          <JornadaFuncionarioFields
            value={jornada}
            onChange={setJornada}
            durationDisplays={durationDisplays}
            setDurationDisplays={setDurationDisplays}
            handleChange={handleChange}
            handleBlur={handleBlur}
            getError={getError}
            mostrarAlmoco={mostrarAlmoco}
            setMostrarAlmoco={setMostrarAlmoco}
          />
        </CardContent>
      </Card>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <MapPin className="h-5 w-5" />
            Endereço

            <Badge className="border-0 bg-amber-100 px-1.5 py-0 text-[11px] font-normal text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
              Opcional
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-4 px-4 py-4 sm:px-5 sm:py-5`}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="sm:col-span-2">
              <Label className="text-sm font-medium" required>
                Rua
              </Label>
              <Input
                value={form.rua}
                onChange={(e) => {
                  const formatted = formatTitleCase(e.target.value);
                  setForm((p) => ({ ...p, rua: formatted }));
                  handleChange("rua", formatted, (v) => validateRua(v, true));
                }}
                onBlur={() => handleBlur("rua", form.rua, (v) => validateRua(v, true))}
                className="mt-1 h-10"
                aria-invalid={!!getError("rua")}
              />
              <FieldExpectedStatus error={getError("rua")} />
            </div>
            <div>
              <Label className="text-sm font-medium" required>
                Número
              </Label>
              <Input
                value={form.numeroEndereco}
                onChange={(e) => {
                  const next = maskNumeroEnderecoInput(e.target.value);
                  setForm((p) => ({ ...p, numeroEndereco: next }));
                  handleChange("numeroEndereco", next, (v) => validateNumeroEndereco(v, true));
                }}
                onBlur={() =>
                  handleBlur("numeroEndereco", form.numeroEndereco, (v) => validateNumeroEndereco(v, true))
                }
                placeholder="Ex: 100"
                className="mt-1 h-10"
                aria-invalid={!!getError("numeroEndereco")}
              />
              <FieldExpectedStatus error={getError("numeroEndereco")} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Complemento</Label>
              <Badge className="text-[11px] px-1.5 py-0 font-normal border-0 bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
                Opcional
              </Badge>
            </div>
            <Input
              value={form.complemento}
              onChange={(e) => {
                const formatted = formatTitleCase(e.target.value);
                setForm((p) => ({ ...p, complemento: formatted }));
                handleChange("complemento", formatted, validateComplemento);
              }}
              onBlur={() => handleBlur("complemento", form.complemento, validateComplemento)}
              className="mt-1 h-10"
              aria-invalid={!!getError("complemento")}
            />
            <FieldExpectedStatus error={getError("complemento")} />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <Label className="text-sm font-medium" required>
                Estado
              </Label>
              <Select
                value={form.uf || undefined}
                onValueChange={(v) => {
                  setForm((p) => ({ ...p, uf: v, cidade: "" }));
                  handleChange("uf", v, (x) => validateUf(x, true));
                  handleBlur("uf", v, (x) => validateUf(x, true));
                  handleChange("cidade", "", (x) => validateCidade(x, true));
                }}
                disabled={loadingEstados}
              >
                <SelectTrigger className="mt-1 h-10" aria-invalid={!!getError("uf")}>
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent>
                  {estados.map((e) => (
                    <SelectItem key={e.sigla} value={e.sigla}>
                      {e.nomeEstado} - {e.sigla}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldExpectedStatus error={getError("uf")} />
            </div>
            <div>
              <Label className="text-sm font-medium" required>
                Cidade
              </Label>
              <Select
                value={form.cidade || undefined}
                onValueChange={(v) => {
                  setForm((p) => ({ ...p, cidade: v }));
                  handleChange("cidade", v, (x) => validateCidade(x, true));
                  handleBlur("cidade", v, (x) => validateCidade(x, true));
                }}
                disabled={!form.uf || cidades.length === 0}
              >
                <SelectTrigger className="mt-1 h-10" aria-invalid={!!getError("cidade")}>
                  <SelectValue placeholder={form.uf ? "Selecione a cidade" : "Primeiro selecione o estado"} />
                </SelectTrigger>
                <SelectContent>
                  {cidades.map((c) => (
                    <SelectItem key={c.id_cidade} value={c.nomeCidade}>
                      {c.nomeCidade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldExpectedStatus error={getError("cidade")} />
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium" required>
              Bairro
            </Label>
            <Input
              value={form.bairro}
              onChange={(e) => {
                const formatted = formatTitleCase(e.target.value);
                setForm((p) => ({ ...p, bairro: formatted }));
                handleChange("bairro", formatted, (v) => validateBairro(v, true));
              }}
              onBlur={() => handleBlur("bairro", form.bairro, (v) => validateBairro(v, true))}
              className="mt-1 h-10"
              aria-invalid={!!getError("bairro")}
            />
            <FieldExpectedStatus error={getError("bairro")} />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <Label className="text-sm font-medium" required>
                CEP
              </Label>
              <Input
                value={form.cep}
                onChange={(e) => {
                  const next = maskCepInput(e.target.value);
                  setForm((p) => ({ ...p, cep: next }));
                  handleChange("cep", next, (v) => validateCep(v, true));
                }}
                onBlur={() => handleBlur("cep", form.cep, (v) => validateCep(v, true))}
                placeholder="00000-000"
                className="mt-1 h-10"
                aria-invalid={!!getError("cep")}
              />
              <FieldExpectedStatus error={getError("cep")} />
            </div>
            <div>
              <Label className="text-sm font-medium" required>
                Timezone
              </Label>
              <Input
                value={form.timezone}
                onChange={(e) => {
                  setForm((p) => ({ ...p, timezone: e.target.value }));
                  handleChange("timezone", e.target.value, (v) => validateTimezone(v, true));
                }}
                onBlur={() => handleBlur("timezone", form.timezone, (v) => validateTimezone(v, true))}
                className="mt-1 h-10"
                aria-invalid={!!getError("timezone")}
              />
              <FieldExpectedStatus error={getError("timezone")} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <MapPin className="h-5 w-5" />
            Locais

            <Badge className="border-0 bg-amber-100 px-1.5 py-0 text-[11px] font-normal text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
              Opcional
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-5 px-4 py-4 sm:px-5 sm:py-5`}>
          <div className="flex items-start gap-2 rounded-md border border-border bg-muted/30 p-3.5">
            <Checkbox
              id="grava-geo"
              className="mt-0.5"
              checked={form.gravarGeolocalizacaoObrigatoria}
              onCheckedChange={(c) => setForm((p) => ({ ...p, gravarGeolocalizacaoObrigatoria: !!c }))}
            />
            <div>
              <Label htmlFor="grava-geo" className="cursor-pointer text-sm font-medium leading-snug">
                Salvar localização em toda batida
              </Label>
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                A cada batida, grava a localização do dispositivo.
              </p>
              <p className="mt-1.5 text-xs leading-snug text-muted-foreground">
                Isso só registra onde a batida foi feita — é diferente de exigir que o colaborador esteja em um
                local permitido (opção abaixo).
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
              checked={form.gravaPontoApenasEmGeofence}
              disabled={geofences.length === 0}
              onCheckedChange={(c) => setForm((p) => ({ ...p, gravaPontoApenasEmGeofence: !!c }))}
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
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                Só permite ponto nos locais cadastrados pela empresa.
              </p>
              {geofences.length === 0 && (
                <p className="mt-1 text-xs leading-snug text-muted-foreground">
                  Cadastre pelo menos uma área abaixo para liberar.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3.5 rounded-lg border border-border bg-muted/20 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <h3 className="font-display text-base font-semibold">Áreas no mapa</h3>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addGeofence}
                className="h-9 shrink-0 gap-1.5"
              >
                <Plus className="h-4 w-4" />
                Adicionar área
              </Button>
            </div>
            <p className="text-xs leading-snug text-muted-foreground">Sede ou filiais.</p>
            {geofences.length === 0 ? (
              <p className="rounded-md border border-dashed border-border bg-muted/20 px-3 py-4 text-center text-xs leading-snug text-muted-foreground">
                Nenhuma área ainda.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {geofences.map((g, i) => (
                  <div key={g.key} className="space-y-2 rounded-lg border border-border bg-card p-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-medium">Área {i + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeGeofence(i)}
                        aria-label="Remover área"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={g.ativo}
                        onCheckedChange={(c) => updateGeofence(i, "ativo", !!c)}
                      />
                      <Label className="cursor-pointer text-sm font-normal">
                        {g.ativo ? "Ativa" : "Desligada"}
                      </Label>
                    </div>
                    <div className={cn("space-y-2", !g.ativo && "pointer-events-none opacity-60")}>
                      <div className="grid gap-1">
                        <Label required className="text-sm">
                          Nome do local
                        </Label>
                        <Input
                          className={inp}
                          value={g.descricao}
                          onChange={(e) => updateGeofence(i, "descricao", e.target.value)}
                          placeholder="Ex.: Sede"
                          disabled={!g.ativo}
                        />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Label required className="text-sm">
                          Coordenadas
                        </Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="inline-flex rounded p-0.5 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              aria-label="Ajuda sobre localização"
                            >
                              <HelpCircle className="h-3.5 w-3.5" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="z-[100] max-w-[260px]" sideOffset={8}>
                            Quando o navegador pedir permissão, escolha Permitir para preencher o mapa
                            automaticamente.
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
                            onChange={(e) =>
                              updateGeofence(i, "latitude", parseFloat(e.target.value) || 0)
                            }
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
                            onChange={(e) =>
                              updateGeofence(i, "longitude", parseFloat(e.target.value) || 0)
                            }
                            placeholder="-46.6333"
                            disabled={!g.ativo}
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-full gap-1.5 text-xs"
                        onClick={() => puxarLocal(i)}
                        disabled={buscandoLocal === i || !g.ativo}
                      >
                        <Locate className="h-3.5 w-3.5 shrink-0 text-green-600" />
                        {buscandoLocal === i ? "Obtendo…" : "Usar minha localização"}
                      </Button>
                      <div className="grid max-w-[100px] gap-1">
                        <Label className="text-sm">Raio (m)</Label>
                        <Input
                          className={inp}
                          type="number"
                          min={1}
                          max={5000}
                          value={g.raioMetros || ""}
                          onChange={(e) =>
                            updateGeofence(i, "raioMetros", parseInt(e.target.value, 10) || 100)
                          }
                          disabled={!g.ativo}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <ShieldCheck className="h-5 w-5" />
            Compliance

            <Badge className="border-0 bg-amber-100 px-1.5 py-0 text-[11px] font-normal text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
              Opcional
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-4 px-4 py-4 sm:px-5 sm:py-5`}>
          <div className="flex items-center gap-2">
            <Checkbox checked={data.controlePontoObrigatorio ?? false} disabled />
            <Label className="text-sm font-medium">Controle de Ponto Obrigatório</Label>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <Label className="text-sm font-medium">Tipo de Modelo de Ponto</Label>
              <Input value={data.tipoModeloPonto ?? ""} disabled className="mt-1 h-10 bg-muted" />
            </div>
            <div>
              <Label className="text-sm font-medium">Tempo de Retenção (anos)</Label>
              <Input type="number" value={data.tempoRetencao ?? ""} disabled className="mt-1 h-10 bg-muted" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox checked={data.auditoriaAtiva ?? false} disabled />
              <Label className="text-sm font-medium">Auditoria Ativa</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={data.assinaturaDigitalObrigatoria ?? false} disabled />
              <Label className="text-sm font-medium">Assinatura Digital Obrigatória</Label>
            </div>
            </div>
          </CardContent>
        </Card>

      <div className="flex justify-end border-t border-border pt-4">
        <Button onClick={() => mutation.mutate()} disabled={mutation.isPending || !hasChanges}>
          {mutation.isPending ? "Salvando..." : "Salvar alterações"}
        </Button>
      </div>
    </div>
  );
}

export default PerfilEmpresaPage;
