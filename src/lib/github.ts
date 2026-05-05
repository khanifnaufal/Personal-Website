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
    const filteredRepos = repos.filter((repo: any) => repo.topics && repo.topics.includes("portfolio"));

    // Fetch languages for each filtered repo
    const projects = await Promise.all(
      filteredRepos.map(async (repo: any) => {
        try {
          const langRes = await fetch(repo.languages_url, {
            next: { revalidate: 3600 },
            headers: {
              Accept: "application/vnd.github.v3+json",
              "User-Agent": "Portfolio-App",
            },
          });
          
          let languages: string[] = [];
          if (langRes.ok) {
            const langData = await langRes.json();
            // Sort by size and take top 3
            languages = Object.entries(langData)
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .slice(0, 3)
              .map(([lang]) => lang);
          }

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
            languages: languages.length > 0 ? languages : (repo.language ? [repo.language] : []),
            image: `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/screenshot.png`,
          };
        } catch (err) {
          console.error(`Error fetching languages for ${repo.name}:`, err);
          return {
            id: repo.name.toUpperCase().substring(0, 10),
            title: repo.name,
            description: repo.description,
            techStack: repo.topics?.filter((t: string) => t !== "portfolio") || [],
            githubUrl: repo.html_url,
            languages: repo.language ? [repo.language] : [],
            image: `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/screenshot.png`,
          };
        }
      })
    );

    return projects;
  } catch (error) {
    console.error("Failed to fetch GitHub projects:", error);
    return [];
  }
}
