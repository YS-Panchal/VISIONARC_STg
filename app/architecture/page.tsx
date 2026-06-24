import SpecialityPage from '@/components/pages/SpecialityPage';

export const metadata = {
  title: 'Architecture | Vision Architecture | Urban Design Gujarat',
  description: "Vision Architecture's architecture portfolio — residential villas, commercial towers, institutional buildings, and sustainable design across Ahmedabad and Gujarat.",
};

const projects = [
  {
    images: [
      '/images/68dbfd24fdb7045c1c994ad8_speciality-image-3.webp',
      '/images/68dbf7b1f456696a2949e588_about-image-1.webp',
      '/images/68de3c533564c54db3f1bed9_about-image-2.webp'
    ],
    alt: 'Minimalist Concrete Villa',
    title: 'Minimalist Concrete Villa',
    description: 'A luxury private residence showcasing clean lines, open spatial flow, raw concrete surfaces, and seamless indoor-outdoor integration.',
    tags: ['Residential', 'Luxury', 'Ahmedabad'],
  },
  {
    images: [
      '/images/68dbf7b1f456696a2949e588_about-image-1.webp',
      '/images/68de3c533564c54db3f1bed9_about-image-2.webp',
      '/images/68dbfd1b1720439ef17a5bcc_speciality-image-4.webp'
    ],
    alt: 'Skyline Commercial Tower',
    title: 'Skyline Commercial Tower',
    description: 'A high-rise commercial hub featuring a double-glazed facade, solar panel arrays, energy-efficient HVAC, and flexible floor plans for modern workplaces.',
    tags: ['Commercial', 'High-Rise', 'Ahmedabad'],
  },
  {
    images: [
      '/images/68de3c533564c54db3f1bed9_about-image-2.webp',
      '/images/68dbfd1b1720439ef17a5bcc_speciality-image-4.webp',
      '/images/68dcfd186c4fed1ec248c9fd_speciality-image-2.webp'
    ],
    alt: 'The Pavilion at Sabarmati',
    title: 'The Pavilion at Sabarmati',
    description: 'A cultural exhibition center blending local brickwork with modern steel arches, designed to facilitate community gatherings and public events.',
    tags: ['Institutional', 'Sabarmati'],
  },
  {
    images: [
      '/images/68dbfd1b1720439ef17a5bcc_speciality-image-4.webp',
      '/images/68dcfd186c4fed1ec248c9fd_speciality-image-2.webp',
      '/images/68dbfd5a5a669be935ee3b02_speciality-image-1.webp'
    ],
    alt: 'GIFT City Innovation Center',
    title: 'GIFT City Innovation Center',
    description: 'A futuristic mixed-use corporate headquarters integrating smart building technologies, green roofs, and collaborative workspaces.',
    tags: ['Corporate', 'GIFT City'],
  },
];

export default function Architecture() {
  return (
    <SpecialityPage
      heroTitle="Architecture"
      heroSubtitle="Designing structures that blend innovation with cultural context — from luxury residences to iconic commercial landmarks across Gujarat."
      heroBackground="/images/68dbfd24fdb7045c1c994ad8_speciality-image-3.webp"
      introHeading="Building with Purpose"
      introParagraphs={[
        "Our architectural practice is founded on the belief that great buildings enhance wellbeing, sustainability, and community. We approach every project holistically — integrating structural innovation, material authenticity, and human-centric design into cohesive architectural experiences.",
        "Our work spans luxury residences, commercial complexes, institutional buildings, and mixed-use developments, all guided by contextual sensitivity and forward-thinking design principles."
      ]}
      projects={projects}
      ctaHeading="Envision Your Architecture?"
      ctaText="From private villas to entire townships, we design structures that endure and inspire."
    />
  );
}
