export type Language = 'de' | 'en';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  period: string;
  role: string;
  client: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  /** Only real, publicly reachable URLs. */
  liveUrl?: string;
  githubUrl?: string;
  /** Contact link for projects that cannot be shown publicly. */
  inquiryUrl?: string;
  /** Client project under NDA: no public demo or code. */
  nda?: boolean;
  /** Optional heading for the highlight list (e.g. "My contribution"). */
  highlightsTitle?: string;
  highlights: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface PassionItem {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

export interface VisualStoryScene {
  id: string;
  sceneNumber: string;
  sceneName: string;
  heading: string;
  subheading: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  visualNote: string;
  imagePlate: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    title: string;
    subtitle: string;
    /** Concrete value proposition shown on the first screen. */
    valueProp: string;
    headline: string;
    subheadline: string;
    bio: string;
    status: string;
    location: string;
    email: string;
    linkedin: string;
    github: string;
    stats: { label: string; value: string }[];
  };
  passions: PassionItem[];
  visualStory: VisualStoryScene[];
  projects: ProjectItem[];
  referenceLetter: {
    author: string;
    role: string;
    company: string;
    location: string;
    quote: string;
    badge: string;
  };
  experience: ExperienceItem[];
  education: {
    period: string;
    title: string;
    institution: string;
    location: string;
  }[];
  skillCategories: SkillCategory[];
  languages: {
    language: string;
    level: string;
    desc: string;
    isNative?: boolean;
  }[];
}

