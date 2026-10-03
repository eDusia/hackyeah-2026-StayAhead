# StayAhead 🚀

> **Inteligentny towarzysz powrotu do kariery w technologiach po urlopie rodzicielskim.**  
> Projekt przygotowany na **HackYeah 2026** w kategorii **Technologie dla Kobiet**.

---

## 💡 O Projekcie

Według danych Eurostatu i GUS, obowiązki rodzinne są powodem bierności zawodowej aż **11,7% kobiet i zaledwie 1,3% mężczyzn**, a po narodzinach dziecka zatrudnienie full-time kobiet spada z 74% do 49%. Jednocześnie do 2030 roku aż 39% kluczowych umiejętności technologicznych ulegnie przedawnieniu (World Economic Forum).

Kobiety planujące powrót na rynek pracy zderzają się z **paraliżem decyzyjnym, brakiem czasu (15–30 min dziennie)** oraz **lękiem przed filtrami ATS**, które automatycznie odrzucają kandydatki z przerwą w zatrudnieniu.

**StayAhead** przekształca przerwę rodzicielską w rynkową przewagę. Aplikacja atomizuje rozwój zawodowy do mikro-nawyków, dostarcza pigułki wiedzy audio i łączy użytkowniczki bezpośrednio z rekruterami partnerskich firm.

---

## ✨ Kluczowe Funkcjonalności (5 Filarów)

1. **🎯 Personalizowany Onboarding z budżetem czasu**
   - Elastyczny wybór rytmu nauki: od **15–30 min dziennie** (podczas drzemki malucha) po intensywniejsze sprinty.
   - Wyznaczenie daty horyzontu powrotu (np. 3, 6, 12 miesięcy) i automatyczne przeliczenie tempa bez wywoływania presji.
   - Wybór domeny (AI & ML, Software, Data, Product, UX/Design) i docelowej roli.

2. **☀️ Plan na Dziś (Daily Focus & Bezstresowy Streak)**
   - **Tylko 1 priorytet dziennie** (10–15 minut), eliminujący paraliż decyzyjny.
   - Wspierający licznik passy (Streak).
   - Mechanizm ochrony przed wypaleniem: raportowanie blokad tygodnia pozwala AI Mentorowi skrócić plan zamiast nawarstwiać zaległości.

3. **🎧 Audio Briefing AI (Innowacja Hands-Free)**
   - Dynamiczny syntezator mowy z polskim lektorem AI.
   - 5-minutowe pigułki rynkowe odsłuchiwane **ze słuchawkami na spacerze z wózkiem** lub w wolnej chwili.
   - Dynamiczne dopasowanie narracji do wybranego celu (np. urlop rodzicielski, powrót po przerwie, przebranżowienie).
   - Gotowe wnioski: jak nowo zdobytą wiedzę wpisać do CV i portfolio.

4. **📊 Radar Rynku & Transparentność Wynagrodzeń**
   - Monitorowanie zapotrzebowania na role technologiczne w czasie rzeczywistym (+% r/r, wskaźnik popytu).
   - Analiza stawek: natychmiastowe porównanie widełek **B2B (netto + VAT)** oraz **UoP (brutto)**.
   - Wskaźnik dopasowania (np. **78% Match**) pokazujący brakujące 1–2 mikro-kompetencje dzielące od górnych stawek.

5. **🤝 Mentoring & Pomost Rekrutacyjny (Omijanie sita ATS)**
   - **Mentor AI 24/7:** natychmiastowe wyjaśnianie wątpliwości architektonicznych i technologicznych.
   - **Czat z rekruterami HR:** bezpośredni kontakt z rekruterkami firm partnerskich weryfikującymi realne umiejętności, a nie ciągłość dat w CV.
   - **Rezerwacja sesji 1:1:** bezpłatne konsultacje online (Google Meet) z praktykami branżowymi i Staff Engineerami.

6. **🌐 Pełna Dwujęzyczność (PL / ENG)**
   - Zintegrowany przełącznik języka (Polski 🇵🇱 / English 🇬🇧) obejmujący wszystkie widoki aplikacji.

---

## 🛠️ Stack Technologiczny

- **Framework:** React Native + Expo SDK 57
- **Język:** TypeScript (100% strict type-safety, zero błędów `tsc`)
- **Nawigacja:** React Navigation v7 (Native Stack + Bottom Tabs)
- **Styling:** NativeWind v4 + Tailwind CSS
- **Stan:** Zustand (in-memory modular stores: `user`, `task`, `chat`, `hr`, `mentor`)
- **Dźwięk & Mowa:** Web Speech API / Expo Speech
- **Ikony & UI:** `@expo/vector-icons` (Ionicons), Reanimated, Safe Area Context

---

## 🚀 Instrukcja Uruchomienia (Dla Sędziów / Jury)

Aplikację można uruchomić na dwa sposoby: **w przeglądarce (najszybciej)** lub **na telefonie z aplikacją Expo Go**.

### Wymagania wstępne
- Zainstalowane środowisko **Node.js** (rekomendowana wersja LTS: v20 lub v22)
- Menedżer pakietów **npm**

### 1. Klonowanie i instalacja zależności

