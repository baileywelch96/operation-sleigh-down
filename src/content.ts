// All the exercise content lives here.
// Edit this file to change wording, times, cards or the materials list.
// Text wrapped in **double asterisks** shows as bold.

export const exercise = {
  name: "Operation Sleigh Down",
  subtitle: "Saving Santa",
  eyebrow: "SES training exercise · Trainer plan · Carrara Group",
  lead:
    "A storm brings Santa's sleigh down in the park, and it was no accident. Rescue teams navigate to the crash, triage the injured elves and free a missing Santa. Investigation teams search the park for evidence that the Grinch was behind it.",
  facts: ["2 hr 20 min", "3–9 teams", "Rescue + investigation", "5–7 casualty actors", "No climbing", "All skill levels"],
  footer: "Operation Sleigh Down · SES Christmas training plan · Draft for trainer review",
};

// ---------- Mayday call (intro screen) ----------
// Add a recording of Santa at public/mayday.mp3 and the intro plays it through a
// radio filter. Without it, the intro plays static while the transcript types out.
export const maydayAudioFile = "mayday.mp3";
// Santa's computer voice (used when there's no mayday.mp3).
// Every device has different voices. The intro picks the first male voice it finds from
// `preferredVoices` (partial names are fine), then any English male voice.
// These settings are fixed for everyone. There is no voice picker on the intro screen.
export const voiceDefaults = {
  enabled: true,
  pitch: 0.8, // 0.1 (deep) to 2 (high)
  rate: 1.2, // 0.5 (slow) to 1.5 (fast)
  preferredVoices: [
    "Eddy (English (United Kingdom))", // Mac and iPhone
    "Eddy",
    "Microsoft William Online (Natural) - English (Australia)", // Edge on Windows: natural-sounding
    "Microsoft Ryan Online (Natural)",
    "Microsoft Guy Online (Natural)",
    "Microsoft Davis Online (Natural)",
    "Google UK English Male", // Chrome
    "Daniel", // Mac and iPhone
    "Arthur",
    "Lee",
  ],
};

// staticAfter = seconds of static after the line. sfx = sound effect after the line.
// storm = wind, rain and hail level from this line on (0 to 1). Effects only play without mayday.mp3.
export type MaydayLine = { text: string; staticAfter?: number; sfx?: "crash"; storm?: number };
export const maydayLines: MaydayLine[] = [
  { text: "Elf HQ, Elf HQ, this is Sleigh One. Do you copy? Over." },
  { text: "Last drop of the night is done. Sack's empty and the reindeer are puffed." },
  { text: "Bringing her down for a rest stop in the park. Location is…", staticAfter: 1.2 },
  { text: "Say again, location is…", staticAfter: 1.4 },
  { text: "Hold on. Weather's turning fast. Wind's picking up. That's hail on the runners.", storm: 0.45 },
  { text: "Rudolph, keep that nose lit! I can't see the treeline!", storm: 0.7 },
  { text: "Elves, hold on to something!", staticAfter: 0.8, storm: 0.85 },
  { text: "Mayday, Mayday, Mayday. Sleigh One. We're going down!", staticAfter: 2.4, storm: 1, sfx: "crash" },
  { text: "Elf HQ… we're down. Sleigh's on its side. My head's spinning…", storm: 0.35 },
  { text: "Elves are hurt. Send help. The words for our location are…", staticAfter: 2.6 },
];

