// Live GitHub data, fetched on the server and cached for an hour (revalidate: 3600)
// so we stay well inside the free API limits.

export type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
};

export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const opts = { headers: { Accept: "application/vnd.github+json" }, next: { revalidate: 3600 } };

export async function getProfile(user: string) {
  try {
    const [u, r] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`, opts),
      fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, opts),
    ]);
    if (!u.ok || !r.ok) return null;
    const profile = await u.json();
    const repos: Repo[] = (await r.json()).filter((x: Repo) => !x.fork && x.name !== user);
    const counts = new Map<string, number>();
    for (const x of repos) if (x.language) counts.set(x.language, (counts.get(x.language) ?? 0) + 1);
    const languages = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([n]) => n);
    return { repos: profile.public_repos as number, languages, latest: repos.slice(0, 4) };
  } catch {
    return null;
  }
}

// Contribution calendar from the free github-contributions-api (it reads the public GitHub profile).
export async function getContributions(user: string): Promise<{ total: number; days: Day[] } | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    const days: Day[] = data.contributions ?? [];
    if (!days.length) return null;
    return { total: data.total?.lastYear ?? days.reduce((s, d) => s + d.count, 0), days };
  } catch {
    return null;
  }
}
