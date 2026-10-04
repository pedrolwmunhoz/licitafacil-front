# CSS por rota (Tailwind)

O Tailwind só gera as classes que encontra nos arquivos listados em `content`. Cada bundle tem a própria lista:

| Bundle | CSS | Lista de arquivos |
| --- | --- | --- |
| Cada rota pública (home, blog, posts, calculadoras, cadastro, login…) | `src/styles/routes/<id>.css` | `tailwind.routes/<id>.ts`, **gerado** por `scripts/generate-mpa-entries.mjs` (`CORE` + `contentFor`) |
| Painel logado (`/empresa`, `/funcionario`) | `src/styles/app.css` | `tailwind.app.config.ts` |

`src/styles/routes/`, `tailwind.routes/`, `mpa-html/` e `src/entries/public/` são regerados a cada `npm run dev`/`npm run build` (`gen:mpa`). Não edite esses arquivos: edite o gerador.

## O erro que isso causa

Se um componente usado pela página não está na lista, o build passa, mas o CSS daquela página sai sem as classes que só existem nele. Exemplo real: `/cadastro` usa `PlanosAssinaturaGrid` (em `components/empresa/`). Como o arquivo não estava na lista da rota, `sm:grid-cols-2 lg:grid-cols-4` não entravam em `cadastro.css` e os planos apareciam um embaixo do outro, diferente da landing.

## Ao criar ou mover um componente

1. Veja quais páginas importam o componente (direta ou indiretamente).
2. Rota pública:
   - usado por todas as rotas (header, footer, shell) → `CORE` em `scripts/generate-mpa-entries.mjs`;
   - usado por um grupo de rotas → a regra do grupo em `contentFor` (blog, calculadoras, legal, `/marketing/`…);
   - usado por uma rota só → regra da rota em `contentFor` (ex.: `route.path === "/cadastro"`).
3. Painel: a pasta ou o arquivo em `tailwind.app.config.ts`.
4. Rode `npm run build` e confira no CSS gerado (`dist/assets/<rota>-*.css`) que as classes novas estão lá, principalmente as responsivas (`sm:`, `md:`, `lg:`).
