import { useRef } from 'react'
import { gsap } from 'gsap'

export default function ProjectCard({ project, index, onOpen }) {
  const cardRef = useRef(null)
  const shineRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    const r    = card.getBoundingClientRect()
    const dx   = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)
    const dy   = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2)

    gsap.to(card, {
      rotateX: -dy * 13, rotateY: dx * 13,
      scale: 1.03, z: 28,
      transformPerspective: 800,
      duration: .28, ease: 'power2.out',
    })

    const sx = ((e.clientX - r.left) / r.width)  * 100
    const sy = ((e.clientY - r.top)  / r.height) * 100
    shineRef.current.style.background =
      `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,.13) 0%, rgba(255,255,255,0) 55%)`
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0, scale: 1, z: 0,
      transformPerspective: 800,
      duration: .65, ease: 'power3.out',
    })
    shineRef.current.style.background = 'none'
  }

  return (
    <div
      className="pcard"
      ref={cardRef}
      data-index={index}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(index)}
    >
      <img src={project.img} alt={project.alt} loading="lazy" />
      <div className="pcard-overlay" />
      <div className="pcard-shine" ref={shineRef} />

      <div className="pcard-hover">
        <div className="pcard-hover-body">
          <span className="pcard-cat">{project.category}</span>
          <h3 className="pcard-name">{project.name}</h3>
          <p className="pcard-desc">{project.desc}</p>
        </div>
      </div>

      <div className="pcard-info">
        <span className="pcard-cat">{project.category}</span>
        <h3 className="pcard-name">{project.name}</h3>
        <p className="pcard-year">{project.year}</p>
      </div>
    </div>
  )
}
