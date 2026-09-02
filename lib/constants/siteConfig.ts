export const siteConfig = {
  name: 'Vision Architecture',
  description: 'Vision Architecture specializes in architecture, interior design, hospitality architecture, and renovation & planning.',
  url: 'https://visionarchitecture.in',
  email: 'info.visionarchitecture@gmail.com',
  phones: [
    '+91 96876 88373',
    '+91 73592 19598',
  ],
  social: {
    linkedin: 'https://www.linkedin.com/company/vision-architecture-india',
    instagram: 'https://www.instagram.com/visionarchitecture.in/',
  },
  navigation: [
    { name: 'About', href: '/#about' },
    { name: 'Speciality', href: '/#speciality' },
    { name: 'Founders', href: '/#team' },
    { name: 'Contact', href: '/#contact' },
  ],
  specialties: [
    { name: 'Architecture', href: '/architecture' },
    { name: 'Interior Design', href: '/interior-design' },
    { name: 'Hospitality Architecture', href: '/hospitality-architecture' },
    { name: 'Renovation & Planning', href: '/renovation' },
  ],
} as const;
