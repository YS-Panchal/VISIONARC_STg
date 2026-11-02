'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ReviewItem {
  clientName: string;
  projectName: string;
  location: string;
  projectHref: string;
  transitionTitle: string;
  image: string;
  text: string;
}

const reviewsData: ReviewItem[] = [
  {
    clientName: 'Varun Jhaveri',
    projectName: 'Dipesh Jhaveri Residence',
    location: 'Ahmedabad, Gujarat',
    projectHref: '/interior-design#mr-dipesh-jhaveri-private-residence',
    transitionTitle: 'Interior Design',
    image: '/images/Projects/PROJECTS WEBP/Interior Design/MR DIPESH JHAVERI PRIVATE RESIDENCE/vision-architecture-dipesh-jhaveri-double-height-luxury-residence-ahmedabad-01.webp',
    text: 'Working with Vision Architecture was one of the best decisions we made while building our home. Mr. Khantil Panchal and Mrs. Surbhi Panchal have an incredible eye for design and transformed our vision into a beautiful reality. What impressed us most was not only their creativity and attention to detail but also their supportive nature, professionalism, and dedication throughout the entire process. They made the journey smooth, enjoyable, and stress-free. We are extremely happy with our home and highly recommend Vision Architecture to anyone looking for exceptional design and a wonderful experience.',
  },
  {
    clientName: 'Dr. Suresh Chauhan & Dr. Chetna Chauhan',
    projectName: 'Suresh Chauhan Residence',
    location: 'Sterling City, Bopal, Ahmedabad',
    projectHref: '/renovation#mr-suresh-chauhan-private-residence',
    transitionTitle: 'Renovation & Planning',
    image: '/images/Projects/PROJECTS WEBP/Renovation & Planning/MR SURESH CHAUHAN PRIVATE RESIDENCE/vision-architecture-suresh-chauhan-heritage-residence-renovation-ahmedabad-01.webp',
    text: 'It was a great experience working with the Vision Architecture team. They beautifully blended modern design ideas with the emotions and memories we wanted our home to reflect. Their innovative concepts encouraged us to explore design possibilities we would not have considered otherwise. The final outcome is a perfect balance of functionality, aesthetics, and personal connection. We truly appreciate their creativity, professionalism, and dedication throughout the journey.',
  },
  {
    clientName: 'Urvish Trivedi',
    projectName: 'Urvish Trivedi Residence',
    location: 'Ahmedabad, Gujarat',
    projectHref: '/renovation#mr-urvish-trivedi-private-residence',
    transitionTitle: 'Renovation & Planning',
    image: '/images/Projects/PROJECTS WEBP/Renovation & Planning/MR URVISH TRIVEDI PRIVATE RESIDENCE/vision-architecture-urvish-trivedi-bungalow-renovation-ahmedabad-01.webp',
    text: "We are extremely happy with the team's professional approach, courteous nature and the maturity with which they handled every situation throughout the project. Their patience, understanding and commitment made the entire experience smooth and truly satisfying.",
  },
];

const AUTOPLAY_INTERVAL = 7000;
const RESUME_DELAY = 2500;
const TRANSITION_DURATION = 800; // ms

/* ------------------------------------------------------------------ */
/*  Star SVG                                                           */
/* ------------------------------------------------------------------ */