// ---------- Briefing ----------
export const scenario = {
  paragraphs: [
    "On his last run before Christmas, Santa radios Elf HQ to say he is stopping in the park for a rest. As he comes in to land, high winds and hail hit out of nowhere. The sleigh crashes and the radio cuts out mid-call.",
    "Elf HQ only has a map of the park. Santa's last message held the what3words of his rest spot, but it came through broken into three pieces. Teams must find the pieces and get to the crash.",
    "Then the weather bureau calls Elf HQ. The storm formed over the park and nowhere else. Someone made it happen. Police suspect the Grinch, who has already fled back to Mount Crumpit. They've asked SES to search the park and preserve any evidence so they can bring him to justice.",
    "It's a full storm callout in miniature: find the incident, make it safe, treat the injured, find the missing person, protect the evidence and get everyone out.",
  ],
  grinch:
    "The Grinch is long gone and never appears. Investigation teams don't chase anyone. Their job is the real SES one: find it, don't touch it, mark it, record it and hand it to police. Police collect and examine. Anything moved or handled can ruin the case.",
  aim: "Run a complete SES storm response, from the first radio call to the handover, in one connected scenario. Members practise navigation, comms, casualty care, search and rescue as one job, the way a real callout runs, instead of as separate drills.",
  glance: [
    ["What", "A scenario-based field exercise in a local park"],
    ["How long", "2 hr 20 min, inside a 2.5 hr session"],
    ["Who", "All members, trained and untrained. 3–9 mixed teams of 4–6"],
    ["Run by", "Nick, Ken and Bailey"],
    ["Storylines", "Rescue (teams 1–3) and Investigation (teams 4 and up). With 3 teams, rescue only"],
    ["Casualties", "5–7 role players with moulage and casualty cards"],
    ["Physical level", "Walking over varied terrain. Park still to be confirmed. No climbing, heights or water"],
    ["Kit", "Radios, compasses, phones with CalTopo and what3words, first aid kit and rescue props"],
  ] as [string, string][],
  stages: [
    { tag: "PHASES 1–3 · 50 MIN", name: "Find the crash", text: "Teams hear the Mayday, then navigate to three caches by compass bearing and CalTopo coordinates. Each team radios its word to Elf HQ, and HQ puts the three words together to locate the crash." },
    { tag: "PHASE 4 · 10 MIN", name: "Make it safe", text: "The first team stops at the tape. They spot the storm hazards, report them and mark them on the map before anyone goes in. This is where they find out Santa is missing." },
    { tag: "PHASES 5–6 · 30 MIN", name: "Treat and search", text: "Two teams triage and treat the injured elves, including a major bleed and an unresponsive casualty. At the same time, one team follows Santa's trail with a clue search, a line search and a sound sweep." },
    { tag: "PHASE 6B · 30 MIN · TEAMS 4+", name: "Evidence search", text: "Investigation teams line search taped-off areas for signs of the Grinch. Every find is marked, photographed, logged and cordoned for police. They find the Storm-O-Matic, still set for a second storm, and that puts the rescue on the clock." },
    { tag: "PHASES 7–9 · 50 MIN", name: "Rescue and hand over", text: "Rescue teams free Santa from under the branch with a simulated chainsaw cut before the second storm hits. Then casualties go to paramedics, the evidence log goes to police, and everyone debriefs with their CalTopo tracks." },
  ],
  groundRules: [
    "Swap roles at every phase. Try the job you don't usually do.",
    "Every untrained member is paired with a trained buddy.",
    "Treat every prop as real: the saw, the power line, the hanging branch.",
    "Evidence is never touched or moved. Mark it, record it, report it.",
    "**\"No duff\"** means a real incident. Everything stops.",
    "Stay inside the park boundary marked on the map.",
    "Report everything to Elf HQ by radio. If it isn't on the radio, HQ doesn't know.",
  ],
  bring: [
    "SES uniform and enclosed boots",
    "Helmet and gloves",
    "Torch or head torch, with spare batteries",
    "Notepad and pen",
    "A full water bottle",
    "Phone, fully charged, with CalTopo and what3words installed",
    "SES-issued power bank",
  ],
  twist:
    "When teams arrive, the elves are hurt but Santa is gone. He hit his head, got confused and wandered off. A second gust brought down a branch that pinned him.",
  goals: [
    "Navigation and land search to find the crash site",
    "Radio comms between field teams and HQ",
    "Scene safety and hazard ID after a storm",
    "Triage of multiple casualties",
    "Major bleed care: wound packing and tourniquets",
    "Missing person search: clue trail, line search, sound sweep",
    "Simulated chainsaw ops to clear a fallen branch",
    "Evidence awareness: search, preserve, record and hand over to police",
    "Tarp shelter and managing a confused casualty",
    "CalTopo: plotting, markers, tracks and search sectors",
  ],
};

// ---------- Timeline ----------
export const sessionMinutes = 140;
export type Lane = "all" | "triage" | "search" | "evidence";
export const timelineBars: { label: string; start: number; end: number; lane: Lane }[] = [
  { label: "Brief", start: 0, end: 10, lane: "all" },
  { label: "Find the Words", start: 10, end: 40, lane: "all" },
  { label: "Solve", start: 40, end: 50, lane: "all" },
  { label: "Scene", start: 50, end: 60, lane: "all" },
  { label: "Elf triage", start: 60, end: 90, lane: "triage" },
  { label: "Search for Santa", start: 60, end: 90, lane: "search" },
  { label: "Evidence search", start: 60, end: 90, lane: "evidence" },
  { label: "Free Santa", start: 90, end: 115, lane: "all" },
  { label: "Hand", start: 115, end: 125, lane: "all" },
  { label: "Debrief", start: 125, end: 140, lane: "all" },
];
export const timelineRows: [string, string, string][] = [
  ["0:00–0:10", "1. Safety brief and Mayday call", "Briefing, team split"],
  ["0:10–0:40", "2. Find the Words", "Navigation, land search, comms"],
  ["0:40–0:50", "3. Solve the location, move to scene", "Comms, teamwork"],
  ["0:50–1:00", "4. Scene safety and \"Where's Santa?\"", "Hazard ID, info gathering"],
  ["1:00–1:30", "5. Elf triage (2 teams)", "Triage, major bleeds, tarp shelter"],
  ["1:00–1:30", "6. Search for Santa (1 team)", "Clue trail, line search, sound sweep"],
  ["1:00–1:30", "6B. Evidence search (teams 4+)", "Close line search, preserving and logging evidence"],
  ["1:30–1:55", "7. Free Santa (rescue teams)", "Simulated chainsaw ops, exclusion zone, casualty care"],
  ["1:30–1:55", "7B. Hold the evidence scene (teams 4+)", "Cordon, scene log, plan to police"],
  ["1:55–2:05", "8. Handover and pack up", "Casualty and evidence handover"],
  ["2:05–2:20", "9. Debrief", "Reflection"],
];

