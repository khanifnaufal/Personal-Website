import { Project } from "./constants";

export async function getGithubProjects(): Promise<Project[]> {
  const username = "khanifnaufal";
  // We fetch up to 100 repos to find all with the 'portfolio' topic
  const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, 
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-App",
      },
    });

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const repos = await res.json();

    // Filter repos that have 'portfolio' in their topics
    // If no repos have 'portfolio' topic, this will return an empty array
    return repos
      .filter((repo: any) => repo.topics && repo.topics.includes("portfolio"))
      .map((repo: any) => ({
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
        language: repo.language,
        // Kita asumsikan ada file screenshot.png di root repository
        image: `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/screenshot.png`,
      }));
  } catch (error) {
    console.error("Failed to fetch GitHub projects:", error);
    return [];
  }
}
