import { useState } from "react"
import Cursor   from "./components/Cursor/Cursor"
import Navbar   from "./components/Navbar/Navbar"
import Hero     from "./components/Hero/Hero"
import Gallery  from "./components/Gallery/Gallery"
import Lightbox from "./components/Lightbox/Lightbox"
import About    from "./components/About/About"
import Contact  from "./components/Contact/Contact"
import Footer   from "./components/Footer/Footer"

export default function App() {
  // null = lightbox closed, number = index of the open project
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <Gallery  onOpen={(i) => setLightboxIndex(i)} />
      <Lightbox activeIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
