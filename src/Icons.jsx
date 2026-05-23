// Inline SVG icons — stroke-based, inherit currentColor

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
};

export const Icons = {
  social: (p) => (
    <svg {...base} {...p}>
      <circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" /><path d="M8.3 10.8 15.7 7.2M8.3 13.2l7.4 3.6" />
    </svg>
  ),
  video: (p) => (
    <svg {...base} {...p}>
      <rect x="2.5" y="6" width="13" height="12" rx="2.5" />
      <path d="M15.5 10.5 21.5 7v10l-6-3.5z" />
    </svg>
  ),
  strategy: (p) => (
    <svg {...base} {...p}>
      <path d="M4 19V5M4 19h15" /><path d="M8 15l3.5-4 3 2.5L20 7" />
      <circle cx="20" cy="7" r="1.4" />
    </svg>
  ),
  ad: (p) => (
    <svg {...base} {...p}>
      <path d="M4 9v6h3l8 4V5L7 9H4z" /><path d="M18 9.5a3.5 3.5 0 0 1 0 5" />
    </svg>
  ),
  sponsor: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="8" r="4" /><path d="M8.5 11 6 21l6-3 6 3-2.5-10" />
    </svg>
  ),
  ugc: (p) => (
    <svg {...base} {...p}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="3" />
      <path d="M10.5 18.5h3" />
    </svg>
  ),
  web: (p) => (
    <svg {...base} {...p}>
      <rect x="2.5" y="4" width="19" height="14" rx="2.5" />
      <path d="M2.5 8.5h19M6 21h12M12 18v3" /><circle cx="5.3" cy="6.2" r="0.5" />
    </svg>
  ),
  film: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M3 15h18M8 4v16M16 4v16" />
    </svg>
  ),
  event: (p) => (
    <svg {...base} {...p}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4M9 14l2 2 4-4" />
    </svg>
  ),
  wedding: (p) => (
    <svg {...base} {...p}>
      <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
    </svg>
  ),
  arrow: (p) => (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  arrowUp: (p) => (
    <svg {...base} {...p}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  ),
  check: (p) => (
    <svg {...base} {...p}>
      <path d="M5 12.5 10 17l9-10" />
    </svg>
  ),
  play: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  ),
  image: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <circle cx="8.5" cy="9.5" r="1.6" /><path d="M4 17l5-5 4 4 3-2.5 4 3.5" />
    </svg>
  ),
  phone: (p) => (
    <svg {...base} {...p}>
      <path d="M6 3.5h3l1.5 5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 5 1.5v3a2 2 0 0 1-2 2C11 23 2 14 2 5.5a2 2 0 0 1 2-2z" />
    </svg>
  ),
  facebook: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M14 8.5h2.5V5.3C16 5.1 14.7 5 13.6 5 10.9 5 9 6.7 9 9.6V12H6v3.3h3V23h3.5v-7.7h2.9l.5-3.3h-3.4v-2c0-1 .3-1.5 1.5-1.5z" />
    </svg>
  ),
  instagram: (p) => (
    <svg {...base} {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="0.6" fill="currentColor" />
    </svg>
  ),
  tiktok: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M16.5 3c.3 2.3 1.6 3.7 3.8 3.9v2.7c-1.3.1-2.5-.3-3.8-1v6.6c0 3.9-2.8 6.3-6 6.3-3 0-5.5-2.3-5.5-5.4 0-3.3 2.8-5.6 6.2-5.1v2.9c-.5-.1-1-.2-1.5-.1-1.4.2-2.3 1.1-2.2 2.5.1 1.3 1.2 2.3 2.6 2.2 1.6-.1 2.5-1.2 2.5-3V3h3.4z" />
    </svg>
  ),
  globe: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18" />
    </svg>
  ),
  chevron: (p) => (
    <svg {...base} {...p}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  spark: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
    </svg>
  ),
  building: (p) => (
    <svg {...base} {...p}>
      <path d="M4 21V6l8-3 8 3v15" /><path d="M2 21h20" />
      <path d="M9 21v-4h6v4M8 9h2M14 9h2M8 13h2M14 13h2" />
    </svg>
  ),
  creator: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
      <path d="M18 4l.8 1.6L20.5 6l-1.7.4L18 8l-.8-1.6L15.5 6l1.7-.4z" />
    </svg>
  ),
  sun: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.6M12 18.9v2.6M21.5 12h-2.6M5.1 12H2.5M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4L5.6 5.6" />
    </svg>
  ),
  moon: (p) => (
    <svg {...base} {...p}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.6 6.6 0 0 0 10.5 10.5z" />
    </svg>
  ),
};
