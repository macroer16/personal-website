// Add a new project by adding an object here. Featured projects show on the home page.

export type Project = {
  title: string;
  dates: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  image?: string; // screenshot in /public/projects
  label?: string; // shown on the placeholder art when there is no screenshot
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "CS Visualiser",
    dates: "Nov 2026 – Present",
    description:
      "Interactive revision for first-year CS: drag-and-wire logic gates, number bases with full working, Venn diagrams and a step-by-step CPU simulator.",
    tags: ["React", "TypeScript", "Vite", "Tailwind"],
    github: "https://github.com/macroer16/cs-visualiser",
    live: "https://cs-visualiser.vercel.app",
    image: "/projects/cs-visualiser.png",
    featured: true,
  },
  {
    title: "MirrorVerse",
    dates: "2026 – Present",
    description:
      "AI hairstyle try-on app: upload a photo and preview new styles on yourself. Grew a 30K+ TikTok following through short demo videos.",
    tags: ["AI", "Mobile web", "Growth"],
    label: "AI hairstyle try-on",
    featured: true,
  },
  {
    title: "This website",
    dates: "Nov 2026",
    description:
      "Next.js on Vercel with live GitHub data, a contributions heatmap built from the API, light/dark mode and full social previews.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    github: "https://github.com/macroer16/personal-website",
    live: "https://victor-benson.vercel.app",
    image: "/projects/personal-website.png",
    featured: true,
  },
  {
    title: "AWS portfolio site",
    dates: "2025",
    description: "Static site hosted on Amazon S3 and served globally through CloudFront — my first hands-on AWS deployment.",
    tags: ["AWS S3", "CloudFront", "HTML", "CSS"],
    label: "S3 + CloudFront",
  },
  {
    title: "AI Content Assistant",
    dates: "2025",
    description: "Python tool that uses an AI API to draft and organise content.",
    tags: ["Python", "AI"],
    label: "Python + AI API",
  },
];
