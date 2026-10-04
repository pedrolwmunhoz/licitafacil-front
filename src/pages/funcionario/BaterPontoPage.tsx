import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from "@/lib/pagination-constants";
import { registrarPontoApp, listarMeuPonto } from "@/lib/api-funcionario";
import { formatHora, formatInstantInTimezone, getBrowserTimezone } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { CACHE_LIVE, queryKeys, invalidateUserMutation } from "@/lib/query-cache-policy";

export default function BaterPontoPage() {
  const [now, setNow] = useState(new Date());
  const [pageBatidas, setPageBatidas] = useState(0);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { usuarioId: funcionarioId } = useAuth();
  const zoneDevice = getBrowserTimezone();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const ano = now.getFullYear();
  const mes = now.getMonth() + 1;

  const { data: pontoData } = useQuery({
    queryKey: queryKeys.funcionario.ponto(funcionarioId!, ano, mes),
    queryFn: () => listarMeuPonto(funcionarioId!, ano, mes, 0, 100),
    enabled: !!funcionarioId,
    ...CACHE_LIVE,
  });

  const registrarMutation = useMutation({
    mutationFn: async ({ idempotencyKey }: { idempotencyKey: string }) => {
      const body: {
        timezone: string;
        registroMetadados?: { geoLatitude: number; geoLongitude: number };
      } = { timezone: getBrowserTimezone() };
      if (typeof navigator !== "undefined" && navigator.geolocation) {
        try {
          const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 0,
            });
          });
          body.registroMetadados = {
            geoLatitude: pos.coords.latitude,
            geoLongitude: pos.coords.longitude,
          };
        } catch {
          /* sem GPS: backend recusa se geo/geofence obrigatórios */
        }
      }
      return registrarPontoApp(idempotencyKey, body);
    },
    onSuccess: () => {
      invalidateUserMutation(queryClient, "pontoFuncionario");
      toast({ title: "Ponto registrado", description: "Batida registrada com sucesso." });
    },
    onError: (err: AxiosError<{ mensagem?: string }>) => {
      toast({
        variant: "destructive",
        title: "Erro ao registrar",
        description: err.response?.data?.mensagem ?? "Tente novamente.",
      });
    },
  });

  const zoneEmpresa = zoneDevice;
  const optsSóData: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const hojeDataFmt = now.toLocaleDateString("pt-BR", { ...optsSóData, timeZone: zoneDevice });
  const mesmoDiaEmpresa = (localDt: string) => {
    const m = String(localDt).match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return false;
    const d = `${m[3]}/${m[2]}/${m[1]}`;
    return d === hojeDataFmt;
  };
  const jornadas = pontoData?.jornadas ?? [];
  const jornadaHoje = jornadas.find((j) =>
    (j.marcacoes ?? []).some((m) => mesmoDiaEmpresa(String(m.horario)))
  );
  const DIA_SEMANA_LABEL: Record<string, string> = {
    SEG: "Segunda-feira",
    TER: "Terça-feira",
    QUA: "Quarta-feira",
    QUI: "Quinta-feira",
    SEX: "Sexta-feira",
    SAB: "Sábado",
    DOM: "Domingo",
  };
  const diaSemanaHoje =
    (jornadaHoje?.diaSemana && DIA_SEMANA_LABEL[jornadaHoje.diaSemana]) ||
    now.toLocaleDateString("pt-BR", { weekday: "long" }).replace(/^\w/, (c) => c.toUpperCase());
  const batidasHoje = jornadas
    .flatMap((j) => j.marcacoes ?? [])
    .filter((m) => mesmoDiaEmpresa(String(m.horario)))
    .sort((a, b) => String(b.horario).localeCompare(String(a.horario)));

  const totalPaginas = Math.max(1, Math.ceil(batidasHoje.length / size));
  const batidasExibidas =
    batidasHoje.length > size
      ? batidasHoje.slice(pageBatidas * size, pageBatidas * size + size)
      : batidasHoje;

  return (
    <div className="flex flex-col items-center gap-8 pt-8">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">Bater Ponto</h1>
        <p className="text-sm text-muted-foreground">Registre sua entrada ou saída</p>
      </div>

      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle className="font-display text-5xl tabular-nums text-foreground">
            {now.toLocaleTimeString("pt-BR", { timeZone: zoneEmpresa })}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {now.toLocaleDateString("pt-BR", {
              timeZone: zoneEmpresa,
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </CardHeader>
        <CardContent>
          <Button
            size="lg"
            className="h-16 w-full gap-3 text-lg"
            onClick={() => registrarMutation.mutate({ idempotencyKey: crypto.randomUUID() })}
            disabled={registrarMutation.isPending}
          >
            <Clock className="h-6 w-6" /> {registrarMutation.isPending ? "Registrando..." : "Bater Ponto"}
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">Batidas de Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          {batidasHoje.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma batida registrada ainda.</p>
          ) : (
            <>
              <div className="max-h-[50vh] overflow-y-auto overflow-x-auto rounded-md border">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 z-10 bg-muted/50">
                    <tr className="border-b bg-muted/50">
                      <th className="px-2 py-1.5 text-left font-medium text-muted-foreground">Data</th>
                      <th className="px-2 py-1.5 text-left font-medium text-muted-foreground">Dia</th>
                      <th className="px-2 py-1.5 text-left font-medium text-muted-foreground">Horário</th>
                      <th className="px-2 py-1.5 text-left font-medium text-muted-foreground">Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batidasExibidas.map((r) => (
                      <tr key={r.registroId} className="border-b last:border-0 font-mono">
                        <td className="px-2 py-1.5">
                          {formatInstantInTimezone(String(r.horario), optsSóData, zoneEmpresa)}
                        </td>
                        <td className="px-2 py-1.5 text-muted-foreground">
                          {formatInstantInTimezone(String(r.horario), { weekday: "long" }, zoneEmpresa).replace(
                            /^\w/,
                            (c) => c.toUpperCase()
                          )}
                        </td>
                        <td className="px-2 py-1.5">
                          {typeof r.horario === "string" ? formatHora(r.horario, zoneEmpresa, true) : String(r.horario)}
                        </td>
                        <td className="px-2 py-1.5 text-muted-foreground">{r.tipo ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {(totalPaginas > 1 || batidasHoje.length > 0) && (
                <div className="mt-2 sm:mt-4 flex flex-col items-center gap-2">
                  <div className="flex justify-center scale-90 sm:scale-100 origin-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (pageBatidas > 0) setPageBatidas(pageBatidas - 1);
                            }}
                            className={pageBatidas === 0 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (pageBatidas < totalPaginas - 1) setPageBatidas(pageBatidas + 1);
                            }}
                            className={pageBatidas >= totalPaginas - 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Página {pageBatidas + 1} de {totalPaginas}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Por página</span>
                      <Select value={String(size)} onValueChange={(v) => { setSize(Number(v)); setPageBatidas(0); }}>
                        <SelectTrigger className="w-[72px] h-8 sm:w-[85px] sm:h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PAGE_SIZE_OPTIONS.map((n) => (
                            <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
