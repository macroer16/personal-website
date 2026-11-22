// All personal content lives here, so the site can be updated without touching the layout.

export const site = {
  name: "Victor Benson",
  role: "Computer Science student & cloud builder",
  birthDate: "2008-05-30T00:00:00Z",
  // Put a square photo at public/victor.jpg and change this to "/victor.jpg".
  photo: null as string | null,
  email: "Victorbenson419@gmail.com",
  github: "https://github.com/macroer16",
  githubUser: "macroer16",
  linkedin: "https://www.linkedin.com/in/victor-benson-b2a07b283/",
  // To link your CV: put it at public/Victor_Benson_CV.pdf and set cvReady to true.
  cv: "/Victor_Benson_CV.pdf",
  cvReady: false,
  url: "https://victor-benson.vercel.app",
};

// What I use, written the way I'd say it — no logo wall.
export const toolbox = [
  { area: "languages", items: "python, typescript, javascript, html & css" },
  { area: "web", items: "react, next.js, tailwind, vite" },
  { area: "cloud", items: "aws — s3, cloudfront, ec2, iam · vercel · cloudflare" },
  { area: "microsoft", items: "365, entra id, mfa & conditional access, intune, exchange, sharepoint" },
  { area: "everyday", items: "git, github, dns, claude code" },
];

export const certifications = [
  { name: "AWS Certified Solutions Architect – Associate", code: "SAA-C03" },
  { name: "AWS Certified Cloud Practitioner", code: "CLF-C02" },
];

export type Role = { org: string; role: string; place: string; dates: string; now?: boolean; summary: string };

export const work: Role[] = [
  {
    org: "Techlogic IT Services",
    role: "IT support & Microsoft 365 placement",
    place: "london",
    dates: "jun – aug 2025",
    summary:
      "Set up a Microsoft 365 tenant for four departments — users, groups, shared mailboxes and distribution lists. Configured Entra ID, MFA and Conditional Access, worked with Intune, and sorted out the DNS and domain verification along the way. Wrote up every step so the next person wouldn't have to guess.",
  },
  {
    org: "Looks First Marketing",
    role: "digital marketing",
    place: "remote",
    dates: "2025",
    summary: "Made content, tracked how campaigns performed and helped coordinate them with the team.",
  },
  {
    org: "Global North London Business School",
    role: "IT support",
    place: "london",
    dates: "2023 – 2024",
    summary:
      "My first tech job. Helped staff and students in person, by phone and remotely — hardware, software, network faults and user accounts.",
  },
];

export const study: Role[] = [
  {
    org: "University of Westminster",
    role: "BSc Computer Science",
    place: "london",
    dates: "2026 – 2029",
    now: true,
    summary: "First year: Software Development (Python), Mathematics for Computing and Computer Systems Fundamentals. I also play for the Westminster Dragons.",
  },
  {
    org: "Hertford Regional College",
    role: "BTEC Level 3 Extended Diploma in Computing",
    place: "hertford",
    dates: "2024 – 2026",
    summary: "",
  },
];

// A short, dated log of things that happened.
export const log = [
  { when: "nov 2026", what: "shipped CS Visualiser and this site" },
  { when: "sep 2026", what: "started computer science at Westminster" },
  { when: "2026", what: "MirrorVerse passed 30K followers on TikTok" },
  { when: "summer 2025", what: "Microsoft 365 placement at Techlogic" },
  { when: "2023", what: "first IT support job" },
];
