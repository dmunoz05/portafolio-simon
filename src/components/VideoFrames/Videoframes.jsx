import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 160;
const ZOOM_START_FRAME = 100;
const MAX_ZOOM = 10; // cuánto zoom al llegar al frame final

const currentFrame = (index) =>
  `/frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.png`;

export default function VideoFrames({ children }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
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
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;

      const srcW = img.width / zoomFactor;
      const srcH = img.height / zoomFactor;
      const srcX = (img.width - srcW) / 2;
      const srcY = (img.height - srcH) / 2;

      const scale = Math.max(cw / srcW, ch / srcH);
      const dstW = srcW * scale;
      const dstH = srcH * scale;

      context.clearRect(0, 0, cw, ch);
      context.drawImage(
        img,
        srcX,
        srcY,
        srcW,
        srcH,
        (cw - dstW) / 2,
        (ch - dstH) / 2,
        dstW,
        dstH,
      );
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      context.scale(dpr, dpr);
      if (imagesRef.current[0]) drawImage(imagesRef.current[0], 1);
    };

    // Pre-carga de imágenes
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      imagesRef.current[i] = img;
      if (i === 0) img.onload = () => drawImage(img, 1);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    const animState = { frame: 0, zoom: 1 };

    // ─── 1. Animación de frames + zoom sincronizado ───────────────────────
    gsap.to(animState, {
      frame: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        id: "vf-frames",
        trigger: ".video-intro-spacer",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: () => {
          const frameIndex = Math.round(animState.frame);
          const img = imagesRef.current[frameIndex];

          // Zoom empieza en frame ZOOM_START_FRAME, llega a MAX_ZOOM en el último
          let zoom = 1;
          if (frameIndex >= ZOOM_START_FRAME) {
            const progress =
              (frameIndex - ZOOM_START_FRAME) /
              (frameCount - 1 - ZOOM_START_FRAME);
            zoom = 1 + progress * (MAX_ZOOM - 1);
          }

          if (img?.complete) drawImage(img, zoom);
        },
      },
    });

    // ─── 2. Fade out del canvas cuando los hijos toman protagonismo ───────
    // Empieza a desvanecerse solo cuando el contenedor hijo
    // ya ha scrolleado bastante (al final de todo)
    gsap.to(".video-fixed-bg", {
      opacity: 0,
      scrollTrigger: {
        id: "vf-hide",
        trigger: containerRef.current,
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.id?.startsWith("vf-")) st.kill();
      });
    };
  }, [isMobile]);

  if (isMobile === false) return <>{children}</>;

  return (
    <div ref={containerRef} className="vf-wrapper">
      {/* Canvas fijo — fondo de toda la escena */}
      <div className="video-fixed-bg">
        <canvas ref={canvasRef} className="video-canvas" />
      </div>

      {/* Espaciador que controla la animación de frames */}
      <div className="video-intro-spacer" style={{ height: "300vh" }} />

      {/* Hijos (Gastronomy, Pets, etc.) fluyen encima del canvas congelado */}
      <div className="vf-children">{children}</div>

      <style>{`
        .vf-wrapper {
          position: relative;
          width: 100%;
          background: #000;
        }
        .video-fixed-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background: #000;
          pointer-events: none;
        }
        .video-canvas {
          width: 100% !important;
          height: 100% !important;
          display: block;
        }
        .vf-children {
          position: relative;
          z-index: 1;
          width: 100%;
          /* margin-top negativo para que Gastronomy empiece
             justo cuando el canvas ya está en el último frame con zoom */
          margin-top: -100vh;
        }
        /* Los hijos son transparentes para que el canvas se vea */
        .vf-children section,
        .vf-children #gallery,
        .vf-children .gal-sticky {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
}
