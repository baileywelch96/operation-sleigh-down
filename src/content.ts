// All the exercise content lives here.
// Edit this file to change wording, times, cards or the materials list.
// Text wrapped in **double asterisks** shows as bold.

export const exercise = {
  name: "Operation Sleigh Down",
  subtitle: "Saving Santa",
  eyebrow: "SES training exercise · Trainer plan · Carrara Group",
  lead:
    "A storm brings Santa's sleigh down in the park. Teams navigate to the crash, triage the injured elves, then search for a missing Santa and free him from under a fallen branch.",
  facts: ["2 hr 20 min", "3–9 teams", "3 trainers", "5–7 casualty actors", "No climbing", "All skill levels"],
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
    "Tarp shelter and managing a confused casualty",
    "CalTopo: plotting, markers, tracks and search sectors",
  ],
};

// ---------- Timeline ----------
export const sessionMinutes = 140;
export type Lane = "all" | "triage" | "search" | "buffer";
export const timelineBars: { label: string; start: number; end: number; lane: Lane }[] = [
  { label: "Brief", start: 0, end: 10, lane: "all" },
  { label: "Find the Words", start: 10, end: 40, lane: "all" },
  { label: "Solve", start: 40, end: 50, lane: "all" },
  { label: "Scene", start: 50, end: 60, lane: "all" },
  { label: "Elf triage", start: 60, end: 90, lane: "triage" },
  { label: "Search for Santa", start: 60, end: 90, lane: "search" },
  { label: "Free Santa", start: 90, end: 115, lane: "all" },
  { label: "Hand", start: 115, end: 125, lane: "all" },
  { label: "Debrief", start: 125, end: 135, lane: "all" },
  { label: "", start: 135, end: 140, lane: "buffer" },
];
export const timelineRows: [string, string, string][] = [
  ["0:00–0:10", "1. Safety brief and Mayday call", "Briefing, team split"],
  ["0:10–0:40", "2. Find the Words", "Navigation, land search, comms"],
  ["0:40–0:50", "3. Solve the location, move to scene", "Comms, teamwork"],
  ["0:50–1:00", "4. Scene safety and \"Where's Santa?\"", "Hazard ID, info gathering"],
  ["1:00–1:30", "5. Elf triage (2 teams)", "Triage, major bleeds, tarp shelter"],
  ["1:00–1:30", "6. Search for Santa (1 team)", "Clue trail, line search, sound sweep"],
  ["1:30–1:55", "7. Free Santa (all teams)", "Simulated chainsaw ops, exclusion zone, casualty care"],
  ["1:55–2:05", "8. Handover and pack up", "Handover"],
  ["2:05–2:15", "9. Debrief", "Reflection"],
  ["2:15–2:20", "Buffer", "Catch-up if behind"],
];

// ---------- Roles ----------
export const trainerRoles = [
  { tag: "PHASES 1–3, 8–9", name: "Elf HQ", text: "Incident control. Runs the brief, radio base and map. Solves the what3words, tasks the search team and leads the debrief." },
  { tag: "PHASES 4–5", name: "Scene lead", text: "Sets the hazards and elf casualties. Coaches triage and major bleed care." },
  { tag: "PHASES 6–7", name: "Search and rescue lead", text: "Lays the Santa clue trail and sets up the fallen branch. Runs the simulated chainsaw phase. A chainsaw-qualified member coaches the cut plan." },
];
export const teamIntro =
  "Mixed teams, one per what3words word. Spread trained and untrained members evenly. Swap roles at every phase, and pair every untrained member with a trained buddy.";
export const teamRoles: [string, string][] = [
  ["Team leader", "makes the calls"],
  ["Navigator", "compass and CalTopo"],
  ["Radio operator", "talks to HQ"],
  ["Scribe", "logs times, bearings, clues"],
  ["Searchers", "everyone else"],
];

