import { Fragment } from 'react'
import { PIPELINE } from '../data.js'
import Reveal from './Reveal.jsx'

/**
 * The one piece of visual effort on the page, and it is on-domain:
 * the delivery path this work actually runs through. Built in flex so
 * it reflows to a vertical stack on a phone instead of scrolling
 * sideways. The travelling highlight is CSS, so reduced-motion kills it.
 */
export default function Pipeline() {
  return (
    <section id="pipeline">
      <div className="wrap-wide">
        <Reveal className="sec-head">
          <p className="kicker">How the work ships</p>
          <h2>Commit to production, with the gates in between</h2>
          <p>
            The path every change takes through the platform I build and run —
            each stage named with the tooling that actually sits there.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="pipe">
            {PIPELINE.map((s, i) => (
              <Fragment key={s.step}>
                {i > 0 && <div className="conn" style={{ '--d': `${i * 0.28}s` }} />}
                <div className="stage">
                  <div className="s-n">{s.step}</div>
                  <div className="s-t">{s.name}</div>
                  <ul>
                    {s.tools.map(t => <li key={t}>{t}</li>)}
                  </ul>
                </div>
              </Fragment>
            ))}
          </div>
          <p className="pipe-note">
            Security is a gate rather than a review step: a commit carrying a secret,
            a vulnerable dependency or a failing quality bar stops before it reaches
            a registry. Delivery is pull-based, so the cluster converges on git
            instead of a pipeline pushing into it.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
