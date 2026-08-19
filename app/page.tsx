import { EcosystemSection } from "@/components/sections/ecosystem-section";
import { FacaParteSection } from "@/components/sections/faca-parte-section";
import { HeroSection } from "@/components/sections/hero-section";
import { IndicatorsSection } from "@/components/sections/indicators-section";
import { OpportunitiesSection } from "@/components/sections/opportunities-section";
import { opportunities } from "@/data/opportunities";
import { ProgramsSection } from "@/components/sections/programs-section";
import { AudienceSection } from "@/components/sections/audience-section";
import { ContentCommunitySection } from "@/components/sections/content-community-section";
import { JoinSection } from "@/components/sections/join-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { todayInBusinessTimeZone } from "@/lib/date";

export default function HomePage() {
  const today = todayInBusinessTimeZone();
  const activeOpportunities = opportunities.filter((opportunity) => opportunity.date >= today);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <AudienceSection />
        <EcosystemSection />
        <ProgramsSection />
        <IndicatorsSection />
        <OpportunitiesSection opportunities={activeOpportunities} />
        <ContentCommunitySection />
        <FacaParteSection />
        <JoinSection />
      </main>
      <SiteFooter />
    </>
  );
}
