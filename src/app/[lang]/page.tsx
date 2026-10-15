import { notFound } from 'next/navigation';
import { getDictionary, isLocale } from '@/i18n/dictionaries';
import { MotionProvider } from '@/components/MotionProvider';
import { Navbar } from '@/components/Navbar';
import { HeroStage } from '@/components/HeroStage';
import { ProjectsSection } from '@/components/ProjectsSection';
import { PassionsSection } from '@/components/PassionsSection';
import { ExperienceAndSkills } from '@/components/ExperienceAndSkills';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { absoluteUrl } from '@/lib/site';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { data, ui } = getDictionary(lang);

  // Structured data for search engines. Deliberately no phone number.
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.profile.name,
    jobTitle: data.profile.title,
    url: absoluteUrl(`/${lang}/`),
    image: absoluteUrl(`/${lang}/og-image.png`),
    email: `mailto:${data.profile.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hamburg',
      addressCountry: 'DE',
    },
    sameAs: [data.profile.github, data.profile.linkedin],
    knowsAbout: ['TypeScript', 'React', 'Next.js', 'TanStack Query', 'NestJS'],
  };

  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
      />
      <div className="min-h-screen bg-[#14110F] text-stone-100 selection:bg-amber-500/25 selection:text-amber-300">
        <Navbar lang={lang} name={data.profile.name} ui={ui} />

        <main>
          <HeroStage
            lang={lang}
            name={data.profile.name}
            email={data.profile.email}
            stats={data.profile.stats}
            scenes={data.visualStory}
            ui={ui}
          />
          <ProjectsSection projects={data.projects} ui={ui} />
          <PassionsSection passions={data.passions} ui={ui} />
          <ExperienceAndSkills data={data} ui={ui} />
          <ContactSection lang={lang} profile={data.profile} ui={ui} />
        </main>

        <Footer lang={lang} name={data.profile.name} location={data.profile.location} ui={ui} />
      </div>
    </MotionProvider>
  );
}
