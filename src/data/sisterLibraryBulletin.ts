export interface BulletinConfig {
  currentlyReading: string;
  announcements: string[];
}

export const SISTER_LIBRARY_BULLETIN: BulletinConfig = {
  currentlyReading: "Collective Memory & Zine Praxis",
  announcements: [
    "Reading Room open Thu–Sun 2PM–8PM",
    "Next Zine Jam: 14th Oct",
    "Autonomous Feminist Print Spaces Open",
    "Dhaka Sanctuary Archive Est. 2019",
    "Vol. 08 Dispatch: Cyber-Feminism & Data Sovereignty",
    "South Asian Women's Literature & Pamphleteering",
  ],
};

export const getBulletinItems = (config: BulletinConfig = SISTER_LIBRARY_BULLETIN): string[] => [
  `Currently reading: ${config.currentlyReading}`,
  ...config.announcements,
];
