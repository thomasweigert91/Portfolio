import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { fraunces, jakarta, jetbrains } from '@/lib/fonts';
import { isLocale, locales } from '@/i18n/dictionaries';
import '../globals.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${fraunces.variable} ${jakarta.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <body className="bg-[#14110F] text-[#F3EFEA] font-sans antialiased selection:bg-[#E5983A]/25 selection:text-[#FBBF24] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