// ---------- Roles ----------
export const trainerRoles = [
  { tag: "PHASES 1–3, 8–9", name: "Elf HQ", text: "Incident control. Runs the brief, radio base and map. Solves the what3words, tasks the search team and leads the debrief." },
  { tag: "PHASES 4–5", name: "Scene lead", text: "Sets the hazards and elf casualties. Coaches triage and major bleed care." },
  { tag: "PHASES 6–7", name: "Search and rescue lead", text: "Lays the Santa clue trail and sets up the fallen branch. Runs the simulated chainsaw phase. A chainsaw-qualified member coaches the cut plan." },
  { tag: "PHASES 6B–7B · TEAMS 4+", name: "Police (investigation)", text: "Lays the Grinch evidence and plays police. Takes calls about each find, switches off the Storm-O-Matic and receives the evidence handover. An extra leadership member if one is free; otherwise Elf HQ plays police by radio." },
];
export const teamIntro =
  "Mixed teams. Teams 1–3 each find one what3words word and run the rescue. Teams 4 and up run the investigation. Spread trained and untrained members evenly. Swap roles at every phase, and pair every untrained member with a trained buddy.";
export const teamRoles: [string, string][] = [
  ["Team leader", "makes the calls"],
  ["Safety officer", "watches for hazards"],
  ["Navigator", "compass and CalTopo"],
  ["Radio operator", "talks to HQ"],
  ["Scribe", "logs times, bearings, clues"],
  ["Searchers", "everyone else"],
];

// ---------- Scaling ----------
export const scalingRows: [string, string, string, string][] = [
  ["3", "One team per word, as written", "**Rescue only.** 2 teams triage, 1 team searches for Santa", "HQ reads the weather bureau call at the debrief as a \"to be continued\""],
  ["4–6", "Teams 1–3 find the words. Teams 4–6 find the **first Grinch clues** (below)", "Teams 1–3 on **Rescue**. Teams 4–6 on **Investigation**, one evidence area each", "Police role (investigation lead), or Elf HQ plays police by radio"],
  ["7–9", "As above. Teams 7–9 also find Grinch clue caches", "Teams 1–3 plus team 7 on Rescue (add Elf Holly and Elf Nutmeg). Teams 4–6, 8 and 9 on Investigation", "As above. A second police helper, if available, takes the outer areas"],
];
// What teams 4 and up find in their caches in phase 2. Each one points to an evidence area.
export const grinchCaches: [string, string][] = [
  ["Team 4 · Holly", "A tuft of green fur and a card: \"WEATHER BUREAU: storm cell formed over this park only. Not natural.\""],
  ["Team 5 · Tinsel Town", "A crumpled note in messy handwriting: \"Not so jolly now, are we?\""],
  ["Team 6 · Snowflake", "One giant boot print, pointing towards the north fence line"],
];
export const evidenceAreasText =
  "Split the park into evidence areas, one per investigation team: the edge of the crash site, the fence line and the trees where the Grinch hid. Tape each one off. With 7–9 teams, add the car park edge and the path to it. Areas can come up \"nil find\", and reporting that to HQ is a real search skill.";
export const teamForming = [
  "Trainers set the teams before the day",
  "Every team has a team leader, a safety officer and a radio operator. Nobody needs experience in these roles, so give them to people who want the practice",
  "Rotate the roles between phases so more people get a turn",
  "The team leader wears a printed team card so everyone can see who's in charge",
  "2-min comms brief: one channel, team call signs, HQ call sign \"Elf HQ\"",
];

