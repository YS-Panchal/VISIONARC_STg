'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function Navbar() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const navMenu = document.querySelector('.nav-menu');
      const navLinks = document.querySelectorAll('.nav-link-block');
      const topBar = document.querySelector('.bar.top');
      const middleBar = document.querySelector('.bar.middle');
      const bottomBar = document.querySelector('.bar.bottom');

      // Initialize states
      gsap.set(navMenu, { display: 'none', yPercent: -100 });
      gsap.set(navLinks, { y: 50, opacity: 0 });

      // Build timeline once
      menuTl.current = gsap.timeline({ paused: true, reversed: true });

      menuTl.current
        .to(navMenu, {
          display: 'flex',
          yPercent: 0,
          duration: 0.8,
          ease: 'power4.inOut'
        })
        .to(navLinks, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out'
        }, "-=0.3")
        .to(topBar, { rotation: 45, y: 6, width: '100%', duration: 0.3, transformOrigin: 'center center' }, 0)
        .to(middleBar, { opacity: 0, duration: 0.2 }, 0)
        .to(bottomBar, { rotation: -45, y: -6, width: '100%', duration: 0.3, transformOrigin: 'center center' }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Trigger play/reverse on state changes
  useEffect(() => {
    if (menuTl.current) {
      if (isOpen) {
        menuTl.current.play();
      } else {
        menuTl.current.reverse();
      }
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Disable navbar logo and hamburger on the home page as requested
  if (pathname === '/') return null;

  return (
    <header ref={containerRef} className="navbar" role="banner" style={{
      zIndex: 20,
      pointerEvents: 'none',
      backgroundColor: '#0000',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: '100%',
      maxWidth: '100%',
      minHeight: '7.5rem',
      maxHeight: '7.5rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      position: 'absolute',
      top: 0
    }}>
      <div className="container-nav" style={{
        pointerEvents: 'none',
        flexFlow: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: '100%',
        maxWidth: '100%',
        minHeight: '7.5rem',
        maxHeight: '7.5rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        position: 'fixed',
        inset: '0% 0% auto'
      }}>
        
        {/* Logo */}
        <Link href="/" className="logo-brand w--current" style={{
          zIndex: 999,
          borderRadius: '9999px',
          WebkitBackdropFilter: 'blur(10px)',
          backdropFilter: 'blur(10px)',
          pointerEvents: 'auto',
          color: '#2f3440', // var(--charcoal-blue)
          justifyContent: 'center',
          alignItems: 'center',
          width: '2.5rem',
          height: '2.5rem',
          marginLeft: '5%',
          marginRight: 'auto',
          display: 'flex'
        }}>
          <Image 
            src="/images/VA LOGO wh 2.png" 
            alt="Vision Architecture Logo" 
            width={40} 
            height={40} 
            className="logo" 
            style={{ height: 'auto', width: 'auto' }}
            priority
          />
        </Link>

        {/* Burger Wrapper */}
        <div className="nav-cart-menu-flex" style={{
          zIndex: 999,
          columnGap: '1.1vw',
          rowGap: '1.1vw',
          pointerEvents: 'auto',
          gridTemplateRows: 'auto auto',
          gridTemplateColumns: '1fr 1fr',
          gridAutoColumns: '1fr',
          justifyContent: 'flex-end',
          placeItems: 'center',
          marginRight: '5%',
          display: 'flex',
          position: 'relative'
        }}>
          <div className="menu-burger-wrapper" onClick={toggleMenu} style={{
            zIndex: 998,
            borderRadius: '9999px',
            WebkitBackdropFilter: 'blur(10px)',
            backdropFilter: 'blur(10px)',
            color: 'whitesmoke', // var(--primary)
            justifyContent: 'center',
            alignItems: 'center',
            width: '4.5rem',
            height: '2.5rem',
            marginLeft: 'auto',
            transition: 'border-color .25s',
            display: 'flex',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer'
          }}>
            <div className="nu-menu-burger" style={{
              columnGap: '.25rem',
              rowGap: '.25rem',
              cursor: 'pointer',
              flexFlow: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '1.65rem',
              display: 'flex'
            }}>
              <div className="bar top" style={{
                backgroundColor: '#2f3440', // var(--charcoal-blue)
                width: '50%',
                height: '.145rem',
                position: 'relative',
                marginRight: 'auto'
              }}></div>
              <div className="bar middle" style={{
                backgroundColor: '#2f3440',
                width: '100%',
                height: '.145rem',
                position: 'relative'
              }}></div>
              <div className="bar bottom" style={{
                backgroundColor: '#2f3440',
                width: '50%',
                height: '.145rem',
                position: 'relative',
                marginLeft: 'auto'
              }}></div>
            </div>
          </div>
        </div>

      </div>

      {/* Full Screen Menu — rendered outside container-nav to avoid height clipping */}
      <nav className="nav-menu" role="navigation" style={{
        zIndex: 997,
        backgroundColor: '#f9f9f9',
        pointerEvents: 'auto',
        textAlign: 'left',
        flexFlow: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minWidth: '100%',
        maxWidth: '100%',
        minHeight: '100svh',
        paddingTop: '0%',
        paddingLeft: '10%',
        paddingRight: '10%',
        position: 'fixed',
        inset: '0%'
      }}>
        <div className="nav-flex" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%'
        }}>
          <div className="nav-block" style={{
            flexFlow: 'column',
            display: 'flex',
            gap: '2rem'
          }}>
            {[
              { name: 'About', href: '/#about' },
              { name: 'Speciality', href: '/#speciality' },
              { name: 'Founders', href: '/#team' },
              { name: 'Get in Touch', href: '/#contact' }
            ].map((link, idx) => (
              <div key={idx} className="nav-link-block" style={{
                textAlign: 'left',
                flexFlow: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                position: 'relative'
              }}>
                <Link href={link.href} className="nav-link" onClick={toggleMenu} style={{
                  color: '#1d2025',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  marginLeft: 0,
                  marginRight: 0,
                  fontSize: '3.33vw',
                  fontWeight: 500,
                  lineHeight: '3.33vw',
                  fontFamily: 'var(--font-telegrafico)',
                  textDecoration: 'none'
                }}>
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
