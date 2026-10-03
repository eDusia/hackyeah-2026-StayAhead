import type { ReactNode } from 'react';
import { View } from 'react-native';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <View className={`rounded-3xl border border-slate-100 bg-white p-4 shadow-sm ${className}`}>
      {children}
    </View>
  );
}
