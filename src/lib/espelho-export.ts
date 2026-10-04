import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  MESES_BH,
  formatHhmmPlain,
  formatMinutesAsSaldo,
  parseHhmmToMinutes,
} from "@/lib/banco-horas-ui";
import {
  dataIsoFromHorario,
  dataSobreBatida,
  formatDataCurtaIso,
  jornadaAtravessaOutroDia,
} from "@/lib/espelho-ui";
import { formatHora } from "@/lib/utils";
import type { PontoDiaResponse } from "@/types/empresa";

const SLOT_LABELS_BASE = ["Entrada", "Saída int.", "Retorno", "Saída"] as const;
const DOC_WIDTH_PX = 1100;

export function slotLabelEspelho(i: number): string {
  if (i < SLOT_LABELS_BASE.length) return SLOT_LABELS_BASE[i]!;
  const extra = i - SLOT_LABELS_BASE.length;
  const n = Math.floor(extra / 2) + 2;
  return extra % 2 === 0 ? `Entrada ${n}` : `Saída ${n}`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatEnderecoEmpresa(e: {
  rua?: string;
  numeroEndereco?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
}): string | null {
  const linha1 = [e.rua, e.numeroEndereco].filter(Boolean).join(", ");
  const linha2 = [e.bairro, e.cidade && e.uf ? `${e.cidade}/${e.uf}` : e.cidade || e.uf]
    .filter(Boolean)
    .join(" · ");
  const partes = [linha1, e.complemento, linha2, e.cep ? `CEP ${e.cep}` : null].filter(Boolean);
  return partes.length ? partes.join(" — ") : null;
}

export type EspelhoDocumentoEmpresa = {
  razaoSocial?: string | null;
  cnpj?: string | null;
  email?: string | null;
  rua?: string;
  numeroEndereco?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
};

export type EspelhoDocumentoFuncionario = {
  nome: string;
  cpf?: string | null;
  matricula?: string | null;
  email?: string | null;
};

export type EspelhoDocumentoResumo = {
  dias: number;
  totalEsperado: string;
  totalTrabalhado: string;
  ocorrencias: number;
};

export type ExportarEspelhoPdfArgs = {
  empresa: EspelhoDocumentoEmpresa;
  funcionario: EspelhoDocumentoFuncionario;
  ano: number;
  mes: number;
  jornadaLabel: string;
  jornadas: PontoDiaResponse[];
  slotCount: number;
  resumo: EspelhoDocumentoResumo;
  /** Nome do arquivo sem extensão */
  fileName?: string;
};

export type ExportarComprovanteJornadaPdfArgs = {
  empresa: EspelhoDocumentoEmpresa;
  funcionario: EspelhoDocumentoFuncionario;
  jornada: PontoDiaResponse;
  jornadaLabel?: string;
  fileName?: string;
  /**
   * Chamado com o PDF antes de salvar (ex.: assinar hash).
   * Pode mutar o doc (ex.: adicionar página de assinatura).
   */
  beforeSave?: (doc: jsPDF) => Promise<void>;
};

export type AssinaturaDigitalPdf = {
  assinaturaDigital: string;
  certificadoSerial: string;
  timestampAssinatura: string;
};

const DOC_CSS = `
  .espelho-doc {
    --fg: #0f172a;
    --muted: #64748b;
    --border: #e2e8f0;
    --border-soft: #f1f5f9;
    --pos: #047857;
    --neg: #be123c;
    --warn: #b45309;
    box-sizing: border-box;
    width: ${DOC_WIDTH_PX}px;
    padding: 28px 32px;
    color: var(--fg);
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 13px;
    line-height: 1.4;
    background: #fff;
  }
  .espelho-doc *, .espelho-doc *::before, .espelho-doc *::after { box-sizing: border-box; }
  .espelho-doc .doc-title {
    margin: 0 0 4px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .espelho-doc .empresa-nome {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .espelho-doc .meta {
    margin: 2px 0 0;
    font-size: 12px;
    color: var(--muted);
  }
  .espelho-doc .cabecalho {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 18px;
  }
  .espelho-doc .cabecalho-dir {
    text-align: right;
    min-width: 220px;
  }
  .espelho-doc .bloco-func { margin-bottom: 16px; }
  .espelho-doc .bloco-func h2 {
    margin: 0 0 2px;
    font-size: 16px;
    font-weight: 650;
  }
  .espelho-doc .resumo {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
    margin-bottom: 18px;
  }
  .espelho-doc .resumo.resumo-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .espelho-doc .resumo-card {
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 10px 12px;
    background: #fff;
  }
  .espelho-doc .resumo-card .label {
    margin: 0;
    font-size: 11px;
    color: var(--muted);
  }
  .espelho-doc .resumo-card .value {
    margin: 2px 0 0;
    font-size: 17px;
    font-weight: 650;
    font-variant-numeric: tabular-nums;
  }
  .espelho-doc .secao-titulo {
    margin: 0 0 8px;
    font-size: 14px;
    font-weight: 650;
  }
  .espelho-doc table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .espelho-doc thead th {
    text-align: left;
    font-size: 11px;
    font-weight: 550;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
    padding: 8px 8px;
    white-space: nowrap;
  }
  .espelho-doc thead th:first-child { padding-left: 12px; }
  .espelho-doc thead th:last-child { padding-right: 12px; text-align: right; }
  .espelho-doc tbody td {
    border-bottom: 1px solid var(--border-soft);
    padding: 10px 8px;
    vertical-align: middle;
    font-variant-numeric: tabular-nums;
  }
  .espelho-doc tbody tr {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .espelho-doc tbody td:first-child { padding-left: 12px; }
  .espelho-doc tbody td:last-child { padding-right: 12px; text-align: right; font-weight: 650; }
  .espelho-doc .data-cell {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .espelho-doc .data-cell .dia { font-weight: 550; }
  .espelho-doc .data-cell .semana { font-size: 11px; color: var(--muted); }
  .espelho-doc .data-cell .warn { font-size: 11px; color: var(--warn); }
  .espelho-doc .jornada-cell { color: var(--muted); }
  .espelho-doc .batida {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.15;
  }
  .espelho-doc .batida-data {
    font-size: 10px;
    color: var(--muted);
  }
  .espelho-doc .total-cell { font-weight: 550; }
  .espelho-doc .saldo-pos { color: var(--pos); }
  .espelho-doc .saldo-neg { color: var(--neg); }
  .espelho-doc .batidas-lista {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }
  .espelho-doc .batidas-lista li {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 14px;
    border-bottom: 1px solid var(--border-soft);
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .espelho-doc .batidas-lista li:last-child { border-bottom: none; }
  .espelho-doc .batida-num {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 999px;
    background: var(--border-soft);
    color: var(--muted);
    font-size: 12px;
    font-weight: 650;
    font-variant-numeric: tabular-nums;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .espelho-doc .batida-info { min-width: 0; flex: 1; }
  .espelho-doc .batida-slot {
    margin: 0;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .espelho-doc .batida-hora-wrap {
    margin: 2px 0 0;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.15;
  }
  .espelho-doc .batida-hora {
    margin: 0;
    font-size: 20px;
    font-weight: 650;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
  }
  .espelho-doc .batidas-vazio {
    margin: 0;
    padding: 28px 16px;
    text-align: center;
    color: var(--muted);
    border: 1px dashed var(--border);
    border-radius: 12px;
  }
  .espelho-doc .rodape {
    margin-top: 20px;
    padding-top: 12px;
    border-top: 1px solid var(--border);
    font-size: 11px;
    color: var(--muted);
  }
`;

function metaEmpresaHtml(empresa: EspelhoDocumentoEmpresa): string {
  const endereco = formatEnderecoEmpresa(empresa);
  return [empresa.cnpj ? `CNPJ ${empresa.cnpj}` : null, empresa.email || null, endereco]
    .filter(Boolean)
    .map((x) => escapeHtml(String(x)))
    .join("<br/>");
}

function metaFuncHtml(funcionario: EspelhoDocumentoFuncionario): string {
  return [
    funcionario.cpf ? `CPF ${funcionario.cpf}` : null,
    funcionario.matricula ? `Matrícula ${funcionario.matricula}` : null,
    funcionario.email || null,
  ]
    .filter(Boolean)
    .map((x) => escapeHtml(String(x)))
    .join(" · ");
}

function cabecalhoHtml(args: {
  docTitle: string;
  empresa: EspelhoDocumentoEmpresa;
  rightMeta: string;
}): string {
  const metaEmpresa = metaEmpresaHtml(args.empresa);
  return `<header class="cabecalho">
    <div>
      <p class="doc-title">${escapeHtml(args.docTitle)}</p>
      <h1 class="empresa-nome">${escapeHtml(args.empresa.razaoSocial?.trim() || "Empresa")}</h1>
      ${metaEmpresa ? `<p class="meta">${metaEmpresa}</p>` : ""}
    </div>
    <div class="cabecalho-dir">${args.rightMeta}</div>
  </header>`;
}

function blocoFuncHtml(funcionario: EspelhoDocumentoFuncionario): string {
  const metaFunc = metaFuncHtml(funcionario);
  return `<section class="bloco-func">
    <h2>${escapeHtml(funcionario.nome || "Funcionário")}</h2>
    ${metaFunc ? `<p class="meta">${metaFunc}</p>` : ""}
  </section>`;
}

function jornadaRowHtml(dia: PontoDiaResponse, slotCount: number): string {
  const espMin = parseHhmmToMinutes(dia.horasEsperadas);
  const delta = parseHhmmToMinutes(dia.saldo);
  const st = (dia.status ?? "normal").toLowerCase();
  const temOcorrencia =
    st === "falta" ||
    st === "em_aberto" ||
    (dia.marcacoes ?? []).some((m) => (m.inconsistencias?.length ?? 0) > 0);
  const cruza = jornadaAtravessaOutroDia(dia.data, dia.marcacoes);
  const saldoClass = delta > 0 ? "saldo-pos" : delta < 0 ? "saldo-neg" : "";

  const batidas = Array.from({ length: slotCount }, (_, i) => {
    const m = dia.marcacoes?.[i];
    if (!m) return "<td>—</td>";
    const dataExtra = dataSobreBatida(dia.data, m.horario, cruza);
    return `<td><span class="batida">${
      dataExtra ? `<span class="batida-data">${escapeHtml(dataExtra)}</span>` : ""
    }<span>${escapeHtml(formatHora(m.horario))}</span></span></td>`;
  }).join("");

  return `<tr>
    <td><span class="data-cell">
      <span class="dia">${escapeHtml(formatDataCurtaIso(dia.data))}</span>
      ${dia.diaSemana ? `<span class="semana">${escapeHtml(dia.diaSemana)}</span>` : ""}
      ${temOcorrencia ? `<span class="warn" aria-hidden="true">⚠</span>` : ""}
    </span></td>
    <td class="jornada-cell">${escapeHtml(
      formatMinutesAsSaldo(espMin).replace(/^[+\u2007]/, "") || "00h00"
    )}</td>
    ${batidas}
    <td class="total-cell">${escapeHtml(formatHhmmPlain(dia.totalHoras))}</td>
    <td class="${saldoClass}">${escapeHtml(formatMinutesAsSaldo(delta))}</td>
  </tr>`;
}

function tabelaJornadasHtml(jornadas: PontoDiaResponse[], slotCount: number): string {
  const slotHeaders = Array.from({ length: slotCount }, (_, i) =>
    `<th>${escapeHtml(slotLabelEspelho(i))}</th>`
  ).join("");
  const rows = jornadas.map((dia) => jornadaRowHtml(dia, slotCount)).join("");
  return `<table>
    <thead>
      <tr>
        <th>Data</th>
        <th>Jornada</th>
        ${slotHeaders}
        <th>Total</th>
        <th>Saldo</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function buildEspelhoHtml(args: ExportarEspelhoPdfArgs): string {
  const { empresa, funcionario, ano, mes, jornadaLabel, jornadas, slotCount, resumo } = args;
  const periodo = `${MESES_BH[mes - 1]}/${ano}`;
  const geradoEm = new Date().toLocaleString("pt-BR");

  return `
<div class="espelho-doc">
  ${cabecalhoHtml({
    docTitle: "Espelho de ponto",
    empresa,
    rightMeta: `<p class="meta"><strong>Período</strong><br/>${escapeHtml(periodo)}</p>
      <p class="meta" style="margin-top:8px"><strong>Jornada</strong><br/>${escapeHtml(
        jornadaLabel || "—"
      )}</p>`,
  })}
  ${blocoFuncHtml(funcionario)}
  <section class="resumo">
    <div class="resumo-card"><p class="label">Dias</p><p class="value">${resumo.dias}</p></div>
    <div class="resumo-card"><p class="label">Total esperado mês</p><p class="value">${escapeHtml(
      resumo.totalEsperado
    )}</p></div>
    <div class="resumo-card"><p class="label">Total trabalhado</p><p class="value">${escapeHtml(
      resumo.totalTrabalhado
    )}</p></div>
    <div class="resumo-card"><p class="label">Ocorrências</p><p class="value">${resumo.ocorrencias}</p></div>
  </section>
  <h3 class="secao-titulo">Jornadas do período</h3>
  ${tabelaJornadasHtml(jornadas, slotCount)}
  <footer class="rodape">Documento gerado em ${escapeHtml(geradoEm)}</footer>
</div>`;
}

function listaBatidasHtml(jornada: PontoDiaResponse): string {
  const marcacoes = jornada.marcacoes ?? [];
  if (!marcacoes.length) {
    return `<p class="batidas-vazio">Nenhuma batida nesta jornada.</p>`;
  }

  const items = marcacoes
    .map((m, i) => {
      const dataIso = dataIsoFromHorario(m.horario);
      const dataLabel = dataIso ? formatDataCurtaIso(dataIso) : "";
      return `<li>
        <span class="batida-num">${i + 1}</span>
        <div class="batida-info">
          <p class="batida-slot">${escapeHtml(slotLabelEspelho(i))}</p>
          <span class="batida-hora-wrap">
            ${dataLabel ? `<span class="batida-data">${escapeHtml(dataLabel)}</span>` : ""}
            <p class="batida-hora">${escapeHtml(formatHora(m.horario))}</p>
          </span>
        </div>
      </li>`;
    })
    .join("");

  return `<ul class="batidas-lista">${items}</ul>`;
}

function buildComprovanteHtml(args: ExportarComprovanteJornadaPdfArgs): string {
  const { empresa, funcionario, jornada, jornadaLabel } = args;
  const geradoEm = new Date().toLocaleString("pt-BR");
  const espMin = parseHhmmToMinutes(jornada.horasEsperadas);
  const esperado =
    formatMinutesAsSaldo(espMin).replace(/^[+\u2007]/, "") ||
    formatHhmmPlain(jornada.horasEsperadas) ||
    "—";
  const dataFmt = jornada.data
    ? (() => {
        const [y, mo, d] = jornada.data.split("-");
        return y && mo && d ? `${d}/${mo}/${y}` : jornada.data;
      })()
    : "—";
  const qtd = jornada.marcacoes?.length ?? 0;

  return `
<div class="espelho-doc" style="width:720px">
  ${cabecalhoHtml({
    docTitle: "Cartão de ponto",
    empresa,
    rightMeta: `<p class="meta"><strong>Data</strong><br/>${escapeHtml(dataFmt)}${
      jornada.diaSemana ? `<br/>${escapeHtml(jornada.diaSemana)}` : ""
    }</p>
      <p class="meta" style="margin-top:8px"><strong>Jornada</strong><br/>${escapeHtml(
        jornadaLabel || esperado || "—"
      )}</p>`,
  })}
  ${blocoFuncHtml(funcionario)}
  <section class="resumo resumo-2">
    <div class="resumo-card"><p class="label">Esperado</p><p class="value">${escapeHtml(
      esperado
    )}</p></div>
    <div class="resumo-card"><p class="label">Total do dia</p><p class="value">${escapeHtml(
      formatHhmmPlain(jornada.totalHoras) || "—"
    )}</p></div>
  </section>
  <h3 class="secao-titulo">Batidas${qtd ? ` · ${qtd}` : ""}</h3>
  ${listaBatidasHtml(jornada)}
  <footer class="rodape">Documento gerado em ${escapeHtml(geradoEm)}</footer>
</div>`;
}

/** Limites Y (px no canvas) onde é seguro cortar página — após cada bloco/linha. */
function collectSafeCutYs(root: HTMLElement, canvasHeight: number): number[] {
  const rootTop = root.getBoundingClientRect().top;
  const scaleY = canvasHeight / Math.max(1, root.scrollHeight);
  const cuts = new Set<number>([0, canvasHeight]);

  const pushBottom = (el: Element) => {
    const r = el.getBoundingClientRect();
    const y = Math.round((r.bottom - rootTop) * scaleY);
    if (y > 0 && y < canvasHeight) cuts.add(y);
  };

  root
    .querySelectorAll(
      ".cabecalho, .bloco-func, .resumo, .secao-titulo, thead, tbody tr, .batidas-lista li, .batidas-vazio, .rodape"
    )
    .forEach(pushBottom);
  return [...cuts].sort((a, b) => a - b);
}

/** Maior corte ≤ maxY e > srcY; se não couber nada, o próximo corte após srcY. */
function nextCutY(cuts: number[], srcY: number, maxY: number, canvasHeight: number): number {
  let best = -1;
  for (const y of cuts) {
    if (y <= srcY) continue;
    if (y <= maxY) best = y;
    else break;
  }
  if (best > srcY) return best;
  const fallback = cuts.find((y) => y > srcY);
  return fallback ?? canvasHeight;
}

async function renderHtmlDocToPdf(
  html: string,
  orientation: "landscape" | "portrait" = "landscape"
): Promise<jsPDF> {
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = `position:fixed;left:-12000px;top:0;width:${DOC_WIDTH_PX}px;background:#fff;pointer-events:none;z-index:-1;`;
  host.innerHTML = `<style>${DOC_CSS}</style>${html}`;
  document.body.appendChild(host);

  const root = host.querySelector(".espelho-doc") as HTMLElement;

  try {
    void root.offsetHeight;

    const canvas = await html2canvas(root, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: DOC_WIDTH_PX,
    });

    const safeCuts = collectSafeCutYs(root, canvas.height);

    const doc = new jsPDF({ orientation, unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 8;
    const usableH = pageH - margin * 2;
    const imgW = pageW - margin * 2;

    const pageCanvas = document.createElement("canvas");
    const ctx = pageCanvas.getContext("2d");
    if (!ctx) throw new Error("Canvas indisponível.");

    const pxPerMm = canvas.width / imgW;
    const pagePxH = Math.floor(usableH * pxPerMm);
    let srcY = 0;
    let pageIndex = 0;

    while (srcY < canvas.height - 1) {
      const cutY = nextCutY(safeCuts, srcY, srcY + pagePxH, canvas.height);
      const sliceH = Math.max(1, cutY - srcY);
      pageCanvas.width = canvas.width;
      pageCanvas.height = sliceH;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      ctx.drawImage(canvas, 0, srcY, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
      const sliceData = pageCanvas.toDataURL("image/jpeg", 0.92);
      const sliceMmH = sliceH / pxPerMm;
      if (pageIndex > 0) doc.addPage();
      doc.addImage(sliceData, "JPEG", margin, margin, imgW, sliceMmH);
      srcY = cutY;
      pageIndex += 1;
      if (pageIndex > 200) break;
    }

    return doc;
  } finally {
    host.remove();
  }
}

/** Adiciona página de assinatura digital no mesmo estilo tabular do comprovante legado. */
export function appendAssinaturaDigitalPage(doc: jsPDF, assinatura: AssinaturaDigitalPdf): void {
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 14;
  const tableW = pageW - 2 * margin;
  let y = margin;

  doc.addPage();
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, y, tableW, 10, "FD");
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, tableW, 10, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("Assinatura digital", margin + tableW / 2, y + 6.5, { align: "center" });
  y += 16;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("Certificado (serial)", margin, y);
  y += 5;
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.text(assinatura.certificadoSerial, margin, y, { maxWidth: tableW });
  y += 10;

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("Data da assinatura", margin, y);
  y += 5;
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.text(assinatura.timestampAssinatura, margin, y, { maxWidth: tableW });
  y += 12;

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("Hash (assinatura)", margin, y);
  y += 5;
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(7);
  doc.text(assinatura.assinaturaDigital, margin, y, { maxWidth: tableW });
}

/** Renderiza o HTML do espelho (mesmo visual da tela) e baixa PDF — sem diálogo de impressão. */
export async function exportarEspelhoPdf(args: ExportarEspelhoPdfArgs): Promise<void> {
  if (!args.jornadas.length) {
    throw new Error("Sem jornadas no período.");
  }

  const html = buildEspelhoHtml(args);
  const slug =
    args.fileName ??
    `espelho-${args.funcionario.nome.replace(/\s+/g, "-").toLowerCase()}-${args.ano}-${String(
      args.mes
    ).padStart(2, "0")}`;

  const doc = await renderHtmlDocToPdf(html, "landscape");
  doc.save(`${slug}.pdf`);
}

/** Comprovante de um dia no mesmo formato visual do espelho. */
export async function exportarComprovanteJornadaPdf(
  args: ExportarComprovanteJornadaPdfArgs
): Promise<void> {
  if (!args.jornada) {
    throw new Error("Sem jornada para exportar.");
  }

  const html = buildComprovanteHtml(args);
  const slug =
    args.fileName ??
    `comprovante-ponto-${(args.jornada.data ?? "jornada").replace(/\//g, "-")}`;

  const doc = await renderHtmlDocToPdf(html, "portrait");
  if (args.beforeSave) {
    await args.beforeSave(doc);
  }
  doc.save(`${slug}.pdf`);
}
