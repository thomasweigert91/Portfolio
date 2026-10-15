/**
 * Single source of truth for absolute URLs (canonical, Open Graph, sitemap, JSON-LD).
 *
 * TODO (11/2026): Switch to the own domain. Buy https://thomasweigert.dev, connect it in
 * Vercel and set NEXT_PUBLIC_SITE_URL=https://thomasweigert.dev. No code change needed.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-lovat-mu-44.vercel.app'
).replace(/\/+$/, '');

export const absoluteUrl = (path = '/') => new URL(path, `${SITE_URL}/`).toString();
