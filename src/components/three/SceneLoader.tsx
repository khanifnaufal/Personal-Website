"use client";

import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";

const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function SceneLoader() {
  return <Scene />;
}
