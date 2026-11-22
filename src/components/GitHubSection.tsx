import { getGitHubStats } from "@/lib/github";
import { site } from "@/data/site";

// Server component: runs on the server, so the GitHub API is called from Vercel, not the browser.
export default async function GitHubSection() {
  const stats = await getGitHubStats(site.githubUser);

  return (
    <div className="space-y-8">
      {stats ? (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label="Public repos" value={stats.publicRepos} />
            <Stat label="Followers" value={stats.followers} />
            <Stat label="Top language" value={stats.topLanguages[0]?.name ?? "—"} />
          </div>

          {stats.latest.length > 0 && (
            <ul className="grid gap-4 sm:grid-cols-2">
              {stats.latest.map((r) => (
                <li key={r.name}>
                  <a
                    href={r.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl border border-white/10 p-4 transition hover:border-accent/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-white">{r.name}</span>
                      <span className="text-xs text-neutral-500">★ {r.stargazers_count}</span>
                    </div>
                    {r.description && <p className="mt-1 line-clamp-2 text-sm text-neutral-400">{r.description}</p>}
                    {r.language && <p className="mt-2 font-mono text-[11px] text-accent">{r.language}</p>}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p className="text-neutral-400">GitHub stats are taking a break — see everything on my profile instead.</p>
      )}

      {/* Contribution graph image from a free open-source service. */}
      <a href={site.github} target="_blank" rel="noreferrer" className="block overflow-x-auto rounded-xl border border-white/10 p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://ghchart.rshah.org/7c5cff/${site.githubUser}`}
          alt={`GitHub contribution graph for ${site.githubUser}`}
          className="min-w-[640px] w-full"
          loading="lazy"
        />
      </a>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-neutral-500">{label}</p>
    </div>
  );
}
