export const siteConfig = {
  name: 'Vision Architecture',
  description: 'Vision Architecture specializes in architecture, interior design, landscape planning, and sustainable developments.',
  url: 'https://visionarchitecture.in',
  email: 'info.visionarchitecture@gmail.com',
  phones: [
    '+91 96876 88373',
    '+91 73592 19598',
  ],
  social: {
    // Add social links if available
  },
  navigation: [
    { name: 'About', href: '/#about' },
    { name: 'Speciality', href: '/#speciality' },
    { name: 'Founders', href: '/#founders' },
    { name: 'Contact', href: '/#contact' },
  ],
  specialties: [
    { name: 'Architecture', href: '/architecture' },
    { name: 'Interior Design', href: '/interior-design' },
    { name: 'Landscape', href: '/landscape' },
    { name: 'Renovation', href: '/renovation' },
  ],
} as const;
