import type { Metadata } from "next";
import { Header, Block, Footer } from "@/components/Frame";
import ProjectEntry from "@/components/ProjectEntry";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Everything Victor Benson has built, from cloud deployments to AI apps.",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <Block title="everything i've built">
          <p className="mb-10 text-soft">Newest first. Some are big, some were just how I learned something.</p>
          <div className="divide-y divide-dashed divide-rule">
            {projects.map((p, i) => <ProjectEntry key={p.title} p={p} fig={p.image ? i + 1 : undefined} />)}
          </div>
        </Block>
      </main>
      <Footer />
    </>
  );
}
