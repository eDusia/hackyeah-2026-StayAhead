import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { Card } from '@/components/common/Card';
import { getTranslations } from '@/i18n/translations';
import type { AppLanguage } from '@/types';

interface StreakCardProps {
  streak: number;
  isTodayDone?: boolean;
  language?: AppLanguage;
  className?: string;
}

const mondayBasedWeekday = (date = new Date()) => {
  const jsDay = date.getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
};

export function StreakCard({
  streak,
  isTodayDone = false,
  language = 'pl',
  className = '',
}: StreakCardProps) {
  const t = getTranslations(language);

  const weekdays = t.today.weekdays;
  const todayIdx = mondayBasedWeekday();
  const filledCount = Math.max(0, Math.min(7, streak));
  const lastCompletedIdx = isTodayDone ? todayIdx : todayIdx - 1;
  const firstFilledIdx = lastCompletedIdx - filledCount + 1;

  const daysStatus = weekdays.map((_, idx) => {
    if (idx > todayIdx) {
      return { completed: false };
    }
    if (idx === todayIdx && !isTodayDone) {
      return { completed: false };
    }
    return { completed: idx >= firstFilledIdx && idx <= lastCompletedIdx };
  });

  return (
    <Card className={`border-slate-100 bg-white p-4 shadow-sm ${className}`}>
      <View className="flex-row items-center justify-between gap-3">
        <View className="min-w-0 shrink">
          <View className="flex-row items-center gap-1">
            <Ionicons name="flame" size={13} color="#f97316" />
            <Text className="text-[11px] font-bold uppercase text-slate-500">
              {t.today.streakTitle}
            </Text>
          </View>

          <View className="mt-1 flex-row items-baseline gap-1.5">
            <Text className="text-xl">🔥</Text>
            <Text className="text-3xl font-black tracking-tight text-slate-900">
              {streak}
            </Text>
            <Text className="text-xs font-semibold text-slate-500">
              {t.today.streakDaysLabel}
            </Text>
          </View>

          <Text className="mt-0.5 text-xs font-medium leading-4 text-slate-500">
            {t.today.streakKeepGoing}
          </Text>
        </View>

        <View className="shrink-0 items-center">
          <View className="mb-1.5 flex-row items-center gap-1.5">
            {weekdays.map((day, idx) => (
              <View key={idx} className="w-6 items-center">
                <Text className="text-[10px] font-bold text-slate-400">
                  {day}
                </Text>
              </View>
            ))}
          </View>

          <View className="flex-row items-center gap-1.5">
            {daysStatus.map((item, idx) => (
              <View
                key={idx}
                className={`h-6 w-6 items-center justify-center rounded-full ${
                  item.completed
                    ? 'bg-primary-600 shadow-2xs'
                    : 'border-2 border-primary-400 bg-white'
                }`}
              >
                {item.completed ? (
                  <Ionicons name="checkmark" size={13} color="#ffffff" />
                ) : null}
              </View>
            ))}
          </View>
        </View>
      </View>
    </Card>
  );
}
