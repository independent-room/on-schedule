import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
import { LogoBar } from '@/components/landing/LogoBar';
import { Problems } from '@/components/landing/Problems';
import { Solution } from '@/components/landing/Solution';
import { Compare } from '@/components/landing/Compare';
import { Faq } from '@/components/landing/Faq';
import { FinalCta } from '@/components/landing/FinalCta';
import { Footer } from '@/components/landing/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LogoBar />
        <Problems />
        <Solution />
        <Compare />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
