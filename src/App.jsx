import { useEffect, useRef, useState } from 'react'
import { PROFILE, ROWS, HIGHLIGHTS, PIPELINE, DOING } from './data.js'

const items = id => ROWS.find(r => r.id === id)?.items ?? []
const split = s => (s || '').split(',').map(x => x.trim()).filter(Boolean)
const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/* ---------- small icons ---------- */
const I = {
  gh: <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />,
  in: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z" />,
  dl: <path d="M12 3v12m0 0-5-5m5 5 5-5M4 20h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  mail: <path d="M3 6h18v12H3zM3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  ext: <path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
}
const Icon = ({ n, s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{I[n]}</svg>

/* ---------- reveal on scroll ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { rootMargin: '0px 0px -8% 0px' })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [])
}

/* ---------- nav ---------- */
const LINKS = [['work', 'Work'], ['projects', 'Projects'], ['stack', 'Stack'], ['terminal', 'Terminal'], ['contact', 'Contact']]
function Nav() {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 30)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <header className={`nav ${solid ? 'solid' : ''}`}>
      <div className="wrap nav-in">
        <a className="mark" href="#top" aria-label="Jeevan Katta, back to top"><span>jk</span><i>~$</i></a>
        <nav aria-label="Sections"><ul>{LINKS.map(([id, l]) => <li key={id}><a href={`#${id}`}>{l}</a></li>)}</ul></nav>
        <a className="btn sm line" href={PROFILE.resume} download><Icon n="dl" s={16} /> CV</a>
      </div>
    </header>
  )
}

/* ---------- hero: live pipeline console ---------- */
const LOGS = [
  ['commit', 'gitleaks', 'no secrets found in 14 files'],
  ['build', 'docker', 'image built · 182 MB → 64 MB multi-stage'],
  ['scan', 'trivy', '0 critical · 0 high vulnerabilities'],
  ['scan', 'sonarcloud', 'quality gate passed'],
  ['deliver', 'argocd', 'app synced · revision a41f9c2'],
  ['deliver', 'rollouts', 'canary 20% → 50% → 100%'],
  ['observe', 'alertmanager', 'all quiet · 0 firing alerts'],
]
function Console() {
  const [step, setStep] = useState(reduce ? PIPELINE.length : 3)
  const [run, setRun] = useState(482)
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setStep(s => {
      if (s >= PIPELINE.length + 3) { setRun(r => r + 1); return 0 }
      return s + 1
    }), 1100)
    return () => clearInterval(t)
  }, [])
  const done = Math.min(step, PIPELINE.length)
  const stageKey = i => PIPELINE[i].name.toLowerCase()
  const shown = LOGS.filter(l => PIPELINE.findIndex(p => p.name.toLowerCase() === l[0]) < done)
  const allDone = done === PIPELINE.length
  return (
    <div className="console" role="img" aria-label="Illustration: a deployment pipeline running commit, build, scan, deliver and observe stages, all passing">
      <div className="c-top">
        <span className="dots"><i /><i /><i /></span>
        <span className="c-title">pipeline · k8s-gitops-platform</span>
        <span className={`c-state ${allDone ? 'ok' : ''}`}>{allDone ? '● passed' : '◌ running'} #{run}</span>
      </div>
      <ol className="stages">
        {PIPELINE.map((p, i) => {
          const st = i < done ? 'ok' : i === done ? 'run' : 'wait'
          return (
            <li key={p.step} className={st}>
              <span className="dot">{st === 'ok' ? '✓' : ''}</span>
              <b>{p.name}</b>
              <small>{p.tools[0]}</small>
            </li>
          )
        })}
      </ol>
      <div className="logs" aria-hidden="true">
        {shown.map(l => <p key={l[1] + l[2]}><span className="t">{l[1]}</span> {l[2]}</p>)}
        {!allDone && <p className="cur">› running {done < PIPELINE.length ? stageKey(done) : ''}<i className="caret" /></p>}
      </div>
      <div className="c-foot">
        <div><small>deploys</small><b>pull-based</b></div>
        <div><small>security</small><b>4 gates</b></div>
        <div><small>rollout</small><b>canary</b></div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="wrap hero-in">
        <div className="hero-copy">
          <p className="pill"><i /> {HERO_BADGE}</p>
          <h1>I build pipelines that ship <span className="hl">safely</span> and keep production <span className="hl2">calm.</span></h1>
          <p className="lead">I’m <b>{PROFILE.name}</b>, a {PROFILE.role.replace('&', 'and')} in {PROFILE.location.split(',')[0]}. {PROFILE.years.replace('2.6', 'Two and a half')} running banking workloads on AWS: CI/CD, containers, Terraform and the on-call that comes with it.</p>
          <div className="acts">
            <a className="btn glow" href="#projects">See my work <Icon n="arrow" s={18} /></a>
            <a className="btn line" href={PROFILE.resume} download><Icon n="dl" s={18} /> Download CV</a>
          </div>
          <div className="socials">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon n="gh" s={20} /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon n="in" s={20} /></a>
            <a href={`mailto:${PROFILE.email}`} aria-label="Email"><Icon n="mail" s={20} /></a>
            <span className="tags">{PROFILE.tags.map(t => <em key={t}>{t}</em>)}</span>
          </div>
        </div>
        <Console />
      </div>
    </section>
  )
}
const HERO_BADGE = 'Open to DevOps and Cloud roles · India or remote'

