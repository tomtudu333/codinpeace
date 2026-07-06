import { useEffect, useCallback } from 'react';

interface Shortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  meta?: boolean;
  handler: (e: KeyboardEvent) => void;
}

export function useKeyboard(shortcuts: Shortcut[]): void {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      for (const s of shortcuts) {
        const ctrlMatch = s.ctrl ? (e.ctrlKey || e.metaKey) : (!e.ctrlKey && !e.metaKey);
        const shiftMatch = s.shift ? e.shiftKey : !e.shiftKey;
        const metaMatch = s.meta ? e.metaKey : true;

        if (
          e.key.toLowerCase() === s.key.toLowerCase() &&
          ctrlMatch &&
          shiftMatch &&
          metaMatch
        ) {
          e.preventDefault();
          e.stopPropagation();
          s.handler(e);
          return;
        }
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
