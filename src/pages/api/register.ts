import type { APIRoute } from 'astro';
import { mkdirSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';

const VALID_PROGRAMS = ['mastermind', 'bootcamp', 'accelerator', 'fellowship'] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATA_DIR = new URL('../../data/', import.meta.url).pathname;
const DATA_FILE = join(DATA_DIR, 'registrations.jsonl');

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('content-type') !== 'application/json') {
    return new Response(JSON.stringify({ ok: false, error: 'Expected JSON' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  let body: { email?: string; program?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const { email, program } = body;

  if (!email || !EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid email' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  if (!program || !VALID_PROGRAMS.includes(program as typeof VALID_PROGRAMS[number])) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid program' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const ua = request.headers.get('user-agent') ?? '';
  const entry = JSON.stringify({ ts: new Date().toISOString(), email, program, ua });

  try {
    mkdirSync(DATA_DIR, { recursive: true });
    appendFileSync(DATA_FILE, entry + '\n', 'utf-8');
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Write failed' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};

export const ALL: APIRoute = async () => {
  return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), {
    status: 405,
    headers: { 'content-type': 'application/json' },
  });
};