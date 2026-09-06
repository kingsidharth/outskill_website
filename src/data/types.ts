export type Stat = { label: string; value: string };
export type Feature = { title: string; body: string; icon?: string };
export type Session = { n: number; when: string; title: string; summary: string; bullets: string[] };
export type Sprint = { n: number; title: string; days: string; focus: string; learn: string[]; ship: string; tools: string[] };
export type Level = { n: number; title: string; theory: string[]; skills: string[]; build: string[]; later?: boolean };
export type FAQItem = { q: string; a: string };
export type Price = { current: string; original?: string; note?: string };

export type Program = {
  slug: 'mastermind' | 'bootcamp' | 'accelerator' | 'fellowship';
  name: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  ctaLabel: string;
  ctaHref: string;
  stats: Stat[];
  price: Price;
  features: Feature[];
  sessions?: Session[];
  sprints?: Sprint[];
  levels?: Level[];
  outcomes: string[];
  audience: string[];
  faq: FAQItem[];
  seo: { title: string; description: string };
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  context?: string;
  options: string[];
  correct: number;
  why: string;
};

export type NavLink = { label: string; href: string };
export type Site = {
  name: string;
  tagline: string;
  nav: NavLink[];
  primaryCta: NavLink;
  footer: { heading: string; links: NavLink[] }[];
  hub: { headline: string; subhead: string; picker: { question: string; options: { label: string; weights: Partial<Record<Program['slug'], number>> }[] }[] };
};
