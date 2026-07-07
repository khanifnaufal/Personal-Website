import { getGithubProjects } from "@/lib/github";
import RedesignShell from "@/components/sections-v2/RedesignShell";

/**
 * Server Component — Next.js fetches GitHub data here (with revalidate: 600
 * set inside getGithubProjects). The client shell receives the data as props,
 * so there is zero client-side GitHub API call on page load.
 */
export default async function RedesignPage() {
  const projects = await getGithubProjects();

  return <RedesignShell projects={projects} />;
}
