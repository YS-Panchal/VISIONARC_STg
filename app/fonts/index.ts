import localFont from 'next/font/local';

export const bankGothic = localFont({
  src: '../../public/fonts/BankGothic Md BT.ttf',
  variable: '--font-bank-gothic',
  display: 'swap',
  fallback: ['serif'],
  preload: true,
});

export const telegrafico = localFont({
  src: '../../public/fonts/Telegrafico.ttf',
  variable: '--font-telegrafico',
  display: 'swap',
  fallback: ['sans-serif'],
  preload: true,
});
