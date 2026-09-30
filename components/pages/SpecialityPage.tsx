'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DigitalCredit from '@/components/ui/DigitalCredit';
import FloatingActions from '@/components/ui/FloatingActions';

interface ProjectCard {
  images: string[];
  alt: string;
  title: string;
  description: string;
  tags: string[];
}

// Navigation order for service page switching
const SERVICE_PAGES = [
  { href: '/architecture', label: 'Architecture' },
  { href: '/interior-design', label: 'Interior Design' },
  { href: '/hospitality-architecture', label: 'Hospitality Architecture' },
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
  // --- Lightbox State ---
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Swipe support state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const openLightbox = (projectIndex: number) => {
    setActiveProjectIndex(projectIndex);
    setActiveImageIndex(0);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const currentProject = projects[activeProjectIndex];
  const currentImages = currentProject?.images || [];

  const nextImage = useCallback(() => {
    if (currentImages.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % currentImages.length);
    }
  }, [currentImages.length]);

  const prevImage = useCallback(() => {
    if (currentImages.length > 0) {
      setActiveImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
    }
  }, [currentImages.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, nextImage, prevImage]);

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
                  {project.images && project.images[0] && (
                    <Image
                    src={project.images[0]}
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

      {/* ===== LIGHTBOX MODAL ===== */}
      {lightboxOpen && currentProject && (
        <div className="sp-lightbox" onClick={closeLightbox}>
          <div 
            className="sp-lightbox-inner" 
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close */}
            <button className="sp-lightbox-close" onClick={closeLightbox} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Previous */}
            {currentImages.length > 1 && (
              <button className="sp-lightbox-arrow sp-lightbox-prev" onClick={prevImage} aria-label="Previous image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Image */}
            <div className="sp-lightbox-image-container">
              {currentImages[activeImageIndex] && (
                <Image
                  src={currentImages[activeImageIndex]}
                  alt={currentProject.alt}
                  fill
                  sizes="100vw"
                  className="sp-lightbox-image"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              )}
              
              <div className="sp-lightbox-caption">
                <h3>{currentProject.title}</h3>
                {currentImages.length > 1 && (
                  <div className="sp-lightbox-dots">
                    {currentImages.map((_, i) => (
                      <button
                        key={i}
                        className={`sp-lightbox-dot ${i === activeImageIndex ? 'active' : ''}`}
                        onClick={() => setActiveImageIndex(i)}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Next */}
            {currentImages.length > 1 && (
              <button className="sp-lightbox-arrow sp-lightbox-next" onClick={nextImage} aria-label="Next image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
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

        /* ===== LIGHTBOX ===== */
        .sp-lightbox {
          position: fixed;
          inset: 0;
          z-index: 100000;
          background: #0b0c10;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: spLightboxIn 0.3s ease-out;
        }

        @keyframes spLightboxIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .sp-lightbox-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 100vh;
          position: relative;
          user-select: none;
        }

        .sp-lightbox-close {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #fff;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 20;
          backdrop-filter: blur(8px);
        }

        .sp-lightbox-close:hover {
          background: rgba(139, 35, 50, 0.85);
          border-color: #8B2332;
          transform: rotate(90deg) scale(1.08);
        }

        .sp-lightbox-close svg {
          width: 24px;
          height: 24px;
        }

        .sp-lightbox-arrow {
          background: rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #fff;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          backdrop-filter: blur(8px);
        }

        .sp-lightbox-arrow:hover {
          background: #8B2332;
          border-color: #8B2332;
          color: #fff;
          transform: translateY(-50%) scale(1.08);
        }

        .sp-lightbox-prev {
          left: 3rem;
        }

        .sp-lightbox-next {
          right: 3rem;
        }

        .sp-lightbox-arrow svg {
          width: 24px;
          height: 24px;
        }

        .sp-lightbox-image-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .sp-lightbox-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          animation: spImageIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes spImageIn {
          0% { opacity: 0; transform: scale(0.97); }
          100% { opacity: 1; transform: scale(1); }
        }

        .sp-lightbox-caption {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          text-align: center;
          background: rgba(11, 12, 16, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1rem 2.5rem;
          border-radius: 30px;
          min-width: 280px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .sp-lightbox-caption h3 {
          color: #fff;
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-weight: 400;
          font-size: 0.95rem;
          letter-spacing: 0.08em;
          margin: 0 0 0.6rem 0;
          text-transform: uppercase;
        }

        .sp-lightbox-dots {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }

        .sp-lightbox-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }

        .sp-lightbox-dot.active {
          background: #8B2332;
          transform: scale(1.3);
        }

        .sp-lightbox-dot:hover:not(.active) {
          background: rgba(255, 255, 255, 0.55);
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

          /* Lightbox responsive */
          .sp-lightbox-prev {
            left: 1rem;
          }
          .sp-lightbox-next {
            right: 1rem;
          }
          .sp-lightbox-arrow {
            width: 44px;
            height: 44px;
          }
          .sp-lightbox-arrow svg {
            width: 18px;
            height: 18px;
          }
          .sp-lightbox-close {
            top: 1.5rem;
            right: 1.5rem;
            width: 44px;
            height: 44px;
          }
          .sp-lightbox-close svg {
            width: 18px;
            height: 18px;
          }
          .sp-lightbox-caption {
            bottom: 2rem;
            padding: 0.8rem 1.8rem;
            min-width: 220px;
          }
        }
      `}} />
    </>
  );
}
