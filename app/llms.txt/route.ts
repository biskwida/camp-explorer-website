import { BASE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// llms.txt — a curated site summary for AI crawlers and answer engines.
// Spec: https://llmstxt.org. Keep every claim consistent with page content.
export function GET(): Response {
  const body = `# Camp Explorer

> Saudi-based adventure travel organisation offering real-world adventure, conservation, and learning experiences for youth, families, and schools. Led by Abdul Explorer, the first Saudi to ski to the North Pole. Website available in English and Arabic.

## Programs

- [Our Experiences](${BASE_URL}/en/experiences): Immersive international and local expeditions for young explorers aged 14–18.
- [Turtle Conservation & Coastal Expedition — Sri Lanka](${BASE_URL}/en/experiences/sri-lanka): 10-day international expedition combining wildlife conservation, community teaching, and coastal adventure.
- [Weekend Camp — Saudi Arabia](${BASE_URL}/en/experiences/weekend-camp): Local weekend adventure camps in Saudi Arabia.

## For Schools

- [School Programs](${BASE_URL}/en/schools): Curriculum-aligned local and international programs for student groups, from primary through secondary, built around each school's learning objectives.

## About

- [About Camp Explorer](${BASE_URL}/en/about): Learning beyond the classroom, led by Abdul Explorer — the first Saudi to ski to the North Pole.
- [Register Your Interest](${BASE_URL}/en/register): Registration form for families and school groups.

## Contact

- Email: info@campexplorersa.com
- WhatsApp: +966 54 414 2610
- Instagram: https://www.instagram.com/campexplorer.sa/

## Languages

- English: ${BASE_URL}/en
- Arabic: ${BASE_URL}/ar
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
