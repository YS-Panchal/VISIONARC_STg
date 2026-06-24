'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return;

    const dot = dotRef.current;
    if (!dot) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let raf: number;
    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.08);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.08);
      dot.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="mouse-wrapper">
        <div ref={dotRef} className="mouse" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .mouse-wrapper {
          z-index: 10000000;
          pointer-events: none;
          position: fixed;
          inset: 0%;
        }

        .mouse {
          background-color: var(--matte, #2f3440);
          border-radius: 100%;
          width: .625rem;
          height: .625rem;
          position: absolute;
          top: 0;
          left: 0;
          will-change: transform;
        }

        @media (max-width: 991px) {
          .mouse-wrapper {
            display: none;
          }
        }

        @media (pointer: coarse) {
          .mouse-wrapper {
            display: none;
          }
        }
      `}} />
    </>
  );
}
