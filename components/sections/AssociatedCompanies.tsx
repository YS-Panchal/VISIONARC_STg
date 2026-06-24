'use client';

import Image from 'next/image';

export default function AssociatedCompanies() {
  return (
    <>
      <section id="associated-companies" className="section associated_companies_section">
        <div className="container_full u-padding-72">
          {/* Header */}
          <div className="title_wrapper gap_half" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h6 style={{ 
                fontFamily: 'sans-serif', 
                margin: 0, 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em', 
                opacity: 0.6,
                fontSize: 'clamp(0.7rem, 0.9vw, 1rem)'
              }}>
                Collaborations
              </h6>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              lineHeight: 1.1,
              fontWeight: 400,
              margin: 0,
              textTransform: 'uppercase',
              textAlign: 'center',
              color: '#2f3440'
            }}>
              Our Associated Companies
            </h2>
          </div>

          {/* Logos Grid */}
          <div className="associated_companies_logos">
            {/* Left: H1 */}
            <div className="company_logo_wrapper">
              <Image 
                src="/images/H 1.png" 
                alt="H1 Logo" 
                width={300}
                height={100}
                className="company_logo" 
              />
            </div>

            {/* Center: VHPL (Parent Company - Center & Prominent) */}
            <div className="company_logo_wrapper main_parent">
              <Image 
                src="/images/VHPL BLACK RED.png" 
                alt="VHPL Logo" 
                width={400}
                height={150}
                className="company_logo parent_logo" 
              />
            </div>

            {/* Right: Vision Airtech */}
            <div className="company_logo_wrapper">
              <Image 
                src="/images/VISION AIRTECH.png" 
                alt="Vision Airtech Logo" 
                width={300}
                height={100}
                className="company_logo" 
              />
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .associated_companies_section {
          background-color: var(--white, #ffffff);
          position: relative;
          width: 100%;
        }

        .associated_companies_logos {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 7vw;
          margin-top: 5vw;
          width: 100%;
        }

        .company_logo_wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          max-width: 16vw;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .company_logo_wrapper.main_parent {
          max-width: 24vw;
        }

        .company_logo {
          width: 100%;
          height: auto;
          max-height: 4.5vw;
          object-fit: contain;
          filter: grayscale(1) opacity(0.55);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .company_logo_wrapper.main_parent .company_logo {
          max-height: 7vw;
          filter: grayscale(1) opacity(0.85);
        }

        /* Premium hover states */
        .company_logo_wrapper:hover {
          transform: translateY(-6px);
        }

        .company_logo_wrapper:hover .company_logo {
          filter: grayscale(0) opacity(1);
        }

        /* Responsive breakpoints */
        @media (max-width: 768px) {
          .associated_companies_logos {
            flex-direction: column;
            gap: 4rem;
            margin-top: 4rem;
          }

          .company_logo_wrapper {
            max-width: 55%;
          }

          .company_logo_wrapper.main_parent {
            max-width: 70%;
          }

          .company_logo {
            max-height: 3.5rem;
            filter: grayscale(0) opacity(1);
          }

          .company_logo_wrapper.main_parent .company_logo {
            max-height: 5.5rem;
            filter: grayscale(0) opacity(1);
          }
        }
      `}} />
    </>
  );
}
