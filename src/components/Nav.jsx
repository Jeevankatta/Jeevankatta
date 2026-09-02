import { motion, AnimatePresence } from 'framer-motion'
import { PROFILE } from '../data.js'

const SECTIONS = [
  ['row-projects', 'Projects'],
  ['row-work', 'Work'],
  ['row-stack', 'Stack'],
  ['row-background', 'Background'],
]

export default function Nav({ solid, view, setView, query, setQuery, searchOpen, setSearchOpen }) {
  const go = (id) => {
    if (view !== 'browse') { setView('browse'); setTimeout(() => scrollTo(id), 60) }
    else scrollTo(id)
  }
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      <header className={'nav' + (solid ? ' solid' : '')}>
        <button className="brand" onClick={() => { setView('browse'); window.scrollTo({ top: 0 }) }}>JEEVAN</button>

        {view === 'browse' && (
          <nav className="nav-links">
            {SECTIONS.map(([id, label]) => (
              <button key={id} onClick={() => go(id)}>{label}</button>
            ))}
          </nav>
        )}

        <div className="nav-right">
          {view === 'browse' && (
            <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(o => !o)}>⌕</button>
          )}
          <button className="pill-ghost" onClick={() => setView(view === 'resume' ? 'browse' : 'resume')}>
            {view === 'resume' ? 'Browse' : 'Plain text'}
          </button>
          <a className="pill" href={`mailto:${PROFILE.email}`}>Contact</a>
        </div>
      </header>

      <AnimatePresence>
        {searchOpen && view === 'browse' && (
          <motion.div className="searchbar"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: .22 }}>
            <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search projects, tools, keywords…" aria-label="Search portfolio" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
