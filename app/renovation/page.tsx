import SpecialityPage from '@/components/pages/SpecialityPage';

export const metadata = {
  title: 'Renovation & Management | Vision Architecture | Gujarat',
  description: "Vision Architecture's renovation and project management portfolio — heritage restoration, building upgrades, and turnkey project management across Ahmedabad and Gujarat.",
};

const projects = [
  {
    images: [
      '/images/68dbfd5a5a669be935ee3b02_speciality-image-1.webp',
      '/images/68dbf7b1f456696a2949e588_about-image-1.webp',
      '/images/68dbfd24fdb7045c1c994ad8_speciality-image-3.webp'
    ],
    alt: 'Heritage Haveli Restoration',
    title: 'Heritage Haveli Restoration',
    description: 'Meticulous structural preservation and aesthetic restoration of a 150-year-old traditional Haveli, retrofitting modern utilities without compromising heritage value.',
    tags: ['Heritage', 'Restoration', 'Ahmedabad Old City'],
  },
  {
    images: [
      '/images/68dbf7b1f456696a2949e588_about-image-1.webp',
      '/images/68dbfd24fdb7045c1c994ad8_speciality-image-3.webp',
      '/images/68dcfd186c4fed1ec248c9fd_speciality-image-2.webp'
    ],
    alt: 'Industrial Warehouse Conversion',
    title: 'Industrial Warehouse Conversion',
    description: 'Transforming an abandoned textile mill into a modern multi-agency design studio, retaining exposed brick walls and iron trusses.',
    tags: ['Turnkey', 'Adaptive Reuse', 'Ahmedabad'],
  },
  {
    images: [
      '/images/68dbfd24fdb7045c1c994ad8_speciality-image-3.webp',
      '/images/68dcfd186c4fed1ec248c9fd_speciality-image-2.webp',
      '/images/68dbfd1b1720439ef17a5bcc_speciality-image-4.webp'
    ],
    alt: 'Corporate Headquarters Upgrade',
    title: 'Corporate Headquarters Upgrade',
    description: 'Complete interior and MEP services overhaul of a 10-year-old corporate office to improve energy efficiency, acoustics, and spatial utilization.',
    tags: ['Commercial', 'MEP Upgrade', 'Ahmedabad'],
  },
  {
    images: [
      '/images/68dcfd186c4fed1ec248c9fd_speciality-image-2.webp',
      '/images/68dbfd1b1720439ef17a5bcc_speciality-image-4.webp',
      '/images/68dbfd5a5a669be935ee3b02_speciality-image-1.webp'
    ],
    alt: 'Turnkey Residential Refurbishment',
    title: 'Turnkey Residential Refurbishment',
    description: 'Full turnkey remodeling of a suburban family bungalow, from demolition and structural reinforcement to final interior furnishing.',
    tags: ['Residential', 'Refurbishment', 'Ahmedabad'],
  },
];

export default function Renovation() {
  return (
    <SpecialityPage
      heroTitle="Renovation & Management"
      heroSubtitle="Breathing new life into existing structures and managing projects from conception to completion — with precision and cultural sensitivity."
      heroBackground="/images/68dbfd5a5a669be935ee3b02_speciality-image-1.webp"
      introHeading="Reviving with Respect"
      introParagraphs={[
        "Our renovation practice is rooted in the belief that existing structures hold stories worth preserving. We approach every project with deep respect for the original intent — integrating modern systems, improved accessibility, and contemporary aesthetics while honoring the building's heritage.",
        "Our management work spans end-to-end project delivery, cost control, contractor coordination, and quality assurance, all guided by transparency and client-first principles."
      ]}
      projects={projects}
      ctaHeading="Envision Your Renovation?"
      ctaText="From heritage restorations to complete building overhauls, we manage projects that endure and inspire."
    />
  );
}
