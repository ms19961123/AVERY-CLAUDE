import {
  Child,
  Activity,
  Conflict,
  FreeTimeBlock,
  Suggestion,
  Family,
  FamilySettings,
  DayLoad,
  WeeklyPlanDay,
} from "@/types";

export const family: Family = {
  id: "fam1",
  name: "The Johnsons",
  members: [
    { id: "parent1", name: "Sarah", role: "parent" },
    { id: "parent2", name: "David", role: "parent" },
    { id: "child1", name: "Emma", role: "child" },
    { id: "child2", name: "Liam", role: "child" },
    { id: "child3", name: "Mia", role: "child" },
  ],
};

export const children: Child[] = [
  {
    id: "child1",
    name: "Emma",
    age: 11,
    grade: "5th Grade",
    avatar: "E",
    interests: ["soccer", "reading", "art", "science"],
    preferredDowntime: "Reading quietly or drawing",
    color: "teal",
  },
  {
    id: "child2",
    name: "Liam",
    age: 8,
    grade: "3rd Grade",
    avatar: "L",
    interests: ["basketball", "LEGO", "piano", "dinosaurs"],
    preferredDowntime: "Building with LEGO or watching nature documentaries",
    color: "navy",
  },
  {
    id: "child3",
    name: "Mia",
    age: 5,
    grade: "Kindergarten",
    avatar: "M",
    interests: ["dancing", "coloring", "playground", "singing"],
    preferredDowntime: "Coloring or imaginative play",
    color: "sage",
  },
];

