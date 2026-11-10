'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DigitalCredit from '@/components/ui/DigitalCredit';
import FloatingActions from '@/components/ui/FloatingActions';
import staticDimensions from '@/lib/constants/imageDimensions.json';

interface ProjectCard {
  images: string[];
  coverImage?: string;
  alt: string;
  title: string;
  description: string;
  tags: string[];
}

// Navigation order for service page switching
const SERVICE_PAGES = [
  { href: '/architecture', label: 'Architecture' },
  { href: '/hospitality-architecture', label: 'Hospitality Architecture' },
  { href: '/interior-design', label: 'Interior Design' },
  { href: '/renovation', label: 'Renovation & Planning' },
];

interface SpecialityPageProps {
  heroTitle: string;
  heroSubtitle: string;
  heroBackground: string;
  introHeading: string;
  introParagraphs: string[];
  projects: ProjectCard[];
  ctaHeading: string;
  ctaText: string;
}

export default function SpecialityPage({
  heroTitle,
  heroSubtitle,
  heroBackground,
  introHeading,
  introParagraphs,
  projects,
  ctaHeading,
  ctaText,
}: SpecialityPageProps) {
  // --- Lightbox State & 3-Image Horizontal Sliding Gallery ---
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev' | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  const isSlidingRef = useRef(false);

  // Dynamic image dimensions cache & measurement
  const [imageDimensions, setImageDimensions] = useState<Record<string, { width: number; height: number }>>({});
  const [viewportSize, setViewportSize] = useState({ width: 1200, height: 800 });

  const recordDimensions = useCallback((src: string, width: number, height: number) => {
    if (!src || !width || !height) return;
    setImageDimensions((prev) => {
      if (prev[src]?.width === width && prev[src]?.height === height) return prev;
      return { ...prev, [src]: { width, height } };
    });
  }, []);

  const getImageDimensions = useCallback(
    (src: string): { width: number; height: number } | undefined => {
      if (!src) return undefined;
      return (staticDimensions as Record<string, { width: number; height: number }>)[src] || imageDimensions[src];
    },
    [imageDimensions]
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const updateSize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [lightboxOpen]);

  // Swipe support state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 45;

  const openLightbox = (projectIndex: number) => {
    setActiveProjectIndex(projectIndex);
    setActiveImageIndex(0);
    setSlideDirection(null);
    setIsSliding(false);
    isSlidingRef.current = false;
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSlideDirection(null);
    setIsSliding(false);
    isSlidingRef.current = false;
    document.body.style.overflow = '';
  };

  const currentProject = projects[activeProjectIndex];
  const currentImages = currentProject?.images || [];

  const handleNext = useCallback(() => {
    if (currentImages.length <= 1 || isSlidingRef.current) return;
    isSlidingRef.current = true;
    setSlideDirection('next');
    setIsSliding(true);
  }, [currentImages.length]);

  const handlePrev = useCallback(() => {
    if (currentImages.length <= 1 || isSlidingRef.current) return;
    isSlidingRef.current = true;
    setSlideDirection('prev');
    setIsSliding(true);
  }, [currentImages.length]);

  // Complete sliding animation at 400ms
  useEffect(() => {
    if (!isSliding || !slideDirection) return;

    const timer = setTimeout(() => {
      if (slideDirection === 'next') {
        setActiveImageIndex((prev) => (prev + 1) % currentImages.length);
      } else if (slideDirection === 'prev') {
        setActiveImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
      }
      setIsSliding(false);
      setSlideDirection(null);
      isSlidingRef.current = false;
    }, 400);

    return () => clearTimeout(timer);
  }, [isSliding, slideDirection, currentImages.length]);

  // Preload immediate adjacent images
  useEffect(() => {
    if (!lightboxOpen || currentImages.length <= 1) return;

    const toPreload = [
      (activeImageIndex + 1) % currentImages.length,
      (activeImageIndex - 1 + currentImages.length) % currentImages.length,
      (activeImageIndex + 2) % currentImages.length,
    ];

    toPreload.forEach((idx) => {
      const src = currentImages[idx];
      if (src && typeof window !== 'undefined') {
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
          recordDimensions(src, img.naturalWidth, img.naturalHeight);
        };
        if ('decode' in img) {
          img.decode().catch(() => {});
        }
      }
    });
  }, [lightboxOpen, activeImageIndex, currentImages]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, handleNext, handlePrev]);

  // Extract clean project title and category metadata
  const getProjectDisplayMeta = (project?: ProjectCard) => {
    if (!project) return { title: '', category: '' };
    const rawTitle = project.title || '';
    const separators = [' – ', ' — ', ' - '];

    for (const sep of separators) {
      if (rawTitle.includes(sep)) {
        const parts = rawTitle.split(sep);
        return {
          title: parts[0].trim(),
          category: parts.slice(1).join(sep).trim().toUpperCase(),
        };
      }
    }

    const category = project.tags && project.tags.length > 0
      ? project.tags.slice(0, 2).join(' • ').toUpperCase()
      : (heroTitle || 'VISION ARCHITECTURE').toUpperCase();

    return {
      title: rawTitle.trim(),
      category,
    };
  };

  const projectMeta = getProjectDisplayMeta(currentProject);

  // Proportional sizing & viewport geometry for natural aspect ratios
  const isMobile = viewportSize.width <= 768;
  const headerH = isMobile ? 60 : 75;
  const footerH = isMobile ? 95 : 105;
  const verticalPadding = isMobile ? 20 : 36;

  const maxAvailableHeight = Math.max(260, viewportSize.height - headerH - footerH - verticalPadding);
  const maxAvailableWidth = isMobile
    ? Math.round(viewportSize.width * 0.90)
    : Math.min(Math.round(viewportSize.width * 0.78), 1280);
  const cardGap = isMobile ? 16 : 28;

  const computeCardSize = useCallback(
    (dim: { width: number; height: number } | undefined) => {
      if (!dim || !dim.width || !dim.height) {
        const fallbackH = Math.min(maxAvailableHeight, 600);
        const fallbackW = Math.min(maxAvailableWidth, Math.round(fallbackH * (16 / 9)));
        return { width: fallbackW, height: fallbackH };
      }

      const scaleW = maxAvailableWidth / dim.width;
      const scaleH = maxAvailableHeight / dim.height;
      // Proportional scale down only; no unnecessary upscaling beyond natural resolution
      const scale = Math.min(scaleW, scaleH, 1.0);

      return {
        width: Math.max(120, Math.round(dim.width * scale)),
        height: Math.max(120, Math.round(dim.height * scale)),
      };
    },
    [maxAvailableWidth, maxAvailableHeight]
  );

  const slotOffsets = [-2, -1, 0, 1, 2];
  const slotCards = slotOffsets.map((offset) => {
    const imgIndex = (activeImageIndex + offset + currentImages.length * 100) % currentImages.length;
    const src = currentImages[imgIndex];
    const dim = getImageDimensions(src);
    const size = computeCardSize(dim);
    return {
      offset,
      imgIndex,
      src,
      width: size.width,
      height: size.height,
    };
  });

  const cFarPrev = slotCards[0];
  const cPrev = slotCards[1];
  const c0 = slotCards[2];
  const cNext = slotCards[3];
  const cFarNext = slotCards[4];

  // Positions relative to center (c0 is at 0):
  const cPrevX = - (c0.width / 2 + cardGap + cPrev.width / 2);
  const cFarPrevX = cPrevX - (cPrev.width / 2 + cardGap + cFarPrev.width / 2);
  const cNextX = c0.width / 2 + cardGap + cNext.width / 2;
  const cFarNextX = cNextX + (cNext.width / 2 + cardGap + cFarNext.width / 2);

  const cardPositions: Record<number, number> = {
    [-2]: cFarPrevX,
    [-1]: cPrevX,
    [0]: 0,
    [1]: cNextX,
    [2]: cFarNextX,
  };

  const slideNextDistance = cNextX;
  const slidePrevDistance = Math.abs(cPrevX);

  const trackTransform = isSliding
    ? slideDirection === 'next'
      ? `translate3d(-${slideNextDistance}px, 0, 0)`
      : slideDirection === 'prev'
      ? `translate3d(${slidePrevDistance}px, 0, 0)`
      : 'translate3d(0px, 0, 0)'
    : 'translate3d(0px, 0, 0)';

  const arrowPrevLeft = Math.max(isMobile ? 8 : 16, (viewportSize.width - c0.width) / 2 - 50 - (isMobile ? 8 : 18));
  const arrowNextRight = Math.max(isMobile ? 8 : 16, (viewportSize.width - c0.width) / 2 - 50 - (isMobile ? 8 : 18));

  // Auto-scroll to anchor if URL contains hash (e.g. from testimonial click)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 700); // After transition overlay finishes
      return () => clearTimeout(timer);
    }
  }, []);

  // --- Service Page Navigation ---
  const currentIndex = SERVICE_PAGES.findIndex(
    (p) => p.label.toLowerCase() === heroTitle.toLowerCase()
      || p.label === heroTitle
  );
  const prevPage = SERVICE_PAGES[(currentIndex - 1 + SERVICE_PAGES.length) % SERVICE_PAGES.length];
  const nextPage = SERVICE_PAGES[(currentIndex + 1) % SERVICE_PAGES.length];

  // Global exit transitions trigger
  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement>, href: string, title: string) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('start-page-transition', {
      detail: { href, title }
    }));
  };

  return (
    <>
      <main className="speciality-page">
        {/* Back Navigation */}
        <nav className="sp-back-nav">
          <Link 
            href="/" 
            className="logo-brand" 
            style={{
              borderRadius: '9999px',
              WebkitBackdropFilter: 'blur(10px)',
              backdropFilter: 'blur(10px)',
              justifyContent: 'center',
              alignItems: 'center',
              width: '2.5rem',
              height: '2.5rem',
              display: 'flex'
            }}
            onClick={(e) => handleTransition(e, '/', 'Vision Architecture')}
          >
            <Image
              src="/images/VA LOGO wh 2.png"
              alt="Vision Architecture"
              width={40}
              height={40}
              style={{ height: 'auto', width: 'auto' }}
            />
          </Link>
          <Link href="/" className="sp-back-btn" onClick={(e) => handleTransition(e, '/', 'Vision Architecture')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </nav>

        {/* Hero */}
        <section className="sp-case-hero">
          <div
            className="sp-case-hero-bg"
            style={{ backgroundImage: `url('${heroBackground}')` }}
          />
          <div className="sp-case-hero-content">
            <p className="sp-label">Our Speciality</p>
            <h1>{heroTitle}</h1>
            <p>{heroSubtitle}</p>
          </div>
        </section>

        {/* Intro */}
        <section className="sp-intro">
          <h2>{introHeading}</h2>
          {introParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        {/* Projects Grid */}
        <div className="sp-projects-grid">
          {projects.map((project, i) => {
            const slug = project.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '');
            return (
              <div key={i} id={slug} className="sp-project-card">
                <div className="sp-project-image-wrapper" onClick={() => openLightbox(i)}>
                  {(project.coverImage || (project.images && project.images[0])) && (
                    <Image
                    src={project.coverImage || project.images[0]}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="sp-project-image"
                  />
                )}
                <div className="sp-image-overlay">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </div>
              </div>
              <div className="sp-project-card-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="sp-project-meta">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="sp-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        </div>

        {/* CTA */}
        <section className="sp-cta">
          <div className="sp-cta-card">
            <div className="sp-cta-corner sp-cta-corner-tl" />
            <div className="sp-cta-corner sp-cta-corner-br" />
            <div className="sp-cta-content">
              <h2>{ctaHeading}</h2>
              <p>{ctaText}</p>
              <Link href="/#contact" className="sp-cta-btn">
                <span>Get in Touch</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="sp-footer">
          <div className="sp-footer-container">
            <div>
              <div className="sp-footer-logo">
                <Image
                  src="/images/VA LOGO 1.png"
                  alt="Vision Architecture"
                  width={220}
                  height={55}
                  style={{
                    height: 'auto',
                    width: 'auto',
                    maxHeight: 'clamp(2.5rem, 4.2vw, 4.8rem)',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                  priority
                />
              </div>
              <p>© 2022 - {new Date().getFullYear()} Vision Architecture</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p>info.visionarchitecture@gmail.com</p>
              <p>+91 96876 88373 | +91 73592 19598</p>
            </div>
          </div>
          <DigitalCredit variant="speciality" />
        </footer>

        {/* ===== SERVICE PAGE NAVIGATION ARROWS ===== */}
        <Link 
          href={prevPage.href} 
          className="sp-page-nav sp-page-nav-left" 
          aria-label={`Previous: ${prevPage.label}`}
          onClick={(e) => handleTransition(e, prevPage.href, prevPage.label)}
        >
          <div className="sp-page-nav-inner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            <span className="sp-page-nav-label">{prevPage.label}</span>
          </div>
        </Link>
        <Link 
          href={nextPage.href} 
          className="sp-page-nav sp-page-nav-right" 
          aria-label={`Next: ${nextPage.label}`}
          onClick={(e) => handleTransition(e, nextPage.href, nextPage.label)}
        >
          <div className="sp-page-nav-inner">
            <span className="sp-page-nav-label">{nextPage.label}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </main>

      {/* ===== LIGHTBOX MODAL — CINEMATIC 3-IMAGE GALLERY (MATCHING REFERENCE) ===== */}
      {lightboxOpen && currentProject && (
        <div
          className="sp-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${projectMeta.title} Gallery`}
        >
          {/* Top Header */}
          <header className="sp-lb-header">
            <div className="sp-lb-brand">
              <Image
                src="/images/VA LOGO wh 2.png"
                alt="Vision Architecture"
                width={140}
                height={40}
                className="sp-lb-brand-logo"
                style={{ objectFit: 'contain', height: 'auto', maxHeight: '32px' }}
                priority
              />
            </div>

            <button
              type="button"
              className="sp-lb-close"
              onClick={closeLightbox}
              aria-label="Close gallery (Esc)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span className="sp-lb-close-label">CLOSE</span>
            </button>
          </header>

          {/* Main Gallery Stage — Three-Image Horizontal Track with Natural Proportions */}
          <div
            className="sp-lb-stage"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={`sp-lb-track ${isSliding ? "is-sliding" : ""}`}
              style={{
                transform: trackTransform,
              }}
            >
              {currentImages.length === 1 ? (
                <div
                  className="sp-lb-card sp-lb-card-active"
                  style={{
                    width: c0.width,
                    height: c0.height,
                    transform: "translate3d(-50%, -50%, 0)",
                  }}
                >
                  <Image
                    src={c0.src}
                    alt={`${projectMeta.title} - View 1`}
                    width={c0.width}
                    height={c0.height}
                    priority
                    unoptimized
                    className="sp-lb-img"
                  />
                </div>
              ) : (
                slotCards.map((card) => {
                  const isCenter = card.offset === 0;
                  const isLeft = card.offset === -1;
                  const isRight = card.offset === 1;
                  const posX = cardPositions[card.offset];

                  return (
                    <div
                      key={card.offset}
                      className={`sp-lb-card ${isCenter ? "sp-lb-card-active" : "sp-lb-card-preview"}`}
                      style={{
                        width: card.width,
                        height: card.height,
                        transform: `translate3d(calc(-50% + ${posX}px), -50%, 0)`,
                      }}
                      onClick={() => {
                        if (isLeft) handlePrev();
                        if (isRight) handleNext();
                      }}
                    >
                      <Image
                        src={card.src}
                        alt={`${projectMeta.title} - View ${card.imgIndex + 1}`}
                        width={card.width}
                        height={card.height}
                        priority={isCenter}
                        loading={isCenter ? "eager" : "lazy"}
                        unoptimized
                        className="sp-lb-img"
                        onLoad={(e) => {
                          const target = e.currentTarget;
                          recordDimensions(card.src, target.naturalWidth, target.naturalHeight);
                        }}
                      />
                      {!isCenter && <div className="sp-lb-card-veil" />}
                    </div>
                  );
                })
              )}
            </div>

            {/* Circular Navigation Arrows beside Active Image */}
            {currentImages.length > 1 && (
              <>
                <button
                  type="button"
                  className="sp-lb-arrow sp-lb-arrow-prev"
                  style={{ left: arrowPrevLeft }}
                  onClick={handlePrev}
                  aria-label="Previous photograph"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="sp-lb-arrow sp-lb-arrow-next"
                  style={{ right: arrowNextRight }}
                  onClick={handleNext}
                  aria-label="Next photograph"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}
          </div>
          {/* Dedicated Bottom Information Bar (Separate, Unobstructed) */}
          <footer className="sp-lb-footer">
            <div className="sp-lb-footer-left">
              <div className="sp-lb-accent-bar" />
              <h3 className="sp-lb-project-title">{projectMeta.title}</h3>
              <p className="sp-lb-project-cat">{projectMeta.category}</p>
            </div>

            {currentImages.length > 1 && (
              <div className="sp-lb-footer-center">
                <div className="sp-lb-progress" role="tablist" aria-label="Project images">
                  {currentImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      role="tab"
                      aria-selected={idx === activeImageIndex}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`sp-lb-dash ${idx === activeImageIndex ? 'is-active' : ''}`}
                      onClick={() => {
                        if (idx === activeImageIndex || isSlidingRef.current) return;
                        if (idx === (activeImageIndex + 1) % currentImages.length) {
                          handleNext();
                        } else if (idx === (activeImageIndex - 1 + currentImages.length) % currentImages.length) {
                          handlePrev();
                        } else {
                          setActiveImageIndex(idx);
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="sp-lb-footer-right">
              <div className="sp-lb-counter">
                <span className="sp-lb-counter-current">
                  {String(activeImageIndex + 1).padStart(2, '0')}
                </span>
                <span className="sp-lb-counter-sep">/</span>
                <span className="sp-lb-counter-total">
                  {String(currentImages.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* Floating Action Buttons */}
      <FloatingActions />

      <style dangerouslySetInnerHTML={{ __html: `
        /* ===== MAIN PAGE ===== */
        .speciality-page {
          font-family: 'Inter', sans-serif;
          color: #2f3440;
          background: #f9f9f9;
          -webkit-font-smoothing: antialiased;
        }

        /* Back Nav */
        .sp-back-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 5vw;
          background: rgba(249, 249, 249, 0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        .sp-back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: #2f3440;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          transition: all 0.3s;
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
        }

        .sp-back-btn:hover {
          color: #8B2332;
          gap: 0.75rem;
        }

        .sp-back-btn svg {
          width: 16px;
          height: 16px;
          transition: transform 0.3s;
        }

        .sp-back-btn:hover svg {
          transform: translateX(-3px);
        }

        /* Hero */
        .sp-case-hero {
          height: 65vh;
          margin-top: 65px;
          background: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
          padding: 2rem 5vw;
          position: relative;
          overflow: hidden;
        }

        .sp-case-hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0.15;
        }

        .sp-case-hero-content {
          position: relative;
          z-index: 1;
        }

        .sp-label {
          text-transform: uppercase;
          letter-spacing: 0.25em;
          font-size: 0.7rem;
          opacity: 0.5;
          margin-bottom: 1.5rem;
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
        }

        .sp-case-hero h1 {
          font-size: clamp(2.2rem, 4.5vw, 4rem);
          margin-bottom: 1rem;
          letter-spacing: 0.04em;
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-weight: 400;
        }

        .sp-case-hero-content > p:last-child {
          font-size: 1.05rem;
          max-width: 560px;
          margin: 0 auto;
          opacity: 0.7;
          line-height: 1.75;
          font-weight: 300;
        }

        /* Intro */
        .sp-intro {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .sp-intro h2 {
          font-size: 1.5rem;
          margin-bottom: 1.25rem;
          color: #8B2332;
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-weight: 400;
        }

        .sp-intro p {
          font-size: 0.98rem;
          line-height: 1.85;
          color: #666;
          margin-bottom: 1rem;
          font-weight: 300;
        }

        /* ===== Projects Grid ===== */
        .sp-projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 1.5rem;
          padding: 0 5vw 4rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .sp-project-card {
          border-radius: 10px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .sp-project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
        }

        .sp-project-image-wrapper {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          height: 240px;
        }

        .sp-project-image {
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .sp-project-image-wrapper:hover .sp-project-image {
          transform: scale(1.05);
        }

        .sp-image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(47, 52, 64, 0.0);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
          z-index: 2;
        }

        .sp-image-overlay svg {
          color: #fff;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s ease;
        }

        .sp-project-image-wrapper:hover .sp-image-overlay {
          background: rgba(47, 52, 64, 0.35);
        }

        .sp-project-image-wrapper:hover .sp-image-overlay svg {
          opacity: 1;
          transform: scale(1);
        }

        .sp-project-card-body {
          padding: 1.25rem 1.5rem;
        }

        .sp-project-card-body h3 {
          font-size: 1rem;
          margin-bottom: 0.4rem;
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-weight: 400;
        }

        .sp-project-card-body p {
          font-size: 0.85rem;
          color: #888;
          line-height: 1.65;
          font-weight: 300;
        }

        .sp-project-meta {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.75rem;
          flex-wrap: wrap;
        }

        .sp-tag {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #8B2332;
          border: 1px solid rgba(139, 35, 50, 0.25);
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
        }

        /* CTA — Architectural Glassmorphism Panel */
        .sp-cta {
          padding: clamp(4.5rem, 8vw, 7.5rem) 5%;
          background: #f9f9f9;
          position: relative;
        }

        .sp-cta-card {
          max-width: 880px;
          margin: 0 auto;
          position: relative;
          background: linear-gradient(135deg, rgba(47, 52, 64, 0.95) 0%, rgba(33, 37, 46, 0.98) 100%);
          backdrop-filter: blur(24px) saturate(150%);
          -webkit-backdrop-filter: blur(24px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 1.5rem;
          padding: clamp(3.2rem, 5.5vw, 5rem) clamp(1.5rem, 4vw, 3.5rem);
          text-align: center;
          color: #fff;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.14), 0 4px 16px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .sp-cta-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        .sp-cta-corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: rgba(255, 255, 255, 0.25);
          pointer-events: none;
        }

        .sp-cta-corner-tl {
          top: 1.25rem;
          left: 1.25rem;
          border-top: 1.5px solid rgba(255, 255, 255, 0.25);
          border-left: 1.5px solid rgba(255, 255, 255, 0.25);
        }

        .sp-cta-corner-br {
          bottom: 1.25rem;
          right: 1.25rem;
          border-bottom: 1.5px solid rgba(255, 255, 255, 0.25);
          border-right: 1.5px solid rgba(255, 255, 255, 0.25);
        }

        .sp-cta-content {
          position: relative;
          z-index: 1;
        }

        .sp-cta h2 {
          font-size: clamp(1.6rem, 2.5vw, 2.3rem);
          margin-bottom: 0.85rem;
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-weight: 400;
          letter-spacing: 0.02em;
          color: #ffffff;
        }

        .sp-cta p {
          max-width: 500px;
          margin: 0 auto 2.2rem;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.75;
          font-weight: 300;
          font-size: clamp(0.88rem, 1vw, 1.05rem);
          font-family: 'Satoshi', sans-serif;
        }

        .sp-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          text-decoration: none;
          text-transform: uppercase;
          font-size: clamp(0.65rem, 0.75vw, 0.75rem);
          letter-spacing: 0.2em;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
        }

        .sp-cta-btn:hover {
          background: #8B2635;
          border-color: #8B2635;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(139, 38, 53, 0.28);
        }

        .sp-cta-btn svg {
          transition: transform 0.3s ease;
        }

        .sp-cta-btn:hover svg {
          transform: translateX(3px);
        }

        /* Footer */
        .sp-footer {
          background: #f8f8f8;
          padding: 6rem 5%;
          border-top: 1px solid #eee;
        }

        .sp-footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .sp-footer-logo {
          display: block;
        }

        .sp-footer p {
          font-size: clamp(0.95rem, 1.25vw, 1.35rem);
          color: #2f3440d9;
          margin-top: 0.6rem;
          line-height: 1.6;
          font-family: 'Satoshi', sans-serif;
          font-weight: 300;
          letter-spacing: 0.03em;
        }

        /* ===== SERVICE PAGE NAV ARROWS ===== */
        .sp-page-nav {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          z-index: 90;
          text-decoration: none;
          color: #FAFAF8; /* Cream/white text by default inside the grey tab */
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sp-page-nav-left {
          left: 0;
        }

        .sp-page-nav-right {
          right: 0;
        }

        .sp-page-nav-inner {
          display: flex;
          align-items: center;
          padding: 0.8rem 1rem;
          background: #2f3440; /* Grey/charcoal background */
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .sp-page-nav-left .sp-page-nav-inner {
          border-radius: 0 50px 50px 0;
          padding-left: 0.9rem;
        }

        .sp-page-nav-right .sp-page-nav-inner {
          border-radius: 50px 0 0 50px;
          padding-right: 0.9rem;
        }

        .sp-page-nav svg {
          width: 24px; /* Increased size to make it more visible */
          height: 24px;
          flex-shrink: 0;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .sp-page-nav-label {
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          white-space: nowrap;
          max-width: 0;
          overflow: hidden;
          opacity: 0;
          color: #FAFAF8; /* Cream text */
        }

        .sp-page-nav-left .sp-page-nav-label {
          margin-left: 0;
          transition: max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s ease 0.1s,
                      margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sp-page-nav-left:hover .sp-page-nav-label {
          max-width: 200px;
          opacity: 1;
          margin-left: 0.8rem;
        }

        .sp-page-nav-right .sp-page-nav-label {
          margin-right: 0;
          transition: max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s ease 0.1s,
                      margin-right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sp-page-nav-right:hover .sp-page-nav-label {
          max-width: 200px;
          opacity: 1;
          margin-right: 0.8rem;
        }

        .sp-page-nav:hover .sp-page-nav-inner {
          background: #8B2635; /* Grey tab turns Brand Red on hover */
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px rgba(139, 38, 53, 0.3);
        }

        .sp-page-nav-left:hover svg {
          transform: translateX(-3px);
        }

        .sp-page-nav-right:hover svg {
          transform: translateX(3px);
        }

        .sp-page-nav:hover {
          color: #FAFAF8;
        }

        /* ===== LIGHTBOX REDESIGN (CINEMATIC ARCHITECTURAL VIEWER) ===== */
        .sp-lightbox {
          position: fixed;
          inset: 0;
          z-index: 100000;
          background: #090A0D;
          background-image: radial-gradient(circle at 50% 50%, #12141A 0%, #08090C 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          user-select: none;
          animation: spLightboxFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes spLightboxFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        /* Top Header */
        .sp-lb-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: clamp(60px, 8.5vh, 85px);
          padding: 0 clamp(1.5rem, 4vw, 3.5rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 30;
          pointer-events: auto;
        }

        .sp-lb-brand {
          position: relative;
          display: inline-flex;
          flex-direction: column;
        }

        .sp-lb-brand-text {
          display: flex;
          align-items: baseline;
          gap: 9px;
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-size: clamp(0.85rem, 1vw, 1.05rem);
          letter-spacing: 0.22em;
        }

        .sp-lb-brand-main {
          color: #ffffff;
          font-weight: 400;
        }

        .sp-lb-brand-sub {
          color: rgba(255, 255, 255, 0.52);
          font-weight: 300;
        }

        .sp-lb-brand-line {
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 26px;
          height: 2px;
          background-color: #8B2635;
          border-radius: 1px;
        }
        .sp-lb-brand-logo {
          display: block;
          width: auto;
          max-height: 32px;
          opacity: 0.92;
        }

        .sp-lb-close {
          display: flex;
          align-items: center;
          gap: 9px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.75);
          padding: 8px 12px;
          border-radius: 6px;
          transition: all 0.25s ease;
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
        }

        .sp-lb-close:hover {
          color: #ffffff;
        }

        .sp-lb-close:hover svg {
          color: #8B2635;
          transform: rotate(90deg);
        }

        .sp-lb-close svg {
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .sp-lb-close-label {
          font-size: clamp(0.72rem, 0.8vw, 0.85rem);
          letter-spacing: 0.22em;
          font-weight: 400;
        }

        /* Center Stage — Horizontal Natural-Proportion Sliding Gallery */
        .sp-lb-stage {
          position: absolute;
          top: clamp(60px, 8.5vh, 85px);
          bottom: clamp(80px, 13vh, 115px);
          left: 0;
          right: 0;
          overflow: hidden;
          pointer-events: auto;
        }

        .sp-lb-track {
          position: absolute;
          inset: 0;
          will-change: transform;
        }

        .sp-lb-track.is-sliding {
          transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sp-lb-card {
          position: absolute;
          top: 50%;
          left: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 16px 50px rgba(0, 0, 0, 0.7);
          transition: opacity 0.35s ease, box-shadow 0.35s ease;
          user-select: none;
          background: transparent;
        }

        .sp-lb-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          border-radius: 12px;
        }

        .sp-lb-card-active {
          opacity: 1;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.88), 0 0 0 1px rgba(255, 255, 255, 0.06);
          z-index: 5;
        }

        .sp-lb-card-preview {
          opacity: 0.62;
          cursor: pointer;
          z-index: 2;
        }

        .sp-lb-card-preview:hover {
          opacity: 0.9;
        }

        .sp-lb-card-veil {
          position: absolute;
          inset: 0;
          background: rgba(10, 11, 14, 0.45);
          transition: background 0.3s ease;
          border-radius: 12px;
          pointer-events: none;
        }

        .sp-lb-card-preview:hover .sp-lb-card-veil {
          background: rgba(10, 11, 14, 0.2);
        }

        /* Circular Navigation Arrows */
        .sp-lb-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(18, 20, 25, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 25;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
        }

        .sp-lb-arrow:hover {
          background: #8B2635;
          border-color: #8B2635;
          box-shadow: 0 8px 30px rgba(139, 38, 53, 0.5);
          transform: translateY(-50%) scale(1.08);
        }

        .sp-lb-arrow:active {
          transform: translateY(-50%) scale(0.96);
        }
        /* Dedicated Bottom Information Bar */
        .sp-lb-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: clamp(80px, 13vh, 115px);
          padding: 0 clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 2.2vh, 2rem);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: flex-end;
          z-index: 30;
          pointer-events: auto;
        }

        .sp-lb-footer-left {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-width: 0;
        }

        .sp-lb-accent-bar {
          width: 34px;
          height: 2px;
          background-color: #8B2635;
          border-radius: 1px;
          margin-bottom: 9px;
        }

        .sp-lb-project-title {
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-size: clamp(1.15rem, 1.8vw, 1.7rem);
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0;
          font-weight: 400;
          line-height: 1.15;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sp-lb-project-cat {
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-size: clamp(0.68rem, 0.8vw, 0.82rem);
          color: rgba(255, 255, 255, 0.45);
          text-transform: uppercase;
          letter-spacing: 0.16em;
          margin: 6px 0 0 0;
          font-weight: 300;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sp-lb-footer-center {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 1rem;
        }

        .sp-lb-progress {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          max-width: 42vw;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 4px 0;
        }

        .sp-lb-progress::-webkit-scrollbar {
          display: none;
        }

        .sp-lb-dash {
          height: 2px;
          width: clamp(24px, 3.2vw, 44px);
          background: rgba(255, 255, 255, 0.16);
          border: none;
          padding: 0;
          border-radius: 1px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }

        .sp-lb-dash:hover:not(.is-active) {
          background: rgba(255, 255, 255, 0.4);
        }

        .sp-lb-dash.is-active {
          background: #8B2635;
          width: clamp(34px, 4.4vw, 56px);
        }

        .sp-lb-footer-right {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
        }

        .sp-lb-counter {
          display: flex;
          align-items: baseline;
          gap: 6px;
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-weight: 400;
          user-select: none;
        }

        .sp-lb-counter-current {
          color: #ffffff;
          font-size: clamp(1.1rem, 1.4vw, 1.4rem);
          letter-spacing: 0.08em;
        }

        .sp-lb-counter-sep {
          color: rgba(255, 255, 255, 0.3);
          font-size: clamp(0.95rem, 1.15vw, 1.2rem);
          margin: 0 1px;
        }

        .sp-lb-counter-total {
          color: rgba(255, 255, 255, 0.4);
          font-size: clamp(0.95rem, 1.15vw, 1.2rem);
          letter-spacing: 0.08em;
        }

        @media (prefers-reduced-motion: reduce) {
          .sp-lb-track.is-sliding {
            transition: none !important;
          }
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .sp-case-hero {
            height: 50vh;
          }
          .sp-projects-grid {
            grid-template-columns: 1fr;
            padding: 0 2rem 3rem;
          }
          .sp-footer-container {
            flex-direction: column;
            text-align: center;
          }
          .sp-footer-container > div:last-child {
            text-align: center !important;
          }

          /* Page nav arrows: smaller on mobile */
          .sp-page-nav-label {
            display: none !important;
          }
          .sp-page-nav-inner {
            padding: 0.6rem 0.8rem;
          }
          .sp-page-nav-left .sp-page-nav-inner {
            border-radius: 0 50px 50px 0;
            padding-left: 0.7rem;
          }
          .sp-page-nav-right .sp-page-nav-inner {
            border-radius: 50px 0 0 50px;
            padding-right: 0.7rem;
          }
          .sp-page-nav svg {
            width: 18px;
            height: 18px;
          }

          /* Lightbox mobile responsive */
          .sp-lb-arrow {
            width: 42px;
            height: 42px;
          }
          .sp-lb-header {
            height: 60px;
            padding: 0 1.25rem;
          }
          .sp-lb-brand-line {
            bottom: -4px;
            width: 22px;
          }
          .sp-lb-close {
            padding: 6px 8px;
            gap: 6px;
          }
          .sp-lb-arrow {
            width: 42px;
            height: 42px;
          }
          .sp-lb-arrow-prev {
            left: 0.75rem;
          }
          .sp-lb-arrow-next {
            right: 0.75rem;
          }
          .sp-lb-footer {
            height: auto;
            padding: 0 1.25rem 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .sp-lb-footer-left {
            width: 100%;
          }
          .sp-lb-accent-bar {
            width: 26px;
            margin-bottom: 6px;
          }
          .sp-lb-footer-center {
            width: 100%;
            justify-content: flex-start;
            padding: 0;
          }
          .sp-lb-progress {
            max-width: 100%;
          }
          .sp-lb-footer-right {
            position: absolute;
            right: 1.25rem;
            bottom: 2.2rem;
          }
          /* Mobile lightbox: show only project name */
          .sp-lb-project-cat {
            display: none;
          }
          .sp-lb-footer-right {
            display: none;
          }
          .sp-lb-accent-bar {
            display: none;
          }
          .sp-lb-brand-logo {
            max-height: 24px !important;
          }
        }
      `}} />
    </>
  );
}
