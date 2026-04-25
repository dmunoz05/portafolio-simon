import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 160;
const currentFrame = (index) =>
  `/frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.png`;

export default function VideoFrames({ children }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const projectsRef = useRef(null);
  const imagesRef = useRef([]);
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile === false) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    const drawImage = (img, zoomFactor = 1) => {
      if (!img) return;
      const dpr = window.devicePixelRatio || 1;
      const canvasWidth = canvas.width / dpr;
      const canvasHeight = canvas.height / dpr;
      
      const sourceWidth = img.width / zoomFactor;
      const sourceHeight = img.height / zoomFactor;
      const sourceX = (img.width - sourceWidth) / 2;
      const sourceY = (img.height - sourceHeight) / 2;
      
      const scale = Math.max(canvasWidth / sourceWidth, canvasHeight / sourceHeight);
      const destW = sourceWidth * scale;
      const destH = sourceHeight * scale;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, (canvasWidth - destW) / 2, (canvasHeight - destH) / 2, destW, destH);
    };

    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        imagesRef.current[i] = img;
        if (i === 0) img.onload = () => drawImage(img, 1);
      }
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      context.scale(dpr, dpr);
      if (imagesRef.current[0]) drawImage(imagesRef.current[0], 1);
    };

    preloadImages();
    handleResize();
    window.addEventListener("resize", handleResize);

    const animationState = { frame: 0 };

    // 1. Frames & Zoom (Durante el intro-spacer)
    gsap.to(animationState, {
      frame: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        id: "vf-frames",
        trigger: ".video-intro-spacer",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: () => {
          const frameIndex = Math.round(animationState.frame);
          const img = imagesRef.current[frameIndex];
          let zoom = 1;
          if (frameIndex > 60) zoom = 1 + ((frameIndex - 60) / (frameCount - 60)) * 6;
          if (img && img.complete) drawImage(img, zoom);
        }
      }
    });

    // 2. Zoom extra del canvas y opacidad
    gsap.to(canvasRef.current, {
      scale: 4,
      opacity: 0.1,
      scrollTrigger: {
        id: "vf-bg-zoom",
        trigger: ".video-intro-spacer",
        start: "70% top",
        end: "bottom top",
        scrub: true,
      }
    });

    // 3. Revelar proyectos con fade-in
    gsap.fromTo(projectsRef.current, 
      { opacity: 0, y: 100 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        scrollTrigger: {
          id: "vf-projects-reveal",
          trigger: projectsRef.current,
          start: "top 90%",
          end: "top 40%",
          scrub: true,
        }
      }
    );

    // 4. Fade out total al final de todo el contenedor
    gsap.to(".video-fixed-bg", {
      opacity: 0,
      scrollTrigger: {
        id: "vf-hide",
        trigger: containerRef.current,
        start: "bottom 80%",
        end: "bottom top",
        scrub: true,
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.id && st.vars.id.startsWith("vf-")) st.kill();
      });
    };
  }, [isMobile]);

  if (isMobile === false) return <>{children}</>;

  return (
    <div ref={containerRef} className="video-portal-wrapper">
      {/* Fondo FIJO para que nunca se mueva en Y */}
      <div className="video-fixed-bg">
        <canvas ref={canvasRef} className="video-canvas" />
      </div>

      {/* Espaciador que controla la animación inicial */}
      <div className="video-intro-spacer" style={{ height: "300vh" }} />

      {/* Los proyectos fluyen por encima del fondo fijo */}
      <div ref={projectsRef} className="projects-integrated-flow">
        {children}
      </div>

      <style>{`
        .video-portal-wrapper {
          position: relative;
          width: 100%;
          background: #000;
          overflow: visible;
        }
        .video-fixed-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 0; /* Al fondo de todo */
          overflow: hidden;
          background: #000;
          pointer-events: none;
        }
        .video-canvas {
          width: 100% !important;
          height: 100% !important;
          display: block;
          transform: scale(1.1);
          transform-origin: center;
        }
        .projects-integrated-flow {
          position: relative;
          z-index: 1;
          width: 100%;
          margin-top: -100vh; /* Para que empiecen a aparecer sobre el video */
        }
        .projects-integrated-flow section,
        .projects-integrated-flow #gallery {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
}
