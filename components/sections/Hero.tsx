'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ================================================================
   DATA
   ================================================================ */

const statsData = [
  { target: 2.2, isFloat: true, unit: ' MILLION+', suffix: ' SQFT', label: 'TOTAL DESIGNED AREA' },
  { target: 1.7, isFloat: true, unit: ' MILLION+', suffix: ' SQFT', label: 'TOTAL EXECUTED AREA' },
  { target: 100, isFloat: false, unit: '', suffix: '+', label: 'DESIGN PROJECTS' },
];

interface PanelConfig {
  id: string;
  title: string;
  href: string;
  transitionTitle: string;
  images: string[];
  /** Resting vertical offset in px (-18 = upper pair, +18 = lower pair) */
  restOffset: number;
  /** Breathing amplitude in px (±5) */
  breathAmp: number;
  /** Breathing animation duration in seconds */
  breathDuration: number;
  /** Base slideshow interval in ms */
  baseInterval: number;
}

const panelsConfig: PanelConfig[] = [
  {
    id: 'architecture',
    title: 'ARCHITECTURE',
    href: '/architecture',
    transitionTitle: 'Architecture',
    images: [
      '/images/Projects/PROJECTS WEBP/Architecture/HIGH RISE RESIDENTIAL BUILDING/vision-architecture-karma-astron-high-rise-residential-ahmedabad-01.webp',
      '/images/Projects/PROJECTS WEBP/Architecture/SARVASV (VINAY JOSHI RESIDENCE)/vision-architecture-sarvasva-vinay-joshi-luxury-bungalow-ahmedabad-01.webp',
      '/images/Projects/PROJECTS WEBP/Architecture/NITYAM BUNGLOWS/vision-architecture-nityam-bungalows-5bhk-luxury-residential-ahmedabad-01.webp',
      '/images/Projects/PROJECTS WEBP/Architecture/MR RAJESH PATEL PRIVATE RESIDENCE/vision-architecture-rajesh-patel-exposed-brick-residence-ahmedabad-01.webp',
      '/images/Projects/PROJECTS WEBP/Architecture/MR DHIREN SHAH PRIVATE RESIDENCE/vision-architecture-dhiren-shah-private-residence-ahmedabad-10.webp',
      '/images/Projects/PROJECTS WEBP/Architecture/NITIN THAKKAR PRIVATE RESIDENCE/vision-architecture-nitin-thakkar-modern-residence-ahmedabad-01.webp',
    ],
    restOffset: -18,
    breathAmp: 5,
    breathDuration: 7.5,
    baseInterval: 8000,
  },
  {
    id: 'interior',
    title: 'INTERIOR DESIGN',
    href: '/interior-design',
    transitionTitle: 'Interior Design',
    images: [
      '/images/Projects/PROJECTS WEBP/Interior Design/MR GAURANG PATEL PRIVATE RESIDENCE/vision-architecture-gaurang-patel-4bhk-interior-design-ahmedabad-01.webp',
      '/images/Projects/PROJECTS WEBP/Interior Design/MR LINAY PATEL PRIVATE RESIDENCE/vision-architecture-linay-patel-house-of-warmth-interiors-ahmedabad-01.webp',
      '/images/Projects/PROJECTS WEBP/Interior Design/MR VIJAY PANCHAL PRIVATE RESIDENCE/vision-architecture-vijay-panchal-5bhk-penthouse-interiors-ahmedabad-01.webp',
      '/images/Projects/PROJECTS WEBP/Interior Design/SARK EPC PVT LTD/vision-architecture-sark-epc-corporate-office-interiors-ahmedabad-01.webp',
      '/images/Projects/PROJECTS WEBP/Interior Design/VISION OFFICE/vision-architecture-studio-office-interior-design-ahmedabad-01.webp',
    ],
    restOffset: 18,
    breathAmp: 5,
    breathDuration: 8.5,
    baseInterval: 9500,
  },
  {
    id: 'hospitality',
    title: 'HOSPITALITY',
    href: '/hospitality-architecture',
    transitionTitle: 'Hospitality Architecture',
    images: [
      '/images/Projects/PROJECTS WEBP/Hospitality Architecture/SANTORINI RESORT BHARUCH/vision-architecture-santorini-luxury-resort-bharuch-gujarat-01.webp',
      '/images/Projects/PROJECTS WEBP/Hospitality Architecture/THE ARC BANQUET AND RESTAURANT/vision-architecture-the-arc-elliptical-banquet-restaurant-ahmedabad-01.webp',
      '/images/Projects/PROJECTS WEBP/Hospitality Architecture/THE VAAV THEME RESTAURANT/vision-architecture-the-vaav-stepwell-theme-restaurant-banquet-ahmedabad-01.webp',
      '/images/Projects/PROJECTS WEBP/Hospitality Architecture/THE CROWN BY KINGS KRAFT/vision-architecture-the-crown-kings-kraft-4star-hotel-ahmedabad-01.webp',
      '/images/Projects/PROJECTS WEBP/Hospitality Architecture/SANTORINI RESORT BHARUCH/vision-architecture-santorini-luxury-resort-bharuch-gujarat-02.webp',
    ],
    restOffset: -18,
    breathAmp: 5,
    breathDuration: 7.8,
    baseInterval: 7500,
  },
  {
    id: 'renovation',
    title: 'RENOVATION',
    href: '/renovation',
    transitionTitle: 'Renovation & Planning',
    images: [
      '/images/Projects/PROJECTS WEBP/Renovation & Planning/MR SURESH CHAUHAN PRIVATE RESIDENCE/vision-architecture-suresh-chauhan-heritage-residence-renovation-ahmedabad-01.webp',
      '/images/Projects/PROJECTS WEBP/Renovation & Planning/MR URVISH TRIVEDI PRIVATE RESIDENCE/vision-architecture-urvish-trivedi-bungalow-renovation-ahmedabad-01.webp',
      '/images/Projects/PROJECTS WEBP/Renovation & Planning/MR MITUL SHAH PRIVATE RESIDENCE/vision-architecture-mitul-shah-residence-renovation-ahmedabad-01.webp',
      '/images/Projects/PROJECTS WEBP/Renovation & Planning/MR ANIL CHAUHAN PRIVATE RESIDENCE/vision-architecture-anil-chauhan-residence-renovation-ahmedabad-01.webp',
      '/images/Projects/PROJECTS WEBP/Renovation & Planning/SHANKAR PRAJAPATI PRIVATE RESIDENCE/vision-architecture-shankar-prajapati-de-elegante-villa-renovation-ahmedabad-01.webp',
    ],
    restOffset: 18,
    breathAmp: 5,
    breathDuration: 9.0,
    baseInterval: 10500,
  },
];

