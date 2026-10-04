import { BlogPostView } from "@/components/marketing/BlogPostView";
import { oQueEAfdEAej as post } from "@/content/blog/posts/o-que-e-afd-e-aej";
import { jsonLd } from "@/content/jsonld/blog__o-que-e-afd-e-aej";

const o_que_e_afd_e_aejPage = () => (
  <BlogPostView post={post} jsonLd={jsonLd} />
);

export default o_que_e_afd_e_aejPage;
