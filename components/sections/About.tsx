'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  return (
    <>
      <section id="about" className="section slide-up-animation">
        <div className="container_full u-padding-72">
          <div className="space_large"></div>
          
          <div className="flex_content_wrapper u-align-center">
            {/* Left side: Video */}
            <div className="features_video_large_container">
              <div className="features_video_large">
                <video 
                  autoPlay 
                  playsInline 
                  loop 
                  muted 
                  preload="auto"
                  poster="/images/68dbf7b1f456696a2949e588_about-image-1.webp"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                >
                  <source src="/videos/about-video-1.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            
            {/* Right side: Content */}
            <div className="features_block">
              <div className="subheading">
                <h6>Identity</h6>
              </div>
              <div className="space-text"></div>
              
              <h3 className="centered_on_mobile_small u-text-balance">
                A Legacy of Visionary Design
              </h3>
              <div className="space-text"></div>
              
              <p className="features_description u-text-balance">
                Vision Architecture is a forward-thinking firm specializing in architecture, interior design, landscape planning, and sustainable developments. We believe every space tells a unique story and inspires inhabitants, merging sustainability and functionality to enhance well-being.
              </p>
              <div className="space_semi"></div>
              
              <div className="button_group_wrapper">
                <Link href="#speciality" className="button">
                  Our Speciality
                </Link>
                <Link href="#contact" className="outline_button">
                  Contact Us
                </Link>
              </div>
              <div className="space-semi"></div>
              
              <img 
                loading="eager" 
                src="/images/68de3c533564c54db3f1bed9_about-image-2.webp" 
                alt="Luxurious resort pool" 
                className="features-image-small"
              />
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
          .section {
            padding-left: 5%;
            padding-right: 5%;
          }
          
          .container_full {
            width: 100%;
            max-width: 83.33vw;
            margin: 0 auto;
          }
          
          .u-padding-72 {
            padding-top: 5vw;
            padding-bottom: 5vw;
          }
          
          .space_large {
            min-height: 3vw;
          }
          
          .flex_content_wrapper {
            grid-column-gap: 2.22vw;
            grid-row-gap: 2.22vw;
            justify-content: flex-start;
            align-items: flex-start;
            width: 100%;
            display: flex;
          }
          
          .flex_content_wrapper.u-align-center {
            justify-content: center;
            align-items: flex-start;
          }
          
          .features_video_large_container {
            min-width: 36vw;
            max-width: 36vw;
          }
          
          .features_video_large {
            aspect-ratio: 1;
            border-radius: var(--border-radius, 2rem);
            width: 100%;
            overflow: hidden;
          }

          .features_block {
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            height: 100%;
            display: flex;
          }

          .subheading {
            border-top: .5px solid var(--charcoal-blue, #2f3440);
            border-bottom: .5px solid var(--charcoal-blue, #2f3440);
            color: var(--charcoal-blue, #2f3440);
            flex-flow: column;
            justify-content: center;
            align-items: center;
            padding: .35svw .5svw;
            display: flex;
            position: relative;
          }
          .subheading h6 {
            color: var(--charcoal-blue, #2f3440);
            letter-spacing: .15vw;
            text-transform: uppercase;
            margin-top: 0;
            margin-bottom: 0;
            font-size: .7675vw;
            font-weight: 300;
            line-height: 100%;
            font-family: Satoshi, Tahoma, sans-serif;
          }

          .space-text {
            min-height: 2vw;
          }
          .space_semi {
            min-height: 2.5svw;
          }
          .space-semi {
            min-height: 2vw;
          }

          .centered_on_mobile_small {
            color: var(--charcoal-blue, #2f3440);
            text-transform: uppercase;
            width: 80%;
            margin-top: 0;
            margin-bottom: 0;
            font-size: 3.45svw;
            font-weight: 600;
            line-height: 110%;
            font-family: Satoshi, Tahoma, sans-serif;
          }

          .features_description {
            max-width: 33.33vw;
            color: var(--black, #1d2025);
            letter-spacing: .07vw;
            margin-bottom: 0;
            font-family: Satoshi, Tahoma, sans-serif;
            font-size: 1.1458vw;
            font-weight: 300;
            line-height: 150%;
          }

          .button_group_wrapper {
            grid-column-gap: 1.1vw;
            grid-row-gap: 1.1vw;
            flex-direction: row;
            display: flex;
          }

          .button {
            background-color: var(--charcoal-blue, #2f3440);
            color: var(--white, #f9f9f9);
            letter-spacing: .07vw;
            text-transform: uppercase;
            cursor: pointer;
            border: 1px solid #000;
            border-radius: 6.25rem;
            justify-content: center;
            align-items: center;
            padding: .5svw 2.22svw;
            font-size: 1svw;
            font-weight: 400;
            text-decoration: none;
            transition: border .25s, color .3s, background-color .3s;
            display: flex;
          }

          .button:hover {
            background-color: var(--light-gray, #eee);
            color: var(--black, #1d2025);
          }

          .outline_button {
            border: 1px solid var(--black, #1d2025);
            background-color: var(--transparent, transparent);
            color: var(--black, #1d2025);
            letter-spacing: .07vw;
            text-transform: uppercase;
            cursor: pointer;
            border-radius: 6.25rem;
            justify-content: center;
            align-items: center;
            padding: .5svw 2.22svw;
            font-size: 1svw;
            font-weight: 400;
            text-decoration: none;
            transition: border .25s, color .3s, background-color .3s;
            display: flex;
          }

          .outline_button:hover {
            border-color: var(--matte-20, #2f2f2f33);
            background-color: var(--light-gray, #eee);
            color: var(--black, #1d2025);
          }

          .features-image-small {
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 20px;
            align-self: flex-end;
            min-width: 16vw;
            max-width: 16vw;
          }

          @media (max-width: 991px) {
            .flex_content_wrapper {
              flex-direction: column;
              align-items: center;
            }
            .features_video_large_container {
              min-width: 100%;
              max-width: 100%;
            }
            .features-image-small {
              min-width: 100%;
              max-width: 100%;
              align-self: center;
            }
            .features_description {
              max-width: 100% !important;
              font-size: 2.2vw;
            }
            .centered_on_mobile_small {
              font-size: 5vw;
              width: 100%;
            }
            .button, .outline_button {
              font-size: 2vw;
              padding: 1vw 3vw;
            }
          }

          @media (max-width: 767px) {
            .subheading h6 {
              font-size: 3svw;
              padding: 1svw 2svw;
            }
            .features_description {
              font-size: 4svw;
              text-align: center;
            }
            .centered_on_mobile_small {
              text-align: center;
              font-size: 7.35svw;
            }
            .button_group_wrapper {
              justify-content: center;
              width: 100%;
            }
            .button, .outline_button {
              font-size: 3.5vw;
              padding: 3vw 6vw;
            }
          }
        `
      }} />
    </>
  );
}
