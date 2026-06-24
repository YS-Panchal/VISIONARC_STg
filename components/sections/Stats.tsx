'use client';

import { useEffect, useRef } from 'react';

const statsData = [
  { target: 15, label: 'Years of Experience' },
  { target: 100, label: 'Projects Completed' },
  { target: 12, label: 'Cities Reached' },
  { target: 25, label: 'Awards Won' }
];

export default function Stats() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const statItems = document.querySelectorAll('.va-stat-number');
    
    const animateCount = (el: Element) => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      const valEl = el.querySelector('.va-stat-num-val');
      if (!valEl) return;
      
      let count = 0;
      const duration = 2000; // 2 seconds
      const startTime = performance.now();
      
      const update = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutQuad)
        const easeProgress = progress * (2 - progress);
        
        count = Math.floor(easeProgress * target);
        valEl.textContent = count.toString();
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          valEl.textContent = target.toString();
        }
      };
      
      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
              animateCount(entry.target);
          }, 1500); // Wait for intro to clear
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    statItems.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section 
        className="section va-stats-section"
        ref={containerRef}
      >
        <div className="va-stats-strip">
          {statsData.map((stat, index) => (
            <div key={index} className="va-stat-item">
              <div 
                className="va-stat-number" 
                data-target={stat.target}
                style={{
                  fontFamily: 'var(--font-bank-gothic)',
                  fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
                  lineHeight: 1,
                  color: '#2f3440',
                  letterSpacing: '-0.02em',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.08em',
                  whiteSpace: 'nowrap'
                }}
              >
                <span 
                  className="va-stat-num-val"
                  style={{
                    fontFamily: 'var(--font-bank-gothic)',
                    fontSize: 'inherit'
                  }}
                >
                  0
                </span>
                <span 
                  className="va-stat-suffix"
                  style={{
                    fontFamily: 'var(--font-bank-gothic)',
                    fontSize: '0.55em'
                  }}
                >
                  +
                </span>
              </div>
              <div 
                className="va-stat-label"
                style={{
                  fontFamily: 'var(--font-telegrafico)',
                  fontSize: 'clamp(0.62rem, 1vw, 0.82rem)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#2f3440',
                  opacity: 0.6,
                  marginTop: '0.6rem',
                  textAlign: 'center',
                  whiteSpace: 'nowrap'
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
          .va-stats-strip {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            padding: 3rem 4rem;
            border-top: 1px solid rgba(47,52,64,0.12);
            border-bottom: 1px solid rgba(47,52,64,0.12);
            width: 100%;
            box-sizing: border-box;
          }
          
          .va-stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1 1 0;
            min-width: 0;
            padding: 1rem 2rem;
            position: relative;
          }
          
          .va-stat-item:not(:last-child)::after {
            content: '';
            position: absolute;
            right: 0;
            top: 10%;
            height: 80%;
            width: 1px;
            background: rgba(47,52,64,0.15);
          }

          @media (max-width: 767px) {
            .va-stats-strip {
              flex-wrap: wrap !important;
              padding: 2rem 1.5rem;
            }
            .va-stat-item {
              flex: 0 0 48% !important;
              padding: 1.2rem 0.5rem;
            }
            .va-stat-item:not(:last-child)::after {
              display: none;
            }
          }
        `
      }} />
    </>
  );
}
