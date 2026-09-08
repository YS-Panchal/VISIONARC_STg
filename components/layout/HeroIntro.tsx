'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function HeroIntro() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('hasVisitedIntro')) {
      setShow(false);
      return;
    }

    // 2s delay + 1.2s duration = 3.2s total animation time
    const timer = setTimeout(() => {
      setShow(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('hasVisitedIntro', 'true');
      }
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  if (!show || pathname !== '/') return null;

  return (
    <>
      <div className="hero-intro-overlay" id="heroOverlay">
        <span className="hero-intro-tagline">Where Vision Meets Precision</span>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .hero-intro-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #000000;
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: overlaySlideUp 1.2s cubic-bezier(0.76, 0, 0.24, 1) 2s forwards;
          }

          .hero-intro-tagline {
            color: #ffffff;
            font-size: clamp(1rem, 2.5vw, 1.8rem);
            letter-spacing: 0.25em;
            text-transform: uppercase;
            font-family: var(--font-telegrafico), sans-serif;
            opacity: 1;
            animation: introTaglineFade 0.4s ease 1.8s forwards;
          }

          @keyframes overlaySlideUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100%); }
          }

          @keyframes introTaglineFade {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
        `
      }} />
    </>
  );
}
