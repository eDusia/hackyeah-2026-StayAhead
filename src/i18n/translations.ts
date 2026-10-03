import type { AppLanguage, CareerDomain, GoalType, TimeCommitment } from '@/types';

export interface Translations {
  common: {
    appName: string;
    hackathonBadge: string;
    coverSubtitle: string;
    coverTagline: string;
    pillars: {
      expertMentoring: string;
      personalizedPlans: string;
      buildConfidence: string;
    };
    languagePl: string;
    languageEn: string;
  };
  onboarding: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    progressLabel: string;
    step0: {
      title: string;
      desc: string;
      placeholder: string;
    };
    step1: {
      title: string;
      desc: string;
      customPlaceholder: string;
      goals: Record<GoalType, { label: string; desc: string }>;
    };
    step2: {
      title: string;
      desc: string;
      preset1m: string;
      preset3m: string;
      preset6m: string;
      preset12m: string;
      customDate: string;
      daysRemaining: string;
    };
    step3: {
      title: string;
      desc: string;
      selectPrompt: string;
      domains: Record<CareerDomain, string>;
      customPlaceholder: string;
    };
    step4: {
      title: string;
      desc: string;
      suggestedTitle: string;
      customRoleBtn: string;
      customRolePlaceholder: string;
    };
    step5: {
      title: string;
      desc: string;
      commitments: Record<TimeCommitment, { label: string; subtitle: string }>;
    };
    summary: {
      title: string;
      name: string;
      goal: string;
      horizon: string;
      domainAndRole: string;
      rhythm: string;
      daysSuffix: string;
    };
    startButton: string;
    startDisabledHint: string;
  };
  today: {
    greetingMorning: string;
    greetingAfternoon: string;
    greetingEvening: string;
    encouragement: string;
    goalPrefix: string;
    defaultTargetRole: string;
    dailyFocusBadge: string;
    dailyFocusSubtitle: string;
    streakTitle: string;
    streakDaysLabel: string;
    streakKeepGoing: string;
    weekdays: [string, string, string, string, string, string, string];
    tasksHeader: string;
    tasksSubheader: string;
    studyTime: string;
    tasksCount: (completed: number, total: number) => string;
    allTasksCompleted: string;
    tasksRemaining: (remaining: number) => string;
    goalAchieved: string;
    quickActionsTitle: string;
    actionMentorTitle: string;
    actionMentorDesc: string;
    actionRoadmapTitle: string;
    actionRoadmapDesc: string;
    actionJobsTitle: string;
    actionJobsDesc: string;
  };
  tabs: {
    today: string;
    roadmap: string;
    news: string;
    jobs: string;
    messages: string;
    profile: string;
  };
  profile: {
    title: string;
    languageSetting: string;
    settingsTitle: string;
    currentStreak: (count: number) => string;
    resetButton: string;
    goalDetails: string;
    domain: string;
    rhythm: string;
    deadline: string;
    daysToGoal: (days: number) => string;
    matchScore: (score: number) => string;
  };
}

