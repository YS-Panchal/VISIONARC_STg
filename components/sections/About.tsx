'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Building2, Armchair, Hotel, Hammer } from 'lucide-react';

const expertiseData = [
  {
    icon: Building2,
    title: 'Architecture',
    items: ['Residential', 'Commercial', 'Institutional', 'Master Planning']
  },
  {
    icon: Armchair,
    title: 'Interior Design',
    items: ['Luxury Homes', 'Corporate Spaces', 'Hospitality', 'Custom Interiors']
  },
  {
    icon: Hotel,
    title: 'Hospitality Architecture',
    items: ['Resorts & Hotels', 'Restaurants & Cafés', 'Banquets & Lounges', 'Theme Landmarks']
  },
  {
    icon: Hammer,
    title: 'Renovation & Planning',
    items: ['Adaptive Reuse', 'Restoration', 'Remodeling', 'Modern Upgrades']
  }
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="about"
        ref={sectionRef}
        className={`about-section ${isVisible ? 'about-active' : ''}`}
      >
        <div className="about-container">
          <div className="about-split">

            {/* ===== LEFT COLUMN — Featured Image Card ===== */}
            <div className="about-left-col about-anim about-anim-1">
              <div
                className="about-featured-card"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent('start-page-transition', {
                      detail: {
                        href: '/hospitality-architecture#the-arc-banquet-and-restaurant',
                        title: 'Hospitality Architecture',
                      },
                    })
                  );
                }}
              >
                <div className="about-featured-img-wrap">
                  <Image
                    src="/images/Projects/PROJECTS WEBP/Hospitality Architecture/THE ARC BANQUET AND RESTAURANT/vision-architecture-the-arc-elliptical-banquet-restaurant-ahmedabad-01.webp"
                    alt="The Arc Banquet and Restaurant — hospitality architecture project by Vision Architecture in Ahmedabad, Gujarat"
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    style={{ objectFit: 'cover' }}
                    className="about-featured-img"
                    loading="lazy"
                  />
                </div>
                {/* Gradient Overlay */}
                <div className="about-featured-overlay">
                  <div className="about-featured-meta">
                    <span className="about-featured-tag">Featured Project</span>
                    <h4 className="about-featured-name">The Arc Banquet and Restaurant</h4>
                    <div className="about-featured-location">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>Ahmedabad, Gujarat</span>
                    </div>
                    <a
                      href="/hospitality-architecture#the-arc-banquet-and-restaurant"
                      className="about-featured-link"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.dispatchEvent(
                          new CustomEvent('start-page-transition', {
                            detail: {
                              href: '/hospitality-architecture#the-arc-banquet-and-restaurant',
                              title: 'Hospitality Architecture',
                            },
                          })
                        );
                      }}
                    >
                      <span>View Project</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== RIGHT COLUMN — Content ===== */}
            <div className="about-right-col">

              {/* Eyebrow */}
              <div className="about-eyebrow about-anim about-anim-2">
                <span className="about-eyebrow-text"><strong>Who We Are</strong></span>
                <span className="about-eyebrow-line"></span>
              </div>

              {/* Headline */}
              <h2 className="about-headline">
                <span className="about-headline-line about-anim about-anim-3">Architecture that</span><span className="hero-highlight-red">Shapes</span>
                <span className="about-headline-line about-anim about-anim-4">How you live</span>
              </h2>

              {/* Paragraphs */}
              <div className="about-copy about-anim about-anim-5">
                <p>
                  At VISION Architecture we believe that every space has the potential to tell a unique story and inspire the people who inhabit it. As a forward-thinking architecture firm, we are dedicated to creating exceptional designs that seamlessly blend innovation, functionality, and aesthetics.
                </p>
                <p>
                  Our commitment to excellence is reflected in every project we undertake, whether it&apos;s a contemporary urban residence, a cutting-edge commercial complex, a luxury hospitality destination, or a sustainable community development.
                </p>
              </div>

              {/* Expertise Grid */}
              <div className="about-expertise-grid">
                {expertiseData.map((col, idx) => {
                  const IconComp = col.icon;
                  return (
                    <div
                      key={col.title}
                      className={`about-expertise-col about-anim about-anim-${6 + idx}`}
                    >
                      <div className="about-expertise-icon">
                        <IconComp size={28} strokeWidth={1.3} />
                      </div>
                      <h5 className="about-expertise-title">{col.title}</h5>
                      <ul className="about-expertise-list">
                        {col.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
          /* ===== Section Base ===== */
          .about-section {
            background-color: #FAFAF8;
            padding: clamp(2rem, 3vw, 3rem) 5%;
            position: relative;
            overflow: hidden;
            min-height: 100vh;
            display: flex;
            align-items: center;
          }

          .about-container {
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
          }

          .about-split {
            display: flex;
            gap: clamp(2.5rem, 4vw, 4rem);
            align-items: stretch;
          }

          /* ===== ANIMATIONS — viewport triggered ===== */
          .about-anim {
            opacity: 0;
            transform: translateY(28px);
            transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .about-active .about-anim-1  { opacity: 1; transform: translateY(0); transition-delay: 0s; }
          .about-active .about-anim-2  { opacity: 1; transform: translateY(0); transition-delay: 0.1s; }
          .about-active .about-anim-3  { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }
          .about-active .about-anim-4  { opacity: 1; transform: translateY(0); transition-delay: 0.3s; }
          .about-active .about-anim-5  { opacity: 1; transform: translateY(0); transition-delay: 0.4s; }
          .about-active .about-anim-6  { opacity: 1; transform: translateY(0); transition-delay: 0.5s; }
          .about-active .about-anim-7  { opacity: 1; transform: translateY(0); transition-delay: 0.6s; }
          .about-active .about-anim-8  { opacity: 1; transform: translateY(0); transition-delay: 0.7s; }
          .about-active .about-anim-9  { opacity: 1; transform: translateY(0); transition-delay: 0.8s; }
          .about-active .about-anim-10 { opacity: 1; transform: translateY(0); transition-delay: 0.95s; }

          /* ===== LEFT COLUMN ===== */
          .about-left-col {
            width: 45%;
            flex-shrink: 0;
          }

          .about-featured-card {
            position: relative;
            width: 100%;
            height: 100%;
            min-height: 480px;
            border-radius: 28px;
            overflow: hidden;
            cursor: pointer;
          }

          .about-featured-img-wrap {
            position: absolute;
            inset: 0;
            overflow: hidden;
          }

          .about-featured-img {
            transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }

          .about-featured-card:hover .about-featured-img {
            transform: scale(1.06) !important;
          }

          /* Gradient Overlay */
          .about-featured-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: clamp(1.5rem, 2.5vw, 2.5rem);
            background: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.72) 0%,
              rgba(0, 0, 0, 0.35) 55%,
              transparent 100%
            );
            z-index: 2;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }

          .about-featured-meta {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .about-featured-tag {
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(0.55rem, 0.7vw, 0.7rem);
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #8B2635;
            font-weight: 400;
          }

          .about-featured-name {
            font-family: 'Satoshi', sans-serif;
            font-size: clamp(1.1rem, 1.6vw, 1.5rem);
            font-weight: 500;
            color: #fff;
            margin: 0;
            line-height: 1.3;
          }

          .about-featured-location {
            display: flex;
            align-items: center;
            gap: 0.35rem;
            color: rgba(255, 255, 255, 0.7);
            font-family: 'Satoshi', sans-serif;
            font-size: clamp(0.72rem, 0.85vw, 0.85rem);
            font-weight: 300;
          }

          .about-featured-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 0.6rem;
            color: rgba(255, 255, 255, 0.85);
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(0.6rem, 0.72vw, 0.72rem);
            letter-spacing: 0.15em;
            text-transform: uppercase;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .about-featured-link:hover {
            color: #fff;
          }

          .about-featured-link svg {
            transition: transform 0.3s ease;
          }

          .about-featured-link:hover svg {
            transform: translateX(4px);
          }

          /* ===== RIGHT COLUMN ===== */
          .about-right-col {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-width: 0;
          }

          /* Eyebrow */
          .about-eyebrow {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: clamp(1.2rem, 2vw, 2rem);
          }

          .about-eyebrow-text {
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(0.6rem, 0.8vw, 0.82rem);
            letter-spacing: 0.22em;
            color: #8B2635;
            text-transform: uppercase;
            font-weight: 400;
          }

          .about-eyebrow-line {
            display: block;
            width: clamp(2rem, 3.5vw, 3rem);
            height: 1.5px;
            background-color: #8B2635;
            flex-shrink: 0;
          }

          /* Headline */
          .about-headline {
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(1.8rem, 3.2vw, 3.2rem);
            line-height: 1.15;
            color: #2f3440;
            font-weight: 400;
            margin: 0 0 clamp(0.8rem, 1.2vw, 1.2rem) 0;
            display: flex;
            flex-direction: column;
          }

          .about-headline-line {
            display: block;
          }

          /* Copy */
          .about-copy {
            margin-bottom: clamp(1rem, 1.5vw, 1.5rem);
          }

          .about-copy p {
            font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: clamp(0.82rem, 0.92vw, 0.95rem);
            line-height: 1.72;
            color: rgba(47, 52, 64, 0.72);
            font-weight: 300;
            letter-spacing: 0.01em;
            margin: 0 0 0.6rem 0;
          }

          .about-copy p:last-child {
            margin-bottom: 0;
          }

          /* ===== EXPERTISE GRID ===== */
          .about-expertise-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            margin-bottom: clamp(1rem, 1.5vw, 1.5rem);
            gap: 0;
            border-top: 1px solid rgba(47, 52, 64, 0.1);
            border-bottom: 1px solid rgba(47, 52, 64, 0.1);
          }

          .about-expertise-col {
            padding: clamp(0.8rem, 1.2vw, 1.2rem) clamp(0.6rem, 1vw, 1rem);
            position: relative;
            transition: transform 0.35s ease, box-shadow 0.35s ease;
            cursor: default;
          }

          .about-expertise-col:not(:last-child)::after {
            content: '';
            position: absolute;
            right: 0;
            top: 15%;
            height: 70%;
            width: 1px;
            background: rgba(47, 52, 64, 0.1);
          }

          .about-expertise-col:hover {
            transform: translateY(-6px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
          }

          .about-expertise-icon {
            color: #2f3440;
            line-height: 0;
            margin-bottom: 0.5rem;
            transition: color 0.35s ease;
          }

          .about-expertise-col:hover .about-expertise-icon {
            color: #8B2635;
          }

          .about-expertise-title {
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(0.62rem, 0.78vw, 0.8rem);
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #2f3440;
            margin: 0 0 0.4rem 0;
            font-weight: 400;
          }

          .about-expertise-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
          }

          .about-expertise-list li {
            font-family: 'Satoshi', sans-serif;
            font-size: clamp(0.72rem, 0.82vw, 0.82rem);
            color: rgba(47, 52, 64, 0.58);
            font-weight: 300;
            line-height: 1.4;
          }

          /* ===== FOUNDER ===== */
          .about-founder {
            display: flex;
            align-items: center;
            gap: clamp(1rem, 1.5vw, 1.5rem);
          }

          .about-founder-sig {
            flex-shrink: 0;
            opacity: 0.7;
          }

          .about-founder-info {
            display: flex;
            flex-direction: column;
            gap: 0.15rem;
          }

          .about-founder-name {
            font-family: 'Satoshi', sans-serif;
            font-size: clamp(0.82rem, 0.95vw, 0.95rem);
            font-weight: 600;
            color: #2f3440;
            letter-spacing: 0.02em;
          }

          .about-founder-title {
            font-family: 'Satoshi', sans-serif;
            font-size: clamp(0.65rem, 0.75vw, 0.78rem);
            font-weight: 300;
            color: rgba(47, 52, 64, 0.55);
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }

          /* ===== TABLET — max 1024px ===== */
          @media (max-width: 1024px) {
            .about-split {
              flex-direction: column;
            }

            .about-left-col {
              width: 100%;
            }

            .about-featured-card {
              min-height: 420px;
            }

            .about-right-col {
              width: 100%;
            }

            .about-headline {
              font-size: clamp(2rem, 5vw, 3rem);
            }

            .about-expertise-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }

          /* ===== MOBILE — max 768px ===== */
          @media (max-width: 768px) {
            .about-section {
              padding: 3.5rem 5% 3rem;
            }

            .about-featured-card {
              min-height: 340px;
              border-radius: 20px;
            }

            .about-headline {
              font-size: clamp(1.8rem, 7vw, 2.5rem);
            }

            .about-copy p {
              font-size: 0.9rem;
            }

            .about-expertise-grid {
              grid-template-columns: repeat(2, 1fr);
              border-bottom: none;
            }

            .about-expertise-col:not(:last-child)::after {
              display: none;
            }

            .about-expertise-col {
              border-bottom: 1px solid rgba(47, 52, 64, 0.1);
              padding: 1.2rem 0.8rem;
            }

            .about-founder {
              justify-content: flex-start;
            }
          }

          /* ===== SMALL MOBILE — max 480px ===== */
          @media (max-width: 480px) {
            .about-featured-card {
              min-height: 280px;
            }

            .about-headline {
              font-size: clamp(1.6rem, 8vw, 2.2rem);
            }

            .about-expertise-col {
              padding: 1rem 0.5rem;
            }
          }
        `
      }} />
    </>
  );
}
