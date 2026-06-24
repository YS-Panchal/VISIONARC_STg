'use client';

import { useEffect, useRef } from 'react';

/**
 * useCounter - Animated counter with easeOutQuad
 * EXACT implementation from reference index.html lines 1003-1052
 * 
 * Reference values:
 * - duration: 2000ms (line 1011)
 * - easing: easeOutQuad → progress * (2 - progress) (line 1019)
 * - threshold: 0.2 (line 1035)
 * - delay: 3600ms on first load for intro clear (line 1045)
 */
export function useCounter(
  target: number,
  duration: number = 2000,
  delay: number = 0
) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const animateCounter = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const startTime = performance.now();

      // EXACT easing from reference line 1019: progress * (2 - progress) = easeOutQuad
      const update = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress * (2 - progress);

        element.textContent = Math.floor(easeProgress * target).toString();

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = target.toString();
        }
      };

      requestAnimationFrame(update);
    };

    // Trigger at 20% visibility (exact from reference line 1035: threshold: 0.2)
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(animateCounter, delay);
            } else {
              animateCounter();
            }
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [target, duration, delay]);

  return elementRef;
}
