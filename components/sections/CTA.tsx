'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CTA() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Stagger fade-up animation for the 3 CTA images
    if (imagesContainerRef.current) {
      const images = imagesContainerRef.current.querySelectorAll('img');
      gsap.fromTo(images,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.25,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imagesContainerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }

    if (!headingRef.current) return;
    const el = headingRef.current;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      gsap.fromTo(el.querySelectorAll('.letter'),
        { opacity: 0.05 },
        { opacity: 1, stagger: 0.05, duration: 0.425, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 70%', end: 'top 35%', scrub: true }
        }
      );
    });
    mm.add('(max-width: 1023px)', () => {
      gsap.fromTo(el.querySelectorAll('.letter'),
        { opacity: 0.05 },
        { opacity: 1, stagger: 0.05, duration: 0.425, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 45%', scrub: true }
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <section className="section">
        <div style={{
          width: '100%',
          maxWidth: '83.33vw',
          margin: '0 auto',
          paddingTop: '5vw',
          paddingBottom: '5vw'
        }}>
          <div style={{ minHeight: '6.67vw' }}></div>

          {/* Three card images */}
          <div ref={imagesContainerRef} className="about-card-images">
            <Image
              src="https://cdn.prod.website-files.com/68a6eb7889406f3275720c49/68d1ae25a28852f3a85bbed6_cta-image-1.webp"
              alt=""
              width={91}
              height={120}
              className="about-card-image-left"
            />
            <Image
              src="https://cdn.prod.website-files.com/68a6eb7889406f3275720c49/68d1ae25f70e8cc0e52db1fb_cta-image-2.webp"
              alt="A building with a Heritage sign on the front."
              width={940}
              height={600}
              className="about-card-image"
            />
            <Image
              src="https://cdn.prod.website-files.com/68a6eb7889406f3275720c49/68d1ae259e7dcb02d2af4366_cta-image-3.webp"
              alt=""
              width={940}
              height={600}
              className="about-card-image-right"
            />
          </div>

          <div style={{ minHeight: '6.67vw' }}></div>

          {/* Start a Project */}
          <div className="title_wrapper" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h6 style={{ fontFamily: 'sans-serif', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Start a Project</h6>
            </div>
            <div style={{ minHeight: '1rem' }}></div>
            <h4
              ref={headingRef}
              className="medium_title animated"
              style={{
                color: '#2f3440',
                textTransform: 'none',
                width: '60%',
                fontWeight: 300,
                fontSize: 'clamp(1.5rem, 3vw, 3rem)',
                lineHeight: 1.3,
                margin: 0
              }}
            >
              {"Ready to build something remarkable?".split('').map((char, index) => (
                char === ' ' ? ' ' : <span key={index} className="letter" style={{ display: 'inline-block' }}>{char}</span>
              ))}
            </h4>
            <div style={{ minHeight: '2.22vw' }}></div>
            <Link
              href="#contact"
              className="cta-button"
              style={{
                backgroundColor: 'var(--charcoal-blue)',
                color: '#fff',
                letterSpacing: '.07vw',
                textTransform: 'uppercase',
                cursor: 'pointer',
                border: '1px solid #000',
                borderRadius: '6.25rem',
                padding: '.78vw 2.22vw',
                fontWeight: 400,
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: 'clamp(0.8rem, 1vw, 1rem)'
              }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .about-card-images {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          width: 100%;
          position: relative;
        }

        .about-card-image-left {
          z-index: 2;
          aspect-ratio: 3 / 4;
          border-radius: var(--border-radius, 2rem);
          object-fit: cover;
          object-position: 30% 50%;
          min-width: 24vw;
          max-width: 24vw;
          position: relative;
        }

        .about-card-image {
          z-index: 2;
          aspect-ratio: 1;
          border-radius: var(--border-radius, 2rem);
          object-fit: cover;
          object-position: 61% 50%;
          min-width: 36vw;
          max-width: 36vw;
          position: relative;
        }

        .about-card-image-right {
          z-index: 3;
          aspect-ratio: 3 / 4;
          border-radius: var(--border-radius, 2rem);
          object-fit: cover;
          min-width: 20vw;
          max-width: 20vw;
          position: relative;
          right: 2vw;
        }

        @media (max-width: 768px) {
          .about-card-images {
            flex-direction: column;
            gap: 1rem;
          }
          .about-card-image-left {
            min-width: 10rem;
            max-width: 12rem;
            left: 5%;
          }
          .about-card-image {
            min-width: 12rem;
            max-width: 14rem;
          }
          .about-card-image-right {
            min-width: 8rem;
            max-width: 10rem;
            right: 5%;
          }
          .medium_title {
            width: 90% !important;
          }
        }
      `}} />
    </>
  );
}
