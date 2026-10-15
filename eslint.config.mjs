import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // The language switch is a deliberate full document navigation between /de/ and /en/
    // (different <html lang>, no RSC prefetch against the static export).
    rules: { '@next/next/no-html-link-for-pages': 'off' },
  },
  globalIgnores(['.next/**', 'out/**', 'dist/**', 'next-env.d.ts', '.agents/**']),
]);