export const uiTranslations: Record<Language, {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    story: string;
    projects: string;
    passions: string;
    experience: string;
    contact: string;
    downloadCv: string;
  };
  motion: {
    static: string;
    motion: string;
    title: string;
    reducedNotice: string;
    enableMotion: string;
  };
  projects: {
    badge: string;
    titlePart1: string;
    titleHighlight: string;
    description: string;
    detailsButton: string;
    modalOverview: string;
    modalMilestones: string;
    modalTech: string;
    modalRole: string;
    modalClose: string;
    inquiryButton: string;
    liveButton: string;
    codeButton: string;
    ndaNotice: string;
  };
  passions: {
    badge: string;
    titlePart1: string;
    titleHighlight: string;
    description: string;
  };
  experience: {
    badge: string;
    titlePart1: string;
    titleHighlight: string;
    educationTitle: string;
    skillsBadge: string;
    skillsTitle: string;
    languagesTitle: string;
    languagesSubtitle: string;
  };
  contact: {
    badge: string;
    titlePart1: string;
    titleHighlight: string;
    description: string;
    emailLabel: string;
    profilesLabel: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailFormLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    subjectOptions: { value: string; label: string }[];
    messageLabel: string;
    messagePlaceholder: string;
    charsLabel: string;
    submitButton: string;
    submitting: string;
    directNotice: string;
    submittedTitle: string;
    submittedText: string;
    draftPreview: string;
    resetButton: string;
    successTitle: string;
    successText: string;
    errorGeneric: string;
    sendAnother: string;
    openInEmailClient: string;
    retryButton: string;
    errors: {
      name: string;
      email: string;
      subject: string;
      message: string;
    };
  };
  footer: {
    backToTop: string;
    copyright: string;
    location: string;
  };
  hero: {
    loading: string;
    scrollHint: string;
    trans1: string;
    trans2: string;
  };
}> = {
  de: {
    meta: {
      title: "Thomas Weigert · Frontend Engineer | React, Next.js & TypeScript",
      description: "Thomas Weigert, Frontend Engineer in Hamburg: schnelle, wartbare Web-Apps mit React, Next.js und TypeScript, von datenlastigen Admin-Plattformen bis zur KI-Integration. Offen für Festanstellung & Freelance-Projekte."
    },
    nav: {
      story: "Story",
      projects: "Projekte",
      passions: "Werte & Leidenschaften",
      experience: "Werdegang & Skills",
      contact: "Kontakt",
      downloadCv: "CV Download"
    },
    motion: {
      static: "Modus: Statisch",
      motion: "60 FPS Motion",
      title: "Zwischen 60FPS Bewegung und statischem Lesemodus wechseln",
      reducedNotice: "Modus für reduzierte Bewegung aktiv: Statische Leseansicht",
      enableMotion: "60 FPS Scroll-Motion aktivieren"
    },
    projects: {
      badge: "Ausgewählte Praxisprojekte",
      titlePart1: "Architektur, die ",
      titleHighlight: "Zuverlässigkeit beweist",
      description: "Ein aktuelles Teamprojekt mit offenem Code und produktive Kundenanwendungen aus meiner Praxis bei melting elements: von geschäftskritischen bAV-Verwaltungssystemen bis hin zu Greenfield-Apps mit Next.js für Energiekonzerne.",
      detailsButton: "Details ansehen",
      modalOverview: "Projektübersicht & Kontext",
      modalMilestones: "Technische Meilensteine & Kernleistungen",
      modalTech: "Eingesetzte Technologien & Werkzeuge",
      modalRole: "Rolle:",
      modalClose: "Schließen",
      inquiryButton: "Projekt anfragen",
      liveButton: "Live ansehen",
      codeButton: "Code auf GitHub",
      ndaNotice: "Kundenprojekt unter NDA, Details im Gespräch"
    },
    passions: {
      badge: "Persönlichkeit & Werte",
      titlePart1: "Was mich antreibt: ",
      titleHighlight: "neben dem Code",
      description: "Großartige Software wird von Menschen für Menschen geschrieben. Meine Leidenschaften außerhalb des Terminals prägen meine Arbeitsweise als Entwickler maßgeblich:"
    },
    experience: {
      badge: "Berufserfahrung",
      titlePart1: "Vom Bankkaufmann zum ",
      titleHighlight: "Frontend Engineer",
      educationTitle: "Ausbildung & Weiterbildung",
      skillsBadge: "Technisches Repertoire",
      skillsTitle: "Fundiertes Technologie-Set",
      languagesTitle: "Sprachkenntnisse",
      languagesSubtitle: "Verhandlungssicher im technischen Alltag"
    },
    contact: {
      badge: "Kontakt",
      titlePart1: "Lass uns ins ",
      titleHighlight: "Gespräch kommen",
      description: "Ob Festanstellung als Frontend Engineer, ein Freelance-Projekt mit React & TypeScript oder ein Kennenlernen bei einem Kaffee: Ich freue mich auf Ihre Nachricht.",
      emailLabel: "E-Mail-Adresse:",
      profilesLabel: "Profile & Netzwerke",
      formTitle: "Kontaktformular",
      formSubtitle: "Direkte Anfrage für Festanstellung, Freelance-Projekte oder Austausch.",
      nameLabel: "Ihr Name *",
      namePlaceholder: "z. B. Julia Schneider",
      emailFormLabel: "Ihre E-Mail-Adresse *",
      emailPlaceholder: "julia@unternehmen.de",
      subjectLabel: "Anlass *",
      subjectPlaceholder: "Bitte wählen",
      subjectOptions: [
        { value: "fulltime", label: "Festanstellung" },
        { value: "freelance", label: "Freelance-Projekt" },
        { value: "exchange", label: "Austausch" }
      ],
      messageLabel: "Ihre Nachricht *",
      messagePlaceholder: "Beschreiben Sie kurz Ihr Projekt, die Position oder Ihr Anliegen...",
      charsLabel: "Zeichen",
      submitButton: "Nachricht absenden",
      submitting: "Wird übertragen...",
      directNotice: "* Direkter Kontakt zu Thomas Weigert",
      submittedTitle: "Nachricht vorbereitet!",
      submittedText: "In der Live-Version leitet dieses Formular direkt an mein Postfach weiter. Sie können mir auch jederzeit direkt eine E-Mail schreiben:",
      draftPreview: "Vorbereiteter Entwurf:",
      resetButton: "Neuen Entwurf starten",
      successTitle: "Nachricht erfolgreich versendet!",
      successText: "Vielen Dank für Ihre Nachricht. Sie wurde direkt an mein Postfach weitergeleitet. Ich melde mich zeitnah bei Ihnen.",
      errorGeneric: "Leider gab es ein Problem bei der Übertragung. Bitte versuchen Sie es erneut oder kontaktieren Sie mich direkt per E-Mail.",
      sendAnother: "Weitere Nachricht senden",
      openInEmailClient: "Im E-Mail-Programm öffnen",
      retryButton: "Erneut versuchen",
      errors: {
        name: "Bitte geben Sie Ihren Namen ein",
        email: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
        subject: "Bitte wählen Sie einen Anlass",
        message: "Bitte schreiben Sie mindestens 10 Zeichen"
      }
    },
    footer: {
      backToTop: "Nach oben",
      copyright: "Thomas Weigert. Entwickelt mit Leidenschaft für Code, Natur & gutes Handwerk.",
      location: "Hamburg (Henstedt-Ulzburg)"
    },
    hero: {
      loading: "LADE BÜHNE & HANDWERKSWELT...",
      scrollHint: "Werdegang & Projekte erkunden",
      trans1: "Aus der Ruhe des Waldes zur Präzision des Codes",
      trans2: "Abenddämmerung, Wärme und Verlässlichkeit"
    }
  },
  en: {
    meta: {
      title: "Thomas Weigert · Frontend Engineer | React, Next.js & TypeScript",
      description: "Thomas Weigert, frontend engineer in Hamburg: fast, maintainable web apps with React, Next.js and TypeScript, from data-heavy admin platforms to AI integration. Open to full-time roles & freelance projects."
    },
    nav: {
      story: "Story",
      projects: "Projects",
      passions: "Values & Passions",
      experience: "Career & Skills",
      contact: "Contact",
      downloadCv: "Download CV"
    },
    motion: {
      static: "Mode: Static",
      motion: "60 FPS Motion",
      title: "Toggle between 60FPS motion and static reading mode",
      reducedNotice: "Reduced motion mode active: Static reading view",
      enableMotion: "Enable 60 FPS scroll motion"
    },
    projects: {
      badge: "Selected Real-World Projects",
      titlePart1: "Architecture that proves ",
      titleHighlight: "reliability in production",
      description: "A current team project with open source code, plus production customer applications from my work at melting elements: from mission-critical pension administration systems to greenfield Next.js apps for energy corporations.",
      detailsButton: "View details",
      modalOverview: "Project Overview & Context",
      modalMilestones: "Technical Milestones & Core Achievements",
      modalTech: "Technologies & Tools Used",
      modalRole: "Role:",
      modalClose: "Close",
      inquiryButton: "Ask about this project",
      liveButton: "View live",
      codeButton: "Code on GitHub",
      ndaNotice: "Client project under NDA, details on request"
    },
    passions: {
      badge: "Personality & Values",
      titlePart1: "What drives me: ",
      titleHighlight: "beyond the code",
      description: "Great software is written by people for people. My passions outside the terminal fundamentally shape how I work as an engineer:"
    },
    experience: {
      badge: "Career & Journey",
      titlePart1: "From Banking Specialist to ",
      titleHighlight: "Frontend Engineer",
      educationTitle: "Education & Advanced Training",
      skillsBadge: "Technical Repertoire",
      skillsTitle: "Core Technology Stack",
      languagesTitle: "Languages",
      languagesSubtitle: "Proficient in international engineering environments"
    },
    contact: {
      badge: "Contact",
      titlePart1: "Let’s start a ",
      titleHighlight: "conversation",
      description: "Whether it is a full-time frontend role, a freelance project with React & TypeScript, or just a coffee chat: I look forward to hearing from you.",
      emailLabel: "Email Address:",
      profilesLabel: "Profiles & Networks",
      formTitle: "Direct Contact Form",
      formSubtitle: "Inquiries about full-time roles, freelance projects, or just connecting.",
      nameLabel: "Your Name *",
      namePlaceholder: "e.g. Sarah Jenkins",
      emailFormLabel: "Your Email Address *",
      emailPlaceholder: "sarah@company.com",
      subjectLabel: "Topic *",
      subjectPlaceholder: "Please choose",
      subjectOptions: [
        { value: "fulltime", label: "Full-time role" },
        { value: "freelance", label: "Freelance project" },
        { value: "exchange", label: "Just connect" }
      ],
      messageLabel: "Your Message *",
      messagePlaceholder: "Briefly share your project goals, role description, or inquiry...",
      charsLabel: "characters",
      submitButton: "Send Message",
      submitting: "Transmitting...",
      directNotice: "* Direct communication with Thomas Weigert",
      submittedTitle: "Message Prepared!",
      submittedText: "In production, this forwards directly to my personal inbox. You can also reach out via email anytime:",
      draftPreview: "Prepared Draft Payload:",
      resetButton: "Start new draft",
      successTitle: "Message sent successfully!",
      successText: "Thank you for reaching out. Your message was delivered directly to my inbox. I will get back to you shortly.",
      errorGeneric: "An error occurred while sending the message. Please try again or reach out directly via email.",
      sendAnother: "Send another message",
      openInEmailClient: "Open in email client",
      retryButton: "Try again",
      errors: {
        name: "Please enter your name",
        email: "Please provide a valid email address",
        subject: "Please choose a topic",
        message: "Please write at least 10 characters"
      }
    },
    footer: {
      backToTop: "Back to top",
      copyright: "Thomas Weigert. Built with passion for code, nature, and genuine craftsmanship.",
      location: "Hamburg (Henstedt-Ulzburg), Germany"
    },
    hero: {
      loading: "INITIALIZING CINEMATIC STAGE...",
      scrollHint: "Explore journey & selected works",
      trans1: "From the calm of the woods to the precision of code",
      trans2: "Twilight warmth, trust and reliability"
    }
  }
};

