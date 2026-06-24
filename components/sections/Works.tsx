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
    tags: ['Conceptual Design', 'Sustainable Spaces', 'Urban Planning'],
    image: '/images/68dbfd24fdb7045c1c994ad8_speciality-image-3.webp',
    href: '/architecture',
  },
  {
    id: '_02',
    title: 'Interior Design',
    tags: ['Residential', 'Commercial', 'Bespoke Curation'],
    image: '/images/68dcfd186c4fed1ec248c9fd_speciality-image-2.webp',
    href: '/interior-design',
  },
  {
    id: '_03',
    title: 'Landscape Planning',
    tags: ['Masterplans', 'Sustainable Greenery', 'Urban Parks'],
    image: '/images/68dbfd1b1720439ef17a5bcc_speciality-image-4.webp',
    href: '/landscape',
  },
  {
    id: '_04',
    title: 'Management &amp; Renovation',
    tags: ['Project Oversight', 'Heritage Restoration', 'Quality Control'],
    image: '/images/68dbfd5a5a669be935ee3b02_speciality-image-1.webp',
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

        // Scale down the card underneath
        gsap.to(linkWrapper, {
          scale: 0.9,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 95%',
            end: 'top 4vh',
            scrub: true,
          }
        });

        // Darken the card underneath
        gsap.to(overlay, {
          opacity: 0.6,
          ease: 'power1.inOut',
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
                        work.href === '/landscape' ? 'Landscape & Planning' :
                        work.href === '/renovation' ? 'Renovation & Management' : '';
                      
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
              height: 60vw;
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
              font-size: 6.5svw;
              font-weight: 400;
            }
            .works-categories {
              font-size: 1.45vw;
            }
          }

          /* ===== Responsive — Portrait Tablet (max 767px) ===== */
          @media (max-width: 767px) {

            .works-title {
              font-size: 7vw;
              line-height: 1;
            }
            .works-categories {
              font-size: 1.65vw;
            }
          }

          /* ===== Responsive — Mobile (max 478px) ===== */
          @media (max-width: 478px) {
            .works-text-block {
              flex-direction: column;
              align-items: flex-start;
              gap: 1.5rem;
              justify-content: space-between;
              width: 100%;
              padding: 0 5%;
            }
            .works-flex-tags {
              align-items: flex-start;
              width: 100%;
            }
            .works-categories {
              color: var(--black);
              font-size: 2.45vw;
              text-align: left;
            }
            .works-title {
              color: var(--black);
              margin-top: auto;
              margin-bottom: auto;
              font-size: 6.15vw;
              font-weight: 700;
              line-height: 1;
              width: 100%;
            }

            .image-works-wrapper {
              border-radius: var(--border-radius);
              height: 75vw;
              position: static;
            }
            .works-link-wrapper {
              height: auto;
              background-color: transparent;
              flex-direction: column;
              align-items: flex-start;
            }
            .works-underline {
              border-bottom-color: rgba(0, 0, 0, 0.3);
            }
          }
        `
      }} />
    </>
  );
}
