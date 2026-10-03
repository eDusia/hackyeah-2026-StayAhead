import type { NewsArticle } from '@/types';

export const newsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Ewaluacja (evals) wypiera czysty prompt engineering w rekrutacjach 2026',
    summary:
      'Firmy odchodzą od oceniania kandydatów po "ładnych promptach". Kluczowym kryterium staje się umiejętność mierzenia regresji, testowania dokładności agentów oraz tworzenia benchmarków.',
    content:
      'Rynek sztucznej inteligencji dojrzał do etapu produkcyjnego. Zespoły inżynierskie nie potrzebują już osób, które jedynie pytają modele przez interfejs, lecz takich, które potrafią wdrożyć automatyczne pętle ewaluacji (LLM-as-a-judge, testy syntetyczne, scoring precyzji). Z danych rynkowych wynika, że kandydaci z wiedzą o evals otrzymują o 30% więcej zaproszeń na rozmowy techniczne.',
    category: 'ai_trends',
    readTime: '3 min',
    publishedAt: 'Dzisiaj, 09:15',
    source: 'StayAhead Tech Intel',
    keyTakeaway: 'Zbuduj w swoim projekcie test sprawdzający halucynacje — to najlepszy punkt zaczepienia w rozmowie z rekruterem.',
    tags: ['AI Agents', 'Ewaluacja', 'Trendy 2026'],
    isFeatured: true,
  },
  {
    id: 'news-2',
    title: 'Raport płacowy Tech Q3/Q4 2026: Widełki dla AI Engineers i Senior Fullstack',
    summary:
      'Stawki w rolach łączących tradycyjne programowanie (TypeScript / Python) z integracją agentów wzrosły średnio o 18% w skali roku.',
    content:
      'Największy wzrost odnotowały role hybrydowe: inżynierowie oprogramowania, którzy potrafią wdrożyć agenta opartego o tool-calling i zintegrować go z relacyjną bazą danych. Mediana stawek B2B dla poziomu Mid wynosi obecnie 20 000 – 25 000 PLN netto + VAT, a na poziomie Senior przekracza 32 000 PLN.',
    category: 'market',
    readTime: '4 min',
    publishedAt: 'Wczoraj, 17:40',
    source: 'DevSalary Monitor',
    keyTakeaway: 'Połączenie TypeScript + architektura agentowa plasuje Cię w górnym decylu stawek rynkowych.',
    tags: ['Zarobki', 'Rynek pracy', 'B2B'],
  },
  {
    id: 'news-3',
    title: 'System Design w dobie agentów: Architektura State Machine i Tool Calling',
    summary:
      'Dlaczego proste łańcuchy LLM zawodzą na produkcji i jak nowoczesne systemy używają deterministycznych grafów stanów.',
    content:
      'Większość wpadek agentów w systemach produkcyjnych wynika z braku determinizmu w pętlach decyzji. Artykuł wyjaśnia, dlaczego biblioteki orkiestracji stanów i jawne schematy walidacji danych (JSON schema, Pydantic, Zod) są dziś fundamentem architektonicznym każdego skalowalnego asystenta.',
    category: 'tools',
    readTime: '5 min',
    publishedAt: '2 dni temu',
    source: 'Engineering Architecture Blog',
    keyTakeaway: 'Używaj jawnego typowania i walidacji argumentów przed wywołaniem narzędzi zewnętrznych.',
    tags: ['System Design', 'Architektura', 'Narzędzia'],
  },
  {
    id: 'news-4',
    title: 'Powrót do techu po przerwie: Co naprawdę liczy się dla hiring managerów?',
    summary:
      'Przerwa w karierze lub urlop rodzicielski to nie minus, jeśli potrafisz pokazać aktualną wiedzę z ostatnich miesięcy.',
    content:
      'Hiring managerowie z 15 wiodących software house’ów potwierdzają: nie pytają o długość przerwy, ale o to, czy kandydat rozumie dzisiejsze narzędzia (wspomaganie agentowe, nowoczesne IDE, CI/CD). Jeden przemyślany projekt z ostatnich 6 tygodni ma większą wagę niż 3 lata starego doświadczenia.',
    category: 'best_practices',
    readTime: '3 min',
    publishedAt: '3 dni temu',
    source: 'Talent & Inclusion Review',
    keyTakeaway: 'Skup się na świeżym portfolio i aktualnym stosie technologicznym — to buduje natychmiastowe zaufanie.',
    tags: ['Powrót do pracy', 'Kariera', 'HR'],
  },
  {
    id: 'news-5',
    title: 'Context Caching i nowe modele: Jak zredukować koszty API o 80%',
    summary:
      'Wprowadzenie pamięci podręcznej kontekstu w modelach frontierowych drastycznie zmienia koszt wdrożenia zaawansowanych agentów.',
    content:
      'Wdrażanie agentów z dużą bazą wiedzy staje się 4–5 razy tańsze dzięki semantycznemu cachingowi i kontekstowemu pre-promptingowi. Dla firm oznacza to zielone światło na budowę wewnętrznych asystentów procesowych.',
    category: 'ai_trends',
    readTime: '2 min',
    publishedAt: '4 dni temu',
    source: 'AI Infra Pulse',
    keyTakeaway: 'Śledź koszty tokenów — znajomość optymalizacji wydatków to kluczowy atut w rozmowach z zarządem.',
    tags: ['Optymalizacja', 'LLM', 'Koszty'],
  },
];

