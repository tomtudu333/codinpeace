import React from 'react';

type TextVariant = 'body' | 'caption' | 'label' | 'heading' | 'mono';
type TextSize = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

interface TextProps {
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  color?: string;
  children: React.ReactNode;
  className?: string;
}

interface VariantStyle {
  fontSize: string;
  fontWeight: number;
  fontFamily: string;
  color: string;
}

const variantMap: Record<TextVariant, VariantStyle> = {
  body: { fontSize: 'var(--font-base)', fontWeight: 400, fontFamily: 'var(--font-family-body)', color: 'var(--text-primary)' },
  caption: { fontSize: 'var(--font-xs)', fontWeight: 400, fontFamily: 'var(--font-family-body)', color: 'var(--text-secondary)' },
  label: { fontSize: 'var(--font-sm)', fontWeight: 600, fontFamily: 'var(--font-family-body)', color: 'var(--text-tertiary)' },
  heading: { fontSize: 'var(--font-lg)', fontWeight: 700, fontFamily: 'var(--font-family-heading)', color: 'var(--text-primary)' },
  mono: { fontSize: 'var(--font-sm)', fontWeight: 400, fontFamily: 'var(--font-family-mono)', color: 'var(--text-primary)' },
};

const sizeMap: Record<TextSize, string> = {
  xs: 'var(--font-xs)',
  sm: 'var(--font-sm)',
  base: 'var(--font-base)',
  md: 'var(--font-md)',
  lg: 'var(--font-lg)',
  xl: 'var(--font-xl)',
};

const weightMap: Record<TextWeight, number> = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const Text: React.FC<TextProps> = ({ variant = 'body', size, weight, color, children, className }) => {
  const v = variantMap[variant];

  const style: React.CSSProperties = {
    fontSize: size ? sizeMap[size] : v.fontSize,
    fontWeight: weight ? weightMap[weight] : v.fontWeight,
    fontFamily: v.fontFamily,
    color: color ?? v.color,
    margin: 0,
    lineHeight: 1.5,
  };

  return <span style={style} className={className}>{children}</span>;
};
