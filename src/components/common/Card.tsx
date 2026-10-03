import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass' | 'highlight';
}

export function Card({ children, className = '', variant = 'glass', style, ...props }: CardProps) {
  const variantClasses = {
    default: 'border-slate-800 bg-slate-900/90',
    elevated: 'border-slate-700/60 bg-slate-900/95 shadow-xl shadow-black/50',
    glass: 'border-slate-800/80 bg-slate-900/80 backdrop-blur-md',
    highlight: 'border-indigo-500/40 bg-indigo-950/20 shadow-indigo-950/40 shadow-lg',
  };

  return (
    <View
      className={`rounded-3xl border p-5 shadow-sm shadow-black/20 ${variantClasses[variant]} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}

