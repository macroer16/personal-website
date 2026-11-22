// All personal content lives here, so the site can be updated without touching components.

export const site = {
  name: "Victor Benson",
  first: "victor",
  tagline: "cloud & software",
  birthDate: "2008-05-30T00:00:00Z",
  // Put a square photo at public/victor.jpg and set photo to "/victor.jpg".
  photo: null as string | null,
  intro: [
    "first-year computer science student at the University of Westminster in London.",
    "AWS Certified Solutions Architect. I like building things in the cloud and getting them in front of real people.",
    "I built MirrorVerse, an AI hairstyle try-on app, and grew a 30K+ TikTok audience around it.",
    "when I'm not coding I'm playing basketball for the Westminster Dragons.",
  ],
  status: [
    { label: "Status", value: "Open to spring weeks & internships" },
    { label: "Based in", value: "London, UK" },
    { label: "Focus", value: "Cloud, AI apps & software engineering" },
  ],
  email: "Victorbenson419@gmail.com",
  github: "https://github.com/macroer16",
  githubUser: "macroer16",
  linkedin: "https://www.linkedin.com/in/victor-benson-b2a07b283/",
  // To show "Download CV": put your CV at public/Victor_Benson_CV.pdf and set cvReady to true.
  cv: "/Victor_Benson_CV.pdf",
  cvReady: false,
  url: "https://victor-benson.vercel.app",
  role: "Computer Science student & cloud builder",
};

// `icon` is a simple-icons export name (real brand logo, starts with "si")
// or a lucide icon name for services that don't have a public logo.
export type StackItem = { name: string; icon: string };

export const stack: { area: string; detail: string; items: StackItem[] }[] = [
  {
    area: "Languages & frontend",
    detail: "What I write most, from scripts to full web apps.",
    items: [
      { name: "Python", icon: "siPython" },
      { name: "TypeScript", icon: "siTypescript" },
      { name: "JavaScript", icon: "siJavascript" },
      { name: "React", icon: "siReact" },
      { name: "Next.js", icon: "siNextdotjs" },
      { name: "Tailwind CSS", icon: "siTailwindcss" },
      { name: "HTML5", icon: "siHtml5" },
      { name: "CSS", icon: "siCss" },
    ],
  },
  {
    area: "Cloud · AWS",
    detail: "Certified Solutions Architect. Where my projects live.",
    items: [
      { name: "S3", icon: "Database" },
      { name: "CloudFront", icon: "Globe" },
      { name: "EC2", icon: "Server" },
      { name: "IAM", icon: "KeyRound" },
      { name: "Vercel", icon: "siVercel" },
      { name: "Cloudflare", icon: "siCloudflare" },
    ],
  },
  {
    area: "Microsoft 365 & identity",
    detail: "Set up for four departments during my IT placement.",
    items: [
      { name: "Entra ID", icon: "ShieldCheck" },
      { name: "MFA & Conditional Access", icon: "Lock" },
      { name: "Intune", icon: "Laptop" },
      { name: "Exchange", icon: "Mail" },
      { name: "SharePoint", icon: "FolderOpen" },
    ],
  },
  {
    area: "Tools & workflow",
    detail: "Shipping, version control and day-to-day building.",
    items: [
      { name: "Git", icon: "siGit" },
      { name: "GitHub", icon: "siGithub" },
      { name: "Claude Code", icon: "siClaude" },
      { name: "DNS", icon: "Network" },
    ],
  },
];

export const certifications = [
  { name: "Solutions Architect – Associate", code: "SAA-C03", detail: "Designing secure, resilient, high-performing and cost-optimised architectures on AWS." },
  { name: "Cloud Practitioner", code: "CLF-C02", detail: "Core AWS services, security, pricing and the shared responsibility model." },
];

export type Role = { org: string; badge?: string; role: string; dates: string; points: string[] };

export const experience: Role[] = [
  {
    org: "Techlogic IT Services",
    badge: "Placement",
    role: "IT Support & Microsoft 365",
    dates: "Jun 2025 – Aug 2025",
    points: [
      "Set up a Microsoft 365 tenant for four departments: users, groups, shared mailboxes and distribution lists.",
      "Configured Entra ID, MFA and Conditional Access, and worked with Intune device management.",
      "Fixed DNS and domain-verification issues and documented every setup step.",
    ],
  },
  {
    org: "Looks First Marketing",
    role: "Digital Marketing",
    dates: "2025",
    points: ["Created content, tracked campaign data and coordinated campaigns with the team."],
  },
  {
    org: "Global North London Business School",
    role: "IT Support",
    dates: "2023 – 2024",
    points: [
      "Face-to-face, phone and remote support for staff and students.",
      "Diagnosed hardware, software and network faults; managed user accounts.",
    ],
  },
];

export const education: Role[] = [
  {
    org: "University of Westminster",
    badge: "Current",
    role: "BSc (Hons) Computer Science",
    dates: "2026 – 2029",
    points: [
      "Modules: Software Development I (Python), Mathematics for Computing, Computer Systems Fundamentals.",
      "Westminster Dragons basketball.",
    ],
  },
  {
    org: "Hertford Regional College",
    role: "BTEC Level 3 Extended Diploma in Computing",
    dates: "2024 – 2026",
    points: [],
  },
];

export const achievements = [
  { title: "AWS Solutions Architect – Associate", where: "Amazon Web Services", detail: "Passed before starting university, through self-study alongside college and work." },
  { title: "30K+ TikTok followers", where: "MirrorVerse", detail: "Grew an audience by posting demos of the app and testing what people respond to." },
  { title: "Microsoft 365 rollout", where: "Techlogic IT Services", detail: "Set up a tenant for four departments, including identity, MFA and device management." },
  { title: "Interactive revision tools", where: "CS Visualiser", detail: "Shipped six tools that my course mates can use to revise first-year CS." },
];
