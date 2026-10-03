import type { AppLanguage, CareerDomain, GoalType, NewsCategory, TimeCommitment } from '@/types';

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
  news: {
    tagline: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    categories: Record<NewsCategory, string>;
    featuredBadge: string;
    featuredHeader: string;
    listenAction: string;
    keyTakeawayLabel: string;
    sourceLabel: string;
    readFullAction: string;
    latestHeader: string;
    articlesCount: (count: number) => string;
    emptyTitle: string;
    emptyDesc: string;
    voiceBrief: {
      badge: string;
      playingBadge: string;
      cardTitle: string;
      descriptions: Record<GoalType, string>;
      defaultDescription: string;
      topicsCount: (count: number) => string;
      voiceLanguageTag: string;
      cvTakeawaysTag: string;
      openPlayerButton: string;
      listenDigestButton: (duration: string) => string;
    };
    modal: {
      listenArticleSummary: string;
      keyTakeawayCareer: string;
      introduction: string;
      analysisDetails: string;
      topicTags: string;
      publishedPrefix: string;
      sourcePrefix: string;
    };
  };
  jobs: {
    tagline: string;
    title: string;
    subtitle: string;
    targetProfileHeader: string;
    marketMatchLabel: string;
    inDemandHeader: string;
    inDemandSubheader: string;
    openPositionsCount: (count: number) => string;
    demandIndexLabel: string;
    salaryAnalysisHeader: string;
    salaryAnalysisSubheader: string;
    b2bNote: string;
    uopNote: string;
    mentorTipTitle: string;
    mentorTipDesc: string;
    curatedOffersHeader: string;
    curatedOffersSubheader: string;
    top3Badge: string;
    salaryLabel: string;
    skillsLabel: string;
    whyGoodMatchLabel: string;
    viewDetailsAction: string;
    modal: {
      matchBadge: (score: number) => string;
      salaryRangeTitle: string;
      orUop: (salary: string) => string;
      alignmentTitle: string;
      matchingSkillsTitle: string;
      missingSkillsTitle: string;
      missingSkillPrefix: string;
      aboutRoleTitle: string;
      responsibilitiesTitle: string;
      perksTitle: string;
      consultMentorAction: string;
      saveOfferAction: string;
    };
  };
  roadmap: {
    tagline: string;
    title: string;
    subtitlePrefix: string;
    totalProgressHeader: string;
    completedBadge: (percent: number) => string;
    milestonesSummary: (completed: number, total: number) => string;
    currentWeekStatus: string;
    targetGapTitle: string;
    targetGapMatch: (score: number) => string;
    targetGapDesc: (company: string) => string;
    milestonesHeader: string;
    milestonesSubheader: string;
    timelineHeader: string;
    timelineSubheader: string;
    goToTodayAction: string;
  };
  messages: {
    tagline: string;
    title: string;
    availableMentorsBadge: string;
    tabs: {
      mentorAi: string;
      hrChat: string;
      mentorSessions: (count: number) => string;
    };
    aiTab: {
      contextPrefix: (role: string, level: string) => string;
      analyzingText: string;
      inputPlaceholder: string;
    };
    hrTab: {
      activeBadge: string;
      replyTimeBadge: string;
      recruiterInfoDesc: string;
      inputPlaceholder: (recruiterFirstName: string) => string;
    };
    sessionsTab: {
      bannerTitle: string;
      bannerDesc: string;
      bookedSessionsHeader: (count: number) => string;
      bookingConfirmed: string;
      cancelButton: string;
      durationLabel: string;
      topicPrefix: string;
      availableSlotsHeader: string;
      availableSlotsSubheader: string;
      specializationPrefix: string;
      bookedStatus: string;
      selectSlotButton: string;
    };
    modal: {
      bookTitle: string;
      selectedMentorAndDate: string;
      chooseTopicTitle: string;
      confirmButton: string;
      cancelButton: string;
      successTitle: string;
      successDesc: string;
      successButton: string;
    };
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
    news: {
      tagline: 'Wiedza & Trendy',
      title: 'Nowości',
      subtitle: 'Najważniejsze artykuły, zmiany w wymaganiach rekruterów i trendy technologiczne.',
      searchPlaceholder: 'Szukaj artykułu, technologii, frazy...',
      categories: {
        all: 'Wszystkie',
        ai_trends: 'Trendy AI',
        market: 'Rynek & Płace',
        tools: 'Narzędzia',
        best_practices: 'Dobre praktyki',
      },
      featuredBadge: 'Must-read',
      featuredHeader: 'Wyróżniony artykuł dnia',
      listenAction: 'Odsłuchaj',
      keyTakeawayLabel: 'Kluczowy wniosek:',
      sourceLabel: 'Źródło:',
      readFullAction: 'Czytaj całość',
      latestHeader: 'Najnowsze publikacje',
      articlesCount: (count: number) => `${count} ${count === 1 ? 'wpis' : 'wpisów'}`,
      emptyTitle: 'Brak artykułów',
      emptyDesc: 'Spróbuj zmienić kategorię lub wyczyścić pole wyszukiwania.',
      voiceBrief: {
        badge: 'Audio Briefing AI',
        playingBadge: 'ODTWARZANIE',
        cardTitle: 'Odsłuchaj podsumowanie newsów',
        descriptions: {
          parental_leave: 'AI lektor podsumowuje najważniejsze ruchy na rynku w 5 minut — idealne podczas spaceru z wózkiem lub drzemki malucha.',
          return_after_break: 'AI lektor podsumowuje najważniejsze ruchy na rynku w 5 minut — idealne do spokojnej aktualizacji wiedzy w wolnej chwili.',
          career_change: 'AI lektor podsumowuje najważniejsze ruchy na rynku w 5 minut — idealne do poznawania nowej branży krok po kroku.',
          promotion: 'AI lektor podsumowuje najważniejsze ruchy na rynku w 5 minut — idealne w drodze do pracy lub podczas porannej kawy.',
          other: 'AI lektor podsumowuje najważniejsze ruchy na rynku w 5 minut — idealne w drodze lub w krótkiej chwili dla siebie.',
        },
        defaultDescription: 'AI lektor podsumowuje najważniejsze ruchy na rynku w 5 minut — idealne podczas spaceru z wózkiem lub drzemki malucha.',
        topicsCount: (count: number) => `🎧 ${count} kluczowe tematy`,
        voiceLanguageTag: '🇵🇱 Lektor po polsku',
        cvTakeawaysTag: '💡 Wnioski do CV',
        openPlayerButton: 'Otwórz odtwarzacz głosowy',
        listenDigestButton: (duration: string) => `Odsłuchaj skrót (${duration})`,
      },
      modal: {
        listenArticleSummary: 'Odsłuchaj podsumowanie głosowe tego artykułu',
        keyTakeawayCareer: 'Kluczowy wniosek dla Twojej kariery:',
        introduction: 'Wprowadzenie',
        analysisDetails: 'Analiza i szczegóły',
        topicTags: 'Tagi tematyczne',
        publishedPrefix: 'Opublikowano:',
        sourcePrefix: 'Źródło:',
      },
    },
    jobs: {
      tagline: 'Rynek & Rekrutacja',
      title: 'Oferty pracy',
      subtitle: 'Analiza zapotrzebowania rynku, aktualne widełki i oferty dobrane pod Twój profil.',
      targetProfileHeader: 'Twój profil docelowy',
      marketMatchLabel: 'Dopasowanie do rynku',
      inDemandHeader: 'Kogo najczęściej szukają?',
      inDemandSubheader: 'Najszybciej rosnące zapotrzebowanie w branży Tech (dane 2026)',
      openPositionsCount: (count: number) => `${count} aktywnych ofert`,
      demandIndexLabel: 'Wskaźnik popytu',
      salaryAnalysisHeader: 'Analiza widełek cenowych',
      salaryAnalysisSubheader: 'Stawki rynkowe według poziomu doświadczenia',
      b2bNote: 'Wynagrodzenie miesięczne netto (+ VAT) na fakturę',
      uopNote: 'Miesięczne wynagrodzenie brutto na umowie o pracę',
      mentorTipTitle: 'Wskazówka negocjacyjna od mentora:',
      mentorTipDesc: 'Połączenie wiedzy programistycznej z ewaluacją agentów AI (moduł z Twojego 3. etapu) pozwala aplikować od razu na górne widełki poziomu Mid (22–24k B2B) lub role Senior w startupach produktowych.',
      curatedOffersHeader: 'Najciekawsze oferty z dziś',
      curatedOffersSubheader: 'Starannie wyselekcjonowane pod Twoje cele rozwojowe',
      top3Badge: 'Top 3 Dnia',
      salaryLabel: 'Stawka:',
      skillsLabel: 'Kompetencje:',
      whyGoodMatchLabel: 'Dlaczego warto:',
      viewDetailsAction: 'Zobacz szczegóły oferty',
      modal: {
        matchBadge: (score: number) => `${score}% Dopasowania`,
        salaryRangeTitle: 'Widełki wynagrodzenia:',
        orUop: (salary: string) => `lub ${salary}`,
        alignmentTitle: 'Analiza zgodności z Twoją ścieżką',
        matchingSkillsTitle: 'Posiadane umiejętności:',
        missingSkillsTitle: 'Do zrealizowania w kolejnych etapach:',
        missingSkillPrefix: 'Do opanowania: ',
        aboutRoleTitle: 'O stanowisku',
        responsibilitiesTitle: 'Zakres obowiązków',
        perksTitle: 'Benefity i środowisko',
        consultMentorAction: 'Skonsultuj tę ofertę z Mentorem AI',
        saveOfferAction: 'Zapisz ofertę do profilu',
      },
    },
    roadmap: {
      tagline: 'Ścieżka Rozwoju',
      title: 'Twoja ścieżka',
      subtitlePrefix: 'Dedykowany plan etapowy z kamieniami milowymi do roli',
      totalProgressHeader: 'Całkowity postęp ścieżki',
      completedBadge: (percent: number) => `${percent}% Ukończono`,
      milestonesSummary: (completed: number, total: number) => `Ukończono ${completed} z ${total} kamieni milowych`,
      currentWeekStatus: 'Tydzień 2 w trakcie',
      targetGapTitle: 'Luka do oferty docelowej:',
      targetGapMatch: (score: number) => `${score}% dopasowania`,
      targetGapDesc: (company: string) => `Do odblokowania górnych widełek w ${company} brakuje modułu ewaluacji i architektury systemowej (Milestone 3).`,
      milestonesHeader: 'Kamienie milowe',
      milestonesSubheader: 'Kluczowe etapy weryfikowane przez rekruterów i rynek',
      timelineHeader: 'Oś czasu (Tydzień po tygodniu)',
      timelineSubheader: 'Krok po kroku do pełnej gotowości na rynku pracy',
      goToTodayAction: 'Przejdź do dzisiejszego planu',
    },
    messages: {
      tagline: 'Komunikacja',
      title: 'Wiadomości',
      availableMentorsBadge: 'Dostępni mentorzy',
      tabs: {
        mentorAi: 'Mentor AI',
        hrChat: 'Czat z HR',
        mentorSessions: (count: number) => count > 0 ? `Sesje (${count})` : 'Sesje 1:1',
      },
      aiTab: {
        contextPrefix: (role: string, level: string) => `Kontekst: ${role} · Poziom: ${level}`,
        analyzingText: 'Mentor analizuje Twoją ścieżkę...',
        inputPlaceholder: 'Zadaj pytanie mentorowi AI...',
      },
      hrTab: {
        activeBadge: 'Aktywna',
        replyTimeBadge: 'W 24h',
        recruiterInfoDesc: 'Możesz skonsultować realne oczekiwania rekruterów, zapytać o audyt CV pod ATS lub uzyskać bezpośrednie polecenie do firm partnerskich.',
        inputPlaceholder: (recruiterFirstName: string) => `Napisz do ${recruiterFirstName} (HR)...`,
      },
      sessionsTab: {
        bannerTitle: 'Możliwy czas z mentorem',
        bannerDesc: 'Wybierz dogodny termin na bezpłatną 30-minutową sesję 1:1. Skonsultuj kod, architekturę agentów lub porozmawiaj z rekruterem o dopasowaniu CV do widełek rynkowych.',
        bookedSessionsHeader: (count: number) => `Twoje zaplanowane spotkania (${count})`,
        bookingConfirmed: 'Rezerwacja potwierdzona',
        cancelButton: 'Odwołaj',
        durationLabel: '30 min (Google Meet)',
        topicPrefix: 'Temat:',
        availableSlotsHeader: 'Dostępne sloty czasowe',
        availableSlotsSubheader: 'Najbliższe dni',
        specializationPrefix: 'Specjalizacja:',
        bookedStatus: 'Zarezerwowano',
        selectSlotButton: 'Wybierz termin',
      },
      modal: {
        bookTitle: 'Rezerwacja sesji 1:1',
        selectedMentorAndDate: 'Wybrany mentor i termin',
        chooseTopicTitle: 'Wybierz cel / temat spotkania:',
        confirmButton: 'Potwierdź i zarezerwuj termin',
        cancelButton: 'Anuluj',
        successTitle: 'Sesja 1:1 zarezerwowana!',
        successDesc: 'Twój termin został zapisany. Link do wideo-rozmowy oraz przypomnienie w kalendarzu znajdziesz w zakładce "Sesje 1:1".',
        successButton: 'Świetnie, przejdź do spotkań',
      },
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
    news: {
      tagline: 'Knowledge & Trends',
      title: 'News',
      subtitle: 'Key articles, shifts in recruiter requirements, and technology trends.',
      searchPlaceholder: 'Search article, tech, phrase...',
      categories: {
        all: 'All',
        ai_trends: 'AI Trends',
        market: 'Market & Salary',
        tools: 'Tools',
        best_practices: 'Best Practices',
      },
      featuredBadge: 'Must-read',
      featuredHeader: 'Featured article of the day',
      listenAction: 'Listen',
      keyTakeawayLabel: 'Key takeaway:',
      sourceLabel: 'Source:',
      readFullAction: 'Read full',
      latestHeader: 'Latest publications',
      articlesCount: (count: number) => `${count} ${count === 1 ? 'article' : 'articles'}`,
      emptyTitle: 'No articles',
      emptyDesc: 'Try changing category or clearing your search term.',
      voiceBrief: {
        badge: 'AI Audio Briefing',
        playingBadge: 'PLAYING',
        cardTitle: 'Listen to news digest',
        descriptions: {
          parental_leave: 'AI voice briefing summarizes top market moves in 5 minutes — ideal during a stroller walk or baby nap.',
          return_after_break: 'AI voice briefing summarizes top market moves in 5 minutes — ideal for catching up with industry trends at your own pace.',
          career_change: 'AI voice briefing summarizes top market moves in 5 minutes — ideal for discovering a new tech domain step by step.',
          promotion: 'AI voice briefing summarizes top market moves in 5 minutes — ideal on your commute or over morning coffee.',
          other: 'AI voice briefing summarizes top market moves in 5 minutes — ideal on the go or during a quiet moment.',
        },
        defaultDescription: 'AI voice briefing summarizes top market moves in 5 minutes — ideal during a stroller walk or baby nap.',
        topicsCount: (count: number) => `🎧 ${count} key topics`,
        voiceLanguageTag: '🇵🇱 Polish AI Voice',
        cvTakeawaysTag: '💡 CV Takeaways',
        openPlayerButton: 'Open voice player',
        listenDigestButton: (duration: string) => `Listen to digest (${duration})`,
      },
      modal: {
        listenArticleSummary: 'Listen to voice summary of this article',
        keyTakeawayCareer: 'Key takeaway for your career:',
        introduction: 'Introduction',
        analysisDetails: 'Analysis & details',
        topicTags: 'Topic tags',
        publishedPrefix: 'Published:',
        sourcePrefix: 'Source:',
      },
    },
    jobs: {
      tagline: 'Market & Recruiting',
      title: 'Job Offers',
      subtitle: 'Market demand analysis, current salaries, and roles tailored to your profile.',
      targetProfileHeader: 'Your target profile',
      marketMatchLabel: 'Market match',
      inDemandHeader: 'Who is in highest demand?',
      inDemandSubheader: 'Fastest growing demand across Tech roles (2026 data)',
      openPositionsCount: (count: number) => `${count} active jobs`,
      demandIndexLabel: 'Demand index',
      salaryAnalysisHeader: 'Salary range analysis',
      salaryAnalysisSubheader: 'Market rates according to experience level',
      b2bNote: 'Monthly net invoiced amount (+ VAT)',
      uopNote: 'Monthly gross salary under employment contract',
      mentorTipTitle: 'Negotiation tip from mentor:',
      mentorTipDesc: 'Pairing software engineering with AI agent evaluation (milestone 3 in your plan) allows you to target top-tier Mid brackets (22–24k B2B) or Senior roles in product startups.',
      curatedOffersHeader: 'Top curated offers today',
      curatedOffersSubheader: 'Carefully handpicked for your career goals',
      top3Badge: 'Top 3 of the Day',
      salaryLabel: 'Salary:',
      skillsLabel: 'Skills:',
      whyGoodMatchLabel: 'Why it matches:',
      viewDetailsAction: 'View offer details',
      modal: {
        matchBadge: (score: number) => `${score}% Match`,
        salaryRangeTitle: 'Salary range:',
        orUop: (salary: string) => `or ${salary}`,
        alignmentTitle: 'Alignment with your career roadmap',
        matchingSkillsTitle: 'Skills you have:',
        missingSkillsTitle: 'To master in next stages:',
        missingSkillPrefix: 'To master: ',
        aboutRoleTitle: 'About the role',
        responsibilitiesTitle: 'Responsibilities',
        perksTitle: 'Perks & environment',
        consultMentorAction: 'Consult this offer with AI Mentor',
        saveOfferAction: 'Save offer to profile',
      },
    },
    roadmap: {
      tagline: 'Career Roadmap',
      title: 'Your Roadmap',
      subtitlePrefix: 'Dedicated milestone roadmap toward your role as',
      totalProgressHeader: 'Total roadmap progress',
      completedBadge: (percent: number) => `${percent}% Completed`,
      milestonesSummary: (completed: number, total: number) => `Completed ${completed} of ${total} milestones`,
      currentWeekStatus: 'Week 2 in progress',
      targetGapTitle: 'Gap to target offer:',
      targetGapMatch: (score: number) => `${score}% match`,
      targetGapDesc: (company: string) => `Unlocking top salary bands at ${company} requires evaluation and system architecture modules (Milestone 3).`,
      milestonesHeader: 'Milestones',
      milestonesSubheader: 'Key checkpoints verified by recruiters and the market',
      timelineHeader: 'Timeline (Week by week)',
      timelineSubheader: 'Step by step toward complete job market readiness',
      goToTodayAction: 'Go to today plan',
    },
    messages: {
      tagline: 'Communication',
      title: 'Messages',
      availableMentorsBadge: 'Available mentors',
      tabs: {
        mentorAi: 'AI Mentor',
        hrChat: 'HR Chat',
        mentorSessions: (count: number) => count > 0 ? `Sessions (${count})` : '1:1 Sessions',
      },
      aiTab: {
        contextPrefix: (role: string, level: string) => `Context: ${role} · Level: ${level}`,
        analyzingText: 'Mentor is analyzing your roadmap...',
        inputPlaceholder: 'Ask AI mentor a question...',
      },
      hrTab: {
        activeBadge: 'Active',
        replyTimeBadge: 'In 24h',
        recruiterInfoDesc: 'Consult real recruiter expectations, request ATS CV reviews, or get direct referrals to partner companies.',
        inputPlaceholder: (recruiterFirstName: string) => `Message ${recruiterFirstName} (HR)...`,
      },
      sessionsTab: {
        bannerTitle: 'Available mentor time',
        bannerDesc: 'Choose a convenient slot for a free 30-minute 1:1 session. Review code, agent architecture, or talk to a recruiter about CV-market fit.',
        bookedSessionsHeader: (count: number) => `Your scheduled sessions (${count})`,
        bookingConfirmed: 'Booking confirmed',
        cancelButton: 'Cancel',
        durationLabel: '30 min (Google Meet)',
        topicPrefix: 'Topic:',
        availableSlotsHeader: 'Available time slots',
        availableSlotsSubheader: 'Upcoming days',
        specializationPrefix: 'Specialization:',
        bookedStatus: 'Booked',
        selectSlotButton: 'Select slot',
      },
      modal: {
        bookTitle: 'Book 1:1 session',
        selectedMentorAndDate: 'Selected mentor & time',
        chooseTopicTitle: 'Choose consultation topic:',
        confirmButton: 'Confirm and book slot',
        cancelButton: 'Cancel',
        successTitle: '1:1 Session booked!',
        successDesc: 'Your session has been saved. The video call link and calendar reminder are available under "1:1 Sessions".',
        successButton: 'Great, view sessions',
      },
    },
  },
};

export function getTranslations(lang: AppLanguage = 'pl'): Translations {
  return translations[lang] ?? translations.pl;
}