```bash
git clone https://github.com/eDusia/hackyeah-2026-StayAhead.git
cd hackyeah-2026-StayAhead
npm install
```

### 2. Uruchomienie w przeglądarce Web (Rekomendowane do szybkiej oceny)

```bash
npm run web
```
Aplikacja automatycznie otworzy się pod adresem: `http://localhost:8081`  
*(Zalecamy włączenie trybu responsywnego/mobilnego w DevTools przeglądarki: `F12` -> ikona telefonu, np. iPhone 14 / Pixel 7).*

### 3. Uruchomienie na telefonie (Expo Go)

```bash
npx expo start
```
- Pobierz bezpłatną aplikację **Expo Go** z App Store (iOS) lub Google Play (Android).
- Zeskanuj kod QR wyświetlony w terminalu:
  - **Android:** Bezpośrednio w aplikacji Expo Go (opcja *Scan QR code*).
  - **iOS:** Przez systemową aplikację Aparatu (kliknij wyskakujący baner Expo).

---

## 📋 Rekomendowany Scenariusz Testowy (Demo Walkthrough)

1. **Onboarding (Kreator profilu):**
   - Podaj imię (np. *Edyta*).
   - Wybierz cel: **Powrót po urlopie rodzicielskim**.
   - Wybierz horyzont czasowy (np. *6 miesięcy* lub *12 miesięcy*).
   - Wybierz domenę: **AI & Machine Learning** -> Rola: **AI Application Engineer**.
   - Określ czas na naukę: **15–30 min dziennie** (mikro-nawyki).
   - Kliknij **Zacznij z planem StayAhead**.

2. **Zakładka „Dziś” (Today):**
   - Zobacz spersonalizowany widok **Daily Focus**.
   - Kliknij kółko zadania, aby odhaczyć ukończenie — zaobserwuj aktualizację paska postępu oraz licznika passy (Streak).
   - Sprawdź mini-podgląd osi czasu kariery i szybkie akcje.

3. **Zakładka „Nowości” (News & Audio Briefing):**
   - Zobacz kartę **Audio Briefing AI** — zwróć uwagę na dynamiczny opis:  
     *„AI lektor podsumowuje najważniejsze ruchy na rynku w 5 minut — idealne podczas spaceru z wózkiem lub drzemki malucha.”*
   - Kliknij **Odsłuchaj skrót** — uruchomi się odtwarzacz z syntezą mowy i animowaną falą audio.
   - Przetestuj filtrowanie publikacji (kategorie i wyszukiwarkę) oraz otwórz pełny podgląd artykułu.

4. **Zakładka „Oferty” (Jobs & Market Radar):**
   - Zobacz wskaźnik dopasowania profilu (np. *78% Match*).
   - Przełącz widełki pomiędzy **B2B** a **UoP**, aby sprawdzić transparentne stawki rynkowe.
   - Kliknij wybraną ofertę z listy „Top 3 Dnia”, aby obejrzeć audyt wymaganych vs posiadanych kompetencji.

5. **Zakładka „Wiadomości” (Messages):**
   - **Mentor AI:** Wybierz szybką podpowiedź lub wpisz własne pytanie do asystenta.
   - **Czat z HR:** Przełącz kontakt rekrutera partnerskiego (np. Katarzyna Nowak z CloudVanguard) i wyślij wiadomość — rekruter odpowie symulacją w ciągu chwili.
   - **Sesje 1:1:** Wybierz dogodny slot mentora, wskaż temat konsultacji i potwierdź rezerwację bezpłatnej sesji online.

6. **Zakładka „Profil” (Profile):**
   - Przełącz język aplikacji na **English 🇬🇧** — zobacz natychmiastowe przetłumaczenie interfejsu.
   - Opcja **Resetuj profil** pozwala w dowolnym momencie zresetować dane i ponownie przejść ścieżkę onboardingu.

---

## 📁 Struktura Projektu

```text
src/
├── assets/         # Grafiki, okładki, logotypy
├── components/     # Modułowe komponenty UI
│   ├── common/     # Badge, Button, Card, Input, ProgressBar
│   ├── dashboard/  # DailyTaskCard, StreakCard, TrendRadarCard
│   ├── news/       # VoiceBriefCard, VoicePlayerModal, VoiceWaveVisualizer, StickyVoiceBar
│   └── roadmap/    # MilestoneCard, TimelineNode
├── constants/      # Konfiguracja motywu, etykiet, opcji onboardingu
├── i18n/           # Moduł dwujęzyczności translations.ts (PL / ENG)
├── mock/           # Zestawy danych: artykuły, zadania, oferty, sesje 1:1, czaty HR
├── navigation/     # AppNavigator (Stack) & TabNavigator (6 zakładek)
├── screens/        # Ekrany: Onboarding, Today, News, Jobs, Messages, Profile
├── store/          # Store'y Zustand (useUserStore, useTaskStore, useChatStore, useHRChatStore, useMentorStore)
├── types/          # Typy TypeScript modeli biznesowych
└── utils/          # Serwis syntezy mowy (speechService), kalkulatory dat i dopasowania
```

---

## 👥 Zespół

Projekt stworzony z pasją na hackathon **HackYeah 2026** w odpowiedzi na realne wyzwania kobiet powracających do branży technologicznej.
