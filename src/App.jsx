import { useState, useEffect } from "react";
import Cursor from "./components/Cursor/Cursor";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Gastronomy from "./components/Gastronomy/Gastronomy";
import Portraits from "./components/Portraits/Portraits";
import Church from "./components/Church/Church";
import Concerts from "./components/Concerts/Concerts";
import Lightbox from "./components/Lightbox/Lightbox";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Infografy from "./components/Infografy/Infografy";
import Pets from "./components/Pets/Pets";
import VideoFrames, {
  VideoFramesMobile,
  VideoFramesDesktop,
} from "./components/VideoFrames/videoframes";

export default function App() {
  const [lightbox, setLightbox] = useState({ index: null, projects: [] });
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Helper: abre el lightbox con el índice y el array de proyectos de esa sección
  const openLightbox = (index, projects) => setLightbox({ index, projects });
  const closeLightbox = () => setLightbox({ index: null, projects: [] });

  const lightboxEl = (
    <Lightbox
      activeIndex={lightbox.index}
      activeProjects={lightbox.projects}
      onClose={closeLightbox}
    />
  );

  if (isMobile === null) return null;

  // ── MOBILE: video intro → resto del contenido
  if (isMobile) {
    return (
      <div style={{ padding: 0, margin: 0, width: "100%", maxWidth: "100vw" }}>
        <Cursor />
        <Navbar />
        <VideoFramesMobile>
          <Hero />
          <About />
          <Infografy />
          <Pets      onOpen={openLightbox} />
          <Gastronomy onOpen={openLightbox} />
          <Portraits onOpen={openLightbox} />
          <Concerts  onOpen={openLightbox} />
          <Church    onOpen={openLightbox} />
          {lightboxEl}
          <Contact />
          <Footer />
        </VideoFramesMobile>
      </div>
    );
  }

  // ── DESKTOP: orden original
  return (
    <div style={{ padding: 0, margin: 0, width: "100%", maxWidth: "100vw" }}>
      <Cursor />
      <Navbar />
      <Hero />
      <About />
      <Infografy />
      <VideoFramesDesktop>
        <Gastronomy onOpen={openLightbox} />
        <Pets      onOpen={openLightbox} />
        <Portraits onOpen={openLightbox} />
        <Concerts  onOpen={openLightbox} />
        <Church    onOpen={openLightbox} />
      </VideoFramesDesktop>
      {lightboxEl}
      <Contact />
      <Footer />
    </div>
  );
}