export const activities: Activity[] = [
  // Monday
  {
    id: "a1",
    title: "School",
    category: "school",
    childId: "child1",
    day: "Monday",
    startTime: "08:00",
    endTime: "15:00",
    location: "Oakwood Elementary",
    recurring: true,
  },
  {
    id: "a2",
    title: "School",
    category: "school",
    childId: "child2",
    day: "Monday",
    startTime: "08:00",
    endTime: "15:00",
    location: "Oakwood Elementary",
    recurring: true,
  },
  {
    id: "a3",
    title: "School",
    category: "school",
    childId: "child3",
    day: "Monday",
    startTime: "08:30",
    endTime: "12:30",
    location: "Sunnydale Kindergarten",
    recurring: true,
  },
  {
    id: "a4",
    title: "Soccer Practice",
    category: "sports",
    childId: "child1",
    day: "Monday",
    startTime: "16:00",
    endTime: "17:30",
    location: "Community Field",
    recurring: true,
  },
  {
    id: "a5",
    title: "Piano Lesson",
    category: "music",
    childId: "child2",
    day: "Monday",
    startTime: "16:00",
    endTime: "17:00",
    location: "Ms. Chen's Studio",
    recurring: true,
  },

  // Tuesday
  {
    id: "a6",
    title: "School",
    category: "school",
    childId: "child1",
    day: "Tuesday",
    startTime: "08:00",
    endTime: "15:00",
    location: "Oakwood Elementary",
    recurring: true,
  },
  {
    id: "a7",
    title: "School",
    category: "school",
    childId: "child2",
    day: "Tuesday",
    startTime: "08:00",
    endTime: "15:00",
    location: "Oakwood Elementary",
    recurring: true,
  },
  {
    id: "a8",
    title: "School",
    category: "school",
    childId: "child3",
    day: "Tuesday",
    startTime: "08:30",
    endTime: "12:30",
    location: "Sunnydale Kindergarten",
    recurring: true,
  },
  {
    id: "a9",
    title: "Math Tutoring",
    category: "tutoring",
    childId: "child1",
    day: "Tuesday",
    startTime: "15:30",
    endTime: "16:30",
    location: "Home",
    recurring: true,
  },
  {
    id: "a10",
    title: "Dance Class",
    category: "sports",
    childId: "child3",
    day: "Tuesday",
    startTime: "14:00",
    endTime: "15:00",
    location: "Little Steps Dance Studio",
    recurring: true,
  },
  {
    id: "a11",
    title: "Family Dinner",
    category: "family",
    childId: "family",
    day: "Tuesday",
    startTime: "18:00",
    endTime: "19:00",
    location: "Home",
    recurring: true,
  },

  // Wednesday
  {
    id: "a12",
    title: "School",
    category: "school",
    childId: "child1",
    day: "Wednesday",
    startTime: "08:00",
    endTime: "15:00",
    location: "Oakwood Elementary",
    recurring: true,
  },
  {
    id: "a13",
    title: "School",
    category: "school",
    childId: "child2",
    day: "Wednesday",
    startTime: "08:00",
    endTime: "15:00",
    location: "Oakwood Elementary",
    recurring: true,
  },
  {
    id: "a14",
    title: "School",
    category: "school",
    childId: "child3",
    day: "Wednesday",
    startTime: "08:30",
    endTime: "12:30",
    location: "Sunnydale Kindergarten",
    recurring: true,
  },
  {
    id: "a15",
    title: "Soccer Practice",
    category: "sports",
    childId: "child1",
    day: "Wednesday",
    startTime: "16:00",
    endTime: "17:30",
    location: "Community Field",
    recurring: true,
  },
  {
    id: "a16",
    title: "Basketball Practice",
    category: "sports",
    childId: "child2",
    day: "Wednesday",
    startTime: "16:00",
    endTime: "17:00",
    location: "YMCA Gym",
    recurring: true,
  },

  // Thursday
  {
    id: "a17",
    title: "School",
    category: "school",
    childId: "child1",
    day: "Thursday",
    startTime: "08:00",
    endTime: "15:00",
    location: "Oakwood Elementary",
    recurring: true,
  },
  {
    id: "a18",
    title: "School",
    category: "school",
    childId: "child2",
    day: "Thursday",
    startTime: "08:00",
    endTime: "15:00",
    location: "Oakwood Elementary",
    recurring: true,
  },
  {
    id: "a19",
    title: "School",
    category: "school",
    childId: "child3",
    day: "Thursday",
    startTime: "08:30",
    endTime: "12:30",
    location: "Sunnydale Kindergarten",
    recurring: true,
  },
  {
    id: "a20",
    title: "Piano Lesson",
    category: "music",
    childId: "child2",
    day: "Thursday",
    startTime: "15:30",
    endTime: "16:30",
    location: "Ms. Chen's Studio",
    recurring: true,
  },
  {
    id: "a21",
    title: "Math Tutoring",
    category: "tutoring",
    childId: "child1",
    day: "Thursday",
    startTime: "15:30",
    endTime: "16:30",
    location: "Home",
    recurring: true,
  },
  {
    id: "a22",
    title: "Pediatrician Appointment",
    category: "appointment",
    childId: "child3",
    day: "Thursday",
    startTime: "15:30",
    endTime: "16:30",
    location: "Dr. Martinez's Office",
    recurring: false,
    notes: "Annual checkup",
  },
  {
    id: "a23",
    title: "Art Class",
    category: "music",
    childId: "child1",
    day: "Thursday",
    startTime: "17:00",
    endTime: "18:00",
    location: "Community Center",
    recurring: true,
  },

  // Friday
  {
    id: "a24",
    title: "School",
    category: "school",
    childId: "child1",
    day: "Friday",
    startTime: "08:00",
    endTime: "15:00",
    location: "Oakwood Elementary",
    recurring: true,
  },
  {
    id: "a25",
    title: "School",
    category: "school",
    childId: "child2",
    day: "Friday",
    startTime: "08:00",
    endTime: "15:00",
    location: "Oakwood Elementary",
    recurring: true,
  },
  {
    id: "a26",
    title: "School",
    category: "school",
    childId: "child3",
    day: "Friday",
    startTime: "08:30",
    endTime: "12:30",
    location: "Sunnydale Kindergarten",
    recurring: true,
  },
  {
    id: "a27",
    title: "Soccer Game",
    category: "sports",
    childId: "child1",
    day: "Friday",
    startTime: "17:00",
    endTime: "18:30",
    location: "Riverside Park",
    recurring: false,
    notes: "Season opener",
  },

  // Saturday
  {
    id: "a28",
    title: "Basketball Game",
    category: "sports",
    childId: "child2",
    day: "Saturday",
    startTime: "09:00",
    endTime: "10:30",
    location: "YMCA Gym",
    recurring: true,
  },
  {
    id: "a29",
    title: "Dance Recital Rehearsal",
    category: "sports",
    childId: "child3",
    day: "Saturday",
    startTime: "10:00",
    endTime: "11:30",
    location: "Little Steps Dance Studio",
    recurring: false,
    notes: "Extra rehearsal for spring recital",
  },
  {
    id: "a30",
    title: "Birthday Party",
    category: "social",
    childId: "child1",
    day: "Saturday",
    startTime: "14:00",
    endTime: "16:00",
    location: "Fun Zone",
    recurring: false,
    notes: "Sophie's birthday party",
  },
  {
    id: "a31",
    title: "Family Park Time",
    category: "family",
    childId: "family",
    day: "Saturday",
    startTime: "11:00",
    endTime: "12:30",
    location: "Elm Park",
    recurring: false,
  },

  // Sunday
  {
    id: "a32",
    title: "Family Brunch",
    category: "family",
    childId: "family",
    day: "Sunday",
    startTime: "10:00",
    endTime: "11:30",
    location: "Home",
    recurring: true,
  },
  {
    id: "a33",
    title: "Reading Time",
    category: "family",
    childId: "family",
    day: "Sunday",
    startTime: "14:00",
    endTime: "15:00",
    location: "Home",
    recurring: true,
  },
];

