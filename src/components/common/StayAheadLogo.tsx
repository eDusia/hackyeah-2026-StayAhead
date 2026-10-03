import { Text, View } from 'react-native';

interface StayAheadLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  layout?: 'horizontal' | 'vertical';
  subtitle?: string;
  className?: string;
}

export function StayAheadIcon({ size = 44 }: { size?: number }) {
  const h = Math.round(size * 1.12);
  const stroke = Math.max(3, Math.round(size * 0.17));
  const dotSize = Math.max(4, Math.round(size * 0.23));
  const r = stroke / 2;

  const topOffset = dotSize + Math.round(size * 0.08);
  const halfH = Math.round((h - topOffset) / 2);
  const midY = topOffset + halfH - Math.round(stroke / 2);
  const bottomY = h - stroke;

  return (
    <View style={{ width: size, height: h, position: 'relative' }}>
      {/* Satellite dot in top-right */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: Math.round(size * 0.08),
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: '#8b5cf6',
          shadowColor: '#7c3aed',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.35,
          shadowRadius: 3,
          elevation: 3,
        }}
      />

      {/* Top horizontal stroke */}
      <View
        style={{
          position: 'absolute',
          top: topOffset,
          left: Math.round(size * 0.12),
          right: Math.round(size * 0.18),
          height: stroke,
          borderRadius: r,
          backgroundColor: '#7c3aed',
        }}
      />

      {/* Top-left rounded curve */}
      <View
        style={{
          position: 'absolute',
          top: topOffset,
          left: 0,
          width: stroke * 1.8,
          height: halfH + stroke / 2,
          borderTopLeftRadius: stroke * 1.2,
          borderBottomLeftRadius: stroke * 1.2,
          borderWidth: stroke,
          borderRightWidth: 0,
          borderBottomWidth: 0,
          borderColor: '#6d28d9',
        }}
      />

      {/* Middle horizontal bar */}
      <View
        style={{
          position: 'absolute',
          top: midY,
          left: stroke * 0.6,
          right: stroke * 0.6,
          height: stroke,
          borderRadius: r,
          backgroundColor: '#6366f1',
        }}
      />

      {/* Bottom-right rounded curve */}
      <View
        style={{
          position: 'absolute',
          top: midY,
          right: 0,
          width: stroke * 1.8,
          height: bottomY - midY + stroke,
          borderTopRightRadius: stroke * 1.2,
          borderBottomRightRadius: stroke * 1.2,
          borderWidth: stroke,
          borderLeftWidth: 0,
          borderTopWidth: 0,
          borderColor: '#4f46e5',
        }}
      />

      {/* Bottom horizontal stroke */}
      <View
        style={{
          position: 'absolute',
          top: bottomY,
          left: Math.round(size * 0.16),
          right: Math.round(size * 0.12),
          height: stroke,
          borderRadius: r,
          backgroundColor: '#4338ca',
        }}
      />
    </View>
  );
}

const sizeConfig = {
  sm: { icon: 26, text: 'text-xl', tracking: 'tracking-tight', gap: 'gap-2' },
  md: { icon: 38, text: 'text-2xl', tracking: 'tracking-tight', gap: 'gap-2.5' },
  lg: { icon: 50, text: 'text-4xl', tracking: 'tracking-tighter', gap: 'gap-3.5' },
  xl: { icon: 64, text: 'text-5xl', tracking: 'tracking-tighter', gap: 'gap-4' },
};

export function StayAheadLogo({
  size = 'md',
  showText = true,
  layout = 'horizontal',
  subtitle,
  className = '',
}: StayAheadLogoProps) {
  const conf = sizeConfig[size];
  const isVertical = layout === 'vertical';

  return (
    <View
      className={`items-center ${isVertical ? 'flex-col' : 'flex-row'} ${conf.gap} ${className}`}
    >
      <StayAheadIcon size={conf.icon} />
      {showText && (
        <View className={isVertical ? 'items-center' : ''}>
          <Text
            className={`font-black text-slate-900 ${conf.text} ${conf.tracking}`}
          >
            StayAhead
          </Text>
          {subtitle ? (
            <Text className="mt-1 text-center text-xs font-medium text-slate-500">
              {subtitle}
            </Text>
          ) : null}
        </View>
      )}
    </View>
  );
}
