'use client';

import { useState } from 'react';

interface DigitalCreditProps {
  variant?: 'homepage' | 'speciality';
}

export default function DigitalCredit({ variant = 'homepage' }: DigitalCreditProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === 'speciality') {
    return (
      <>
        <div
          className="dc-sp-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Default state */}
          <div className={`dc-sp-default ${isHovered ? 'dc-sp-hidden' : ''}`}>
            <span className="dc-sp-line" />
            <span className="dc-sp-text">
              DIGITAL EXPERIENCE BY <span className="dc-sp-ys-highlight">YS</span> ↗
            </span>
            <span className="dc-sp-line" />
          </div>
          {/* Hover expanded state */}
          <div className={`dc-sp-expanded ${isHovered ? 'dc-sp-visible' : ''}`}>
            <span className="dc-sp-label">DIGITAL EXPERIENCE BY</span>
            <span className="dc-sp-ys">YS</span>
            <span className="dc-sp-capabilities">DESIGNED · DEVELOPED · MAINTAINED</span>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .dc-sp-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            height: clamp(3rem, 3.8vw, 3.8rem);
            margin: 0.5rem 0;
            cursor: default;
            position: relative;
            width: 100%;
          }
          .dc-sp-default {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            position: absolute;
            inset: 0;
            pointer-events: auto;
          }
          .dc-sp-default.dc-sp-hidden {
            opacity: 0;
            transform: scale(0.96);
            pointer-events: none;
          }
          .dc-sp-text {
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(0.69rem, 0.78vw, 0.85rem);
            letter-spacing: 0.2em;
            color: rgba(47, 52, 64, 0.55);
            text-transform: uppercase;
            white-space: nowrap;
          }
          .dc-sp-ys-highlight {
            font-weight: 700;
            color: #1a1d24;
            letter-spacing: 0.12em;
          }
          .dc-sp-line {
            display: block;
            width: clamp(1.9rem, 3.8vw, 3.8rem);
            height: 1px;
            background: rgba(47, 52, 64, 0.18);
            flex-shrink: 0;
          }
          .dc-sp-expanded {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
            opacity: 0;
            transform: scale(0.96);
            transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
            position: absolute;
            inset: 0;
          }
          .dc-sp-expanded.dc-sp-visible {
            opacity: 1;
            transform: scale(1);
            pointer-events: auto;
          }
          .dc-sp-label {
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(0.6rem, 0.69vw, 0.73rem);
            letter-spacing: 0.24em;
            color: rgba(47, 52, 64, 0.45);
            text-transform: uppercase;
          }
          .dc-sp-ys {
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(1.5rem, 2vw, 2.25rem);
            font-weight: bold;
            color: #1a1d24;
            letter-spacing: 0.12em;
            line-height: 1.1;
          }
          .dc-sp-capabilities {
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(0.65rem, 0.75vw, 0.82rem);
            letter-spacing: 0.22em;
            color: #1a1d24;
            font-weight: 700;
            text-transform: uppercase;
          }
          @media (max-width: 768px) {
            .dc-sp-wrapper {
              height: 2.4rem;
            }
          }
          @media (hover: none) {
            .dc-sp-expanded { display: none !important; }
            .dc-sp-default.dc-sp-hidden {
              opacity: 1 !important;
              transform: none !important;
              pointer-events: auto !important;
            }
          }
        `}} />
      </>
    );
  }

  // Homepage variant
  return (
    <>
      <div
        className="dc-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Default state — single line */}
        <div className={`dc-default ${isHovered ? 'dc-hidden' : ''}`}>
          <span className="dc-line dc-line-left" />
          <span className="dc-default-text">
            DIGITAL EXPERIENCE BY <span className="dc-ys-highlight">YS</span>
          </span>
          <span className="dc-line dc-line-right" />
        </div>

        {/* Hover expanded state — 3 tiers */}
        <div className={`dc-expanded ${isHovered ? 'dc-visible' : ''}`}>
          <div className="dc-expanded-inner">
            <span className="dc-line dc-line-left dc-line-short" />
            <div className="dc-expanded-content">
              <span className="dc-label">DIGITAL EXPERIENCE BY</span>
              <span className="dc-ys">YS</span>
              <div className="dc-capabilities">
                <span className="dc-cap-item dc-cap-1">DESIGNED</span>
                <span className="dc-cap-dot">·</span>
                <span className="dc-cap-item dc-cap-2">DEVELOPED</span>
                <span className="dc-cap-dot">·</span>
                <span className="dc-cap-item dc-cap-3">MAINTAINED</span>
              </div>
            </div>
            <span className="dc-line dc-line-right dc-line-short" />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dc-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          height: clamp(5.4rem, 7vw, 6.8rem);
          margin: 0.5rem 0;
          cursor: default;
          position: relative;
          width: 100%;
        }

        /* ── Default single-line state ── */
        .dc-default {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
          position: absolute;
          inset: 0;
          pointer-events: auto;
        }
        .dc-default.dc-hidden {
          opacity: 0;
          transform: scale(0.96);
          pointer-events: none;
        }
        .dc-default-text {
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-size: clamp(0.85rem, 0.94vw, 1.03rem);
          letter-spacing: 0.24em;
          color: rgba(47, 52, 64, 0.55);
          text-transform: uppercase;
          white-space: nowrap;
          font-weight: 400;
        }
        .dc-ys-highlight {
          font-weight: 700;
          color: #1a1d24;
          letter-spacing: 0.14em;
        }
        .dc-line {
          display: block;
          height: 1px;
          background: rgba(47, 52, 64, 0.18);
          flex-shrink: 0;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dc-line-left, .dc-line-right {
          width: clamp(3.75rem, 10vw, 10rem);
        }
        .dc-line-short {
          width: clamp(1.9rem, 5vw, 5rem);
        }

        /* ── Expanded 3-tier state ── */
        .dc-expanded {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: scale(0.96);
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          width: 100%;
        }
        .dc-expanded.dc-visible {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }
        .dc-expanded-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          width: 100%;
        }
        .dc-expanded-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }
        .dc-label {
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-size: clamp(0.69rem, 0.78vw, 0.85rem);
          letter-spacing: 0.24em;
          color: rgba(47, 52, 64, 0.45);
          text-transform: uppercase;
        }
        .dc-ys {
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-size: clamp(2.25rem, 3.1vw, 3.5rem);
          font-weight: bold;
          color: #1a1d24;
          letter-spacing: 0.12em;
          line-height: 1.1;
        }
        .dc-capabilities {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .dc-cap-item {
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-size: clamp(0.75rem, 0.88vw, 0.98rem);
          letter-spacing: 0.2em;
          color: #1a1d24;
          font-weight: 700;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dc-cap-dot {
          font-size: 0.75rem;
          font-weight: 700;
          color: #1a1d24;
          opacity: 0;
          transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dc-expanded.dc-visible .dc-cap-item,
        .dc-expanded.dc-visible .dc-cap-dot {
          opacity: 1;
          transform: translateY(0);
        }
        .dc-expanded.dc-visible .dc-cap-1 { transition-delay: 0.06s; }
        .dc-expanded.dc-visible .dc-cap-2 { transition-delay: 0.12s; }
        .dc-expanded.dc-visible .dc-cap-3 { transition-delay: 0.18s; }

        /* ── Mobile: stay as single line ── */
        @media (max-width: 767px) {
          .dc-wrapper {
            height: 3rem;
            margin: 0.5rem 0;
          }
        }
        @media (hover: none) {
          .dc-expanded { display: none !important; }
          .dc-default.dc-hidden {
            opacity: 1 !important;
            transform: none !important;
            pointer-events: auto !important;
          }
        }
      `}} />
    </>
  );
}
