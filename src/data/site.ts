// All personal content lives here, so the site can be updated without touching components.

export const site = {
  name: "Victor Benson",
  role: "Computer Science student & cloud builder",
  location: "London, UK",
  intro:
    "First-year Computer Science student at the University of Westminster. AWS-certified, I build cloud-hosted apps and AI tools — and one of them has a 30K+ TikTok audience.",
  about:
    "I got into tech through IT support, fixing real problems for real people, and stayed for the building. Today I study Computer Science at Westminster, hold the AWS Solutions Architect – Associate certification, and spend my spare time shipping projects: from a Microsoft 365 rollout for four departments to an AI hairstyle app people actually use. I'm looking for spring weeks and internships in software engineering and cloud.",
  birthDate: "2008-05-30T00:00:00Z",
  email: "Victorbenson419@gmail.com",
  github: "https://github.com/macroer16",
  githubUser: "macroer16",
  linkedin: "https://www.linkedin.com/in/victor-benson-b2a07b283/",
  // To show the "Download CV" button: put your CV at public/Victor_Benson_CV.pdf and set cvReady to true.
  cv: "/Victor_Benson_CV.pdf",
  cvReady: false,
  openTo: "Open to spring weeks & internships",
  url: "https://victor-benson.vercel.app",
};

export const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    detail: "Designing secure, resilient and cost-efficient architectures on AWS.",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    detail: "Core AWS services, security, pricing and the shared responsibility model.",
  },
];

export const stack = [
  {
    area: "Languages",
    detail: "What I write most",
    items: ["Python", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    area: "Cloud",
    detail: "Where my projects live",
    items: ["AWS S3", "CloudFront", "EC2", "IAM", "Vercel"],
  },
  {
    area: "Microsoft 365 & identity",
    detail: "From my IT placement",
    items: ["Entra ID", "MFA", "Conditional Access", "Intune", "Exchange", "SharePoint"],
  },
  {
    area: "Tools",
    detail: "Day to day",
    items: ["Git", "GitHub", "Next.js", "Tailwind CSS", "Claude Code", "DNS"],
  },
];

export const experience = [
  {
    title: "BSc (Hons) Computer Science",
    org: "University of Westminster, London",
    dates: "Sep 2026 – May 2029",
    points: [
      "Modules: Software Development I (Python), Mathematics for Computing, Computer Systems Fundamentals.",
      "Member of the Westminster Dragons basketball club.",
    ],
  },
  {
    title: "IT Support & Microsoft 365 Placement",
    org: "Techlogic IT Services, London",
    dates: "Jun 2025 – Aug 2025",
    points: [
      "Set up a Microsoft 365 tenant for four departments: users, groups, shared mailboxes and distribution lists.",
      "Configured Entra ID, MFA and Conditional Access, and worked with Intune device management.",
      "Troubleshot DNS and domain-verification issues and documented every setup step.",
    ],
  },
  {
    title: "Digital Marketing",
    org: "Looks First Marketing",
    dates: "2025",
    points: ["Created content, tracked campaign data and coordinated campaigns with the team."],
  },
  {
    title: "IT Support",
    org: "Global North London Business School",
    dates: "2023 – 2024",
    points: [
      "Face-to-face, phone and remote support for staff and students.",
      "Diagnosed hardware, software and network faults; managed user accounts.",
    ],
  },
  {
    title: "BTEC Level 3 Extended Diploma in Computing",
    org: "Hertford Regional College",
    dates: "2024 – 2026",
    points: [],
  },
];

export const achievements = [
  {
    title: "AWS Solutions Architect – Associate",
    detail: "Passed before starting university, through self-study alongside college and work.",
  },
  {
    title: "30K+ TikTok following",
    detail: "Grew an audience for MirrorVerse by posting demos and testing what people respond to.",
  },
  {
    title: "Hackathons",
    detail: "Next up: IC Hack and HackLondon 2027.",
  },
];
