import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Everything Victor Benson has built, from cloud tools to AI apps.",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-5 py-16">
        <Link href="/" className="text-sm text-neutral-400 hover:text-white">← Back home</Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">All projects</h1>
        <p className="mt-3 max-w-2xl text-neutral-400">
          Shipped, in progress and coming next. Each one has a README, a live link and the code on GitHub when it&apos;s done.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>
      </main>
    </>
  );
}
