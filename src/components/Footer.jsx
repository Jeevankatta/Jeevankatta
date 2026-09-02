import { PROFILE } from '../data.js'

export default function Footer() {
  return (
    <footer id="contact">
      <div className="wrap">
        <div className="flinks">
          <a className="btn btn-primary" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <a className="btn" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="btn" href={PROFILE.resume} download>Resume PDF</a>
        </div>
        <p>
          Based in {PROFILE.location} — open to DevOps and Cloud roles, onsite or remote.
          Happy to talk about Kubernetes platforms, pipeline hygiene, or what actually
          breaks at 3am.
        </p>
        <span className="colo">
          React + Vite · built and deployed by GitHub Actions on every push to main · no analytics, no tracking
        </span>
      </div>
    </footer>
  )
}
