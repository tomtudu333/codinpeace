import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  meta?: boolean;
  handler: () => void;
}

export function useKeyboard(shortcuts: KeyboardShortcut[]): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      for (const s of shortcuts) {
        const matchKey = e.key.toLowerCase() === s.key.toLowerCase();
        const matchCtrl = s.ctrl ? e.ctrlKey : !e.ctrlKey;
        const matchShift = s.shift ? e.shiftKey : !e.shiftKey;
        const matchMeta = s.meta ? e.metaKey : !e.metaKey;

        if (matchKey && matchCtrl && matchShift && matchMeta) {
          e.preventDefault();
          s.handler();
          return;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
