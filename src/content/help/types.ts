export type HelpFaqItem = { q: string; a: string };

export type HelpFaqTopic = {
  id: string;
  title: string;
  intro?: string;
  items: HelpFaqItem[];
};

export type HelpDocSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type HelpDocTopic = {
  id: string;
  title: string;
  intro?: string;
  sections: HelpDocSection[];
};
