'use client';

import Link from 'next/link';
import Image from 'next/image';
import DigitalCredit from '@/components/ui/DigitalCredit';

export default function Footer() {
  return (
    <>
      {/* Footer Grid */}
      <section className="section" style={{ overflow: 'visible' }}>
        <div style={{
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          paddingTop: '4.5svw',
          paddingLeft: '5%',
          paddingRight: '5%'
        }}>
          <div className="footer-grid-container shadow">
            
            {/* Social Links — spans 3 cols */}
            <div className="footer-col footer-col-1">
              <h5 className="footer-heading">Follow us on</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '1rem' }}>
                <li>
                  <a href="https://www.linkedin.com/company/vision-architecture-india" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 50 50" fill="none">
                      <path d="M19.334 34.9565H14.7988V20.3521H19.334V34.9565ZM17.064 18.3599C15.6138 18.3599 14.4375 17.1587 14.4375 15.7085C14.4375 15.0119 14.7142 14.3439 15.2068 13.8513C15.6993 13.3587 16.3674 13.082 17.064 13.082C17.7605 13.082 18.4286 13.3587 18.9212 13.8513C19.4137 14.3439 19.6904 15.0119 19.6904 15.7085C19.6904 17.1587 18.5137 18.3599 17.064 18.3599ZM36.3076 34.9565H31.7822V27.8472C31.7822 26.1528 31.748 23.98 29.4243 23.98C27.0664 23.98 26.7051 25.8208 26.7051 27.7251V34.9565H22.1748V20.3521H26.5244V22.3442H26.5879C27.1934 21.1968 28.6724 19.9858 30.8789 19.9858C35.4688 19.9858 36.3125 23.0083 36.3125 26.9341V34.9565H36.3076Z" fill="currentColor"></path>
                      <circle cx="25" cy="25" r="24.25" stroke="currentColor" strokeWidth="1.5"></circle>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/visionarchitecture.in/" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 50 50" fill="none">
                      <circle cx="25" cy="25" r="24.25" stroke="currentColor" strokeWidth="1.5"></circle>
                      <path d="M28.6134 24.582C28.6134 25.3044 28.3992 26.0106 27.9979 26.6113C27.5965 27.2119 27.0261 27.6801 26.3587 27.9565C25.6913 28.233 24.9569 28.3053 24.2484 28.1643C23.5399 28.0234 22.889 27.6755 22.3782 27.1647C21.8674 26.6539 21.5196 26.0031 21.3786 25.2946C21.2377 24.5861 21.31 23.8517 21.5865 23.1843C21.8629 22.5169 22.3311 21.9464 22.9317 21.5451C23.5324 21.1437 24.2385 20.9295 24.9609 20.9295C25.9293 20.9306 26.8577 21.3158 27.5424 22.0005C28.2272 22.6853 28.6123 23.6137 28.6134 24.582ZM36.375 19.5598V29.6042C36.3731 31.2989 35.699 32.9235 34.5007 34.1218C33.3024 35.3201 31.6778 35.9942 29.9831 35.9961H19.9387C18.2441 35.9942 16.6194 35.3201 15.4211 34.1218C14.2228 32.9235 13.5488 31.2989 13.5469 29.6042V19.5598C13.5488 17.8652 14.2228 16.2405 15.4211 15.0422C16.6194 13.8439 18.2441 13.1699 19.9387 13.168H29.9831C31.6778 13.1699 33.3024 13.8439 34.5007 15.0422C35.699 16.2405 36.3731 17.8652 36.375 19.5598ZM30.4397 24.582C30.4397 23.4984 30.1184 22.4392 29.5164 21.5382C28.9143 20.6372 28.0587 19.935 27.0576 19.5203C26.0565 19.1057 24.9549 18.9972 23.8921 19.2086C22.8293 19.42 21.8531 19.9418 21.0869 20.708C20.3207 21.4742 19.7989 22.4504 19.5875 23.5132C19.3761 24.576 19.4846 25.6775 19.8992 26.6787C20.3139 27.6798 21.0161 28.5354 21.9171 29.1374C22.8181 29.7395 23.8773 30.0608 24.9609 30.0608C26.4135 30.0591 27.8061 29.4814 28.8332 28.4543C29.8603 27.4272 30.438 26.0346 30.4397 24.582ZM32.2659 18.6467C32.2659 18.3758 32.1856 18.111 32.0351 17.8858C31.8846 17.6605 31.6707 17.485 31.4204 17.3813C31.1701 17.2776 30.8947 17.2505 30.629 17.3033C30.3633 17.3562 30.1193 17.4866 29.9277 17.6782C29.7362 17.8698 29.6057 18.1138 29.5529 18.3795C29.5 18.6452 29.5272 18.9206 29.6308 19.1709C29.7345 19.42 29.91 19.6351 30.1353 19.7856C30.3605 19.9361 30.6254 20.0164 30.8962 20.0164C31.2595 20.0164 31.6079 19.8721 31.8648 19.6152C32.1216 19.3584 32.2659 19.01 32.2659 18.6467Z" fill="currentColor"></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* Office — spans 3 cols */}
            <div className="footer-col footer-col-2">
              <h5 className="footer-heading">Office</h5>
              <p className="footer-text">
                Vision Architecture 1121-1122 Iconic Shyamal, Opp. Shyamal Cross Road, Satellite, Ahmedabad, Gujarat 380015
              </p>
            </div>

            {/* Contacts — spans 4 cols */}
            <div className="footer-col footer-col-3">
              <h5 className="footer-heading">Contacts</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <a href="mailto:info.visionarchitecture@gmail.com" className="footer-text footer-contact-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                  info.visionarchitecture@gmail.com
                </a>
                <div style={{ display: 'flex', flexFlow: 'row wrap', gap: '0.4rem 0.8rem', alignItems: 'center' }}>
                  <a href="tel:+919687688373" className="footer-text footer-contact-link" style={{ textDecoration: 'none', color: 'inherit', whiteSpace: 'nowrap' }}>
                    +91 96876 88373
                  </a>
                  <span className="footer-contact-divider" style={{ opacity: 0.4, color: 'var(--charcoal-blue)' }}>•</span>
                  <a href="tel:+917359219598" className="footer-text footer-contact-link" style={{ textDecoration: 'none', color: 'inherit', whiteSpace: 'nowrap' }}>
                    +91 73592 19598
                  </a>
                </div>
              </div>
            </div>

            {/* Registration — spans 3 cols */}
            <div className="footer-col footer-col-4">
              <h5 className="footer-heading">Registration</h5>
              <div className="coa-badge-container">
                <Image
                  src="/images/NewCOA-scaled.png"
                  alt="Council of Architecture Registration"
                  className="coa-badge-image"
                  width={160}
                  height={70}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Navigation Links */}
      <div className="footer-space" style={{ minHeight: '3.5svw' }}></div>
      <div className="footer_links top_links">
        <a href="#about" className="footer_link">
          <h6 className="footer_link_text">About</h6>
        </a>
        <a href="#speciality" className="footer_link">
          <h6 className="footer_link_text">Speciality</h6>
        </a>
        <a href="#team" className="footer_link">
          <h6 className="footer_link_text">Team</h6>
        </a>
      </div>

      {/* Footer Policy Links */}
      <div style={{ minHeight: '1.7vw' }}></div>
      <div className="footer_links">
        <a href="/privacy-policy" className="footer_link">
          <h6 className="footer_link_text">Privacy Policy</h6>
        </a>
        <a href="/cookie-policy" className="footer_link">
          <h6 className="footer_link_text">Cookie Policy</h6>
        </a>
        <a href="/terms-conditions" className="footer_link">
          <h6 className="footer_link_text">Terms of Service</h6>
        </a>
      </div>

      {/* Copyright */}
      <div style={{ minHeight: '3.3vw' }}></div>
      <h6 className="footer-copyright">
        © 2022 - {new Date().getFullYear()} Vision Architecture. <br />
        All Rights Reserved.
      </h6>

      {/* Digital Experience Credit */}
      <DigitalCredit variant="homepage" />

      {/* Large "VISION ARCHITECTURE" text at very bottom */}
      <div className="space_largish"></div>
      <div className="cut-wrapper">
        <div className="footer-wrapper">
          <h5 className="footer-h5">We Are</h5>
          <h1 className="footer-title">Vision Architecture</h1>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          /* ===== Footer CSS Styles ===== */
          .footer-grid-container {
            background-color: var(--white, #f9f9f9);
            border-radius: 1.5svw;
            padding: 2.2vw;
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 1.5rem;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(47, 52, 64, 0.08);
          }

          .footer-col {
            display: flex;
            flex-direction: column;
            gap: 1svw;
          }

          .footer-col-1 { grid-column: span 2; }
          .footer-col-2 { grid-column: span 3; }
          .footer-col-3 { grid-column: span 4; }
          .footer-col-4 { grid-column: span 3; }

          .footer-contact-link {
            transition: color 0.3s;
          }
          .footer-contact-link:hover {
            color: #8B2635 !important;
          }

          .footer-heading {
            color: var(--charcoal-blue, #2f3440);
            letter-spacing: .14vw;
            text-transform: uppercase;
            font-size: .75svw;
            font-weight: 300;
            line-height: 120%;
            margin: 0;
          }

          .footer-text {
            font-size: 1.1458vw;
            line-height: 150%;
            color: var(--charcoal-blue, #2f3440);
            font-weight: 300;
            letter-spacing: .07vw;
            margin: 0;
            text-wrap: balance;
          }

          .footer-social-link {
            color: var(--charcoal-blue, #2f3440);
            transition: color 0.3s, transform 0.3s;
            display: inline-block;
          }

          .footer-social-link:hover {
            color: #8B2635;
            transform: scale(1.05);
          }

          /* Council of Architecture Badge styling */
          .coa-badge-container {
            margin-top: 0.25rem;
            width: 100%;
            max-width: 160px;
            display: flex;
            align-items: center;
          }

          .coa-badge-image {
            width: 100%;
            height: auto;
            max-height: 70px;
            object-fit: contain;
            filter: grayscale(100%) opacity(0.8);
            transition: all 0.4s ease;
          }

          .coa-badge-container:hover .coa-badge-image {
            filter: grayscale(0%) opacity(1);
            transform: scale(1.03);
          }

          /* ===== Footer Large Text — Exact from reference ===== */
          .space_largish {
            min-height: 4.5svw; /* Reduced by ~28% to lift it higher */
          }

          .cut-wrapper {
            max-height: 8.1vw; /* Reduced by 10% from 9vw */
            overflow: hidden;
          }

          .footer-wrapper {
            grid-column-gap: 0vw;
            grid-row-gap: 0vw;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            min-width: 68.5vw; /* Reduced by 10% from 76.1vw */
            max-width: 68.5vw; /* Reduced by 10% from 76.1vw */
            margin-left: auto;
            margin-right: auto;
            display: flex;
            position: relative;
          }

          .footer-h5 {
            margin-bottom: 0;
            font-family: 'Satoshi', sans-serif;
            font-weight: 300;
            text-transform: uppercase;
            letter-spacing: 0.14vw;
            font-size: clamp(0.7rem, 1vw, 1.2rem);
            color: var(--charcoal-blue, #2f3440);
          }

          .footer-title {
            z-index: 1;
            white-space: nowrap;
            justify-content: center;
            align-items: flex-start;
            font-size: 9vw; /* Reduced by 10% from 10vw */
            line-height: 9vw; /* Reduced by 10% from 10vw */
            display: flex;
            position: relative;
            font-family: var(--font-telegrafico);
            color: var(--charcoal-blue, #2f3440);
            text-transform: uppercase;
            font-weight: 300; /* Reduced from 400 for a lighter weight feel */
            margin: 0;
          }

          /* Footer shadow card */
          .shadow {
            box-shadow: 0 1.7vw 4.4vw 1.1vw rgba(0, 0, 0, 0.12);
          }

          /* ===== Footer Links (nav + policy) ===== */
          .footer_links {
            grid-column-gap: 3rem;
            grid-row-gap: 3rem;
            flex-flow: row;
            justify-content: center;
            align-items: center;
            display: flex;
          }

          .footer_link {
            text-decoration: none;
            color: inherit;
            transition: opacity 0.3s ease;
          }

          .footer_link:hover {
            opacity: 0.7;
          }

          .footer_link_text {
            color: #2f3440bf;
            font-size: .85vw;
            font-weight: 500;
            margin: 0;
            font-family: 'Satoshi', sans-serif;
          }

          /* Copyright */
          .footer-copyright {
            text-align: center;
            color: var(--charcoal-blue, #2f3440);
            font-size: .85vw;
            font-weight: 300;
            line-height: 160%;
            margin: 0;
            font-family: 'Satoshi', sans-serif;
            opacity: 0.75;
          }

          /* ===== Responsive — Landscape Tablet (max 991px) ===== */
          @media (max-width: 991px) {
            .footer-grid-container {
              grid-template-columns: repeat(2, 1fr);
              gap: 2.5rem;
              padding: 4vw;
              border-radius: 2.5vw;
            }
            .footer-col-1, .footer-col-2, .footer-col-3, .footer-col-4 {
              grid-column: span 1;
            }
            .footer-heading {
              font-size: 1.5vw;
            }
            .footer-text {
              font-size: 2vw;
            }
            .coa-badge-container {
              max-width: 140px;
            }

            .cut-wrapper {
              max-height: 6.3rem;
            }
            .footer-wrapper {
              grid-column-gap: .5rem;
              grid-row-gap: .5rem;
              flex-flow: column;
              min-width: 100%;
              max-width: 100%;
            }
            .footer-h5 {
              font-size: 1.85vw;
            }
            .footer-title {
              font-size: 10.15vw;
              line-height: 6.3rem;
            }
            .footer_link_text {
              font-size: 1.85vw;
            }
            .footer-copyright {
              font-size: 1.85vw;
            }
          }

          /* ===== Responsive — Portrait Tablet (max 767px) ===== */
          @media (max-width: 767px) {
            .footer-grid-container {
              grid-template-columns: 1fr;
              gap: 2rem;
              padding: 6vw 4vw;
              border-radius: 3.5vw;
              text-align: center;
            }
            .footer-col {
              align-items: center;
            }
            .footer-heading {
              font-size: 2.5vw;
            }
            .footer-text {
              font-size: 3vw;
            }
            .coa-badge-container {
              justify-content: center;
              max-width: 120px;
            }
            .cut-wrapper {
              display: none !important;
            }
            .space_largish {
              display: none !important;
            }
            .footer_links {
              grid-column-gap: 2rem;
              grid-row-gap: 2rem;
              flex-flow: column;
            }
            .footer_links.top_links {
              border-bottom: 1px solid var(--charcoal-blue, #2f3440);
              padding-top: 2rem;
              padding-bottom: 2rem;
            }
            .footer_link_text {
              font-size: 2.5vw;
            }
            .footer-copyright {
              font-size: 2.85vw;
              line-height: 140%;
            }
          }

          /* ===== Responsive — Mobile (max 478px) ===== */
          @media (max-width: 478px) {
            .footer-heading {
              font-size: 3.5vw;
            }
            .footer-text {
              font-size: 4vw;
            }
            .cut-wrapper {
              display: none !important;
            }
            .space_largish {
              display: none !important;
            }
            .footer_link_text {
              font-size: 4vw;
            }
            .footer-copyright {
              font-size: 4vw;
            }
          }
        `
      }} />
    </>
  );
}
