import { useEffect, useRef } from 'react'
import Entry from './Entry.jsx'
import { HIGHLIGHTS, PIPELINE } from '../data.js'

/**
 * Content for one worker node. Opens over the cluster rather than
 * extending the page — the document never scrolls, only this does.
 */
export default function Panel({ node, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    ref.current?.focus()
    if (ref.current) ref.current.scrollTop = 0
  }, [node?.id])

  if (!node) return null

  return (
    <aside
      className="panel"
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-label={node.label}
      aria-modal="false"
    >
      <header className="panel-head">
        <div>
          <p className="kicker">{node.k} · {node.sub}</p>
          <h2>{node.heading}</h2>
        </div>
        <button className="close" onClick={onClose} aria-label="Close panel">esc</button>
      </header>

      {node.blurb && <p className="panel-blurb">{node.blurb}</p>}

      <div className="panel-body">
        {node.overview ? (
          <>
            <div className="hl">
              {HIGHLIGHTS.map(h => (
                <div key={h.l}>
                  <span className="n">{h.n}</span>
                  <span className="l">{h.l}</span>
                </div>
              ))}
            </div>

            <h3 className="sub">How the work ships</h3>
            <ol className="flow">
              {PIPELINE.map(s => (
                <li key={s.step}>
                  <span className="fs">{s.step}</span>
                  <span className="fn">{s.name}</span>
                  <span className="ft">{s.tools.join(' · ')}</span>
                </li>
              ))}
            </ol>
            <p className="note">
              Security is a gate rather than a review step, and delivery is pull-based —
              the cluster converges on git instead of a pipeline pushing into it.
            </p>
          </>
        ) : (
          node.items.map(item => <Entry key={item.title} item={item} />)
        )}
      </div>
    </aside>
  )
}
