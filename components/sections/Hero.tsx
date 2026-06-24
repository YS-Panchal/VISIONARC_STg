'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const statsData = [
  { target: 15, label: 'Years of Experience' },
  { target: 100, label: 'Projects Completed' },
  { target: 12, label: 'Cities Reached' },
  { target: 25, label: 'Awards Won' }
];

export default function Hero() {
  const categoryNavRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isIntroSkipped, setIsIntroSkipped] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('hasVisitedIntro')) {
      setIsIntroSkipped(true);
    }
  }, []);

  useEffect(() => {
    const isSkipped = typeof window !== 'undefined' && !!sessionStorage.getItem('hasVisitedIntro');
    const delay = isSkipped 
      ? 300 
      : (typeof window !== 'undefined' && window.innerWidth < 768 ? 2800 : 3200);
    const timer = setTimeout(() => {
      const statElements = document.querySelectorAll('.hero-va-stat-number');
      statElements.forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const valEl = el.querySelector('.hero-va-stat-num-val');
        if (!valEl) return;
        
        let count = 0;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        const update = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function (easeOutQuad)
          const easeProgress = progress * (2 - progress);
          
          count = Math.floor(easeProgress * target);
          valEl.textContent = count.toString();
          
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            valEl.textContent = target.toString();
          }
        };
        
        requestAnimationFrame(update);
      });
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const categoryNav = categoryNavRef.current;
    const hero = heroRef.current;
    
    if (!categoryNav || !hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          categoryNav.classList.add('sticky-nav');
        } else {
          categoryNav.classList.remove('sticky-nav');
        }
      },
      {
        threshold: 0,
        rootMargin: '-50px'
      }
    );
    
    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section 
        id="hero" 
        ref={heroRef}
        className={isIntroSkipped ? 'intro-skipped' : ''}
        style={{
          backgroundColor: 'var(--white)',
          width: '100%',
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div 
          className="custom-hero-wrapper" 
          id="customHero"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 5,
            width: '100%',
            position: 'relative'
          }}
        >
          <div 
            className="custom-hero-tagline"
            style={{
              fontFamily: 'var(--font-telegrafico)',
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              letterSpacing: '0.25em',
              color: '#2f3440',
              marginBottom: '2rem',
              opacity: 0,
              transform: 'translateY(15px)',
              animation: `customFadeInUp 0.8s ease-out ${isIntroSkipped ? '0.1s' : '2.8s'} forwards`,
              textAlign: 'center'
            }}
          >
            WHERE VISION MEETS PRECISION
          </div>
          
          <div 
            className="custom-hero-title"
            style={{
              margin: '0 0 1rem 0',
              opacity: 0,
              transform: 'scale(1.3)',
              animation: `customZoomIn 1s cubic-bezier(0.16, 1, 0.3, 1) ${isIntroSkipped ? '0s' : '2.6s'} forwards`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img 
              src="/images/VA LOGO 1.png" 
              alt="Vision Architecture Logo" 
              style={{
                width: 'clamp(200px, 40vw, 550px)',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
          
          <nav 
            className="custom-category-nav" 
            id="categoryNav"
            ref={categoryNavRef}
          >
            <Link 
              href="/architecture" 
              className="custom-nav-item"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('start-page-transition', {
                  detail: { href: '/architecture', title: 'Architecture' }
                }));
              }}
            >
              ARCHITECTURE
            </Link>
            <div className="custom-nav-divider">·</div>
            <Link 
              href="/interior-design" 
              className="custom-nav-item"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('start-page-transition', {
                  detail: { href: '/interior-design', title: 'Interior Design' }
                }));
              }}
            >
              INTERIOR DESIGN
            </Link>
            <div className="custom-nav-divider">·</div>
            <Link 
              href="/landscape" 
              className="custom-nav-item"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('start-page-transition', {
                  detail: { href: '/landscape', title: 'Landscape & Planning' }
                }));
              }}
            >
              LANDSCAPE
            </Link>
            <div className="custom-nav-divider">·</div>
            <Link 
              href="/renovation" 
              className="custom-nav-item"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('start-page-transition', {
                  detail: { href: '/renovation', title: 'Renovation & Management' }
                }));
              }}
            >
              RENOVATION
            </Link>

            {/* Mobile Hamburger Button */}
            <button 
              className={`hero-mobile-hamburger ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </nav>

          {/* Mobile Overlay Menu */}
          <div className={`hero-mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="hero-mobile-menu-content">
              <Link href="/architecture" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); window.dispatchEvent(new CustomEvent('start-page-transition', { detail: { href: '/architecture', title: 'Architecture' } })); }}>ARCHITECTURE</Link>
              <Link href="/interior-design" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); window.dispatchEvent(new CustomEvent('start-page-transition', { detail: { href: '/interior-design', title: 'Interior Design' } })); }}>INTERIOR DESIGN</Link>
              <Link href="/landscape" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); window.dispatchEvent(new CustomEvent('start-page-transition', { detail: { href: '/landscape', title: 'Landscape & Planning' } })); }}>LANDSCAPE</Link>
              <Link href="/renovation" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); window.dispatchEvent(new CustomEvent('start-page-transition', { detail: { href: '/renovation', title: 'Renovation & Management' } })); }}>RENOVATION</Link>
            </div>
          </div>
        </div>

        {/* ===== INTEGRATED STATS STRIP ===== */}
        <div className="va-stats-strip">
          {statsData.map((stat, index) => (
            <div key={index} className="va-stat-item">
              <div 
                className="hero-va-stat-number" 
                data-target={stat.target}
                style={{
                  fontFamily: 'var(--font-bank-gothic)',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  lineHeight: 1,
                  color: '#2f3440',
                  letterSpacing: '-0.02em',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.08em',
                  whiteSpace: 'nowrap'
                }}
              >
                <span 
                  className="hero-va-stat-num-val"
                  style={{
                    fontFamily: 'var(--font-bank-gothic)',
                    fontSize: 'inherit'
                  }}
                >
                  0
                </span>
                <span 
                  className="hero-va-stat-suffix"
                  style={{
                    fontFamily: 'var(--font-bank-gothic)',
                    fontSize: '0.55em'
                  }}
                >
                  +
                </span>
              </div>
              <div 
                className="hero-va-stat-label"
                style={{
                  fontFamily: 'var(--font-telegrafico)',
                  fontSize: 'clamp(0.62rem, 1vw, 0.82rem)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#2f3440',
                  opacity: 0.6,
                  marginTop: '0.6rem',
                  textAlign: 'center',
                  whiteSpace: 'nowrap'
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes customFadeInUp {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes customZoomIn {
            0% { opacity: 0; transform: scale(1.3); }
            100% { opacity: 1; transform: scale(1); }
          }

          @keyframes customSlideDown {
            0% { transform: translate(-50%, -100%); opacity: 0; }
            100% { transform: translate(-50%, 0); opacity: 1; }
          }

          @keyframes mobileSlideDown {
            0% { transform: translateY(-100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }

          .custom-category-nav {
            display: flex;
            gap: 1.5rem;
            align-items: center;
            margin-top: 1.5rem;
            opacity: 0;
            transform: translateY(15px);
            animation: customFadeInUp 0.8s ease-out 3s forwards;
            z-index: 100;
          }

          .intro-skipped .custom-category-nav {
            animation-delay: 0.2s;
          }

          .custom-category-nav.sticky-nav {
            display: flex;
            position: fixed;
            top: 15px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.95);
            padding: 1rem 2rem;
            border-radius: 50px;
            box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            animation: customSlideDown 0.4s ease-out forwards;
            margin-top: 0;
            gap: 1rem;
            z-index: 100;
          }

          .custom-nav-item {
            font-family: var(--font-telegrafico);
            text-decoration: none;
            color: #2f3440;
            font-weight: 600;
            font-size: clamp(0.9rem, 1.5vw, 1.2rem);
            letter-spacing: 0.1em;
            transition: all 0.3s ease;
            white-space: nowrap;
          }

          .sticky-nav .custom-nav-item {
            font-size: clamp(0.8rem, 1.2vw, 1rem);
          }

          .custom-nav-item:hover {
            color: #8B2635;
            opacity: 0.8;
          }

          .custom-nav-divider {
            color: #2f3440;
            font-size: 1.5rem;
            opacity: 0.5;
          }

          .sticky-nav .custom-nav-divider {
            font-size: 1rem;
          }

          .hero-mobile-hamburger {
            display: none;
            flex-direction: column;
            justify-content: space-between;
            width: 24px;
            height: 16px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
            z-index: 104; /* ensure it stays above the overlay */
          }
          .hero-mobile-hamburger span {
            width: 100%;
            height: 2px;
            background-color: #2f3440;
            transition: all 0.3s ease;
            transform-origin: left;
          }
          .hero-mobile-hamburger.open span:nth-child(1) { transform: rotate(45deg); width: 110%; }
          .hero-mobile-hamburger.open span:nth-child(2) { opacity: 0; }
          .hero-mobile-hamburger.open span:nth-child(3) { transform: rotate(-45deg); width: 110%; }

          .hero-mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(255, 255, 255, 0.98);
            z-index: 101;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(10px);
          }
          .hero-mobile-menu-overlay.open {
            opacity: 1;
            pointer-events: auto;
          }
          .hero-mobile-menu-content {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            align-items: center;
          }
          .hero-mobile-menu-content a {
            font-family: var(--font-telegrafico);
            text-decoration: none;
            color: #2f3440;
            font-size: 1.5rem;
            letter-spacing: 0.1em;
            transition: color 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.4s ease, transform 0.4s ease, color 0.3s ease;
          }
          .hero-mobile-menu-overlay.open .hero-mobile-menu-content a {
            opacity: 1;
            transform: translateY(0);
          }
          .hero-mobile-menu-overlay.open .hero-mobile-menu-content a:nth-child(1) { transition-delay: 0.1s; }
          .hero-mobile-menu-overlay.open .hero-mobile-menu-content a:nth-child(2) { transition-delay: 0.2s; }
          .hero-mobile-menu-overlay.open .hero-mobile-menu-content a:nth-child(3) { transition-delay: 0.3s; }
          .hero-mobile-menu-overlay.open .hero-mobile-menu-content a:nth-child(4) { transition-delay: 0.4s; }
          
          .hero-mobile-menu-content a:hover {
            color: #8B2635;
          }

          @media (max-width: 768px) {
            .custom-category-nav {
              position: fixed !important;
              top: 15px !important;
              right: 15px !important;
              left: auto !important;
              transform: none !important;
              margin-top: 0 !important;
              padding: 1rem;
              background: rgba(255, 255, 255, 0.95);
              border-radius: 50%;
              width: 50px;
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
              animation: customFadeInUp 0.8s ease-out 3s forwards;
              z-index: 1000;
            }
            .intro-skipped .custom-category-nav {
              animation-delay: 0.2s;
            }
            .custom-category-nav.sticky-nav {
              position: fixed !important;
              top: 15px !important;
              right: 15px !important;
              left: auto !important;
              transform: none !important;
              margin-top: 0 !important;
              padding: 1rem;
              background: rgba(255, 255, 255, 0.95);
              border-radius: 50%;
              width: 50px;
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
              backdrop-filter: blur(10px);
              animation: mobileSlideDown 0.4s ease-out forwards !important;
              z-index: 1000;
            }
            .custom-nav-item, .custom-nav-divider {
              display: none !important;
            }
            .hero-mobile-hamburger {
              display: flex;
            }
          }

          .va-stats-strip {
            position: absolute;
            bottom: 0;
            left: 0;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            padding: 2.2rem 5vw;
            border-top: 1px solid rgba(47,52,64,0.08);
            width: 100%;
            box-sizing: border-box;
            z-index: 10;
            background-color: var(--white);
            opacity: 0;
            transform: translateY(15px);
            animation: customFadeInUp 0.8s ease-out 3.2s forwards;
          }

          .intro-skipped .va-stats-strip {
            animation-delay: 0.3s !important;
          }
          
          .va-stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1 1 0;
            min-width: 0;
            padding: 0.8rem 1.5rem;
            position: relative;
          }
          
          .va-stat-item:not(:last-child)::after {
            content: '';
            position: absolute;
            right: 0;
            top: 15%;
            height: 70%;
            width: 1px;
            background: rgba(47,52,64,0.12);
          }

          @media (max-width: 767px) {
            .va-stats-strip {
              position: absolute !important;
              flex-wrap: nowrap !important;
              padding: 1.2rem 2vw;
              margin-top: 0;
              border-top: 1px solid rgba(47,52,64,0.08);
              border-bottom: 1px solid rgba(47,52,64,0.08);
              animation: customFadeInUp 0.8s ease-out 2.8s forwards !important;
            }
            .va-stat-item {
              flex: 1 1 0 !important;
              padding: 0.5rem 0.2rem;
            }
            .va-stat-item:not(:last-child)::after {
              display: block;
              top: 20%;
              height: 60%;
            }
            .hero-va-stat-number {
              font-size: clamp(1.2rem, 4vw, 2rem) !important;
            }
            .va-stat-label {
              font-size: clamp(0.45rem, 1.2vw, 0.65rem) !important;
              margin-top: 0.4rem !important;
              white-space: normal !important;
              line-height: 1.2;
            }
          }

          .intro-skipped .va-stats-strip {
            animation-delay: 0.3s !important;
          }
        `
      }} />
    </>
  );
}
