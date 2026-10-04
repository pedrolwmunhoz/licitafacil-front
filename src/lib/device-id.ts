const CHAVE = "segponto_device_id";

/**
 * Identificador deste navegador: gerado na primeira visita a qualquer página e guardado no
 * localStorage. Vai no header X-Device-Id; o backend só aceita o token no mesmo device id do login.
 */
export function obterDeviceId(): string {
  let id = localStorage.getItem(CHAVE);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(CHAVE, id);
  }
  return id;
}
