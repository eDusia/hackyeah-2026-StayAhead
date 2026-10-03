import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { CAREER_DOMAIN_LABELS, SKILL_LEVEL_LABELS } from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';
import type { CareerDomain, SkillLevel } from '@/types';
import { formatDate } from '@/utils/date';

const domains = Object.keys(CAREER_DOMAIN_LABELS) as CareerDomain[];
const levels = Object.keys(SKILL_LEVEL_LABELS) as SkillLevel[];

export function OnboardingScreen() {
  const completeOnboarding = useUserStore((state) => state.completeOnboarding);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [targetRole, setTargetRole] = useState('AI Application Engineer');
  const [domain, setDomain] = useState<CareerDomain>('ai');
  const [currentLevel, setCurrentLevel] = useState<SkillLevel>('intermediate');
  const [targetDate, setTargetDate] = useState(new Date(Date.now() + 1000 * 60 * 60 * 24 * 90));
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState('');

  const onDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setTargetDate(date);
    }
    setShowPicker(false);
  };

  const goNext = () => {
    if (step === 0 && name.trim().length < 2) {
      setError('Podaj imię, żeby mentor mógł się do Ciebie zwracać.');
      return;
    }
    if (step === 1 && targetRole.trim().length < 3) {
      setError('Wpisz rolę, do której zmierzasz.');
      return;
    }

    setError('');
    setStep((current) => current + 1);
  };

  const finish = () => {
    completeOnboarding({
      name: name.trim(),
      currentRole: currentRole.trim() || undefined,
      goal: {
        targetRole: targetRole.trim(),
        domain,
        currentLevel,
        targetDate: targetDate.toISOString(),
        description: `Przejście z ${currentRole || 'obecnej roli'} do ${targetRole.trim()}.`,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pb-10 pt-3"
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View entering={FadeInDown.duration(400)}>
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              StayAhead · Krok {step + 1} z 3
            </Text>
            <View className="flex-row gap-1.5">
              {[0, 1, 2].map((i) => (
                <View
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step
                      ? 'w-6 bg-indigo-500'
                      : i < step
                      ? 'w-3 bg-indigo-900'
                      : 'w-3 bg-slate-800'
                  }`}
                />
              ))}
            </View>
          </View>

          <Text className="mt-3 text-3xl font-extrabold tracking-tight text-slate-100">
            Ustaw swój cel, resztę poukłada agent.
          </Text>
          <Text className="mt-2 text-base leading-6 text-slate-400">
            Krótki onboarding wystarczy, aby zbudować codzienny plan, roadmapę kompetencji i kontekst
            rozmowy z mentorem AI.
          </Text>
        </Animated.View>

        {step === 0 ? (
          <Animated.View entering={FadeInDown.delay(100).duration(400)} className="mt-8 gap-4">
            <Input
              label="Jak masz na imię?"
              value={name}
              onChangeText={setName}
              placeholder="np. Ania"
              icon="person-outline"
              error={error}
            />
            <Input
              label="Obecna rola (opcjonalnie)"
              value={currentRole}
              onChangeText={setCurrentRole}
              placeholder="np. Mid Frontend Developer"
              icon="briefcase-outline"
            />
          </Animated.View>
        ) : null}

        {step === 1 ? (
          <Animated.View entering={FadeInDown.delay(100).duration(400)} className="mt-8 gap-4">
            <Input
              label="Docelowa rola"
              value={targetRole}
              onChangeText={setTargetRole}
              placeholder="np. AI Application Engineer"
              icon="flag-outline"
              error={error}
            />
            <Text className="mt-2 text-sm font-semibold text-slate-300">Obszar kariery</Text>
            <View className="flex-row flex-wrap gap-2.5">
              {domains.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => setDomain(item)}
                  className={`rounded-2xl border px-4 py-2.5 ${
                    domain === item
                      ? 'border-indigo-400 bg-indigo-600 shadow-md shadow-indigo-950/60'
                      : 'border-slate-800 bg-slate-900/80 active:bg-slate-800'
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      domain === item ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {CAREER_DOMAIN_LABELS[item]}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        ) : null}

        {step === 2 ? (
          <Animated.View entering={FadeInDown.delay(100).duration(400)} className="mt-8 gap-4">
            <Text className="text-sm font-semibold text-slate-300">Twój obecny poziom</Text>
            <View className="flex-row flex-wrap gap-2.5">
              {levels.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => setCurrentLevel(item)}
                  className={`rounded-2xl border px-4 py-2.5 ${
                    currentLevel === item
                      ? 'border-indigo-400 bg-indigo-600 shadow-md shadow-indigo-950/60'
                      : 'border-slate-800 bg-slate-900/80 active:bg-slate-800'
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      currentLevel === item ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {SKILL_LEVEL_LABELS[item]}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Pressable
              onPress={() => setShowPicker(true)}
              className="mt-2 min-h-[56px] justify-center rounded-2xl border border-slate-800 bg-slate-900/90 px-4 active:border-indigo-500/50"
            >
              <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Planowana data realizacji celu
              </Text>
              <Text className="mt-1 text-base font-bold text-slate-100">
                {formatDate(targetDate.toISOString())}
              </Text>
            </Pressable>
            {showPicker ? (
              <DateTimePicker
                value={targetDate}
                mode="date"
                display="spinner"
                themeVariant="dark"
                onChange={onDateChange}
              />
            ) : null}
          </Animated.View>
        ) : null}

        <Animated.View entering={FadeInDown.delay(200).duration(400)} className="mt-9 gap-3">
          {step < 2 ? (
            <Button label="Dalej" onPress={goNext} />
          ) : (
            <Button label="Wygeneruj mój plan" onPress={finish} />
          )}
          {step > 0 ? (
            <Button label="Wstecz" variant="ghost" onPress={() => setStep((current) => current - 1)} />
          ) : null}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