export const conflicts: Conflict[] = [
  {
    id: "c1",
    activities: [
      activities.find((a) => a.id === "a4")!,
      activities.find((a) => a.id === "a5")!,
    ],
    severity: "medium",
    status: "unresolved",
    description:
      "Emma's soccer practice and Liam's piano lesson overlap on Monday at 4 PM. Both require a parent for drop-off/pickup.",
    suggestions: [
      {
        id: "cr1",
        title: "Arrange Carpool for Soccer",
        description:
          "Ask the Martinez family to take Emma to soccer while you handle Liam's piano drop-off.",
        type: "carpool",
      },
      {
        id: "cr2",
        title: "Shift Piano to 5 PM",
        description:
          "Ms. Chen has a 5 PM slot available on Mondays. This would eliminate the overlap entirely.",
        type: "reschedule",
      },
      {
        id: "cr3",
        title: "David Handles Soccer",
        description:
          "If David can leave work 15 minutes early on Mondays, he can manage Emma's soccer drop-off.",
        type: "delegate",
      },
    ],
  },
  {
    id: "c2",
    activities: [
      activities.find((a) => a.id === "a15")!,
      activities.find((a) => a.id === "a16")!,
    ],
    severity: "medium",
    status: "unresolved",
    description:
      "Wednesday after-school is tight. Emma's soccer and Liam's basketball both start at 4 PM at different locations.",
    suggestions: [
      {
        id: "cr4",
        title: "Stagger Drop-offs",
        description:
          "Drop Liam at YMCA first (closer), then take Emma to Community Field. She'll be 10 minutes late but it's practice.",
        type: "adjust",
      },
      {
        id: "cr5",
        title: "Wednesday Carpool Swap",
        description:
          "The Patels offered to take Liam to basketball on Wednesdays in exchange for Thursday pickups.",
        type: "carpool",
      },
    ],
  },
  {
    id: "c3",
    activities: [
      activities.find((a) => a.id === "a28")!,
      activities.find((a) => a.id === "a29")!,
    ],
    severity: "low",
    status: "unresolved",
    description:
      "Saturday morning: Liam's basketball (9–10:30 AM) and Mia's dance rehearsal (10–11:30 AM) overlap by 30 minutes.",
    suggestions: [
      {
        id: "cr6",
        title: "Split Parent Coverage",
        description:
          "Sarah stays with Liam at basketball while David takes Mia to dance rehearsal at 10 AM.",
        type: "delegate",
      },
      {
        id: "cr7",
        title: "Early Drop-off for Dance",
        description:
          "Check if Mia can arrive 15 minutes early to rehearsal. The studio opens at 9:30 AM.",
        type: "adjust",
      },
    ],
  },
  {
    id: "c4",
    activities: [
      activities.find((a) => a.id === "a21")!,
      activities.find((a) => a.id === "a22")!,
    ],
    severity: "high",
    status: "unresolved",
    description:
      "Thursday: Emma's math tutoring and Mia's pediatrician appointment are both at 3:30 PM. The appointment cannot be moved.",
    suggestions: [
      {
        id: "cr8",
        title: "Move Tutoring to 4:30 PM",
        description:
          "Ask the tutor if Thursday can shift to 4:30–5:30 PM this week. The appointment takes priority.",
        type: "reschedule",
      },
      {
        id: "cr9",
        title: "Swap Tutoring to Friday",
        description:
          "The tutor has availability Friday at 3:30 PM. Emma's schedule is lighter on Fridays.",
        type: "reschedule",
      },
      {
        id: "cr10",
        title: "David Handles Appointment",
        description:
          "David takes Mia to the pediatrician while Sarah stays home for Emma's tutoring session.",
        type: "delegate",
      },
    ],
  },
];

