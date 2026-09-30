'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * CookieBanner - Ultra-Premium Glassmorphic Cookie Consent
 * 
 * Features:
 * 1. Pronounced Transparent Glassmorphism:
 *    - Deep frosted glass: blur(28px) saturate(180%)
 *    - Delicate translucent neutral background: rgba(255, 255, 255, 0.42)
 *    - Inner reflection highlight and ambient depth shadow
 * 2. Intelligent Dynamic Scroll Positioning:
 *    - Top of page (Hero): Sits above the stats strip in the empty bottom-left whitespace.
 *    - Upon scrolling: Smoothly glides down to the bottom with balanced spacing.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) {
      // Delay showing slightly to let page settle gracefully
      const timer = setTimeout(() => {
        setVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger smooth glide to bottom when user scrolls past 60px
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <aside 
        className={`va-cookie-banner ${isScrolled ? 'va-cookie-scrolled' : ''}`} 
        role="dialog" 
        aria-label="Cookie consent banner"
      >
        <div className="va-cookie-inner">
          <p className="va-cookie-text">
            We use cookies to enhance your browsing experience. By continuing, you agree to our{' '}
            <Link href="/cookies-policy" className="va-cookie-link">
              Cookie Policy
            </Link>
            .
          </p>
          <button
            onClick={handleAccept}
            className="va-cookie-btn"
            aria-label="Accept cookies"
          >
            ACCEPT
          </button>
        </div>
      </aside>

      <style dangerouslySetInnerHTML={{ __html: `
        .va-cookie-banner {
          position: fixed;
          z-index: 9995;
          left: clamp(1.25rem, 3.5vw, 2.75rem);
          bottom: clamp(6.2rem, 11.5vh, 7.5rem);
          width: auto;
          max-width: min(410px, calc(100vw - 2.5rem));
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 16px;
          box-shadow: 0 16px 40px rgba(47, 52, 64, 0.09), 
                      0 2px 6px rgba(47, 52, 64, 0.03), 
                      inset 0 1px 1.5px rgba(255, 255, 255, 0.9);
          padding: 0.8rem 1.05rem;
          opacity: 0;
          transform: translateY(12px);
          animation: vaCookieEntrance 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
          transition: bottom 0.55s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.3s ease,
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
          pointer-events: auto;
        }

        /* Glides down to bottom with appropriate margin upon scrolling */
        .va-cookie-banner.va-cookie-scrolled {
          bottom: clamp(1.25rem, 2.5vh, 1.75rem);
        }

        .va-cookie-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.95rem;
        }

        .va-cookie-text {
          font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: clamp(0.72rem, 0.78vw, 0.78rem);
          line-height: 1.45;
          color: rgba(47, 52, 64, 0.88);
          margin: 0;
          letter-spacing: 0.005em;
          flex: 1;
        }

        .va-cookie-link {
          color: #2f3440;
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 2.5px;
          text-decoration-color: rgba(47, 52, 64, 0.4);
          transition: color 0.2s ease, text-decoration-color 0.2s ease;
        }

        .va-cookie-link:hover {
          color: #8B2635;
          text-decoration-color: #8B2635;
        }

        .va-cookie-btn {
          flex-shrink: 0;
          background-color: #2f3440;
          color: #ffffff;
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.42rem 0.95rem;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
          outline: none;
        }

        .va-cookie-btn:hover {
          background-color: #1d2025;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(47, 52, 64, 0.25);
        }

        .va-cookie-btn:active {
          transform: translateY(0);
        }

        @keyframes vaCookieEntrance {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive adjustments for mobile & small screens */
        @media (max-width: 900px) {
          .va-cookie-banner,
          .va-cookie-banner.va-cookie-scrolled {
            left: 1rem;
            right: 1rem;
            bottom: 1.25rem;
            max-width: calc(100vw - 2rem);
            padding: 0.75rem 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .va-cookie-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.7rem;
          }

          .va-cookie-btn {
            align-self: flex-end;
          }
        }
      `}} />
    </>
  );
}
