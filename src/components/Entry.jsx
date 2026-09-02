import splitStack from '../splitStack.js'

/** One system, project or role, rendered inside a panel. */
export default function Entry({ item }) {
  const stack = splitStack(item.stack)

  return (
    <article className="entry">
      <div className="entry-top">
        <h3>
          {item.link
            ? <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
            : item.title}
        </h3>
        {item.badge && <span className="tag">{item.badge}</span>}
        {item.year && <span className="yr">{item.year}</span>}
      </div>

      {(item.role || item.sub) && <p className="who2">{item.role || item.sub}</p>}
      {item.desc && <p className="desc">{item.desc}</p>}

      {item.points?.length > 0 && (
        <ul className="pts">
          {item.points.map(p => <li key={p}>{p}</li>)}
        </ul>
      )}

      {stack.length > 0 && (
        <div className="chips">
          {stack.map(s => <span className="chip" key={s}>{s}</span>)}
        </div>
      )}
    </article>
  )
}
