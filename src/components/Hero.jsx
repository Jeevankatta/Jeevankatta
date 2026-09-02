import { motion } from 'framer-motion'
import { PROFILE, HERO_DETAIL } from '../data.js'

export default function Hero({ onInfo }) {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-fade" />
      <motion.div className="hero-in"
        initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .6, ease: [.2, .7, .3, 1] }}>
        <span className="avail"><i className="dot" />Open to DevOps &amp; Cloud roles</span>
        <h1>{PROFILE.name}</h1>
        <p className="role">{PROFILE.role}</p>
        <div className="metarow">
          <span>{PROFILE.years}</span>
          <span>{PROFILE.location}</span>
          {PROFILE.tags.map(t => <span className="tag" key={t}>{t}</span>)}
        </div>
        <p className="blurb">{PROFILE.blurb}</p>
        <div className="hero-btns">
          <a className="btn btn-white" href={PROFILE.resume} download>▶ Download resume</a>
          <button className="btn btn-grey" onClick={() => onInfo(HERO_DETAIL)}>ⓘ More info</button>
        </div>
      </motion.div>
    </section>
  )
}
