import { useState } from 'react'
import { PROFILE, ROWS, HIGHLIGHTS, DOING, PIPELINE } from './data.js'
import Profile from './components/Profile.jsx'
import Sidebar from './components/Sidebar.jsx'
import Entry from './components/Entry.jsx'
import Scene from './components/Scene.jsx'
import splitStack from './splitStack.js'

const rowItems = id => ROWS.find(r => r.id === id)?.items ?? []

const SECTIONS = [
  { id: 'about',    nav: 'About',    icon: 'about',  title: 'About Me',        meta: `${PROFILE.role} · ${PROFILE.location} · ${PROFILE.years} in production` },
  { id: 'projects', nav: 'Projects', icon: 'grid',   title: 'Projects',        meta: 'Public repositories · Terraform, Helm, ArgoCD, CI pipelines' },
  { id: 'work',     nav: 'Work',     icon: 'doc',    title: 'Production Work', meta: 'Cognizant · US banking client · Dec 2023 – Jun 2026' },
  { id: 'stack',    nav: 'Stack',    icon: 'term',   title: 'Toolchain',       meta: 'Grouped by where each thing sits in a platform' },
  { id: 'infra',    nav: 'Infra',    icon: 'server', title: 'Infrastructure',  meta: 'Live cluster diagram · click a node to jump to that section' },
  { id: 'history',  nav: 'Resume',   icon: 'book',   title: 'Background',      meta: 'Experience, certifications and education' },
  { id: 'contact',  nav: 'Contact',  icon: 'mail',   title: 'Contact',         meta: `${PROFILE.location} · onsite or remote · responds within 24h` },
]

/* The nodes drawn in the Infrastructure section, mapped to sections. */
const NODES = [
  { id: 'projects', k: 'node-01', label: 'Projects',   sub: 'built from scratch' },
  { id: 'work',     k: 'node-02', label: 'Production', sub: 'us banking client' },
  { id: 'stack',    k: 'node-03', label: 'Toolchain',  sub: 'daily drivers' },
  { id: 'history',  k: 'node-04', label: 'Background', sub: 'experience & certs' },
]

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch { return false }
}

function Entries({ items }) {
  return <div>{items.map(i => <Entry key={i.title} item={i} />)}</div>
}

function Toolchain() {
  return (
    <div className="tools">
      {rowItems('row-stack').map(t => (
        <div className="tool" key={t.title}>
          <h3>{t.title}</h3>
          <span className="lvl">{t.badge}</span>
          <p>{t.desc}</p>
          <div className="chips">
            {splitStack(t.stack).map(s => <span className="chip" key={s}>{s}</span>)}
          </div>
        </div>
      ))}
    </div>
  )
}

function About() {
  return (
    <>
      <p className="lede">{PROFILE.blurb}</p>
      <p className="note">
        Two and a half years at Cognizant supporting a US banking client — CI/CD pipelines,
        containerised services, infrastructure as code, monitoring, and the production incidents
        that come with all of it. Currently building Kubernetes platforms from scratch and
        preparing for the CKA. B.Tech in Electronics and Communication Engineering, 2023.
        Open to DevOps and Cloud roles across India and remote.
      </p>

      <h2 className="h2">By the Numbers</h2>
      <div className="stats">
        {HIGHLIGHTS.map(h => (
          <div className="stat" key={h.l}>
            <span className="n">{h.n}</span>
            <span className="l">{h.l}</span>
          </div>
        ))}
      </div>

      <h2 className="h2">What I'm Doing</h2>
      <div className="doing">
        {DOING.map(d => (
          <div className="do" key={d.title}>
            <span className="t">{d.tag}</span>
            <h3>{d.title}</h3>
            <p>{d.desc}</p>
          </div>
        ))}
      </div>
    </>
  )
}

function Infra({ onSelect, gl }) {
  return (
    <>
      <p className="lede">
        The shape of the platform I build and run: a control plane, worker nodes carrying pods,
        and pull-based delivery down each link. Every node here is also a section — click one.
      </p>

      {gl
        ? <Scene items={NODES} onSelect={onSelect} />
        : <p className="note">This diagram needs WebGL, which this browser has turned off. The written flow below says the same thing.</p>}

      <div className="legend">
        <span><i style={{ background: 'var(--accent)' }} /> control plane</span>
        <span><i style={{ background: '#dde7e6', border: '1px solid #8fada9' }} /> worker node</span>
        <span><i style={{ background: 'var(--accent)', borderRadius: '50%' }} /> pod</span>
        <span><i style={{ background: 'var(--accent)', opacity: .4 }} /> traffic</span>
      </div>

      <h2 className="h2">Commit to production</h2>
      <div className="doing">
        {PIPELINE.map(s => (
          <div className="do" key={s.step}>
            <span className="t">{s.step}</span>
            <h3>{s.name}</h3>
            <p>{s.tools.join(' · ')}</p>
          </div>
        ))}
      </div>
      <p className="note" style={{ marginTop: 14 }}>
        Security is a gate rather than a review step, and delivery is pull-based — the cluster
        converges on git instead of a pipeline pushing into it.
      </p>
    </>
  )
}

function Contact() {
  const rows = [
    { k: 'email', v: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { k: 'github', v: 'github.com/Jeevankatta', href: PROFILE.github },
    { k: 'linkedin', v: 'Jeevan Katta', href: PROFILE.linkedin },
    { k: 'resume', v: 'Download PDF', href: PROFILE.resume },
  ]
  return (
    <>
      <p className="lede">
        Open to DevOps and Cloud roles — {PROFILE.location}, onsite or remote. Happy to talk about
        Kubernetes platforms, pipeline hygiene, or what actually breaks at 3am.
      </p>
      <div className="ctc">
        {rows.map(r => (
          <a key={r.k} href={r.href} target={r.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
            <span className="k">{r.k}</span>
            <span className="v">{r.v}</span>
          </a>
        ))}
      </div>
      <p className="note">
        This site is React and Vite, deployed by GitHub Actions on every push to main.
        No analytics, no tracking scripts.
      </p>
    </>
  )
}

export default function App() {
  const [active, setActive] = useState('about')
  const [gl] = useState(webglAvailable)
  const section = SECTIONS.find(s => s.id === active)

  const go = id => {
    setActive(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* ambient wash + dot grid, painted entirely in CSS */}
      <div className="deco" aria-hidden="true" />

      <div className="shell">
        <Profile path={section.nav.toLowerCase()} />

        <div className="cols">
          <Sidebar sections={SECTIONS} active={active} onSelect={go} />

          <main className="card main" key={active}>
            <p className="idx">
              <b>{String(SECTIONS.indexOf(section) + 1).padStart(2, '0')}</b>
              {' / '}{SECTIONS.length.toString().padStart(2, '0')} — {section.nav}
            </p>
            <h2 className="h1">{section.title}</h2>
            <div className="rule" />
            <p className="meta">{section.meta}</p>

            {active === 'about'    && <About />}
            {active === 'projects' && <Entries items={rowItems('row-projects')} />}
            {active === 'work'     && <Entries items={rowItems('row-work')} />}
            {active === 'stack'    && <Toolchain />}
            {active === 'infra'    && <Infra onSelect={go} gl={gl} />}
            {active === 'history'  && <Entries items={rowItems('row-background')} />}
            {active === 'contact'  && <Contact />}
          </main>
        </div>
      </div>
    </>
  )
}
