/**
 * Animation constants — ALL values extracted from reference index.html
 * Each value is annotated with exact line number from reference.
 */

export const ANIMATION_TIMINGS = {
  // Hero Intro Overlay (reference line 46)
  // animation: overlaySlideUp 1.2s cubic-bezier(0.76, 0, 0.24, 1) 2s forwards
  INTRO_OVERLAY_DURATION: 1.2,
  INTRO_OVERLAY_DELAY: 2.0,

  // Hero Intro Tagline (reference line 56)
  // animation: introTaglineFade 0.4s ease 1.8s forwards
  INTRO_TAGLINE_FADE_DURATION: 0.4,
  INTRO_TAGLINE_FADE_DELAY: 1.8,

  // Hero Title Zoom In (reference line 111)
  // animation: customZoomIn 1s cubic-bezier(0.16, 1, 0.3, 1) 2.6s forwards
  HERO_TITLE_DURATION: 1.0,
  HERO_TITLE_DELAY: 2.6,

  // Hero Tagline Fade Up (reference line 98)
  // animation: customFadeInUp 0.8s ease-out 2.8s forwards
  HERO_TAGLINE_DURATION: 0.8,
  HERO_TAGLINE_DELAY: 2.8,

  // Category Nav Fade Up (reference line 122)
  // animation: customFadeInUp 0.8s ease-out 3s forwards
  HERO_NAV_DURATION: 0.8,
  HERO_NAV_DELAY: 3.0,

  // Letter Reveal — reference lines 928-929
  LETTER_STAGGER: 0.05,
  LETTER_DURATION: 0.425,

  // Service Cards — reference lines 876-877
  SERVICE_CARD_DURATION: 1.25,
  SERVICE_CARD_Y_OFFSET: 50,

  // Counter Animation — reference line 1011
  COUNTER_DURATION: 2000, // milliseconds
  COUNTER_INTRO_DELAY: 3600, // reference line 1045: wait for intro

  // Navigation — reference line 299 (data-duration="400")
  MENU_DURATION: 0.4,

  // Hamburger bar animation
  HAMBURGER_DURATION: 0.3,

  // Sticky nav slide down — reference line 137
  // animation: customSlideDown 0.4s ease-out forwards
  STICKY_NAV_DURATION: 0.4,

  // Portfolio modal (reference lines 815-824)
  MODAL_FADE_DURATION: 0.6,
  MODAL_CARD_Y: 40,
  MODAL_CARD_DURATION: 0.5,
  MODAL_CARD_STAGGER: 0.1,
} as const;

export const ANIMATION_EASINGS = {
  // reference line 930: ease: "power2.out"
  POWER2_OUT: 'power2.out',
  // reference line 825: ease: "power3.out"
  POWER3_OUT: 'power3.out',
  // reference line 897: ease: "power1.out"
  POWER1_OUT: 'power1.out',
  POWER2_INOUT: 'power2.inOut',
  // reference line 111: cubic-bezier(0.16, 1, 0.3, 1) = expo.out
  EXPO_OUT: 'expo.out',
  // reference line 46: cubic-bezier(0.76, 0, 0.24, 1)
  CUBIC_CUSTOM: 'cubic-bezier(0.76, 0, 0.24, 1)',
  LINEAR: 'none',
} as const;

export const SCROLL_TRIGGER_DEFAULTS = {
  // Desktop letter reveal — reference lines 933-935
  START: 'top 70%',
  END: 'top 35%',
  // Mobile letter reveal — reference lines 951-953
  MOBILE_START: 'top 80%',
  MOBILE_END: 'top 45%',
  // Service cards — reference line 881
  TOGGLE_ACTIONS: 'play none none reverse' as const,
  SCRUB: true,
} as const;

// Hero intro keyframe values — reference lines 59-67, 173-186
export const HERO_INTRO = {
  OVERLAY_BG: '#2f3440',
  OVERLAY_Z_INDEX: 9998,
  TAGLINE_FONT_SIZE: 'clamp(1rem, 2.5vw, 1.8rem)',
  TAGLINE_LETTER_SPACING: '0.25em',
  TITLE_FONT_SIZE: 'clamp(5rem, 15vw, 13rem)',
  TITLE_INITIAL_SCALE: 1.3,
  FADE_UP_Y: 15,
} as const;
