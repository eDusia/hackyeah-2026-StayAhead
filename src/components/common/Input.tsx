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
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  error,
  autoCapitalize = 'sentences',
}: InputProps) {
  return (
    <View className="w-full">
      {label ? <Text className="mb-2 text-sm font-medium text-slate-600">{label}</Text> : null}
      <View
        className={`min-h-[52px] flex-row items-center rounded-2xl border bg-white px-4 ${
          error ? 'border-amber-500' : 'border-slate-200'
        }`}
      >
        {icon ? <Ionicons name={icon} size={18} color="#64748b" style={{ marginRight: 8 }} /> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          autoCapitalize={autoCapitalize}
          className="flex-1 py-3 text-base text-slate-900"
        />
      </View>
      {error ? <Text className="mt-2 text-sm text-amber-600">{error}</Text> : null}
    </View>
  );
}
