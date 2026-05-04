// app/[locale]/experiences/page.tsx
import { ExperiencesGrid } from "@/components/sections/ExperiencesGrid";
import { ExperiencesHero } from "@/components/sections/ExperiencesHero";

export default function ExperiencesPage() {
  return (
    <>
      <ExperiencesHero />
      <ExperiencesGrid />
    </>
  );
}
