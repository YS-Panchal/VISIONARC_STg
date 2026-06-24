import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Speciality from '@/components/sections/Speciality';
import Works from '@/components/sections/Works';
import Services from '@/components/sections/Services';
import Team from '@/components/sections/Team';
import Reviews from '@/components/sections/Reviews';
import AssociatedCompanies from '@/components/sections/AssociatedCompanies';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import FloatingActions from '@/components/ui/FloatingActions';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Speciality />
      <Works />
      <Services />
      <Team />
      <Reviews />
      <AssociatedCompanies />
      <Contact />
      <Footer />
      <FloatingActions />
    </main>
  );
}
