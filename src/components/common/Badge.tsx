import { Text, View } from 'react-native';

type BadgeVariant = 'default' | 'success' | 'warning' | 'info';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

const badgeClass: Record<BadgeVariant, string> = {
  default: 'bg-slate-800/80 border border-slate-700/60',
  success: 'bg-emerald-950/60 border border-emerald-500/30',
  warning: 'bg-amber-950/60 border border-amber-500/30',
  info: 'bg-indigo-950/70 border border-indigo-500/40',
};

const dotColor: Record<BadgeVariant, string> = {
  default: 'bg-slate-400',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  info: 'bg-indigo-400',
};

const labelClass: Record<BadgeVariant, string> = {
  default: 'text-slate-300',
  success: 'text-emerald-300',
  warning: 'text-amber-300',
  info: 'text-indigo-300',
};

export function Badge({ label, variant = 'default', dot = false, className = '' }: BadgeProps) {
  return (
    <View className={`self-start flex-row items-center gap-1.5 rounded-full px-2.5 py-1 ${badgeClass[variant]} ${className}`}>
      {dot ? <View className={`h-1.5 w-1.5 rounded-full ${dotColor[variant]}`} /> : null}
      <Text className={`text-xs font-semibold tracking-wide ${labelClass[variant]}`}>{label}</Text>
    </View>
  );
}
