import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard'
import { projects } from './projects'
import './Gastronomy.css'

gsap.registerPlugin(ScrollTrigger)

export default function Gastronomy({ onOpen }) {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current

      /* Horizontal scroll */
      const horizontalTween = gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
          id: 'galMove',
        },
      })

      /* Card entrance animations */
      container.querySelectorAll('.pcard').forEach((card) => {
        gsap.from(card, {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: 'left 95%',
            toggleActions: 'play none none none',
          },
        })

        /* Parallax inner image */
        gsap.to(card.querySelector('img'), {
          x: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            scrub: true,
          },
        })
      })

      /* Section header reveal */
      gsap.to('.gal-header .s-label', {
        y: 0, opacity: 1, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.to('.gal-header .s-title', {
        y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: .1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="gallery" ref={sectionRef}>
      <div className="gal-sticky">
        <div className="gal-header">
          <span className="s-label">Trabajos seleccionados</span>
          <h2 className="s-title">Gastronomía</h2>
        </div>

        <div className="gal-container" ref={containerRef}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
