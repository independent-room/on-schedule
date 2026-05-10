import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
import { ValueDeclaration } from '@/components/landing/ValueDeclaration';
import { FeatureCards } from '@/components/landing/FeatureCards';
import { SupportScope } from '@/components/landing/SupportScope';
import { ZeroBarrier } from '@/components/landing/ZeroBarrier';
import { FounderStory } from '@/components/landing/FounderStory';
import { Roadmap } from '@/components/landing/Roadmap';
import { EarlyBird } from '@/components/landing/EarlyBird';
import { Faq } from '@/components/landing/Faq';
import { FinalCta } from '@/components/landing/FinalCta';
import { Footer } from '@/components/landing/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ValueDeclaration />
        <FeatureCards />
        <SupportScope />
        <ZeroBarrier />
        <FounderStory />
        <Roadmap />
        <EarlyBird />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
