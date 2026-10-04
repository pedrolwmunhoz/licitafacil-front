import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Timezone do navegador do usuário (ex: America/Sao_Paulo). Usado como default quando não há timezone da empresa. */
export function getBrowserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
}

/** Formata um instant ISO no timezone informado. */
export function formatInstantInTimezone(
  iso: string,
  options: Intl.DateTimeFormatOptions,
  timezone?: string
): string {
  const zone = timezone || getBrowserTimezone();
  return new Date(iso).toLocaleString("pt-BR", { ...options, timeZone: zone });
}

const DATA_HORA_OPCOES: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

/** Formata data/hora ISO (UTC) para exibição no timezone do navegador. */
export function formatDataHora(iso: string, timezone?: string): string {
  if (!iso) return "—";
  try {
    return formatInstantInTimezone(iso, DATA_HORA_OPCOES, timezone);
  } catch {
    return iso;
  }
}

/** Formata apenas a hora (HH:mm ou HH:mm:ss).
 * Se `iso` já for LocalDateTime (sem Z), exibe direto sem converter fuso.
 * Se for Instant (com Z), converte para `timezone`. */
export function formatHora(iso: string, timezone?: string, comSegundos = false): string {
  if (!iso) return "—";
  try {
    if (!/[zZ]|[+-]\d{2}:?\d{2}$/.test(iso)) {
      const m = iso.match(/T(\d{2}):(\d{2})(?::(\d{2}))?/);
      if (m) return comSegundos ? `${m[1]}:${m[2]}:${m[3] ?? "00"}` : `${m[1]}:${m[2]}`;
    }
    const opts: Intl.DateTimeFormatOptions = comSegundos
      ? { hour: "2-digit", minute: "2-digit", second: "2-digit" }
      : { hour: "2-digit", minute: "2-digit" };
    return formatInstantInTimezone(iso, opts, timezone);
  } catch {
    return iso;
  }
}

/** Formata data (dd/mm/yyyy) de LocalDateTime ou Instant. */
export function formatData(iso: string, timezone?: string): string {
  if (!iso) return "—";
  try {
    if (!/[zZ]|[+-]\d{2}:?\d{2}$/.test(iso)) {
      const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (m) return `${m[3]}/${m[2]}/${m[1]}`;
    }
    return formatInstantInTimezone(iso, { day: "2-digit", month: "2-digit", year: "numeric" }, timezone);
  } catch {
    return iso;
  }
}
