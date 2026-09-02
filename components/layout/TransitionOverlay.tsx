'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function TransitionOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [isSlidingDown, setIsSlidingDown] = useState(false);
  const [isSlidingUp, setIsSlidingUp] = useState(false);

  // Map pathnames to titles for direct entry/initial loads
  const getPageTitle = (path: string) => {
    if (path === '/architecture') return 'Architecture';
    if (path === '/interior-design') return 'Interior Design';
    if (path === '/hospitality-architecture' || path === '/landscape') return 'Hospitality Architecture';
    if (path === '/renovation') return 'Renovation & Planning';
    return '';
  };

  // Initial load slide-up (entry) animation for direct entries to specialty pages
  useEffect(() => {
    const initialTitle = getPageTitle(pathname);
    if (initialTitle) {
      setTitle(initialTitle);
      setShow(true);
      setIsSlidingUp(true);
      const timer = setTimeout(() => {
        setShow(false);
        setIsSlidingUp(false);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen to custom page transitions
  useEffect(() => {
    const handleTransition = (e: Event) => {
      const customEvent = e as CustomEvent<{ href: string; title: string }>;
      const { href, title: pageTitle } = customEvent.detail;

      setTitle(pageTitle);
      setShow(true);
      setIsSlidingDown(true);
      setIsSlidingUp(false);

      // Wait for slide-down animation to complete (600ms)
      const timer = setTimeout(() => {
        setIsSlidingDown(false);
        router.push(href);
      }, 600);

      return () => clearTimeout(timer);
    };

    window.addEventListener('start-page-transition', handleTransition);
    return () => window.removeEventListener('start-page-transition', handleTransition);
  }, [router]);

  // Once route change finishes (detected via pathname change), trigger slide-up
  useEffect(() => {
    if (show && !isSlidingDown && !isSlidingUp) {
      setIsSlidingUp(true);
      const timer = setTimeout(() => {
        setShow(false);
        setIsSlidingUp(false);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [pathname, show, isSlidingDown, isSlidingUp]);

  if (!show) return null;

  return (
    <>
      <div 
        className={`global-transition-overlay ${isSlidingDown ? 'slide-down' : ''} ${isSlidingUp ? 'slide-up' : ''}`}
      >
        <span className="global-transition-title">{title}</span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .global-transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #2f3440;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .global-transition-title {
          color: #ffffff;
          font-size: clamp(1.4rem, 3.5vw, 2.4rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
        }

        /* Slide-Down (Exit): Covers the screen from top to bottom */
        .global-transition-overlay.slide-down {
          pointer-events: all;
          animation: spGlobalSlideDown 0.6s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }

        .global-transition-overlay.slide-down .global-transition-title {
          opacity: 0;
          animation: spGlobalTitleFadeIn 0.3s ease 0.4s forwards;
        }

        /* Slide-Up (Entry): Slides up to reveal the page, clicking enabled immediately */
        .global-transition-overlay.slide-up {
          pointer-events: none;
          animation: spGlobalSlideUp 0.6s cubic-bezier(0.76, 0, 0.24, 1) 0.8s forwards;
        }

        .global-transition-overlay.slide-up .global-transition-title {
          opacity: 1;
          animation: spGlobalTitleFadeOut 0.3s ease 0.6s forwards;
        }

        @keyframes spGlobalSlideDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(0); }
        }

        @keyframes spGlobalSlideUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }

        @keyframes spGlobalTitleFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes spGlobalTitleFadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}} />
    </>
  );
}
