import { useState } from "react"
import Cursor from "./components/Cursor/Cursor"
import Navbar from "./components/Navbar/Navbar"
import Hero from "./components/Hero/Hero"
import Gastronomy from "./components/Gastronomy/Gastronomy"
import Cars from "./components/Cars/Cars"
import Portraits from "./components/Portraits/Portraits"
import Church from "./components/Church/Church"
import Lightbox from "./components/Lightbox/Lightbox"
import About from "./components/About/About"
import Contact from "./components/Contact/Contact"
import Footer from "./components/Footer/Footer"
import Infografy from "./components/Infografy/Infografy"
import Pets from "./components/Pets/Pets"

export default function App() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <About />
      <Infografy />
      <Gastronomy onOpen={(i) => setLightboxIndex(i)} />
      <Pets onOpen={(i) => setLightboxIndex(i)} />
      <Cars onOpen={(i) => setLightboxIndex(i)} />
      <Portraits onOpen={(i) => setLightboxIndex(i)} />
      <Church onOpen={(i) => setLightboxIndex(i)} />
      <Lightbox activeIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      <Contact />
      <Footer />
    </>
  )
}
