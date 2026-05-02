// app/[locale]/experiences/sri-lanka/page.tsx
import { AbdulExperienceBlock } from "@/components/sections/AbdulExperienceBlock";
import { ExperienceActivities } from "@/components/sections/ExperienceActivities";
import { ExperienceHero } from "@/components/sections/ExperienceHero";
import { ExperienceHighlights } from "@/components/sections/ExperienceHighlights";
import { ExperienceOverview } from "@/components/sections/ExperienceOverview";
import { ExperienceSafety } from "@/components/sections/ExperienceSafety";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ExperienceWhoFor } from "@/components/sections/ExperienceWhoFor";

export default function SriLankaPage() {
  return (
    <>
      <ExperienceHero slug="sri-lanka" />
      <ExperienceOverview slug="sri-lanka" />
      <ExperienceActivities slug="sri-lanka" />
      <ExperienceTimeline slug="sri-lanka" />
      <ExperienceHighlights slug="sri-lanka" />
      <AbdulExperienceBlock slug="sri-lanka" />
      <ExperienceSafety slug="sri-lanka" />
      <ExperienceWhoFor slug="sri-lanka" />
    </>
  );
}
