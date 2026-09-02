import { motion } from 'framer-motion'

export default function Card({ item, onOpen }) {
  return (
    <motion.button
      className="card"
      onClick={() => onOpen(item)}
      whileHover={{ scale: 1.06, zIndex: 5 }}
      whileFocus={{ scale: 1.06, zIndex: 5 }}
      whileTap={{ scale: .99 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      aria-label={`Open details for ${item.title}`}
    >
      <div className={`poster pal-${item.palette}`}>
        <span className="glyph" aria-hidden="true">{item.glyph}</span>
        <span className="ttl">{item.title}</span>
        {item.sub && <span className="sub">{item.sub}</span>}
      </div>
      {item.progress != null && (
        <div className="bar"><i style={{ width: item.progress + '%' }} /></div>
      )}
      <span className="cardfoot">
        <span className="b">{item.badge}</span>
        <span>{item.year}</span>
      </span>
    </motion.button>
  )
}