// ---------- CalTopo ----------
export const caltopoRows: [string, string][] = [
  ["Before the day", "Trainers build an **Operation Sleigh Down** map with the park boundary, start point and Elf HQ. Keep cache and Santa locations off the shared map."],
  ["1. Brief", "Share the map link (or a QR code) with every team. Show everyone how to start recording a track."],
  ["2. Find the Words", "Step 1 of the route card is a compass bearing. Step 2 is coordinates to have a go at plotting in CalTopo. Teams try dropping a marker on the shared map when they find their cache."],
  ["3. Solve the location", "HQ broadcasts the three words. Every team enters them in its own what3words app, then plots the spot in CalTopo and plans a route."],
  ["4. Scene safety", "First team tries marking each hazard on the shared map so HQ and later teams can see it."],
  ["6. Search for Santa", "The search team records its track to show coverage and marks each clue where it's found."],
  ["6B. Evidence search", "HQ draws each evidence area on the map. Teams drop a numbered marker (E1, E2…) on every find, so police can see exactly where it was."],
  ["7. Free Santa", "Search team reports Santa's position as coordinates. HQ marks the casualty and the access route."],
  ["9. Debrief", "Show every team's recorded track on a tablet or laptop. Compare routes and search coverage, and talk about what was easy or confusing in the app."],
];
export const caltopoTips = [
  "Expect a mix. Some members use CalTopo often, others will be opening it for the first time.",
  "Everyone uses CalTopo on their own phone. Put someone comfortable with it in each team so they can help the others along.",
  "Trainers help anyone who gets stuck. Asking is part of the practice.",
  "Every team also carries a compass and HQ has the park map, so a flat phone or lost signal doesn't stop anyone.",
  "Arrive with a fully charged phone and your SES-issued power bank.",
];

// ---------- Phases ----------
export type Phase = { num: number | string; title: string; meta: string; steps: string[]; watch?: string; alert?: boolean };
export const phases: Phase[] = [
  { num: 1, title: "Safety brief and Mayday call", meta: "10 MIN · ELF HQ", steps: [
    "Safety brief first: boundaries, hydration, heat, and the stop word \"No duff\".",
    "Elf HQ plays the Mayday call.",
    "Each team gets its word card, a compass and a radio.",
    "Share the CalTopo map link. Teams start recording their track.",
  ] },
  { num: 2, title: "Find the Words", meta: "30 MIN · ALL TEAMS", steps: [
    "Each team follows its route card: a compass bearing first, then coordinates to plot in CalTopo.",
    "Inside each cache is one word plus its number (1, 2 or 3).",
    "Teams 4 and up find Grinch clue caches instead: green fur, a mocking note, a giant boot print.",
    "Teams radio HQ with what they found, drop a marker on the shared map and wait.",
  ], watch: "Radio procedure and phonetic alphabet. If a team is lost at 30 min, HQ \"receives a partial message\" with their word." },
  { num: 3, title: "Solve the location", meta: "10 MIN · ELF HQ", steps: [
    "The weather bureau calls Elf HQ: the storm formed over the park only. With the Grinch clues, police suspect sabotage.",
    "HQ splits the operation. Teams 1–3 go to the crash on **Rescue**. Teams 4 and up are tasked to **Investigation**.",
    "HQ puts the three words in order and broadcasts them.",
    "Each team enters the words in its own what3words app, plots the spot in CalTopo and navigates to the crash.",
  ] },
  { num: 4, title: "Scene safety and \"Where's Santa?\"", meta: "10 MIN · SCENE LEAD", steps: [
    "First team stops at the tape. Nobody enters until hazards are called to HQ and marked in CalTopo.",
    "The sleigh is empty. Elf Sparkle says Santa hit his head and wandered off \"that way\".",
  ], watch: "Anyone walking straight in. Do teams question the elves about Santa?" },
  { num: 5, title: "Elf triage", meta: "30 MIN · 2 TEAMS", steps: [
    "One team treats the major bleed.",
    "The other frees the trapped elf, builds the tarp shelter and manages the walking wounded.",
  ], watch: "Pressure applied fast, wound packed firmly, tourniquet time written down." },
  { num: 6, title: "Search for Santa", meta: "30 MIN · 1 TEAM · SAME TIME AS 5", steps: [
    "Start where Sparkle pointed and follow the clue trail.",
    "Do a line search across the open area, then a sound sweep: call \"Santa!\", stay silent, listen.",
    "Mark each clue in CalTopo. Radio HQ with Santa's coordinates and ask for more hands.",
  ], watch: "Clues logged by the scribe and regular sit-reps to HQ." },
  { num: "6B", title: "Evidence search", meta: "30 MIN · TEAMS 4+ · SAME TIME AS 5 AND 6", steps: [
    "Each team takes one taped-off evidence area and does a close, slow line search.",
    "On every find: stop and call it. Don't touch it. Mark it with a numbered flag (E1, E2…).",
    "Photograph it in place, drop a CalTopo marker, and log it: number, time, finder, what it is, where.",
    "Radio Elf HQ (police) with each find. Keep everyone else out of the area.",
    "One team finds the **Storm-O-Matic**, still running, and a torn page of the plan: \"Second storm at 1:30. Finish the job.\"",
    "They don't touch the machine. They cordon it and report it. Police switch it off. HQ warns the rescue teams.",
  ], watch: "Hands in pockets. Nobody picks anything up, even to \"have a look\". One way in and out of each area. Every find logged before the next one.", alert: true },
  { num: 7, title: "Free Santa", meta: "25 MIN · RESCUE TEAMS · SAR LEAD", steps: [
    "HQ passes on the warning: a second storm is due at 1:30. Santa has to be out before it hits.",
    "Check the branch is stable and look for more hanging branches.",
    "One member keeps Santa calm and still. Others set the exclusion zone, post a spotter and radio HQ.",
    "The chainsaw team puts on PPE and talks through the cut plan out loud, as if it were real.",
    "They \"cut\" the cardboard log with the cardboard saw. Each pre-scored section pulls apart at its cut line.",
    "Others carry the pieces clear once the saw is \"off\".",
    "Once Santa is free: check injuries, splint the leg, stretcher carry to the sleigh.",
  ], watch: "The prop treated like a real saw. Nobody enters the zone while it \"runs\". Non-chainsaw members still have a job: spotter, zone control, comms, casualty care.", alert: true },
  { num: "7B", title: "Hold the evidence scene", meta: "25 MIN · TEAMS 4+ · POLICE", steps: [
    "Finish any area not yet searched, and report \"nil find\" for empty ones.",
    "Keep the cordons. Log anyone who goes in or out of an area.",
    "Check the evidence log against the CalTopo markers. Every E number on the map has a line in the log.",
    "Prepare a short handover for police: what was found, where, when and by whom.",
  ], watch: "A scene log that police could actually use. Numbers, times and names, not \"some fur near a tree\"." },
  { num: 8, title: "Handover and pack up", meta: "10 MIN · ALL", steps: [
    "Rescue teams hand over to \"paramedics\": who, what injury, what treatment, what time.",
    "Investigation teams hand the evidence log and photos to \"police\". Police announce there's enough to charge the Grinch.",
    "Pack up kit and props.",
  ] },
  { num: 9, title: "Debrief", meta: "15 MIN · ELF HQ", steps: [
    "What went well?",
    "What would you do differently?",
    "What did you learn from a role you don't usually do?",
    "Show every team's CalTopo track and the evidence markers. Compare routes and search coverage.",
    "Rescue and investigation each say how the other line affected their job.",
  ] },
];

