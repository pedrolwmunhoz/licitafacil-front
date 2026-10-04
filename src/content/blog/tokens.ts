/** Tokens de conteúdo do blog expandidos no render (ano do visitante, etc.). */
export function expandBlogTokens(text: string): string {
  const ano = String(new Date().getFullYear());
  return text.replaceAll("{{ano}}", ano);
}