export const freeTimeBlocks: FreeTimeBlock[] = [
  {
    id: "ft1",
    childId: "child3",
    day: "Monday",
    startTime: "13:00",
    endTime: "15:30",
    quality: "creative-activity",
    label: "Afternoon creative window",
    isProtected: false,
    status: "open",
  },
  {
    id: "ft2",
    childId: "family",
    day: "Monday",
    startTime: "18:00",
    endTime: "19:30",
    quality: "family-window",
    label: "Evening family time",
    isProtected: true,
    status: "protected",
  },
  {
    id: "ft3",
    childId: "child1",
    day: "Tuesday",
    startTime: "17:00",
    endTime: "18:00",
    quality: "short-reset",
    label: "Post-tutoring wind-down",
    isProtected: true,
    status: "protected",
  },
  {
    id: "ft4",
    childId: "child2",
    day: "Tuesday",
    startTime: "15:30",
    endTime: "17:30",
    quality: "outdoor-activity",
    label: "Open afternoon block",
    isProtected: false,
    status: "open",
  },
  {
    id: "ft5",
    childId: "family",
    day: "Wednesday",
    startTime: "17:30",
    endTime: "19:30",
    quality: "family-window",
    label: "Post-practice family evening",
    isProtected: false,
    status: "open",
  },
  {
    id: "ft6",
    childId: "child3",
    day: "Wednesday",
    startTime: "13:00",
    endTime: "16:00",
    quality: "leave-unscheduled",
    label: "Mia's quiet afternoon — best left open",
    isProtected: true,
    status: "protected",
  },
  {
    id: "ft7",
    childId: "child1",
    day: "Thursday",
    startTime: "18:30",
    endTime: "20:00",
    quality: "leave-unscheduled",
    label: "Thursday is busy — protect this downtime",
    isProtected: true,
    status: "protected",
  },
  {
    id: "ft8",
    childId: "family",
    day: "Friday",
    startTime: "15:30",
    endTime: "17:00",
    quality: "outdoor-activity",
    label: "TGIF outdoor window",
    isProtected: false,
    status: "open",
  },
  {
    id: "ft9",
    childId: "family",
    day: "Saturday",
    startTime: "12:30",
    endTime: "14:00",
    quality: "family-window",
    label: "Saturday midday family time",
    isProtected: false,
    status: "open",
  },
  {
    id: "ft10",
    childId: "child2",
    day: "Saturday",
    startTime: "14:00",
    endTime: "17:00",
    quality: "creative-activity",
    label: "Liam's creative afternoon",
    isProtected: false,
    status: "open",
  },
  {
    id: "ft11",
    childId: "family",
    day: "Sunday",
    startTime: "12:00",
    endTime: "14:00",
    quality: "leave-unscheduled",
    label: "Sunday rest — keep it easy",
    isProtected: true,
    status: "protected",
  },
  {
    id: "ft12",
    childId: "family",
    day: "Sunday",
    startTime: "15:00",
    endTime: "18:00",
    quality: "outdoor-activity",
    label: "Sunday afternoon — ideal for a family outing",
    isProtected: false,
    status: "open",
  },
];

