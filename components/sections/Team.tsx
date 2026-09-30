'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const linkedInSvg = `<path d="M11.6004 20.9739H8.87928V12.2113H11.6004V20.9739ZM10.2384 11.016C9.36828 11.016 8.6625 10.2952 8.6625 9.42512C8.6625 9.00716 8.82852 8.60636 9.12408 8.3108C9.41958 8.01524 9.82044 7.84922 10.2384 7.84922C10.6563 7.84922 11.0572 8.01524 11.3527 8.3108C11.6482 8.60636 11.8142 9.00716 11.8142 9.42512C11.8142 10.2952 11.1082 11.016 10.2384 11.016ZM19.0693 20.9739V16.7083C19.0693 15.6917 19.0488 14.388 17.6546 14.388C16.2398 14.388 16.0231 15.4925 16.0231 16.6351V20.9739H13.3049V12.2113H15.9146V13.4065H15.9527C16.316 12.7181 17.2034 11.9915 18.5273 11.9915C21.2813 11.9915 21.7875 13.805 21.7875 16.1605V20.9739H19.0693Z" fill="currentColor"></path><path d="M29.1 15C29.1 7.21279 22.7872 0.9 15 0.9C7.21279 0.9 0.9 7.21279 0.9 15C0.9 22.7872 7.21279 29.1 15 29.1C22.7872 29.1 29.1 22.7872 29.1 15ZM30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15Z" fill="currentColor"></path>`;

const teamData = [
  {
    name: 'Khantil Panchal',
    role: 'CO-FOUNDER · PRINCIPAL ARCHITECT',
    mobileRole: 'CO-FOUNDER · PRINCIPAL ARCHITECT',
    imageClass: 'khantil',
    imageSrc: '/images/KP WI_result.jpg',
    imagePosition: 'center 15%',
    href: '/#contact'
  },
  {
    name: 'Surbhi Panchal',
    role: 'CO-FOUNDER · PRINCIPAL DESIGNER',
    mobileRole: 'CO-FOUNDER · PRINCIPAL DESIGNER',
    imageClass: 'surbhi',
    imageSrc: '/images/SP WI_result.jpg',
    imagePosition: 'center 10%',
    href: '/#contact'
  }
];

