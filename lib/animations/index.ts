import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION_TIMINGS, ANIMATION_EASINGS, SCROLL_TRIGGER_DEFAULTS } from '@/lib/constants/animations';

// Ensure plugins registered
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Letter reveal animation
 * EXACT implementation from reference index.html lines 911-958
 * Uses gsap.matchMedia() for responsive breakpoints
 */
export function setupLetterReveal(element: HTMLElement) {
  const text = element.innerText;

  // Split text into characters — exact from reference lines 915-919
  element.innerHTML = text
    .split('')
    .map((char) =>
      char === ' ' ? ' ' : `<span class="letter" style="display:inline-block">${char}</span>`
    )
    .join('');

  const letters = element.querySelectorAll('.letter');
  const mm = gsap.matchMedia();

  // Desktop: scrubbed scroll animation — reference lines 922-938
  mm.add('(min-width: 1024px)', () => {
    gsap.fromTo(
      letters,
      { opacity: 0.05 },
      {
        opacity: 1,
        stagger: ANIMATION_TIMINGS.LETTER_STAGGER,       // 0.05
        duration: ANIMATION_TIMINGS.LETTER_DURATION,     // 0.425
        ease: ANIMATION_EASINGS.POWER2_OUT,              // power2.out
        scrollTrigger: {
          trigger: element,
          start: SCROLL_TRIGGER_DEFAULTS.START,          // top 70%
          end: SCROLL_TRIGGER_DEFAULTS.END,              // top 35%
          scrub: true,
        },
      }
    );
  });

  // Mobile: different scroll range — reference lines 940-957
  mm.add('(max-width: 1023px)', () => {
    gsap.fromTo(
      letters,
      { opacity: 0.05 },
      {
        opacity: 1,
        stagger: ANIMATION_TIMINGS.LETTER_STAGGER,
        duration: ANIMATION_TIMINGS.LETTER_DURATION,
        ease: ANIMATION_EASINGS.POWER2_OUT,
        scrollTrigger: {
          trigger: element,
          start: SCROLL_TRIGGER_DEFAULTS.MOBILE_START,   // top 80%
          end: SCROLL_TRIGGER_DEFAULTS.MOBILE_END,       // top 45%
          scrub: true,
        },
      }
    );
  });
}

/**
 * Fade up animation (reusable)
 * Based on reference customFadeInUp keyframe (lines 173-176)
 */
export function fadeUp(
  element: Element | Element[] | NodeListOf<Element>,
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
) {
  return gsap.from(element, {
    opacity: 0,
    y: options.y ?? 30,
    duration: options.duration ?? 0.8,
    delay: options.delay ?? 0,
    stagger: options.stagger ?? 0,
    ease: ANIMATION_EASINGS.POWER2_OUT,
    ...(options.scrollTrigger && {
      scrollTrigger: {
        start: SCROLL_TRIGGER_DEFAULTS.START,
        toggleActions: SCROLL_TRIGGER_DEFAULTS.TOGGLE_ACTIONS,
        ...options.scrollTrigger,
      },
    }),
  });
}

/**
 * Service card animation
 * EXACT from reference index.html lines 869-884
 */
export function setupServiceCardAnimations(cards: NodeListOf<Element> | Element[]) {
  cards.forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: ANIMATION_TIMINGS.SERVICE_CARD_Y_OFFSET,        // 50
      duration: ANIMATION_TIMINGS.SERVICE_CARD_DURATION,  // 1.25
      scrollTrigger: {
        trigger: card,
        start: 'top 70%',                                // reference line 880
        toggleActions: 'play none none reverse',          // reference line 881
      },
    });
  });
}

/**
 * GSAP counter animation
 * Alternative to useCounter hook — uses GSAP fromTo
 * EXACT from reference index.html lines 886-908
 */
export function setupGSAPCounter(elements: NodeListOf<Element> | Element[]) {
  elements.forEach((el) => {
    const targetValue = +(el.getAttribute('data-target') || '0');
    gsap.fromTo(
      el,
      { innerText: 0 },
      {
        innerText: targetValue,
        duration: 2,                                     // reference line 896
        ease: ANIMATION_EASINGS.POWER1_OUT,              // reference line 897
        snap: { innerText: 1 },                          // reference line 898
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',                              // reference line 901
        },
        onUpdate: function () {
          (el as HTMLElement).innerText = Math.floor(
            parseFloat((el as HTMLElement).innerText)
          ).toString();
        },
      }
    );
  });
}

// Re-export everything
export { setupLetterReveal as letterReveal };
export { fadeUp as fadeUpAnimation };
export { setupServiceCardAnimations as serviceCards };
export { setupGSAPCounter as counterAnimation };
