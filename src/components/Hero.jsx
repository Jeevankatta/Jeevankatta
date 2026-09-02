import { PROFILE, HIGHLIGHTS } from '../data.js'
import Reveal from './Reveal.jsx'

export default function Hero() {
  return (
    <div className="wrap hero" id="top">
      <Reveal>
        <span className="avail"><i className="dot" /> Open to DevOps &amp; Cloud roles</span>
        <h1>{PROFILE.name}</h1>
        <p className="role">{PROFILE.role}</p>
        <p className="meta">
          <span>{PROFILE.years} experience</span>
          <span>·</span>
          <span>{PROFILE.location}</span>
          <span>·</span>
          <span>Onsite or remote</span>
        </p>
        <p className="blurb">{PROFILE.blurb}</p>
        <div className="actions">
          <a className="btn btn-primary" href={PROFILE.resume} download>Download resume</a>
          <a className="btn" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="highlights">
          {HIGHLIGHTS.map(h => (
            <div key={h.l}>
              <span className="n">{h.n}</span>
              <span className="l">{h.l}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