export const portfolioDataDE: PortfolioData = {
  profile: {
    name: "Thomas Weigert",
    title: "Frontend Engineer",
    subtitle: "TypeScript • React • Next.js • TanStack Query • NestJS • KI-Integration",
    valueProp: "Ich baue schnelle, wartbare Web-Apps mit React, Next.js und TypeScript, von datenlastigen Admin-Plattformen bis zur KI-Integration.",
    headline: "Ehrliches Handwerk, durchdachter Code und ein Gespür für das Wesentliche.",
    subheadline: "Frontend Engineer aus Henstedt-Ulzburg (bei Hamburg). Ich verbinde über 3 Jahre Praxiserfahrung in moderner Monorepo-Webentwicklung mit 8 Jahren analytischer Präzision aus dem Finanzsektor.",
    bio: "Ich entwickle und skaliere moderne Webanwendungen mit Fokus auf saubere Architektur, intuitive Bedienbarkeit und spürbare Performance. Wenn ich nicht am Rechner sitze, verbringe ich Zeit in der Natur mit meinen Hunden, höre handgemachte Country-Musik oder stehe mit Leidenschaft in der Küche. Acht Jahre in der Finanzbranche (Bank, Baufinanzierung) und drei Jahre Frontend für die betriebliche Altersvorsorge: Für Projekte in Fintech, Banken und Versicherungen bringe ich das fachliche Verständnis gleich mit.",
    status: "Offen für Festanstellung & Freelance-Projekte",
    location: "Hamburg (Henstedt-Ulzburg) · vor Ort & Remote",
    email: "thomasweigert91@gmail.com",
    linkedin: "https://linkedin.com/in/thomas-weigert-frontend/",
    github: "https://github.com/thomasweigert91",
    stats: [
      { label: "Jahre Frontend-Praxis", value: "3+" },
      { label: "Finanz- & Beratungserfahrung", value: "8 Jahre" },
      { label: "schneller: Tabellen & Suche", value: "~3 s" },
      { label: "Produktivanwendungen", value: "5" }
    ]
  },

  passions: [
    {
      icon: "Trees",
      title: "Natur & Entschleunigung",
      subtitle: "Henstedt-Ulzburg & Hamburger Umland",
      description: "Ausgedehnte Runden durch Wald, Heide und die Weite des Nordens. Hier entsteht die innere Ruhe und Klarheit, um auch vertrackte architekturelle Herausforderungen im Code gelassen zu durchdringen.",
      tag: "Erholung & Fokus"
    },
    {
      icon: "Dog",
      title: "Meine Hunde",
      subtitle: "Tägliche Begleiter & Erdung",
      description: "Verlässlichkeit, ungeteilte Aufmerksamkeit und tägliche Bewegung bei Wind und Wetter. Sie erinnern mich daran, dass Beständigkeit und Empathie das Fundament für jedes gute Miteinander bilden.",
      tag: "Verlässlichkeit"
    },
    {
      icon: "Music",
      title: "Country-Musik & Akustik",
      subtitle: "Echte Geschichten & handgemachter Klang",
      description: "Ob fingergepickte Akustikgitarre oder mitreißende Country-Balladen: Ich liebe Musik, die ungeschminkt ist und etwas erzählt. Genau wie sauberer Code: kein überflüssiger Zierrat, sondern Substanz.",
      tag: "Authentizität"
    },
    {
      icon: "UtensilsCrossed",
      title: "Kochen & Kulinarik",
      subtitle: "Mise en Place & Präzision am Herd",
      description: "Gute Gerichte verlangen erstklassige Grundzutaten, Geduld beim Reduzieren und perfekte Abstimmung im Zeitfenster. Dieses Prinzip übertrage ich 1:1 auf State-Management und modulare UIs.",
      tag: "Handwerk & Timing"
    },
    {
      icon: "Landmark",
      title: "8 Jahre Finanzerfahrung",
      subtitle: "Sparkasse, McMakler, Finanzcheck",
      description: "Vom Bankkaufmann zum Baufinanzierungsberater: Ich verstehe Zahlen, geschäftskritische Prozesse, regulatorische Anforderungen und echte Endkundenängste. Ich baue Software nicht im Elfenbeinturm.",
      tag: "Analytische Stärke"
    }
  ],

  visualStory: [
    {
      id: "scene-1",
      sceneNumber: "01",
      sceneName: "Fokus & Fundament",
      heading: "Moderne Frontend-Entwicklung mit Fokus auf Qualität, Performance und Verlässlichkeit.",
      subheading: "Thomas Weigert · Frontend Engineer (React · TypeScript · Next.js) aus Hamburg (Henstedt-Ulzburg).",
      description: "Ich entwickle nutzerzentrierte, performante Webanwendungen mit klaren Architekturen und sauberem Code. Geprägt durch fundierte Praxiserfahrung in anspruchsvollen Enterprise-Projekten und einen geschulten Blick für wirtschaftliche Zusammenhänge.",
      ctaText: "Projekte ansehen",
      ctaHref: "#projects",
      secondaryCtaText: "CV herunterladen",
      secondaryCtaHref: "/CV_Thomas_Weigert.pdf",
      visualNote: "Inspirierender Arbeitsplatz auf der Holzterrasse der Waldhütte mit sonnendurchflutetem Wald, Holztisch, Laptop und dampfendem Kaffee.",
      imagePlate: "/assets/scene1.jpg"
    },
    {
      id: "scene-2",
      sceneNumber: "02",
      sceneName: "Präzision & Handwerk",
      heading: "Präzision im Detail, Weitsicht in der Architektur.",
      subheading: "Analytische Disziplin trifft auf moderne Web-Technologien und durchdachte User Experience.",
      description: "Gute Software entsteht an der Schnittstelle von technischer Exzellenz und echtem Produktverständnis. Aus meinem kaufmännischen Hintergrund bringe ich ein tiefes Gespür für Zahlen, Prozesse und Benutzerfreundlichkeit mit – und übersetze komplexe Anforderungen in intuitive, langlebige Oberflächen. Acht Jahre in der Finanzbranche (Bank, Baufinanzierung) und drei Jahre Frontend für die betriebliche Altersvorsorge: Für Projekte in Fintech, Banken und Versicherungen bringe ich das fachliche Verständnis gleich mit.",
      ctaText: "Echte Praxisprojekte ansehen",
      ctaHref: "#projects",
      secondaryCtaText: "Tech-Stack & Skills",
      secondaryCtaHref: "#experience",
      visualNote: "Thomas in der rustikalen Holzküche beim Kochen und Kräuterschneiden, Laptop mit Code auf der Anrichte.",
      imagePlate: "/assets/scene2.jpg"
    },
    {
      id: "scene-3",
      sceneNumber: "03",
      sceneName: "Verlässlichkeit & Ankommen",
      heading: "Bereit für anspruchsvolle Teams, Rollen und Projekte.",
      subheading: "Offen für Festanstellung als Frontend Engineer und für Freelance-Projekte (Remote / Hybrid in Hamburg & Umgebung).",
      description: "Sie suchen einen Frontend Engineer für Ihr Team oder Unterstützung bei einem konkreten Projekt? Ich denke eigenverantwortlich, schreibe sauberen, wartbaren Code und schätze echte Teamarbeit. Ich freue mich auf den Austausch mit Ihnen.",
      ctaText: "Rolle oder Projekt besprechen",
      ctaHref: "#contact",
      secondaryCtaText: "thomasweigert91@gmail.com",
      secondaryCtaHref: "mailto:thomasweigert91@gmail.com",
      visualNote: "Gemütliche Abendstimmung am knisternden Kaminfeuer mit den beiden friedlich schlafenden Hunden.",
      imagePlate: "/assets/scene3.jpg"
    }
  ],

  projects: [
    {
      id: "gitspore",
      title: "GitSpore",
      category: "Teamprojekt / Weiterbildung (Capstone)",
      period: "10/2026",
      role: "Entwickler im 3er-Team",
      client: "Capstone-Projekt · Team aus 3 Personen",
      image: "/assets/proj-gitspore.jpg",
      shortDesc: "Interaktives 3D-Gewächshaus zur Visualisierung und Steuerung von KI-Coding-Agenten und Git-Worktrees. Next.js + React Three Fiber, NestJS-Daemon, npm-Workspaces-Monorepo.",
      fullDesc: "GitSpore macht KI-Coding-Agenten und ihre Git-Worktrees als interaktives 3D-Gewächshaus sichtbar und steuerbar. Das Frontend basiert auf Next.js und React Three Fiber, ein NestJS-Daemon liefert den Zustand in Echtzeit; beides lebt in einem npm-Workspaces-Monorepo. Entstanden als Capstone-Projekt meiner Weiterbildung im Team aus drei Personen.",
      metrics: [
        { label: "Team", value: "3 Personen" },
        { label: "Projektart", value: "Capstone" },
        { label: "Tests", value: "Jest" }
      ],
      tags: ["Next.js", "React Three Fiber", "NestJS", "TypeScript", "WebSocket", "Zustand", "Jest", "npm Workspaces"],
      githubUrl: "https://github.com/gitspore/gitspore",
      highlightsTitle: "Mein Beitrag",
      highlights: [
        "Monorepo- und CI-Setup (npm Workspaces)",
        "Gemeinsamer Typ-Vertrag zwischen Daemon und Frontend",
        "Sicherheitsschicht des Daemons: Session-Token-Auth, Origin- und Host-Prüfung im WebSocket-Handshake, State-Gateway mit Snapshot beim Verbinden",
        "Echtzeit-Datenschicht im Frontend: typisiertes Client-Interface, Socket-Client, Mock-Client mit Szenario-Player und Fake-Clock für die Entwicklung ohne Daemon, Zustand-Store mit Selektoren und Verbindungsstatus",
        "Alle Bausteine mit Jest-Tests abgesichert"
      ]
    },
    {
      id: "bav-admin-tool",
      title: "Admin-Tool für betriebliche Altersvorsorge",
      category: "Verwaltungsplattform & Bestandsanwendung",
      period: "08/2023 - 04/2026",
      role: "Frontend Engineer",
      client: "Kundenanwendung zur betrieblichen Altersvorsorge",
      image: "/assets/proj-admin-de.jpg",
      shortDesc: "Geschäftskritische Verwaltungssoftware: Gezieltes Refactoring der historisch gewachsenen Codebase und ~3 s schnellere Datentabellen durch intelligentes TanStack Query Prefetching.",
      fullDesc: "Eigenständige Betreuung und Weiterentwicklung der Frontend-Architektur für eine geschäftskritische bAV-Verwaltungssoftware auf reiner React- und TypeScript-Basis innerhalb des zentralen Nx-Monorepos. Gezieltes Refactoring und schrittweise Modernisierung gewachsener Legacy-Strukturen unter Beibehaltung höchster Ausfall- und Betriebsstabilität. Durch Einführung von intelligentem Prefetching und clientseitigem Caching mit TanStack Query wurden Datentabellen und Suchfunktionen ~3 s schneller. Begleitung von Produktiv-Deployments und Hotfixes im Live-Betrieb.",
      metrics: [
        { label: "Tabellen & Suche", value: "~3 s schneller" },
        { label: "Deployment & Hotfixes", value: "Live-Betrieb" },
        { label: "Architektur", value: "React & Nx" }
      ],
      tags: ["React.js", "TypeScript", "TanStack Query", "Nx Monorepo", "REST APIs", "CSS", "Scrum"],
      nda: true,
      inquiryUrl: "mailto:thomasweigert91@gmail.com?subject=Anfrage%20bAV%20Admin-Tool",
      highlights: [
        "Eigenständige Betreuung und Weiterentwicklung der Frontend-Architektur auf reiner React-Basis",
        "Legacy-Modernisierung und gezieltes Refactoring gewachsener Codebases bei durchgehend hoher Betriebsstabilität",
        "Performance-Optimierung: Datentabellen und Suchfunktionen ~3 s schneller durch intelligentes Prefetching und Caching mit TanStack Query",
        "End-to-End-Begleitung von Produktiv-Deployments sowie zügige Diagnose und Behebung von Hotfixes im Live-Betrieb"
      ]
    },
    {
      id: "mobile-onboarding-hr",
      title: "Mobile Onboarding-Anwendung und HR-Dashboard",
      category: "Greenfield Mobile & Web",
      period: "06/2023 - 07/2025",
      role: "Frontend Engineer",
      client: "Energiekonzern",
      image: "/assets/proj-onboarding-de.jpg",
      shortDesc: "Greenfield-Architektur mit Next.js: Mobile Onboarding-App für neue Mitarbeiter gepaart mit einem datenintensiven HR-Dashboard, Auth.js, Zustand und GraphQL.",
      fullDesc: "Ganzheitliche Konzeption und Implementierung einer mobilen Mitarbeiter-Onboarding-App sowie des dazugehörigen Administrations-Dashboards von Grund auf (Greenfield) für einen großen Energiekonzern unter Einsatz von Next.js, React und TypeScript im Nx-Monorepo. Aufbau einer intuitiven, fehlertoleranten Benutzerführung mit typsicherer Validierung komplexer Formulare mittels React Hook Form und Zod. Implementierung eines schlanken, reaktiven globalen State Managements via Zustand und Integration sicherer Login- und Rollenstrukturen über Auth.js. Schnittstellendesign und optimierter Datenabruf via GraphQL in enger Abstimmung mit dem Backend-Team sowie partnerschaftliche UX-Umsetzung mit Product Ownern.",
      metrics: [
        { label: "Projektart", value: "Greenfield" },
        { label: "Technologie", value: "Next.js & GraphQL" },
        { label: "State & Auth", value: "Zustand & Auth.js" }
      ],
      tags: ["Next.js", "React.js", "TypeScript", "GraphQL", "Zustand", "Auth.js", "React Hook Form", "Zod", "Nx Monorepo", "Responsive CSS"],
      nda: true,
      inquiryUrl: "mailto:thomasweigert91@gmail.com?subject=Anfrage%20Mobile%20Onboarding%20App",
      highlights: [
        "Architektur und Neuaufbau der mobilen Onboarding-App sowie des HR-Dashboards von Grund auf mit Next.js",
        "Aufbau komplexer, wiederverwendbarer UI-Workflows mit typsicherer Validierung mittels React Hook Form und Zod",
        "Etablierung eines schlanken globalen Statusflusses via Zustand und Integration sicherer Login-Prozesse über Auth.js",
        "Cross-funktionale Zusammenarbeit: GraphQL-Schnittstellendesign in enger Abstimmung mit dem Backend-Team und partnerschaftliche Umsetzung mit UI/UX und POs"
      ]
    },
    {
      id: "vorsorgeportale",
      title: "Vorsorgeportale für betriebliche Altersvorsorge",
      category: "Kundenportal",
      period: "08/2023 - 04/2026",
      role: "Frontend Engineer",
      client: "Kundenportale zur betrieblichen Altersvorsorge",
      image: "/assets/proj-portals-de.jpg",
      shortDesc: "Fortlaufende Weiterentwicklung zweier hochfrequentierter Kundenportale: Modulare UI/UX-Modernisierung hin zu barrierearmen, voll responsiven Komponenten.",
      fullDesc: "Fortlaufende Betreuung, Skalierung und funktionale Erweiterung von zwei geschäftskritischen, hochfrequentierten Kundenanwendungen zur betrieblichen Altersvorsorge. Überarbeitung bestehender Frontend-Strukturen auf React-Basis hin zu barrierearmen, voll responsiven und modularen Komponenten. Technische Ausgestaltung neuer Fachmodule von der initialen Stakeholder-Abstimmung bis zum stabilen Produktivgang im agilen Scrum-Setup.",
      metrics: [
        { label: "Kundenportale", value: "2 Plattformen" },
        { label: "Fokus", value: "Barrierearmut" },
        { label: "Komponenten", value: "Modular & Responsiv" }
      ],
      tags: ["React.js", "TypeScript", "Nx Monorepo", "Modular Components", "Accessibility (a11y)", "Responsive CSS", "Scrum"],
      nda: true,
      inquiryUrl: "mailto:thomasweigert91@gmail.com?subject=Anfrage%20Vorsorgeportale",
      highlights: [
        "Fortlaufende Weiterentwicklung und funktionale Erweiterung von zwei hochfrequentierten Kundenanwendungen",
        "UI/UX-Modernisierung: Überarbeitung bestehender Frontend-Strukturen hin zu barrierearmen, voll responsiven und modularen Komponenten",
        "End-to-End-Umsetzung: Technische Ausgestaltung neuer Fachmodule von der initialen Stakeholder-Abstimmung bis zum stabilen Produktivgang"
      ]
    }
  ],

  referenceLetter: {
    author: "Tino Schulze",
    role: "Geschäftsführer",
    company: "Melting Experience GmbH / melting elements gmbh",
    location: "Schulterblatt 36, 20357 Hamburg",
    quote: "Die ihm übertragenen Aufgaben erfüllte Thomas Weigert stets äußerst zuverlässig, sorgfältig und termingerecht mit konstant gutem bis sehr gutem Ergebnis. Auch unter hoher Arbeitsbelastung und Zeitdruck behielt er stets den Überblick und verstand es, Prioritäten sinnvoll und richtig zu setzen. Er identifizierte sich in hohem Maße mit seinen Aufgaben und erledigte diese stets mit hohem Verantwortungsbewusstsein, Effizienz und persönlichem Engagement.",
    badge: "Arbeitszeugnis"
  },

  experience: [
    {
      period: "04/2023 - 04/2026",
      role: "Frontend Engineer",
      company: "melting elements gmbh / Melting Experience GmbH",
      location: "Hamburg, Deutschland",
      description: "Parallele Entwicklung, Skalierung und Wartung mehrerer Kundenanwendungen innerhalb eines zentralen Nx-Monorepos unter Einsatz von React, Next.js und TypeScript.",
      achievements: [
        "Architektur & Multiprojekt-Entwicklung: Parallele Entwicklung, Skalierung und Wartung mehrerer Kundenanwendungen innerhalb eines Nx-Monorepos unter Einsatz von React, Next.js und TypeScript",
        "API-Integration & Caching: Anbindung und Orchestrierung komplexer Backend-Schnittstellen via REST und GraphQL; nachhaltige Optimierung des clientseitigen Datenflusses mit TanStack Query",
        "Modernisierung & Refactoring: Gezielte Modernisierung gewachsener Legacy-Codebases zur signifikanten Steigerung von Performance, Wartbarkeit und Code-Qualität",
        "Agile Zusammenarbeit & Mentoring: Enge Abstimmung mit POs, UI/UX und Backend im Scrum-Setup; Durchführung fundierter Code Reviews und fachliche Unterstützung von Backend-Entwicklern bei Frontend-Themen"
      ],
      skills: ["React.js", "Next.js", "TypeScript", "Nx Monorepo", "TanStack Query", "GraphQL", "REST", "Scrum"]
    },
    {
      period: "01/2021 - 07/2022",
      role: "Immobilienfinanzierer",
      company: "McMakler",
      location: "Hamburg, Deutschland",
      description: "Ganzheitliche Strukturierung maßgeschneiderter Baufinanzierungen für anspruchsvolle Privatkunden.",
      achievements: [
        "Bedarfsgerechte Entwicklung individueller Finanzierungskonzepte",
        "Eigenverantwortliche Verhandlung komplexer Kreditstrukturen mit Bank- und Finanzierungspartnern bis zum Abschluss"
      ],
      skills: ["Finanzierungsstrukturierung", "Verhandlungsführung", "Analytische Bonitätsprüfung", "Kundenberatung"]
    },
    {
      period: "11/2015 - 06/2020",
      role: "Privatkredit Berater",
      company: "Finanzcheck, Smava",
      location: "Hamburg, Deutschland",
      description: "End-to-End-Kreditberatung für Privatkunden inklusive detaillierter Bedarfs- und Bonitätsanalysen.",
      achievements: [
        "Datenbasierte Selektion marktgerechter Kreditangebote",
        "Abschlussorientierte, verlässliche Begleitung durch den gesamten Vermittlungsprozess"
      ],
      skills: ["Datenbasierte Kreditanalyse", "Prozessoptimierung", "Kundenkommunikation"]
    },
    {
      period: "02/2013 - 10/2015",
      role: "Bankkaufmann (Ausbildung 08/2010 - 02/2013)",
      company: "Sparkasse Stade-Altes Land",
      location: "Stade, Deutschland",
      description: "Ganzheitliche Kundenberatung zu Spar-, Anlage- und Vorsorgeprodukten sowie Abwicklung des täglichen Bankgeschäfts.",
      achievements: [
        "Erfolgreich abgeschlossene Ausbildung zum Bankkaufmann (IHK)",
        "Fundierte kaufmännische und vertragliche Grundlagen, die bis heute mein Verständnis für Fintech und Business-Logik prägen"
      ],
      skills: ["Bankbetriebslehre", "Finanzprodukte", "Vertragsrecht", "Präzision"]
    }
  ],

  education: [
    {
      period: "07/2026 - Aktuell",
      title: "Advanced Software Development",
      institution: "neuefische GmbH - School and Pool for Digital Talent",
      location: "Remote"
    },
    {
      period: "10/2022 - 01/2023",
      title: "Web Development Bootcamp",
      institution: "neuefische GmbH - School and Pool for Digital Talent",
      location: "Remote"
    },
    {
      period: "08/2010 - 02/2013",
      title: "Ausbildung zum Bankkaufmann",
      institution: "Sparkasse Stade-Altes Land",
      location: "Stade, Deutschland"
    },
    {
      period: "07/2007 - 05/2010",
      title: "Fachabitur Wirtschaft",
      institution: "BBS 2 Stade",
      location: "Stade, Deutschland"
    }
  ],

  skillCategories: [
    {
      title: "Frontend Kern-Stack",
      skills: ["TypeScript", "JavaScript", "React.js", "Next.js", "TanStack Query", "TanStack Router", "Zustand", "Framer Motion", "React Hook Form", "Zod", "HTML5 & CSS3"]
    },
    {
      title: "Backend & Schnittstellen",
      skills: ["Node.js", "Express", "REST APIs", "GraphQL", "NestJS", "SQLite", "PostgreSQL", "Drizzle ORM", "TypeORM"]
    },
    {
      title: "Architektur & Methoden",
      skills: ["Nx (Monorepo)", "Component-based Architecture", "Clean Code", "Scrum / Agile", "Responsive Design", "Barrierearmut (a11y)", "Code Reviews & Mentoring"]
    },
    {
      title: "Tools, DevOps & Testing",
      skills: ["Git & GitHub", "Vite", "npm / Bun", "ESLint", "Docker", "GitHub Actions", "Vercel", "Bitbucket", "Jest"]
    },
    {
      title: "AI & moderne Workflows",
      skills: ["Agentic Coding", "Claude Code", "GitHub Copilot", "LLM Integration"]
    }
  ],

  languages: [
    { language: "Deutsch", level: "Muttersprachler", desc: "Erstsprache", isNative: true },
    { language: "Englisch", level: "Versiert", desc: "Technischer Arbeitsalltag", isNative: false }
  ]
};

