import Icon from './Icon.jsx'
import { PROFILE } from '../data.js'

export default function Sidebar({ sections, active, onSelect }) {
  return (
    <div className="card side">
      <div className="ctx">
        <div><span className="kk">context:</span> <span className="vv">jeevan@portfolio</span></div>
        <div><span className="kk">namespace:</span> <span className="vv">{active}</span></div>
      </div>

      <nav aria-label="Sections">
        {sections.map(s => (
          <button
            key={s.id}
            className={`navbtn${active === s.id ? ' on' : ''}`}
            aria-current={active === s.id ? 'page' : undefined}
            onClick={() => onSelect(s.id)}
          >
            <Icon name={s.icon} />
            {s.nav}
            <span className="bul" />
          </button>
        ))}
      </nav>

      <div className="foot">
        <p>{PROFILE.years} in production</p>
        <p>open to offers</p>
      </div>
    </div>
  )
}
