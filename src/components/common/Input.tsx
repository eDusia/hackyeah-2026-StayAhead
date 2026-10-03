import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, View } from 'react-native';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  className?: string;
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  error,
  autoCapitalize = 'sentences',
  className = '',
}: InputProps) {
  return (
    <View className={`w-full ${className}`}>
      {label ? <Text className="mb-2 text-sm font-medium text-slate-300">{label}</Text> : null}
      <View
        className={`min-h-[52px] flex-row items-center rounded-2xl border px-4 transition-colors ${
          error
            ? 'border-rose-500/80 bg-rose-950/20'
            : 'border-slate-800/90 bg-slate-900/80'
        }`}
      >
        {icon ? <Ionicons name={icon} size={18} color="#818cf8" style={{ marginRight: 10 }} /> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#64748b"
          autoCapitalize={autoCapitalize}
          className="flex-1 py-3 text-base text-slate-100"
        />
      </View>
      {error ? <Text className="mt-1.5 text-xs font-medium text-rose-400">{error}</Text> : null}
    </View>
  );
}
