import { BlogPostView } from "@/components/marketing/BlogPostView";
import { repCRepAERepPEntendaAsDiferencas as post } from "@/content/blog/posts/rep-c-rep-a-e-rep-p-entenda-as-diferencas";
import { jsonLd } from "@/content/jsonld/blog__rep-c-rep-a-e-rep-p-entenda-as-diferencas";

const rep_c_rep_a_e_rep_p_entenda_as_diferencasPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default rep_c_rep_a_e_rep_p_entenda_as_diferencasPage;
