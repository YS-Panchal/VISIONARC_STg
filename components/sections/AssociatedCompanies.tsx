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
            {/* 1: Visiontec (H1) */}
            <div className="company_logo_wrapper logo_wide">
              <Image 
                src="/images/H 1.png" 
                alt="Visiontec Logo" 
                width={300}
                height={100}
                className="company_logo" 
              />
            </div>

            {/* 2: VHPL */}
            <div className="company_logo_wrapper logo_wide">
              <Image 
                src="/images/VHPL BLACK RED.png" 
                alt="VHPL Logo" 
                width={400}
                height={150}
                className="company_logo" 
              />
            </div>

            {/* 3: Vision Airtech */}
            <div className="company_logo_wrapper logo_wide">
              <Image 
                src="/images/VISION AIRTECH.png" 
                alt="Vision Airtech Logo" 
                width={300}
                height={100}
                className="company_logo" 
              />
            </div>

            {/* 4: Gravitas */}
            <div className="company_logo_wrapper logo_square">
              <Image 
                src="/images/gravitas.png" 
                alt="Gravitas Hospitalities Logo" 
                width={300}
                height={300}
                className="company_logo company_logo_square" 
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
          gap: clamp(2.5rem, 5vw, 6vw);
          margin-top: 5vw;
          width: 100%;
          max-width: 78vw;
          margin-left: auto;
          margin-right: auto;
        }

        .company_logo_wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .company_logo_wrapper.logo_wide {
          flex: 1 1 22%;
          max-width: 19vw;
          height: 4.8vw;
        }

        .company_logo_wrapper.logo_square {
          flex: 0 0 auto;
          width: 9vw;
          height: 6.8vw;
        }

        .company_logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: grayscale(1) opacity(0.65);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .company_logo_square {
          max-height: 100%;
          transform: scale(1.15);
        }

        /* Premium hover states */
        .company_logo_wrapper:hover {
          transform: translateY(-6px);
        }

        .company_logo_wrapper:hover .company_logo {
          filter: grayscale(0) opacity(1);
        }

        /* Responsive breakpoints */
        @media (max-width: 1024px) {
          .associated_companies_logos {
            max-width: 92vw;
            gap: 2.5rem;
          }

          .company_logo_wrapper.logo_wide {
            max-width: 22vw;
            height: 6vw;
          }

          .company_logo_wrapper.logo_square {
            width: 11vw;
            height: 8vw;
          }
        }

        @media (max-width: 768px) {
          .associated_companies_logos {
            flex-direction: column;
            gap: 3.5rem;
            margin-top: 4rem;
            max-width: 100%;
          }

          .company_logo_wrapper.logo_wide {
            max-width: 60%;
            height: 4rem;
          }

          .company_logo_wrapper.logo_square {
            width: 8rem;
            height: 6.5rem;
          }

          .company_logo {
            filter: grayscale(0) opacity(1);
          }

          .company_logo_square {
            transform: scale(1.1);
          }
        }
      `}} />
    </>
  );
}