/* ---------- stats ---------- */
function Stats() {
  return (
    <section className="stats-band" aria-label="Highlights">
      <div className="wrap stats">
        {HIGHLIGHTS.map((h, i) => (
          <div className="stat rv" style={{ '--d': `${i * 80}ms` }} key={h.l}><b>{h.n}</b><span>{h.l}</span></div>
        ))}
      </div>
    </section>
  )
}

/* ---------- section head ---------- */
const Head = ({ k, title, sub }) => (
  <div className="head rv">
    <span className="kicker">{k}</span>
    <h2>{title}</h2>
    {sub && <p>{sub}</p>}
  </div>
)

/* ---------- what I do ---------- */
function Doing() {
  const icons = { security: '🛡', cloud: '☁', reliability: '⏱', automation: '⚙' }
  return (
    <section className="sec" id="about">
      <div className="wrap">
        <Head k="What I do" title="Four things I’m good at" sub="Work I have done in production, not a list of keywords." />
        <div className="doing">
          {DOING.map((d, i) => (
            <article className="do rv" style={{ '--d': `${i * 70}ms` }} key={d.title}>
              <span className="ico" aria-hidden="true">{icons[d.tag]}</span>
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- production work ---------- */
function Work() {
  const w = items('row-work')
  return (
    <section className="sec alt" id="work">
      <div className="wrap">
        <Head k="Production work" title="Shipped and running for a US bank" sub="Cognizant · Dec 2023 – Jun 2026 · systems I built and ran in production." />
        <div className="work">
          {w.map((it, i) => (
            <article className={`job rv ${i === 0 ? 'big' : ''}`} style={{ '--d': `${(i % 3) * 70}ms` }} key={it.title}>
              <div className="job-top"><span className="yr">{it.year}</span><span className="live">● {it.badge}</span></div>
              <h3>{it.title}</h3>
              <p className="sub">{it.sub}</p>
              <p>{it.desc}</p>
              {it.points && <ul>{it.points.map(p => <li key={p}>{p}</li>)}</ul>}
              {i === 0 && (
                <div className="route" aria-hidden="true">
                  <span className="r-alert">alert fired<small>p2 · payments-api</small></span><i />
                  <span>SOP generated<small>steps + runbook</small></span><i />
                  <span className="r-ok">routed to owner<small>no shared queue</small></span>
                </div>
              )}
              <div className="chips">{split(it.stack).map(s => <span key={s}>{s}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- projects with visuals ---------- */
function ClusterArt() {
  return (
    <svg viewBox="0 0 420 260" className="art" aria-hidden="true">
      <defs>
        <linearGradient id="cp" x1="0" x2="1"><stop offset="0" stopColor="#2ee6a6" /><stop offset="1" stopColor="#4cc9f0" /></linearGradient>
      </defs>
      <g stroke="#2ee6a6" strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="4 5" fill="none" className="flow">
        <path d="M210 70 L80 160" /><path d="M210 70 L210 160" /><path d="M210 70 L340 160" />
      </g>
      <rect x="140" y="28" width="140" height="48" rx="12" fill="url(#cp)" />
      <text x="210" y="57" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="13" fontWeight="600" fill="#05110c">control plane</text>
      {[80, 210, 340].map((x, n) => (
        <g key={x}>
          <rect x={x - 58} y="150" width="116" height="82" rx="12" fill="#0f1a24" stroke="#ffffff22" />
          <text x={x - 46} y="170" fontFamily="JetBrains Mono" fontSize="10" fill="#93a3b3">node-0{n + 1}</text>
          {[0, 1, 2].map(k => <circle key={k} cx={x - 34 + k * 28} cy="200" r="9" fill={k === 2 && n === 1 ? '#ff9f1c' : '#2ee6a6'} opacity={k === 2 && n === 2 ? .35 : 1} className="pod" style={{ animationDelay: `${(n * 3 + k) * .25}s` }} />)}
        </g>
      ))}
      <g fontFamily="JetBrains Mono" fontSize="10" fill="#93a3b3">
        <rect x="300" y="20" width="96" height="24" rx="12" fill="#ffffff0d" stroke="#ffffff1a" /><text x="348" y="36" textAnchor="middle">argocd ✓ synced</text>
      </g>
    </svg>
  )
}
function GatesArt() {
  const gates = [['gitleaks', 'secrets'], ['SonarCloud', 'quality'], ['OWASP DC', 'dependencies'], ['Trivy', 'image']]
  return (
    <div className="gates" aria-hidden="true">
      {gates.map(([t, w], i) => (
        <div className="gate" key={t} style={{ animationDelay: `${i * .35}s` }}>
          <span className="g-ok">✓</span><b>{t}</b><small>{w}</small><em>pass</em>
        </div>
      ))}
      <div className="gate ship"><span className="g-ok">→</span><b>push to registry</b><em>allowed</em></div>
    </div>
  )
}
function SiteArt() {
  return (
    <div className="mini" aria-hidden="true">
      <div className="mini-bar"><i /><i /><i /><span>jeevankatta.github.io</span></div>
      <div className="mini-body">
        <span className="l1" /><span className="l2" /><span className="l3" />
        <div className="mini-ci"><b>GitHub Actions</b> build ✓ · deploy ✓ · 38 s</div>
      </div>
    </div>
  )
}
function Projects() {
  const p = items('row-projects')
  const art = [<ClusterArt key="a" />, <GatesArt key="b" />, <SiteArt key="c" />]
  return (
    <section className="sec" id="projects">
      <div className="wrap">
        <Head k="Projects" title="Built from scratch, open on GitHub" sub="Read the code, the Terraform and the pipeline files." />
        <div className="projects">
          {p.map((it, i) => (
            <article className={`proj rv ${i === 2 ? 'small' : ''}`} key={it.title}>
              <div className="proj-art">{art[i]}</div>
              <div className="proj-copy">
                <div className="job-top"><span className="yr">{it.year} · {it.role}</span></div>
                <h3>{it.title}</h3>
                <p className="sub">{it.sub}</p>
                <p>{it.desc}</p>
                {it.progress && (
                  <div className="prog"><span>Build progress</span><div className="bar"><i style={{ width: `${it.progress}%` }} /></div><b>{it.progress}%</b></div>
                )}
                <ul>{it.points.slice(0, i === 2 ? 3 : 5).map(x => <li key={x}>{x}</li>)}</ul>
                <div className="chips">{split(it.stack).slice(0, 8).map(s => <span key={s}>{s}</span>)}</div>
                <a className="more" href={it.link} target="_blank" rel="noopener noreferrer">View on GitHub <Icon n="ext" s={16} /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- stack bento ---------- */
function Stack() {
  const s = items('row-stack')
  return (
    <section className="sec alt" id="stack">
      <div className="wrap">
        <Head k="Toolchain" title="What I use every day" />
        <div className="bento">
          {s.map((t, i) => (
            <article className={`tile rv t${i}`} style={{ '--d': `${(i % 3) * 70}ms` }} key={t.title}>
              <div className="tile-top"><h3>{t.title}</h3><span className={t.badge === 'Daily driver' ? 'lvl hot' : 'lvl'}>{t.badge}</span></div>
              <p>{t.desc}</p>
              <div className="chips">{split(t.stack).map(x => <span key={x}>{x}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- interactive terminal ---------- */
function Terminal() {
  const bg = items('row-background')
  const cmds = {
    help: () => ['Commands: whoami · experience · projects · skills · certs · contact · cv · clear', 'Tip: try  sudo hire jeevan'],
    whoami: () => [`${PROFILE.name} · ${PROFILE.role} · ${PROFILE.location}`, `${PROFILE.years} in production DevOps for a US banking client.`],
    experience: () => [`Cognizant · ${bg[0].sub} · ${bg[0].role}`, ...bg[0].points.map(p => '  • ' + p)],
    projects: () => items('row-projects').map(p => `  ${p.title.padEnd(28)} ${p.link.replace('https://', '')}`),
    skills: () => items('row-stack').map(t => `  ${t.title.padEnd(16)} ${split(t.stack).slice(0, 5).join(', ')}`),
    certs: () => ['  ✓ AWS Certified Cloud Practitioner', '  ◌ Certified Kubernetes Administrator (in progress)', `  ✓ ${bg[3].title}, ${bg[3].sub}`],
    contact: () => [`  email     ${PROFILE.email}`, `  github    ${PROFILE.github.replace('https://', '')}`, '  linkedin  linkedin.com/in/jeevan-katta'],
    cv: () => { const a = document.createElement('a'); a.href = PROFILE.resume; a.download = ''; a.click(); return ['Downloading Katta_Jeevan_Resume.pdf …'] },
    'sudo hire jeevan': () => ['[sudo] permission granted ✓', `Great choice. Write to ${PROFILE.email}; I reply within a day.`],
  }
  const [lines, setLines] = useState([{ c: 'whoami', out: cmds.whoami() }, { c: 'help', out: cmds.help() }])
  const [val, setVal] = useState('')
  const box = useRef(null)
  const inp = useRef(null)
  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight }, [lines])
  const runCmd = raw => {
    const c = raw.trim().toLowerCase()
    if (!c) return
    if (c === 'clear') { setLines([]); return }
    const f = cmds[c]
    setLines(l => [...l, { c, out: f ? f() : [`command not found: ${c}. Type help.`] }])
  }
  const quick = ['help', 'experience', 'projects', 'skills', 'certs', 'contact', 'sudo hire jeevan']
  return (
    <section className="sec" id="terminal">
      <div className="wrap term-grid">
        <Head k="Try it" title="Ask my terminal" sub="Short on time? Type a command or tap one below. Everything a recruiter needs is one word away." />
        <div className="term rv" onClick={() => inp.current?.focus()}>
          <div className="c-top"><span className="dots"><i /><i /><i /></span><span className="c-title">jeevan@portfolio: ~</span></div>
          <div className="term-body" ref={box} aria-live="polite">
            {lines.map((l, i) => (
              <div key={i}>
                <p className="cmd"><span className="ps">jeevan@portfolio:~$</span> {l.c}</p>
                {l.out.map((o, k) => <p key={k} className="out">{o}</p>)}
              </div>
            ))}
            <form onSubmit={e => { e.preventDefault(); runCmd(val); setVal('') }} className="cmd">
              <label htmlFor="term-in" className="ps">jeevan@portfolio:~$</label>
              <input id="term-in" ref={inp} value={val} onChange={e => setVal(e.target.value)} autoComplete="off" spellCheck="false" placeholder="type help" />
            </form>
          </div>
          <div className="quick">{quick.map(q => <button type="button" key={q} onClick={e => { e.stopPropagation(); runCmd(q) }}>{q}</button>)}</div>
        </div>
      </div>
    </section>
  )
}

/* ---------- background timeline ---------- */
function Journey() {
  const bg = items('row-background')
  return (
    <section className="sec alt" id="journey">
      <div className="wrap">
        <Head k="Background" title="Experience, certifications and education" />
        <ol className="tl">
          {bg.map((b, i) => (
            <li className="rv" style={{ '--d': `${i * 70}ms` }} key={b.title}>
              <span className="when">{b.year}</span>
              <div className="tl-card">
                <div className="job-top"><h3>{b.title}</h3><span className="live">{b.badge}</span></div>
                <p className="sub">{b.role}</p>
                <p>{b.desc}</p>
                {b.progress && <div className="prog"><span>Syllabus covered</span><div className="bar"><i style={{ width: `${b.progress}%` }} /></div><b>{b.progress}%</b></div>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- contact ---------- */
function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { window.location.href = `mailto:${PROFILE.email}` }
  }
  return (
    <section className="contact" id="contact">
      <div className="aurora low" aria-hidden="true"><i /><i /></div>
      <div className="wrap contact-in rv">
        <span className="kicker">Contact</span>
        <h2>Need someone who keeps <span className="hl">production calm?</span></h2>
        <p>Open to DevOps and Cloud roles in {PROFILE.location}, onsite or remote. I reply within a day.</p>
        <div className="mailrow">
          <a className="email" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <button className="btn line" type="button" onClick={copy}>{copied ? 'Copied ✓' : 'Copy email'}</button>
        </div>
        <div className="acts center">
          <a className="btn glow" href={PROFILE.resume} download><Icon n="dl" s={18} /> Download CV</a>
          <a className="btn line" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer"><Icon n="in" s={18} /> LinkedIn</a>
          <a className="btn line" href={PROFILE.github} target="_blank" rel="noopener noreferrer"><Icon n="gh" s={18} /> GitHub</a>
        </div>
      </div>
      <footer className="wrap foot">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <span>React and Vite, deployed by GitHub Actions on every push. No tracking.</span>
      </footer>
    </section>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <a className="skip" href="#work">Skip to content</a>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Doing />
        <Work />
        <Projects />
        <Stack />
        <Terminal />
        <Journey />
        <Contact />
      </main>
    </>
  )
}
