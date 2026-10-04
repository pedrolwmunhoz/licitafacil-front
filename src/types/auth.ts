export type TipoCredencial = "EMAIL" | "TELEFONE" | "CPF" | "CNPJ" | "USERNAME";
export type TipoUsuario = "EMPRESA" | "FUNCIONARIO";

export interface LoginRequest {
  valor: string;
  tipoCredencial: TipoCredencial;
  senha: string;
}

/** Sessão web: tokens ficam no gateway; o navegador só recebe o cookie HttpOnly e estes dados. */
export interface SessaoWebResponse {
  usuarioId: string;
  tipoUsuario: TipoUsuario;
}

export interface RecuperarSenhaRequest {
  email: string;
}

export interface ValidarCodigoRequest {
  codigo: string;
}

export interface ValidarCodigoResponse {
  token: string;
}

export interface ResetarSenhaRequest {
  token: string;
  senhaNova: string;
}
