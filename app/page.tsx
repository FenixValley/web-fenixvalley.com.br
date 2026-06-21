import { opportunities } from "@/data/opportunities";
import { AudienceSection } from "@/components/sections/audience-section";
import { ContentCommunitySection } from "@/components/sections/content-community-section";
import { EcosystemSection } from "@/components/sections/ecosystem-section";
import { HeroSection } from "@/components/sections/hero-section";
import { JoinSection } from "@/components/sections/join-section";
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
        <AudienceSection />
        <EcosystemSection />
        <ProgramsSection />
        <OpportunitiesSection opportunities={opportunities} />
        <ContentCommunitySection />
        <JoinSection />
      </main>
      <SiteFooter />
    </>
  );
}
