import type { ReactNode } from 'react';

// Root layout for "/" only. The static export cannot issue server redirects,
// so the page below forwards to /de/ via meta refresh.
export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body style={{ background: '#14110F', color: '#F3EFEA', fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