/* ================================================================
   HELPERS
   ================================================================ */

/** Fisher-Yates shuffle – returns a new shuffled copy. */
function shuffleArray(length: number): number[] {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Preload a single image by creating an offscreen <img>. */
function preloadImage(src: string) {
  if (typeof window === 'undefined') return;
  const img = new window.Image();
  img.src = src;
}

/* ================================================================
   PANEL IMAGE SLIDESHOW (per-panel)
   ================================================================ */

function PanelImageSlideshow({
  images,
  panelId,
  isHovered,
  schedulerRef,
}: {
  images: string[];
  panelId: string;
  isHovered: boolean;
  schedulerRef: React.RefObject<SlideshowScheduler | null>;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const queueRef = useRef<number[]>([]);
  const currentIdxRef = useRef(0);

  const getNextFromQueue = useCallback(() => {
    if (queueRef.current.length === 0) {
      queueRef.current = shuffleArray(images.length);
      // Ensure we don't repeat the current image at the start
      if (queueRef.current[0] === currentIdxRef.current && images.length > 1) {
        queueRef.current.push(queueRef.current.shift()!);
      }
    }
    return queueRef.current.shift()!;
  }, [images.length]);

  // Register with the scheduler
  useEffect(() => {
    const scheduler = schedulerRef.current;
    if (!scheduler) return;

    const handler = () => {
      if (isTransitioning || images.length <= 1) return;

      const nxt = getNextFromQueue();
      // Preload the image before transition
      preloadImage(images[nxt]);

      // Small delay to let preload start
      requestAnimationFrame(() => {
        setNextIdx(nxt);
        setIsTransitioning(true);

        setTimeout(() => {
          setCurrentIdx(nxt);
          currentIdxRef.current = nxt;
          setNextIdx(null);
          setIsTransitioning(false);

          // Pre-load the NEXT upcoming image for this panel
          const upcoming = getNextFromQueue();
          preloadImage(images[upcoming]);
          // Put it back at front of queue
          queueRef.current.unshift(upcoming);
        }, 1200);
      });
    };

    scheduler.registerPanel(panelId, handler);
    return () => scheduler.unregisterPanel(panelId);
  }, [panelId, schedulerRef, getNextFromQueue, images, isTransitioning]);

  // Pause/resume scheduling on hover
  useEffect(() => {
    const scheduler = schedulerRef.current;
    if (!scheduler) return;
    if (isHovered) {
      scheduler.pausePanel(panelId);
    } else {
      scheduler.resumePanel(panelId);
    }
  }, [isHovered, panelId, schedulerRef]);

  return (
    <div className="hero-panel-img-container">
      <Image
        src={images[currentIdx]}
        alt={`Vision Architecture — ${panelId}`}
        fill
        unoptimized
        sizes="(max-width: 900px) 0vw, (max-width: 1280px) 25vw, 20vw"
        quality={90}
        priority={currentIdx === 0}
        className={`hero-panel-img ${isTransitioning ? 'hero-img-exiting' : 'hero-img-active'}`}
      />
      {nextIdx !== null && (
        <Image
          src={images[nextIdx]}
          alt={`Vision Architecture — ${panelId}`}
          fill
          unoptimized
          sizes="(max-width: 900px) 0vw, (max-width: 1280px) 25vw, 20vw"
          quality={90}
          className="hero-panel-img hero-img-entering"
        />
      )}
    </div>
  );
}

/* ================================================================
   SLIDESHOW SCHEDULER
   Ensures minimum 2s between any two panel transitions.
   ================================================================ */

class SlideshowScheduler {
  private panels: Map<string, {
    handler: () => void;
    baseInterval: number;
    timerId: ReturnType<typeof setTimeout> | null;
    paused: boolean;
  }> = new Map();
  private lastChangeTime = 0;
  private readonly minGap = 2000; // 2s minimum between any two panel changes

  registerPanel(id: string, handler: () => void) {
    const config = panelsConfig.find((p) => p.id === id);
    if (!config) return;
    this.panels.set(id, {
      handler,
      baseInterval: config.baseInterval,
      timerId: null,
      paused: false,
    });
    this.scheduleNext(id);
  }

  unregisterPanel(id: string) {
    const panel = this.panels.get(id);
    if (panel?.timerId) clearTimeout(panel.timerId);
    this.panels.delete(id);
  }

  pausePanel(id: string) {
    const panel = this.panels.get(id);
    if (!panel) return;
    panel.paused = true;
    if (panel.timerId) {
      clearTimeout(panel.timerId);
      panel.timerId = null;
    }
  }

  resumePanel(id: string) {
    const panel = this.panels.get(id);
    if (!panel) return;
    panel.paused = false;
    this.scheduleNext(id);
  }

  private scheduleNext(id: string) {
    const panel = this.panels.get(id);
    if (!panel || panel.paused) return;
    if (panel.timerId) clearTimeout(panel.timerId);

    // Add ±1000ms random variation
    const variation = (Math.random() - 0.5) * 2000;
    let delay = panel.baseInterval + variation;

    // Enforce minimum gap from last global change
    const now = Date.now();
    const elapsed = now - this.lastChangeTime;
    if (elapsed < this.minGap) {
      delay += this.minGap - elapsed + Math.random() * 500;
    }

    panel.timerId = setTimeout(() => {
      if (panel.paused) return;

      // Check collision with any other in-flight change
      const now2 = Date.now();
      if (now2 - this.lastChangeTime < this.minGap) {
        // Defer by a small random amount
        this.scheduleNext(id);
        return;
      }

      this.lastChangeTime = now2;
      panel.handler();
      this.scheduleNext(id);
    }, Math.max(delay, 3000)); // minimum 3s absolute
  }

  destroy() {
    this.panels.forEach((panel) => {
      if (panel.timerId) clearTimeout(panel.timerId);
    });
    this.panels.clear();
  }
}

/* ================================================================
   HERO COMPONENT
   ================================================================ */

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const heroLogoRef = useRef<HTMLDivElement>(null);
  const categoryNavRef = useRef<HTMLElement>(null);
  const [isIntroSkipped, setIsIntroSkipped] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredPanel, setHoveredPanel] = useState<string | null>(null);
  const schedulerRef = useRef<SlideshowScheduler | null>(null);

  // Create scheduler once
  useEffect(() => {
    schedulerRef.current = new SlideshowScheduler();
    return () => {
      schedulerRef.current?.destroy();
    };
  }, []);

  // Detect intro-skipped state
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('hasVisitedIntro')) {
      setIsIntroSkipped(true);
    }
  }, []);

  // Stats counter animation
  useEffect(() => {
    const isSkipped =
      typeof window !== 'undefined' && !!sessionStorage.getItem('hasVisitedIntro');
    const delay = isSkipped
      ? 300
      : typeof window !== 'undefined' && window.innerWidth < 768
        ? 2800
        : 3200;

    const timer = setTimeout(() => {
      const statElements = document.querySelectorAll('.hero-va-stat-number');
      statElements.forEach((el) => {
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const isFloat = el.getAttribute('data-float') === 'true';
        const valEl = el.querySelector('.hero-va-stat-num-val');
        if (!valEl) return;

        const duration = 2000;
        const startTime = performance.now();

        const update = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = progress * (2 - progress);
          const count = easeProgress * target;
          valEl.textContent = isFloat ? count.toFixed(1) : Math.floor(count).toString();

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            valEl.textContent = isFloat ? target.toFixed(1) : target.toString();
          }
        };

        requestAnimationFrame(update);
      });
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  // Scroll-activated floating pill navigation:
  // Hidden in hero, slides into view when hero leaves viewport
  useEffect(() => {
    const categoryNav = categoryNavRef.current;
    const hero = heroRef.current;
    if (!categoryNav || !hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Hero is out of view → show nav
          categoryNav.classList.add('nav-visible');
        } else {
          // Hero is in view → hide nav
          categoryNav.classList.remove('nav-visible');
        }
      },
      { threshold: 0, rootMargin: '-80px' }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Hero logo fade on scroll
  useEffect(() => {
    const logo = heroLogoRef.current;
    const hero = heroRef.current;
    if (!logo || !hero) return;

    const handleScroll = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, (heroBottom - windowHeight * 0.6) / (windowHeight * 0.2))
      );
      logo.style.opacity = progress.toString();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseDelay = isIntroSkipped ? 0.1 : 2.8;

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        className={isIntroSkipped ? 'intro-skipped' : ''}
        style={{
          backgroundColor: '#FAFAF8',
          width: '100%',
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* ===== HERO LOGO ===== */}
        <div
          ref={heroLogoRef}
          className="hero-logo-container"
          style={{
            position: 'absolute',
            top: 'clamp(1.2rem, 2.2vw, 2rem)',
            left: 'clamp(1.5rem, 4%, 3rem)',
            zIndex: 15,
            opacity: 0,
            animation: `heroFadeIn 0.6s ease-out ${baseDelay + 0.6}s forwards`,
          }}
        >
          <Image
            src="/images/VA LOGO Full.png"
            alt="Vision Architecture"
            width={180}
            height={45}
            priority
            style={{ width: 'clamp(130px, 12vw, 175px)', height: 'auto' }}
          />
        </div>

        {/* ===== FLOATING PILL NAVIGATION — hidden in hero, appears on scroll ===== */}
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
              window.dispatchEvent(
                new CustomEvent('start-page-transition', {
                  detail: { href: '/architecture', title: 'Architecture' },
                })
              );
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
              window.dispatchEvent(
                new CustomEvent('start-page-transition', {
                  detail: { href: '/interior-design', title: 'Interior Design' },
                })
              );
            }}
          >
            INTERIOR DESIGN
          </Link>
          <div className="custom-nav-divider">·</div>
          <Link
            href="/hospitality-architecture"
            className="custom-nav-item"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(
                new CustomEvent('start-page-transition', {
                  detail: {
                    href: '/hospitality-architecture',
                    title: 'Hospitality Architecture',
                  },
                })
              );
            }}
          >
            HOSPITALITY
          </Link>
          <div className="custom-nav-divider">·</div>
          <Link
            href="/renovation"
            className="custom-nav-item"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(
                new CustomEvent('start-page-transition', {
                  detail: { href: '/renovation', title: 'Renovation & Planning' },
                })
              );
            }}
          >
            RENOVATION
          </Link>

          {/* Mobile Hamburger */}
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
        <div
          className={`hero-mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        >
          <div className="hero-mobile-menu-content">
            <Link
              href="/architecture"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                window.dispatchEvent(
                  new CustomEvent('start-page-transition', {
                    detail: { href: '/architecture', title: 'Architecture' },
                  })
                );
              }}
            >
              ARCHITECTURE
            </Link>
            <Link
              href="/interior-design"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                window.dispatchEvent(
                  new CustomEvent('start-page-transition', {
                    detail: { href: '/interior-design', title: 'Interior Design' },
                  })
                );
              }}
            >
              INTERIOR DESIGN
            </Link>
            <Link
              href="/hospitality-architecture"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                window.dispatchEvent(
                  new CustomEvent('start-page-transition', {
                    detail: {
                      href: '/hospitality-architecture',
                      title: 'Hospitality Architecture',
                    },
                  })
                );
              }}
            >
              HOSPITALITY
            </Link>
            <Link
              href="/renovation"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                window.dispatchEvent(
                  new CustomEvent('start-page-transition', {
                    detail: { href: '/renovation', title: 'Renovation & Planning' },
                  })
                );
              }}
            >
              RENOVATION
            </Link>
          </div>
        </div>

        {/* ===== SPLIT HERO MAIN ===== */}
        <div className="hero-split-container">
          {/* LEFT COLUMN */}
          <div className="hero-left-col">
            <div className="hero-left-inner">
              {/* Eyebrow */}
              <div
                className="hero-eyebrow"
                style={{
                  opacity: 0,
                  transform: 'translateY(16px)',
                  animation: `heroSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) ${baseDelay}s forwards`,
                }}
              >
                <span className="hero-eyebrow-text">
                 <strong>WHERE VISION MEETS PRECISION</strong>
                </span>
                <span className="hero-eyebrow-line"></span>
              </div>

              {/* Headline */}
              <h1 className="hero-headline">
                <span
                  className="hero-headline-line"
                  style={{
                    opacity: 0,
                    transform: 'translateY(24px)',
                    animation: `heroSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) ${baseDelay + 0.15}s forwards`,
                  }}
                >
                  DESIGNING SPACES
                </span>
                <span
                  className="hero-headline-line"
                  style={{
                    opacity: 0,
                    transform: 'translateY(24px)',
                    animation: `heroSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) ${baseDelay + 0.3}s forwards`,
                  }}
                >
                  THAT <span className="hero-highlight-red">INSPIRE.</span>
                </span>
              </h1>

              {/* Paragraph */}
              <p
                className="hero-paragraph"
                style={{
                  opacity: 0,
                  transform: 'translateY(16px)',
                  animation: `heroSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) ${baseDelay + 0.45}s forwards`,
                }}
              >
                Vision Architecture delivers premier architecture, interior
                design, hospitality and renovation solutions across Ahmedabad
                and Gujarat. We create purposeful, timeless and sustainable
                environments crafted with structural precision.
              </p>

              {/* CTAs */}
              <div
                className="hero-ctas"
                style={{
                  opacity: 0,
                  transform: 'translateY(14px)',
                  animation: `heroSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${baseDelay + 0.6}s forwards`,
                }}
              >
                <a href="#speciality" className="hero-cta-primary">
                  <span><strong>Explore Projects</strong></span>
                  <svg
                    className="hero-cta-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <a href="#contact" className="hero-cta-secondary">
                  <span><strong>Book Consultation</strong></span>
                  <svg
                    className="hero-cta-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Desktop Four Panels */}
          <div
            className="hero-right-col"
            style={{
              opacity: 0,
              transform: 'translateY(24px)',
              animation: `heroSlideUp 0.9s cubic-bezier(0.16,1,0.3,1) ${baseDelay + 0.25}s forwards`,
            }}
          >
            <div className="hero-panels-composition">
              {panelsConfig.map((panel, idx) => {
                const isHovered = hoveredPanel === panel.id;
                const isOtherHovered =
                  hoveredPanel !== null && !isHovered;

                // Panel-specific breathing keyframe name
                const breathKeyframe = `panelBreathe${idx}`;

                return (
                  <Link
                    key={panel.id}
                    href={panel.href}
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(
                        new CustomEvent('start-page-transition', {
                          detail: {
                            href: panel.href,
                            title: panel.transitionTitle,
                          },
                        })
                      );
                    }}
                    className={`hero-specialty-panel ${isHovered ? 'hovered' : ''} ${isOtherHovered ? 'dimmed' : ''}`}
                    onMouseEnter={() => setHoveredPanel(panel.id)}
                    onMouseLeave={() => setHoveredPanel(null)}
                    style={{
                      animationName: breathKeyframe,
                      animationDuration: `${panel.breathDuration}s`,
                      animationTimingFunction: 'ease-in-out',
                      animationIterationCount: 'infinite',
                      animationDelay: `${-idx * 1.7}s`,
                    }}
                    aria-label={`Explore ${panel.title}`}
                  >
                    <PanelImageSlideshow
                      images={panel.images}
                      panelId={panel.id}
                      isHovered={isHovered}
                      schedulerRef={schedulerRef}
                    />

                    {/* Gradient overlay for text legibility */}
                    <div className="hero-panel-overlay" />

                    {/* Panel label */}
                    <div className="hero-panel-footer">
                      <div className="hero-panel-title-wrap">
                        <span className="hero-panel-title">
                          {panel.title}
                        </span>
                        <div className="hero-panel-explore">
                          <span>Explore</span>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===== BOTTOM STATISTICS STRIP ===== */}
        <div
          className="hero-stats-bar"
          style={{
            opacity: 0,
            transform: 'translateY(16px)',
            animation: `heroSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) ${baseDelay + 0.7}s forwards`,
          }}
        >
          <div className="hero-stats-inner">
            {statsData.map((stat, index) => (
              <div key={index} className="hero-stat-item">
                <div
                  className="hero-va-stat-number"
                  data-target={stat.target}
                  data-float={stat.isFloat ? 'true' : 'false'}
                >
                  <span className="hero-va-stat-num-val">{stat.isFloat ? '0.0' : '0'}</span>
                  {stat.unit && <span className="hero-va-stat-unit">{stat.unit}</span>}
                  <span className="hero-va-stat-suffix">{stat.suffix}</span>
                </div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
         STYLES
         ================================================================ */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* ===== Keyframes ===== */
          @keyframes heroSlideUp {
            0%   { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes heroFadeIn {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }

          /* Per-panel breathing keyframes.
             Each incorporates the resting offset so the alternating
             composition (-18 / +18) is ALWAYS visible.
             Panels 0 & 2: upper pair  → rest at -18px, breathe -23px to -13px
             Panels 1 & 3: lower pair  → rest at +18px, breathe +13px to +23px
          */
          @keyframes panelBreathe0 {
            0%, 100% { transform: translateY(-18px); }
            50%      { transform: translateY(-23px); }
          }
          @keyframes panelBreathe1 {
            0%, 100% { transform: translateY(18px); }
            50%      { transform: translateY(13px); }
          }
          @keyframes panelBreathe2 {
            0%, 100% { transform: translateY(-18px); }
            50%      { transform: translateY(-13px); }
          }
          @keyframes panelBreathe3 {
            0%, 100% { transform: translateY(18px); }
            50%      { transform: translateY(23px); }
          }

          /* Crisp image transition – opacity only, no scale to avoid GPU softness */
          @keyframes panelImgEnter {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }

          /* ===== Pill Navigation ===== */
          @keyframes navSlideDown {
            0%   { transform: translate(-50%, -100%); opacity: 0; }
            100% { transform: translate(-50%, 0); opacity: 1; }
          }
          @keyframes mobileSlideDown {
            0%   { transform: translateY(-100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }

          /* ===== Split Container ===== */
          .hero-split-container {
            display: flex;
            flex-direction: row;
            width: 100%;
            flex: 1;
            min-height: 0;
            align-items: center;
            padding-top: clamp(2rem, 3.5vh, 3.5rem);
            padding-bottom: 0;
          }

          /* ===== LEFT COLUMN ===== */
          .hero-left-col {
            width: 42%;
            display: flex;
            align-items: center;
            position: relative;
            z-index: 5;
          }
          .hero-left-inner {
            padding: 0 clamp(1.8rem, 4vw, 4.2rem);
            width: 100%;
            max-width: 620px;
            margin-left: auto;
          }
          .hero-eyebrow {
            display: flex;
            align-items: center;
            gap: 0.9rem;
            margin-bottom: clamp(1.2rem, 2vh, 1.8rem);
          }
          .hero-eyebrow-text {
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(0.62rem, 0.78vw, 0.82rem);
            letter-spacing: 0.22em;
            color: #8B2635;
            text-transform: uppercase;
            font-weight: 400;
            white-space: nowrap;
          }
          .hero-eyebrow-line {
            display: block;
            width: clamp(2rem, 3.5vw, 3.5rem);
            height: 1.5px;
            background-color: #8B2635;
            flex-shrink: 0;
          }
          .hero-headline {
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(2.1rem, 3.6vw, 3.8rem);
            line-height: 1.12;
            color: #2f3440;
            font-weight: bold;
            margin: 0 0 clamp(1rem, 1.8vh, 1.6rem) 0;
            display: flex;
            flex-direction: column;
            letter-spacing: -0.01em;
          }
          .hero-headline-line { display: block; }
          .hero-highlight-red { color: #8B2635; }

          .hero-paragraph {
            font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: clamp(0.85rem, 0.95vw, 1.02rem);
            line-height: 1.7;
            color: rgba(47, 52, 64, 0.72);
            font-weight: 300;
            letter-spacing: 0.01em;
            margin: 0 0 clamp(1.5rem, 2.5vh, 2.2rem) 0;
            max-width: 470px;
          }
          .hero-ctas {
            display: flex;
            align-items: center;
            gap: clamp(0.85rem, 1.2vw, 1.3rem);
            flex-wrap: wrap;
          }
          .hero-cta-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.55rem;
            padding: clamp(0.72rem, 0.95vw, 0.88rem) clamp(1.4rem, 2vw, 2.1rem);
            background-color: #8B2635;
            color: #f9f9f9;
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(0.65rem, 0.75vw, 0.8rem);
            letter-spacing: 0.15em;
            text-transform: uppercase;
            text-decoration: none;
            border: none;
            border-radius: 2px;
            cursor: pointer;
            transition: background-color 0.35s ease, transform 0.25s ease, box-shadow 0.35s ease;
            font-weight: 400;
          }
          .hero-cta-primary:hover {
            background-color: #722030;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(139, 38, 53, 0.25);
          }
          .hero-cta-primary .hero-cta-arrow,
          .hero-cta-secondary .hero-cta-arrow {
            transition: transform 0.3s ease;
          }
          .hero-cta-primary:hover .hero-cta-arrow,
          .hero-cta-secondary:hover .hero-cta-arrow {
            transform: translateX(4px);
          }
          .hero-cta-secondary {
            display: inline-flex;
            align-items: center;
            gap: 0.55rem;
            padding: clamp(0.72rem, 0.95vw, 0.88rem) clamp(1.4rem, 2vw, 2.1rem);
            background: transparent;
            color: #2f3440;
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(0.65rem, 0.75vw, 0.8rem);
            letter-spacing: 0.15em;
            text-transform: uppercase;
            text-decoration: none;
            border: 1px solid #2f3440;
            border-radius: 2px;
            cursor: pointer;
            transition: color 0.3s ease, border-color 0.3s ease, transform 0.25s ease;
            font-weight: 400;
          }
          .hero-cta-secondary:hover {
            color: #8B2635;
            border-color: #8B2635;
            transform: translateY(-2px);
          }

          /* ===== RIGHT COLUMN — FOUR PANELS ===== */
          .hero-right-col {
            width: 58%;
            height: 100%;
            position: relative;
            padding-right: clamp(1.5rem, 4vw, 4rem);
            display: flex;
            align-items: center;
          }
          .hero-panels-composition {
            display: flex;
            flex-direction: row;
            gap: clamp(0.6rem, 1.1vw, 1.2rem);
            width: 100%;
            height: clamp(500px, 70vh, 680px);
            align-items: center;
          }
          .hero-specialty-panel {
            flex: 1;
            height: 100%;
            position: relative;
            border-radius: 0;
            overflow: hidden;
            text-decoration: none;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
            transition: flex 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                        filter 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                        box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                        opacity 0.5s ease;
          }
          .hero-specialty-panel.hovered {
            flex: 1.3;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.16);
            animation-play-state: paused !important;
            z-index: 10;
          }
          .hero-specialty-panel.dimmed {
            filter: brightness(0.88);
            opacity: 0.9;
          }

          /* ===== Panel Image ===== */
          .hero-panel-img-container {
            width: 100%;
            height: 100%;
            position: relative;
          }
          .hero-panel-img {
            object-fit: cover;
          }
          .hero-img-active {
            opacity: 1;
          }
          .hero-img-exiting {
            opacity: 0;
          }
          .hero-img-entering {
            animation: panelImgEnter 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          /* ===== Panel Overlay ===== */
          .hero-panel-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to top,
              rgba(29, 32, 37, 0.85) 0%,
              rgba(29, 32, 37, 0.25) 40%,
              rgba(29, 32, 37, 0) 70%
            );
            transition: background 0.4s ease;
            z-index: 2;
          }
          .hero-specialty-panel.hovered .hero-panel-overlay {
            background: linear-gradient(
              to top,
              rgba(29, 32, 37, 0.92) 0%,
              rgba(29, 32, 37, 0.4) 45%,
              rgba(29, 32, 37, 0.08) 78%
            );
          }

          /* ===== Panel Footer ===== */
          .hero-panel-footer {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: clamp(1rem, 1.6vw, 1.5rem) clamp(0.75rem, 1.2vw, 1.2rem);
            z-index: 3;
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            color: #FAFAF8;
          }
          .hero-panel-title-wrap {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }
          .hero-panel-title {
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(0.68rem, 0.82vw, 0.92rem);
            letter-spacing: 0.12em;
            font-weight: 500;
            text-transform: uppercase;
            line-height: 1.25;
            color: #FAFAF8;
            transition: color 0.3s ease;
          }
          .hero-specialty-panel.hovered .hero-panel-title {
            color: #fff;
          }
          .hero-panel-explore {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-family: 'Satoshi', sans-serif;
            font-size: clamp(0.62rem, 0.72vw, 0.78rem);
            letter-spacing: 0.1em;
            color: rgba(250, 250, 248, 0.85);
            text-transform: uppercase;
            opacity: 0;
            transform: translateY(6px);
            transition: opacity 0.35s ease, transform 0.35s ease;
          }
          .hero-specialty-panel.hovered .hero-panel-explore {
            opacity: 1;
            transform: translateY(0);
          }
          .hero-panel-explore svg {
            transition: transform 0.3s ease;
          }
          .hero-specialty-panel.hovered .hero-panel-explore svg {
            transform: translateX(3px);
          }

          /* ===== Stats Strip ===== */
          .hero-stats-bar {
            width: 100%;
            background-color: #FAFAF8;
            border-top: 1px solid rgba(47, 52, 64, 0.12);
            padding: clamp(0.8rem, 1.5vh, 1.4rem) 5%;
            z-index: 10;
            flex-shrink: 0;
          }
          .hero-stats-inner {
            max-width: 1300px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .hero-stat-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0 1rem;
            position: relative;
            text-align: center;
          }
          .hero-stat-item:not(:last-child)::after {
            content: '';
            position: absolute;
            right: 0;
            top: 15%;
            height: 70%;
            width: 1px;
            background: rgba(47, 52, 64, 0.14);
          }
          .hero-va-stat-number {
            font-family: var(--font-bank-gothic), 'Bank Gothic', sans-serif;
            font-size: clamp(1.8rem, 2.8vw, 3.2rem);
            line-height: 1;
            color: #2f3440;
            letter-spacing: -0.02em;
            display: flex;
            align-items: baseline;
            gap: 0.05em;
            white-space: nowrap;
          }
          .hero-va-stat-num-val {
            font-family: inherit;
            font-size: inherit;
          }
          .hero-va-stat-unit {
            font-family: inherit;
            font-size: 0.65em;
            color: #2f3440;
            letter-spacing: -0.01em;
          }
          .hero-va-stat-suffix {
            font-family: inherit;
            font-size: 0.52em;
            color: #8B2635;
          }
          .hero-stat-label {
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(0.58rem, 0.72vw, 0.78rem);
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(47, 52, 64, 0.65);
            margin-top: 0.4rem;
            font-weight: 400;
            white-space: nowrap;
          }

          /* ===== FLOATING PILL NAVIGATION ===== */
          .custom-category-nav {
            display: flex;
            gap: 1.5rem;
            align-items: center;
            position: fixed;
            top: 15px;
            left: 50%;
            transform: translate(-50%, -100%);
            background: rgba(255, 255, 255, 0.95);
            padding: 1rem 2rem;
            border-radius: 50px;
            box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08);
            backdrop-filter: blur(12px);
            z-index: 100;
            opacity: 0;
            pointer-events: none;
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                        opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .custom-category-nav.nav-visible {
            transform: translate(-50%, 0);
            opacity: 1;
            pointer-events: auto;
          }
          .custom-nav-item {
            font-family: var(--font-telegrafico);
            text-decoration: none;
            color: #2f3440;
            font-weight: 600;
            font-size: clamp(0.8rem, 1.1vw, 1rem);
            letter-spacing: 0.1em;
            transition: color 0.3s ease;
            white-space: nowrap;
          }
          .custom-nav-item:hover {
            color: #8B2635;
          }
          .custom-nav-divider {
            color: #2f3440;
            font-size: 1.2rem;
            opacity: 0.35;
          }

          /* ===== HAMBURGER — hidden on desktop ===== */
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
            z-index: 104;
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

          /* ===== MOBILE OVERLAY MENU ===== */
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
            transition: opacity 0.4s ease, transform 0.4s ease, color 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
          }
          .hero-mobile-menu-overlay.open .hero-mobile-menu-content a {
            opacity: 1;
            transform: translateY(0);
          }
          .hero-mobile-menu-overlay.open .hero-mobile-menu-content a:nth-child(1) { transition-delay: 0.1s; }
          .hero-mobile-menu-overlay.open .hero-mobile-menu-content a:nth-child(2) { transition-delay: 0.2s; }
          .hero-mobile-menu-overlay.open .hero-mobile-menu-content a:nth-child(3) { transition-delay: 0.3s; }
          .hero-mobile-menu-overlay.open .hero-mobile-menu-content a:nth-child(4) { transition-delay: 0.4s; }
          .hero-mobile-menu-content a:hover { color: #8B2635; }

          /* ===== PREFERS REDUCED MOTION ===== */
          @media (prefers-reduced-motion: reduce) {
            .hero-specialty-panel {
              animation: none !important;
            }
            .hero-panel-img {
              transition: opacity 0.3s ease !important;
            }
            .hero-img-entering {
              animation: none !important;
              opacity: 1 !important;
            }
          }

          /* ===== TABLET — max 1024px ===== */
          @media (max-width: 1024px) {
            .hero-left-col { width: 44%; }
            .hero-right-col { width: 56%; padding-right: 2rem; }
            .hero-headline { font-size: clamp(1.8rem, 3.8vw, 3rem); }
            .hero-paragraph { font-size: clamp(0.82rem, 1.2vw, 0.95rem); }
            .hero-left-inner { padding: 0 clamp(1.2rem, 3vw, 2.5rem); }
            .hero-panels-composition { height: clamp(400px, 58vh, 520px); }
          }

          /* ===== MOBILE NAV — max 768px ===== */
          @media (max-width: 768px) {
            .custom-category-nav {
              position: fixed !important;
              top: 15px !important;
              right: 15px !important;
              left: auto !important;
              transform: none !important;
              padding: 1rem;
              background: rgba(255, 255, 255, 0.95);
              border-radius: 50%;
              width: 50px;
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
              z-index: 1000;
              opacity: 0;
              pointer-events: none;
            }
            .custom-category-nav.nav-visible {
              transform: none !important;
              opacity: 1;
              pointer-events: auto;
              animation: mobileSlideDown 0.4s ease-out forwards;
            }
            .custom-nav-item, .custom-nav-divider {
              display: none !important;
            }
            .hero-mobile-hamburger {
              display: flex;
            }
          }

          /* ===== MOBILE LAYOUT — max 900px ===== */
          @media (max-width: 900px) {
            #hero {
              height: auto !important;
              min-height: 100vh !important;
            }
            .hero-split-container {
              flex-direction: column;
              padding-top: 5rem;
              padding-bottom: 1rem;
            }
            .hero-left-col {
              width: 100%;
              padding: 2rem 0 1rem;
            }
            .hero-left-inner {
              padding: 0 6%;
              max-width: 100%;
              margin: 0;
            }
            /* HIDE FOUR PANELS ON MOBILE */
            .hero-right-col {
              display: none !important;
            }
            .hero-headline {
              font-size: clamp(2.2rem, 9vw, 3.2rem);
            }
            .hero-paragraph {
              font-size: 0.94rem;
              max-width: 100%;
              margin-bottom: 2rem;
            }
            .hero-ctas {
              margin-bottom: 0;
            }
            .hero-stats-bar {
              margin-top: auto;
            }
            .hero-stats-inner {
              flex-wrap: wrap;
              gap: 1.2rem 0;
            }
            .hero-stat-item {
              flex: 0 0 50%;
              padding: 0.5rem;
            }
            .hero-stat-item:not(:last-child)::after {
              display: none;
            }
            .hero-va-stat-number {
              font-size: clamp(1.8rem, 6vw, 2.4rem) !important;
            }
            .hero-stat-label {
              font-size: clamp(0.55rem, 2vw, 0.68rem);
            }
            .hero-logo-container {
              z-index: 15;
            }
          }
        `,
        }}
      />
    </>
  );
}
