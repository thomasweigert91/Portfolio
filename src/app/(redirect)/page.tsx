import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thomas Weigert · Frontend Engineer',
  robots: { index: false, follow: true },
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
