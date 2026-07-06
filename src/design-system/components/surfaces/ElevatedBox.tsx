import React from 'react';

type ElevationLevel = 'sm' | 'md' | 'lg';

interface ElevatedBoxProps {
  children: React.ReactNode;
  elevation?: ElevationLevel;
  hoverable?: boolean;
  className?: string;
}

const shadowMap: Record<ElevationLevel, string> = {
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
};

const shadowHoverMap: Record<ElevationLevel, string> = {
  sm: 'var(--shadow-md)',
  md: 'var(--shadow-lg)',
  lg: 'var(--shadow-xl)',
};

export const ElevatedBox: React.FC<ElevatedBoxProps> = ({
  children,
  elevation = 'sm',
  hoverable = false,
  className,
}) => {
  const [hovered, setHovered] = React.useState(false);

  const style: React.CSSProperties = {
    background: 'var(--bg-surface)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--spacing-md)',
    boxShadow: hovered && hoverable ? shadowHoverMap[elevation] : shadowMap[elevation],
    transition: 'box-shadow var(--anim-fast)',
  };

  return (
    <div
      style={style}
      className={className}
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
};
