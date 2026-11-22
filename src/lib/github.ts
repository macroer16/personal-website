// Fetches public data from the GitHub REST API on the server.
// `revalidate: 3600` means Next.js caches the result and refreshes it at most once an hour,
// so we stay well inside GitHub's 60 requests/hour limit for unauthenticated calls.

export type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
};

export type GitHubStats = {
  publicRepos: number;
  followers: number;
  topLanguages: { name: string; count: number }[];
  latest: Repo[];
};

export async function getGitHubStats(user: string): Promise<GitHubStats | null> {
  try {
    const headers = { Accept: "application/vnd.github+json" };
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);
    if (!userRes.ok || !reposRes.ok) return null;

    const profile = await userRes.json();
    const repos: Repo[] = (await reposRes.json()).filter((r: Repo) => !r.fork);

    // Count how many repos use each language and keep the top five.
    const counts = new Map<string, number>();
    for (const r of repos) {
      if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    }
    const topLanguages = [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      publicRepos: profile.public_repos ?? repos.length,
      followers: profile.followers ?? 0,
      topLanguages,
      latest: repos.slice(0, 6),
    };
  } catch {
    // Network or API errors: the page shows a friendly fallback instead of breaking.
    return null;
  }
}
