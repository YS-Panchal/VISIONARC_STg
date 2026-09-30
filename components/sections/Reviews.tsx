'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ReviewItem {
  clientName: string;
  projectName: string;
  location: string;
  projectHref: string;
  transitionTitle: string;
  image: string;
  text: string;
  cardClass: string;
}

const reviewsData: ReviewItem[] = [
  {
    clientName: 'Varun Jhaveri',
    projectName: 'Dipesh Jhaveri Residence',
    location: 'Ahmedabad, Gujarat',
    projectHref: '/interior-design#mr-dipesh-jhaveri-private-residence',
    transitionTitle: 'Interior Design',
    image: '/images/Projects/PROJECTS WEBP/Interior Design/MR DIPESH JHAVERI PRIVATE RESIDENCE/vision-architecture-dipesh-jhaveri-double-height-luxury-residence-ahmedabad-01.webp',
    text: 'Working with Vision Architecture was one of the best decisions we made while building our home. Mr. Khantil Panchal and Mrs. Surbhi Panchal have an incredible eye for design and transformed our vision into a beautiful reality. What impressed us most was not only their creativity and attention to detail but also their supportive nature, professionalism, and dedication throughout the entire process. They made the journey smooth, enjoyable, and stress-free. We are extremely happy with our home and highly recommend Vision Architecture to anyone looking for exceptional design and a wonderful experience.',
    cardClass: '_2'
  },
  {
    clientName: 'Dr. Suresh Chauhan & Dr. Chetna Chauhan',
    projectName: 'Suresh Chauhan Residence',
    location: 'Sterling City, Bopal, Ahmedabad',
    projectHref: '/renovation#mr-suresh-chauhan-private-residence',
    transitionTitle: 'Renovation & Planning',
    image: '/images/Projects/PROJECTS WEBP/Renovation & Planning/MR SURESH CHAUHAN PRIVATE RESIDENCE/vision-architecture-suresh-chauhan-heritage-residence-renovation-ahmedabad-01.webp',
    text: 'It was a great experience working with the Vision Architecture team. They beautifully blended modern design ideas with the emotions and memories we wanted our home to reflect. Their innovative concepts encouraged us to explore design possibilities we would not have considered otherwise. The final outcome is a perfect balance of functionality, aesthetics, and personal connection. We truly appreciate their creativity, professionalism, and dedication throughout the journey.',
    cardClass: '_2'
  },
  {
    clientName: 'Urvish Trivedi',
    projectName: 'Urvish Trivedi Residence',
    location: 'Ahmedabad, Gujarat',
    projectHref: '/renovation#mr-urvish-trivedi-private-residence',
    transitionTitle: 'Renovation & Planning',
    image: '/images/Projects/PROJECTS WEBP/Renovation & Planning/MR URVISH TRIVEDI PRIVATE RESIDENCE/vision-architecture-urvish-trivedi-bungalow-renovation-ahmedabad-01.webp',
    text: "We are extremely happy with the team's professional approach, courteous nature and the maturity with which they handled every situation throughout the project. Their patience, understanding and commitment made the entire experience smooth and truly satisfying.",
    cardClass: '_2'
  }
];

const starSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#8B2635"/></svg>`;

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

  // Custom page transition matching specialty click animation
  const handleCardClick = (href: string, title: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('start-page-transition', {
        detail: { href, title }
      }));
    }
  };

  return (
    <>
      <section className="section" id="reviews">
        <div style={{
          width: '100%',
          maxWidth: '83.33vw',
          margin: '0 auto'
        }}>
          <div className="reviews_wrapper">
            <div className="reviews_slider">
              {/* Slides */}
              <div className="reviews_mask" style={{ overflow: 'hidden', width: '100%', paddingTop: 'clamp(2.5rem, 3.5vw, 3.5rem)', marginTop: 'clamp(-2.5rem, -3.5vw, -3.5rem)', paddingBottom: '1rem' }}>
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
                  {extendedReviews.map((review, slideIndex) => (
                    <div
                      key={slideIndex}
                      className="reviews_slide"
                      style={{
                        width: `${100 / extendedReviews.length}%`,
                        flexShrink: 0,
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      <div className="reviews_listing_wrapper">
                        <div
                          className="reviews_card _2"
                          onClick={() => handleCardClick(review.projectHref, review.transitionTitle)}
                          role="button"
                          tabIndex={0}
                          aria-label={`View project: ${review.projectName}`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleCardClick(review.projectHref, review.transitionTitle);
                            }
                          }}
                        >
                          <div className="reviews_client_wrapper">
                            <Image
                              src={review.image}
                              alt={review.projectName}
                              width={160}
                              height={160}
                              className="reviews_image_circle"
                            />
                            <div className="reviews_block">
                              <div className="stars_wrapper" dangerouslySetInnerHTML={{
                                __html: Array(5).fill(starSvg).join('')
                              }} />
                              <div className="reviews_name">
                                <h4 className="reviews_client_role">{review.clientName}</h4>
                                <span className="reviews_project_tag">{review.projectName} · {review.location}</span>
                              </div>
                              <p className="reviews_text">{review.text}</p>
                              
                              {/* View Project Link Affordance */}
                              <div className="reviews_view_project">
                                <span>View Project</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="5" y1="12" x2="19" y2="12" />
                                  <polyline points="12 5 19 12 12 19" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <img src="https://cdn.prod.website-files.com/68a6eb7889406f3275720c49/68a6eb7989406f3275720d6d_quote.png" alt="quote icon" className="quote-icon" />
                        </div>
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
          padding-top: clamp(2.5rem, 4vw, 4rem);
        }

        .reviews_listing_wrapper {
          width: 100%;
          max-width: clamp(640px, 58vw, 840px);
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: stretch;
          padding: clamp(2.5rem, 3.5vw, 3.5rem) 0 1rem 0;
        }

        .reviews_card {
          border-radius: 1.5rem;
          background-color: var(--black, #232731);
          color: var(--white, #ffffff);
          border: 1px solid rgba(255, 255, 255, 0.08);
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          padding: clamp(3.2rem, 4.5vw, 4.2rem) clamp(2.2rem, 3.8vw, 3.6rem) clamp(2.4rem, 3.5vw, 3.2rem);
          display: flex;
          position: relative;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
          outline: none;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.16);
        }

        .reviews_card:hover,
        .reviews_card:focus-visible {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
          border-color: rgba(255, 255, 255, 0.16);
        }

        .reviews_client_wrapper {
          flex-wrap: nowrap;
          display: flex;
          width: 100%;
          gap: clamp(1.5rem, 2.5vw, 2.5rem);
        }

        .reviews_image_circle {
          border-radius: 100%;
          width: clamp(4.5rem, 5.5vw, 6rem);
          height: clamp(4.5rem, 5.5vw, 6rem);
          position: absolute;
          inset: clamp(-2.25rem, -2.75vw, -3rem) auto auto clamp(2.2rem, 3.8vw, 3.6rem);
          object-fit: cover;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          border: 3px solid #363c4a;
        }

        .reviews_block {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          justify-content: flex-start;
          align-items: flex-start;
          margin-top: 0.5rem;
          width: 100%;
        }

        .stars_wrapper {
          display: flex;
          flex-wrap: nowrap;
          position: relative;
          gap: 0.2rem;
        }

        .stars_wrapper svg {
          width: 1.15rem;
          height: 1.15rem;
        }

        .reviews_name {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .reviews_client_role {
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-size: clamp(1.05rem, 1.35vw, 1.45rem);
          letter-spacing: 0.05em;
          margin: 0;
          font-weight: 500;
          line-height: 1.25;
          color: #ffffff;
        }

        .reviews_project_tag {
          font-family: 'Satoshi', sans-serif;
          font-size: clamp(0.75rem, 0.88vw, 0.95rem);
          color: #d15668;
          font-weight: 500;
          letter-spacing: 0.03em;
        }

        .reviews_text {
          font-family: 'Satoshi', sans-serif;
          font-size: clamp(0.92rem, 1.08vw, 1.15rem);
          line-height: 1.76;
          margin: 0.4rem 0 1rem 0;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 300;
        }

        .reviews_view_project {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-size: clamp(0.65rem, 0.75vw, 0.82rem);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #f9f9f9;
          margin-top: auto;
          transition: transform 0.25s ease, color 0.25s ease;
        }

        .reviews_card:hover .reviews_view_project {
          transform: translateX(4px);
          color: #d15668;
        }

        .quote-icon {
          opacity: 0.14;
          align-self: flex-start;
          width: clamp(2.5rem, 3.5vw, 4rem);
          height: auto;
          object-fit: contain;
          flex-shrink: 0;
          filter: invert(1);
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
          font-size: 1.8rem;
          color: var(--matte, #2f3440);
          font-weight: 300;
        }

        .left-arrow {
          min-width: 2rem;
          max-width: 2rem;
          min-height: 2rem;
          max-height: 2rem;
          transition: color 0.4s ease-in-out;
          inset: 0% 16% auto auto;
        }

        .left-arrow:hover, .right-arrow:hover {
          color: #8B2635;
        }

        .right-arrow {
          min-width: 2rem;
          max-width: 2rem;
          min-height: 2rem;
          max-height: 2rem;
          transition: color 0.4s ease-in-out;
          inset: 0% 13% auto auto;
        }

        .slide-nav-reviews {
          display: flex;
          justify-content: center;
          gap: 0.6rem;
          margin-top: 1.5rem;
        }

        .slide-dot {
          width: 0.55rem;
          height: 0.55rem;
          border-radius: 50%;
          border: none;
          background: rgba(47, 52, 64, 0.3);
          cursor: pointer;
          padding: 0;
          transition: background 0.3s, transform 0.3s;
        }

        .slide-dot.active {
          background: #8B2635;
          transform: scale(1.2);
        }

        @media (max-width: 1024px) {
          .reviews_listing_wrapper {
            max-width: 90vw;
          }
        }

        @media (max-width: 768px) {
          .reviews_slider {
            padding-top: 3.5rem;
          }
          .reviews_listing_wrapper {
            max-width: 100%;
            padding: 0;
          }
          .reviews_card {
            padding: 3rem 1.5rem 1.8rem;
            border-radius: 1.25rem;
          }
          .reviews_image_circle {
            width: 54px;
            height: 54px;
            inset: -27px auto auto 1.5rem;
          }
          .left-arrow { 
            inset: 0% auto auto 0%; 
          }
          .right-arrow { 
            inset: 0% auto auto 3rem; 
          }
          .quote-icon {
            display: none;
          }
        }
      `}} />
    </>
  );
}
