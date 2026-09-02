import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Modal({ item, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('locked')
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('locked') }
  }, [onClose])

  return (
    <motion.div className="scrim" role="dialog" aria-modal="true" aria-label={item.title}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}>
      <motion.div className="sheet"
        initial={{ y: 26, opacity: 0, scale: .97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 16, opacity: 0, scale: .98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
        <button className="close" ref={closeRef} onClick={onClose} aria-label="Close">✕</button>
        <div className={`sheet-top pal-${item.palette}`}>
          <span className="glyph" aria-hidden="true">{item.glyph}</span>
          <h3>{item.title}</h3>
          {item.sub && <p className="sub">{item.sub}</p>}
        </div>
        <div className="sheet-body">
          <div>
            <div className="metarow" style={{ marginTop: 0 }}>
              {item.badge && <span style={{ color: 'var(--ok)', fontWeight: 600 }}>{item.badge}</span>}
              {item.year && <span>{item.year}</span>}
            </div>
            <p>{item.desc}</p>
            {item.points && <ul>{item.points.map((p, i) => <li key={i}>{p}</li>)}</ul>}
          </div>
          <dl className="side">
            {item.role && <><dt>Role</dt><dd>{item.role}</dd></>}
            {item.stack && <><dt>Stack</dt><dd>{item.stack}</dd></>}
            {item.link && <><dt>Link</dt><dd>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.link.replace(/^https?:\/\//, '')}
              </a></dd></>}
          </dl>
        </div>
      </motion.div>
    </motion.div>
  )
}
