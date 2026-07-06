import React, { useState } from 'react';
import { Icon } from '@/icons';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(items.length > 0 ? [items[0].id] : []));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`accordion ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => toggle(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '10px var(--spacing-lg)',
                background: 'transparent',
                border: 'none',
                color: isOpen ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'left',
                transition: 'color var(--anim-fast)',
              }}
              aria-expanded={isOpen}
            >
              <div style={{
                transition: 'transform var(--anim-fast) var(--ease-out)',
                transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                display: 'flex',
                flexShrink: 0,
              }}>
                <Icon name="ChevronDown" size={10} />
              </div>
              {item.icon && <span style={{ display: 'flex', flexShrink: 0 }}>{item.icon}</span>}
              <span style={{ flex: 1 }}>{item.title}</span>
            </button>
            {isOpen && (
              <div style={{
                padding: '0 var(--spacing-lg) var(--spacing-md) var(--spacing-lg)',
                animation: 'fadeIn var(--anim-fast) var(--ease-out) forwards',
              }}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
