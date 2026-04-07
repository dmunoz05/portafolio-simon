import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import simonBg from "../../assets/simon_background.png";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

/* Silhouette cinematographer */
function CinematographerSilhouette({ src }) {
  return (
    <img
      src={src}
      style={{
        width: "100%",
        height: "100vh",
        objectFit: "cover",
      }}
      alt="Cinematographer"
      className="hero-figure"
    />
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  /* Film grain */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const interval = setInterval(() => {
      const id = ctx.createImageData(canvas.width, canvas.height);
      const data = id.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = data[i + 1] = data[i + 2] = v;
        data[i + 3] = Math.random() * 38 + 8;
      }
      ctx.putImageData(id, 0, 0);
    }, 80);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* GSAP entrance + parallax */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Entrance timeline */
      const tl = gsap.timeline({ delay: 0.25 });
      tl.to(
        ".hero-figure",
        { opacity: 0.88, duration: 2.0, ease: "power2.out" },
        0,
      )
        .to(
          ".hero-title span",
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
            stagger: 0.09,
            ease: "power3.out",
          },
          0.3,
        )
        .to(
          ".hero-eye",
          { opacity: 1, duration: 0.9, ease: "power2.out" },
          "-=.9",
        )
        .to(
          ".hero-sub",
          { opacity: 1, duration: 0.9, ease: "power2.out" },
          "-=.6",
        )
        .to(
          ".hero-scroll",
          { opacity: 1, duration: 0.9, ease: "power2.out" },
          "-=.4",
        );

      /* Parallax */
      const st = {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      const horizontalTween = gsap.getById("galMove"); // This might be null if not loaded yet, but let's stick to the parallax here
      
      gsap.to(".hero-content", {
        y: 130,
        ease: "none",
        scrollTrigger: { ...st, scrub: 1 },
      });
      gsap.to(".hero-bg", {
        y: 200,
        ease: "none",
        scrollTrigger: { ...st, scrub: 2 },
      });
      gsap.to(".hero-ring", {
        y: 90,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { ...st, scrub: 1.5 },
      });
      gsap.to(".hero-scene", {
        y: 50,
        ease: "none",
        scrollTrigger: { ...st, scrub: 0.8 },
      });
      gsap.to("#grain", {
        y: 65,
        ease: "none",
        scrollTrigger: { ...st, scrub: 0.5 },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef}>
      <div className="hero-bg" />
      <div className="hero-ring" />

      <div className="hero-scene">
        <div className="hero-glow" />
        <CinematographerSilhouette src={simonBg} />
      </div>

      <canvas id="grain" ref={canvasRef} />

      <div className="hero-content">
        <p className="hero-eye">Cinematographer &amp; Visual Storyteller</p>
        <h1 className="hero-title">
          {"SIMON".split("").map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </h1>
        <p className="hero-sub">Cinematographer &amp; Visual Storyteller</p>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-bar" />
      </div>
    </section>
  );
}
