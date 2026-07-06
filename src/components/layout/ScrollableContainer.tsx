import React from 'react';

interface ScrollableContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <div
      className={`scrollable-container ${className}`}
      style={{
        overflow: 'auto',
        flex: 1,
        minHeight: 0,
        ...style,
      }}
    >
      <style>{`
        .scrollable-container::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .scrollable-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollable-container::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.08);
          border-radius: 3px;
        }
        .scrollable-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.15);
        }
      `}</style>
      {children}
    </div>
  );
};
