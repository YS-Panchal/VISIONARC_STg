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
  description: 'Vision Architecture is a premier architectural and interior design firm in Ahmedabad, Gujarat — specializing in luxury residential, hospitality, commercial, and renovation projects.',
  keywords: [
    'Vision Architecture',
    'architecture firm Ahmedabad',
    'architects in Gujarat',
    'interior design Ahmedabad',
    'hospitality architecture Gujarat',
    'luxury residential architects',
    'renovation architects Ahmedabad',
    'Khantil Panchal',
    'Surbhi Panchal',
  ],
  authors: [{ name: 'Vision Architecture' }],
  creator: 'Vision Architecture',
  publisher: 'Vision Architecture',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vision Architecture | Where Vision Meets Precision',
    description: 'Premier architecture, hospitality architecture, interior design, and renovation firm in Ahmedabad, Gujarat. Over 2.2M+ sq. ft. designed.',
    url: 'https://visionarchitecture.in',
    siteName: 'Vision Architecture',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vision Architecture | Where Vision Meets Precision',
    description: 'Premier architecture, hospitality architecture, interior design, and renovation firm in Ahmedabad, Gujarat.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
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
