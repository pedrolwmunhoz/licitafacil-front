import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LIST_CARD, LIST_CARD_CONTENT_FLUSH, LIST_CARD_HEADER } from "@/lib/list-card-layout";
import { useToast } from "@/hooks/use-toast";
import { CACHE_LONG, queryKeys } from "@/lib/query-cache-policy";
import { getPerfilFuncionario } from "@/lib/api-funcionario";
import { formatCpf } from "@/lib/format";
import { durationToHHmm } from "@/lib/duration";
import { TIPO_CONTRATO_OPCOES, TIPO_ESCALA_JORNADA_OPCOES } from "@/types/empresa";

export default function PerfilFuncionarioPage() {
  const { toast } = useToast();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.funcionario.perfil(),
    queryFn: getPerfilFuncionario,
    ...CACHE_LONG,
  });

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

  if (isLoading) {
    return <div className="py-8 text-center text-sm text-muted-foreground">Carregando...</div>;
  }

  if (isError || !data) {
    return (
      <div className="py-8 text-center text-sm text-destructive">
        {(error as { response?: { data?: { mensagem?: string } }; message?: string })?.response?.data
          ?.mensagem ??
          (error as Error)?.message ??
          "Erro ao carregar perfil."}
      </div>
    );
  }

  const contrato = data.contratoFuncionario;
  const jornada = data.jornadaFuncionarioConfig;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Configurações</h1>
        <p className="text-sm text-muted-foreground">
          Seus dados cadastrais, contrato e jornada. Para alterações, fale com o RH ou a empresa.
        </p>
      </div>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <User className="h-5 w-5" />
            Dados pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-4 px-4 py-4 sm:px-5 sm:py-5`}>
          <div className="flex items-center gap-2">
            <Checkbox checked={data.funcionarioAtivo ?? false} disabled />
            <Label className="text-sm font-medium">Funcionário Ativo</Label>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <Label className="text-sm font-medium">Nome Completo</Label>
              <Input value={data.nomeCompleto ?? ""} disabled className="mt-1 h-10 bg-muted" />
            </div>
            <div>
              <Label className="text-sm font-medium">Username</Label>
              <Input value={data.username ?? ""} disabled className="mt-1 h-10 bg-muted" />
            </div>
            <div>
              <Label className="text-sm font-medium">CPF</Label>
              <Input
                value={data.cpf ? formatCpf(data.cpf) : ""}
                disabled
                className="mt-1 h-10 bg-muted"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Data Nascimento</Label>
              <Input
                type="date"
                value={data.dataNascimento ?? ""}
                disabled
                className="mt-1 h-10 bg-muted"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Matrícula</Label>
              <Input value={data.matricula ?? ""} disabled className="mt-1 h-10 bg-muted" />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-sm font-medium">E-mail</Label>
              <Input type="email" value={data.email ?? ""} disabled className="mt-1 h-10 bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="text-base font-semibold">Telefone</CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} px-4 py-4 sm:px-5 sm:py-5`}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-4">
            <div>
              <Label className="text-sm font-medium">Código País</Label>
              <Input
                value={data.usuarioTelefone?.codigoPais ?? ""}
                disabled
                className="mt-1 h-10 bg-muted"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">DDD</Label>
              <Input value={data.usuarioTelefone?.ddd ?? ""} disabled className="mt-1 h-10 bg-muted" />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-sm font-medium">Número</Label>
              <Input
                value={data.usuarioTelefone?.numero ?? ""}
                disabled
                className="mt-1 h-10 bg-muted"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="text-base font-semibold">Contrato</CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} px-4 py-4 sm:px-5 sm:py-5`}>
          {contrato ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox checked={contrato.ativo} disabled />
                <Label className="text-sm font-medium">Contrato Ativo</Label>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div>
                  <Label className="text-sm font-medium">Cargo</Label>
                  <Input value={contrato.cargo ?? ""} disabled className="mt-1 h-10 bg-muted" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Departamento</Label>
                  <Input value={contrato.departamento ?? ""} disabled className="mt-1 h-10 bg-muted" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Tipo de Contrato</Label>
                  <Input
                    value={
                      TIPO_CONTRATO_OPCOES.find((o) => o.id === contrato.tipoContratoId)?.descricao ??
                      "—"
                    }
                    disabled
                    className="mt-1 h-10 bg-muted"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Data de Admissão</Label>
                  <Input
                    type="date"
                    value={contrato.dataAdmissao ?? ""}
                    disabled
                    className="mt-1 h-10 bg-muted"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Data de Demissão</Label>
                  <Input
                    type="date"
                    value={contrato.dataDemissao ?? ""}
                    disabled
                    className="mt-1 h-10 bg-muted"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    {contrato.salarioHora != null && Number(contrato.salarioHora) > 0 && !(contrato.salarioMensal != null && Number(contrato.salarioMensal) > 0)
                      ? "Salário hora"
                      : "Salário mensal"}
                  </Label>
                  <Input
                    value={
                      contrato.salarioHora != null && Number(contrato.salarioHora) > 0 && !(contrato.salarioMensal != null && Number(contrato.salarioMensal) > 0)
                        ? `R$ ${contrato.salarioHora.toLocaleString("pt-BR")}`
                        : contrato.salarioMensal != null
                          ? `R$ ${contrato.salarioMensal.toLocaleString("pt-BR")}`
                          : ""
                    }
                    disabled
                    className="mt-1 h-10 bg-muted"
                  />
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Contrato não informado.</p>
          )}
        </CardContent>
      </Card>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="text-base font-semibold">Jornada</CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} px-4 py-4 sm:px-5 sm:py-5`}>
          {jornada ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div>
                <Label className="text-sm font-medium">Tipo de Escala</Label>
                <Input
                  value={
                    TIPO_ESCALA_JORNADA_OPCOES.find((o) => o.id === jornada.tipoEscalaJornadaId)
                      ?.descricao ?? "—"
                  }
                  disabled
                  className="mt-1 h-10 bg-muted"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Carga Horária Diária</Label>
                <Input
                  value={durationToHHmm(jornada.cargaHorariaDiaria ?? "")}
                  disabled
                  className="mt-1 h-10 bg-muted"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Carga Horária Semanal</Label>
                <Input
                  value={durationToHHmm(jornada.cargaHorariaSemanal ?? "")}
                  disabled
                  className="mt-1 h-10 bg-muted"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Entrada Padrão</Label>
                <Input value={jornada.entradaPadrao ?? ""} disabled className="mt-1 h-10 bg-muted" />
              </div>
              <div>
                <Label className="text-sm font-medium">Saída Padrão</Label>
                <Input value={jornada.saidaPadrao ?? ""} disabled className="mt-1 h-10 bg-muted" />
              </div>
              <div>
                <Label className="text-sm font-medium">Intervalo Padrão</Label>
                <Input
                  value={durationToHHmm(jornada.intervaloPadrao ?? "")}
                  disabled
                  className="mt-1 h-10 bg-muted"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Tolerância</Label>
                <Input
                  value={durationToHHmm(jornada.toleranciaPadrao ?? "PT0S")}
                  disabled
                  className="mt-1 h-10 bg-muted"
                />
              </div>
              <div className="flex items-center gap-2 sm:self-end sm:pb-2">
                <Checkbox checked={jornada.gravaGeoObrigatoria} disabled />
                <Label className="text-sm font-medium">Gravar Geolocalização Obrigatória</Label>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Jornada não configurada.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
