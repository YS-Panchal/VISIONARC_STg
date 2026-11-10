'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Captured error boundary:', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'var(--font-telegrafico), sans-serif',
      color: '#2f3440',
      backgroundColor: '#FAFAF8',
    }}>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Notice
      </h2>
      <p style={{ maxWidth: '420px', marginBottom: '1.5rem', lineHeight: '1.6', opacity: 0.8, fontSize: '0.95rem' }}>
        A momentary display interruption occurred while rendering gallery visuals.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.8rem 1.8rem',
          backgroundColor: '#8B2635',
          color: '#ffffff',
          border: 'none',
          borderRadius: '2px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontWeight: 600,
        }}
      >
        Reload View
      </button>
    </div>
  );
}
