import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { ProgressBar } from '@/components/common/ProgressBar';
import { StayAheadLogo } from '@/components/common/StayAheadLogo';
import {
  CAREER_DOMAIN_LABELS,
  DATE_PRESET_OPTIONS,
  GOAL_TYPE_LABELS,
  GOAL_TYPE_OPTIONS,
  SUGGESTED_ROLES_BY_DOMAIN,
  TIME_COMMITMENT_LABELS,
  TIME_COMMITMENT_OPTIONS,
} from '@/constants/theme';
import { getTranslations } from '@/i18n/translations';
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

function StepHeader({
  icon,
  title,
  completed,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  completed: boolean;
}) {
  return (
    <View className="mb-3 flex-row items-center justify-between gap-3">
      <View className="min-w-0 flex-1 flex-row items-center gap-2.5">
        <View className="h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary-50">
          <Ionicons name={icon} size={17} color="#4f46e5" />
        </View>
        <View className="min-w-0 flex-1">
          <Text className="text-base font-bold leading-5 text-slate-900">{title}</Text>
        </View>
      </View>
      {completed ? (
        <View className="shrink-0">
          <Ionicons name="checkmark-circle" size={22} color="#0d9488" />
        </View>
      ) : null}
    </View>
  );
}

export function OnboardingScreen() {
  const completeOnboarding = useUserStore((state) => state.completeOnboarding);
  const language = useUserStore((state) => state.language);
  const setLanguage = useUserStore((state) => state.setLanguage);
  const t = getTranslations(language);

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

    const domainLabel = domain === 'other' ? customDomain.trim() : (t.onboarding.step3.domains[domain] || CAREER_DOMAIN_LABELS[domain]);
    const goalLabel = goalType === 'other' && customGoal.trim() ? customGoal.trim() : (t.onboarding.step1.goals[goalType]?.label || GOAL_TYPE_LABELS[goalType]);
    const commitmentLabel = t.onboarding.step5.commitments[timeCommitment]?.label || TIME_COMMITMENT_LABELS[timeCommitment];

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
        description: `${goalLabel}: ${targetRole.trim()} (${domainLabel}, ${commitmentLabel}).`,
      },
    });
  };

  const daysLeft = daysUntil(targetDate.toISOString());

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        ref={scrollViewRef}
        contentContainerClassName="px-5 pb-16"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Bar */}
        <View className="mt-4">
          <View className="flex-row items-center justify-between w-full px-1">
            <View className="flex-row items-center gap-1.5 rounded-full border border-primary-200/80 bg-primary-50 px-3.5 py-1">
              <Ionicons name="rocket-outline" size={13} color="#4f46e5" />
              <Text className="text-[11px] font-bold uppercase tracking-wider text-primary-700">
                {t.common.hackathonBadge}
              </Text>
            </View>

            {/* Language Switcher */}
            <View className="flex-row items-center rounded-full border border-slate-200 bg-white p-0.5 shadow-2xs">
              <Pressable
                onPress={() => setLanguage('pl')}
                className={`rounded-full px-3 py-1 ${
                  language === 'pl' ? 'bg-primary-600' : 'bg-transparent'
                }`}
              >
                <Text
                  className={`text-[11px] font-bold ${
                    language === 'pl' ? 'text-white' : 'text-slate-600'
                  }`}
                >
                  PL
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setLanguage('en')}
                className={`rounded-full px-3 py-1 ${
                  language === 'en' ? 'bg-primary-600' : 'bg-transparent'
                }`}
              >
                <Text
                  className={`text-[11px] font-bold ${
                    language === 'en' ? 'text-white' : 'text-slate-600'
                  }`}
                >
                  ENG
                </Text>
              </Pressable>
            </View>
          </View>

          {/* StayAhead Hero with Logo & Slogan */}
          <View className="mt-5 items-center">
            <StayAheadLogo size="xl" layout="horizontal" />
            <Text className="mt-2.5 max-w-[320px] text-center text-sm font-medium leading-5 text-slate-600">
              {t.common.coverSubtitle}
            </Text>
          </View>

          {/* 3 Pillars from Cover */}
          <View className="mt-4 flex-row items-center justify-center gap-3">
            <View className="items-center px-2">
              <View className="h-9 w-9 items-center justify-center rounded-2xl border border-primary-100 bg-primary-50">
                <Ionicons name="heart-outline" size={17} color="#6366f1" />
              </View>
              <Text className="mt-1 text-center text-[10px] font-semibold text-slate-600">
                {t.common.pillars.expertMentoring}
              </Text>
            </View>
            <View className="items-center px-2">
              <View className="h-9 w-9 items-center justify-center rounded-2xl border border-primary-100 bg-primary-50">
                <Ionicons name="locate-outline" size={17} color="#6366f1" />
              </View>
              <Text className="mt-1 text-center text-[10px] font-semibold text-slate-600">
                {t.common.pillars.personalizedPlans}
              </Text>
            </View>
            <View className="items-center px-2">
              <View className="h-9 w-9 items-center justify-center rounded-2xl border border-primary-100 bg-primary-50">
                <Ionicons name="trending-up-outline" size={17} color="#6366f1" />
              </View>
              <Text className="mt-1 text-center text-[10px] font-semibold text-slate-600">
                {t.common.pillars.buildConfidence}
              </Text>
            </View>
          </View>

          {/* Updated Description */}
          <Text className="mt-4 px-3 text-center text-sm leading-6 text-slate-600">
            {t.onboarding.description}
          </Text>

          <View className="mt-5 w-full">
            <ProgressBar value={progressPercent} label={t.onboarding.progressLabel} />
          </View>
        </View>

        {/* ========================================================
            0. NASZE IMIĘ
           ======================================================== */}
        <Card className="mt-6 border-slate-200">
          <StepHeader icon="person-outline" title={t.onboarding.step0.title} completed={step0Valid} />
          <Text className="mb-3 text-sm leading-5 text-slate-500">
            {t.onboarding.step0.desc}
          </Text>
          <Input
            value={name}
            onChangeText={setName}
            placeholder={t.onboarding.step0.placeholder}
            icon="person-outline"
          />
        </Card>

        {/* ========================================================
            1. OKREŚLENIE CELU
           ======================================================== */}
        {step0Valid ? (
          <Card className="mt-5 border-slate-200">
            <StepHeader icon="compass-outline" title={t.onboarding.step1.title} completed={step1Valid} />
            <Text className="mb-4 text-sm leading-5 text-slate-500">
              {t.onboarding.step1.desc}
            </Text>

            <View className="gap-2.5">
              {GOAL_TYPE_OPTIONS.map((opt) => {
                const isSelected = goalType === opt.id;
                const translatedGoal = t.onboarding.step1.goals[opt.id];
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
                        className={`mt-0.5 h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                          isSelected ? 'bg-primary-600' : 'bg-slate-100'
                        }`}
                      >
                        <Ionicons
                          name={opt.icon}
                          size={18}
                          color={isSelected ? '#ffffff' : '#64748b'}
                        />
                      </View>
                      <View className="min-w-0 flex-1">
                        <Text
                          className={`text-base font-semibold leading-5 ${
                            isSelected ? 'text-primary-900' : 'text-slate-900'
                          }`}
                        >
                          {translatedGoal?.label ?? opt.label}
                        </Text>
                        <Text className="mt-0.5 text-xs leading-4 text-slate-500">
                          {translatedGoal?.desc ?? opt.description}
                        </Text>
                      </View>
                      <View
                        className={`mt-1 h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
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
                  label={language === 'en' ? 'Describe your goal (optional)' : 'Opisz swój cel (opcjonalnie)'}
                  value={customGoal}
                  onChangeText={setCustomGoal}
                  placeholder={t.onboarding.step1.customPlaceholder}
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
            <StepHeader icon="calendar-outline" title={t.onboarding.step2.title} completed={step2Valid} />
            <Text className="mb-3 text-sm leading-5 text-slate-500">
              {t.onboarding.step2.desc}
            </Text>

            {/* Szybkie opcje (chips) */}
            <View className="flex-row flex-wrap gap-2">
              {DATE_PRESET_OPTIONS.map((preset) => {
                const isSelected = selectedPreset === preset.id;
                let presetLabel = preset.label;
                if (preset.id === '1m') presetLabel = t.onboarding.step2.preset1m;
                if (preset.id === '3m') presetLabel = t.onboarding.step2.preset3m;
                if (preset.id === '6m') presetLabel = t.onboarding.step2.preset6m;
                if (preset.id === '12m') presetLabel = t.onboarding.step2.preset12m;

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
                      {presetLabel}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Wybór z kalendarza */}
            <Pressable
              onPress={() => setShowPicker(true)}
              className="mt-3.5 gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5"
            >
              <View className="flex-row items-center gap-3">
                <View className="h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white">
                  <Ionicons name="calendar-outline" size={18} color="#4f46e5" />
                </View>
                <View className="min-w-0 flex-1">
                  <Text className="text-xs font-semibold uppercase text-slate-400">
                    {language === 'en' ? 'Target date' : 'Wyznaczona data'}
                  </Text>
                  <Text className="mt-0.5 text-base font-bold leading-5 text-slate-900">
                    {formatDate(targetDate.toISOString())}
                  </Text>
                </View>
              </View>
              <View className="flex-row flex-wrap items-center justify-between gap-2">
                <Text className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
                  {daysLeft !== null && daysLeft >= 0
                    ? language === 'en'
                      ? `in ${daysLeft} days`
                      : `za ${daysLeft} ${pluralize(daysLeft, 'dzień', 'dni', 'dni')}`
                    : language === 'en' ? 'Today' : 'Dzisiaj'}
                </Text>
                <Text className="text-xs font-medium text-primary-600">
                  {language === 'en' ? 'Change date' : 'Zmień datę'}
                </Text>
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
                    label={language === 'en' ? 'Done' : 'Gotowe'}
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
            <StepHeader icon="layers-outline" title={t.onboarding.step3.title} completed={step3Valid} />
            <Text className="mb-3 text-sm leading-5 text-slate-500">
              {t.onboarding.step3.desc}
            </Text>

            {/* Rozwijany selector obszaru */}
            <Pressable
              onPress={() => setIsDomainOpen((prev) => !prev)}
              className={`min-h-[54px] flex-row items-center justify-between rounded-2xl border px-4 py-3 bg-white ${
                isDomainOpen ? 'border-primary-600' : 'border-slate-200'
              }`}
            >
              <View className="min-w-0 flex-1 flex-row items-center gap-3 pr-2">
                <View className="h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                  <Ionicons name="layers-outline" size={18} color="#4f46e5" />
                </View>
                <View className="min-w-0 flex-1">
                  <Text className="text-xs font-semibold text-slate-400">
                    {language === 'en' ? 'Domain' : 'Obszar'}
                  </Text>
                  <Text className={`text-base font-semibold leading-5 ${domain ? 'text-slate-900' : 'text-slate-400'}`}>
                    {domain
                      ? (domain === 'other' && customDomain.trim()
                          ? customDomain.trim()
                          : (t.onboarding.step3.domains[domain] ?? CAREER_DOMAIN_LABELS[domain]))
                      : t.onboarding.step3.selectPrompt}
                  </Text>
                </View>
              </View>
              <View className="shrink-0">
                <Ionicons
                  name={isDomainOpen ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#64748b"
                />
              </View>
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
                          {t.onboarding.step3.domains[item] ?? CAREER_DOMAIN_LABELS[item]}
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

            {/* Opcjonalne pole własnego obszaru jeśli wybrano "Inny obszar" */}
            {domain === 'other' ? (
              <View className="mt-3">
                <Input
                  label={language === 'en' ? 'Specify domain' : 'Doprecyzuj obszar'}
                  value={customDomain}
                  onChangeText={setCustomDomain}
                  placeholder={t.onboarding.step3.customPlaceholder}
                  icon="create-outline"
                />
              </View>
            ) : null}
          </Card>
        ) : null}

        {/* ========================================================
            4. INTERESUJĄCA NAS ROLA / STANOWISKO (Rozwijana lista)
           ======================================================== */}
        {step3Valid ? (
          <Card className="mt-5 border-slate-200">
            <StepHeader icon="briefcase-outline" title={t.onboarding.step4.title} completed={step4Valid} />
            <Text className="mb-3 text-sm leading-5 text-slate-500">
              {t.onboarding.step4.desc}
            </Text>

            {/* Rozwijany selector ról */}
            <Pressable
              onPress={() => setIsRoleOpen((prev) => !prev)}
              className={`min-h-[54px] flex-row items-center justify-between rounded-2xl border px-4 py-3 bg-white ${
                isRoleOpen ? 'border-primary-600' : 'border-slate-200'
              }`}
            >
              <View className="min-w-0 flex-1 flex-row items-center gap-3 pr-2">
                <View className="h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                  <Ionicons name="briefcase-outline" size={18} color="#4f46e5" />
                </View>
                <View className="min-w-0 flex-1">
                  <Text className="text-xs font-semibold text-slate-400">
                    {language === 'en' ? 'Role' : 'Rola'}
                  </Text>
                  <Text className={`text-base font-semibold leading-5 ${targetRole ? 'text-slate-900' : 'text-slate-400'}`}>
                    {targetRole || (language === 'en' ? 'Select target role...' : 'Wybierz docelową rolę z listy...')}
                  </Text>
                </View>
              </View>
              <View className="shrink-0">
                <Ionicons
                  name={isRoleOpen ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#64748b"
                />
              </View>
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
                      {t.onboarding.step4.customRoleBtn}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#4f46e5" />
                </Pressable>
              </View>
            ) : null}

            {/* Pole tekstowe do doprecyzowania lub wpisania roli */}
            <View className="mt-3.5">
              <Input
                label={language === 'en' ? 'Clarify or enter role' : 'Doprecyzuj lub wpisz własną rolę'}
                value={targetRole}
                onChangeText={setTargetRole}
                placeholder={t.onboarding.step4.customRolePlaceholder}
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
            <StepHeader icon="time-outline" title={t.onboarding.step5.title} completed={step5Valid} />
            <Text className="mb-4 text-sm leading-5 text-slate-500">
              {t.onboarding.step5.desc}
            </Text>

            <View className="gap-2.5">
              {TIME_COMMITMENT_OPTIONS.map((opt) => {
                const isSelected = timeCommitment === opt.id;
                const translatedCommitment = t.onboarding.step5.commitments[opt.id];
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
                        className={`h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                          isSelected ? 'bg-primary-600' : 'bg-slate-100'
                        }`}
                      >
                        <Ionicons
                          name={opt.icon}
                          size={18}
                          color={isSelected ? '#ffffff' : '#64748b'}
                        />
                      </View>
                      <View className="min-w-0 flex-1">
                        <Text
                          className={`text-base font-semibold leading-5 ${
                            isSelected ? 'text-primary-900' : 'text-slate-900'
                          }`}
                        >
                          {translatedCommitment?.label ?? opt.label}
                        </Text>
                        <Text className="mt-0.5 text-xs leading-4 text-slate-500">
                          {translatedCommitment?.subtitle ?? opt.subtitle}
                        </Text>
                      </View>
                      <View
                        className={`h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
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
                  {t.onboarding.summary.title}
                </Text>
              </View>

              <View className="gap-1.5 text-slate-700">
                <Text className="text-sm text-slate-700">
                  <Text className="font-semibold text-slate-900">{t.onboarding.summary.name} </Text>
                  {name.trim()}
                </Text>
                <Text className="text-sm text-slate-700">
                  <Text className="font-semibold text-slate-900">{t.onboarding.summary.goal} </Text>
                  {goalType ? (t.onboarding.step1.goals[goalType]?.label ?? GOAL_TYPE_LABELS[goalType]) : ''}
                </Text>
                <Text className="text-sm text-slate-700">
                  <Text className="font-semibold text-slate-900">{t.onboarding.summary.horizon} </Text>
                  {formatDate(targetDate.toISOString())} ({daysLeft} {t.onboarding.summary.daysSuffix})
                </Text>
                <Text className="text-sm text-slate-700">
                  <Text className="font-semibold text-slate-900">{t.onboarding.summary.domainAndRole} </Text>
                  {domain === 'other' ? customDomain : (domain ? (t.onboarding.step3.domains[domain] ?? CAREER_DOMAIN_LABELS[domain]) : '')} · {targetRole}
                </Text>
                <Text className="text-sm text-slate-700">
                  <Text className="font-semibold text-slate-900">{t.onboarding.summary.rhythm} </Text>
                  {timeCommitment ? (t.onboarding.step5.commitments[timeCommitment]?.label ?? TIME_COMMITMENT_LABELS[timeCommitment]) : ''}
                </Text>
              </View>
            </Card>
          ) : null}

          <Button
            label={t.onboarding.startButton}
            variant={step5Valid ? 'primary' : 'outline'}
            disabled={!step5Valid}
            onPress={finish}
          />
          {!step5Valid ? (
            <Text className="mt-2 text-center text-xs font-medium text-slate-400">
              {t.onboarding.startDisabledHint}
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
