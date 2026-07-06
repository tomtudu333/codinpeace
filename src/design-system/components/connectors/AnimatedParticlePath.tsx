import React from 'react';

interface AnimatedParticlePathProps {
  path: string;
  color?: string;
  size?: number;
  duration?: number;
}

export const AnimatedParticlePath: React.FC<AnimatedParticlePathProps> = ({
  path,
  color = 'var(--accent-primary)',
  size = 4,
  duration = 2000,
}) => (
  <circle r={size} fill={color}>
    <animateMotion
      dur={`${duration}ms`}
      repeatCount="indefinite"
      path={path}
    />
  </circle>
);
