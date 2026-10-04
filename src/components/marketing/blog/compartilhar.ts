/** Compartilhamento nativo do celular; sem ele, copia o link. */
export async function compartilharPagina(): Promise<"compartilhado" | "copiado"> {
  const url = window.location.href;
  if (navigator.share) {
    await navigator.share({ title: document.title, url });
    return "compartilhado";
  }
  await navigator.clipboard.writeText(url);
  return "copiado";
}
