'use client';

import { useState } from 'react';
import Image from 'next/image';

const reviewsData = [
  [
    {
      image: '/images/68d127b25815bd7586d66cf9_testimonial-1.webp',
      role: 'OWNER, LUXURY RESIDENTIAL VILLA — AHMEDABAD',
      text: "We needed someone exceptional, experienced & able to handle the nuances of remote island life. Vision Architecture transformed our vision into a home that genuinely feels alive. Every material choice reflected who we are. Khantil and his team listened deeply and delivered beyond our expectations.",
      cardClass: '_2'
    },
    {
      image: '/images/68d127b2b0f072fe91ca4708_testimonial-2.webp',
      role: 'MANAGING DIRECTOR, COMMERCIAL TOWER — SURAT',
      text: "Working with Vision Architecture on our commercial complex was seamless. Surbhi's interior design sensibility elevated every space into something truly distinctive. Our tenants consistently remark on the quality of the environment.",
      cardClass: ''
    }
  ],
  [
    {
      image: '/images/68d127b26e5decf223ad80ec_testimonial-3.webp',
      role: 'MANAGING DIRECTOR, LUXURY HOSPITALITY GROUP',
      text: "I've worked with countless agencies over the years, these guys are different. There's a calm confidence about them. No sales pitch, no pushiness - just an eye for quality. They've become a trusted partner across several of our brands.",
      cardClass: '_2'
    },
    {
      image: '/images/68d127b23bbd011dccb26074_testimonial-4.webp',
      role: 'DEVELOPER, SUSTAINABLE TOWNSHIP — VADODARA',
      text: "Vision Architecture brought sustainability expertise and design elegance to our township project. Their landscape planning integrated green corridors we did not know were possible within our budget.",
      cardClass: ''
    }
  ],
  [
    {
      image: '/images/68d127b2df7f47a1d0bfcd01_testimonial-5.webp',
      role: 'FOUNDER, BOUTIQUE RETAIL BRAND — MUMBAI',
      text: "Our flagship store needed to tell our brand story through space. Vision Architecture understood that from the first meeting. The result is a retail environment that consistently draws compliments and drives footfall.",
      cardClass: '_2'
    },
    {
      image: '/images/68d127b265230295ab28e628_testimonial-6.webp',
      role: 'PRINCIPAL, URBAN PLANNING CONSORTIUM',
      text: "Vision Architecture felt like an extension of our own team. They brought deep cultural reverence to the urban master plan — every street and green pocket was thoughtfully conceived. Rare to find a firm that gets it at every scale.",
      cardClass: ''
    }
  ]
];

const starSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#2f3440"/></svg>`;

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const totalSlides = reviewsData.length;

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalSlides);
    } else if (currentIndex === totalSlides + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };

  const nextSlide = () => {
    if (currentIndex > totalSlides) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex < 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  const extendedReviews = [
    reviewsData[totalSlides - 1], // Clone of last slide
    ...reviewsData,
    reviewsData[0]                // Clone of first slide
  ];

  const activeDot = (currentIndex - 1 + totalSlides) % totalSlides;

  return (
    <>
      <section className="section">
        <div style={{
          width: '100%',
          maxWidth: '83.33vw',
          margin: '0 auto'
        }}>
          <div className="reviews_wrapper">
            <div className="reviews_slider">
              {/* Slides */}
              <div className="reviews_mask" style={{ overflow: 'hidden', width: '100%' }}>
                <div 
                  className="reviews_track"
                  onTransitionEnd={handleTransitionEnd}
                  style={{
                    display: 'flex',
                    transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
                    transform: `translateX(-${currentIndex * (100 / extendedReviews.length)}%)`,
                    width: `${extendedReviews.length * 100}%`
                  }}
                >
                  {extendedReviews.map((slide, slideIndex) => (
                    <div
                      key={slideIndex}
                      className="reviews_slide"
                      style={{
                        width: `${100 / extendedReviews.length}%`,
                        flexShrink: 0
                      }}
                    >
                      <div style={{ minHeight: '1rem' }}></div>
                      <div style={{ minHeight: '4.44vw' }}></div>
                      <div className="reviews_listing_wrapper">
                      {slide.map((review, reviewIndex) => (
                        <div key={reviewIndex} className={`reviews_card ${review.cardClass}`}>
                          <div className="reviews_client_wrapper">
                            <Image
                              src={review.image}
                              alt=""
                              width={120}
                              height={120}
                              className="reviews_image_circle"
                            />
                            <div className="reviews_block">
                              <div className="stars_wrapper" dangerouslySetInnerHTML={{
                                __html: Array(5).fill(starSvg).join('')
                              }} />
                              <div className="reviews_name">
                                <h5 className="reviews_client_role">{review.role}</h5>
                                <h6 style={{ margin: 0, fontWeight: 400, opacity: 0.6 }}>Client Review</h6>
                              </div>
                              <p className="reviews_text">{review.text}</p>
                            </div>
                          </div>
                          <img src="https://cdn.prod.website-files.com/68a6eb7889406f3275720c49/68a6eb7989406f3275720d6d_quote.png" alt="quote icon" className="quote-icon" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

              {/* Arrows */}
              <button className="slider-arrow left-arrow" onClick={prevSlide} aria-label="Previous">
                <div className="reviews-icon w-icon-slider-left">‹</div>
              </button>
              <button className="slider-arrow right-arrow" onClick={nextSlide} aria-label="Next">
                <div className="reviews-icon w-icon-slider-right">›</div>
              </button>

              {/* Dots */}
              <div className="slide-nav-reviews">
                {reviewsData.map((_, i) => (
                  <button
                    key={i}
                    className={`slide-dot ${i === activeDot ? 'active' : ''}`}
                    onClick={() => goToSlide(i)}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div style={{ minHeight: '4.44vw' }}></div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .reviews_wrapper {
          position: relative;
        }

        .reviews_slider {
          position: relative;
        }

        .reviews_listing_wrapper {
          display: flex;
          gap: 1svw;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .reviews_card {
          border-radius: var(--border-radius);
          background-color: var(--light-gray);
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          height: 21.5svw;
          padding: 4.4vw 3.3vw;
          display: flex;
          position: relative;
          flex: 1;
        }

        .reviews_card._2 {
          background-color: var(--black);
          color: var(--white);
        }

        .reviews_client_wrapper {
          flex-wrap: nowrap;
          display: flex;
        }

        .reviews_image_circle {
          border-radius: 100%;
          width: 6.7vw;
          height: 6.7vw;
          position: absolute;
          inset: -15% auto auto 3.3vw;
          object-fit: cover;
        }

        .reviews_block {
          display: flex;
          flex-direction: column;
          grid-row-gap: 0.6vw;
          justify-content: center;
          align-items: flex-start;
          margin-top: 1rem;
        }

        .stars_wrapper {
          display: flex;
          flex-wrap: nowrap;
          position: relative;
          left: -0.375rem;
        }

        .stars_wrapper svg {
          width: 1.2rem;
          height: 1.2rem;
        }

        .reviews_name {
          display: flex;
          flex-direction: column;
          grid-column-gap: 0.28vw;
          grid-row-gap: 0.28vw;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .reviews_client_role {
          text-transform: uppercase;
          font-size: clamp(0.6rem, 0.8vw, 0.9rem);
          letter-spacing: 0.05em;
          margin: 0;
          font-weight: 500;
          line-height: 1.3;
        }

        .reviews_text {
          font-size: 1vw;
          line-height: 1.6;
          margin: 0;
          opacity: 0.8;
        }

        .quote-icon {
          opacity: 0.1;
          align-self: flex-start;
          min-height: 5.6vw;
          max-height: 5.6vw;
          object-fit: contain;
        }

        .slider-arrow {
          position: absolute;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2f3440;
          transition: all 0.3s;
          z-index: 2;
        }

        .reviews-icon {
          font-size: 1.5rem;
          color: var(--matte);
          font-weight: 300;
        }

        .left-arrow {
          min-width: 1.5rem;
          max-width: 1.5rem;
          min-height: 1.3rem;
          max-height: 1.3rem;
          transition: color 0.4s ease-in-out;
          inset: 0% 16% auto auto;
        }

        .left-arrow:hover, .right-arrow:hover {
          color: #8B2635;
        }

        .right-arrow {
          min-width: 1.3rem;
          max-width: 1.3rem;
          min-height: 1.3rem;
          max-height: 1.3rem;
          transition: color 0.4s ease-in-out;
          inset: 0% 13% auto auto;
        }

        .slide-nav-reviews {
          display: none;
        }

        .slide-dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          border: none;
          background: rgba(47, 52, 64, 0.3);
          cursor: pointer;
          padding: 0;
          transition: background 0.3s;
        }

        .slide-dot.active {
          background: #2f3440;
        }

        @media (max-width: 768px) {
          .reviews_listing_wrapper {
            flex-direction: column;
          }
          .reviews_card {
            max-width: 100%;
          }
          .left-arrow { left: 0; }
          .right-arrow { right: 0; }
        }
      `}} />
    </>
  );
}