export const portfolioDataEN: PortfolioData = {
  profile: {
    name: "Thomas Weigert",
    title: "Frontend Engineer",
    subtitle: "TypeScript • React • Next.js • TanStack Query • NestJS • AI Integration",
    valueProp: "I build fast, maintainable web apps with React, Next.js and TypeScript, from data-heavy admin platforms to AI integration.",
    headline: "Honest craftsmanship, thoughtful code, and an eye for the essential.",
    subheadline: "Frontend Engineer based in Henstedt-Ulzburg (near Hamburg, Germany). Combining over 3 years of hands-on experience in modern monorepo web development with 8 years of analytical precision from the financial sector.",
    bio: "I build and scale modern web applications focused on clean architecture, intuitive usability, and tangible performance. Away from the terminal, I spend time in nature with my dogs, listen to acoustic country music, or cook with passion. Eight years in financial services (banking, mortgage lending) and three years of frontend work for company pension platforms: for fintech, banking and insurance projects, I bring the domain knowledge with me.",
    status: "Open to full-time roles & freelance projects",
    location: "Hamburg (Henstedt-Ulzburg) · on-site & remote",
    email: "thomasweigert91@gmail.com",
    linkedin: "https://linkedin.com/in/thomas-weigert-frontend/",
    github: "https://github.com/thomasweigert91",
    stats: [
      { label: "Years Frontend Practice", value: "3+" },
      { label: "Financial Sector Practice", value: "8 Years" },
      { label: "faster tables & search", value: "~3 s" },
      { label: "Production apps", value: "5" }
    ]
  },

  passions: [
    {
      icon: "Trees",
      title: "Nature & Deceleration",
      subtitle: "Henstedt-Ulzburg & Northern wilderness",
      description: "Long walks through the pine woods and heathlands around Hamburg. This is where I find the calm and clarity to approach complex software architectures with patience and focus.",
      tag: "Focus & Balance"
    },
    {
      icon: "Dog",
      title: "My Dogs",
      subtitle: "Daily companions & grounding",
      description: "Reliability, undivided loyalty, and daily movement regardless of weather. They are a constant reminder that consistency and empathy form the bedrock of great collaboration.",
      tag: "Reliability"
    },
    {
      icon: "Music",
      title: "Country Music & Acoustics",
      subtitle: "Genuine stories & handmade sound",
      description: "From fingerpicked acoustic guitars to soulful country ballads: I love music that is unvarnished and tells a meaningful story. Just like clean code: no decorative fluff, pure substance.",
      tag: "Authenticity"
    },
    {
      icon: "UtensilsCrossed",
      title: "Cooking & Culinary Craft",
      subtitle: "Mise en place & timing at the stove",
      description: "A memorable meal requires pristine ingredients, patience while reducing, and precise timing. I translate this exact mindset to state management, clean types, and modular UIs.",
      tag: "Craft & Timing"
    },
    {
      icon: "Landmark",
      title: "8 Years in Finance",
      subtitle: "Sparkasse, McMakler, Finanzcheck",
      description: "From certified banking specialist to mortgage consultant: I understand real numbers, mission-critical business processes, compliance, and user anxieties. I do not build software in an ivory tower.",
      tag: "Analytical Rigor"
    }
  ],

  visualStory: [
    {
      id: "scene-1",
      sceneNumber: "01",
      sceneName: "Focus & Foundation",
      heading: "Modern frontend engineering focused on quality, performance, and reliability.",
      subheading: "Thomas Weigert · Frontend Engineer (React · TypeScript · Next.js) based in Hamburg (Henstedt-Ulzburg), Germany.",
      description: "I build user-centric, high-performance web applications with clean architecture and maintainable code. Backed by solid enterprise project experience and an analytical eye for business-critical workflows.",
      ctaText: "View projects",
      ctaHref: "#projects",
      secondaryCtaText: "Download CV",
      secondaryCtaHref: "/CV_Thomas_Weigert.pdf",
      visualNote: "Inspiring workspace on the cabin deck overlooking the sunlit forest, with laptop and steaming coffee.",
      imagePlate: "/assets/scene1.jpg"
    },
    {
      id: "scene-2",
      sceneNumber: "02",
      sceneName: "Precision & Craft",
      heading: "Precision in the details, vision in the architecture.",
      subheading: "Analytical discipline meets modern web technologies and thoughtful user experience.",
      description: "Great software is built at the intersection of engineering excellence and real product understanding. My business background gives me a sharp instinct for data, workflows, and usability — translating complex requirements into intuitive, lasting interfaces. Eight years in financial services (banking, mortgage lending) and three years of frontend work for company pension platforms: for fintech, banking and insurance projects, I bring the domain knowledge with me.",
      ctaText: "Explore Architectures",
      ctaHref: "#projects",
      secondaryCtaText: "Tech Stack & Skills",
      secondaryCtaHref: "#experience",
      visualNote: "Thomas in a rustic timber kitchen preparing food and fresh herbs, laptop with code on the counter.",
      imagePlate: "/assets/scene2.jpg"
    },
    {
      id: "scene-3",
      sceneNumber: "03",
      sceneName: "Reliability & Team Fit",
      heading: "Ready to bring dependable engineering to your team or project.",
      subheading: "Open to full-time frontend roles and freelance projects (Remote / Hybrid Hamburg area).",
      description: "Looking for a frontend engineer to join your team, or support for a specific project? I take ownership, value clean, maintainable code, and thrive in transparent, collaborative teams. Let’s connect.",
      ctaText: "Discuss a role or project",
      ctaHref: "#contact",
      secondaryCtaText: "thomasweigert91@gmail.com",
      secondaryCtaHref: "mailto:thomasweigert91@gmail.com",
      visualNote: "Warm hearth fire with both dogs sleeping peacefully on a sheepskin rug.",
      imagePlate: "/assets/scene3.jpg"
    }
  ],

  projects: [
    {
      id: "gitspore",
      title: "GitSpore",
      category: "Team project / Training (Capstone)",
      period: "10/2026",
      role: "Developer, team of three",
      client: "Capstone project · team of three",
      image: "/assets/proj-gitspore.jpg",
      shortDesc: "Interactive 3D greenhouse for visualizing and controlling AI coding agents and Git worktrees. Next.js + React Three Fiber, NestJS daemon, npm workspaces monorepo.",
      fullDesc: "GitSpore turns AI coding agents and their Git worktrees into an interactive 3D greenhouse you can watch and control. The frontend is built with Next.js and React Three Fiber, a NestJS daemon streams the state in real time, and both live in an npm workspaces monorepo. Built as the capstone project of my advanced training in a team of three.",
      metrics: [
        { label: "Team", value: "3 people" },
        { label: "Project type", value: "Capstone" },
        { label: "Tests", value: "Jest" }
      ],
      tags: ["Next.js", "React Three Fiber", "NestJS", "TypeScript", "WebSocket", "Zustand", "Jest", "npm Workspaces"],
      githubUrl: "https://github.com/gitspore/gitspore",
      highlightsTitle: "My contribution",
      highlights: [
        "Monorepo and CI setup (npm workspaces)",
        "Shared type contract between daemon and frontend",
        "Daemon security layer: session-token auth, origin and host checks in the WebSocket handshake, state gateway with a snapshot on connect",
        "Real-time data layer in the frontend: typed client interface, socket client, mock client with scenario player and fake clock for development without the daemon, Zustand store with selectors and connection status",
        "Everything covered by Jest tests"
      ]
    },
    {
      id: "bav-admin-tool",
      title: "Admin Tool for Company Pension Schemes",
      category: "Enterprise Administration Platform",
      period: "08/2023 - 04/2026",
      role: "Frontend Engineer",
      client: "Enterprise Pension & Insurance Administration Application",
      image: "/assets/proj-admin-en.jpg",
      shortDesc: "Mission-critical administration software: Targeted refactoring of a legacy codebase and ~3 s faster data tables using intelligent TanStack Query prefetching.",
      fullDesc: "Autonomous ownership and continuous evolution of the frontend architecture for mission-critical company pension administration software built purely with React and TypeScript inside a central Nx monorepo. Executed targeted refactoring and modernization of a historically grown legacy codebase while keeping operations stable. Made data tables and search ~3 s faster through client-side caching and prefetching with TanStack Query. Accompanied live production deployments and resolved hotfixes swiftly.",
      metrics: [
        { label: "Tables & search", value: "~3 s faster" },
        { label: "Deployment & hotfixes", value: "Production support" },
        { label: "Architecture", value: "React & Nx" }
      ],
      tags: ["React.js", "TypeScript", "TanStack Query", "Nx Monorepo", "REST APIs", "CSS", "Scrum"],
      nda: true,
      inquiryUrl: "mailto:thomasweigert91@gmail.com?subject=Inquiry%20bAV%20Admin%20Tool",
      highlights: [
        "Autonomous ownership and frontend architecture maintenance on a pure React and TypeScript foundation",
        "Legacy modernization and disciplined refactoring of core modules while keeping operations stable",
        "Performance optimization: Data tables and search ~3 s faster via TanStack Query caching and prefetching",
        "End-to-end production deployment management and rapid live hotfix diagnosis"
      ]
    },
    {
      id: "mobile-onboarding-hr",
      title: "Mobile Onboarding App and HR Dashboard",
      category: "Greenfield Mobile & Web",
      period: "06/2023 - 07/2025",
      role: "Frontend Engineer",
      client: "Leading Energy Corporation",
      image: "/assets/proj-onboarding-en.jpg",
      shortDesc: "Greenfield architecture with Next.js: Mobile onboarding app for new hires paired with a data-intensive HR administration dashboard, Auth.js, Zustand, and GraphQL.",
      fullDesc: "Holistic greenfield conception and development of an employee onboarding mobile app and companion administrative dashboard from scratch for a major energy corporation using Next.js, React, and TypeScript within an Nx monorepo. Built an intuitive, fault-tolerant user journey with strict type-safe form validation using React Hook Form and Zod. Established lean reactive global state with Zustand and integrated secure role-based login workflows via Auth.js. Designed and optimized GraphQL queries in close alignment with the backend team and product owners.",
      metrics: [
        { label: "Project Type", value: "Greenfield" },
        { label: "Core Stack", value: "Next.js & GraphQL" },
        { label: "State & Auth", value: "Zustand & Auth.js" }
      ],
      tags: ["Next.js", "React.js", "TypeScript", "GraphQL", "Zustand", "Auth.js", "React Hook Form", "Zod", "Nx Monorepo", "Responsive CSS"],
      nda: true,
      inquiryUrl: "mailto:thomasweigert91@gmail.com?subject=Inquiry%20Mobile%20Onboarding%20App",
      highlights: [
        "Greenfield architecture and implementation of both mobile onboarding app and HR dashboard from scratch using Next.js",
        "Complex reusable form workflows with strict schema-based validation via React Hook Form and Zod",
        "Lean global state management using Zustand and secure role-based authentication via Auth.js",
        "Cross-functional collaboration: GraphQL schema and API design in close alignment with backend developers and UX designers"
      ]
    },
    {
      id: "vorsorgeportale",
      title: "Customer Portals for Company Pensions",
      category: "Customer Portal",
      period: "08/2023 - 04/2026",
      role: "Frontend Engineer",
      client: "Customer Portals for Corporate Pension Schemes",
      image: "/assets/proj-portals-en.jpg",
      shortDesc: "Continuous scaling and modular UI/UX modernization of two high-traffic customer portals toward accessible, fully responsive components.",
      fullDesc: "Continuous evolution, scaling, and feature expansion of two business-critical customer portals for company pension management. Refactored existing React frontend structures into accessible (a11y-compliant), fully responsive, and modular components. Took technical ownership of new functional modules from initial stakeholder grooming through to stable production releases in an agile Scrum team.",
      metrics: [
        { label: "Customer Portals", value: "2 Platforms" },
        { label: "Core Focus", value: "Accessibility (a11y)" },
        { label: "Components", value: "Modular & Responsive" }
      ],
      tags: ["React.js", "TypeScript", "Nx Monorepo", "Modular Components", "Accessibility (a11y)", "Responsive CSS", "Scrum"],
      nda: true,
      inquiryUrl: "mailto:thomasweigert91@gmail.com?subject=Inquiry%20Pension%20Portals",
      highlights: [
        "Continuous scaling and functional feature expansion of two high-frequency customer applications",
        "UI/UX modernization: Refactored existing frontend layers into accessible, fully responsive, and modular component sets",
        "End-to-end delivery of new business modules from initial stakeholder alignment to production go-live"
      ]
    }
  ],

  referenceLetter: {
    author: "Tino Schulze",
    role: "Managing Director",
    company: "Melting Experience GmbH / melting elements gmbh",
    location: "Schulterblatt 36, 20357 Hamburg, Germany",
    quote: "Thomas Weigert performed the tasks assigned to him at all times with utmost reliability, diligence, and punctuality, delivering consistently good to very good results. Even under heavy workloads and time constraints, he always maintained an overview and prioritized effectively and purposefully. He identified strongly with his responsibilities and executed them with high accountability, efficiency, and personal dedication.",
    badge: "Reference Letter"
  },

  experience: [
    {
      period: "04/2023 - 04/2026",
      role: "Frontend Engineer",
      company: "melting elements gmbh / Melting Experience GmbH",
      location: "Hamburg, Germany",
      description: "Concurrent engineering, scaling, and maintenance of multiple client applications within a central Nx monorepo utilizing React, Next.js, and TypeScript.",
      achievements: [
        "Multi-project architecture: Concurrent development and maintenance of multiple web applications in an Nx monorepo with React, Next.js, and TypeScript",
        "API integration & caching: Orchestrated complex backend interfaces via REST and GraphQL; optimized client dataflow with TanStack Query",
        "Modernization & refactoring: Disciplined overhaul of grown legacy codebases yielding substantial gains in performance, maintainability, and code quality",
        "Agile collaboration & mentoring: Close alignment with POs, UX designers, and backend teams in Scrum; conducted code reviews and supported team members on frontend topics"
      ],
      skills: ["React.js", "Next.js", "TypeScript", "Nx Monorepo", "TanStack Query", "GraphQL", "REST", "Scrum"]
    },
    {
      period: "01/2021 - 07/2022",
      role: "Real Estate Financing Specialist",
      company: "McMakler",
      location: "Hamburg, Germany",
      description: "End-to-end structuring of tailored mortgage financing solutions for private clients.",
      achievements: [
        "Formulated tailored financing structures aligned with client requirements",
        "Negotiated complex loan structures with banking and lending partners through to successful closing"
      ],
      skills: ["Financing Structuring", "Negotiation", "Credit Risk Analysis", "Client Advisory"]
    },
    {
      period: "11/2015 - 06/2020",
      role: "Consumer Credit Consultant",
      company: "Finanzcheck, Smava",
      location: "Hamburg, Germany",
      description: "End-to-end consumer loan advisory for retail clients including credit risk assessments.",
      achievements: [
        "Data-driven evaluation of market-leading lending products",
        "Guided clients through the full application lifecycle with high accountability"
      ],
      skills: ["Data-driven Credit Analysis", "Process Optimization", "Client Communication"]
    },
    {
      period: "02/2013 - 10/2015",
      role: "Certified Banking Specialist (Traineeship 08/2010 - 02/2013)",
      company: "Sparkasse Stade-Altes Land",
      location: "Stade, Germany",
      description: "Advisory services for retail clients across savings, investments, and pension products alongside daily banking operations.",
      achievements: [
        "Successfully completed certified Bankkaufmann qualification (Chamber of Commerce)",
        "Established rigorous commercial and contractual foundations that still inform my fintech and business logic understanding"
      ],
      skills: ["Banking Operations", "Financial Products", "Commercial Precision"]
    }
  ],

  education: [
    {
      period: "07/2026 - Present",
      title: "Advanced Software Development",
      institution: "neuefische GmbH - School and Pool for Digital Talent",
      location: "Remote"
    },
    {
      period: "10/2022 - 01/2023",
      title: "Web Development Bootcamp",
      institution: "neuefische GmbH - School and Pool for Digital Talent",
      location: "Remote"
    },
    {
      period: "08/2010 - 02/2013",
      title: "Certified Banking Specialist (Bankkaufmann)",
      institution: "Sparkasse Stade-Altes Land",
      location: "Stade, Germany"
    },
    {
      period: "07/2007 - 05/2010",
      title: "Vocational Baccalaureate in Economics (Fachabitur)",
      institution: "BBS 2 Stade",
      location: "Stade, Germany"
    }
  ],

  skillCategories: [
    {
      title: "Frontend Core Stack",
      skills: ["TypeScript", "JavaScript", "React.js", "Next.js", "TanStack Query", "TanStack Router", "Zustand", "Framer Motion", "React Hook Form", "Zod", "HTML5 & CSS3"]
    },
    {
      title: "Backend & Interfaces",
      skills: ["Node.js", "Express", "REST APIs", "GraphQL", "NestJS", "SQLite", "PostgreSQL", "Drizzle ORM", "TypeORM"]
    },
    {
      title: "Architecture & Practices",
      skills: ["Nx (Monorepo)", "Component-based Architecture", "Clean Code", "Scrum / Agile", "Responsive Design", "Accessibility (a11y)", "Code Reviews & Mentoring"]
    },
    {
      title: "Tools, DevOps & Testing",
      skills: ["Git & GitHub", "Vite", "npm / Bun", "ESLint", "Docker", "GitHub Actions", "Vercel", "Bitbucket", "Jest"]
    },
    {
      title: "AI & Modern Workflows",
      skills: ["Agentic Coding", "Claude Code", "GitHub Copilot", "LLM Integration"]
    }
  ],

  languages: [
    { language: "German", level: "Native", desc: "First Language", isNative: true },
    { language: "English", level: "Proficient", desc: "Fluent in engineering environments", isNative: false }
  ]
};

// Default export alias for backwards compatibility
export const portfolioData = portfolioDataDE;
