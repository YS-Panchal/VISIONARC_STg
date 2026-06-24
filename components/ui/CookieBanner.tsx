'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * CookieBanner - Cookie consent notification
 * Reference: index.html lines 213-298, 789-802
 * 
 * Behavior:
 * - Shows on first visit (no localStorage flag)
 * - Positioned bottom-center (reference line 228: bottom: 2rem, left: 50%)
 * - Click Accept: sets localStorage, hides banner
 * - Subsequent visits: stays hidden
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) {
      // Delay showing to avoid conflict with hero intro (3.6s intro duration)
      const timer = setTimeout(() => {
        setVisible(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-[800px] px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm"
      style={{
        background: '#f9f9f9cf',
        backdropFilter: 'blur(0.25rem)',
      }}
    >
      <div className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed text-[#333]" style={{ textWrap: 'balance' }}>
          We use cookies to enhance your browsing experience. By continuing, you agree to our{' '}
          <Link href="/cookies-policy" className="underline font-medium text-black text-[0.85rem]">
            Cookie Policy
          </Link>
          .
        </p>
        <button
          onClick={handleAccept}
          className="self-end text-white text-[0.9rem] border-none rounded-full px-6 py-2 cursor-pointer transition-colors duration-300 hover:bg-[#333]"
          style={{ background: '#2f3440' }}
        >
          ACCEPT
        </button>
      </div>
    </div>
  );
}