// ---------- Scaling ----------
export const scalingRows: [string, string, string, string][] = [
  ["3", "One team per word, as written", "2 teams triage, 1 team searches", "None"],
  ["4–6", "Teams 1–3 find the words. Teams 4–6 find **intel caches** HQ also needs", "Add Elf Holly and Elf Nutmeg. 2 search teams split into sectors A and B", "None. Extra leadership, if available, can watch the caches and trail"],
  ["7–9", "Run two crashes: **Sleigh One** (Santa) and **Sleigh Two** (Mrs Claus). Each has its own 3 words", "Two scenes side by side, each set up as written", "None. Scene lead and SAR lead run both scenes. Extra leadership, if available, can take a scene each"],
];
export const intelCaches: [string, string][] = [
  ["Team 4 · Holly", "\"HAZARD: power line down on the north side of the crash. Approach from the south.\""],
  ["Team 5 · Tinsel Town", "\"MANIFEST: Santa and 6 elves were on board.\" (Teams must account for everyone.)"],
  ["Team 6 · Snowflake", "\"ACCESS: vehicle access and the ambulance meeting point are at ________.\""],
];
export const sectorsText =
  "Sector A holds Santa's real trail. Sector B holds a decoy: a dropped reindeer harness and some hoof prints that lead nowhere. Clearing a sector and reporting \"nil find\" to HQ is a real search skill, so Sector B is still worth doing.";
export const otherUnits = [
  "Sign-in sheet on arrival: name, unit, and quals (first aid, land search, comms, chainsaw)",
  "Mix units in every team. Don't keep a unit together",
  "Spread quals evenly so every team has a navigator and a first aider",
  "Coloured bibs or tape on each team for quick ID",
  "2-min comms brief: one channel, team call signs, HQ call sign \"Elf HQ\"",
];

// ---------- CalTopo ----------
export const caltopoRows: [string, string][] = [
  ["Before the day", "Trainers build an **Operation Sleigh Down** map with the park boundary, start point and Elf HQ. Keep cache and Santa locations off the shared map."],
  ["1. Brief", "Share the map link (or a QR code) with every team. Each team starts recording its track."],
  ["2. Find the Words", "Leg 1 by compass bearing. Leg 2 as coordinates to plot in CalTopo. Teams drop a marker on the shared map when they find their cache."],
  ["3. Solve the location", "HQ broadcasts the three words. Every team enters them in its own what3words app, then plots the spot in CalTopo and plans a route."],
  ["4. Scene safety", "First team marks each hazard on the shared map so HQ and later teams can see it."],
  ["6. Search for Santa", "HQ draws search sectors A and B on the map. The search team records its track to show coverage and marks each clue where it's found."],
  ["7. Free Santa", "Search team reports Santa's position as coordinates. HQ marks the casualty and the access route."],
  ["9. Debrief", "Show every team's recorded track on a tablet or laptop. Compare routes and search coverage."],
];
export const caltopoFallback = [
  "Every team still carries a compass. If a phone dies or loses signal, they navigate by compass and HQ guides them by radio from the park map.",
  "Pair members new to CalTopo with someone who uses it often.",
  "Ask everyone to arrive with a fully charged phone and their SES-issued power bank.",
];

