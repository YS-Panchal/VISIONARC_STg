'use client';

import { useState, useEffect } from 'react';

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutEl = document.getElementById('about');
      const contactEl = document.getElementById('contact');
      if (!aboutEl) return;

      const aboutRect = aboutEl.getBoundingClientRect();
      const contactRect = contactEl ? contactEl.getBoundingClientRect() : null;

      // "Reaches about" -> top of #about is within viewport or above (80% window height)
      const reachedAbout = aboutRect.top <= window.innerHeight * 0.8;
      
      // "Enters let's talk" -> top of #contact enters the viewport (90% window height)
      const enteredContact = contactRect ? contactRect.top <= window.innerHeight * 0.9 : false;

      setIsVisible(reachedAbout && !enteredContact);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Run initially to evaluate scroll state on load
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('info.visionarchitecture@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div 
        className="floating-actions-container"
        style={{
          position: 'fixed',
          bottom: '2.5rem',
          right: '5%',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          pointerEvents: isVisible ? 'auto' : 'none',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(2rem) scale(0.95)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Email Copy Pill */}
        <button
          onClick={handleCopyEmail}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.8rem',
            height: '2.8rem',
            borderRadius: '50%',
            backgroundColor: '#2f3440', // var(--charcoal-blue)
            color: '#f9f9f9', // var(--white)
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            transition: 'background-color 0.3s, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            outline: 'none',
            position: 'relative'
          }}
          className="email-copy-pill-btn"
          aria-label="Copy email address"
        >
          {copied ? (
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          )}
          {copied && (
            <span style={{
              position: 'absolute',
              right: '3.5rem',
              backgroundColor: '#2f3440',
              color: '#fff',
              padding: '0.4rem 0.8rem',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-telegrafico), sans-serif',
              pointerEvents: 'none'
            }}>
              COPIED!
            </span>
          )}
        </button>

        {/* Scroll To Top Button */}
        <button
          onClick={handleScrollToTop}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.8rem',
            height: '2.8rem',
            borderRadius: '50%',
            backgroundColor: '#f9f9f9', // var(--white)
            color: '#2f3440', // var(--charcoal-blue)
            border: '1px solid rgba(47, 52, 64, 0.15)',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
            transition: 'background-color 0.3s, color 0.3s, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s',
            outline: 'none',
          }}
          className="scroll-to-top-btn"
          aria-label="Scroll to top"
        >
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .email-copy-pill-btn:hover {
            background-color: #1d2025 !important;
            transform: scale(1.03);
          }
          .scroll-to-top-btn:hover {
            background-color: #2f3440 !important;
            color: #f9f9f9 !important;
            border-color: #2f3440 !important;
            transform: scale(1.05);
          }
          @media (max-width: 600px) {
            .floating-actions-container {
              bottom: 1.5rem !important;
              right: 1.5rem !important;
              left: auto !important;
              width: auto !important;
            }
          }
        `
      }} />
    </>
  );
}
