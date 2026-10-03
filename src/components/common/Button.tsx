import { ActivityIndicator, Pressable, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-indigo-600 border border-indigo-500/60 shadow-lg shadow-indigo-950/60',
  secondary: 'bg-slate-800/90 border border-slate-700/70 shadow-sm shadow-black/40',
  outline: 'bg-slate-900/60 border border-slate-700/80',
  ghost: 'bg-transparent',
};

const labelClass: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-slate-100',
  outline: 'text-slate-200',
  ghost: 'text-indigo-400',
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
  icon,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!isDisabled) {
      scale.value = withSpring(0.96, { damping: 15, stiffness: 350 });
    }
  };

  const handlePressOut = () => {
    if (!isDisabled) {
      scale.value = withSpring(1, { damping: 15, stiffness: 350 });
    }
  };

  return (
    <AnimatedPressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
      className={`min-h-[52px] flex-row items-center justify-center rounded-2xl px-5 ${variantClass[variant]} ${
        isDisabled ? 'opacity-50' : ''
      } ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#ffffff' : '#818cf8'} />
      ) : (
        <Animated.View className="flex-row items-center justify-center gap-2">
          {icon ? icon : null}
          <Text className={`text-base font-semibold ${labelClass[variant]}`}>{label}</Text>
        </Animated.View>
      )}
    </AnimatedPressable>
  );
}
