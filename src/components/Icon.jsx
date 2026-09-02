/** Small inline icons for the sidebar. Stroked, 24-grid, currentColor. */
const PATHS = {
  about: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  doc: 'M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8zM14 3v5h5M9 13h6M9 17h4',
  server: 'M4 5h16v5H4zM4 14h16v5H4zM8 7.5h.01M8 16.5h.01',
  book: 'M4 5a2 2 0 012-2h6v18H6a2 2 0 01-2-2zM12 3h6a2 2 0 012 2v14a2 2 0 01-2 2h-6',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  term: 'M5 6l5 5-5 5M12 17h7',
}

export default function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name] || PATHS.grid} />
    </svg>
  )
}
