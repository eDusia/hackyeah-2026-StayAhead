import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { ProgressBar } from '@/components/common/ProgressBar';
import {
  CAREER_DOMAIN_LABELS,
  DATE_PRESET_OPTIONS,
  GOAL_TYPE_LABELS,
  GOAL_TYPE_OPTIONS,
  SUGGESTED_ROLES_BY_DOMAIN,
  TIME_COMMITMENT_LABELS,
  TIME_COMMITMENT_OPTIONS,
} from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';
import type { CareerDomain, GoalType, TimeCommitment } from '@/types';
import { daysUntil, formatDate } from '@/utils/date';
import { pluralize } from '@/utils/helpers';

const addMonthsToDate = (months: number): Date => {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d;
};

const domains = Object.keys(CAREER_DOMAIN_LABELS) as CareerDomain[];

export function OnboardingScreen() {
  const completeOnboarding = useUserStore((state) => state.completeOnboarding);
  const scrollViewRef = useRef<ScrollView>(null);

  // 0. Imię
  const [name, setName] = useState('');

  // 1. Określenie celu
  const [goalType, setGoalType] = useState<GoalType | null>(null);
  const [customGoal, setCustomGoal] = useState('');

  // 2. Kiedy chcemy wrócić lub zacząć
  const [selectedPreset, setSelectedPreset] = useState<string>('3m');
  const [targetDate, setTargetDate] = useState<Date>(() => addMonthsToDate(3));
  const [showPicker, setShowPicker] = useState(false);

  // 3. Interesujący obszar
  const [domain, setDomain] = useState<CareerDomain | null>(null);
  const [customDomain, setCustomDomain] = useState('');
  const [isDomainOpen, setIsDomainOpen] = useState(false);

  // 4. Interesująca rola
  const [targetRole, setTargetRole] = useState('');
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [showCustomRoleInput, setShowCustomRoleInput] = useState(false);

  // 5. Czas na naukę
  const [timeCommitment, setTimeCommitment] = useState<TimeCommitment | null>(null);

  // Validation states for cascading disclosure
  const step0Valid = name.trim().length >= 2;
  const step1Valid = step0Valid && !!goalType;
  const step2Valid = step1Valid && !!targetDate;
  const step3Valid = step2Valid && !!domain && (domain !== 'other' || customDomain.trim().length >= 2);
  const step4Valid = step3Valid && targetRole.trim().length >= 2;
  const step5Valid = step4Valid && !!timeCommitment;

  const completedStepsCount = [
    step0Valid,
    step1Valid,
    step2Valid,
    step3Valid,
    step4Valid,
    step5Valid,
  ].filter(Boolean).length;

  const progressPercent = Math.round((completedStepsCount / 6) * 100);

  // Smooth auto-scroll when new section is unlocked
  const prevCompletedCount = useRef(completedStepsCount);
  useEffect(() => {
    if (completedStepsCount > prevCompletedCount.current) {
      prevCompletedCount.current = completedStepsCount;
      const timer = setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [completedStepsCount]);

  const handlePresetSelect = (presetId: string, months: number) => {
    setSelectedPreset(presetId);
    setTargetDate(addMonthsToDate(months));
    setShowPicker(false);
  };

  const onDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (date) {
      setTargetDate(date);
      setSelectedPreset('custom');
    }
  };

  const handleDomainSelect = (d: CareerDomain) => {
    setDomain(d);
    setIsDomainOpen(false);
    // Suggest first popular role if user hasn't selected a matching one
    const suggestions = SUGGESTED_ROLES_BY_DOMAIN[d] || [];
    if (!targetRole || !suggestions.includes(targetRole)) {
      setTargetRole(suggestions[0] || '');
      setShowCustomRoleInput(false);
    }
  };

  const handleRoleSelect = (roleName: string) => {
    setTargetRole(roleName);
    setIsRoleOpen(false);
    setShowCustomRoleInput(false);
  };

  const handleCustomRoleSelect = () => {
    setIsRoleOpen(false);
    setShowCustomRoleInput(true);
    setTargetRole('');
  };

  const finish = () => {
    if (!step5Valid || !goalType || !domain || !timeCommitment) {
      return;
    }

    const domainLabel = domain === 'other' ? customDomain.trim() : CAREER_DOMAIN_LABELS[domain];
    const goalLabel = goalType === 'other' && customGoal.trim() ? customGoal.trim() : GOAL_TYPE_LABELS[goalType];
    const commitmentLabel = TIME_COMMITMENT_LABELS[timeCommitment];

    completeOnboarding({
      name: name.trim(),
      goal: {
        targetRole: targetRole.trim(),
        domain,
        customDomain: domain === 'other' ? customDomain.trim() : undefined,
        goalType,
        customGoalType: goalType === 'other' && customGoal.trim() ? customGoal.trim() : undefined,
        timeCommitment,
        currentLevel: 'intermediate',
        targetDate: targetDate.toISOString(),
        description: `${goalLabel}: przejście do roli ${targetRole.trim()} w obszarze ${domainLabel} (${commitmentLabel}).`,
      },
    });
  };

  const daysLeft = daysUntil(targetDate.toISOString());

  const fillDemoProfile = () => {
    completeOnboarding({
      name: 'Aleksandra',
      currentRole: 'Frontend Developer',
      goal: {
        targetRole: 'AI Application Engineer',
        domain: 'ai',
        goalType: 'promotion',
        timeCommitment: '1h_daily',
        currentLevel: 'intermediate',
        targetDate: addMonthsToDate(3).toISOString(),
        description: 'Awans / Nowe technologie: przejście do roli AI Application Engineer w obszarze AI & Machine Learning (1 godzina / dzień).',
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        ref={scrollViewRef}
        contentContainerClassName="px-5 pb-16"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mt-4 items-center">
          <View className="flex-row items-center justify-between w-full px-1">
            <View className="flex-row items-center gap-1.5 rounded-full border border-primary-200/80 bg-primary-50 px-3.5 py-1">
              <Ionicons name="sparkles" size={12} color="#4f46e5" />
              <Text className="text-[11px] font-bold uppercase tracking-widest text-primary-700">
                StayAhead
              </Text>
            </View>
            <Pressable
              onPress={fillDemoProfile}
              className="rounded-full border border-primary-200 bg-white px-3 py-1 shadow-2xs active:bg-primary-50"
            >
              <Text className="text-[11px] font-bold text-primary-700">⚡ Wypełnij profil demo</Text>
            </Pressable>
          </View>

          <View className="mt-3 items-center">
            <Text className="text-center text-4xl font-black tracking-tight text-slate-900">
              Powrót do <Text className="text-primary-600">gry</Text>
            </Text>
            <View className="mt-1.5 h-1 w-14 rounded-full bg-primary-500" />
          </View>

          <Text className="mt-3 px-3 text-center text-sm leading-6 text-slate-500">
            Odpowiedz na pytania – odblokowują się kolejno, a na koniec agent przygotuje dla Ciebie spersonalizowaną ścieżkę i plan dzienny.
          </Text>

          <View className="mt-5 w-full">
            <ProgressBar value={progressPercent} label="Gotowość Twojego profilu" />
          </View>
        </View>

        {/* ========================================================
            0. NASZE IMIĘ
           ======================================================== */}
        <Card className="mt-6 border-slate-200">
          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2.5">
              <View className="h-8 w-8 items-center justify-center rounded-xl bg-primary-50">
                <Ionicons name="person-outline" size={17} color="#4f46e5" />
              </View>
              <Text className="text-base font-bold text-slate-900">Jak masz na imię?</Text>
            </View>
            {step0Valid ? (
              <Ionicons name="checkmark-circle" size={22} color="#0d9488" />
            ) : null}
          </View>
          <Text className="mb-3 text-sm text-slate-500">
            Mentor AI będzie się do Ciebie zwracać po imieniu podczas codziennych check-inów.
          </Text>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="np. Aleksandra, Michał"
            icon="person-outline"
          />
        </Card>

        {/* ========================================================
            1. OKREŚLENIE CELU
           ======================================================== */}
        {step0Valid ? (
          <Card className="mt-5 border-slate-200">
            <View className="mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2.5">
                <View className="h-8 w-8 items-center justify-center rounded-xl bg-primary-50">
                  <Ionicons name="compass-outline" size={17} color="#4f46e5" />
                </View>
                <Text className="text-base font-bold text-slate-900">Jaki jest Twój główny cel?</Text>
              </View>
              {step1Valid ? (
                <Ionicons name="checkmark-circle" size={22} color="#0d9488" />
              ) : null}
            </View>
            <Text className="mb-4 text-sm text-slate-500">
              Wybierz sytuację, w której obecnie się znajdujesz:
            </Text>

            <View className="gap-2.5">
              {GOAL_TYPE_OPTIONS.map((opt) => {
                const isSelected = goalType === opt.id;
                return (
                  <Pressable
                    key={opt.id}
                    onPress={() => setGoalType(opt.id)}
                    className={`rounded-2xl border p-3.5 transition-all ${
                      isSelected
                        ? 'border-primary-600 bg-primary-50/70'
                        : 'border-slate-200 bg-white active:bg-slate-50'
                    }`}
                  >
                    <View className="flex-row items-start gap-3">
                      <View
                        className={`mt-0.5 h-8 w-8 items-center justify-center rounded-xl ${
                          isSelected ? 'bg-primary-600' : 'bg-slate-100'
                        }`}
                      >
                        <Ionicons
                          name={opt.icon}
                          size={18}
                          color={isSelected ? '#ffffff' : '#64748b'}
                        />
                      </View>
                      <View className="flex-1">
                        <Text
                          className={`text-base font-semibold ${
                            isSelected ? 'text-primary-900' : 'text-slate-900'
                          }`}
                        >
                          {opt.label}
                        </Text>
                        <Text className="mt-0.5 text-xs leading-4 text-slate-500">
                          {opt.description}
                        </Text>
                      </View>
                      <View
                        className={`mt-1 h-5 w-5 items-center justify-center rounded-full border ${
                          isSelected ? 'border-primary-600 bg-primary-600' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected ? <Ionicons name="checkmark" size={13} color="#ffffff" /> : null}
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            {goalType === 'other' ? (
              <View className="mt-3">
                <Input
                  label="Opisz swój cel (opcjonalnie)"
                  value={customGoal}
                  onChangeText={setCustomGoal}
                  placeholder="np. Chcę przejść z marketingu do prompt engineeringu"
                  icon="sparkles-outline"
                />
              </View>
            ) : null}
          </Card>
        ) : null}

        {/* ========================================================
            2. OKREŚLENIE CZASU
           ======================================================== */}
        {step1Valid ? (
          <Card className="mt-5 border-slate-200">
            <View className="mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2.5">
                <View className="h-8 w-8 items-center justify-center rounded-xl bg-primary-50">
                  <Ionicons name="calendar-outline" size={17} color="#4f46e5" />
                </View>
                <Text className="text-base font-bold text-slate-900">Kiedy chcesz wrócić lub zacząć?</Text>
              </View>
              {step2Valid ? (
                <Ionicons name="checkmark-circle" size={22} color="#0d9488" />
              ) : null}
            </View>
            <Text className="mb-3 text-sm text-slate-500">
              Wybierz szybki horyzont czasowy lub ustaw dokładny dzień w kalendarzu:
            </Text>

            {/* Szybkie opcje (chips) */}
            <View className="flex-row flex-wrap gap-2">
              {DATE_PRESET_OPTIONS.map((preset) => {
                const isSelected = selectedPreset === preset.id;
                return (
                  <Pressable
                    key={preset.id}
                    onPress={() => handlePresetSelect(preset.id, preset.months)}
                    className={`rounded-xl px-3.5 py-2.5 border ${
                      isSelected
                        ? 'border-primary-600 bg-primary-600'
                        : 'border-slate-200 bg-white active:bg-slate-50'
                    }`}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        isSelected ? 'text-white' : 'text-slate-700'
                      }`}
                    >
                      {preset.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Wybór z kalendarza */}
            <Pressable
              onPress={() => setShowPicker(true)}
              className="mt-3.5 flex-row items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5"
            >
              <View className="flex-row items-center gap-3">
                <View className="h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200">
                  <Ionicons name="calendar-outline" size={18} color="#4f46e5" />
                </View>
                <View>
                  <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Wyznaczona data
                  </Text>
                  <Text className="mt-0.5 text-base font-bold text-slate-900">
                    {formatDate(targetDate.toISOString())}
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
                  {daysLeft !== null && daysLeft >= 0
                    ? `za ${daysLeft} ${pluralize(daysLeft, 'dzień', 'dni', 'dni')}`
                    : 'Dzisiaj'}
                </Text>
                <Text className="mt-1 text-xs font-medium text-primary-600">Zmień datę</Text>
              </View>
            </Pressable>

            {showPicker ? (
              <View className="mt-3 rounded-2xl bg-white p-2 border border-slate-200">
                <DateTimePicker
                  value={targetDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  minimumDate={new Date()}
                  onChange={onDateChange}
                />
                {Platform.OS === 'ios' ? (
                  <Button
                    label="Gotowe"
                    variant="outline"
                    className="mt-2"
                    onPress={() => setShowPicker(false)}
                  />
                ) : null}
              </View>
            ) : null}
          </Card>
        ) : null}

        {/* ========================================================
            3. INTERESUJĄCY NAS OBSZAR (Rozwijana lista)
           ======================================================== */}
        {step2Valid ? (
          <Card className="mt-5 border-slate-200">
            <View className="mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2.5">
                <View className="h-8 w-8 items-center justify-center rounded-xl bg-primary-50">
                  <Ionicons name="layers-outline" size={17} color="#4f46e5" />
                </View>
                <Text className="text-base font-bold text-slate-900">Interesujący Cię obszar</Text>
              </View>
              {step3Valid ? (
                <Ionicons name="checkmark-circle" size={22} color="#0d9488" />
              ) : null}
            </View>
            <Text className="mb-3 text-sm text-slate-500">
              Wybierz dziedzinę z rozwijanej listy:
            </Text>

            {/* Rozwijany selector obszaru */}
            <Pressable
              onPress={() => setIsDomainOpen((prev) => !prev)}
              className={`min-h-[54px] flex-row items-center justify-between rounded-2xl border px-4 py-3 bg-white ${
                isDomainOpen ? 'border-primary-600' : 'border-slate-200'
              }`}
            >
              <View className="flex-row items-center gap-3 flex-1 pr-2">
                <View className="h-8 w-8 items-center justify-center rounded-xl bg-primary-50">
                  <Ionicons name="layers-outline" size={18} color="#4f46e5" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs font-semibold text-slate-400">Obszar</Text>
                  <Text className={`text-base font-semibold ${domain ? 'text-slate-900' : 'text-slate-400'}`}>
                    {domain
                      ? (domain === 'other' && customDomain.trim()
                          ? customDomain.trim()
                          : CAREER_DOMAIN_LABELS[domain])
                      : 'Wybierz obszar z listy...'}
                  </Text>
                </View>
              </View>
              <Ionicons
                name={isDomainOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#64748b"
              />
            </Pressable>

            {/* Rozwijana lista opcji obszaru */}
            {isDomainOpen ? (
              <View className="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {domains.map((item, index) => {
                  const isSelected = domain === item;
                  const isLast = index === domains.length - 1;
                  return (
                    <Pressable
                      key={item}
                      onPress={() => handleDomainSelect(item)}
                      className={`flex-row items-center justify-between px-4 py-3.5 ${
                        !isLast ? 'border-b border-slate-100' : ''
                      } ${isSelected ? 'bg-primary-50/70' : 'active:bg-slate-50'}`}
                    >
                      <View className="flex-row items-center gap-3">
                        <View
                          className={`h-2.5 w-2.5 rounded-full ${
                            isSelected ? 'bg-primary-600' : 'bg-slate-300'
                          }`}
                        />
                        <Text
                          className={`text-base ${
                            isSelected ? 'font-bold text-primary-900' : 'font-medium text-slate-700'
                          }`}
                        >
                          {CAREER_DOMAIN_LABELS[item]}
                        </Text>
                      </View>
                      {isSelected ? (
                        <Ionicons name="checkmark-sharp" size={18} color="#4f46e5" />
                      ) : null}
                    </Pressable>
                  );
                })}
              </View>
            ) : null}

            {domain === 'other' ? (
              <View className="mt-3.5">
                <Input
                  label="Wpisz nazwę własnego obszaru"
                  value={customDomain}
                  onChangeText={setCustomDomain}
                  placeholder="np. Cyberbezpieczeństwo, Cloud Ops"
                  icon="briefcase-outline"
                />
              </View>
            ) : null}
          </Card>
        ) : null}

        {/* ========================================================
            4. INTERESUJĄCA NAS ROLA (Rozwijana lista)
           ======================================================== */}
        {step3Valid ? (
          <Card className="mt-5 border-slate-200">
            <View className="mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2.5">
                <View className="h-8 w-8 items-center justify-center rounded-xl bg-primary-50">
                  <Ionicons name="briefcase-outline" size={17} color="#4f46e5" />
                </View>
                <Text className="text-base font-bold text-slate-900">Interesująca Cię rola</Text>
              </View>
              {step4Valid ? (
                <Ionicons name="checkmark-circle" size={22} color="#0d9488" />
              ) : null}
            </View>
            <Text className="mb-3 text-sm text-slate-500">
              Wybierz docelową rolę z rozwijanej listy lub wpisz własną:
            </Text>

            {/* Rozwijany selector roli */}
            <Pressable
              onPress={() => setIsRoleOpen((prev) => !prev)}
              className={`min-h-[54px] flex-row items-center justify-between rounded-2xl border px-4 py-3 bg-white ${
                isRoleOpen ? 'border-primary-600' : 'border-slate-200'
              }`}
            >
              <View className="flex-row items-center gap-3 flex-1 pr-2">
                <View className="h-8 w-8 items-center justify-center rounded-xl bg-primary-50">
                  <Ionicons name="briefcase-outline" size={18} color="#4f46e5" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs font-semibold text-slate-400">Rola</Text>
                  <Text className={`text-base font-semibold ${targetRole ? 'text-slate-900' : 'text-slate-400'}`}>
                    {targetRole || 'Wybierz docelową rolę z listy...'}
                  </Text>
                </View>
              </View>
              <Ionicons
                name={isRoleOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#64748b"
              />
            </Pressable>

            {/* Rozwijana lista ról */}
            {isRoleOpen ? (
              <View className="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {domain && SUGGESTED_ROLES_BY_DOMAIN[domain]?.length ? (
                  SUGGESTED_ROLES_BY_DOMAIN[domain].map((suggestedRole) => {
                    const isSelected = targetRole.toLowerCase() === suggestedRole.toLowerCase();
                    return (
                      <Pressable
                        key={suggestedRole}
                        onPress={() => handleRoleSelect(suggestedRole)}
                        className={`flex-row items-center justify-between px-4 py-3.5 border-b border-slate-100 ${
                          isSelected ? 'bg-primary-50/70' : 'active:bg-slate-50'
                        }`}
                      >
                        <View className="flex-row items-center gap-3">
                          <View
                            className={`h-2.5 w-2.5 rounded-full ${
                              isSelected ? 'bg-primary-600' : 'bg-slate-300'
                            }`}
                          />
                          <Text
                            className={`text-base ${
                              isSelected ? 'font-bold text-primary-900' : 'font-medium text-slate-700'
                            }`}
                          >
                            {suggestedRole}
                          </Text>
                        </View>
                        {isSelected ? (
                          <Ionicons name="checkmark-sharp" size={18} color="#4f46e5" />
                        ) : null}
                      </Pressable>
                    );
                  })
                ) : null}

                {/* Opcja wpisania własnej roli */}
                <Pressable
                  onPress={handleCustomRoleSelect}
                  className={`flex-row items-center justify-between px-4 py-3.5 ${
                    showCustomRoleInput ? 'bg-primary-50/70' : 'active:bg-slate-50'
                  }`}
                >
                  <View className="flex-row items-center gap-3">
                    <Ionicons name="create-outline" size={18} color="#4f46e5" />
                    <Text className="text-base font-semibold text-primary-700">
                      Wpisz inną / własną rolę...
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#4f46e5" />
                </Pressable>
              </View>
            ) : null}

            {/* Pole tekstowe do doprecyzowania lub wpisania roli */}
            <View className="mt-3.5">
              <Input
                label="Doprecyzuj lub wpisz własną rolę"
                value={targetRole}
                onChangeText={setTargetRole}
                placeholder="np. Senior Frontend Developer, AI Specialist"
                icon="flag-outline"
              />
            </View>
          </Card>
        ) : null}

        {/* ========================================================
            5. ILE CZASU DZIENNIE / TYGODNIOWO NA NAUKĘ
           ======================================================== */}
        {step4Valid ? (
          <Card className="mt-5 border-slate-200">
            <View className="mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2.5">
                <View className="h-8 w-8 items-center justify-center rounded-xl bg-primary-50">
                  <Ionicons name="time-outline" size={17} color="#4f46e5" />
                </View>
                <Text className="text-base font-bold text-slate-900">Czas na naukę i czytanie</Text>
              </View>
              {step5Valid ? (
                <Ionicons name="checkmark-circle" size={22} color="#0d9488" />
              ) : null}
            </View>
            <Text className="mb-4 text-sm text-slate-500">
              Ile czasu realnie możesz poświęcić na przygotowanie do celu? Dopasujemy do tego porcje wiedzy:
            </Text>

            <View className="gap-2.5">
              {TIME_COMMITMENT_OPTIONS.map((opt) => {
                const isSelected = timeCommitment === opt.id;
                return (
                  <Pressable
                    key={opt.id}
                    onPress={() => setTimeCommitment(opt.id)}
                    className={`rounded-2xl border p-3.5 transition-all ${
                      isSelected
                        ? 'border-primary-600 bg-primary-50/70'
                        : 'border-slate-200 bg-white active:bg-slate-50'
                    }`}
                  >
                    <View className="flex-row items-center gap-3">
                      <View
                        className={`h-8 w-8 items-center justify-center rounded-xl ${
                          isSelected ? 'bg-primary-600' : 'bg-slate-100'
                        }`}
                      >
                        <Ionicons
                          name={opt.icon}
                          size={18}
                          color={isSelected ? '#ffffff' : '#64748b'}
                        />
                      </View>
                      <View className="flex-1">
                        <Text
                          className={`text-base font-semibold ${
                            isSelected ? 'text-primary-900' : 'text-slate-900'
                          }`}
                        >
                          {opt.label}
                        </Text>
                        <Text className="mt-0.5 text-xs text-slate-500">
                          {opt.subtitle}
                        </Text>
                      </View>
                      <View
                        className={`h-5 w-5 items-center justify-center rounded-full border ${
                          isSelected ? 'border-primary-600 bg-primary-600' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected ? <Ionicons name="checkmark" size={13} color="#ffffff" /> : null}
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </Card>
        ) : null}

        {/* ========================================================
            PODSUMOWANIE I PRZYCISK "ROZPOCZNIJ"
           ======================================================== */}
        <View className="mt-8 mb-6">
          {step5Valid ? (
            <Card className="mb-4 border-primary-200 bg-primary-50/40 p-4">
              <View className="mb-3 flex-row items-center gap-2">
                <Ionicons name="sparkles" size={18} color="#4f46e5" />
                <Text className="text-sm font-bold uppercase tracking-wider text-primary-900">
                  Podsumowanie Twojego profilu
                </Text>
              </View>

              <View className="gap-1.5 text-slate-700">
                <Text className="text-sm text-slate-700">
                  <Text className="font-semibold text-slate-900">Imię: </Text>
                  {name.trim()}
                </Text>
                <Text className="text-sm text-slate-700">
                  <Text className="font-semibold text-slate-900">Cel: </Text>
                  {goalType ? GOAL_TYPE_LABELS[goalType] : ''}
                </Text>
                <Text className="text-sm text-slate-700">
                  <Text className="font-semibold text-slate-900">Horyzont: </Text>
                  {formatDate(targetDate.toISOString())} ({daysLeft} dni)
                </Text>
                <Text className="text-sm text-slate-700">
                  <Text className="font-semibold text-slate-900">Obszar i rola: </Text>
                  {domain === 'other' ? customDomain : (domain ? CAREER_DOMAIN_LABELS[domain] : '')} · {targetRole}
                </Text>
                <Text className="text-sm text-slate-700">
                  <Text className="font-semibold text-slate-900">Rytm nauki: </Text>
                  {timeCommitment ? TIME_COMMITMENT_LABELS[timeCommitment] : ''}
                </Text>
              </View>
            </Card>
          ) : null}

          <Button
            label="Rozpocznij"
            variant={step5Valid ? 'primary' : 'outline'}
            disabled={!step5Valid}
            onPress={finish}
          />
          {!step5Valid ? (
            <Text className="mt-2 text-center text-xs font-medium text-slate-400">
              Uzupełnij wszystkie powyższe pola, aby rozpocząć
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
