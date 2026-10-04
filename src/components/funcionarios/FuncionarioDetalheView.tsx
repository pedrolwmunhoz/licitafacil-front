import { useQuery } from "@tanstack/react-query";
import { CACHE_MEDIUM, CACHE_LONG, queryKeys } from "@/lib/query-cache-policy";
import { ChevronLeft, Pencil } from "lucide-react";
import { getPerfilFuncionario, listarGeofences } from "@/lib/api-empresa";
import { durationToHHmm } from "@/lib/duration";
import { formatCpf, formatTelefoneNumero } from "@/lib/format";
import { LIST_CARD, LIST_CARD_CONTENT_FLUSH, LIST_CARD_HEADER } from "@/lib/list-card-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tipoContratoFromId, tipoEscalaJornadaFromId } from "@/types/empresa";
import { cn } from "@/lib/utils";

type Props = {
  funcionarioId: string;
  nomeLista: string;
  onBack: () => void;
  onEditar: () => void;
};

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border/50 py-2.5 last:border-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <dt className="text-xs text-muted-foreground sm:text-sm">{label}</dt>
      <dd className="text-sm font-medium text-foreground sm:text-right">{value ?? "—"}</dd>
    </div>
  );
}

export function FuncionarioDetalheView({ funcionarioId, nomeLista, onBack, onEditar }: Props) {
  const { data: perfil, isLoading } = useQuery({
    queryKey: queryKeys.empresa.funcionarioPerfil(funcionarioId),
    queryFn: () => getPerfilFuncionario(funcionarioId),
    ...CACHE_MEDIUM,
  });

  const { data: geofencesData } = useQuery({
    queryKey: queryKeys.empresa.geofences("all"),
    queryFn: () => listarGeofences({ page: 0, size: 500 }),
    enabled: !!perfil,
    ...CACHE_LONG,
  });

  const nome =
    perfil?.nomeCompleto?.trim() ||
    [perfil?.primeiroNome, perfil?.ultimoNome].filter(Boolean).join(" ").trim() ||
    nomeLista ||
    "—";
  const contrato = perfil?.contratoFuncionario;
  const jornada = perfil?.jornadaFuncionarioConfig;
  const tel = perfil?.usuarioTelefone;
  const ativo = perfil?.funcionarioAtivo !== false && contrato?.ativo !== false;
  const escalaLabel = jornada?.tipoEscalaJornadaId
    ? tipoEscalaJornadaFromId(jornada.tipoEscalaJornadaId) ?? `Escala #${jornada.tipoEscalaJornadaId}`
    : "—";
  const geofenceIds = perfil?.geofenceIds ?? [];
  const areasVinculadas = (geofencesData?.conteudo ?? []).filter((g) => geofenceIds.includes(g.id));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button type="button" variant="ghost" size="sm" className="-ml-2" onClick={onBack}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Funcionários
        </Button>
        <Button type="button" size="sm" className="gap-1.5" onClick={onEditar}>
          <Pencil className="h-4 w-4" /> Editar
        </Button>
      </div>

      <div>
        <h1 className="font-display text-xl font-semibold">{nome}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {[contrato?.cargo, contrato?.departamento].filter(Boolean).join(" · ") || "Sem cargo/departamento"}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
          {contrato?.matricula && (
            <span className="text-muted-foreground">
              Matrícula <span className="font-medium text-foreground">{contrato.matricula}</span>
            </span>
          )}
          <span
            className={cn(
              "inline-flex items-center gap-1.5 font-medium",
              ativo ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground"
            )}
          >
            <span className={cn("h-2 w-2 rounded-full", ativo ? "bg-emerald-500" : "bg-muted-foreground")} />
            {ativo ? "Ativo" : "Inativo"}
          </span>
        </div>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Carregando perfil…</p>}

      {!isLoading && perfil && (
        <Tabs defaultValue="dados" className="w-full">
          <TabsList className="h-auto w-full flex-wrap justify-start gap-1">
            <TabsTrigger value="dados">Dados pessoais</TabsTrigger>
            <TabsTrigger value="contrato">Contrato</TabsTrigger>
            <TabsTrigger value="jornada">Jornada</TabsTrigger>
            <TabsTrigger value="area">Área de ponto</TabsTrigger>
          </TabsList>

          <TabsContent value="dados" className="mt-3">
            <Card className={LIST_CARD}>
              <CardHeader className={LIST_CARD_HEADER}>
                <CardTitle className="text-base">Dados pessoais</CardTitle>
              </CardHeader>
              <CardContent className={`${LIST_CARD_CONTENT_FLUSH} px-4 pb-4 sm:px-5`}>
                <dl>
                  <Row label="Nome completo" value={nome} />
                  <Row label="CPF" value={perfil.cpf ? formatCpf(perfil.cpf) : "—"} />
                  <Row label="Data de nascimento" value={perfil.dataNascimento ?? "—"} />
                  <Row label="E-mail" value={perfil.email ?? "—"} />
                  <Row
                    label="Telefone"
                    value={
                      tel
                        ? `+${tel.codigoPais} (${tel.ddd}) ${formatTelefoneNumero(tel.numero)}`
                        : "—"
                    }
                  />
                  <Row label="Usuário" value={perfil.username ?? "—"} />
                </dl>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contrato" className="mt-3">
            <Card className={LIST_CARD}>
              <CardHeader className={LIST_CARD_HEADER}>
                <CardTitle className="text-base">Contrato</CardTitle>
              </CardHeader>
              <CardContent className={`${LIST_CARD_CONTENT_FLUSH} px-4 pb-4 sm:px-5`}>
                {!contrato && (
                  <p className="py-4 text-sm text-muted-foreground">Sem contrato cadastrado.</p>
                )}
                {contrato && (
                  <dl>
                    <Row label="Matrícula" value={contrato.matricula ?? "—"} />
                    <Row label="Cargo" value={contrato.cargo || "—"} />
                    <Row label="Departamento" value={contrato.departamento ?? "—"} />
                    <Row label="Data de admissão" value={contrato.dataAdmissao || "—"} />
                    <Row
                      label="Tipo de contrato"
                      value={tipoContratoFromId(contrato.tipoContratoId) ?? `#${contrato.tipoContratoId}`}
                    />
                    <Row label="PIS/PASEP" value={contrato.pisPasep ?? "—"} />
                    <Row label="Status" value={contrato.ativo ? "Ativo" : "Inativo"} />
                  </dl>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jornada" className="mt-3">
            <Card className={LIST_CARD}>
              <CardHeader className={LIST_CARD_HEADER}>
                <CardTitle className="text-base">Jornada</CardTitle>
              </CardHeader>
              <CardContent className={`${LIST_CARD_CONTENT_FLUSH} px-4 pb-4 sm:px-5`}>
                {!jornada && (
                  <p className="py-4 text-sm text-muted-foreground">
                    Usa a jornada padrão da empresa (sem override).
                  </p>
                )}
                {jornada && (
                  <dl>
                    <Row label="Escala" value={escalaLabel} />
                    <Row
                      label="Horário"
                      value={`${jornada.entradaPadrao?.slice(0, 5) ?? "—"} — ${jornada.saidaPadrao?.slice(0, 5) ?? "—"}`}
                    />
                    <Row
                      label="Intervalo"
                      value={durationToHHmm(jornada.intervaloPadrao) || "—"}
                    />
                    <Row
                      label="Carga diária"
                      value={durationToHHmm(jornada.cargaHorariaDiaria) || "—"}
                    />
                    <Row
                      label="Carga semanal"
                      value={durationToHHmm(jornada.cargaHorariaSemanal) || "—"}
                    />
                    <Row
                      label="Tolerância"
                      value={durationToHHmm(jornada.toleranciaPadrao ?? "PT0S") || "00:00"}
                    />
                    <Row
                      label="Descanso entre jornadas"
                      value={durationToHHmm(jornada.tempoDescansoEntreJornada ?? "PT11H") || "—"}
                    />
                    <Row
                      label="Geo obrigatória"
                      value={jornada.gravaGeoObrigatoria ? "Sim" : "Não"}
                    />
                  </dl>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="area" className="mt-3">
            <Card className={LIST_CARD}>
              <CardHeader className={LIST_CARD_HEADER}>
                <CardTitle className="text-base">Área de ponto</CardTitle>
              </CardHeader>
              <CardContent className={`${LIST_CARD_CONTENT_FLUSH} px-4 pb-4 sm:px-5`}>
                {geofenceIds.length === 0 ? (
                  <p className="py-4 text-sm text-muted-foreground">
                    Nenhuma área de ponto vinculada.
                  </p>
                ) : areasVinculadas.length === 0 ? (
                  <p className="py-4 text-sm text-muted-foreground">
                    {geofenceIds.length} área(s) vinculada(s), mas não foi possível carregar os nomes.
                  </p>
                ) : (
                  <ul className="divide-y divide-border/50">
                    {areasVinculadas.map((g) => (
                      <li key={g.id} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                        <span className="text-sm font-medium text-foreground">{g.nome}</span>
                        <span className="text-xs text-muted-foreground sm:text-right">
                          {[g.coordenadas, g.raio != null ? `raio ${g.raio} m` : null]
                            .filter(Boolean)
                            .join(" · ") || "—"}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
