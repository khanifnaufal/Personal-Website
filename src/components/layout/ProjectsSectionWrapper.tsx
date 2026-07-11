import { getGithubProjects } from "@/lib/github";
import ProjectsSection from "@/components/sections/ProjectsSection";

/**
 * Server component — runs on the server, fetch is cached by Next.js
 * (`revalidate: 600` in github.ts). Data is passed as props to the
 * client component, so zero client-side fetching happens on load.
 */
export default async function ProjectsSectionWrapper() {
  const projects = await getGithubProjects();
  return <ProjectsSection initialProjects={projects} />;
}
