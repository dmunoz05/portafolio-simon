import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
  const curRef = useRef(null)
  const folRef = useRef(null)

  /* Lerp loop */
  useEffect(() => {
    let mx = 0, my = 0, fx = 0, fy = 0
    let raf

    const onMove = (e) => { mx = e.clientX; my = e.clientY }

    const loop = () => {
      fx += (mx - fx) * 0.1
      fy += (my - fy) * 0.1
      if (curRef.current) {
        curRef.current.style.left = `${mx}px`
        curRef.current.style.top  = `${my}px`
      }
      if (folRef.current) {
        folRef.current.style.left = `${fx}px`
        folRef.current.style.top  = `${fy}px`
      }
      raf = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  /* Hover expand — event delegation on document */
  useEffect(() => {
    const addHov = (e) => {
      if (e.target.closest('a, .pcard, button')) document.body.classList.add('hov')
    }
    const rmHov = (e) => {
      if (e.target.closest('a, .pcard, button')) document.body.classList.remove('hov')
    }
    document.addEventListener('mouseover',  addHov)
    document.addEventListener('mouseout',   rmHov)
    return () => {
      document.removeEventListener('mouseover',  addHov)
      document.removeEventListener('mouseout',   rmHov)
    }
  }, [])

  return (
    <>
      <div id="cursor"          ref={curRef} />
      <div id="cursor-follower" ref={folRef} />
    </>
  )
}