// ---------- Investigation (teams 4+) ----------
export const evidence: { id: string; item: string; where: string; tells: string }[] = [
  { id: "E1", item: "Tuft of green fur", where: "Snagged on the fence line", tells: "The Grinch came over the fence" },
  { id: "E2", item: "Giant boot prints", where: "Soft ground near the fence, leading into the trees", tells: "His route in and out" },
  { id: "E3", item: "Small dog paw prints", where: "Beside the boot prints", tells: "Max the dog was with him" },
  { id: "E4", item: "Torn page of the plan", where: "Caught in a bush near the trees", tells: "\"Step 2: second storm at 1:30. Finish the job.\"" },
  { id: "E5", item: "The Storm-O-Matic", where: "Hidden in the trees, lights still flashing", tells: "The weather machine itself, still set for a second storm" },
  { id: "E6", item: "Dropped ornament hook", where: "Near the crash site edge", tells: "He came close to watch the crash" },
];
export const evidenceSteps: [string, string][] = [
  ["Stop", "Call out the find. Everyone in the line stops where they are."],
  ["Don't touch", "Hands in pockets. Don't pick it up, move it or step around it more than you need to."],
  ["Mark", "Place a numbered flag next to it (E1, E2…). Never on top of it."],
  ["Photograph", "A wide shot showing where it is, then a close-up with the flag in frame."],
  ["Map", "Drop a CalTopo marker with the same number."],
  ["Log", "Number, time, finder, what it is and exactly where."],
  ["Protect", "Tape it off if needed. Keep one path in and out."],
  ["Report", "Radio Elf HQ (police). Police collect it, never SES."],
];
export const evidenceLogColumns = ["No.", "Time", "Found by", "What it is", "Where (CalTopo / landmark)", "Photo taken"];
export const stormOMatic =
  "The investigation team finds the Storm-O-Matic in the trees, lights still flashing, with a torn page beside it: \"Second storm at 1:30.\" It's evidence and a hazard, so they **don't touch it**. They cordon it, report it, and police switch it off. HQ radios the rescue teams that the clock is running. If no team finds it by 1:20, police \"get a tip-off\" and send the nearest team to that area.";

