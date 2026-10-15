import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Thomas Weigert · Frontend Engineer',
  metadataBase: new URL(`${SITE_URL}/`),
  robots: { index: false, follow: true },
  alternates: { canonical: '/de/' },
};

export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/de/" />
      <main style={{ padding: '2rem' }}>
        <p>
          <a href="/de/" style={{ color: '#FBBF24' }}>Weiter zur Website</a>
          {' · '}
          <a href="/en/" style={{ color: '#FBBF24' }}>English version</a>
        </p>
      </main>
    </>
  );
}
