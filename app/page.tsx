import { EcosystemSection } from "@/components/sections/ecosystem-section";
import { FacaParteSection } from "@/components/sections/faca-parte-section";
import { HeroSection } from "@/components/sections/hero-section";
import { IndicatorsSection } from "@/components/sections/indicators-section";
import { OpportunitiesSection } from "@/components/sections/opportunities-section";
import { ProgramsSection } from "@/components/sections/programs-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <EcosystemSection />
        <ProgramsSection />
        <IndicatorsSection />
        <OpportunitiesSection />
        <FacaParteSection />
      </main>
      <SiteFooter />
    </>
  );
}
