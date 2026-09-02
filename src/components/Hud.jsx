import { useEffect, useState } from 'react'
import { PROFILE } from '../data.js'

function Uptime() {
  const [t, setT] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setT(x => x + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const mm = String(Math.floor(t / 60)).padStart(2, '0')
  const ss = String(t % 60).padStart(2, '0')
  return <span>session up 00:{mm}:{ss}</span>
}

export default function Hud({ nodes, center, activeId, onSelect }) {
  return (
    <>
      <div className="hud hud-tl">
        <p className="ident">
          <b>jk</b> {PROFILE.name}
        </p>
        <p className="ident-sub">{PROFILE.role} · {PROFILE.location}</p>
      </div>

      <div className="hud hud-tr">
        <a className="btn btn-primary" href={PROFILE.resume} download>Resume</a>
        <a className="btn" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a className="btn" href={`mailto:${PROFILE.email}`}>Email</a>
      </div>

      <div className="hud hud-bl">
        <p><i className="dot" /> cluster healthy · {nodes.length}/{nodes.length} nodes ready</p>
        <p className="faint"><Uptime /> · {PROFILE.years} in production · open to offers</p>
      </div>

      <nav className="hud hud-bc" aria-label="Sections">
        <button
          className={`chip-btn${activeId === center.id ? ' on' : ''}`}
          onClick={() => onSelect(activeId === center.id ? null : center.id)}
        >
          <kbd>0</kbd> {center.label}
        </button>
        {nodes.map((n, i) => (
          <button
            key={n.id}
            className={`chip-btn${activeId === n.id ? ' on' : ''}`}
            onClick={() => onSelect(activeId === n.id ? null : n.id)}
          >
            <kbd>{i + 1}</kbd> {n.label}
          </button>
        ))}
      </nav>
    </>
  )
}
