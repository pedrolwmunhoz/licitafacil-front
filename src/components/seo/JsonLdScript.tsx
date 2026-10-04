import { Helmet } from "react-helmet-async";
import { useMemo } from "react";

const SCRIPT_PREFIX = "segponto-ld";

type JsonLdScriptProps = {
  /** Identificador único por rota, ex.: `/perguntas-frequentes` */
  routeKey: string;
  graph: Record<string, unknown>;
};

function scriptIdForRoute(routeKey: string): string {
  const slug = routeKey.replace(/\//g, "-").replace(/^-/, "") || "home";
  return `${SCRIPT_PREFIX}-${slug}`;
}

/**
 * JSON-LD no &lt;head&gt; via Helmet — entra no HTML do prerender e atualiza na navegação SPA.
 */
export function JsonLdScript({ routeKey, graph }: JsonLdScriptProps) {
  const id = scriptIdForRoute(routeKey);
  const json = useMemo(
    () => JSON.stringify(graph).replace(/</g, "\\u003c"),
    [graph],
  );

  return (
    <Helmet>
      <script id={id} type="application/ld+json">
        {json}
      </script>
    </Helmet>
  );
}
