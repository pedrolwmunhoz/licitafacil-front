export type BlogPostEstado = {
  qntViews: number;
  qntCurtidas: number;
  qntComentarios: number;
  curtido: boolean;
};

export type BlogCurtida = {
  curtido: boolean;
  qntCurtidas: number;
};

export type BlogComentario = {
  id: string;
  nome: string;
  texto: string;
  createdAt: string;
};

export type CriarBlogComentarioRequest = {
  nome: string;
  email: string | null;
  texto: string;
};

export type BlogMaisLido = {
  slug: string;
  qntViews: number;
};
