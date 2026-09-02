import { useEffect, useRef } from 'react'

/**
 * The cluster, rendered inside the Infrastructure card.
 *
 * A control plane at the centre and one worker node per section orbiting it,
 * with pods riding on the workers and traffic running down the links. Clicking
 * a node navigates to that section, so the diagram doubles as navigation.
 *
 * Three.js is loaded dynamically, so nothing else on the page waits for it.
 * Interaction lives in real HTML buttons positioned over the canvas rather than
 * in raycasting: the nodes stay keyboard reachable and screen-reader legible.
 */

const RADIUS = 3.2

export default function Scene({ items, center, onSelect }) {
  const mount = useRef(null)
  const labels = useRef([])
  const live = useRef({ hovered: null })

  useEffect(() => {
    let disposed = false
    let stop = () => {}

    ;(async () => {
      const THREE = await import('three')
      if (disposed || !mount.current) return

      const el = mount.current
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const ACCENT = 0x0f766e
      const NODE = 0xdde7e6
      const EDGE = 0x8fada9
      const GRID = 0xd3dcda

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 140)
      camera.position.set(0, 8.6, 11.2)
      camera.lookAt(0, -0.55, 0)

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      el.appendChild(renderer.domElement)

      const root = new THREE.Group()
      scene.add(root)
      const ring = new THREE.Group()
      root.add(ring)

      // lights — a light scene needs ambient dominance, not a hot key
      scene.add(new THREE.AmbientLight(0xffffff, 1.35))
      const key = new THREE.DirectionalLight(0xffffff, 1.5)
      key.position.set(5, 9, 6)
      scene.add(key)
      const fill = new THREE.DirectionalLight(0xc9e6e2, 0.6)
      fill.position.set(-6, 3, -4)
      scene.add(fill)

      const grid = new THREE.GridHelper(30, 30, GRID, GRID)
      grid.position.y = -1.5
      grid.material.transparent = true
      grid.material.opacity = 0.75
      root.add(grid)

      // control plane
      const cpGeo = new THREE.IcosahedronGeometry(0.74, 0)
      const cp = new THREE.Mesh(cpGeo, new THREE.MeshStandardMaterial({
        color: ACCENT, metalness: 0.15, roughness: 0.32, flatShading: true,
      }))
      root.add(cp)
      cp.add(new THREE.LineSegments(
        new THREE.EdgesGeometry(cpGeo),
        new THREE.LineBasicMaterial({ color: 0x083f3a, transparent: true, opacity: 0.5 })
      ))

      const halo = new THREE.Mesh(
        new THREE.RingGeometry(1.16, 1.2, 64),
        new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.3, side: THREE.DoubleSide })
      )
      halo.rotation.x = -Math.PI / 2
      root.add(halo)

      const nodes = []
      const packets = []
      const nodeGeo = new THREE.BoxGeometry(0.98, 0.44, 0.98)
      const podGeo = new THREE.BoxGeometry(0.17, 0.17, 0.17)

      items.forEach((item, i) => {
        const a = (i / items.length) * Math.PI * 2
        const pos = new THREE.Vector3(Math.sin(a) * RADIUS, 0, Math.cos(a) * RADIUS)

        const g = new THREE.Group()
        g.position.copy(pos)
        ring.add(g)

        const box = new THREE.Mesh(nodeGeo, new THREE.MeshStandardMaterial({
          color: NODE, metalness: 0.1, roughness: 0.55,
        }))
        g.add(box)
        box.add(new THREE.LineSegments(
          new THREE.EdgesGeometry(nodeGeo),
          new THREE.LineBasicMaterial({ color: EDGE, transparent: true, opacity: 0.9 })
        ))

        const pods = []
        for (let p = 0; p < 3; p++) {
          const pod = new THREE.Mesh(podGeo, new THREE.MeshStandardMaterial({
            color: ACCENT, metalness: 0.1, roughness: 0.4,
          }))
          pod.position.set((p - 1) * 0.32, 0.42, 0)
          g.add(pod)
          pods.push(pod)
        }

        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(pos.x * 0.5, 1.25, pos.z * 0.5),
          pos.clone()
        )
        const tube = new THREE.Mesh(
          new THREE.TubeGeometry(curve, 40, 0.017, 6, false),
          new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.32 })
        )
        ring.add(tube)

        const packet = new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 10, 10),
          new THREE.MeshBasicMaterial({ color: ACCENT })
        )
        ring.add(packet)
        packets.push({ mesh: packet, curve, t: i / items.length })

        nodes.push({ id: item.id, group: g, box, pods, tube, angle: a })
      })

      const resize = () => {
        const w = el.clientWidth || 1
        const h = el.clientHeight || 1
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        // The card is wide and short, so height is what constrains the ring.
        root.scale.setScalar(Math.min(1, w / 980, h / 540))
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(el)

      const v = new THREE.Vector3()
      let rot = 0
      let raf = 0
      const t0 = performance.now()
      let last = t0

      const tick = () => {
        raf = requestAnimationFrame(tick)
        const now = performance.now()
        const dt = Math.min((now - last) / 1000, 0.05)
        last = now
        const t = (now - t0) / 1000
        const hov = live.current.hovered

        if (!reduced) rot += dt * 0.13
        ring.rotation.y = rot

        if (!reduced) {
          cp.rotation.y += dt * 0.3
          cp.rotation.x = Math.sin(t * 0.4) * 0.11
          halo.scale.setScalar(1 + Math.sin(t * 1.1) * 0.02)
        }

        nodes.forEach((n, i) => {
          const on = n.id === hov
          n.group.position.y += ((on ? 0.4 : 0) - n.group.position.y) * Math.min(1, dt * 6)
          const s = on ? 1.12 : 1
          n.box.scale.x += (s - n.box.scale.x) * Math.min(1, dt * 6)
          n.box.scale.y = n.box.scale.z = n.box.scale.x
          n.tube.material.opacity += ((on ? 0.8 : 0.32) - n.tube.material.opacity) * Math.min(1, dt * 6)
          if (!reduced) {
            n.pods.forEach((p, k) => { p.position.y = 0.42 + Math.sin(t * 1.6 + i + k * 0.8) * 0.05 })
          }
        })

        packets.forEach(p => {
          if (!reduced) p.t = (p.t + dt * 0.3) % 1
          p.curve.getPoint(p.t, v)
          p.mesh.position.copy(v)
        })

        const project = (obj, lbl, lift) => {
          if (!lbl) return
          obj.getWorldPosition(v)
          v.y += lift
          v.project(camera)
          const x = (v.x * 0.5 + 0.5) * el.clientWidth
          const y = (-v.y * 0.5 + 0.5) * el.clientHeight
          const visible = v.z < 1
          lbl.style.transform = `translate(-50%,-50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
          lbl.style.opacity = visible ? '1' : '0'
          lbl.style.pointerEvents = visible ? 'auto' : 'none'
          lbl.style.zIndex = String(1000 - Math.round(v.z * 500))
        }

        nodes.forEach((n, i) => project(n.group, labels.current[i], 0.9))
        project(cp, labels.current[nodes.length], 1.55)

        renderer.render(scene, camera)
      }
      tick()

      stop = () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        renderer.dispose()
        scene.traverse(o => {
          if (o.geometry) o.geometry.dispose()
          if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => m.dispose())
        })
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    })()

    return () => { disposed = true; stop() }
  }, [items])

  const label = (item, i) => (
    <button
      key={item.id}
      ref={n => { labels.current[i] = n }}
      className={`node-label${item.id === (center && center.id) ? ' center' : ''}`}
      onClick={() => onSelect(item.id)}
      onMouseEnter={() => { live.current.hovered = item.id }}
      onMouseLeave={() => { live.current.hovered = null }}
      onFocus={() => { live.current.hovered = item.id }}
      onBlur={() => { live.current.hovered = null }}
    >
      <span className="nl-k">{item.k}</span>
      <span className="nl-t">{item.label}</span>
      <span className="nl-s">{item.sub}</span>
    </button>
  )

  return (
    <div className="cluster" ref={mount}>
      {items.map(label)}
      {center && label(center, items.length)}
    </div>
  )
}
