import { opportunities } from "@/data/opportunities";
import { EcosystemSection } from "@/components/sections/ecosystem-section";
import { HeroSection } from "@/components/sections/hero-section";
import { JoinSection } from "@/components/sections/join-section";
import { OpportunitiesSection } from "@/components/sections/opportunities-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <EcosystemSection />
        <OpportunitiesSection opportunities={opportunities} />
        <JoinSection />
      </main>
      <SiteFooter />
    </>
  );
}
