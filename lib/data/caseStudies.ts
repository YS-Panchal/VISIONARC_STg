export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  heroVideo?: string;
  stats: { label: string; value: string }[];
  gallery: string[];
}

// Case study data - to be populated with real content
export const caseStudies: CaseStudy[] = [];
