"use client";

import { useState } from "react";
import FormModal from "./Formulaire/FormModal";
import ProjectList from "./ProjectList";
import type { ProjectWithRelations, Promotion } from "@/app/types";

type Props = {
  projects: ProjectWithRelations[];
  promos: Promotion[];
};

export default function FilterData({ projects, promos }: Props) {
  const [selectedPromo, setSelectedPromo] = useState("");

  const filteredProjects = projects.filter((project) => {
    if (selectedPromo === "") return true;
    return project.promotion?.id === Number(selectedPromo);
  });


  return (
    <div>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo/Titre style Ada */}
            <h1 className="text-5xl font-futura" >
            <a href="/">
            <span className="text-ada-dark font-bold">ada</span>
            <span className="text-ada-red font-normal text-5xl">verse</span>
            </a>
          </h1>

          <div className="flex items-center gap-3">
            {/* Filtre promo */}
            <select
              value={selectedPromo}
              onChange={(e) => setSelectedPromo(e.target.value)}
              className="font-oswald-semibold border-2 border-gray-300 rounded-lg px-4 py-2.5 bg-white text-ada-dark focus:outline-none focus:border-ada-red focus:ring-2 focus:ring-ada-red/20 transition-all cursor-pointer"
            >
              <option className="font-oswald-semibold" value="">TOUTES LES PROMOS ⭐</option>
              {promos.map((promo) => (
                <option className="font-oswald-regular" key={promo.id} value={promo.id}>
                  {promo.name}
                </option>
              ))}
            </select>

            {/* Bouton Proposer */}
            <FormModal />
          </div>
        </div>
      </header>

      {/* Liste des projets */}
      <ProjectList projects={filteredProjects} />
    </div>
  );
}






