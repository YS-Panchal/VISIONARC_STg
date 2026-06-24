import SpecialityPage from '@/components/pages/SpecialityPage';

export const metadata = {
  title: 'Landscape & Planning | Vision Architecture | Urban Design Gujarat',
  description: "Vision Architecture's landscape and urban planning portfolio — master plans, public spaces, garden design, and sustainable landscapes across Ahmedabad and Gujarat.",
};

const projects = [
  {
    images: [
      '/images/68dbfd1b1720439ef17a5bcc_speciality-image-4.webp',
      '/images/68dbf7b1f456696a2949e588_about-image-1.webp',
      '/images/68de3c533564c54db3f1bed9_about-image-2.webp'
    ],
    alt: 'Zen Garden',
    title: 'Zen Garden Retreat',
    description: 'A 2-acre private garden designed as a meditative landscape with koi ponds, Japanese maple groves, sculptural stepping stones, and a minimalist tea pavilion.',
    tags: ['Garden', '2 Acres', 'Thaltej'],
  },
  {
    images: [
      '/images/68dbf7b1f456696a2949e588_about-image-1.webp',
      '/images/68de3c533564c54db3f1bed9_about-image-2.webp',
      '/images/68dbfd24fdb7045c1c994ad8_speciality-image-3.webp'
    ],
    alt: 'Township Master Plan',
    title: 'Green Township Master Plan',
    description: 'A 45-acre residential township featuring 40% green open space, pedestrian-priority streets, integrated stormwater management, and a central community park.',
    tags: ['Master Plan', '45 Acres', 'Gandhinagar'],
  },
  {
    images: [
      '/images/68de3c533564c54db3f1bed9_about-image-2.webp',
      '/images/68dbfd24fdb7045c1c994ad8_speciality-image-3.webp',
      '/images/68dcfd186c4fed1ec248c9fd_speciality-image-2.webp'
    ],
    alt: 'Riverfront',
    title: 'Riverfront Promenade',
    description: 'A 1.2 km public promenade featuring amphitheatres, stepped ghats, native riparian planting, cycling paths, and illuminated art installations for nighttime activation.',
    tags: ['Public Space', '1.2 km', 'Sabarmati'],
  },
  {
    images: [
      '/images/68dbfd24fdb7045c1c994ad8_speciality-image-3.webp',
      '/images/68dcfd186c4fed1ec248c9fd_speciality-image-2.webp',
      '/images/68dbfd5a5a669be935ee3b02_speciality-image-1.webp'
    ],
    alt: 'Corporate Campus',
    title: 'Tech Campus Landscape',
    description: 'An 8-acre corporate campus landscape with outdoor collaboration zones, rain gardens, a jogging trail loop, and shaded courtyards connecting four office blocks.',
    tags: ['Campus', '8 Acres', 'GIFT City'],
  },
];

export default function Landscape() {
  return (
    <SpecialityPage
      heroTitle="Landscape & Planning"
      heroSubtitle="Shaping outdoor environments and urban landscapes that harmonize nature with the built world — from private gardens to master-planned communities."
      heroBackground="/images/68dbfd1b1720439ef17a5bcc_speciality-image-4.webp"
      introHeading="Designing with Nature"
      introParagraphs={[
        "Our landscape practice is rooted in the belief that great outdoor spaces enhance wellbeing, sustainability, and community. We approach every project as an ecosystem — integrating native vegetation, water management, and human-centric design into cohesive landscapes.",
        "Our planning work spans township layouts, site master plans, and urban regeneration projects, all guided by contextual sensitivity and forward-thinking design principles."
      ]}
      projects={projects}
      ctaHeading="Envision Your Landscape?"
      ctaText="From rooftop terraces to entire townships, we design landscapes that endure and inspire."
    />
  );
}
