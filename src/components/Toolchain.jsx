import Reveal from './Reveal.jsx'
import splitStack from '../splitStack.js'

/**
 * Grouped, not a flat tag cloud — the grouping is what shows you know
 * where each thing sits in a platform.
 */
export default function Toolchain({ items }) {
  return (
    <Reveal>
      <div className="tools">
        {items.map(t => {
          const stack = splitStack(t.stack)
          return (
            <div className="tool" key={t.title}>
              <h3>{t.title}</h3>
              <span className="lvl">{t.badge}</span>
              <p>{t.desc}</p>
              <div className="chips">
                {stack.map(s => <span className="chip" key={s}>{s}</span>)}
              </div>
            </div>
          )
        })}
      </div>
    </Reveal>
  )
}
