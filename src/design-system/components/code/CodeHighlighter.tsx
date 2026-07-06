import React from 'react';

interface CodeHighlighterProps {
  code: string;
  language?: string;
  className?: string;
}

interface TokenPattern {
  regex: RegExp;
  color: string;
}

const TOKEN_PATTERNS: TokenPattern[] = [
  { regex: /\/\/.*/g, color: 'var(--syntax-comment)' },
  { regex: /"([^"\\]|\\.)*"/g, color: 'var(--syntax-string)' },
  { regex: /'([^'\\]|\\.)*'/g, color: 'var(--syntax-string)' },
  { regex: /\b\d+\.?\d*\b/g, color: 'var(--syntax-number)' },
  { regex: /\b(const|let|var|function|return|if|else|for|while|import|export|from|class|interface|type|extends|implements|new|throw|try|catch|finally|async|await)\b/g, color: 'var(--syntax-keyword)' },
  { regex: /[+\-*/=<>!&|^~%]+/g, color: 'var(--syntax-operator)' },
];

interface Token {
  text: string;
  color?: string;
}

function tokenizeLine(line: string): Token[] {
  if (!line) return [{ text: '' }];

  const tokens: Token[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    let earliest: { index: number; text: string; color: string } | null = null;

    for (const p of TOKEN_PATTERNS) {
      p.regex.lastIndex = 0;
      const match = p.regex.exec(remaining);
      if (match) {
        const idx = match.index;
        if (!earliest || idx < earliest.index) {
          earliest = { index: idx, text: match[0], color: p.color };
        }
      }
    }

    if (earliest && earliest.index === 0) {
      tokens.push({ text: earliest.text, color: earliest.color });
      remaining = remaining.slice(earliest.text.length);
    } else if (earliest && earliest.index > 0) {
      tokens.push({ text: remaining.slice(0, earliest.index) });
      tokens.push({ text: earliest.text, color: earliest.color });
      remaining = remaining.slice(earliest.index + earliest.text.length);
    } else {
      tokens.push({ text: remaining });
      remaining = '';
    }
  }

  return tokens;
}

const preStyle: React.CSSProperties = {
  margin: 0,
  padding: 'var(--spacing-md)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--font-sm)',
  lineHeight: 1.6,
  overflow: 'auto',
  background: 'transparent',
};

const codeStyle: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  color: 'var(--text-primary)',
};

export const CodeHighlighter: React.FC<CodeHighlighterProps> = ({
  code,
  className,
}) => {
  const lines = code.split('\n');

  return (
    <pre style={preStyle} className={className}>
      <code style={codeStyle}>
        {lines.map((line, i) => (
          <div key={i} style={{ display: 'block' }}>
            {tokenizeLine(line).map((token, j) =>
              token.color ? (
                <span key={j} style={{ color: token.color }}>{token.text}</span>
              ) : (
                <span key={j}>{token.text}</span>
              )
            )}
          </div>
        ))}
      </code>
    </pre>
  );
};
