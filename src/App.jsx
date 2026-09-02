import { useState, useEffect, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PROFILE, ROWS } from './data.js'
import Intro from './components/Intro.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Row from './components/Row.jsx'
import Modal from './components/Modal.jsx'
import ResumeView from './components/ResumeView.jsx'

export default function App() {
  const [intro, setIntro] = useState(true)
  const [solid, setSolid] = useState(false)
  const [view, setView] = useState('browse')
  const [open, setOpen] = useState(null)
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  // Intro plays once, briefly, and never blocks: it clears itself in 1.7s.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setIntro(false); return }
    const t = setTimeout(() => setIntro(false), 1700)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ROWS
    return ROWS
      .map(r => ({
        ...r,
        items: r.items.filter(it =>
          [it.title, it.sub, it.stack, it.desc, it.role].join(' ').toLowerCase().includes(q)
        ),
      }))
      .filter(r => r.items.length)
  }, [query])

  return (
    <>
      <AnimatePresence>{intro && <Intro key="intro" onDone={() => setIntro(false)} />}</AnimatePresence>

      <Nav solid={solid} view={view} setView={setView}
        query={query} setQuery={setQuery}
        searchOpen={searchOpen} setSearchOpen={setSearchOpen} />

      {view === 'browse' ? (
        <>
          <Hero onInfo={setOpen} />
          <main>
            {rows.length
              ? rows.map(r => <Row key={r.id} row={r} onOpen={setOpen} />)
              : <p className="empty">Nothing matched “{query}”. Try kubernetes, aws, terraform or pipeline.</p>}
          </main>
        </>
      ) : (
        <ResumeView />
      )}

      <AnimatePresence>
        {open && <Modal key="modal" item={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>

      <footer>
        <div className="flinks">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={PROFILE.resume} download>Resume PDF</a>
        </div>
        <p>
          React and Vite, animated with Framer Motion, deployed by GitHub Actions on every push to main.
          No analytics, no tracking. Based in {PROFILE.location} — open to DevOps and Cloud roles, onsite or remote.
        </p>
      </footer>
    </>
  )
}
