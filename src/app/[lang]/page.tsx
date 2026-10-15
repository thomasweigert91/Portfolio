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

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { data, ui } = getDictionary(lang);

  return (
    <MotionProvider>
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
          <ExperienceAndSkills lang={lang} data={data} ui={ui} />
          <ContactSection lang={lang} profile={data.profile} ui={ui} />
        </main>

        <Footer lang={lang} name={data.profile.name} location={data.profile.location} ui={ui} />
      </div>
    </MotionProvider>
  );
}
