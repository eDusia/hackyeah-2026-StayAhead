import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
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
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerClassName="px-5 pb-8" keyboardShouldPersistTaps="handled">
        <Text className="mt-4 text-sm font-semibold uppercase tracking-widest text-primary-600">
          StayAhead · krok {step + 1} z 3
        </Text>
        <Text className="mt-2 text-3xl font-bold text-slate-900">Ustaw swój cel, resztę poukłada agent.</Text>
        <Text className="mt-2 text-base leading-6 text-slate-500">
          Krótki onboarding wystarczy, żeby zbudować dzienny plan, roadmapę i kontekst rozmowy z mentorem.
        </Text>

        {step === 0 ? (
          <View className="mt-8 gap-4">
            <Input label="Jak masz na imię?" value={name} onChangeText={setName} placeholder="np. Ania" icon="person-outline" error={error} />
            <Input
              label="Obecna rola (opcjonalnie)"
              value={currentRole}
              onChangeText={setCurrentRole}
              placeholder="np. Mid Frontend Developer"
              icon="briefcase-outline"
            />
          </View>
        ) : null}

        {step === 1 ? (
          <View className="mt-8 gap-4">
            <Input
              label="Docelowa rola"
              value={targetRole}
              onChangeText={setTargetRole}
              placeholder="np. AI Application Engineer"
              icon="flag-outline"
              error={error}
            />
            <Text className="text-sm font-medium text-slate-600">Obszar kariery</Text>
            <View className="flex-row flex-wrap gap-2">
              {domains.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => setDomain(item)}
                  className={`rounded-full px-3 py-2 ${domain === item ? 'bg-primary-600' : 'bg-white border border-slate-200'}`}
                >
                  <Text className={`text-sm font-medium ${domain === item ? 'text-white' : 'text-slate-600'}`}>
                    {CAREER_DOMAIN_LABELS[item]}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        {step === 2 ? (
          <View className="mt-8 gap-4">
            <Text className="text-sm font-medium text-slate-600">Twój obecny poziom</Text>
            <View className="flex-row flex-wrap gap-2">
              {levels.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => setCurrentLevel(item)}
                  className={`rounded-full px-3 py-2 ${
                    currentLevel === item ? 'bg-slate-900' : 'bg-white border border-slate-200'
                  }`}
                >
                  <Text className={`text-sm font-medium ${currentLevel === item ? 'text-white' : 'text-slate-600'}`}>
                    {SKILL_LEVEL_LABELS[item]}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Pressable
              onPress={() => setShowPicker(true)}
              className="min-h-[52px] justify-center rounded-2xl border border-slate-200 bg-white px-4"
            >
              <Text className="text-xs font-medium uppercase tracking-wide text-slate-400">Cel do</Text>
              <Text className="mt-1 text-base font-semibold text-slate-900">{formatDate(targetDate.toISOString())}</Text>
            </Pressable>
            {showPicker ? (
              <DateTimePicker value={targetDate} mode="date" display="spinner" onChange={onDateChange} />
            ) : null}
          </View>
        ) : null}

        <View className="mt-8 gap-3">
          {step < 2 ? (
            <Button label="Dalej" onPress={goNext} />
          ) : (
            <Button label="Wygeneruj mój plan" onPress={finish} />
          )}
          {step > 0 ? <Button label="Wstecz" variant="ghost" onPress={() => setStep((current) => current - 1)} /> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
