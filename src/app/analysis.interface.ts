// analysis.interface.ts

export interface Analysis {
  summary: string;
  explicit: boolean;
  language: string;
  keywords: string[];
  moods: { [key: string]: number }[];
  themes: { [key: string]: number }[];
}