function Star() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill="#8B2635"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Reviews() {
  const totalSlides = reviewsData.length;

  /* ---- Carousel state (clone-trick for infinite loop) ---- */
  const [currentIndex, setCurrentIndex] = useState(1); // 1-based (clone at 0 & totalSlides+1)
  const [isTransitioning, setIsTransitioning] = useState(true);

  /* ---- Hover / interaction state ---- */
  const [imageHovered, setImageHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  /* ---- Refs ---- */
  const sectionRef = useRef<HTMLElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVisibleRef = useRef(true);
  const isInteractingRef = useRef(false);
  const prefersReducedMotion = useRef(false);

  /* ---- Extended slides for infinite loop ---- */
  const extendedReviews = [
    reviewsData[totalSlides - 1],
    ...reviewsData,
    reviewsData[0],
  ];

  const activeDot = (currentIndex - 1 + totalSlides) % totalSlides;
  const activeReview = reviewsData[activeDot];

  /* ---- Navigation ---- */
  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev > totalSlides) return prev;
      return prev + 1;
    });
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev < 1) return prev;
      return prev - 1;
    });
  }, []);

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalSlides);
    } else if (currentIndex === totalSlides + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  }, [currentIndex, totalSlides]);

  /* ---- Page transition (preserving existing behavior) ---- */
  const handleCardClick = useCallback((href: string, title: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('start-page-transition', {
          detail: { href, title },
        })
      );
    }
  }, []);

  /* ---- Autoplay engine ---- */
  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    clearAutoplay();
    if (prefersReducedMotion.current) return;
    if (!isVisibleRef.current) return;
    if (isInteractingRef.current) return;

    autoplayRef.current = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);
  }, [clearAutoplay, nextSlide]);

  const pauseAutoplay = useCallback(() => {
    clearAutoplay();
    clearResumeTimer();
  }, [clearAutoplay, clearResumeTimer]);

  const scheduleResume = useCallback(() => {
    clearResumeTimer();
    resumeTimerRef.current = setTimeout(() => {
      if (!isInteractingRef.current && isVisibleRef.current) {
        startAutoplay();
      }
    }, RESUME_DELAY);
  }, [clearResumeTimer, startAutoplay]);

  /* ---- Interaction handlers ---- */
  const handleInteractionStart = useCallback(() => {
    isInteractingRef.current = true;
    setIsInteracting(true);
    pauseAutoplay();
  }, [pauseAutoplay]);

  const handleInteractionEnd = useCallback(() => {
    isInteractingRef.current = false;
    setIsInteracting(false);
    scheduleResume();
  }, [scheduleResume]);

  const handleManualNav = useCallback(
    (direction: 'prev' | 'next') => {
      handleInteractionStart();
      if (direction === 'prev') prevSlide();
      else nextSlide();
    },
    [handleInteractionStart, prevSlide, nextSlide]
  );

  /* ---- Keyboard navigation ---- */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleManualNav('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleManualNav('next');
      }
    },
    [handleManualNav]
  );

  /* ---- Visibility & reduced-motion observers ---- */
  useEffect(() => {
    // Reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mq.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
      if (e.matches) clearAutoplay();
      else startAutoplay();
    };
    mq.addEventListener('change', handleMotionChange);

    // Intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !isInteractingRef.current) {
          startAutoplay();
        } else if (!entry.isIntersecting) {
          clearAutoplay();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    // Visibility change (tab hidden)
    const handleVisChange = () => {
      if (document.hidden) {
        clearAutoplay();
      } else if (isVisibleRef.current && !isInteractingRef.current) {
        startAutoplay();
      }
    };
    document.addEventListener('visibilitychange', handleVisChange);

    // Initial start
    startAutoplay();

    return () => {
      clearAutoplay();
      clearResumeTimer();
      mq.removeEventListener('change', handleMotionChange);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisChange);
    };
  }, [startAutoplay, clearAutoplay, clearResumeTimer]);

  /* ---- Truncated text for narrow panel ---- */
  const truncateText = (text: string, maxLen: number) => {
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <>
      <section
        className="section"
        id="reviews"
        ref={sectionRef}
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        onFocus={handleInteractionStart}
        onBlur={handleInteractionEnd}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div className="rv-outer">
          {/* Navigation arrows — permanently visible with crisp contrast */}
          <button
            className="rv-arrow rv-arrow--prev"
            onClick={() => handleManualNav('prev')}
            aria-label="Previous testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Carousel track — single rounded mask container */}
          <div className="rv-carousel-mask">
            <div
              className="rv-track"
              onTransitionEnd={handleTransitionEnd}
              style={{
                transition: isTransitioning
                  ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`
                  : 'none',
                transform: `translateX(-${currentIndex * (100 / extendedReviews.length)}%)`,
                width: `${extendedReviews.length * 100}%`,
              }}
            >
              {extendedReviews.map((review, slideIndex) => (
                <div
                  key={slideIndex}
                  className="rv-slide"
                  style={{
                    width: `${100 / extendedReviews.length}%`,
                  }}
                >
                  {/* ---- The 20:80 / 80:20 Card ---- */}
                  <div className={`rv-card ${imageHovered ? 'rv-card--expanded' : ''}`}>
                    {/* Image panel (left) */}
                    <div
                      className="rv-image-panel"
                      onMouseEnter={() => setImageHovered(true)}
                      onMouseLeave={() => setImageHovered(false)}
                      onClick={() => handleCardClick(review.projectHref, review.transitionTitle)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View project: ${review.projectName}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleCardClick(review.projectHref, review.transitionTitle);
                        }
                      }}
                    >
                      <Image
                        src={review.image}
                        alt={review.projectName}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="rv-image"
                        priority={slideIndex <= 2}
                      />
                      <div className="rv-image-overlay" />

                      {/* Image CTA at bottom */}
                      <div className="rv-image-cta">
                        <span className="rv-image-cta-text">VIEW PROJECT</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>

                      {/* Hover expand hint */}
                      <div className="rv-hover-hint">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 3 21 3 21 9" />
                          <polyline points="9 21 3 21 3 15" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                        <span>Hover to expand</span>
                      </div>
                    </div>

                    {/* Testimonial panel (right) */}
                    <div
                      className="rv-text-panel"
                      onClick={() => handleCardClick(review.projectHref, review.transitionTitle)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View project: ${review.projectName}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleCardClick(review.projectHref, review.transitionTitle);
                        }
                      }}
                    >
                      {/* Restored previous closing quotation mark ” */}
                      <img
                        src="/images/quote.png"
                        alt="quote icon"
                        className="quote-icon"
                      />

                      {/* Stars */}
                      <div className="rv-stars">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <Star key={i} />
                        ))}
                      </div>

                      {/* Client name */}
                      <h4 className="rv-client-name">{review.clientName}</h4>

                      {/* Project & location */}
                      <span className="rv-project-tag">
                        {review.projectName} · {review.location}
                      </span>

                      {/* Review text — full in default, truncated when expanded */}
                      <p className="rv-review-text rv-review-text--full">
                        {review.text}
                      </p>
                      <p className="rv-review-text rv-review-text--short">
                        {truncateText(review.text, 120)}
                      </p>

                      {/* View project CTA */}
                      <div className="rv-view-project">
                        <span>View Project</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="rv-arrow rv-arrow--next"
            onClick={() => handleManualNav('next')}
            aria-label="Next testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Pagination dashes */}
        <div className="rv-dots">
          {reviewsData.map((_, i) => (
            <button
              key={i}
              className={`rv-dot ${i === activeDot ? 'rv-dot--active' : ''}`}
              onClick={() => {
                handleInteractionStart();
                goToSlide(i);
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: reviewsCSS }} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const reviewsCSS = `
  /* ---- Section ---- */
  #reviews {
    width: 100%;
    padding: clamp(3rem, 5vw, 5rem) 0;
    outline: none;
  }

  /* ---- Outer layout with arrows ---- */
  .rv-outer {
    display: flex;
    align-items: center;
    gap: clamp(0.75rem, 1.5vw, 1.5rem);
    width: 100%;
    max-width: min(90vw, 1320px);
    margin: 0 auto;
  }

  /* ---- Navigation arrows — clearly visible in normal state ---- */
  .rv-arrow {
    flex-shrink: 0;
    width: clamp(2.5rem, 3vw, 3rem);
    height: clamp(2.5rem, 3vw, 3rem);
    border-radius: 50%;
    border: 1px solid rgba(47, 52, 64, 0.25);
    background: #ffffff;
    color: #2f3440;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    outline: none;
    z-index: 2;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  }

  .rv-arrow:hover,
  .rv-arrow:focus-visible {
    border-color: rgba(139, 38, 53, 0.6);
    color: #8B2635;
    background: rgba(139, 38, 53, 0.08);
    transform: scale(1.08);
    box-shadow: 0 4px 14px rgba(139, 38, 53, 0.15);
  }

  .rv-arrow:focus-visible {
    box-shadow: 0 0 0 2px rgba(139, 38, 53, 0.4);
  }

  /* ---- Carousel mask — single outer rounded container without double borders ---- */
  .rv-carousel-mask {
    flex: 1;
    overflow: hidden;
    border-radius: clamp(1rem, 1.5vw, 1.5rem);
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: #13151a;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
    min-width: 0;
  }

  /* ---- Track ---- */
  .rv-track {
    display: flex;
    width: 100%;
  }

  /* ---- Slide — flush with mask to prevent outer padding/border bleed ---- */
  .rv-slide {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  /* ---- The main card (seamlessly integrated into single outer boundary) ---- */
  .rv-card {
    display: flex;
    width: 100%;
    height: clamp(340px, 32vw, 480px);
    border: none;
    border-radius: 0;
    box-shadow: none;
    overflow: hidden;
    position: relative;
    background: transparent;
  }

  /* ---- Image panel ---- */
  .rv-image-panel {
    position: relative;
    width: 20%;
    flex-shrink: 0;
    overflow: hidden;
    cursor: pointer;
    transition: width 600ms cubic-bezier(0.65, 0, 0.35, 1);
    outline: none;
  }

  .rv-card--expanded .rv-image-panel {
    width: 80%;
  }

  .rv-image {
    object-fit: cover;
    object-position: center;
    transition: transform 600ms cubic-bezier(0.65, 0, 0.35, 1);
  }

  .rv-image-panel:hover .rv-image {
    transform: scale(1.03);
  }

  /* ---- Image overlay gradient ---- */
  .rv-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(10, 11, 13, 0.75) 0%,
      rgba(10, 11, 13, 0.15) 40%,
      transparent 65%
    );
    pointer-events: none;
    transition: opacity 600ms ease;
  }

  /* ---- Image CTA ---- */
  .rv-image-cta {
    position: absolute;
    bottom: clamp(1rem, 1.8vw, 1.5rem);
    left: clamp(1rem, 1.8vw, 1.5rem);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #f9f9f9;
    z-index: 1;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .rv-image-cta-text {
    font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
    font-size: clamp(0.6rem, 0.7vw, 0.78rem);
    letter-spacing: 0.14em;
  }

  .rv-image-panel:hover .rv-image-cta {
    transform: translateX(4px);
  }

  /* ---- Hover hint ---- */
  .rv-hover-hint {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.8rem;
    background: rgba(10, 11, 13, 0.65);
    border-radius: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
    font-family: 'Satoshi', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.04em;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
    white-space: nowrap;
    backdrop-filter: blur(4px);
  }

  .rv-card:not(.rv-card--expanded) .rv-image-panel:hover .rv-hover-hint {
    opacity: 1;
  }

  /* ---- Testimonial panel ---- */
  .rv-text-panel {
    flex: 1;
    min-width: 0;
    background: #13151a;
    padding: clamp(2rem, 3vw, 3rem) clamp(1.8rem, 3vw, 3rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: clamp(0.5rem, 0.8vw, 0.7rem);
    position: relative;
    cursor: pointer;
    overflow: hidden;
    transition: opacity 600ms ease;
  }

  .rv-text-panel:hover .rv-view-project {
    transform: translateX(4px);
    color: #d15668;
  }

  /* ---- Restored previous quotation mark styling ---- */
  .quote-icon {
    position: absolute;
    top: clamp(1.5rem, 2.2vw, 2.5rem);
    right: clamp(1.5rem, 2.2vw, 2.5rem);
    width: clamp(2.4rem, 3.2vw, 3.8rem);
    height: auto;
    object-fit: contain;
    opacity: 0.18;
    filter: invert(1);
    pointer-events: none;
    z-index: 1;
  }

  /* ---- Stars ---- */
  .rv-stars {
    display: flex;
    gap: 0.15rem;
  }

  .rv-stars svg {
    width: clamp(0.9rem, 1.1vw, 1.15rem);
    height: clamp(0.9rem, 1.1vw, 1.15rem);
  }

  /* ---- Client name ---- */
  .rv-client-name {
    font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
    font-size: clamp(1rem, 1.3vw, 1.4rem);
    font-weight: 500;
    letter-spacing: 0.05em;
    color: #ffffff;
    margin: 0;
    line-height: 1.25;
    transition: font-size 400ms ease;
  }

  /* ---- Project tag ---- */
  .rv-project-tag {
    font-family: 'Satoshi', sans-serif;
    font-size: clamp(0.72rem, 0.85vw, 0.92rem);
    color: #d15668;
    font-weight: 500;
    letter-spacing: 0.03em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ---- Review text ---- */
  .rv-review-text {
    font-family: 'Satoshi', sans-serif;
    font-size: clamp(0.88rem, 1.02vw, 1.1rem);
    line-height: 1.72;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 300;
    margin: clamp(0.3rem, 0.5vw, 0.5rem) 0 0 0;
  }

  .rv-review-text--full {
    display: block;
  }
  .rv-review-text--short {
    display: none;
  }

  .rv-card--expanded .rv-review-text--full {
    display: none;
  }
  .rv-card--expanded .rv-review-text--short {
    display: block;
  }

  /* ---- View project CTA ---- */
  .rv-view-project {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
    font-size: clamp(0.62rem, 0.72vw, 0.78rem);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #f9f9f9;
    margin-top: auto;
    transition: transform 0.3s ease, color 0.3s ease;
    padding-top: clamp(0.5rem, 0.8vw, 0.8rem);
  }

  /* ---- Pagination dashes ---- */
  .rv-dots {
    display: flex;
    justify-content: center;
    gap: clamp(0.5rem, 0.8vw, 0.75rem);
    margin-top: clamp(1.5rem, 2.5vw, 2.5rem);
  }

  .rv-dot {
    width: clamp(1.8rem, 2.5vw, 2.8rem);
    height: 3px;
    border-radius: 2px;
    border: none;
    background: rgba(47, 52, 64, 0.35);
    cursor: pointer;
    padding: 0;
    transition: background 0.4s ease, transform 0.3s ease;
  }

  .rv-dot:hover {
    background: rgba(139, 38, 53, 0.4);
  }

  .rv-dot--active {
    background: #8B2635;
  }

  /* ================================================================ */
  /*  Tablet (≤ 1024px)                                                */
  /* ================================================================ */
  @media (max-width: 1024px) {
    .rv-outer {
      max-width: 94vw;
      gap: 0.6rem;
    }
    .rv-card {
      height: clamp(320px, 38vw, 420px);
    }
    .rv-image-panel {
      width: 25%;
    }
    .rv-card--expanded .rv-image-panel {
      width: 75%;
    }
  }

  /* ================================================================ */
  /*  Mobile (≤ 768px)                                                 */
  /* ================================================================ */
  @media (max-width: 768px) {
    .rv-outer {
      max-width: 94vw;
      gap: 0.5rem;
    }

    .rv-arrow {
      width: 2.2rem;
      height: 2.2rem;
    }

    .rv-arrow svg {
      width: 16px;
      height: 16px;
    }

    .rv-card {
      flex-direction: column;
      height: auto;
    }

    .rv-image-panel {
      width: 100% !important;
      height: clamp(180px, 42vw, 260px);
    }

    .rv-card--expanded .rv-image-panel {
      width: 100% !important;
      height: clamp(220px, 50vw, 300px);
    }

    .rv-hover-hint {
      display: none;
    }

    .rv-text-panel {
      padding: clamp(1.2rem, 4vw, 1.8rem);
    }

    .rv-review-text--full {
      display: block;
    }
    .rv-review-text--short {
      display: none;
    }
    .rv-card--expanded .rv-review-text--full {
      display: block;
    }
    .rv-card--expanded .rv-review-text--short {
      display: none;
    }

    .quote-icon {
      display: none;
    }
  }

  /* ================================================================ */
  /*  Very small mobile (≤ 480px)                                      */
  /* ================================================================ */
  @media (max-width: 480px) {
    .rv-outer {
      max-width: 96vw;
      gap: 0.25rem;
    }
    .rv-arrow {
      width: 1.8rem;
      height: 1.8rem;
    }
    .rv-text-panel {
      padding: 1rem;
    }
  }

  /* ================================================================ */
  /*  Reduced motion                                                   */
  /* ================================================================ */
  @media (prefers-reduced-motion: reduce) {
    .rv-image-panel,
    .rv-image,
    .rv-track,
    .rv-card,
    .rv-view-project,
    .rv-image-cta,
    .rv-arrow {
      transition-duration: 0.01ms !important;
    }
  }
`;
