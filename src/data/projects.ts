// Add a new project by adding an object here. Featured projects show on the home page.

export type Project = {
  title: string;
  year: string;
  description: string;
  stack: string;
  github?: string;
  live?: string;
  image?: string; // screenshot in /public/projects
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "CS Visualiser",
    year: "2026",
    description:
      "A six-chapter path from a single switch to a working CPU, built for my first-year modules. Flip bits, wire logic gates, shade Venn diagrams and step through a tiny processor — each chapter ends with a challenge that checks your answer, and progress is saved as you go.",
    stack: "react · typescript · vite · tailwind",
    github: "https://github.com/macroer16/cs-visualiser",
    live: "https://cs-visualiser.vercel.app",
    image: "/projects/cs-visualiser.png",
    featured: true,
  },
  {
    title: "MirrorVerse",
    year: "2026",
    description:
      "An AI hairstyle try-on app: upload a photo and see new styles on yourself before you commit. I grew it a 30K+ following on TikTok by posting short demos and watching what people reacted to.",
    stack: "ai · mobile web · tiktok",
    featured: true,
  },
  {
    title: "This website",
    year: "2026",
    description:
      "Next.js on Vercel. The contributions grid and repo list are pulled from GitHub on the server and cached for an hour.",
    stack: "next.js · typescript · tailwind · vercel",
    github: "https://github.com/macroer16/personal-website",
    live: "https://victor-benson.vercel.app",
    featured: true,
  },
  {
    title: "AWS portfolio site",
    year: "2025",
    description: "My first real AWS deployment: a static site in an S3 bucket, served worldwide through CloudFront.",
    stack: "aws s3 · cloudfront · html · css",
  },
  {
    title: "AI Content Assistant",
    year: "2025",
    description: "A Python tool that uses an AI API to draft and organise content.",
    stack: "python · ai api",
  },
];