export const translations: Record<AppLanguage, Translations> = {
  pl: {
    common: {
      appName: 'StayAhead',
      hackathonBadge: 'HACKATHON PROJECT',
      coverSubtitle: 'Inteligentny mentoring kariery – powrót do pracy, przebranżowienie i rozwój w nowych technologiach',
      coverTagline: 'EMPOWERING YOUR NEXT CHAPTER',
      pillars: {
        expertMentoring: 'Wsparcie ekspertów',
        personalizedPlans: 'Spersonalizowane plany',
        buildConfidence: 'Budowanie pewności',
      },
      languagePl: 'PL',
      languageEn: 'ENG',
    },
    onboarding: {
      badge: 'StayAhead',
      title: 'Stay',
      titleHighlight: 'Ahead',
      description: 'Odpowiedz na pytania – agent przygotuje dla Ciebie spersonalizowaną ścieżkę',
      progressLabel: 'Gotowość Twojego profilu',
      step0: {
        title: 'Jak masz na imię?',
        desc: 'Mentor AI będzie się do Ciebie zwracać po imieniu podczas codziennych check-inów.',
        placeholder: 'np. Aleksandra, Michał',
      },
      step1: {
        title: 'Jaki jest Twój główny cel?',
        desc: 'Wybierz sytuację, w której obecnie się znajdujesz:',
        customPlaceholder: 'Wpisz swój własny cel zawodowy...',
        goals: {
          return_after_break: {
            label: 'Powrót do pracy po przerwie',
            desc: 'Wracam na rynek i chcę zaktualizować kluczowe kompetencje.',
          },
          parental_leave: {
            label: 'Powrót po urlopie rodzicielskim',
            desc: 'Uporządkowany, spokojny powrót do aktywności zawodowej w dogodnym tempie.',
          },
          career_change: {
            label: 'Zmiana ścieżki kariery',
            desc: 'Przebranżowienie lub wejście w zupełnie nową rolę w IT / Digital.',
          },
          promotion: {
            label: 'Awans lub nowe technologie',
            desc: 'Wyższy poziom, nowsze narzędzia i mocniejsza pozycja na rynku.',
          },
          other: {
            label: 'Inny cel zawodowy',
            desc: 'Własny plan i spersonalizowana ścieżka rozwoju.',
          },
        },
      },
      step2: {
        title: 'Kiedy chcesz wrócić lub wystartować?',
        desc: 'Dobierzemy tempo do wyznaczonego czasu:',
        preset1m: '1 miesiąc',
        preset3m: '3 miesiące',
        preset6m: '6 miesięcy',
        preset12m: '12 miesięcy',
        customDate: 'Własna data',
        daysRemaining: 'dni do celu',
      },
      step3: {
        title: 'Który obszar Cię interesuje?',
        desc: 'Możesz wybrać rolę techniczną, produktową lub zdefiniować własną:',
        selectPrompt: 'Wybierz obszar...',
        domains: {
          software: 'Software Engineering',
          data: 'Data & Analytics',
          product: 'Product Management',
          design: 'UX / Product Design',
          ai: 'AI & Machine Learning',
          other: 'Inny obszar',
        },
        customPlaceholder: 'np. Cyberbezpieczeństwo, Cloud, QA...',
      },
      step4: {
        title: 'Docelowa rola lub stanowisko',
        desc: 'Dopasujemy trendy rynkowe i wymagania rekrutacyjne:',
        suggestedTitle: 'Sugerowane w tym obszarze:',
        customRoleBtn: '+ Wpisz własną nazwę roli',
        customRolePlaceholder: 'Wpisz docelowe stanowisko...',
      },
      step5: {
        title: 'Ile czasu masz na naukę?',
        desc: 'Ile czasu realnie możesz poświęcić na przygotowanie do celu? Dopasujemy do tego porcje wiedzy:',
        commitments: {
          '15-30m_daily': {
            label: '15–30 min dziennie',
            subtitle: 'Mikronawyki, czytanie i 1 krótkie zadanie dziennie',
          },
          '1h_daily': {
            label: '1 godzina dziennie',
            subtitle: 'Równomierny, codzienny postęp i stały kontakt z wiedzą',
          },
          '3-5h_weekly': {
            label: '3–5 godzin tygodniowo',
            subtitle: 'Głównie weekendy lub 2-3 wybrane bloki w tygodniu',
          },
          '8-10h_weekly': {
            label: '8–10 godzin tygodniowo',
            subtitle: 'Intensywny sprint edukacyjny i szybki skok jakościowy',
          },
          flexible: {
            label: 'Elastycznie / weekendy',
            subtitle: 'Uczysz się wtedy, kiedy masz wolną przestrzeń',
          },
        },
      },
      summary: {
        title: 'Podsumowanie Twojego profilu',
        name: 'Imię:',
        goal: 'Cel:',
        horizon: 'Horyzont:',
        domainAndRole: 'Obszar i rola:',
        rhythm: 'Rytm nauki:',
        daysSuffix: 'dni',
      },
      startButton: 'Rozpocznij',
      startDisabledHint: 'Uzupełnij wszystkie powyższe pola, aby rozpocząć',
    },
    today: {
      greetingMorning: 'Dzień dobry',
      greetingAfternoon: 'Cześć',
      greetingEvening: 'Dobry wieczór',
      encouragement: "You've got this.",
      goalPrefix: 'Cel:',
      defaultTargetRole: 'AI Application Engineer',
      dailyFocusBadge: 'Daily Focus',
      dailyFocusSubtitle: 'One step today, stronger tomorrow.',
      streakTitle: 'Streak',
      streakDaysLabel: 'dni',
      streakKeepGoing: 'Keep it going!',
      weekdays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      tasksHeader: 'Plan na dziś',
      tasksSubheader: 'Dotknij zadania, aby oznaczyć jako wykonane',
      studyTime: '~45 min nauki',
      tasksCount: (completed, total) => `${completed} z ${total} ukończone`,
      allTasksCompleted: '🎉 Wszystkie zadania na dziś zrealizowane!',
      tasksRemaining: (remaining) =>
        `Pozostało jeszcze ${remaining} ${remaining === 1 ? 'zadanie' : remaining < 5 ? 'zadania' : 'zadań'}`,
      goalAchieved: 'Cel osiągnięty',
      quickActionsTitle: 'Szybkie akcje',
      actionMentorTitle: 'Zapytaj Mentora AI lub rekrutera',
      actionMentorDesc: 'Rozwiąż wątpliwości lub zarezerwuj czas 1:1',
      actionRoadmapTitle: 'Zobacz pełną ścieżkę rozwoju',
      actionRoadmapDesc: 'Kamienie milowe i plan kolejnych tygodni',
      actionJobsTitle: 'Sprawdź dzisiejsze oferty pracy',
      actionJobsDesc: 'Zobacz, jak rośnie Twoje dopasowanie do stawek',
    },
    tabs: {
      today: 'Dziś',
      roadmap: 'Ścieżka',
      news: 'Nowości',
      jobs: 'Oferty',
      messages: 'Czat',
      profile: 'Profil',
    },
    profile: {
      title: 'Profil i cele',
      languageSetting: 'Język aplikacji',
      settingsTitle: 'Ustawienia',
      currentStreak: (count) => `Aktualna passa: ${count} dni. Reset wraca do onboardingu.`,
      resetButton: 'Zresetuj profil i plan',
      goalDetails: 'Szczegóły celu',
      domain: 'Obszar:',
      rhythm: 'Rytm nauki:',
      deadline: 'Deadline:',
      daysToGoal: (days) => `${days} dni do celu`,
      matchScore: (score) => `Dopasowanie do najbliższej oferty: ${score}%`,
    },
  },
  en: {
    common: {
      appName: 'StayAhead',
      hackathonBadge: 'HACKATHON PROJECT',
      coverSubtitle: 'AI-powered career mentoring – returning to work, career change, and tech upskilling',
      coverTagline: 'EMPOWERING YOUR NEXT CHAPTER',
      pillars: {
        expertMentoring: 'Expert Mentoring',
        personalizedPlans: 'Personalized Plans',
        buildConfidence: 'Build Confidence',
      },
      languagePl: 'PL',
      languageEn: 'ENG',
    },
    onboarding: {
      badge: 'StayAhead',
      title: 'Stay',
      titleHighlight: 'Ahead',
      description: 'Answer the questions – our agent will prepare a personalized path for you',
      progressLabel: 'Profile readiness',
      step0: {
        title: 'What is your name?',
        desc: 'AI Mentor will address you by name during daily check-ins.',
        placeholder: 'e.g. Alex, Michael',
      },
      step1: {
        title: 'What is your main goal?',
        desc: 'Choose your current career situation:',
        customPlaceholder: 'Enter your custom career goal...',
        goals: {
          return_after_break: {
            label: 'Returning to work after break',
            desc: 'Returning to the job market and refreshing key competencies.',
          },
          parental_leave: {
            label: 'Return after parental leave',
            desc: 'Structured, calm return to professional activity at your own pace.',
          },
          career_change: {
            label: 'Career change',
            desc: 'Reskilling or transitioning into a brand new IT / Tech role.',
          },
          promotion: {
            label: 'Promotion or new tech',
            desc: 'Advancing skills, modern tooling, and boosting career standing.',
          },
          other: {
            label: 'Other career goal',
            desc: 'Custom plan and personalized development path.',
          },
        },
      },
      step2: {
        title: 'When do you want to return or start?',
        desc: 'We will tailor your pace to your target timeframe:',
        preset1m: '1 month',
        preset3m: '3 months',
        preset6m: '6 months',
        preset12m: '12 months',
        customDate: 'Custom date',
        daysRemaining: 'days to goal',
      },
      step3: {
        title: 'Which domain interests you?',
        desc: 'Pick a technical, product, or custom specialization:',
        selectPrompt: 'Select a domain...',
        domains: {
          software: 'Software Engineering',
          data: 'Data & Analytics',
          product: 'Product Management',
          design: 'UX / Product Design',
          ai: 'AI & Machine Learning',
          other: 'Other domain',
        },
        customPlaceholder: 'e.g. Cybersecurity, Cloud, QA...',
      },
      step4: {
        title: 'Target role or position',
        desc: 'We will match market trends and recruitment criteria:',
        suggestedTitle: 'Suggested in this domain:',
        customRoleBtn: '+ Enter custom role name',
        customRolePlaceholder: 'Enter target job title...',
      },
      step5: {
        title: 'How much time do you have to study?',
        desc: 'How much time can you realistically invest? We will adapt daily learning units:',
        commitments: {
          '15-30m_daily': {
            label: '15–30 min daily',
            subtitle: 'Micro-habits, reading, and 1 short daily exercise',
          },
          '1h_daily': {
            label: '1 hour daily',
            subtitle: 'Consistent daily momentum and steady practice',
          },
          '3-5h_weekly': {
            label: '3–5 hours weekly',
            subtitle: 'Primarily weekends or 2-3 focused weekly sessions',
          },
          '8-10h_weekly': {
            label: '8–10 hours weekly',
            subtitle: 'Intensive study sprint for fast transformation',
          },
          flexible: {
            label: 'Flexible / weekends',
            subtitle: 'Learn whenever you have dedicated time',
          },
        },
      },
      summary: {
        title: 'Your profile summary',
        name: 'Name:',
        goal: 'Goal:',
        horizon: 'Timeline:',
        domainAndRole: 'Domain & Role:',
        rhythm: 'Study rhythm:',
        daysSuffix: 'days',
      },
      startButton: 'Get Started',
      startDisabledHint: 'Complete all fields above to get started',
    },
    today: {
      greetingMorning: 'Good morning',
      greetingAfternoon: 'Good afternoon',
      greetingEvening: 'Good evening',
      encouragement: "You've got this.",
      goalPrefix: 'Goal:',
      defaultTargetRole: 'AI Application Engineer',
      dailyFocusBadge: 'Daily Focus',
      dailyFocusSubtitle: 'One step today, stronger tomorrow.',
      streakTitle: 'Streak',
      streakDaysLabel: 'days',
      streakKeepGoing: 'Keep it going!',
      weekdays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      tasksHeader: "Today's tasks",
      tasksSubheader: 'Tap task to mark as completed',
      studyTime: '~45 min study',
      tasksCount: (completed, total) => `${completed} of ${total} tasks`,
      allTasksCompleted: '🎉 All tasks completed for today!',
      tasksRemaining: (remaining) => `${remaining} ${remaining === 1 ? 'task' : 'tasks'} remaining`,
      goalAchieved: 'Goal achieved',
      quickActionsTitle: 'Quick actions',
      actionMentorTitle: 'Ask AI Mentor or recruiter',
      actionMentorDesc: 'Clarify questions or schedule a 1:1 session',
      actionRoadmapTitle: 'View full career roadmap',
      actionRoadmapDesc: 'Milestones and upcoming weekly plan',
      actionJobsTitle: 'Check today job opportunities',
      actionJobsDesc: 'See how your salary match is growing',
    },
    tabs: {
      today: 'Today',
      roadmap: 'Roadmap',
      news: 'News',
      jobs: 'Jobs',
      messages: 'Messages',
      profile: 'Profile',
    },
    profile: {
      title: 'Profile & Goals',
      languageSetting: 'App language',
      settingsTitle: 'Settings',
      currentStreak: (count) => `Current streak: ${count} days. Reset returns to onboarding.`,
      resetButton: 'Reset profile and plan',
      goalDetails: 'Goal details',
      domain: 'Domain:',
      rhythm: 'Study rhythm:',
      deadline: 'Deadline:',
      daysToGoal: (days) => `${days} days to goal`,
      matchScore: (score) => `Target job match: ${score}%`,
    },
  },
};

export function getTranslations(lang: AppLanguage = 'pl'): Translations {
  return translations[lang] ?? translations.pl;
}
