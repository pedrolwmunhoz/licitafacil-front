export const CALCULATORS_INDEX_PATH = "/calculadoras";

export function calculatorPath(slug: string): string {
  return `${CALCULATORS_INDEX_PATH}/${slug}`;
}
