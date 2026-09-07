export type Stat = { label: string; value: string };
export type Feature = { title: string; body: string; icon?: string };
export type Session = { n: number; when: string; title: string; summary: string; bullets: string[] };
export type Sprint = { n: number; title: string; days: string; focus: string; learn: string[]; ship: string; tools: string[] };
export type Level = { n: number; title: string; theory: string[]; skills: string[]; build: string[]; later?: boolean };
export type FAQItem = { q: string; a: string };
export type Price = { current: string; original?: string; note?: string };

export type PricingBlock = { list?: string; current: string; includes: string[]; note?: string; ctaLabel: string; ctaHref: string; kind: CtaKind };

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
  /** V3: amounts live ONLY here (BRIEF-V3 §2). */
  pricing?: PricingBlock;
  whatYouGet?: string[];
  isThisForMe?: string[];
  /** ISO 8601 with the +05:30 offset, e.g. "2026-09-11T19:00:00+05:30". */
  nextCohortStart?: string;
  /** ISO 8601 with the +05:30 offset. Simplest honest rule: equals nextCohortStart. */
  couponExpiresAt?: string;
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

/* ==========================================================================
   V2 additions. Purely additive — the V1 `Program` type above is unchanged.
   ========================================================================== */

export type CtaKind = 'buy' | 'apply' | 'free';
export type AudienceTag = 'coders' | 'vibe-coders' | 'everyone';

export type LadderPrice = {
  /** Struck-through list price, e.g. "₹19,999". Omit when there is none. */
  list?: string;
  /** What the buyer pays today, e.g. "Free" or "₹2,499". */
  current: string;
  /** One short qualifier, e.g. "with coupon, until the cohort starts". */
  note?: string;
};

export type LadderCta = { label: string; href: string; kind: CtaKind };

export type LadderRung = {
  /** 0 = workshops … 4 = fellowship. Sort key and the visible step number. */
  rung: number;
  /** Program name — deliberately SECONDARY in every card. */
  name: string;
  slug: string;
  audience: AudienceTag[];
  /** Lead line 1: commitment. "90 minutes", "2 days, one weekend". */
  time: string;
  /** Lead line 2 detail: "Live, online", "14 days back-to-back". */
  format: string;
  price: LadderPrice;
  /** Lead line 3: what you walk away with. One sentence, outcome-first. */
  outcome: string;
  /** Up to 3 supporting proof points. */
  proof?: string[];
  cta: LadderCta;
  href: string;
};

export type Workshop = {
  slug: string;
  /** Tool the 90 minutes is taught in. */
  tool: string;
  audience: AudienceTag[];
  /** Outcome-first line, no tech-list headlines. */
  outcome: string;
  href: string;
};

export type InfoBlock = { label: string; value: string };
