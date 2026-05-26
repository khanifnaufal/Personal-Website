import SceneLoader from "@/components/three/SceneLoader";
import HomeClient from "@/components/ui/HomeClient";
import { getGithubProjects } from "@/lib/github";

export default async function Home() {
  const githubProjects = await getGithubProjects();

  return (
    <main className="relative">
      {/* Fixed 3D background */}
      <SceneLoader />

      {/* Client interface and sections coordination */}
      <HomeClient githubProjects={githubProjects} />
    </main>
  );
}