// ---------- Clue cards ----------

export const teamCards = [
  { team: "Red Team · Rudolph", colour: "var(--tri-red)", riddle: "Santa's first word was dropped near where he'd feed his reindeer.", find: "a red stocking" },
  { team: "Green Team · Elves", colour: "var(--pine)", riddle: "The second word was caught in the wind near something tall and green.", find: "a green present box" },
  { team: "Gold Team · Sleigh Bells", colour: "var(--tri-yel)", riddle: "The third word fell from the sleigh near where people stop to sit.", find: "a gold bell bag" },
];
export const routeIntro =
  "Each team gets one route card. The compass step takes them partway across the park, the CalTopo coordinates bring them to the right area, and the clue helps them spot the hidden cache.";
export const cacheNote =
  "Inside each cache is a card: **WORD [1/2/3]: ________** \"Radio this to Elf HQ. Do not move until told.\" Fill in the bearing, distance and coordinates on the recce day. For a team new to navigation, swap step 2 for a second compass bearing.";

// ---------- Search trail ----------
export const trail: { item: string; where: string; skill?: string }[] = [
  { item: "Santa's hat", where: "Edge of the crash site, where Sparkle pointed. Confirms his direction." },
  { item: "Broken sleigh bell", where: "On the path, 30–50 m on. He stayed on the path." },
  { item: "Torn red cloth on a bush", where: "Where the path splits. He went off the path." },
  { item: "Santa's spectacles", where: "Hidden in an open grassy area.", skill: "LINE SEARCH" },
  { item: "Large candy canes", where: "A line of them leading into the trees. He's close." },
  { item: "Santa answers", where: "Pinned under the branch. Found after the call-and-listen.", skill: "SOUND SWEEP" },
];
export const trailBackup =
  "If the team gets stuck, Elf HQ \"gets a report\" from a member of the public who saw a man in red heading that way.";

// ---------- Casualties ----------
export type Triage = "red" | "yel" | "grn";
export const casualties: { name: string; triage: Triage; label: string; where: string; injury: string; acts: string; needs: string }[] = [
  { name: "Santa", triage: "red", label: "RED · IMMEDIATE", where: "Pinned under a fallen branch, 150–250 m from the sleigh", injury: "Head knock, leg pinned, hail cuts", acts: "Confused, repeats himself, tries to get up to find the reindeer", needs: "Kept still and calm, exclusion zone, branch cut and cleared, leg splinted, stretcher carry" },
  { name: "Elf Jingle", triage: "red", label: "RED · IMMEDIATE", where: "Next to the sleigh", injury: "Major bleed, deep cut to thigh (moulage or bleed trainer)", acts: "Pale and panicky, then quiet and drowsy", needs: "Direct pressure, wound packing, tourniquet if needed, time noted" },
  { name: "Elf Pudding", triage: "red", label: "RED · IMMEDIATE", where: "Lying still, away from the sleigh", injury: "Unresponsive, breathing", acts: "Eyes closed, no response, breathing normally", needs: "Airway and breathing check, recovery position, monitoring" },
  { name: "Elf Tinsel", triage: "yel", label: "YELLOW · URGENT", where: "Under sleigh debris", injury: "Leg trapped, sore ribs", acts: "Calm but in pain, asks to be freed", needs: "Debris checked stable, team lift, injury check" },
  { name: "Elf Sparkle", triage: "grn", label: "GREEN · WALKING", where: "Wandering the scene", injury: "Minor cuts, very distressed", acts: "Crying, walks towards hazards. Knows where Santa went", needs: "Stopped, moved to the shelter, reassured, asked about Santa" },
  { name: "Elf Holly", triage: "yel", label: "YELLOW · 4+ TEAMS", where: "Sitting against a tree near the sleigh", injury: "Suspected broken arm", acts: "Holding the arm, in pain, won't let anyone touch it at first", needs: "Reassurance, sling or splint, pain and circulation check" },
  { name: "Elf Nutmeg", triage: "grn", label: "GREEN · 4+ TEAMS", where: "Hiding under the tarp or a bush", injury: "Heat exhaustion from the elf suit", acts: "Dizzy, sweaty, sick in the stomach. Easy to miss", needs: "Found by teams that check the manifest, moved to shade, cooled, sips of water" },
];
export const casualtyNote = "The saw and log are cardboard props. The log rests on Santa's leg but carries no weight.";

