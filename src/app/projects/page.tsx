import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TopBar from "@/components/TopBar";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Everything Victor Benson has built, from cloud tools to AI apps.",
};

export default function ProjectsPage() {
  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-[850px] px-5 pb-40 pt-16">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
        <p className="mt-10 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-faint">
          <span className="h-px w-5 bg-faint/60" />Builds
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-fg">All Projects</h1>
        <p className="mt-2 text-muted">Shipped, in progress, and the first things I ever put online.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>
      </main>
    </>
  );
}