// ---------- Phases ----------
export type Phase = { num: number; title: string; meta: string; steps: string[]; watch?: string; alert?: boolean };
export const phases: Phase[] = [
  { num: 1, title: "Safety brief and Mayday call", meta: "10 MIN · ELF HQ", steps: [
    "Safety brief first: boundaries, hydration, heat, and the stop word \"No duff\".",
    "Elf HQ plays the Mayday call.",
    "Each team gets its word card, a compass and a radio.",
    "Share the CalTopo map link. Teams start recording their track.",
  ] },
  { num: 2, title: "Find the Words", meta: "30 MIN · ALL TEAMS", steps: [
    "Leg 1 by compass bearing. Leg 2 by coordinates plotted in CalTopo.",
    "Inside each cache is one word plus its number (1, 2 or 3).",
    "Teams radio HQ with the word, drop a marker on the shared map and wait.",
  ], watch: "Radio procedure and phonetic alphabet. If a team is lost at 30 min, HQ \"receives a partial message\" with their word." },
  { num: 3, title: "Solve the location", meta: "10 MIN · ELF HQ", steps: [
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
  { num: 7, title: "Free Santa", meta: "25 MIN · ALL TEAMS · SAR LEAD", steps: [
    "Check the branch is stable and look for more hanging branches.",
    "One member keeps Santa calm and still. Others set the exclusion zone, post a spotter and radio HQ.",
    "The chainsaw team puts on PPE and talks through the cut plan out loud, as if it were real.",
    "They \"cut\" the cardboard log with the cardboard saw. Each pre-scored section pulls apart at its cut line.",
    "Others carry the pieces clear once the saw is \"off\".",
    "Once Santa is free: check injuries, splint the leg, stretcher carry to the sleigh.",
  ], watch: "The prop treated like a real saw. Nobody enters the zone while it \"runs\". Non-chainsaw members still have a job: spotter, zone control, comms, casualty care.", alert: true },
  { num: 8, title: "Handover and pack up", meta: "10 MIN · ALL", steps: [
    "Each team hands over to \"paramedics\": who, what injury, what treatment, what time.",
    "Pack up kit and props.",
  ] },
  { num: 9, title: "Debrief", meta: "10 MIN · ELF HQ", steps: [
    "What went well?",
    "What would you do differently?",
    "What did you learn from a role you don't usually do?",
    "Show every team's CalTopo track. Compare routes and search coverage.",
  ] },
];

// ---------- Clue cards ----------
export const teamCards = [
  { team: "Red Team · Rudolph", colour: "var(--tri-red)", riddle: "Santa's first word was dropped near where he'd feed his reindeer.", find: "a red stocking" },
  { team: "Green Team · Elves", colour: "var(--pine)", riddle: "The second word was caught in the wind near something tall and green.", find: "a green present box" },
  { team: "Gold Team · Sleigh Bells", colour: "var(--tri-yel)", riddle: "The third word fell from the sleigh near where people stop to sit.", find: "a gold bell bag" },
];
export const cacheNote =
  "Each cache holds a card: **WORD [1/2/3]: ________** \"Radio this to Elf HQ. Do not move until told.\" For a beginner team, give a bearing for Leg 2 instead of coordinates.";

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
    ["Cache word cards, laminated", "3 per crash", "WORD 1, 2, 3"],
    ["Intel cache cards", "3", "Hazard, manifest, access. 4+ teams only"],
    ["Decoy items for Sector B", "2–3", "Reindeer harness, hoof prints. 4+ teams only"],
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
  { group: "Sign-in and team ID", items: [
    ["Sign-in sheet", "1", "Name, unit and quals for team mixing"],
    ["Coloured bibs or tape", "1 colour per team", "Quick team ID across units"],
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
  "Caches and trail clear of roads, water and steep ground.",
  "Monitor weather conditions throughout.",
  "One trainer holds a real first aid kit at all times.",
];

// ---------- Setup ----------
export const setupRecce = [
  "Walk the park. Pick the start point, crash site and 3 cache spots",
  "Pick Santa's spot, 150–250 m from the crash, in or near trees",
  "Plan the clue trail, including an open grassy area",
  "Take bearings and distances, fill in the word cards",
  "Get the what3words for the crash site",
  "Build the CalTopo map and get coordinates for each Leg 2",
  "Check phone signal across the park",
  "Check council permission to use the park",
];
export const setupDay = [
  "Hide the 3 caches",
  "Set up the crash site: sleigh, hazards, barrier tape",
  "Lay the Santa clue trail",
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
  "Who are our 5–7 casualty actors? (A second crash needs another set.)",
  "Do we own bleed trainers and training tourniquets, or borrow them? Who makes the cardboard saw and log?",
  "Can visiting units' members join our shared CalTopo map?",
];
