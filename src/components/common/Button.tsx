import { ActivityIndicator, Pressable, Text } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600',
  secondary: 'bg-slate-900',
  outline: 'bg-white border border-slate-200',
  ghost: 'bg-transparent',
};

const labelClass: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-slate-900',
  ghost: 'text-primary-700',
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      className={`min-h-[52px] flex-row items-center justify-center rounded-2xl px-5 ${variantClass[variant]} ${
        isDisabled ? 'opacity-50' : 'active:opacity-80'
      } ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#4338ca' : '#ffffff'} />
      ) : (
        <Text className={`text-base font-semibold ${labelClass[variant]}`}>{label}</Text>
      )}
    </Pressable>
  );
}