export const dailyVoiceBriefing = {
  id: 'brief-today',
  title: 'StayAhead Audio Brief',
  subtitle: 'Poranny skrót najważniejszych newsów i trendów rynku (2 min)',
  totalDurationText: '~2 min',
  introSpeech:
    'Dzień dobry! Oto Twój 2-minutowy briefing głosowy StayAhead. Wybraliśmy najważniejsze wydarzenia z rynku, które mają bezpośredni wpływ na Twoją ścieżkę rozwoju.',
  outroSpeech:
    'To najważniejsze wnioski na dziś. Pełne wersje artykułów i szczegóły znajdziesz na liście nowości. Powodzenia w dzisiejszych zadaniach!',
  snippets: [
    {
      id: 'snip-1',
      articleId: 'news-1',
      topicLabel: 'Ewaluacja & Rekrutacje',
      title: 'Ewaluacja wypiera czysty prompt engineering w 2026',
      speechText:
        'Temat pierwszy. Rekruterzy w 2026 roku stawiają na ewaluację modeli. Zamiast pytań o same prompty, firmy oczekują testowania regresji i benchmarków dokładności agentów. Wniosek: zbuduj w swoim projekcie test sprawdzający halucynacje.',
      keyTakeaway:
        'Zbuduj w projekcie test sprawdzający halucynacje — to najlepszy punkt zaczepienia w rozmowie z rekruterem.',
      estimatedSec: 25,
    },
    {
      id: 'snip-2',
      articleId: 'news-2',
      topicLabel: 'Raport Płacowy',
      title: 'Widełki dla AI Engineers i Senior Fullstack',
      speechText:
        'Temat drugi. Raport płacowy tech. Role łączące TypeScript z architekturą agentową notują wzrost stawek o 18 procent. Mediana dla poziomu mid wynosi 20 do 25 tysięcy złotych na B2B, a dla seniorów przekracza 32 tysiące.',
      keyTakeaway:
        'Połączenie TypeScript + architektura agentowa plasuje Cię w górnym decylu stawek rynkowych.',
      estimatedSec: 24,
    },
    {
      id: 'snip-3',
      articleId: 'news-4',
      topicLabel: 'Kariera & Rekrutacja',
      title: 'Powrót do technologii po przerwie',
      speechText:
        'Temat trzeci. Powrót do pracy po przerwie lub urlopie. Hiring managerowie potwierdzają: luka w CV nie jest przeszkodą, jeśli zaprezentujesz jeden dopracowany projekt z ostatnich tygodni oparty o nowoczesne narzędzia i agentów.',
      keyTakeaway:
        'Skup się na świeżym portfolio i aktualnym stosie technologicznym — to buduje natychmiastowe zaufanie.',
      estimatedSec: 26,
    },
    {
      id: 'snip-4',
      articleId: 'news-3',
      topicLabel: 'Architektura',
      title: 'System Design: State Machine i Tool Calling',
      speechText:
        'Temat czwarty. Architektura systemów AI. Deterministyczne grafy stanów i jawne schematy walidacji argumentów narzędzi to dzisiaj fundament stabilnych asystentów produkcyjnych.',
      keyTakeaway:
        'Używaj jawnego typowania i walidacji argumentów przed wywołaniem narzędzi zewnętrznych.',
      estimatedSec: 22,
    },
  ],
};

