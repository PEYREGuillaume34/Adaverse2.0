import { getAllProjects, getPromotions } from "./actions/project";
import FilterData from "./components/FilterData";

export default async function Home() {
  const projects = await getAllProjects();
  const promos = await getPromotions();
  console.log("projects", projects)
  return (
    <div>
      <FilterData 
        projects={projects}
        promos={promos}
      />
    </div>
  );
}