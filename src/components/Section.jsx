import Reveal from './Reveal.jsx'

export default function Section({ id, kicker, title, blurb, wide, children }) {
  return (
    <section id={id}>
      <div className={wide ? 'wrap-wide' : 'wrap'}>
        <Reveal className="sec-head">
          {kicker && <p className="kicker">{kicker}</p>}
          <h2>{title}</h2>
          {blurb && <p>{blurb}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
