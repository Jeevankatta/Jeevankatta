import { useEffect, useState } from 'react'
import { PROFILE } from '../data.js'

const LINKS = [
  ['#pipeline', 'Pipeline'],
  ['#projects', 'Projects'],
  ['#work', 'Work'],
  ['#stack', 'Stack'],
  ['#background', 'Background'],
]

export default function Header() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={solid ? 'hdr solid' : 'hdr'}>
      <div className="wrap hdr-in">
        <a className="mark" href="#top">
          <b>jk</b> <span>{PROFILE.name}</span>
        </a>
        <nav>
          {LINKS.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className="btn cta" href={`mailto:${PROFILE.email}`}>Get in touch</a>
      </div>
    </header>
  )
}
