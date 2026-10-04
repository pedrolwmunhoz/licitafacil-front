import type { TipoUsuario } from "@/types/auth";

const CHAVE = "segponto_sessao";
const TIPOS: readonly TipoUsuario[] = ["EMPRESA", "FUNCIONARIO"];

/**
 * Só uma dica para a UI pública (ex.: navbar mostrar "Painel" sem chamar a API).
 * Não é credencial: a sessão real é o cookie HttpOnly, validado pelo gateway em /api/v2/auth/me.
 */
export const sessaoHint = {
  definir(tipo: TipoUsuario) {
    localStorage.setItem(CHAVE, tipo);
  },

  tipo(): TipoUsuario | null {
    const valor = localStorage.getItem(CHAVE);
    return TIPOS.includes(valor as TipoUsuario) ? (valor as TipoUsuario) : null;
  },

  limpar() {
    localStorage.removeItem(CHAVE);
  },
};
