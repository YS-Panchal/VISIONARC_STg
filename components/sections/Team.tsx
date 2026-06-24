'use client';

import Link from 'next/link';

const linkedInSvg = `<path d="M11.6004 20.9739H8.87928V12.2113H11.6004V20.9739ZM10.2384 11.016C9.36828 11.016 8.6625 10.2952 8.6625 9.42512C8.6625 9.00716 8.82852 8.60636 9.12408 8.3108C9.41958 8.01524 9.82044 7.84922 10.2384 7.84922C10.6563 7.84922 11.0572 8.01524 11.3527 8.3108C11.6482 8.60636 11.8142 9.00716 11.8142 9.42512C11.8142 10.2952 11.1082 11.016 10.2384 11.016ZM19.0693 20.9739V16.7083C19.0693 15.6917 19.0488 14.388 17.6546 14.388C16.2398 14.388 16.0231 15.4925 16.0231 16.6351V20.9739H13.3049V12.2113H15.9146V13.4065H15.9527C16.316 12.7181 17.2034 11.9915 18.5273 11.9915C21.2813 11.9915 21.7875 13.805 21.7875 16.1605V20.9739H19.0693Z" fill="currentColor"></path><path d="M29.1 15C29.1 7.21279 22.7872 0.9 15 0.9C7.21279 0.9 0.9 7.21279 0.9 15C0.9 22.7872 7.21279 29.1 15 29.1C22.7872 29.1 29.1 22.7872 29.1 15ZM30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15Z" fill="currentColor"></path>`;

const teamData = [
  {
    name: 'Khantil Panchal',
    role: 'Principal Architect',
    imageClass: 'khantil',
    href: '/leadership'
  },
  {
    name: 'Surbhi Panchal',
    role: 'Interior Design Principal',
    imageClass: 'surbhi',
    href: '/leadership'
  }
];

export default function Team() {
  return (
    <>
      <section id="team" className="section">
        <div style={{
          width: '100%',
          maxWidth: '83.33vw',
          margin: '0 auto',
          paddingTop: '10vw',
          paddingBottom: '10vw'
        }}>
          <div style={{ minHeight: '4.44vw' }}></div>

          {/* Title */}
          <div className="title_wrapper gap_half slide_down_from_top_animation" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h6 style={{ fontFamily: 'sans-serif', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>who we are</h6>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5.55vw, 5rem)',
              lineHeight: 1.05,
              fontWeight: 400,
              margin: 0,
              textTransform: 'uppercase',
              textAlign: 'center'
            }}>
              Our<br />Leadership Team
            </h2>
          </div>

          <div style={{ minHeight: '4.44vw' }}></div>

          {/* Team Cards */}
          <div className="team_flex flip_animation">
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

          <div style={{ minHeight: '2vw' }}></div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
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
          min-height: 22.2vw;
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
          background-image: url('/images/68d1ae25a28852f3a85bbed6_cta-image-1-p-500.webp');
        }

        .team_image_wrapper.surbhi {
          background-image: url('/images/68d1ae25f70e8cc0e52db1fb_cta-image-2-p-1600.webp');
        }

        .team_social_flex_box {
          z-index: 3;
          gap: .56vw;
          backdrop-filter: blur(.125rem);
          background-color: rgba(47, 52, 64, 0.6);
          border-radius: 1.5svw;
          justify-content: center;
          align-items: center;
          width: 14.6svw;
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
          transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;
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
          width: 2.25rem;
          min-width: 2.25rem;
          height: 2.25rem;
          padding-right: .1875rem;
          position: relative;
          overflow: hidden;
        }

        .team_social_icon {
          color: #fff;
          object-fit: contain;
        }

        .team_name_card {
          z-index: 2;
          gap: .56vw;
          background-color: var(--light-gray);
          border-radius: 1.5svw;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 14.6svw;
          min-height: 4.9vw;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          position: relative;
          top: -2.1875rem;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;
        }

        .team_card:hover .team_name_card {
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
        }

        .team_name {
          text-transform: uppercase;
          font-size: .95vw;
          line-height: 1vw;
          margin: 0;
          font-weight: 500;
        }

        .team_occupation {
          line-height: .9;
          margin: 0;
          font-weight: 400;
          font-size: .8vw;
          opacity: 0.7;
        }

        @media (max-width: 991px) {
          .team_flex {
            flex-direction: column;
            gap: 3rem;
          }
          .team_card {
            min-width: 60vw;
            max-width: 60vw;
            min-height: auto;
            max-height: none;
          }
          .team_card:hover .team_name_card {
            opacity: 1;
            transform: none;
            pointer-events: auto;
          }
          .team_image_wrapper {
            min-width: 60vw;
            max-width: 60vw;
            min-height: 70vw;
            max-height: 70vw;
          }
          .team_social_flex_box {
            opacity: 1;
            transform: translateY(-50%);
            pointer-events: auto;
            position: absolute;
            bottom: auto;
            top: 70vw;
            width: 2.2rem;
            min-height: 2.2rem;
            border-radius: 50%;
            padding: 0;
            z-index: 10;
          }
          .social_link_round {
            width: 100%;
            height: 100%;
            min-width: unset;
            padding: 0.3rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .team_name_card {
            width: 50vw;
            min-height: auto;
            padding: 1.8rem 1rem 1rem 1rem;
            top: -1.1rem;
          }
          .team_name {
            font-size: 4vw;
            line-height: 1.2;
          }
          .team_occupation {
            font-size: 3vw;
          }
        }
      `}} />
    </>
  );
}
