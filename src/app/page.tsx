import Link from "next/link";
import Desktop from "@/components/os/Desktop";
import { site } from "@/data/site";
import { getContributions, getProfile } from "@/lib/github";

export const revalidate = 3600; // refresh GitHub data at most once an hour

export default async function Home() {
  const [profile, contributions] = await Promise.all([getProfile(site.githubUser), getContributions(site.githubUser)]);
  const refreshed = new Date().toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Plain summary for search engines and screen readers; the desktop is the visual version. */}
      <div className="sr-only">
        <h1>Victor Benson — Computer Science student & cloud builder</h1>
        <p>First-year BSc Computer Science student at the University of Westminster, London. AWS Certified Solutions Architect – Associate. Open to spring weeks and summer internships in software engineering and cloud.</p>
        <Link href="/plain">Read the plain version of this site</Link>
        <a href={`mailto:${site.email}`}>Email Victor</a>
      </div>
      <Desktop data={{ contributions, repos: profile?.latest ?? [], repoCount: profile?.repos ?? null, refreshed }} />
    </>
  );
}
