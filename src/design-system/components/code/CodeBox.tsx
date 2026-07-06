import React from 'react';
import { CodeHighlighter } from './CodeHighlighter';

interface CodeBoxProps {
  code: string;
  language?: string;
  header?: React.ReactNode;
  meta?: React.ReactNode;
  className?: string;
}

export const CodeBox: React.FC<CodeBoxProps> = ({
  code,
  language,
  header,
  meta,
  className,
}) => {
  const containerStyle: React.CSSProperties = {
    borderRadius: 'var(--radius-md)',
    border: '1px solid rgba(var(--accent-primary), 0.15)',
    boxShadow: 'var(--shadow-md)',
    background: 'var(--bg-surface)',
    overflow: 'hidden',
  };

  const headerStyle: React.CSSProperties = {
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderBottom: '1px solid var(--border-subtle)',
    fontSize: 'var(--font-sm)',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const metaStyle: React.CSSProperties = {
    padding: 'var(--spacing-xs) var(--spacing-md)',
    borderTop: '1px solid var(--border-subtle)',
    fontSize: 'var(--font-xs)',
    color: 'var(--text-tertiary)',
  };

  return (
    <div className={className} style={containerStyle}>
      {header && <div style={headerStyle}>{header}</div>}
      <CodeHighlighter code={code} language={language} />
      {meta && <div style={metaStyle}>{meta}</div>}
    </div>
  );
};
