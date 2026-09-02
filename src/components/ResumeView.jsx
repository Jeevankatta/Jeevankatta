import { motion } from 'framer-motion'
import { PROFILE, ROWS } from '../data.js'

const find = id => ROWS.find(r => r.id === id).items

export default function ResumeView() {
  const projects = find('row-projects')
  const work = find('row-work')
  const stack = find('row-stack')
  const background = find('row-background')

  return (
    <motion.div className="resume"
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3 }}>
      <h1>{PROFILE.name}</h1>
      <p className="r-role">{PROFILE.role} · {PROFILE.location}</p>
      <div className="r-contact">
        <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={PROFILE.resume} download>Resume PDF</a>
      </div>

      <section>
        <h2>Summary</h2>
        <p style={{ color: '#c9c9d3', lineHeight: 1.7, fontSize: 15 }}>{PROFILE.blurb}</p>
      </section>

      <section>
        <h2>Experience</h2>
        {background.filter(b => b.title === 'Cognizant').map(b => (
          <div className="r-item" key={b.title}>
            <h3>{b.role}</h3>
            <p className="m">{b.title} · {b.sub}</p>
            <ul>{b.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
        ))}
        {work.map(w => (
          <div className="r-item" key={w.title}>
            <h3>{w.title}</h3>
            <p className="m">{w.year} · {w.stack}</p>
            <p>{w.desc}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Projects</h2>
        {projects.map(p => (
          <div className="r-item" key={p.title}>
            <h3>{p.title}</h3>
            <p className="m">{p.stack}</p>
            <p>{p.desc}</p>
            {p.link && <p><a href={p.link} target="_blank" rel="noopener noreferrer">{p.link.replace(/^https?:\/\//, '')}</a></p>}
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <div className="chips">
          {stack.flatMap(s => s.stack.split(',').map(x => x.trim()))
            .filter((v, i, a) => v && a.indexOf(v) === i)
            .map(s => <span className="chip" key={s}>{s}</span>)}
        </div>
      </section>

      <section>
        <h2>Education &amp; certifications</h2>
        {background.filter(b => b.title !== 'Cognizant').map(b => (
          <div className="r-item" key={b.title}>
            <h3>{b.title}</h3>
            <p className="m">{b.role} · {b.year}</p>
          </div>
        ))}
      </section>
    </motion.div>
  )
}
