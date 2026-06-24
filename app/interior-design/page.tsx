import SpecialityPage from '@/components/pages/SpecialityPage';

export const metadata = {
  title: 'Interior Design | Vision Architecture | Gujarat',
  description: "Vision Architecture's interior design portfolio — luxury residences, commercial spaces, hospitality interiors, and bespoke design across Ahmedabad and Gujarat.",
};

const projects = [
  {
    images: [
      '/images/68dcfd186c4fed1ec248c9fd_speciality-image-2.webp',
      '/images/68dbfd5a5a669be935ee3b02_speciality-image-1.webp',
      '/images/68de3c533564c54db3f1bed9_about-image-2.webp'
    ],
    alt: 'Luxury Penthouse Suite',
    title: 'Luxury Penthouse Suite',
    description: 'A bespoke residential interior with handpicked marble, custom brass fixtures, ambient recessed lighting, and premium Italian furniture curation.',
    tags: ['Residential', 'Luxury', 'Ahmedabad'],
  },
  {
    images: [
      '/images/68dbfd5a5a669be935ee3b02_speciality-image-1.webp',
      '/images/68de3c533564c54db3f1bed9_about-image-2.webp',
      '/images/68dbf7b1f456696a2949e588_about-image-1.webp'
    ],
    alt: 'Co-Working Hub Interior',
    title: 'Co-Working Hub Interior',
    description: 'A vibrant, open-concept co-working office designed with acoustic paneling, flexible modular workstations, biophilic walls, and cozy cafe-style break rooms.',
    tags: ['Commercial', 'Office', 'Ahmedabad'],
  },
  {
    images: [
      '/images/68de3c533564c54db3f1bed9_about-image-2.webp',
      '/images/68dbf7b1f456696a2949e588_about-image-1.webp',
      '/images/68dbfd24fdb7045c1c994ad8_speciality-image-3.webp'
    ],
    alt: 'Bespoke Lounge & Restaurant',
    title: 'Bespoke Lounge & Restaurant',
    description: 'An intimate dining experience featuring rich textures, warm wood paneling, custom-crafted seating, and dramatic spotlighting.',
    tags: ['Hospitality', 'Bespoke', 'Ahmedabad'],
  },
  {
    images: [
      '/images/68dbf7b1f456696a2949e588_about-image-1.webp',
      '/images/68dbfd24fdb7045c1c994ad8_speciality-image-3.webp',
      '/images/68dbfd1b1720439ef17a5bcc_speciality-image-4.webp'
    ],
    alt: 'Modern Retail Showroom',
    title: 'Modern Retail Showroom',
    description: 'A sleek, minimalist retail space emphasizing merchandise lighting, uncluttered pathways, and neutral tones to highlight products.',
    tags: ['Retail', 'Minimalist', 'Baroda'],
  },
];

export default function InteriorDesign() {
  return (
    <SpecialityPage
      heroTitle="Interior Design"
      heroSubtitle="Crafting interior environments that harmonize aesthetics with functionality — from private residences to commercial showpieces."
      heroBackground="/images/68dcfd186c4fed1ec248c9fd_speciality-image-2.webp"
      introHeading="Designing with Intention"
      introParagraphs={[
        "Our interior design practice is rooted in the belief that great spaces enhance wellbeing, productivity, and joy. We approach every project as a narrative — integrating materials, lighting, and spatial flow into cohesive interior experiences.",
        "Our work spans luxury residences, commercial offices, hospitality venues, and retail environments, all guided by material authenticity and forward-thinking design principles."
      ]}
      projects={projects}
      ctaHeading="Envision Your Interior?"
      ctaText="From intimate residences to grand commercial spaces, we design interiors that endure and inspire."
    />
  );
}
