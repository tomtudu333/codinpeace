import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Toast } from './Toast';

interface ToastItem {
  id: string;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
}

interface ToastContextValue {
  addToast: (message: string, variant?: 'info' | 'success' | 'warning' | 'error') => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const addToast = useCallback((message: string, variant?: 'info' | 'success' | 'warning' | 'error') => {
    const id = `toast-${++toastCounter}`;
    setToasts((prev) => [...prev, { id, message, variant }]);
    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      timersRef.current.delete(id);
    }, 4000);
    timersRef.current.set(id, timer);
  }, []);

  const removeToast = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 'var(--spacing-lg)',
    right: 'var(--spacing-lg)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-sm)',
    zIndex: 'var(--z-modal)',
    pointerEvents: 'none',
  };

  const toastWrapperStyle: React.CSSProperties = {
    pointerEvents: 'auto',
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={containerStyle}>
        {toasts.map((t) => (
          <div key={t.id} style={toastWrapperStyle}>
            <Toast id={t.id} message={t.message} variant={t.variant} onClose={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}
