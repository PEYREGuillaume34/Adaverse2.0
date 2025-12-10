"use client";

import Link from "next/link";
import type { ProjectWithRelations } from "@/app/types";
import ProjectCardAdmin from "./ProjectCardAdmin";
import ProjectImage from "./ProjectImage";

type Props = {
  project: ProjectWithRelations;
};

export default function ProjectCard({ project }: Props) {
  const isPublished = !!project.published_at; // const isPublished = Boolean(project.students_projects.published_at);

  return isPublished ? (
    // 🟢 VERSION PUBLIÉE
    <Link
      href={`/project/${project.slug}`}
      className={`group block bg-white rounded-xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 border-2 relative hover:-translate-y-1 border-white cursor-pointer`}
    >
      {/* Image - UTILISE LE COMPOSANT */}
      <div className="group-hover:scale-110 transition-transform duration-500">
        <ProjectImage
          githubUrl={project.github_url}
          projectName={project.name}
          height="h-48"
        />
      </div>

      {/* Badge promo en overlay */}
      <div className="absolute top-3 right-3 z-10">
        <span className="inline-block bg-ada-red text-white text-xs font-bold px-3 py-1.5 rounded  shadow-lg">
          {project.name || "?"}
        </span>
      </div>

      {/* Contenu */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3 transition-colors text-ada-dark group-hover:text-ada-red">
          {project.name}
        </h3>

        <p className="text-sm text-gray-500 flex items-center gap-2">
          <span>📅</span>
          {isPublished && project.published_at
            ? new Date(project.published_at).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "En attente de publication"}
        </p>
        {/* ✅ AJOUT : Nombre de commentaires */}
        <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">
          <span>💬</span>
          {project.comments_count}{" "}
          {project.comments_count > 1 ? "commentaires" : "commentaire"}
        </p>

        <div className="mt-4 flex items-center text-ada-red font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Voir le projet
          <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </div>
    </Link>
  ) : (
    // 🟡 VERSION NON PUBLIÉE
    <div className="group block bg-white rounded-xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 border-2 relative opacity-60 border-dashed border-yellow-400 cursor-default">
      {/* Badge "En attente" si non publié */}
      <div className="absolute top-3 left-3 z-10">
        <span className="inline-block bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
          ⏳ En attente de validation
        </span>
      </div>

      {/* Image - UTILISE LE COMPOSANT */}
      <div>
        <ProjectImage
          githubUrl={project.github_url}
          projectName={project.name}
          height="h-48"
        />
      </div>

      {/* Badge promo en overlay */}
      <div className="absolute top-3 right-3 z-10">
        <span className="inline-block bg-ada-red text-white text-xs font-bold px-3 py-1.5 rounded  shadow-lg">
          {project.promotion?.name || "?"}
        </span>
      </div>

      {/* Contenu */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3 transition-colors text-gray-600">
          {project.name}
        </h3>

        <p className="text-sm text-gray-500 flex items-center gap-2">
          <span>📅</span>
          En attente de publication
        </p>

        {/* Boutons Admin */}
        <ProjectCardAdmin projectId={project.id} />
      </div>
    </div>
  );
}
