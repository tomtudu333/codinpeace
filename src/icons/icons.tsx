import React from 'react';

export type IconName = keyof typeof iconComponents;

type IconComponent = React.FC<{ size?: number; className?: string }>;

const S: React.FC<{ children: React.ReactNode; size?: number; viewBox?: string }> = ({
  children,
  size = 16,
  viewBox = '0 0 16 16',
}) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const iconComponents: Record<string, IconComponent> = {
  Home: ({ size }) => (
    <S size={size}>
      <path d="M2 8l6-6 6 6" />
      <path d="M4 6.5V13h3v-3h2v3h3V6.5" />
    </S>
  ),

  Search: ({ size }) => (
    <S size={size}>
      <circle cx="7" cy="7" r="3.5" />
      <path d="M10 10l3.5 3.5" />
    </S>
  ),

  Layers: ({ size }) => (
    <S size={size}>
      <path d="M8 2L2 5.5 8 9l6-3.5L8 2z" />
      <path d="M2 9.5l6 3.5 6-3.5" />
      <path d="M2 12.5l6 3.5 6-3.5" />
    </S>
  ),

  Settings: ({ size }) => (
    <S size={size}>
      <circle cx="8" cy="8" r="2" />
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M2.5 2.5l1 1M12.5 12.5l1 1M2.5 13.5l1-1M12.5 3.5l1-1" />
    </S>
  ),

  Help: ({ size }) => (
    <S size={size}>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M6 6a2 2 0 114 0c0 1-1 1.5-2 2" />
      <circle cx="8" cy="11.5" r="0.5" fill="currentColor" stroke="none" />
    </S>
  ),

  Bookmark: ({ size }) => (
    <S size={size}>
      <path d="M3 2v12l5-3 5 3V2a1 1 0 00-1-1H4a1 1 0 00-1 1z" />
    </S>
  ),

  History: ({ size }) => (
    <S size={size}>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V8l2 2" />
      <path d="M2.5 8H1" />
    </S>
  ),

  Folder: ({ size }) => (
    <S size={size}>
      <path d="M1.5 4v8.5a1 1 0 001 1h11a1 1 0 001-1V5.5a1 1 0 00-1-1H8l-1.5-2H2.5a1 1 0 00-1 1z" />
    </S>
  ),

  File: ({ size }) => (
    <S size={size}>
      <path d="M10 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4l-3-3z" />
      <path d="M10 1v3h3" />
    </S>
  ),

  Plus: ({ size }) => (
    <S size={size}>
      <path d="M8 3v10M3 8h10" />
    </S>
  ),

  Minus: ({ size }) => (
    <S size={size}>
      <path d="M3 8h10" />
    </S>
  ),

  X: ({ size }) => (
    <S size={size}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </S>
  ),

  Check: ({ size }) => (
    <S size={size}>
      <path d="M3 8.5l3 3 7-7" />
    </S>
  ),

  ChevronDown: ({ size }) => (
    <S size={size}>
      <path d="M4 6l4 4 4-4" />
    </S>
  ),

  ChevronRight: ({ size }) => (
    <S size={size}>
      <path d="M6 4l4 4-4 4" />
    </S>
  ),

  ChevronLeft: ({ size }) => (
    <S size={size}>
      <path d="M10 4L6 8l4 4" />
    </S>
  ),

  ChevronUp: ({ size }) => (
    <S size={size}>
      <path d="M12 10l-4-4-4 4" />
    </S>
  ),

  Menu: ({ size }) => (
    <S size={size}>
      <path d="M2 4h12M2 8h12M2 12h12" />
    </S>
  ),

  MoreHorizontal: ({ size }) => (
    <S size={size}>
      <circle cx="4" cy="8" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="8" cy="8" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8" r="0.75" fill="currentColor" stroke="none" />
    </S>
  ),

  MoreVertical: ({ size }) => (
    <S size={size}>
      <circle cx="8" cy="4" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="8" cy="8" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="8" cy="12" r="0.75" fill="currentColor" stroke="none" />
    </S>
  ),

  Edit: ({ size }) => (
    <S size={size}>
      <path d="M11.5 2.5a1.5 1.5 0 012 2l-8 8-3 .5.5-3 8.5-7.5z" />
    </S>
  ),

  Trash: ({ size }) => (
    <S size={size}>
      <path d="M2 4h12M5 4V2.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5V4M3 4v9a1 1 0 001 1h8a1 1 0 001-1V4" />
    </S>
  ),

  Copy: ({ size }) => (
    <S size={size}>
      <rect x="5.5" y="5.5" width="8" height="9" rx="1" />
      <path d="M2.5 10.5V3a.5.5 0 01.5-.5h7" />
    </S>
  ),

  Info: ({ size }) => (
    <S size={size}>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 7v4.5" />
      <circle cx="8" cy="5" r="0.5" fill="currentColor" stroke="none" />
    </S>
  ),

  Warning: ({ size }) => (
    <S size={size}>
      <path d="M8 2L1 14h14L8 2z" />
      <path d="M8 6v3.5" />
      <circle cx="8" cy="12" r="0.5" fill="currentColor" stroke="none" />
    </S>
  ),

  Error: ({ size }) => (
    <S size={size}>
      <circle cx="8" cy="8" r="6" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" />
    </S>
  ),

  Success: ({ size }) => (
    <S size={size}>
      <circle cx="8" cy="8" r="6" />
      <path d="M5 8.5l2 2 4-4.5" />
    </S>
  ),

  AlertCircle: ({ size }) => (
    <S size={size}>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 5v3.5" />
      <circle cx="8" cy="11" r="0.5" fill="currentColor" stroke="none" />
    </S>
  ),

  Refresh: ({ size }) => (
    <S size={size}>
      <path d="M2 8a6 6 0 0111.2-3M14 8a6 6 0 01-11.2 3" />
      <path d="M14 2v3.5H10.5M2 14v-3.5h3.5" />
    </S>
  ),

  Eye: ({ size }) => (
    <S size={size}>
      <path d="M1 8s3-5.5 7-5.5S15 8 15 8s-3 5.5-7 5.5S1 8 1 8z" />
      <circle cx="8" cy="8" r="2.5" />
    </S>
  ),

  EyeOff: ({ size }) => (
    <S size={size}>
      <path d="M1 8s3-5.5 7-5.5S15 8 15 8s-3 5.5-7 5.5S1 8 1 8z" />
      <circle cx="8" cy="8" r="2.5" />
      <path d="M3 3l10 10" />
    </S>
  ),

  Code: ({ size }) => (
    <S size={size}>
      <path d="M5 5L1 8l4 3M11 5l4 3-4 3M9.5 2.5l-3 11" />
    </S>
  ),

  Terminal: ({ size }) => (
    <S size={size}>
      <path d="M2 4l4 4-4 4M8 12h6" />
    </S>
  ),

  Command: ({ size }) => (
    <S size={size}>
      <path d="M5 3.5A1.5 1.5 0 113.5 5H5V3.5zM11 3.5A1.5 1.5 0 1012.5 5H11V3.5zM5 12.5A1.5 1.5 0 103.5 11H5v1.5zM11 12.5A1.5 1.5 0 1112.5 11H11v1.5z" />
      <path d="M5 5v6M11 5v6" />
    </S>
  ),

  Filter: ({ size }) => (
    <S size={size}>
      <path d="M1 2h14l-5 6.5V14l-4-2V8.5L1 2z" />
    </S>
  ),

  Clock: ({ size }) => (
    <S size={size}>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V8l2.5 2.5" />
    </S>
  ),

  User: ({ size }) => (
    <S size={size}>
      <circle cx="8" cy="5.5" r="3" />
      <path d="M2 14c0-3.5 3-5 6-5s6 1.5 6 5" />
    </S>
  ),

  Star: ({ size }) => (
    <S size={size}>
      <path d="M8 1l1.8 5.5H15l-4.5 3.5 1.7 5.5L8 12l-4.2 3.5 1.7-5.5L1 6.5h5.2L8 1z" />
    </S>
  ),

  Grid: ({ size }) => (
    <S size={size}>
      <rect x="1.5" y="1.5" width="5" height="5" rx="0.5" />
      <rect x="9.5" y="1.5" width="5" height="5" rx="0.5" />
      <rect x="1.5" y="9.5" width="5" height="5" rx="0.5" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" />
    </S>
  ),

  List: ({ size }) => (
    <S size={size}>
      <path d="M2 4h12M2 8h12M2 12h12" />
      <circle cx="2" cy="4" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="2" cy="8" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="2" cy="12" r="0.5" fill="currentColor" stroke="none" />
    </S>
  ),

  Maximize: ({ size }) => (
    <S size={size}>
      <path d="M2 6V2h4M14 10v4h-4M2 10v4h4M14 6V2h-4" />
    </S>
  ),

  Minimize: ({ size }) => (
    <S size={size}>
      <path d="M6 2v4H2M10 14v-4h4" />
    </S>
  ),

  Expand: ({ size }) => (
    <S size={size}>
      <path d="M2 9V2h7M14 7v7H7" />
    </S>
  ),

  Collapse: ({ size }) => (
    <S size={size}>
      <path d="M9 2v5h5M7 14V9H2" />
    </S>
  ),

  Lock: ({ size }) => (
    <S size={size}>
      <rect x="4.5" y="7.5" width="7" height="6" rx="1" />
      <path d="M5.5 7.5V5a2.5 2.5 0 015 0v2.5" />
      <circle cx="8" cy="10.5" r="0.75" fill="currentColor" stroke="none" />
      <path d="M8 10.5V11" />
    </S>
  ),

  Unlock: ({ size }) => (
    <S size={size}>
      <rect x="4.5" y="7.5" width="7" height="6" rx="1" />
      <path d="M5.5 7.5V5a2.5 2.5 0 015 0" />
    </S>
  ),

  Link: ({ size }) => (
    <S size={size}>
      <path d="M6.5 9.5a3.5 3.5 0 005 0l3-3a3.5 3.5 0 00-5-5l-1.5 1.5" />
      <path d="M9.5 6.5a3.5 3.5 0 00-5 0l-3 3a3.5 3.5 0 005 5l1.5-1.5" />
    </S>
  ),

  ExternalLink: ({ size }) => (
    <S size={size}>
      <path d="M11 1h4v4M9 7l6-6M10 9H3a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1v-3" />
    </S>
  ),

  Sliders: ({ size }) => (
    <S size={size}>
      <path d="M5 4h9M2 4h1M5 12h9M2 12h1M9 8h5M2 8h5" />
      <circle cx="5" cy="4" r="1.5" />
      <circle cx="9" cy="12" r="1.5" />
      <circle cx="9" cy="8" r="1.5" />
    </S>
  ),

  Panel: ({ size }) => (
    <S size={size}>
      <rect x="1.5" y="2.5" width="13" height="11" rx="1" />
      <path d="M1.5 6.5h13" />
      <path d="M5.5 2.5v11" />
    </S>
  ),

  Sidebar: ({ size }) => (
    <S size={size}>
      <rect x="1.5" y="2.5" width="13" height="11" rx="1" />
      <path d="M5.5 2.5v11" />
    </S>
  ),

  Download: ({ size }) => (
    <S size={size}>
      <path d="M8 1v9M4 6l4 4 4-4M2 12v2a1 1 0 001 1h10a1 1 0 001-1v-2" />
    </S>
  ),

  Upload: ({ size }) => (
    <S size={size}>
      <path d="M8 10V1M4 5l4-4 4 4M2 12v2a1 1 0 001 1h10a1 1 0 001-1v-2" />
    </S>
  ),

  Play: ({ size }) => (
    <S size={size}>
      <circle cx="8" cy="8" r="6" />
      <path d="M6.5 5v6l5-3-5-3z" />
    </S>
  ),

  Pause: ({ size }) => (
    <S size={size}>
      <circle cx="8" cy="8" r="6" />
      <path d="M6.5 5v6M9.5 5v6" />
    </S>
  ),
};
