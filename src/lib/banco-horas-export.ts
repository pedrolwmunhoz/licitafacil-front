import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  MESES_BH,
  formatDataCurta,
  formatHhmmPlain,
  formatMinutesAsSaldo,
  formatSaldoDisplay,
  parseHhmmToMinutes,
  saldoSituacaoLabel,
  statusDiaLabel,
  type MovimentacaoBh,
} from "@/lib/banco-horas-ui";
import type {
  EspelhoDocumentoEmpresa,
  EspelhoDocumentoFuncionario,
} from "@/lib/espelho-export";
import type { ResumoBancoHorasResponse } from "@/types/empresa";

const DOC_WIDTH_PX = 720;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatEnderecoEmpresa(e: EspelhoDocumentoEmpresa): string | null {
  const linha1 = [e.rua, e.numeroEndereco].filter(Boolean).join(", ");
  const linha2 = [e.bairro, e.cidade && e.uf ? `${e.cidade}/${e.uf}` : e.cidade || e.uf]
    .filter(Boolean)
    .join(" · ");
  const partes = [linha1, e.complemento, linha2, e.cep ? `CEP ${e.cep}` : null].filter(Boolean);
  return partes.length ? partes.join(" — ") : null;
}

export type ExportarBancoHorasPdfArgs = {
  empresa: EspelhoDocumentoEmpresa;
  funcionario: EspelhoDocumentoFuncionario;
  ano: number;
  mes: number;
  hojeLabel: string;
  saldoAtual?: ResumoBancoHorasResponse | null;
  resumoPeriodo?: ResumoBancoHorasResponse | null;
  movimentacoes: MovimentacaoBh[];
  fileName?: string;
};

const DOC_CSS = `
  .bh-doc {
    --fg: #0f172a;
    --muted: #64748b;
    --border: #e2e8f0;
    --border-soft: #f1f5f9;
    --pos: #047857;
    --neg: #be123c;
    box-sizing: border-box;
    width: ${DOC_WIDTH_PX}px;
    padding: 28px 32px;
    color: var(--fg);
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 13px;
    line-height: 1.4;
    background: #fff;
  }
  .bh-doc *, .bh-doc *::before, .bh-doc *::after { box-sizing: border-box; }
  .bh-doc .doc-title {
    margin: 0 0 4px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .bh-doc .empresa-nome {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .bh-doc .meta { margin: 2px 0 0; font-size: 12px; color: var(--muted); }
  .bh-doc .cabecalho {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 18px;
  }
  .bh-doc .cabecalho-dir { text-align: right; min-width: 180px; }
  .bh-doc .bloco-func { margin-bottom: 16px; }
  .bh-doc .bloco-func h2 { margin: 0 0 2px; font-size: 16px; font-weight: 650; }
  .bh-doc .resumo {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    margin-bottom: 18px;
  }
  .bh-doc .resumo-card {
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 10px 12px;
    background: #fff;
  }
  .bh-doc .resumo-card .label { margin: 0; font-size: 11px; color: var(--muted); }
  .bh-doc .resumo-card .value {
    margin: 2px 0 0;
    font-size: 17px;
    font-weight: 650;
    font-variant-numeric: tabular-nums;
  }
  .bh-doc .saldo-hero {
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 18px 16px;
    text-align: center;
    margin-bottom: 18px;
  }
  .bh-doc .saldo-hero .valor {
    margin: 0;
    font-size: 36px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
  }
  .bh-doc .saldo-hero .situacao { margin: 4px 0 0; font-size: 13px; font-weight: 550; }
  .bh-doc .saldo-hero .ate { margin: 2px 0 0; font-size: 11px; color: var(--muted); }
  .bh-doc .pos { color: var(--pos); }
  .bh-doc .neg { color: var(--neg); }
  .bh-doc .secao-titulo { margin: 0 0 8px; font-size: 14px; font-weight: 650; }
  .bh-doc .periodo-dl {
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 4px 14px;
    margin-bottom: 18px;
  }
  .bh-doc .periodo-dl .row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 8px 0;
    border-bottom: 1px solid var(--border-soft);
    font-variant-numeric: tabular-nums;
  }
  .bh-doc .periodo-dl .row:last-child { border-bottom: none; font-weight: 650; }
  .bh-doc .periodo-dl .row dt { color: var(--muted); margin: 0; }
  .bh-doc .periodo-dl .row dd { margin: 0; }
  .bh-doc .mov-lista {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
  }
  .bh-doc .mov-lista li {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    border-bottom: 1px solid var(--border-soft);
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .bh-doc .mov-lista li:last-child { border-bottom: none; }
  .bh-doc .mov-data {
    width: 44px;
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
    color: var(--muted);
    font-size: 12px;
  }
  .bh-doc .mov-tipo { flex: 1; min-width: 0; font-weight: 550; }
  .bh-doc .mov-obs { display: block; font-size: 11px; font-weight: 400; color: var(--muted); }
  .bh-doc .mov-status {
    flex-shrink: 0;
    font-size: 10px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .bh-doc .mov-delta {
    flex-shrink: 0;
    font-weight: 650;
    font-variant-numeric: tabular-nums;
  }
  .bh-doc .mov-vazio {
    margin: 0;
    padding: 24px;
    text-align: center;
    color: var(--muted);
    border: 1px dashed var(--border);
    border-radius: 10px;
  }
  .bh-doc .rodape {
    margin-top: 20px;
    padding-top: 12px;
    border-top: 1px solid var(--border);
    font-size: 11px;
    color: var(--muted);
  }
`;

