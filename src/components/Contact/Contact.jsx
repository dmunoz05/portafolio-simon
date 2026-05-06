import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveal = (sel, delay = 0) =>
        gsap.to(sel, {
          y: 0, opacity: 1, duration: .9, delay, ease: 'power3.out',
          scrollTrigger: { trigger: sel, start: 'top 86%', toggleActions: 'play none none none' },
        })

      reveal('.s-label')
      reveal('.s-title', .1)
      reveal('.contact-sub', .2)
      reveal('.contact-link', .35)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef}>
      <div className="contact-inner">
        <span className="s-label" style={{ textAlign: 'center', display: 'block' }}>
          Hablemos
        </span>
        <h2 className="s-title" style={{ textAlign: 'center' }}>
          Creemos algo<br />memorable juntos
        </h2>
        <p className="contact-sub">
          ¿Tienes una sesión, proyecto o idea en mente? Cuéntame tu historia y hagamos que las imágenes hablen por ti.
        </p>
        <a href="mailto:simon@simonperezfoto.com" className="contact-link">
          simon@simonperezfoto.com
        </a>
      </div>
    </section>
  )
}
