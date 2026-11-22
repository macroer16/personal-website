// Add a new project by adding an object here. Featured projects show on the home page.

export type Project = {
  title: string;
  years: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  status?: "Live" | "In progress" | "Planned";
};

export const projects: Project[] = [
  {
    title: "MirrorVerse",
    years: "2026",
    description:
      "AI hairstyle try-on app: upload a photo and preview new hairstyles on yourself. Grew a 30K+ TikTok following through short demo videos.",
    tags: ["AI", "Mobile web", "Growth"],
    featured: true,
  },
  {
    title: "Personal website",
    years: "2026",
    description:
      "This site. Next.js and Tailwind on Vercel, with live GitHub data pulled server-side from the GitHub API and refreshed every hour.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    github: "https://github.com/macroer16/personal-website",
    live: "https://victor-benson.vercel.app",
    featured: true,
    status: "Live",
  },
  {
    title: "AWS portfolio site",
    years: "2025",
    description:
      "Static site hosted on Amazon S3 and served globally through CloudFront — my first hands-on AWS deployment.",
    tags: ["AWS S3", "CloudFront", "HTML", "CSS"],
    featured: true,
  },
  {
    title: "CS Visualiser",
    years: "2026",
    description:
      "Interactive revision site for first-year CS: number bases with full working, drag-and-wire logic gates, a truth-table builder, Venn diagrams, a fetch–decode–execute CPU simulator and a randomised quiz.",
    tags: ["React", "TypeScript", "Vite", "Tailwind"],
    github: "https://github.com/macroer16/cs-visualiser",
    live: "https://cs-visualiser.vercel.app",
    featured: true,
    status: "Live",
  },
  {
    title: "aws-guard",
    years: "2027",
    description:
      "Read-only command-line scanner that finds public S3 buckets, unencrypted volumes, open security groups and idle resources in an AWS account.",
    tags: ["Python", "boto3", "Security", "AWS"],
    status: "Planned",
  },
  {
    title: "AI Content Assistant",
    years: "2025",
    description: "Python tool that uses an AI API to draft and organise content.",
    tags: ["Python", "AI"],
  },
];