// ---------- Hazards ----------
export const hazards: [string, string, string, string][] = [
  ["Downed power line", "Crash site", "Rope or orange cable with a \"LIVE WIRE\" sign", "Cordon off, stay 8 m away, report to HQ"],
  ["Sleigh debris", "Crash site", "Boxes, wrapping paper, cardboard sleigh", "Check it's stable before reaching casualties"],
  ["Hail, slippery ground", "Crash site", "White paper balls scattered", "Warn the team, watch footing"],
  ["Second hanging branch", "Above Santa", "Pool noodle or flagged rope in the tree", "Spot it, mark it, keep people clear"],
  ["Unstable fallen branch", "On Santa", "The cardboard log itself", "Check it's stable, never reach under it"],
  ["Storm-O-Matic, still running", "Evidence area in the trees", "Decorated box with flashing fairy lights", "Don't touch. Cordon, report, let police switch it off"],
];

// ---------- Materials ----------
// [item, quantity, notes]
export const materials: { group: string; items: [string, string, string][] }[] = [
  { group: "Navigation and comms", items: [
    ["Compasses", "1 per team + 1", "One per team, plus a spare"],
    ["Park map, large and laminated", "1", "Elf HQ only"],
    ["Radios", "1 per team + 1", "Plus Elf HQ. Charged, spare batteries"],
    ["Phones with CalTopo and what3words", "Members bring", "Fully charged, plus their SES-issued power bank"],
    ["Tablet or laptop", "1", "Elf HQ runs the shared CalTopo map and shows tracks at the debrief"],
    ["QR code for the CalTopo map", "1 printed", "Quick map sharing at the brief"],
    ["Whiteboard and markers", "1", "Elf HQ log"],
    ["Standard issue notepads", "Members bring", "Scribes log times, bearings and clues"],
  ] },
  { group: "Clues and search trail", items: [
    ["Mayday card", "1", "Read by Elf HQ"],
    ["Team word cards, laminated", "3", "Red, green, gold"],
    ["Cache word cards, laminated", "3", "WORD 1, 2, 3"],
    ["Grinch clue cache cards and items", "3", "Weather bureau card + fur, mocking note, boot print. 4+ teams only"],
    ["Red stocking", "1", "Cache 1"],
    ["Green present box", "1", "Cache 2"],
    ["Gold bell bag", "1", "Cache 3"],
    ["Santa hat", "1", "Trail clue 1 (spare to the suit)"],
    ["Sleigh bell", "1", "Trail clue 2"],
    ["Strip of red cloth", "1", "Trail clue 3"],
    ["Spectacles", "1 pair", "Trail clue 4, line search"],
    ["Large candy cane decorations", "3–4", "Trail clue 5 (Bailey bringing)"],
    ["Flagging tape", "1 roll", "Mark caches and trail for setup and pack-up"],
  ] },
  { group: "Crash scene and hazards", items: [
    ["Cardboard sleigh or sleigh props", "1", "Centre of the crash site"],
    ["Boxes and wrapping paper", "8–10", "Debris and scattered presents"],
    ["Rope or orange cable + LIVE WIRE sign", "1", "Downed power line"],
    ["White paper balls", "1 bag", "Hail on the ground"],
    ["Pool noodle or flagged rope", "1", "Hanging branch above Santa"],
    ["Barrier tape", "2 rolls", "Scene cordon and exclusion zone"],
    ["Traffic cones", "8", "Cordon and exclusion zone corners"],
  ] },
  { group: "Casualty care", items: [
    ["Casualty cards, laminated", "5–7", "Santa + 4 elves, plus Holly and Nutmeg for 4+ teams"],
    ["Triage cards or tags", "1 set per team", "Red, yellow, green"],
    ["Bleed trainers or moulage kit", "2", "Elf Jingle's thigh wound"],
    ["Wound packing gauze", "6 rolls", "Training stock"],
    ["Training tourniquets", "3", "Not operational stock"],
    ["Bandages", "6", "Mixed sizes"],
    ["Splint", "1", "Santa's leg"],
    ["Blankets", "2", "Santa and Elf Pudding"],
    ["Stretcher", "1", "Santa carry-out"],
    ["Gloves", "1 box", "For all members"],
  ] },
  { group: "Shelter", items: [
    ["Tarp (about 3 × 4 m)", "1", "Casualty shelter"],
    ["Poles", "2", "Or tie off to trees"],
    ["Rope", "2 lengths", "Ridge line and guys"],
    ["Pegs", "8", "Ground anchors"],
  ] },
  { group: "Chainsaw and log props", items: [
    ["Cardboard log", "1", "Large tubes from a carpet or fabric shop, wrapped in brown tape"],
    ["Velcro or masking tape", "1 roll", "Joins the log's 3–4 pre-scored sections so they pull apart"],
    ["Cardboard chainsaw", "1", "Box body, cardboard bar, painted orange"],
    ["Chainsaw PPE", "1 set", "Helmet with visor and muffs, gloves, chaps, to practise kitting up"],
  ] },
  { group: "Costumes and actors", items: [
    ["Santa suit", "1", "Santa actor"],
    ["Elf hats", "4–6+", "Elf actors (spares for members)"],
    ["Moulage makeup", "1 kit", "Cuts and bruises"],
  ] },
  { group: "Grinch evidence (teams 4+)", items: [
    ["Green faux fur", "1 small piece + spare", "E1 on the fence, plus a tuft for a clue cache"],
    ["Giant boot print stencil", "1", "Cardboard cut-out, press into soft ground or dust with flour (E2)"],
    ["Paw print stencil", "1", "Small dog prints beside the boots (E3)"],
    ["Torn plan page", "1", "\"Step 2: second storm at 1:30. Finish the job.\" (E4)"],
    ["Storm-O-Matic", "1", "Box painted green with dials, an aerial and battery fairy lights (E5)"],
    ["Ornament hook", "1", "Dropped near the crash site (E6)"],
    ["Numbered evidence flags", "20", "E1 to E20, small flags or cones"],
    ["Evidence log sheets", "1 per investigation team + spares", "Columns: no., time, found by, what, where, photo"],
    ["Barrier tape", "2 rolls", "Evidence area cordons, on top of the scene tape"],
  ] },
  { group: "Team ID", items: [
    ["Printed team cards", "1 per team", "Worn by each team leader for quick ID"],
    ["Name tags and markers", "1 pack", "Many faces from other units"],
  ] },
  { group: "Welfare", items: [
    ["Real first aid kit", "1", "Held by a trainer at all times"],
    ["Water and esky", "1", "Cups or members bring bottles"],
    ["Sunscreen and insect repellent", "1 each", ""],
    ["Gazebo", "1", "Elf HQ shade"],
  ] },
];

