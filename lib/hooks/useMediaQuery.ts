'use client';

import { useState, useEffect } from 'react';

/**
 * useMediaQuery - Responsive breakpoint hook
 * Matches reference breakpoints: (min-width: 1024px) and (max-width: 1023px)
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// Pre-defined breakpoints matching reference gsap.matchMedia() calls
// Reference lines 922, 940: (min-width: 1024px) and (max-width: 1023px)
export const breakpoints = {
  isDesktop: '(min-width: 1024px)',
  isMobile: '(max-width: 1023px)',
  isTablet: '(min-width: 768px) and (max-width: 1023px)',
  isSmallMobile: '(max-width: 480px)',
} as const;
