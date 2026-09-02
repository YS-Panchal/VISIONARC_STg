'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <>
      <head>
        <title>Page Not Found | Vision Architecture</title>
        <meta name="description" content="You've wandered off the master plan. Let's take you back to the drawing board of Vision Architecture." />
        <meta name="robots" content="noindex" />
      </head>

      <main className="nf-page-wrapper">
        {/* ===== SPLIT MAIN CONTAINER ===== */}
        <div className="nf-split-container">
          
          {/* LEFT COLUMN — Content */}
          <div className="nf-left-col">
            <div className="nf-left-inner">
              
              {/* Decorative Crosshair Icon */}
              <div className="nf-blueprint-crosshair nf-anim-delay-1">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8B2635" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <line x1="1" y1="12" x2="23" y2="12" />
                </svg>
              </div>

              {/* Title */}
              <h1 className="nf-title">
                <span className="nf-title-line nf-anim-delay-2">YOU&apos;VE WANDERED</span>
                <span className="nf-title-line nf-anim-delay-3">OFF THE</span>
                <span className="nf-title-line nf-highlight nf-anim-delay-4">MASTER PLAN.</span>
              </h1>

              {/* Decorative Divider */}
              <div className="nf-divider nf-anim-delay-5"></div>

              {/* Description */}
              <p className="nf-description nf-anim-delay-6">
                This destination isn&apos;t on our site map anymore.
                Let&apos;s take you back to the drawing board.
              </p>

              {/* Action Buttons */}
              <div className="nf-actions nf-anim-delay-7">
                <Link href="/" className="nf-btn-primary">
                  <span>Return Home</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link href="/#speciality" className="nf-btn-secondary">
                  <span>Explore Projects</span>
                  <svg className="nf-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN — Blueprint Image */}
          <div className="nf-right-col">
            <div className="nf-image-wrap">
              <Image
                src="/images/404.png"
                alt="Architectural visualization rendering emerging from a drafting blueprint layout"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
                className="nf-blueprint-img"
              />
            </div>
          </div>

        </div>

        {/* ===== BOTTOM QUOTE SECTION ===== */}
        <section className="nf-quote-section nf-anim-delay-8">
          <div className="nf-quote-container">
            <div className="nf-quote-line left-line"></div>
            <div className="nf-quote-content">
              <blockquote className="nf-blockquote">
                &ldquo;Every great structure begins with a vision.&rdquo;
              </blockquote>
              <cite className="nf-cite">— Yash S Panchal</cite>
            </div>
            <div className="nf-quote-line right-line"></div>
          </div>
        </section>

      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
          /* ===== 404 Animations Keyframes ===== */
          @keyframes nfFadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          @keyframes nfSlideUp {
            0% { opacity: 0; transform: translateY(18px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes nfBlueprintFade {
            0% { opacity: 0; filter: blur(12px) contrast(0.85); transform: scale(1.04); }
            100% { opacity: 1; filter: blur(0) contrast(1); transform: scale(1); }
          }

          @keyframes nfFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }

          @keyframes nfLineSlide {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(4px); }
          }

          /* ===== Styles Base ===== */
          .nf-page-wrapper {
            background-color: #FAFAF8;
            height: 100vh;
            height: 100dvh;
            max-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
          }

          /* ===== SPLIT CONTAINER ===== */
          .nf-split-container {
            display: flex;
            flex: 1;
            width: 100%;
            min-height: 0;
            padding-top: clamp(1rem, 2.5vh, 2.5rem);
          }

          /* Left Column (Content) */
          .nf-left-col {
            width: 46%;
            display: flex;
            align-items: center;
            padding: 1rem 0;
            position: relative;
            height: 100%;
          }

          .nf-left-inner {
            padding: 0 clamp(2rem, 4.5vw, 4.5rem);
            width: 100%;
            max-width: 600px;
            margin-left: auto;
          }

          /* Crosshair Icon styling */
          .nf-blueprint-crosshair {
            margin-bottom: clamp(1rem, 1.6vh, 1.8rem);
            opacity: 0;
            transform: translateY(16px);
            animation: nfSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          /* Title */
          .nf-title {
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(1.85rem, 3.1vw, 3.6rem);
            line-height: 1.12;
            color: #2f3440;
            font-weight: bold;
            margin: 0 0 clamp(0.9rem, 1.5vh, 1.4rem) 0;
            display: flex;
            flex-direction: column;
            letter-spacing: -0.01em;
          }

          .nf-title-line {
            display: block;
            opacity: 0;
            transform: translateY(20px);
            animation: nfSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .nf-highlight {
            color: #8B2635;
          }

          /* Divider */
          .nf-divider {
            width: 70px;
            height: 2px;
            background-color: #8B2635;
            margin-bottom: clamp(0.9rem, 1.5vh, 1.5rem);
            opacity: 0;
            transform: translateY(12px);
            animation: nfSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          /* Description */
          .nf-description {
            font-family: 'Satoshi', sans-serif;
            font-size: clamp(0.85rem, 0.95vw, 1.02rem);
            line-height: 1.65;
            color: rgba(47, 52, 64, 0.78);
            font-weight: 300;
            letter-spacing: 0.01em;
            margin-bottom: clamp(1.4rem, 2.4vh, 2.6rem);
            max-width: 450px;
            opacity: 0;
            transform: translateY(14px);
            animation: nfSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          /* CTAs */
          .nf-actions {
            display: flex;
            align-items: center;
            gap: clamp(0.85rem, 1.2vw, 1.3rem);
            opacity: 0;
            transform: translateY(14px);
            animation: nfSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .nf-btn-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.55rem;
            padding: clamp(0.7rem, 0.9vw, 0.85rem) clamp(1.4rem, 2vw, 2rem);
            background-color: #8B2635;
            color: #FAFAF8;
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(0.66rem, 0.75vw, 0.8rem);
            letter-spacing: 0.15em;
            text-transform: uppercase;
            text-decoration: none;
            border: none;
            border-radius: 2px;
            cursor: pointer;
            transition: background-color 0.35s ease, transform 0.25s ease, box-shadow 0.35s ease;
            font-weight: 400;
          }

          .nf-btn-primary:hover {
            background-color: #722030;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(139, 38, 53, 0.25);
          }

          .nf-btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 0.55rem;
            padding: clamp(0.7rem, 0.9vw, 0.85rem) clamp(1.4rem, 2vw, 2rem);
            background: transparent;
            color: #2f3440;
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(0.66rem, 0.75vw, 0.8rem);
            letter-spacing: 0.15em;
            text-transform: uppercase;
            text-decoration: none;
            border: 1px solid #2f3440;
            border-radius: 2px;
            cursor: pointer;
            transition: color 0.3s ease, border-color 0.3s ease, transform 0.25s ease;
            font-weight: 400;
          }

          .nf-btn-secondary:hover {
            color: #8B2635;
            border-color: #8B2635;
            transform: translateY(-2px);
          }

          .nf-arrow {
            transition: transform 0.3s ease;
          }

          .nf-btn-secondary:hover .nf-arrow {
            animation: nfLineSlide 0.6s ease infinite;
          }

          /* Right Column (Image Hero) */
          .nf-right-col {
            width: 54%;
            height: 100%;
            position: relative;
            overflow: hidden;
            padding-right: clamp(1rem, 2.5vw, 2.5rem);
            display: flex;
            align-items: center;
          }

          .nf-image-wrap {
            width: 100%;
            height: 94%;
            max-height: calc(100vh - 120px);
            border-radius: 24px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.06);
            animation: nfBlueprintFade 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .nf-blueprint-img {
            object-fit: cover;
            animation: nfFloat 6s ease-in-out infinite;
            will-change: transform;
          }

          /* ===== BOTTOM QUOTE SECTION ===== */
          .nf-quote-section {
            width: 100%;
            padding: clamp(0.8rem, 1.6vh, 1.4rem) 5% clamp(1rem, 2vh, 1.6rem);
            background-color: #FAFAF8;
            opacity: 0;
            transform: translateY(14px);
            animation: nfSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            flex-shrink: 0;
            z-index: 10;
          }

          .nf-quote-container {
            max-width: 920px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: clamp(1rem, 2.5vw, 2.5rem);
          }

          .nf-quote-line {
            height: 1px;
            flex: 1;
            background-color: rgba(139, 38, 53, 0.22);
          }

          .nf-quote-content {
            text-align: center;
            max-width: 620px;
            display: flex;
            align-items: baseline;
            justify-content: center;
            gap: 0.75rem;
            flex-wrap: wrap;
          }

          .nf-blockquote {
            font-family: var(--font-telegrafico), sans-serif;
            font-size: clamp(0.88rem, 1.08vw, 1.15rem);
            line-height: 1.35;
            color: #2f3440;
            font-weight: 500;
            letter-spacing: -0.01em;
            margin: 0;
          }

          .nf-cite {
            font-family: 'Satoshi', sans-serif;
            font-size: clamp(0.7rem, 0.78vw, 0.85rem);
            color: #8B2635;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            font-style: normal;
            white-space: nowrap;
          }

          /* ===== STAGGER DELAYS ===== */
          .nf-anim-delay-1 { animation-delay: 0.1s; }
          .nf-anim-delay-2 { animation-delay: 0.2s; }
          .nf-anim-delay-3 { animation-delay: 0.3s; }
          .nf-anim-delay-4 { animation-delay: 0.4s; }
          .nf-anim-delay-5 { animation-delay: 0.5s; }
          .nf-anim-delay-6 { animation-delay: 0.6s; }
          .nf-anim-delay-7 { animation-delay: 0.72s; }
          .nf-anim-delay-8 { animation-delay: 0.85s; }

          /* ===== RESPONSIVE HANDLING ===== */
          @media (max-height: 700px) and (min-width: 1025px) {
            .nf-split-container {
              padding-top: 0.5rem;
            }
            .nf-description {
              margin-bottom: 1.2rem;
            }
            .nf-quote-section {
              padding-top: 0.5rem;
              padding-bottom: 0.6rem;
            }
          }

          /* Tablet & Mobile Fallback */
          @media (max-width: 1024px) {
            .nf-page-wrapper {
              height: auto;
              max-height: none;
              min-height: 100vh;
              overflow-y: auto;
            }

            .nf-split-container {
              flex-direction: column;
              padding-top: 2rem;
            }

            .nf-left-col {
              width: 100%;
              padding: 1.5rem 0 2.5rem;
            }

            .nf-left-inner {
              max-width: 100%;
              padding: 0 5%;
            }

            .nf-right-col {
              width: 100%;
              height: 44vh;
              min-height: 300px;
              padding-right: 0;
            }

            .nf-image-wrap {
              border-radius: 20px;
              margin: 0 5%;
              width: 90%;
              height: 100%;
            }

            .nf-title {
              font-size: clamp(2rem, 5.5vw, 3rem);
            }

            .nf-quote-section {
              padding: 2.5rem 5%;
            }
          }

          @media (max-width: 768px) {
            .nf-actions {
              flex-direction: column;
              align-items: stretch;
              width: 100%;
              gap: 0.85rem;
            }

            .nf-btn-primary,
            .nf-btn-secondary {
              width: 100%;
              padding: 0.85rem 1rem;
            }

            .nf-quote-container {
              flex-direction: column;
              gap: 0.85rem;
            }

            .nf-quote-line {
              width: 60px;
              height: 1px;
              flex: none;
            }
          }
        `
      }} />
    </>
  );
}
