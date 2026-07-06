import React from 'react';
import { iconComponents, IconName } from './icons';

export type { IconName };

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 16, className }) => {
  const Component = iconComponents[name];
  if (!Component) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={className}
      >
        <rect x="2" y="2" width="12" height="12" rx="2" opacity="0.3" />
        <path d="M5 8h6M8 5v6" opacity="0.3" />
      </svg>
    );
  }
  return <Component size={size} className={className} />;
};
