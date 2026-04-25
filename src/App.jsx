import { useState } from "react";
import Cursor from "./components/Cursor/Cursor";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Gastronomy from "./components/Gastronomy/Gastronomy";
import Cars from "./components/Cars/Cars";
import Portraits from "./components/Portraits/Portraits";
import Church from "./components/Church/Church";
import Lightbox from "./components/Lightbox/Lightbox";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Infografy from "./components/Infografy/Infografy";
import Pets from "./components/Pets/Pets";
import VideoFrames from "./components/VideoFrames/Videoframes";

export default function App() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <div
      style={{
        padding: 0,
        margin: 0,
        width: "100%",
        maxWidth: "100vw",
      }}
    >
      <Cursor />
      <Navbar />
      <Hero />
      <About />
      <Infografy />
      <VideoFrames>
        <Gastronomy onOpen={(i) => setLightboxIndex(i)} />
        {/* <Pets onOpen={(i) => setLightboxIndex(i)} />
        <Cars onOpen={(i) => setLightboxIndex(i)} />
        <Portraits onOpen={(i) => setLightboxIndex(i)} />
        <Church onOpen={(i) => setLightboxIndex(i)} /> */}
      </VideoFrames>
      <Lightbox
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
      <Contact />
      <Footer />
    </div>
  );
}
