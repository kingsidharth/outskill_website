/**
 * The person who runs the 90 minutes.
 *
 * TODO(founder): replace every field below with the real mentor — name,
 * one-line credential, three bullets, and a photo at `/gen/mentor.webp` (or
 * wherever you put it). Until then this renders as a neutral "Your mentor"
 * card with an empty avatar. We do not invent a person.
 */
export type Mentor = {
  name: string;
  credential: string;
  /** Exactly three. Short. */
  bullets: [string, string, string];
  /** Path to a photo. Empty renders the placeholder avatar. */
  photo: string;
};

export const defaultMentor: Mentor = {
  name: 'Your mentor',
  credential: 'Named before the session — you get the bio in the confirmation email.',
  bullets: [
    'Runs the session live, not from slides',
    'Works in the tool alongside the room',
    'Answers questions when you hit the wall',
  ],
  photo: '',
};

/** Per-slug override, once the founder fills them in. */
export const mentorBySlug: Record<string, Mentor> = {};

export function mentorFor(slug: string): Mentor {
  return mentorBySlug[slug] ?? defaultMentor;
}
