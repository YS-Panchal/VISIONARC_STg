'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const worksData = [
  {
    id: '_01',
    title: 'Architecture',
    tags: ['High-Rise', 'Private Residences', 'Luxury Bungalows'],
    image: '/images/Projects/PROJECTS WEBP/Architecture/HIGH RISE RESIDENTIAL BUILDING/vision-architecture-karma-astron-high-rise-residential-ahmedabad-01.webp',
    href: '/architecture',
  },
  {
    id: '_02',
    title: 'Interior Design',
    tags: ['Luxury Residences', 'Corporate Offices', 'Penthouses'],
    image: '/images/Projects/PROJECTS WEBP/Interior Design/MR DIPESH JHAVERI PRIVATE RESIDENCE/vision-architecture-dipesh-jhaveri-double-height-luxury-residence-ahmedabad-17.webp',
    href: '/interior-design',
  },
  {
    id: '_03',
    title: 'Hospitality Architecture',
    tags: ['Luxury Resorts', 'Elliptical Banquets', '4-Star Hotels'],
    image: '/images/Projects/PROJECTS WEBP/Hospitality Architecture/SANTORINI RESORT BHARUCH/vision-architecture-santorini-luxury-resort-bharuch-gujarat-01.webp',
    href: '/hospitality-architecture',
  },
  {
    id: '_04',
    title: 'Renovation and Planning',
    tags: ['Modern Transformation', 'Heritage Preservation', 'Spatial Refinement'],
    image: '/images/Projects/PROJECTS WEBP/Renovation & Planning/MR SURESH CHAUHAN PRIVATE RESIDENCE/vision-architecture-suresh-chauhan-heritage-residence-renovation-ahmedabad-07.webp',
    href: '/renovation',
  }
];

