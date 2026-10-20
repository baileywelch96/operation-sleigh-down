import type { ComponentType } from "react";
import Briefing from "./pages/Briefing";
import Timeline from "./pages/Timeline";
import Roles from "./pages/Roles";
import Scaling from "./pages/Scaling";
import CalTopo from "./pages/CalTopo";
import Phases from "./pages/Phases";
import Clues from "./pages/Clues";
import Trail from "./pages/Trail";
import Investigation from "./pages/Investigation";
import Casualties from "./pages/Casualties";
import Hazards from "./pages/Hazards";
import Materials from "./pages/Materials";
import Safety from "./pages/Safety";
import Setup from "./pages/Setup";
import Questions from "./pages/Questions";

// The order here is the order of the pages and the Previous / Next buttons.
export type Section = { id: string; title: string; intro?: string; Page: ComponentType };

export const sections: Section[] = [
  { id: "briefing", title: "The briefing", Page: Briefing },
  { id: "timeline", title: "Timeline", intro: "2 hr 20 min inside a 2.5 hr slot. The elf triage, the Santa search and the evidence search run at the same time.", Page: Timeline },
  { id: "roles", title: "Roles", intro: "Each trainer owns one area, so nobody is stretched across the park.", Page: Roles },
  { id: "scaling", title: "Scaling up", intro: "The plan works for 3 to 9 teams. Aim for 4–6 members per team. Here is what changes as numbers grow.", Page: Scaling },
  { id: "caltopo", title: "Using CalTopo", intro: "CalTopo is still fairly new to most of us. This is a relaxed chance to get familiar with it, using it alongside the compass wherever it helps.", Page: CalTopo },
  { id: "phases", title: "Phase by phase", Page: Phases },
  { id: "clues", title: "Clue cards", intro: "Fill in the blanks on the recce day. Print on coloured card and laminate.", Page: Clues },
  { id: "trail", title: "Santa search trail", intro: "Laid from the crash site to Santa, about 150–250 m away. Each clue points to the next.", Page: Trail },
  { id: "investigation", title: "Grinch investigation", intro: "For teams 4 and up. Police need evidence that the Grinch caused the storm. SES finds it, protects it and records it. Police collect it.", Page: Investigation },
  { id: "casualties", title: "Casualty cards", intro: "Actors keep the card in a pocket and show it when assessed. Stop acting if anyone gets hurt for real.", Page: Casualties },
  { id: "hazards", title: "Hazards", Page: Hazards },
  { id: "materials", title: "Materials list", intro: "Tick items off as they're sourced. Ticks are saved in your own browser only.", Page: Materials },
  { id: "safety", title: "Safety rules", Page: Safety },
  { id: "setup", title: "Setup checklist", Page: Setup },
  { id: "questions", title: "Open questions", intro: "To settle as a trainer team.", Page: Questions },
];
