import { useRef } from 'react'
import { motion } from 'framer-motion'
import Card from './Card.jsx'

export default function Row({ row, onOpen }) {
  const rail = useRef(null)
  const nudge = (dir) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * .85 })

  return (
    <motion.section className="row" id={row.id}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: .45, ease: [.2, .7, .3, 1] }}>
      <h2>{row.title}</h2>
      <div className="railwrap">
        <button className="arrow l" aria-label="Scroll left" onClick={() => nudge(-1)}>‹</button>
        <div className="rail" ref={rail}>
          {row.items.map(it => <Card key={it.title} item={it} onOpen={onOpen} />)}
        </div>
        <button className="arrow r" aria-label="Scroll right" onClick={() => nudge(1)}>›</button>
      </div>
    </motion.section>
  )
}
