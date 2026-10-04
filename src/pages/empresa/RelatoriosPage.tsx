import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { BarChart3, Download, FileSpreadsheet, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  downloadRelatorioPontoDetalhado,
  downloadRelatorioPontoResumo,
  type FormatoRelatorio,
} from "@/lib/api-empresa";
import { MESES_BH } from "@/lib/banco-horas-ui";
import { LIST_CARD, LIST_CARD_CONTENT_FLUSH, LIST_CARD_HEADER } from "@/lib/list-card-layout";
import { cn } from "@/lib/utils";

export default function RelatoriosPage() {
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();
  const [ano, setAno] = useState(currentYear);
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [formato, setFormato] = useState<FormatoRelatorio>("PDF");

  function applyDownload(
    blob: Blob,
    nomeBase: string,
    formatoVal: FormatoRelatorio,
    anoVal: number,
    mesVal: number
  ) {
    const ext = formatoVal === "PDF" ? "pdf" : "xlsx";
    const filename = `${nomeBase}-${anoVal}-${String(mesVal).padStart(2, "0")}.${ext}`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  const detalhadoMutation = useMutation({
    mutationFn: () => downloadRelatorioPontoDetalhado(ano, mes, formato),
    onSuccess: (blob) => {
      applyDownload(blob, "ponto-detalhado", formato, ano, mes);
      toast({ title: "Download iniciado", description: "Relatório detalhado" });
    },
    onError: (err: unknown) => {
      const e = err as { response?: { data?: { mensagem?: string } } };
      toast({
        variant: "destructive",
        title: "Erro ao gerar relatório",
        description: e.response?.data?.mensagem ?? "Tente novamente.",
      });
    },
  });

  const resumoMutation = useMutation({
    mutationFn: () => downloadRelatorioPontoResumo(ano, mes, formato),
    onSuccess: (blob) => {
      applyDownload(blob, "ponto-resumo", formato, ano, mes);
      toast({ title: "Download iniciado", description: "Relatório resumo" });
    },
    onError: (err: unknown) => {
      const e = err as { response?: { data?: { mensagem?: string } } };
      toast({
        variant: "destructive",
        title: "Erro ao gerar relatório",
        description: e.response?.data?.mensagem ?? "Tente novamente.",
      });
    },
  });

  const pending = detalhadoMutation.isPending || resumoMutation.isPending;

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <BarChart3 className="h-5 w-5 text-primary" />
        <div>
          <h1 className="font-display text-xl font-semibold">Relatórios</h1>
          <p className="text-sm text-muted-foreground">
            Ponto detalhado e resumo por período, em PDF ou Excel.
          </p>
        </div>
      </div>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="text-base">Gerar relatório</CardTitle>
          <div
            className="mt-3 flex flex-wrap items-end justify-between gap-3"
            role="group"
            aria-label="Parâmetros"
          >
            <div className="flex flex-wrap gap-3">
              <div className="grid gap-1.5">
                <Label className="text-xs text-muted-foreground">Ano</Label>
                <Select value={String(ano)} onValueChange={(v) => setAno(parseInt(v, 10))}>
                  <SelectTrigger className="h-9 w-[7.5rem]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[currentYear, currentYear - 1, currentYear - 2].map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs text-muted-foreground">Mês</Label>
                <Select value={String(mes)} onValueChange={(v) => setMes(parseInt(v, 10))}>
                  <SelectTrigger className="h-9 w-[9.5rem]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MESES_BH.map((label, i) => (
                      <SelectItem key={label} value={String(i + 1)}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs text-muted-foreground">Formato</Label>
                <Select
                  value={formato}
                  onValueChange={(v) => setFormato(v as FormatoRelatorio)}
                >
                  <SelectTrigger className="h-9 w-[7.5rem]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="EXCEL">Excel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {MESES_BH[mes - 1]}/{ano} · {formato === "PDF" ? "PDF" : "Excel"}
            </p>
          </div>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-0`}>
          <ul className="divide-y divide-border/60">
            <li className="flex flex-wrap items-center gap-3 px-4 py-4 sm:px-5">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40"
                )}
              >
                <FileText className="h-5 w-5 text-foreground/80" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Ponto resumo</p>
                <p className="text-xs text-muted-foreground">
                  Totais do período por funcionário (horas, banco e status).
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                disabled={pending}
                onClick={() => resumoMutation.mutate()}
              >
                {resumoMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                {resumoMutation.isPending ? "Gerando…" : "Baixar"}
              </Button>
            </li>
            <li className="flex flex-wrap items-center gap-3 px-4 py-4 sm:px-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40">
                <FileSpreadsheet className="h-5 w-5 text-foreground/80" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Ponto detalhado</p>
                <p className="text-xs text-muted-foreground">
                  Batidas dia a dia, extras, faltas e ocorrências.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                disabled={pending}
                onClick={() => detalhadoMutation.mutate()}
              >
                {detalhadoMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                {detalhadoMutation.isPending ? "Gerando…" : "Baixar"}
              </Button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
