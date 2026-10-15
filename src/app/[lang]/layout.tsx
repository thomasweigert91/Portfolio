import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { fraunces, jakarta, jetbrains } from '@/lib/fonts';
import { getDictionary, isLocale, locales } from '@/i18n/dictionaries';
import { SITE_URL } from '@/lib/site';
import '../globals.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: '#14110F',
  colorScheme: 'dark',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { ui, data } = getDictionary(lang);
  const ogImage = {
    url: `/${lang}/og-image.png`,
    width: 1200,
    height: 630,
    alt: `${data.profile.name}, ${data.profile.title}`,
  };

  return {
    metadataBase: new URL(`${SITE_URL}/`),
    title: ui.meta.title,
    description: ui.meta.description,
    authors: [{ name: data.profile.name, url: SITE_URL }],
    alternates: {
      canonical: `/${lang}/`,
      languages: { de: '/de/', en: '/en/', 'x-default': '/de/' },
    },
    openGraph: {
      type: 'profile',
      url: `/${lang}/`,
      siteName: data.profile.name,
      title: ui.meta.title,
      description: ui.meta.description,
      locale: lang === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: lang === 'de' ? 'en_US' : 'de_DE',
      firstName: 'Thomas',
      lastName: 'Weigert',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: ui.meta.title,
      description: ui.meta.description,
      images: [ogImage],
    },
    icons: { icon: '/favicon.svg' },
  };
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
