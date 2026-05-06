import { useEffect, useRef, useState } from "react";

// ─── Componente por defecto (Desktop): no hace nada, renderiza hijos directo ──
export function VideoFramesDesktop({ children }) {
  return <>{children}</>;
}

// ─── Mobile: intro con video.mp4, luego revela el contenido ──────────────────
export function VideoFramesMobile({ children }) {
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleVideoEnd = () => {
    // Primero fade out del video, luego revela el contenido
    setFadeOut(true);
    setTimeout(() => setVideoEnded(true), 700); // 700ms de fade out
  };

  return (
    <div className="vfm-wrapper">
      {/* ── Intro de video ── */}
      {!videoEnded && (
        <div className={`vfm-intro ${fadeOut ? "vfm-intro--out" : ""}`}>
          <video
            ref={videoRef}
            className="vfm-video"
            src="/video.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
          />
          {/* Botón para saltar el intro */}
          <button className="vfm-skip" onClick={handleVideoEnd}>
            Saltar intro ↓
          </button>
        </div>
      )}

      {/* ── Contenido de la página (aparece al terminar el video) ── */}
      <div className={`vfm-content ${videoEnded ? "vfm-content--visible" : ""}`}>
        {children}
      </div>

      <style>{`
        .vfm-wrapper {
          position: relative;
          width: 100%;
        }

        /* ── Intro ── */
        .vfm-intro {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.7s ease;
        }
        .vfm-intro--out {
          opacity: 0;
          pointer-events: none;
        }

        /* ── Video a pantalla completa ── */
        .vfm-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          inset: 0;
        }

        /* ── Botón de skip ── */
        .vfm-skip {
          position: absolute;
          bottom: 32px;
          right: 24px;
          z-index: 10;
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 8px 18px;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          letter-spacing: 1px;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: background 0.2s;
        }
        .vfm-skip:hover {
          background: rgba(255, 255, 255, 0.18);
        }

        /* ── Contenido: oculto hasta que el video termina ── */
        .vfm-content {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.6s ease;
        }
        .vfm-content--visible {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}

// ─── Export por defecto: detecta mobile y usa el componente correcto ──────────
export default function VideoFrames({ children }) {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile === null) return null;
  if (!isMobile) return <VideoFramesDesktop>{children}</VideoFramesDesktop>;
  return <VideoFramesMobile>{children}</VideoFramesMobile>;
}
