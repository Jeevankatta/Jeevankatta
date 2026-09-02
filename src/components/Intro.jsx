import { motion } from 'framer-motion'

export default function Intro({ onDone }) {
  const letters = 'JEEVAN'.split('')
  return (
    <motion.div className="intro" exit={{ opacity: 0 }} transition={{ duration: .5 }}>
      <div className="word" aria-label="Jeevan">
        {letters.map((c, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 26, scaleY: .7 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            transition={{ delay: i * .085, type: 'spring', stiffness: 320, damping: 22 }}
          >{c}</motion.span>
        ))}
      </div>
      <button className="intro-skip" onClick={onDone}>Skip intro</button>
    </motion.div>
  )
}
