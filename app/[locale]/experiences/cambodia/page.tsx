// app/[locale]/experiences/cambodia/page.tsx
import { AbdulExperienceBlock } from "@/components/sections/AbdulExperienceBlock";
import { ExperienceActivities } from "@/components/sections/ExperienceActivities";
import { ExperienceHero } from "@/components/sections/ExperienceHero";
import { ExperienceHighlights } from "@/components/sections/ExperienceHighlights";
import { ExperienceOverview } from "@/components/sections/ExperienceOverview";
import { ExperienceSafety } from "@/components/sections/ExperienceSafety";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ExperienceWhoFor } from "@/components/sections/ExperienceWhoFor";

export default function CambodiaPage() {
  return (
    <>
      <ExperienceHero slug="cambodia" />
      <ExperienceOverview slug="cambodia" />
      <ExperienceActivities slug="cambodia" />
      <ExperienceTimeline slug="cambodia" />
      <ExperienceHighlights slug="cambodia" />
      <AbdulExperienceBlock slug="cambodia" />
      <ExperienceSafety slug="cambodia" />
      <ExperienceWhoFor slug="cambodia" />
    </>
  );
}