function buildBancoHorasHtml(args: ExportarBancoHorasPdfArgs): string {
  const periodo = `${MESES_BH[args.mes - 1]}/${args.ano}`;
  const geradoEm = new Date().toLocaleString("pt-BR");
  const endereco = formatEnderecoEmpresa(args.empresa);
  const metaEmpresa = [
    args.empresa.cnpj ? `CNPJ ${args.empresa.cnpj}` : null,
    args.empresa.email || null,
    endereco,
  ]
    .filter(Boolean)
    .map((x) => escapeHtml(String(x)))
    .join("<br/>");
  const metaFunc = [
    args.funcionario.cpf ? `CPF ${args.funcionario.cpf}` : null,
    args.funcionario.matricula ? `Matrícula ${args.funcionario.matricula}` : null,
    args.funcionario.email || null,
  ]
    .filter(Boolean)
    .map((x) => escapeHtml(String(x)))
    .join(" · ");

  const saldoMin = parseHhmmToMinutes(args.saldoAtual?.totalHorasExtras);
  const credMin = parseHhmmToMinutes(args.saldoAtual?.totalCreditos);
  const debMin = parseHhmmToMinutes(args.saldoAtual?.totalDebitos);
  const saldoClass = saldoMin > 0 ? "pos" : saldoMin < 0 ? "neg" : "";

  const movItems = args.movimentacoes.length
    ? args.movimentacoes
        .map((m) => {
          const delta =
            m.deltaMin < 0
              ? formatMinutesAsSaldo(m.deltaMin)
              : formatMinutesAsSaldo(m.trabalhadasMin).replace(/^[+\u2007-]/, "");
          const deltaClass = m.deltaMin < 0 ? "neg" : m.deltaMin > 0 ? "pos" : "";
          return `<li>
            <span class="mov-data">${escapeHtml(formatDataCurta(m.data))}</span>
            <span class="mov-tipo">${escapeHtml(m.tipo)}${
              m.observacao ? `<span class="mov-obs">${escapeHtml(m.observacao)}</span>` : ""
            }</span>
            ${
              m.statusDia
                ? `<span class="mov-status">${escapeHtml(statusDiaLabel(m.statusDia))}</span>`
                : ""
            }
            <span class="mov-delta ${deltaClass}">${escapeHtml(delta)}</span>
          </li>`;
        })
        .join("")
    : "";

  const resumo = args.resumoPeriodo;

  return `
<div class="bh-doc">
  <header class="cabecalho">
    <div>
      <p class="doc-title">Banco de horas</p>
      <h1 class="empresa-nome">${escapeHtml(args.empresa.razaoSocial?.trim() || "Empresa")}</h1>
      ${metaEmpresa ? `<p class="meta">${metaEmpresa}</p>` : ""}
    </div>
    <div class="cabecalho-dir">
      <p class="meta"><strong>Período</strong><br/>${escapeHtml(periodo)}</p>
    </div>
  </header>

  <section class="bloco-func">
    <h2>${escapeHtml(args.funcionario.nome || "Funcionário")}</h2>
    ${metaFunc ? `<p class="meta">${metaFunc}</p>` : ""}
  </section>

  <section class="saldo-hero">
    <p class="valor ${saldoClass}">${escapeHtml(formatMinutesAsSaldo(saldoMin))}</p>
    <p class="situacao">${escapeHtml(saldoSituacaoLabel(saldoMin))}</p>
    <p class="ate">Acumulado até ${escapeHtml(args.hojeLabel)}</p>
  </section>

  <section class="resumo">
    <div class="resumo-card"><p class="label">Créditos</p><p class="value pos">${escapeHtml(
      formatMinutesAsSaldo(credMin)
    )}</p></div>
    <div class="resumo-card"><p class="label">Débitos</p><p class="value neg">${escapeHtml(
      formatMinutesAsSaldo(debMin)
    )}</p></div>
    <div class="resumo-card"><p class="label">Saldo</p><p class="value ${saldoClass}">${escapeHtml(
      formatMinutesAsSaldo(saldoMin)
    )}</p></div>
  </section>

  <h3 class="secao-titulo">Resumo do período · ${escapeHtml(periodo)}</h3>
  <dl class="periodo-dl">
    <div class="row"><dt>Horas trabalhadas</dt><dd>${escapeHtml(
      formatHhmmPlain(resumo?.totalHorasTrabalhadas)
    )}</dd></div>
    <div class="row"><dt>Horas previstas do mês</dt><dd>${escapeHtml(
      formatHhmmPlain(resumo?.totalHorasEsperadas)
    )}</dd></div>
    <div class="row"><dt>Créditos</dt><dd class="pos">${escapeHtml(
      formatSaldoDisplay(resumo?.totalCreditos)
    )}</dd></div>
    <div class="row"><dt>Débitos</dt><dd class="neg">${escapeHtml(
      formatSaldoDisplay(resumo?.totalDebitos)
    )}</dd></div>
    <div class="row"><dt>Saldo gerado</dt><dd>${escapeHtml(
      formatSaldoDisplay(resumo?.totalHorasExtras)
    )}</dd></div>
  </dl>

  <h3 class="secao-titulo">Movimentações · ${escapeHtml(periodo)}</h3>
  ${
    movItems
      ? `<ul class="mov-lista">${movItems}</ul>`
      : `<p class="mov-vazio">Nenhuma movimentação neste período.</p>`
  }

  <footer class="rodape">Documento gerado em ${escapeHtml(geradoEm)}</footer>
</div>`;
}

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
      ".cabecalho, .bloco-func, .saldo-hero, .resumo, .secao-titulo, .periodo-dl, .mov-lista li, .mov-vazio, .rodape"
    )
    .forEach(pushBottom);
  return [...cuts].sort((a, b) => a - b);
}

function nextCutY(cuts: number[], srcY: number, maxY: number, canvasHeight: number): number {
  let best = -1;
  for (const y of cuts) {
    if (y <= srcY) continue;
    if (y <= maxY) best = y;
    else break;
  }
  if (best > srcY) return best;
  return cuts.find((y) => y > srcY) ?? canvasHeight;
}

export async function exportarBancoHorasPdf(args: ExportarBancoHorasPdfArgs): Promise<void> {
  const html = buildBancoHorasHtml(args);
  const slug =
    args.fileName ??
    `banco-horas-${args.funcionario.nome.replace(/\s+/g, "-").toLowerCase()}-${args.ano}-${String(
      args.mes
    ).padStart(2, "0")}`;

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = `position:fixed;left:-12000px;top:0;width:${DOC_WIDTH_PX}px;background:#fff;pointer-events:none;z-index:-1;`;
  host.innerHTML = `<style>${DOC_CSS}</style>${html}`;
  document.body.appendChild(host);

  const root = host.querySelector(".bh-doc") as HTMLElement;

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
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 10;
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

    doc.save(`${slug}.pdf`);
  } finally {
    host.remove();
  }
}
