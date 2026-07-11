"use server";

import { unstable_cache } from "next/cache";
import { getGithubProjects } from "@/lib/github";
import { Project } from "@/lib/constants";

/**
 * Cached server action — Next.js caches the result of getGithubProjects
 * for 600s (10 min). Subsequent calls within that window skip the
 * GitHub API entirely and return the cached value instantly.
 */
const getCachedProjects = unstable_cache(
  async () => getGithubProjects(),
  ["github-projects"],
  { revalidate: 600 }
);

export async function fetchGithubProjects(): Promise<Project[]> {
  return getCachedProjects();
}
