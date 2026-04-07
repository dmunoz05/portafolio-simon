import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { n: '8+',  l: 'Years of Experience'  },
  { n: '120', l: 'Projects Completed'   },
  { n: '14',  l: 'Film Festivals'       },
  { n: '3',   l: 'Awards Won'           },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveal = (sel, opts = {}) =>
        document.querySelectorAll(sel).forEach((el, i) =>
          gsap.to(el, {
            y: 0, opacity: 1,
            duration: opts.dur || .9,
            delay: opts.stagger ? i * opts.stagger : 0,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
          })
        )

      reveal('.s-label')
      reveal('.s-title', { dur: 1.1 })
      reveal('.about-text p', { stagger: .15 })
      reveal('.stat', { stagger: .1 })

      sectionRef.current.querySelectorAll('.divider').forEach((el) =>
        gsap.to(el, {
          scaleX: 1, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
        })
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef}>
      <div className="about-inner">
        <div className="about-text">
          <span className="s-label">About</span>
          <h2 className="s-title">The Eye<br />Behind the Lens</h2>
          <div className="divider" />
          <p>Con una mirada formada entre el cine europeo de autor y la vitalidad visual latinoamericana, Simon ha desarrollado un lenguaje cinematográfico propio: íntimo, deliberado y emocionalmente preciso.</p>
          <p>Cada proyecto es un ejercicio de atención. La luz no se coloca, se descubre. La historia no se filma, se escucha y luego se traduce en imágenes que perduran.</p>
          <p>Especializado en bodas de alta gama, documentales y contenido de marca, Simon colabora con directores, marcas de lujo y artistas que entienden que la forma es parte del fondo.</p>
        </div>

        <div className="about-stats">
          {stats.map((s) => (
            <div className="stat" key={s.l}>
              <div className="stat-n">{s.n}</div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
