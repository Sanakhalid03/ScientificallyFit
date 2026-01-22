"use client";

import { AuroraHero } from "@/components/futurastic-hero-section";
import RadialOrbitalTimelineDemo from "@/Webcomponents/Method";
import ModuleRow from "@/Webcomponents/Modules";
import { ProgramsSection } from "@/Webcomponents/Programs";
import ToolsPreview from "@/Webcomponents/Track";
import { ClientOnly } from "@/Webcomponents/ClientOnly";

export default function Home() {
  return (
    <div>
      <AuroraHero />

      {/* Client-only components */}
      <ClientOnly>
        <ModuleRow />
        <RadialOrbitalTimelineDemo />
      </ClientOnly>

      {/* Components safe for SSR */}
      <ProgramsSection />
      <ToolsPreview />
    </div>
  );
}
