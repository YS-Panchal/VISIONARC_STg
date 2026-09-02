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

const reviewsData: ReviewItem[][] = [
  // Slide 1: Varun Jhaveri & Dr. Suresh Chauhan & Dr. Chetna Chauhan
  [
    {
      clientName: 'Varun Jhaveri',
      projectName: 'Dipesh Jhaveri Residence',
      location: 'Ahmedabad, Gujarat',
      projectHref: '/interior-design#mr-dipesh-jhaveri-private-residence',
      transitionTitle: 'Interior Design',
      image: '/images/Projects/PROJECTS WEBP/Interior Design/MR DIPESH JHAVERI PRIVATE RESIDENCE/vision-architecture-dipesh-jhaveri-double-height-luxury-residence-ahmedabad-01.webp',
      text: 'Working with Vision Architecture was one of the best decisions we made while building our home. Mr. Khantil Panchal and Mrs. Surbhi Panchal have an incredible eye for design and transformed our vision into a beautiful reality. What impressed us most was not only their creativity and attention to detail but also their supportive nature, professionalism, and dedication throughout the entire process. They made the journey smooth, enjoyable, and stress-free. We are extremely happy with our home and highly recommend Vision Architecture to anyone looking for exceptional design and a wonderful experience. Highly recommended!',
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
      cardClass: ''
    }
  ],
  // Slide 2: Urvish Trivedi & Varun Jhaveri (for smooth 2-card slider balance)
  [
    {
      clientName: 'Urvish Trivedi',
      projectName: 'Urvish Trivedi Residence',
      location: 'Ahmedabad, Gujarat',
      projectHref: '/renovation#mr-urvish-trivedi-private-residence',
      transitionTitle: 'Renovation & Planning',
      image: '/images/Projects/PROJECTS WEBP/Renovation & Planning/MR URVISH TRIVEDI PRIVATE RESIDENCE/vision-architecture-urvish-trivedi-bungalow-renovation-ahmedabad-01.webp',
      text: "We are extremely happy with the team's professional approach, courteous nature and the maturity with which they handled every situation throughout the project. Their patience, understanding and commitment made the entire experience smooth and truly satisfying.",
      cardClass: '_2'
    },
    {
      clientName: 'Varun Jhaveri',
      projectName: 'Dipesh Jhaveri Residence',
      location: 'Ahmedabad, Gujarat',
      projectHref: '/interior-design#mr-dipesh-jhaveri-private-residence',
      transitionTitle: 'Interior Design',
      image: '/images/Projects/PROJECTS WEBP/Interior Design/MR DIPESH JHAVERI PRIVATE RESIDENCE/vision-architecture-dipesh-jhaveri-double-height-luxury-residence-ahmedabad-01.webp',
      text: 'What impressed us most was not only their creativity and attention to detail but also their supportive nature, professionalism, and dedication throughout the entire process. They made the journey smooth, enjoyable, and stress-free. We are extremely happy with our home.',
      cardClass: ''
    }
  ]
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
                      <div style={{ minHeight: '3vw' }}></div>
                      <div className="reviews_listing_wrapper">
                      {slide.map((review, reviewIndex) => (
                        <div
                          key={reviewIndex}
                          className={`reviews_card ${review.cardClass}`}
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
                              width={140}
                              height={140}
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
          gap: 1.5svw;
          justify-content: center;
          align-items: stretch;
          width: 100%;
        }

        .reviews_card {
          border-radius: var(--border-radius);
          background-color: var(--light-gray);
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          min-height: 24svw;
          padding: 3.5vw 2.8vw 2.8vw;
          display: flex;
          position: relative;
          flex: 1;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
        }

        .reviews_card:hover,
        .reviews_card:focus-visible {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
        }

        .reviews_card._2 {
          background-color: var(--black);
          color: var(--white);
        }

        .reviews_client_wrapper {
          flex-wrap: nowrap;
          display: flex;
          width: 100%;
          gap: 1.5vw;
        }

        .reviews_image_circle {
          border-radius: 100%;
          width: 5.8vw;
          height: 5.8vw;
          position: absolute;
          inset: -12% auto auto 2.8vw;
          object-fit: cover;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          border: 3px solid #ffffff;
        }

        .reviews_block {
          display: flex;
          flex-direction: column;
          gap: 0.6vw;
          justify-content: flex-start;
          align-items: flex-start;
          margin-top: 0.5rem;
          width: 100%;
        }

        .stars_wrapper {
          display: flex;
          flex-wrap: nowrap;
          position: relative;
          gap: 0.15rem;
        }

        .stars_wrapper svg {
          width: 1.1rem;
          height: 1.1rem;
        }

        .reviews_name {
          display: flex;
          flex-direction: column;
          gap: 0.2vw;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .reviews_client_role {
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-size: clamp(0.85rem, 1.1vw, 1.25rem);
          letter-spacing: 0.06em;
          margin: 0;
          font-weight: 500;
          line-height: 1.25;
        }

        .reviews_project_tag {
          font-family: 'Satoshi', sans-serif;
          font-size: clamp(0.68rem, 0.78vw, 0.85rem);
          color: #8B2635;
          font-weight: 500;
          letter-spacing: 0.03em;
        }

        .reviews_card._2 .reviews_project_tag {
          color: #d15668;
        }

        .reviews_text {
          font-family: 'Satoshi', sans-serif;
          font-size: clamp(0.78rem, 0.88vw, 0.95rem);
          line-height: 1.65;
          margin: 0.4vw 0 0.8vw 0;
          opacity: 0.85;
          font-weight: 300;
        }

        .reviews_view_project {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          font-size: clamp(0.62rem, 0.72vw, 0.78rem);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8B2635;
          margin-top: auto;
          transition: transform 0.25s ease;
        }

        .reviews_card._2 .reviews_view_project {
          color: #f9f9f9;
        }

        .reviews_card:hover .reviews_view_project {
          transform: translateX(4px);
        }

        .quote-icon {
          opacity: 0.12;
          align-self: flex-start;
          min-height: 4vw;
          max-height: 4vw;
          object-fit: contain;
          flex-shrink: 0;
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
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
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
          background: #8B2635;
        }

        @media (max-width: 1024px) {
          .reviews_card {
            min-height: 28svw;
          }
          .reviews_image_circle {
            width: 7vw;
            height: 7vw;
          }
        }

        @media (max-width: 768px) {
          .reviews_listing_wrapper {
            flex-direction: column;
            gap: 2.5rem;
          }
          .reviews_card {
            max-width: 100%;
            min-height: auto;
            padding: 2.5rem 1.5rem 1.5rem;
          }
          .reviews_image_circle {
            width: 60px;
            height: 60px;
            inset: -30px auto auto 1.5rem;
          }
          .left-arrow { left: 0; }
          .right-arrow { right: 0; }
        }
      `}} />
    </>
  );
}
