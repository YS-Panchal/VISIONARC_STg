import type { Metadata } from 'next';
import { bankGothic, telegrafico } from './fonts';
import SmoothScroll from '@/components/layout/SmoothScroll';
import HeroIntro from '@/components/layout/HeroIntro';
import TransitionOverlay from '@/components/layout/TransitionOverlay';
import Navbar from '@/components/layout/Navbar';
import CookieBanner from '@/components/ui/CookieBanner';
import CustomCursor from '@/components/ui/CustomCursor';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://visionarchitecture.in'),
  title: 'Vision Architecture | Where Vision Meets Precision',
  description: 'Vision Architecture is a forward-thinking firm specializing in architecture, interior design, landscape planning, and sustainable developments.',
  keywords: ['architecture', 'interior design', 'landscape', 'Gujarat', 'Ahmedabad'],
  openGraph: {
    title: 'Vision Architecture | Where Vision Meets Precision',
    description: 'Specializing in architecture, interior design, and landscape planning across Gujarat.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Vision Architecture',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bankGothic.variable} ${telegrafico.variable}`}
    >
      <body suppressHydrationWarning>
        <CustomCursor />
        <HeroIntro />
        <TransitionOverlay />
        <Navbar />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <CookieBanner />
      </body>
    </html>
  );
}
