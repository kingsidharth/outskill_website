import { accelerator } from './accelerator';
import { bootcamp } from './bootcamp';
import { fellowship } from './fellowship';
import { mastermind } from './mastermind';
import type { Program, Site } from './types';

export const site: Site = {
  name: 'Outskill',
  tagline: 'AI engineering, taught by building.',
  nav: [
    { label: 'Mastermind', href: '/mastermind' },
    { label: 'Bootcamp', href: '/bootcamp' },
    { label: 'Accelerator', href: '/accelerator' },
    { label: 'Fellowship', href: '/fellowship' },
  ],
  primaryCta: { label: 'Register free', href: '#register' },
  footer: [
    { heading: 'Programs', links: [{ label: 'Mastermind', href: '/mastermind' }, { label: 'Bootcamp', href: '/bootcamp' }, { label: 'Accelerator', href: '/accelerator' }, { label: 'Fellowship', href: '/fellowship' }] },
    { heading: 'Company', links: [{ label: 'Contact Us', href: '/contact' }, { label: 'Apply as Mentor', href: '/mentor' }, { label: 'Log in', href: 'https://outskill.com' }] },
    { heading: 'Legal', links: [{ label: 'Terms & Conditions', href: '/terms' }, { label: 'Privacy Policy', href: '/privacy' }, { label: 'Refund Policy', href: '/refunds' }] },
  ],
  hub: {
    headline: 'Pick the program that matches where you are.',
    subhead: 'Answer three questions. Get a practical next step for your AI engineering work.',
    picker: [
      {
        question: 'How much coding experience do you have?',
        options: [
          { label: 'I am new to coding', weights: { mastermind: 2, accelerator: 1 } },
          { label: 'I build software professionally', weights: { bootcamp: 3, accelerator: 2, fellowship: 1 } },
          { label: 'I lead ML or AI systems', weights: { fellowship: 3, accelerator: 2 } },
        ],
      },
      {
        question: 'How many hours can you give each week?',
        options: [
          { label: 'A weekend', weights: { mastermind: 3 } },
          { label: '10–15 hours', weights: { bootcamp: 3, accelerator: 1 } },
          { label: 'A steady long-term block', weights: { fellowship: 3, accelerator: 2 } },
        ],
      },
      {
        question: 'What do you want to do next?',
        options: [
          { label: 'Understand agents', weights: { mastermind: 2, bootcamp: 2 } },
          { label: 'Build and ship AI apps', weights: { bootcamp: 2, accelerator: 3 } },
          { label: 'Develop deep systems expertise', weights: { fellowship: 3, accelerator: 1 } },
        ],
      },
    ],
  },
};

export const programs: Program[] = [mastermind, bootcamp, accelerator, fellowship];
