import { useEffect, useRef, useState } from 'react'

/**
 * The entire motion budget for this site: a short fade-and-rise, once,
 * as a block scrolls into view.
 *
 * Deliberately an IntersectionObserver and a CSS transition rather than
 * an animation library — this is ~40kB gzipped cheaper than Framer Motion
 * for an effect that is two properties. Anyone who has asked their OS for
 * less motion gets none at all.
 */
export default function Reveal({ children, delay = 0, className = '', ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -60px 0px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal${shown ? ' in' : ''}${className ? ' ' + className : ''}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      {...rest}
    >
      {children}
    </div>
  )
}
