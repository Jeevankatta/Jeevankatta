import { PROFILE } from '../data.js'

const SOCIALS = [
  { href: PROFILE.github, label: 'GitHub', d: 'M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z' },
  { href: PROFILE.linkedin, label: 'LinkedIn', d: 'M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 002.48 2.5A2.5 2.5 0 007.5 6a2.5 2.5 0 00-2.52-2.5zM3 9h4v12H3zM10 9h3.8v1.7h.05a4.2 4.2 0 013.75-2c4 0 4.4 2.5 4.4 5.9V21h-4v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21h-4z' },
]

/**
 * Header card. The identity strip is deliberately shaped like `kubectl get`
 * output rather than a generic status block — it says the same things a
 * recruiter needs (available, role, region, experience) in the idiom of the
 * job itself.
 */
export default function Profile({ path }) {
  const [first, ...rest] = PROFILE.name.split(' ')

  return (
    <header className="card">
      <div className="chrome">
        <span className="path">jeevankatta.com / <b>{path}</b></span>
        <span className="pill"><i className="dotlive" /> open to offers</span>
      </div>

      <div className="profile">
        <div className="mono-mark" aria-hidden="true">jk</div>

        <div className="who">
          <h1>{first} <b>{rest.join(' ')}</b></h1>
          <p className="r">{PROFILE.role}</p>
          <p className="op">{PROFILE.location} · onsite or remote · replies within 24h</p>
        </div>

        <div className="pact">
          <a className="btn" href={PROFILE.resume} download>Download CV</a>
          <a className="pmail" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <div className="socials">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="ktable">
        <table>
          <thead>
            <tr><th>name</th><th>status</th><th>roles</th><th>region</th><th>experience</th><th>certs</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>jeevan-katta</td>
              <td className="ok">Ready</td>
              <td>devops,cloud,platform</td>
              <td>ap-south-1</td>
              <td>{PROFILE.years}</td>
              <td>aws-ccp, cka(wip)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </header>
  )
}
