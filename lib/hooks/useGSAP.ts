'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Safe isomorphic layout effect
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * useGSAP - Safe GSAP hook with automatic cleanup
 * Scopes animations to component ref
 */
export function useGSAP(
  callback: (ctx: gsap.Context) => void | (() => void),
  dependencies: React.DependencyList = []
) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      callback(ctx);
    }, ref);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return ref;
}

/**
 * useScrollTrigger - Hook for scroll-triggered animations
 */
export function useScrollTrigger(
  callback: () => void,
  dependencies: React.DependencyList = []
) {
  useIsomorphicLayoutEffect(() => {
    callback();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
