import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { projects } from '../Gallery/projects'
import './Lightbox.css'

export default function Lightbox({ activeIndex, onClose }) {
  const [current, setCurrent]   = useState(activeIndex)
  const isOpen = activeIndex !== null

  const lbRef      = useRef(null)
  const backdropRef = useRef(null)
  const contentRef  = useRef(null)
  const closeRef    = useRef(null)
  const prevRef     = useRef(null)
  const nextRef     = useRef(null)
  const counterRef  = useRef(null)

  /* Sync current when a new card is opened */
  useEffect(() => {
    if (activeIndex !== null) setCurrent(activeIndex)
  }, [activeIndex])

  /* Animate open */
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    lbRef.current.classList.add('open')

    gsap.to(backdropRef.current,  { opacity: 1, duration: .45, ease: 'power2.out' })
    gsap.to(contentRef.current,   { opacity: 1, scale: 1, duration: .5, ease: 'power3.out', delay: .05 })
    gsap.to([closeRef.current, prevRef.current, nextRef.current, counterRef.current], {
      opacity: 1, rotate: 0, duration: .4, stagger: .06, ease: 'power2.out', delay: .2,
    })
  }, [isOpen])

  const close = useCallback(() => {
    gsap.to(contentRef.current,  { opacity: 0, scale: .94, duration: .35, ease: 'power2.in' })
    gsap.to([closeRef.current, prevRef.current, nextRef.current, counterRef.current], {
      opacity: 0, duration: .25, ease: 'power2.in',
    })
    gsap.to(backdropRef.current, {
      opacity: 0, duration: .4, ease: 'power2.in', delay: .1,
      onComplete: () => {
        lbRef.current?.classList.remove('open')
        document.body.style.overflow = ''
        gsap.set(closeRef.current, { rotate: -45 })
        onClose()
      },
    })
  }, [onClose])

  const go = useCallback((dir) => {
    const next = (current + dir + projects.length) % projects.length
    gsap.to(contentRef.current, {
      opacity: 0, x: dir * -40, duration: .22, ease: 'power2.in',
      onComplete: () => {
        setCurrent(next)
        gsap.fromTo(contentRef.current,
          { x: dir * 40 },
          { opacity: 1, x: 0, duration: .32, ease: 'power2.out' }
        )
      },
    })
  }, [current])

  /* Keyboard navigation */
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape')      close()
      if (e.key === 'ArrowLeft')   go(-1)
      if (e.key === 'ArrowRight')  go(+1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close, go])

  const p = projects[current] ?? projects[0]
  const hiResSrc = p.img.replace(/w=\d+/, 'w=1600')

  return (
    <div id="lightbox" ref={lbRef}>
      <div id="lb-backdrop" ref={backdropRef} onClick={close} />

      <div id="lb-content" ref={contentRef}>
        <img id="lb-img" src={isOpen ? hiResSrc : ''} alt={p.alt} />
        <div id="lb-meta">
          <span id="lb-cat">{p.category}</span>
          <p    id="lb-name">{p.name}</p>
          <p    id="lb-year">{p.year}</p>
        </div>
      </div>

      <button id="lb-close" ref={closeRef} aria-label="Cerrar" onClick={close}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="1" y1="1" x2="15" y2="15" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="15" y1="1" x2="1" y2="15" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      <button id="lb-prev" className="lb-arrow" ref={prevRef} aria-label="Anterior"
        onClick={(e) => { e.stopPropagation(); go(-1) }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <polyline points="11,2 4,9 11,16" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button id="lb-next" className="lb-arrow" ref={nextRef} aria-label="Siguiente"
        onClick={(e) => { e.stopPropagation(); go(+1) }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <polyline points="7,2 14,9 7,16" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <span id="lb-counter" ref={counterRef}>
        {current + 1} / {projects.length}
      </span>
    </div>
  )
}
