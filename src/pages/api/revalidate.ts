import type { APIRoute } from 'astro';
import { clearCache } from '../../lib/cache';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const key = body?.key;
    clearCache(key);
    return new Response(JSON.stringify({ success: true, clearedKey: key || 'all' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