export const suggestions: Suggestion[] = [
  {
    id: "s1",
    title: "Nature Walk at Elm Park",
    description:
      "A relaxed family walk through the nature trail. Great for resetting after a busy week.",
    category: "outdoor",
    duration: "60–90 min",
    idealTimeWindow: "Sunday 3–5 PM",
    energyLevel: "low",
    tags: ["outdoor", "family", "calm"],
    forChildId: "family",
    whyItFits:
      "Sunday afternoon is wide open with no commitments. A gentle outdoor activity is perfect after a structured week.",
    isSaved: false,
    isTryThisWeek: false,
  },
  {
    id: "s2",
    title: "LEGO Building Challenge",
    description:
      "Set up a themed building challenge for Liam. He's been asking to build a dinosaur exhibit.",
    category: "creative",
    duration: "45–60 min",
    idealTimeWindow: "Saturday 2–4 PM",
    energyLevel: "low",
    tags: ["creative", "calm", "individual"],
    forChildId: "child2",
    whyItFits:
      "Saturday afternoon is open for Liam while Emma is at the birthday party. This plays to his interests without adding driving time.",
    isSaved: false,
    isTryThisWeek: false,
  },
  {
    id: "s3",
    title: "Watercolor Painting Session",
    description:
      "Emma has been interested in art — set up a small painting station at home.",
    category: "creative",
    duration: "30–45 min",
    idealTimeWindow: "Tuesday 5–6 PM",
    energyLevel: "low",
    tags: ["creative", "calm", "individual"],
    forChildId: "child1",
    whyItFits:
      "After math tutoring, Emma needs something relaxing and self-directed. Art is her favorite way to decompress.",
    isSaved: false,
    isTryThisWeek: false,
  },
  {
    id: "s4",
    title: "Backyard Dance Party",
    description:
      "Put on Mia's favorite music and let her dance freely. Low prep, high joy.",
    category: "active",
    duration: "20–30 min",
    idealTimeWindow: "Monday 1:30–2:30 PM",
    energyLevel: "high",
    tags: ["active", "fun", "individual"],
    forChildId: "child3",
    whyItFits:
      "Mia has a long free afternoon on Mondays after kindergarten. A burst of movement fits her energy and interests.",
    isSaved: false,
    isTryThisWeek: false,
  },
  {
    id: "s5",
    title: "Family Board Game Night",
    description:
      "Play a game everyone enjoys — Ticket to Ride Junior, Uno, or Candy Land for Mia.",
    category: "family",
    duration: "45–60 min",
    idealTimeWindow: "Wednesday 6–7 PM",
    energyLevel: "low",
    tags: ["family", "calm", "fun"],
    forChildId: "family",
    whyItFits:
      "Wednesday evening is free after practices wrap up. A calm group activity brings the family together mid-week.",
    isSaved: false,
    isTryThisWeek: false,
  },
  {
    id: "s6",
    title: "Science Experiment Kit",
    description:
      "Try the volcano experiment from Emma's science kit. Liam would love to watch too.",
    category: "STEM",
    duration: "30–45 min",
    idealTimeWindow: "Saturday 12:30–1:30 PM",
    energyLevel: "medium",
    tags: ["educational", "STEM", "fun"],
    forChildId: "child1",
    whyItFits:
      "Saturday midday is open. Emma loves science and this uses a kit you already have at home.",
    isSaved: false,
    isTryThisWeek: false,
  },
  {
    id: "s7",
    title: "Quiet Reading Time",
    description:
      "Let Emma read independently. She's halfway through a book she loves.",
    category: "reading",
    duration: "30 min",
    idealTimeWindow: "Thursday 6:30–7 PM",
    energyLevel: "low",
    tags: ["calm", "individual", "educational"],
    forChildId: "child1",
    whyItFits:
      "Thursday evening is protected downtime. Reading is Emma's preferred way to unwind after a packed day.",
    isSaved: false,
    isTryThisWeek: false,
  },
  {
    id: "s8",
    title: "Do Nothing & Rest",
    description:
      "No plans needed. Sometimes the best activity is no activity at all.",
    category: "rest",
    duration: "As long as needed",
    idealTimeWindow: "Sunday 12–2 PM",
    energyLevel: "low",
    tags: ["rest", "calm", "recovery"],
    forChildId: "family",
    whyItFits:
      "After a full week, Sunday midday is the perfect time to simply rest. Protect this space intentionally.",
    isSaved: false,
    isTryThisWeek: false,
  },
  {
    id: "s9",
    title: "Piano Free Play",
    description:
      "Let Liam explore the piano without structure. Just playing for fun builds his love of music.",
    category: "music",
    duration: "15–20 min",
    idealTimeWindow: "Tuesday 4–5 PM",
    energyLevel: "low",
    tags: ["creative", "individual", "calm"],
    forChildId: "child2",
    whyItFits:
      "Tuesday afternoon is open for Liam. Unstructured piano time reinforces his lessons without pressure.",
    isSaved: false,
    isTryThisWeek: false,
  },
  {
    id: "s10",
    title: "Playground Visit",
    description:
      "Take Mia to the playground near home. Fresh air and free play are exactly what she needs.",
    category: "outdoor",
    duration: "45–60 min",
    idealTimeWindow: "Friday 3:30–5 PM",
    energyLevel: "high",
    tags: ["outdoor", "active", "fun"],
    forChildId: "child3",
    whyItFits:
      "Friday afternoon is open. Outdoor play is ideal for Mia's energy level and developmental stage.",
    isSaved: false,
    isTryThisWeek: false,
  },
];

