import { Project } from "./constants";

function githubHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Portfolio-App",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

/** Fetch with an absolute timeout so we never hang more than `ms` ms. */
async function fetchWithTimeout(url: string, options: RequestInit, ms = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

export async function getGithubProjects(): Promise<Project[]> {
  const username = "khanifnaufal";
  const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

  try {
    const res = await fetchWithTimeout(
      url,
      {
        next: { revalidate: 600 },
        headers: githubHeaders(),
      },
      8000
    );

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const repos = await res.json();

    // Filter repos that have 'portfolio' in their topics
    const filteredRepos = repos.filter((repo: any) => repo.topics && repo.topics.includes("portfolio"));

    const projects = filteredRepos.map((repo: any) => {
      // Use the primary language from the repos response directly.
      // This avoids N separate language API calls that cause rate-limit issues.
      const primaryLang = repo.language ? [repo.language] : [];

      return {
        id: repo.name.toUpperCase().substring(0, 10),
        title: repo.name
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l: string) => l.toUpperCase()),
        description: repo.description || "Mission details encrypted or not provided.",
        techStack: repo.topics
          ? repo.topics.filter((t: string) => t !== "portfolio")
          : [],
        liveUrl: repo.homepage || null,
        githubUrl: repo.html_url,
        languages: primaryLang,
        image: `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/screenshot.png`,
      };
    });

    return projects;
  } catch (error) {
    console.error("Failed to fetch GitHub projects:", error);
    return [];
  }
}
