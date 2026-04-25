import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import { projects } from "./projects";
import "./Gastronomy.css";

gsap.registerPlugin(ScrollTrigger);

export default function Gastronomy({ onOpen }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const section = sectionRef.current;

      // ─── Scroll horizontal principal ─────────────────────────────────────
      const horizontalTween = gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${container.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "galMove",
          // Callback para oscurecer / aclarar el canvas de fondo
          // según avancemos en el scroll horizontal
          onUpdate: (self) => {
            // A medida que avanza el scroll horizontal, hacemos que
            // el fondo del canvas se vaya a negro suavemente
            const bg = document.querySelector(".video-fixed-bg");
            if (bg) {
              // 0 = canvas completamente visible, 1 = negro total
              gsap.set(bg, { opacity: 1 - self.progress * 0.85 });
            }
          },
        },
      });

      // ─── Entrada de cards ─────────────────────────────────────────────────
      container.querySelectorAll(".pcard").forEach((card) => {
        gsap.from(card, {
          x: 120,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: "left 95%",
            toggleActions: "play none none none",
          },
        });

        // Parallax interior
        const img = card.querySelector("img");
        if (img) {
          gsap.to(img, {
            x: -60,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              scrub: true,
            },
          });
        }
      });

      // ─── Header: aparece al entrar, se auto-dismissea en 2.5s ───────────
      const header = section.querySelector(".gal-header");
      gsap.set(header, { y: -30, opacity: 0 });

      ScrollTrigger.create({
        trigger: section,
        start: "top top", // la sección llega arriba del viewport → activa header
        onEnter: () => {
          gsap.to(header, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" });
          gsap.to(header, { y: 60, opacity: 0, duration: 0.6, ease: "power2.in", delay: 2.5 });
        },
        onEnterBack: () => {
          gsap.to(header, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
          gsap.to(header, { y: 60, opacity: 0, duration: 0.6, ease: "power2.in", delay: 2 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
  );
}
