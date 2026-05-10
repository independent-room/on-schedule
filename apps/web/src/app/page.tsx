import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
import { Solution } from '@/components/landing/Solution';
import { Faq } from '@/components/landing/Faq';
import { FinalCta } from '@/components/landing/FinalCta';
import { Footer } from '@/components/landing/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Solution />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
