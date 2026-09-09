/**
 * Social proof for the workshop landing pages.
 *
 * Names and roles are taken from the alumni carousel on the current
 * outskill.com (see `ref/Outskill.html`). The quote text on that page is not
 * available to us, so every `quote` is an empty string with a TODO below.
 *
 * TODO(founder): paste the real quote for each person. Two or three sentences
 * each, in their own words. `SocialProof.astro` renders the card without a
 * quote block until then — we do not write words and put a person's name
 * under them.
 */
export type Testimonial = {
  name: string;
  role: string;
  /** '' until the founder supplies the real words. Never fabricated. */
  quote: string;
};

export const testimonials: Testimonial[] = [
  { name: 'Anant Gupta', role: 'Engineer', quote: '' },
  { name: 'George Yohannan', role: 'Senior Product Manager', quote: '' },
  { name: 'Om Advani', role: 'AI Driven Business Consultant', quote: '' },
];

/** Shown below the quotes, per BRIEF-V3 §1.4. */
export const ratingLine = 'Rated 4.9 / 5 · avg.';