export default function Works() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (!containerRef.current) return;

    const cards = gsap.utils.toArray('.works-sticky');
    const mm = gsap.matchMedia();

    mm.add('(min-width: 479px)', () => {
      cards.forEach((card: any, index: number) => {
        if (index === cards.length - 1) return; // Last card doesn't shrink

        const nextCard = cards[index + 1] as any;
        const linkWrapper = card.querySelector('.works-link-wrapper');
        const overlay = card.querySelector('.works-overlay');
        const textBlock = card.querySelector('.works-text-block');

        // Scale down the card underneath
        gsap.to(linkWrapper, {
          scale: 0.92,
          y: -20,
          borderRadius: '2rem',
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 95%',
            end: 'top 4vh',
            scrub: true,
          }
        });

        // Darken the card underneath
        gsap.to(overlay, {
          opacity: 0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 95%',
            end: 'top 4vh',
            scrub: true,
          }
        });

        // Fade out text content
        gsap.to(textBlock, {
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 95%',
            end: 'top 4vh',
            scrub: true,
          }
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <section ref={containerRef} className="section">
        <div className="w-layout-blockcontainer container_full overflow w-container">
          <div className="works-wrapper">
            {worksData.map((work, index) => (
              <div 
                key={work.id} 
                className={`works-sticky ${work.id}`}
              >
                <div className="works-flex">
                  <Link 
                    href={work.href} 
                    className="works-link-wrapper"
                    onClick={(e) => {
                      e.preventDefault();
                      const transitionTitle = 
                        work.href === '/architecture' ? 'Architecture' :
                        work.href === '/interior-design' ? 'Interior Design' :
                        work.href === '/hospitality-architecture' || work.href === '/landscape' ? 'Hospitality Architecture' :
                        work.href === '/renovation' ? 'Renovation & Planning' : '';
                      
                      window.dispatchEvent(new CustomEvent('start-page-transition', {
                        detail: { href: work.href, title: transitionTitle }
                      }));
                    }}
                  >
                    <div className="image-works-wrapper">
                      <Image 
                        src={work.image}
                        alt={work.title}
                        fill
                        className={`work-image ${work.id}`}
                        sizes="100vw"
                        priority={index === 0}
                      />
                    </div>
                    
                    {/* Dimming overlay on scroll */}
                    <div className="works-overlay" />
                    
                    <div className="works-text-block">
                      <h2
                        className="works-title"
                        dangerouslySetInnerHTML={{ __html: work.title }}
                      />
                      
                      <div className="works-flex-tags">
                        {work.tags.map((tag) => (
                          <div key={tag} className="works-underline">
                            <h5 className="works-categories">{tag}</h5>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
          .overflow {
            overflow: visible !important;
          }

          .section {
            padding-left: 5%;
            padding-right: 5%;
            overflow: visible !important;
          }

          .works-wrapper {
            grid-column-gap: 8.89vw;
            grid-row-gap: 8.89vw;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            display: flex;
            overflow: visible;
          }

          .works-sticky {
            position: -webkit-sticky;
            position: sticky;
            top: 4vh;
            width: 100%;
            display: flex;
            justify-content: center;
          }

          .works-flex {
            grid-column-gap: 2.2vw;
            grid-row-gap: 2.2vw;
            flex-flow: column;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            display: flex;
          }

          .works-link-wrapper {
  border-radius: var(--border-radius);
  background-color: var(--black);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 89.5svw;
            height: 92.5svh;
            display: flex;
            position: relative;
            overflow: hidden;
            text-decoration: none;
            cursor: pointer;
            transform: translate3d(0, 0, 0); /* Forces GPU border-radius clipping */
            isolation: isolate; /* Establishes stacking and clipping boundary */
            will-change: transform, opacity;
            transition: border-radius 0.1s ease;
          }

          .image-works-wrapper {
            width: 100%;
            height: 100%;
            position: absolute;
            overflow: hidden;
            border-radius: var(--border-radius);
          }

          .work-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: var(--border-radius);
          }

          /* Dimming overlay */
          .works-overlay {
            position: absolute;
            inset: 0;
            background-color: #000;
            opacity: 0;
            z-index: 3;
            pointer-events: none;
            border-radius: var(--border-radius);
          }

          /* Text block centered inside card */
          .works-text-block {
            text-align: left;
            flex-flow: row;
            justify-content: space-between;
            align-items: center;
            width: 82.5%;
            display: flex;
            position: relative;
            overflow: hidden;
            z-index: 2;
            will-change: opacity;
          }

          .works-title {
            color: var(--white);
            text-transform: uppercase;
            width: 40%;
            font-size: 4.683svw;
            font-weight: 400;
            line-height: .85;
            font-family: var(--font-telegrafico);
            margin: 0;
          }

          /* Tags column — each tag in its own underline row */
          .works-flex-tags {
            grid-column-gap: 1.1vw;
            grid-row-gap: 1.1vw;
            flex-flow: column wrap;
            justify-content: center;
            align-items: flex-end;
            width: 25%;
            display: flex;
          }

          .works-underline {
            border-bottom: .0625rem solid #ffffff4d;
            justify-content: flex-end;
            align-items: center;
            width: 100%;
            height: 2vw;
            display: flex;
          }

          .works-categories {
            color: var(--white);
            text-align: right;
            text-transform: capitalize;
            font-weight: 400;
            margin: 0;
            font-size: clamp(0.7rem, 1vw, 1.1rem);
            line-height: 1;
          }



          /* ===== Responsive — Landscape Tablet (max 991px) ===== */
          @media (max-width: 991px) {
            .works-link-wrapper {
              height: clamp(450px, 60vh, 580px);
              width: 100%;
            }
            .works-text-block {
              width: 90%;
            }

            .works-flex {
              grid-column-gap: 2rem;
              grid-row-gap: 2rem;
              flex-wrap: wrap;
              position: static;
            }
            .works-title {
              font-size: clamp(2.2rem, 5vw, 3.2rem);
              font-weight: 500;
              color: var(--white);
            }
            .works-categories {
              font-size: clamp(0.85rem, 1.45vw, 1.1rem);
              color: var(--white);
            }
          }

          /* ===== Responsive — Portrait Tablet & Mobile (max 767px) ===== */
          @media (max-width: 767px) {
            .works-link-wrapper {
              height: clamp(420px, 65vh, 540px);
              width: 100%;
              border-radius: 1.5rem;
              background-color: var(--black);
              padding: 2.5rem 1.8rem;
              align-items: flex-start;
              justify-content: flex-end;
            }
            .image-works-wrapper {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              border-radius: 1.5rem;
            }
            .work-image {
              object-fit: cover;
              border-radius: 1.5rem;
            }
            .works-overlay {
              position: absolute;
              inset: 0;
              background: linear-gradient(
                to top,
                rgba(29, 32, 37, 0.92) 0%,
                rgba(29, 32, 37, 0.45) 50%,
                rgba(29, 32, 37, 0.15) 100%
              );
              opacity: 1 !important;
              z-index: 2;
              border-radius: 1.5rem;
            }
            .works-text-block {
              position: relative;
              z-index: 3;
              width: 100%;
              flex-direction: column;
              align-items: flex-start;
              gap: 1.2rem;
              justify-content: flex-end;
            }
            .works-title {
              font-size: clamp(1.8rem, 6.5vw, 2.6rem);
              line-height: 1.1;
              color: #ffffff !important;
              font-weight: 500;
              width: 100%;
            }
            .works-flex-tags {
              width: 100%;
              align-items: flex-start;
              gap: 0.5rem;
            }
            .works-underline {
              width: auto;
              height: auto;
              border-bottom: 1px solid rgba(255, 255, 255, 0.3);
              padding-bottom: 0.25rem;
            }
            .works-categories {
              font-size: clamp(0.78rem, 3.2vw, 0.95rem);
              color: rgba(255, 255, 255, 0.9) !important;
              text-align: left;
            }
          }

          /* ===== Responsive — Mobile Small (max 478px) ===== */
          @media (max-width: 478px) {
            .works-link-wrapper {
              height: clamp(380px, 62vh, 480px);
              padding: 2rem 1.25rem;
              border-radius: 1.25rem;
            }
            .image-works-wrapper, .work-image, .works-overlay {
              border-radius: 1.25rem;
            }
            .works-title {
              font-size: clamp(1.6rem, 7vw, 2.2rem);
            }
            .works-categories {
              font-size: clamp(0.75rem, 3.5vw, 0.88rem);
            }
          }
        `
      }} />
    </>
  );
}
