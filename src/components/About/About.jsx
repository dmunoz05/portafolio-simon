import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { n: '6+',   l: 'Años de experiencia'   },
  { n: '300+', l: 'Sesiones realizadas'    },
  { n: '12',   l: 'Marcas colaboradoras'   },
  { n: '2',    l: 'Premios obtenidos'      },
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
          <span className="s-label">Sobre mí</span>
          <h2 className="s-title">La mirada<br />detrás del lente</h2>
          <div className="divider" />
          <p>Soy Simón Pérez, fotógrafo y diseñador audiovisual con más de seis años capturando momentos que trascienden. Formado en diseño audiovisual, combino el rigor técnico con una sensibilidad artística que convierte cada sesión en una experiencia única.</p>
          <p>Mi trabajo nace de la atención: escuchar al cliente, leer la luz y encontrar el instante exacto en que una imagen dice todo lo que las palabras no pueden. Cada fotografía es una historia contada con honestidad.</p>
          <p>Especializado en retratos, bodas, fotografía de marca y contenido editorial, colaboro con personas y empresas que entienden que una buena imagen es la diferencia entre ser visto y ser recordado.</p>
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