export const familySettings: FamilySettings = {
  preferredDowntimeHours: 2,
  maxActivitiesPerDay: 3,
  travelBufferMinutes: 15,
  planningStyle: "balanced",
  notifyConflicts: true,
  notifyFreeTime: true,
  notifyWeeklyPlan: true,
  familyName: "The Johnsons",
  parentName: "Sarah",
};

export const weeklyLoad: DayLoad[] = [
  { day: "Monday", hours: 4.5, activities: 5 },
  { day: "Tuesday", hours: 4.0, activities: 5 },
  { day: "Wednesday", hours: 4.5, activities: 5 },
  { day: "Thursday", hours: 6.0, activities: 7 },
  { day: "Friday", hours: 3.5, activities: 4 },
  { day: "Saturday", hours: 4.0, activities: 4 },
  { day: "Sunday", hours: 2.5, activities: 2 },
];

export const weeklyPlan: WeeklyPlanDay[] = [
  {
    day: "Monday",
    activities: activities.filter((a) => a.day === "Monday"),
    logistics: [
      "School pickup for Emma & Liam at 3 PM, Mia at 12:30 PM",
      "Soccer drop-off at 3:50 PM — allow travel buffer",
      "Piano drop-off at 3:50 PM — coordinate with David",
    ],
    conflictNotes: [
      "Soccer and piano overlap — carpool or split parent coverage needed",
    ],
    freeTimeNotes: [
      "Mia has a free afternoon from 1–3:30 PM — great for creative play",
      "Evening after 6 PM is open for family time",
    ],
    downtimeReminder:
      "Monday can feel rushed after school. Try to keep the evening calm.",
  },
  {
    day: "Tuesday",
    activities: activities.filter((a) => a.day === "Tuesday"),
    logistics: [
      "Mia's dance class at 2 PM — early pickup from kindergarten",
      "Emma's tutor arrives at 3:30 PM at home",
      "Family dinner at 6 PM — keep it simple",
    ],
    conflictNotes: [],
    freeTimeNotes: [
      "Liam has a free afternoon — good for outdoor play or LEGO time",
      "Emma has downtime from 5–6 PM after tutoring",
    ],
  },
  {
    day: "Wednesday",
    activities: activities.filter((a) => a.day === "Wednesday"),
    logistics: [
      "Both soccer and basketball at 4 PM — plan staggered drop-offs",
      "Mia's afternoon is open — arrange a playdate or quiet time",
    ],
    conflictNotes: [
      "Emma and Liam both have practice at 4 PM — coordinate transportation",
    ],
    freeTimeNotes: [
      "Mia's afternoon is best left unscheduled",
      "Evening after 5:30 PM is a family window — consider board game night",
    ],
    downtimeReminder:
      "Wednesday afternoon is hectic with dual practices. Keep the evening deliberately calm.",
  },
  {
    day: "Thursday",
    activities: activities.filter((a) => a.day === "Thursday"),
    logistics: [
      "Mia's pediatrician appointment at 3:30 PM — cannot be moved",
      "Emma's tutor at 3:30 PM — may need to reschedule this week",
      "Emma's art class at 5 PM — confirm pickup with David",
    ],
    conflictNotes: [
      "Tutoring and pediatrician conflict — resolve by shifting tutoring or splitting parents",
    ],
    freeTimeNotes: [
      "Thursday evening after 6:30 PM should be protected downtime for Emma",
    ],
    downtimeReminder:
      "Thursday is your busiest day. Protect the evening for rest — Emma especially needs it.",
  },
  {
    day: "Friday",
    activities: activities.filter((a) => a.day === "Friday"),
    logistics: [
      "Emma's soccer game at 5 PM — bring water and snacks",
      "Mia done at 12:30 PM — arrange afternoon plans",
    ],
    conflictNotes: [],
    freeTimeNotes: [
      "Friday afternoon is open for everyone — ideal for outdoor play before the game",
    ],
    downtimeReminder:
      "Fridays are lighter. Enjoy the breathing room.",
  },
  {
    day: "Saturday",
    activities: activities.filter((a) => a.day === "Saturday"),
    logistics: [
      "Liam's basketball at 9 AM — pack his gear Friday night",
      "Mia's dance rehearsal at 10 AM — overlap with Liam's game, split coverage",
      "Emma's birthday party at 2 PM — gift is ready",
    ],
    conflictNotes: [
      "Basketball and dance rehearsal overlap slightly — split parent coverage",
    ],
    freeTimeNotes: [
      "Saturday midday (12:30–2 PM) is a family window",
      "Liam's Saturday afternoon is open for creative time",
    ],
  },
  {
    day: "Sunday",
    activities: activities.filter((a) => a.day === "Sunday"),
    logistics: [
      "Family brunch at 10 AM — keep it relaxed",
      "Reading time at 2 PM — everyone grabs a book or activity",
    ],
    conflictNotes: [],
    freeTimeNotes: [
      "Sunday midday is rest time — protect it",
      "Sunday afternoon is wide open — nature walk or free play",
    ],
    downtimeReminder:
      "Sunday is your recovery day. Keep it unstructured and gentle. You've earned it.",
  },
];

export function getChildById(id: string): Child | undefined {
  return children.find((c) => c.id === id);
}

export function getChildName(id: string): string {
  if (id === "family") return "Family";
  return getChildById(id)?.name ?? "Unknown";
}

export function getActivitiesByDay(day: string): Activity[] {
  return activities.filter((a) => a.day === day);
}

export function getActivitiesByChild(childId: string): Activity[] {
  return activities.filter(
    (a) => a.childId === childId || a.childId === "family"
  );
}
