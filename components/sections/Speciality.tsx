'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Speciality() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (!headingRef.current) return;
    const el = headingRef.current;

    const mm = gsap.matchMedia();
    
    // Desktop animation
    mm.add('(min-width: 1024px)', () => {
      gsap.fromTo(el.querySelectorAll('.letter'),
        { opacity: 0.05 },
        { 
          opacity: 1, 
          stagger: 0.05, 
          duration: 0.425, 
          ease: 'power2.out',
          scrollTrigger: { 
            trigger: el, 
            start: 'top 70%', 
            end: 'top 35%', 
            scrub: true 
          }
        }
      );
    });

    // Mobile animation
    mm.add('(max-width: 1023px)', () => {
      gsap.fromTo(el.querySelectorAll('.letter'),
        { opacity: 0.05 },
        { 
          opacity: 1, 
          stagger: 0.05, 
          duration: 0.425, 
          ease: 'power2.out',
          scrollTrigger: { 
            trigger: el, 
            start: 'top 80%', 
            end: 'top 45%', 
            scrub: true 
          }
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <>
      <section id="speciality" className="section slide-up-animation">
        <div className="container_full u-padding-72 overflow">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p className="paragraph_max_width u-font-size-1-35" style={{
              maxWidth: '33.33vw',
              fontSize: '1.35vw',
              textAlign: 'center',
              margin: 0,
              lineHeight: 1.5
            }}>
              From urban residences to commercial complexes, we design spaces that inspire and endure.
            </p>
          </div>
          <div className="space_large"></div>
          
          <h1 
            id="animated" 
            className="centered" 
            ref={headingRef}
            style={{
              textAlign: 'center',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-telegrafico)',
              margin: 0,
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              lineHeight: 1.1
            }}
          >
            {"Design Disciplines".split('').map((char, index) => (
              char === ' ' ? ' ' : <span key={index} className="letter" style={{ display: 'inline-block' }}>{char}</span>
            ))}
          </h1>
          
          <div className="title_space"></div>
          
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
          .section {
            padding-left: 5%;
            padding-right: 5%;
          }
          
          .container_full {
            width: 100%;
            max-width: 83.33vw;
            margin: 0 auto;
          }
          
          .u-padding-72 {
            padding-top: 5vw;
            padding-bottom: 5vw;
          }
          
          .space_large {
            min-height: 8.89vw;
          }

          .space {
            min-height: 4.44vw;
          }
          
          .sub_heading_wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 4.25svw;
          }
          
          .title_space {
            min-height: 4.25svw;
          }

          .overflow {
            overflow: hidden;
          }

          @media (max-width: 768px) {
            .paragraph_max_width {
              max-width: 80% !important;
              font-size: 4vw !important;
            }
          }
        `
      }} />
    </>
  );
}
