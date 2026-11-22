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
    title: "aws-guard",
    year: "2026",
    description:
      "A read-only scanner that finds security risks and wasted money in an AWS account — public buckets, open SSH, root without MFA, databases without backups, forgotten volumes still billing. 22 checks mapped to AWS Security Hub controls, an HTML report with a score, a CI gate, and a demo mode you can try without AWS. Tested against a mocked AWS account.",
    stack: "python · boto3 · pytest + moto · github actions",
    github: "https://github.com/macroer16/aws-guard",
    image: "/projects/aws-guard.png",
    featured: true,
  },
  {
    title: "Kubernetes GitOps Platform",
    year: "2026",
    description:
      "A production-style Kubernetes platform run entirely from Git with ArgoCD: keyless-signed images (Cosign), Kyverno admission policies, Pod Security \"restricted\", NetworkPolicies, HTTPS through the Gateway API, Sealed Secrets, autoscaling, and Prometheus and Grafana with alerts. Every push builds a fresh 3-node cluster in CI and runs smoke, security-policy and load tests against it.",
    stack: "kubernetes · argocd · helm · kyverno · cosign · prometheus · github actions",
    github: "https://github.com/macroer16/k8s-gitops-platform",
    featured: true,
  },
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
    title: "StudyBuddy",
    year: "2026",
    description:
      "Upload a lecture PDF and get a summary, 15 flashcards with spaced repetition, 10 exam-style questions, a timed mock exam scored by topic, and a weekly plan that works back from your exam date. It uses Claude when an API key is set and a built-in offline generator when not, so the demo works with no sign-up. Accounts run on Supabase, with row-level security on every table, rate limits and PDF validation on the server.",
    stack: "next.js · typescript · supabase (rls) · claude api · tailwind · vitest",
    github: "https://github.com/macroer16/studybuddy",
    live: "https://studybuddy-vb.vercel.app",
    image: "/projects/studybuddy.png",
    featured: true,
  },
  {
    title: "Neon Runner",
    year: "2026",
    description:
      "A synthwave endless runner in the browser: dodge blocks, jump bars, grab coins as it speeds up. Three.js with no game engine and no downloaded assets — a fixed-step game loop, a seeded procedural track, input buffering and coyote time, bloom, and sound synthesised with Web Audio. Unit tests plus a Playwright screenshot harness.",
    stack: "three.js · typescript · vite · web audio · playwright",
    github: "https://github.com/macroer16/neon-runner",
    live: "https://neon-runner-vb.vercel.app",
    image: "/projects/neon-runner.png",
  },
  {
    title: "ApplyTrack",
    year: "2026",
    description:
      "A Chrome extension I use to track my own spring week applications: save a role from the page you're on, move it across a kanban board, get notifications 3 days and 1 day before online tests, and prep with a HireVue question checklist. Everything stays in chrome.storage — no account, no server.",
    stack: "chrome extension (mv3) · react · typescript · vite · tailwind",
    github: "https://github.com/macroer16/applytrack",
    image: "/projects/applytrack.png",
  },
  {
    title: "Due: deadline tracker",
    year: "2026",
    description:
      "A full-stack app for coursework deadlines: Argon2 and JWT login, strict per-user data isolation, urgency labels and a private calendar feed. 54 tests; the API suite runs against SQLite and real PostgreSQL in CI. AWS infrastructure in Terraform — Lambda, API Gateway, CloudWatch alarms, a budget alert and GitHub OIDC deploys with no stored keys.",
    stack: "react · fastapi · postgresql · terraform · aws lambda",
    github: "https://github.com/macroer16/uni-deadline-tracker-api",
  },
  {
    title: "MirrorVerse",
    year: "2026",
    description:
      "An AI hairstyle try-on app: upload a photo and see new styles on yourself before you commit. I grew it a 30K+ following on TikTok by posting short demos and watching what people reacted to.",
    stack: "ai · mobile web · tiktok",
  },
  {
    title: "Cyber Security Readiness Checker",
    year: "2026",
    description:
      "A 10-question self-assessment based on UK Cyber Essentials and the NCSC Small Business Guide, with weighted scoring, a ranked action plan, results by area and saved history. 13 automated tests.",
    stack: "javascript · node test runner · github actions",
    github: "https://github.com/macroer16/cyber-security-readiness-checker",
    live: "https://macroer16.github.io/cyber-security-readiness-checker/",
  },
  {
    title: "Starters and Leavers Access Tracker",
    year: "2026",
    description:
      "Tracks Microsoft 365 access for people joining and leaving: tasks with owners and due dates, sign-off, overdue alerts and an audit log exported to CSV. Built from what I saw on my IT placement. 14 automated tests.",
    stack: "javascript · node test runner · github actions",
    github: "https://github.com/macroer16/employee-access-checklist",
    live: "https://macroer16.github.io/employee-access-checklist/",
  },
  {
    title: "This website (VictorOS)",
    year: "2026",
    description:
      "My portfolio as a working desktop: a live London sky, draggable windows, a terminal with real commands, an in-site browser, live GitHub data and a basketball game.",
    stack: "next.js · typescript · tailwind · vercel",
    github: "https://github.com/macroer16/personal-website",
    live: "https://victor-benson.vercel.app",
  },
  {
    title: "CareCircle",
    year: "2026",
    description:
      "A private shared space for families coordinating care — medications, appointments and notes. Each family's data is protected by PostgreSQL row-level security, covered by 24 tests that found and fixed a real access gap. In progress.",
    stack: "react · supabase · postgres rls · pwa",
    github: "https://github.com/macroer16/carecircle",
    live: "https://carecircle-self.vercel.app",
  },
  {
    title: "Backup Monitor",
    year: "2026",
    description:
      "A nightly GitHub Actions job that backs up all my repos, restore-tests every backup and opens an issue to email me if one fails. 23 tests.",
    stack: "javascript · github actions",
    github: "https://github.com/macroer16/backup-monitoring-dashboard",
    live: "https://macroer16.github.io/backup-monitoring-dashboard/",
  },
  {
    title: "Password & Passphrase Generator",
    year: "2026",
    description: "Secure generation with the Web Crypto API, entropy in bits, and a private breach check via Have I Been Pwned. 18 tests.",
    stack: "javascript · web crypto",
    github: "https://github.com/macroer16/password-generator",
    live: "https://macroer16.github.io/password-generator/",
  },
  {
    title: "How Computers Store Numbers",
    year: "2026",
    description: "An interactive base converter, two's complement and IEEE 754 explorer where you click bits to flip them. 17 tests.",
    stack: "javascript",
    github: "https://github.com/macroer16/number-systems-converter",
  },
];
