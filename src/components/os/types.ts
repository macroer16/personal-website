import type { Day, Repo } from "@/lib/github";

// Data fetched on the server and handed to the OS.
export type OsData = {
  contributions: { total: number; days: Day[] } | null;
  repos: Repo[];
  repoCount: number | null;
  refreshed: string;
};

export type AppId = "about" | "projects" | "terminal" | "github" | "hoops" | "mail" | "work" | "cv" | "browser" | "aws";

export type Win = {
  id: string;
  app: AppId;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  min: boolean;
  max: boolean;
  url?: string; // browser windows
};

// Shared helpers the apps use to open other apps.
export type OsApi = { open: (app: AppId, opts?: { url?: string; title?: string }) => void; data: OsData };
