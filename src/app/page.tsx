import HomeClient from "@/components/ui/HomeClient";
import { getGithubProjects } from "@/lib/github";

export default async function Home() {
  const githubProjects = await getGithubProjects();

  return (
    <main className="relative">
      {/* Fixed placeholder for 3D background replacement */}
      <div className="fixed inset-0 pointer-events-none" />

      {/* Client interface and sections coordination */}
      <HomeClient githubProjects={githubProjects} />
    </main>
  );
}