export default function Team() {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextMember = () => {
    setActiveMobileIndex((prev) => (prev + 1) % teamData.length);
  };

  const prevMember = () => {
    setActiveMobileIndex((prev) => (prev - 1 + teamData.length) % teamData.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 45; // Minimum drag distance in px
    if (diff > threshold) {
      // Swiped Left -> Next
      if (activeMobileIndex < teamData.length - 1) {
        setActiveMobileIndex((prev) => prev + 1);
      }
    } else if (diff < -threshold) {
      // Swiped Right -> Prev
      if (activeMobileIndex > 0) {
        setActiveMobileIndex((prev) => prev - 1);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <>
      <section id="team" className="section team_section_wrapper">
        <div className="container_full team_container">
          <div className="team_space_top"></div>

          {/* Desktop & Mobile Header */}
          <div className="title_wrapper gap_half slide_down_from_top_animation team_header_block">
            <div className="team_header_top_row">
              <div className="team_header_titles">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <h6 className="team_eyebrow">who we are</h6>
                </div>
                <h2 className="team_main_title">
                  Leadership Team
                </h2>
              </div>

              {/* Mobile Arrow Controls (visible only on mobile) */}
              <div className="team_mobile_nav_arrows">
                <button
                  type="button"
                  onClick={prevMember}
                  className="team_mobile_arrow_btn"
                  aria-label="Previous Team Member"
                  disabled={activeMobileIndex === 0}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={nextMember}
                  className="team_mobile_arrow_btn"
                  aria-label="Next Team Member"
                  disabled={activeMobileIndex === teamData.length - 1}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="team_space_middle"></div>

          {/* =======================================================
              DESKTOP VIEW — 100% Preserved Original Desktop Layout
             ======================================================= */}
          <div className="team_desktop_view team_flex flip_animation">
            {teamData.map((member, i) => (
              <Link key={i} href={member.href} className="team_card">
                <div className={`team_image_wrapper ${member.imageClass}`}></div>

                {/* Social icon overlay (hidden by default, shown on hover via CSS) */}
                <div className="team_social_flex_box">
                  <div className="social_link_round">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 30 30" fill="none" className="team_social_icon" dangerouslySetInnerHTML={{ __html: linkedInSvg }} />
                  </div>
                </div>

                <div className="team_name_card">
                  <h5 className="team_name">{member.name}</h5>
                  <h5 className="team_occupation">{member.role}</h5>
                </div>
              </Link>
            ))}
          </div>

          {/* =======================================================
              MOBILE VIEW — Premium Portrait-First Glassmorphism Carousel
             ======================================================= */}
          <div
            className="team_mobile_view"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="team_mobile_carousel_track">
              {teamData.map((member, idx) => {
                const isActive = idx === activeMobileIndex;
                const isNext = idx === activeMobileIndex + 1;
                const isPrev = idx === activeMobileIndex - 1;

                let cardClass = 'team_mob_card';
                if (isActive) cardClass += ' is_active';
                else if (isNext) cardClass += ' is_peek_next';
                else if (isPrev) cardClass += ' is_peek_prev';

                return (
                  <div
                    key={idx}
                    className={cardClass}
                    style={{
                      transform: `translateX(calc(${(idx - activeMobileIndex) * 104}%))`,
                    }}
                    onClick={() => {
                      if (!isActive) setActiveMobileIndex(idx);
                    }}
                  >
                    {/* Portrait Photo Container */}
                    <div
                      className="team_mob_portrait"
                      style={{
                        backgroundImage: `url('${member.imageSrc}')`,
                        backgroundPosition: member.imagePosition,
                      }}
                    >
                      {/* Subtle Bottom Ambient Gradient for Depth */}
                      <div className="team_mob_ambient_overlay" />

                      {/* Frosted Glass Information Panel inside the bottom card area */}
                      <div className="team_mob_glass_panel">
                        <div className="team_mob_info_left">
                          <h4 className="team_mob_name">{member.name}</h4>
                          <span className="team_mob_role">{member.mobileRole}</span>
                        </div>

                        {/* LinkedIn Action inside the Glass Panel */}
                        <Link
                          href={member.href}
                          className="team_mob_linkedin_btn"
                          aria-label={`${member.name} LinkedIn`}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <span className="team_mob_in_text">in</span>
                          <svg
                            className="team_mob_arrow_icon"
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Pagination Dots */}
            <div className="team_mobile_pagination">
              {teamData.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setActiveMobileIndex(dotIdx)}
                  className={`team_mobile_dot ${dotIdx === activeMobileIndex ? 'active' : ''}`}
                  aria-label={`Go to team member ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="team_space_bottom"></div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        /* ==========================================
           DESKTOP BASE STYLES
           ========================================== */
        .team_section_wrapper {
          width: 100%;
          position: relative;
        }

        .team_container {
          width: 100%;
          max-width: 83.33vw;
          margin: 0 auto;
          padding-top: 5vw;
          padding-bottom: 5vw;
        }

        .team_space_top {
          min-height: 4.44vw;
        }

        .team_space_middle {
          min-height: 4.44vw;
        }

        .team_space_bottom {
          min-height: 2vw;
        }

        .team_header_block {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
        }

        .team_header_top_row {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .team_header_titles {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
        }

        .team_eyebrow {
          font-family: sans-serif;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: clamp(0.7rem, 0.9vw, 1rem);
          opacity: 0.6;
        }

        .team_main_title {
          font-size: clamp(2.5rem, 5.55vw, 5rem);
          line-height: 1.05;
          font-weight: 400;
          margin: 0;
          text-transform: uppercase;
          text-align: center;
          color: #2f3440;
        }

        .team_mobile_nav_arrows {
          display: none;
        }

        .team_desktop_view {
          display: flex;
        }

        .team_mobile_view {
          display: none;
        }

        .team_flex {
          gap: 4.44svw;
          justify-content: center;
          align-items: center;
          display: flex;
        }

        .team_card {
          cursor: default;
          flex-direction: column;
          align-items: center;
          min-width: 19.4vw;
          max-width: 19.4vw;
          min-height: 25vw;
          max-height: 25vw;
          transition: transform .3s, color .4s;
          display: flex;
          position: relative;
          overflow: visible;
          text-decoration: none;
          color: inherit;
        }

        .team_image_wrapper {
          border-radius: var(--border-radius);
          box-shadow: none;
          background-color: #f5f5f5;
          justify-content: center;
          align-items: flex-start;
          min-width: 19.4vw;
          max-width: 19.4vw;
          min-height: 23.2vw;
          max-height: 22.2vw;
          transition: all .425s;
          display: flex;
          position: relative;
          overflow: hidden;
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .team_image_wrapper.khantil {
          background-image: url('/images/KP WI_result.jpg');
        }

        .team_image_wrapper.surbhi {
          background-image: url('/images/SP WI_result.jpg');
        }

        .team_social_flex_box {
          z-index: 3;
          gap: .56vw;
          background: linear-gradient(
            135deg,
            rgba(38, 42, 51, 0.8) 0%,
            rgba(20, 23, 28, 0.9) 100%
          );
          backdrop-filter: blur(16px) saturate(150%);
          -webkit-backdrop-filter: blur(16px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
          justify-content: center;
          align-items: center;
          width: 17.5svw;
          min-width: 220px;
          min-height: 4.9vw;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          opacity: 0;
          transform: translateY(20px);
          transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease;
          pointer-events: none;
        }

        .team_card:hover .team_social_flex_box {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .social_link_round {
          object-fit: contain;
          border-radius: 50%;
          width: 2.35rem;
          min-width: 2.35rem;
          height: 2.35rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .team_card:hover .social_link_round {
          transform: scale(1.06);
        }

        .team_social_icon {
          color: #fff;
          object-fit: contain;
          width: 100%;
          height: 100%;
        }

        .team_name_card {
          z-index: 2;
          gap: .35rem;
          background: linear-gradient(
            135deg,
            rgba(38, 42, 51, 0.8) 0%,
            rgba(20, 23, 28, 0.9) 100%
          );
          backdrop-filter: blur(16px) saturate(150%);
          -webkit-backdrop-filter: blur(16px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 17.5svw;
          min-width: 220px;
          min-height: 4.9vw;
          padding: 0.85rem 1rem;
          box-sizing: border-box;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          position: relative;
          top: -2.1875rem;
          overflow: hidden;
          opacity: 1;
          transform: translateY(0);
          transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease;
        }

        .team_card:hover .team_name_card {
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
        }

        .team_name {
          font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
          text-transform: uppercase;
          font-size: clamp(0.95rem, 1.08vw, 1.25rem);
          line-height: 1.15;
          margin: 0;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #ffffff;
          white-space: nowrap;
          text-align: center;
        }

        .team_occupation {
          font-family: 'Satoshi', sans-serif;
          line-height: 1.2;
          margin: 0;
          font-weight: 500;
          font-size: clamp(0.58rem, 0.68vw, 0.74rem);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
          white-space: nowrap;
          text-align: center;
        }

        /* ==========================================
           MOBILE RESPONSIVE — max-width: 991px
           ========================================== */
        @media (max-width: 991px) {
          .team_container {
            max-width: 100% !important;
            padding-left: 1rem;
            padding-right: 1rem;
            padding-top: 3.5rem;
            padding-bottom: 3.5rem;
          }

          .team_space_top {
            min-height: 0;
            display: none;
          }

          .team_space_middle {
            min-height: 1.75rem;
          }

          .team_space_bottom {
            min-height: 0;
            display: none;
          }

          /* Header on Mobile */
          .team_header_top_row {
            justify-content: space-between;
            align-items: flex-end;
            padding: 0 0.5rem;
          }

          .team_header_titles {
            align-items: flex-start;
            text-align: left;
            gap: 0.35rem;
          }

          .team_eyebrow {
            font-size: 0.75rem;
            letter-spacing: 0.14em;
            color: #8B2635;
            opacity: 0.9;
            font-weight: 600;
          }

          .team_main_title {
            font-size: clamp(1.75rem, 6.5vw, 2.3rem);
            text-align: left;
            line-height: 1.1;
            letter-spacing: 0.02em;
          }

          /* Navigation Arrow Buttons */
          .team_mobile_nav_arrows {
            display: flex;
            align-items: center;
            gap: 0.6rem;
          }

          .team_mobile_arrow_btn {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            border: 1px solid rgba(47, 52, 64, 0.18);
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2f3440;
            cursor: pointer;
            transition: all 0.25s ease;
            padding: 0;
          }

          .team_mobile_arrow_btn:active:not(:disabled) {
            transform: scale(0.92);
            background: #2f3440;
            color: #ffffff;
          }

          .team_mobile_arrow_btn:disabled {
            opacity: 0.35;
            cursor: default;
          }

          /* Switch to Mobile View */
          .team_desktop_view {
            display: none !important;
          }

          .team_mobile_view {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            position: relative;
            overflow: hidden;
            padding: 0.5rem 0 0.5rem 0;
          }

          /* Mobile Carousel Track */
          .team_mobile_carousel_track {
            position: relative;
            width: 100%;
            height: clamp(450px, 65vh, 520px);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Individual Mobile Portrait Card */
          .team_mob_card {
            position: absolute;
            top: 0;
            width: calc(100% - 1.2rem);
            max-width: 420px;
            height: 100%;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 16px 36px rgba(0, 0, 0, 0.1);
            transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: pointer;
            will-change: transform, opacity;
            user-select: none;
            -webkit-user-select: none;
          }

          .team_mob_card.is_active {
            opacity: 1;
            z-index: 5;
            pointer-events: auto;
          }

          .team_mob_card.is_peek_next,
          .team_mob_card.is_peek_prev {
            opacity: 0.45;
            z-index: 2;
            filter: brightness(0.92);
          }

          /* Portrait Image Layer */
          .team_mob_portrait {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }

          /* Ambient dark gradient overlay at bottom for maximum readability */
          .team_mob_ambient_overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to top,
              rgba(20, 23, 28, 0.6) 0%,
              rgba(20, 23, 28, 0.15) 35%,
              rgba(0, 0, 0, 0) 65%
            );
            pointer-events: none;
            z-index: 1;
          }

          /* Bottom Glass Information Panel */
          .team_mob_glass_panel {
            position: relative;
            z-index: 3;
            margin: 0 14px 14px 14px;
            padding: 1.1rem 1.2rem;
            background: linear-gradient(
              135deg,
              rgba(38, 42, 51, 0.68) 0%,
              rgba(22, 25, 31, 0.8) 100%
            );
            backdrop-filter: blur(18px) saturate(150%);
            -webkit-backdrop-filter: blur(18px) saturate(150%);
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 18px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.85rem;
            transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease;
          }

          .team_mob_card:active .team_mob_glass_panel {
            background: linear-gradient(
              135deg,
              rgba(48, 53, 64, 0.78) 0%,
              rgba(28, 32, 40, 0.88) 100%
            );
            border-color: rgba(255, 255, 255, 0.3);
          }

          .team_mob_info_left {
            display: flex;
            flex-direction: column;
            gap: 0.28rem;
            overflow: hidden;
          }

          .team_mob_name {
            font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
            font-size: clamp(1.08rem, 4.4vw, 1.3rem);
            font-weight: 500;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #ffffff;
            margin: 0;
            line-height: 1.15;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }

          .team_mob_role {
            font-family: 'Satoshi', sans-serif;
            font-size: clamp(0.6rem, 2.3vw, 0.72rem);
            font-weight: 500;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.25;
          }

          /* LinkedIn Action Button */
          .team_mob_linkedin_btn {
            width: 38px;
            height: 38px;
            min-width: 38px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.16);
            border: 1px solid rgba(255, 255, 255, 0.28);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            text-decoration: none;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            flex-shrink: 0;
          }

          .team_mob_in_text {
            font-family: 'Satoshi', sans-serif;
            font-weight: 700;
            font-size: 0.88rem;
            letter-spacing: -0.02em;
            line-height: 1;
            transition: transform 0.25s ease, opacity 0.25s ease;
          }

          .team_mob_arrow_icon {
            position: absolute;
            opacity: 0;
            transform: translate(-4px, 4px);
            transition: transform 0.25s ease, opacity 0.25s ease;
          }

          .team_mob_linkedin_btn:hover,
          .team_mob_linkedin_btn:active {
            background: #ffffff;
            color: #1d2025;
            border-color: #ffffff;
            transform: scale(1.05);
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
          }

          .team_mob_linkedin_btn:hover .team_mob_in_text,
          .team_mob_linkedin_btn:active .team_mob_in_text {
            transform: translate(2px, -2px);
          }

          .team_mob_linkedin_btn:hover .team_mob_arrow_icon,
          .team_mob_linkedin_btn:active .team_mob_arrow_icon {
            opacity: 1;
            transform: translate(6px, -6px);
          }

          /* Pagination Dots */
          .team_mobile_pagination {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.55rem;
            margin-top: 1.5rem;
          }

          .team_mobile_dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: rgba(47, 52, 64, 0.22);
            border: none;
            padding: 0;
            cursor: pointer;
            transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .team_mobile_dot.active {
            width: 1.8rem;
            border-radius: 4px;
            background: #2f3440;
          }
        }

        /* Small screen adjustments — max-width: 430px */
        @media (max-width: 430px) {
          .team_mob_card {
            width: calc(100% - 0.8rem);
            border-radius: 22px;
          }

          .team_mob_glass_panel {
            margin: 0 10px 10px 10px;
            padding: 1rem 1.05rem;
            border-radius: 16px;
          }

          .team_mob_name {
            font-size: clamp(1rem, 4.6vw, 1.2rem);
          }

          .team_mob_role {
            font-size: 0.62rem;
          }

          .team_mob_linkedin_btn {
            width: 36px;
            height: 36px;
            min-width: 36px;
          }
        }

        /* Very narrow screens — max-width: 360px */
        @media (max-width: 360px) {
          .team_mob_glass_panel {
            padding: 0.85rem 0.95rem;
            margin: 0 8px 8px 8px;
            border-radius: 14px;
          }

          .team_mob_name {
            font-size: 0.96rem;
          }

          .team_mob_role {
            font-size: 0.58rem;
            letter-spacing: 0.08em;
          }
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .team_mob_card,
          .team_mob_glass_panel,
          .team_mob_linkedin_btn,
          .team_mobile_dot {
            transition: none !important;
          }
        }
      `}} />
    </>
  );
}
