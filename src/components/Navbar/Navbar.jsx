import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Navbar.css'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: '70px top',
      onToggle: ({ isActive }) =>
        navRef.current?.classList.toggle('scrolled', isActive),
    })
    return () => trigger.kill()
  }, [])

  return (
    <nav ref={navRef} id="nav">
      <a href="#hero"    className="nav-logo">Simon</a>
      <a href="#contact" className="nav-cta">Contact</a>
    </nav>
  )
}
