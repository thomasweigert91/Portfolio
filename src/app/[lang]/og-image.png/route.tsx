import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { getDictionary, isLocale, locales } from '@/i18n/dictionaries';

// Static route handler instead of the opengraph-image convention, so the export
// gets a real ".png" file that every host serves as image/png.
export const dynamic = 'force-static';
export const dynamicParams = false;

const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const STACK = ['TypeScript', 'React', 'Next.js', 'TanStack Query', 'NestJS'];

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const { data } = getDictionary(isLocale(lang) ? lang : 'de');
  const fontDir = join(process.cwd(), 'src/assets/fonts');
  const [fraunces, mono] = await Promise.all([
    readFile(join(fontDir, 'Fraunces-Bold.ttf')),
    readFile(join(fontDir, 'JetBrainsMono-Medium.ttf')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background:
            'radial-gradient(circle at 78% 18%, rgba(229,152,58,0.28), rgba(20,17,15,0) 55%), linear-gradient(135deg, #1A1613 0%, #14110F 60%, #0F0C0A 100%)',
          color: '#F3EFEA',
          fontFamily: 'JetBrains Mono',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 24, color: '#FCD34D' }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#E5983A' }} />
          <div style={{ display: 'flex' }}>{lang === 'en' ? 'HAMBURG · GERMANY' : 'HAMBURG · DEUTSCHLAND'}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'Fraunces', fontSize: 104, lineHeight: 1.05, color: '#FFFFFF' }}>
            {data.profile.name}
          </div>
          <div style={{ fontFamily: 'Fraunces', fontSize: 56, marginTop: 12, color: '#FCD34D' }}>
            {data.profile.title}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          {STACK.map((item) => (
            <div
              key={item}
              style={{
                display: 'flex',
                padding: '10px 20px',
                borderRadius: 14,
                fontSize: 26,
                color: '#F3EFEA',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(229,152,58,0.45)',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Fraunces', data: fraunces, weight: 700, style: 'normal' },
        { name: 'JetBrains Mono', data: mono, weight: 500, style: 'normal' },
      ],
    },
  );
}
