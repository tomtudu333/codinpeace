import React from 'react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className,
}) => {
  return (
    <nav
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-xs, 4px)',
        fontSize: 'var(--font-sm)',
        color: 'var(--text-secondary, var(--text-primary))',
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <span
              onClick={item.onClick}
              style={{
                cursor: item.onClick ? 'pointer' : 'default',
                color: isLast
                  ? 'var(--text-primary)'
                  : 'var(--text-secondary, var(--text-primary))',
                fontWeight: isLast ? 600 : 400,
              }}
            >
              {item.label}
            </span>
            {!isLast && <span>{separator}</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
