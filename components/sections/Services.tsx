'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const servicesData = [
  {
    subtitle: 'Our Approach',
    title: 'Innovative Vision',
    desc: 'Blending aesthetics with cutting-edge technology and sustainable practices to create future-ready spaces that inspire.',
    video: '/videos/scroll-1.mp4'
  },
  {
    subtitle: 'our craft',
    title: 'Functional Precision',
    desc: 'Designs that are as practical as they are beautiful, meticulously tailored to the human experience and functional excellence.',
    video: '/videos/scroll-2.mp4'
  },
  {
    subtitle: 'Our method',
    title: 'Cultural Reverence',
    desc: 'Merging modern functionality with a deep respect for local context, heritage, and the environment in every structure.',
    video: '/videos/scroll-3.mp4'
  }
];

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      document.querySelectorAll('.service_item_wrapper').forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 50,
          duration: 1.25,
          scrollTrigger: {
            trigger: item,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={containerRef} className="section">
        <div className="container_full padding-72px-copy">
          <div className="services_scroll_wrapper">
            
            {/* Left Column */}
            <div className="services_scroll_start">
              {servicesData.slice(0, 2).map((service, i) => (
                <div key={i} className="service_item_wrapper">
                  <div className="service">
                    <div className="service_image_wrapper">
                      <video 
                        className="service_image" 
                        autoPlay 
                        playsInline 
                        loop 
                        muted 
                        preload="auto"
                      >
                        <source src={service.video} type="video/mp4" />
                      </video>
                    </div>
                    
                    <h6 className="sub_title" style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                      {service.subtitle}
                    </h6>
                    
                    <h3 className="title" style={{ fontFamily: 'var(--font-telegrafico)', fontSize: 'clamp(2rem, 3.5vw, 4rem)', margin: '0 0 1.5rem 0', lineHeight: 1.1 }}>
                      {service.title}
                    </h3>
                    
                    <div className="description">
                      <p style={{ maxWidth: '400px', lineHeight: 1.6, color: '#4a4a4a' }}>
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Center Column - Sticky Video */}
            <div className="services_scroll_middle">
              <div style={{ width: '100%', height: '80%', position: 'relative', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
                <video 
                  autoPlay 
                  playsInline 
                  loop 
                  muted 
                  preload="auto"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                >
                  <source src="/videos/scroll.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Right Column */}
            <div className="services_scroll_end">
              <div className="service_item_wrapper">
                <div className="service">
                  <div className="service_image_wrapper">
                    <video 
                      className="service_image" 
                      autoPlay 
                      playsInline 
                      loop 
                      muted 
                      preload="auto"
                    >
                      <source src={servicesData[2].video} type="video/mp4" />
                    </video>
                  </div>
                  
                  <h6 className="sub_title" style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                    {servicesData[2].subtitle}
                  </h6>
                  
                  <h3 className="title" style={{ fontFamily: 'var(--font-telegrafico)', fontSize: 'clamp(2rem, 3.5vw, 4rem)', margin: '0 0 1.5rem 0', lineHeight: 1.1 }}>
                    {servicesData[2].title}
                  </h3>
                  
                  <div className="description">
                    <p style={{ maxWidth: '400px', lineHeight: 1.6, color: '#4a4a4a' }}>
                      {servicesData[2].desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
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

          .padding-72px-copy {
            padding-top: 5vw;
            padding-bottom: 5vw;
          }

          .services_scroll_wrapper {
            column-gap: 3rem;
            row-gap: 2rem;
            grid-template-columns: 4fr 5fr 4fr;
            width: 100%;
            height: auto;
            display: grid;
            position: relative;
          }

          .services_scroll_start {
            gap: 40svh;
            flex-flow: column;
            width: 100%;
            height: 100%;
            padding-top: 60svh;
            display: flex;
          }

          .services_scroll_middle {
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100svh;
            display: flex;
            position: sticky;
            top: 0;
          }

          .services_scroll_end {
            width: 100%;
            height: 100%;
            padding-top: 130svh;
          }

          .service_item_wrapper {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            height: 100vh;
            display: flex;
          }

          .service {
            display: flex;
            flex-direction: column;
          }

          .service_image_wrapper {
            display: none;
            width: 100%;
            border-radius: var(--border-radius);
            overflow: hidden;
            margin-bottom: 2rem;
          }

          .service_image {
            aspect-ratio: 1;
            object-fit: cover;
            width: 100%;
          }

          .sub_title {
            padding-left: 0.25rem;
            position: relative;
          }

          .title {
            text-align: left;
            text-transform: uppercase;
          }

          @media (max-width: 1024px) {
            .services_scroll_wrapper {
              display: flex;
              flex-direction: column;
            }
            .services_scroll_middle {
              display: none;
            }
            .services_scroll_start, .services_scroll_end {
              padding-top: 0;
              gap: 10vh;
              height: auto;
            }
            .service_item_wrapper {
              height: auto;
              margin-bottom: 5vh;
            }
            .service_image_wrapper {
              display: block;
            }
          }
        `
      }} />
    </>
  );
}