// ---------- Safety ----------
export const safetyRules = [
  "No real chainsaw. The saw and the log are cardboard props.",
  "Treat the prop as real: PPE on, exclusion zone set, cut plan agreed.",
  "Keep the cardboard log light. It rests on Santa's leg but carries no weight.",
  "Bleed trainers or moulage only. No real cuts or sharp objects.",
  "Stop word: **\"No duff\"**. It means a real incident, and everything pauses.",
  "Caches, trail and evidence areas clear of roads, water and steep ground.",
  "Evidence props have no sharp edges, glass or real electrics. Fairy lights are battery only.",
  "Monitor weather conditions throughout.",
  "One trainer holds a real first aid kit at all times.",
];

// ---------- Setup ----------
export const setupRecce = [
  "Walk the park. Pick the start point, crash site and 3 cache spots",
  "Pick Santa's spot, 150–250 m from the crash, in or near trees",
  "Plan the clue trail, including an open grassy area",
  "Pick 3–5 evidence areas and the Storm-O-Matic's hiding spot",
  "Take bearings and distances, fill in the word cards",
  "Get the what3words for the crash site",
  "Build the CalTopo map and get the coordinates for each route card",
  "Check phone signal across the park",
  "Check council permission to use the park",
];
export const setupDay = [
  "Hide the 3 caches",
  "Set up the crash site: sleigh, hazards, barrier tape",
  "Lay the Santa clue trail",
  "Tape off the evidence areas and place the Grinch evidence",
  "Switch on the Storm-O-Matic lights",
  "Set up the cardboard log and chainsaw prop at Santa's spot",
  "Brief casualty actors and apply moulage",
  "Set up Elf HQ: map, radios, whiteboard",
  "Radio check on all handsets",
];

// ---------- Open questions ----------
export const questions = [
  "Which park, and what date and time?",
  "How many members and teams? Are members from other units joining? Which leadership members can help on the day?",
  "Who plays Elf HQ, Scene lead and Search and rescue lead?",
  "Who is a chainsaw-qualified member who can coach the cut plan?",
  "Who plays police for the investigation teams, or does Elf HQ cover it by radio?",
  "Who makes the Storm-O-Matic?",
  "Who are our 5–7 casualty actors? (A second crash needs another set.)",
  "Do we own bleed trainers and training tourniquets, or borrow them? Who makes the cardboard saw and log?",
  "Can visiting units' members join our shared CalTopo map?",
];
