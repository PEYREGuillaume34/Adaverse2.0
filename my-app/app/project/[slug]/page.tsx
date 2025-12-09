import { getProjectBySlug } from "../../actions/project"
import Link from "next/link"
import ProjectImage from "../../components/ProjectImage"

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-ada-dark mb-4">
                        Projet non trouvé 😕
                    </h1>
                    <Link
                        href="/"
                        className="inline-block bg-ada-red hover:bg-ada-coral text-white font-semibold px-6 py-3 rounded-lg transition-all"
                    >
                        ← Retour à l'accueil
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-ada-bg">
            {/* Header avec logo cliquable */}
            <header className="bg-white shadow-md">
                <div className="max-w-5xl mx-auto px-4 py-6">
                    {/* Logo/Titre style Ada */}

                    <h1 className="text-4xl font-futura" >
                        <Link href="/">
                            <span className="text-ada-dark font-bold">ada</span>
                            <span className="text-ada-red font-normal">verse</span>
                        </Link>
                    </h1>

                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-12">

                {/* Image */}
                <div className="bg-white rounded-2xl shadow-xl  mb-6">
                    <ProjectImage
                        githubUrl={project.students_projects.github_url}
                        projectName={project.students_projects.name}
                        height="h-96"
                    />

                    {/* Infos avec le nom du projet comme titre */}
                    <div className="bg-white flex flex-col rounded-2xl shadow-xl p-8 mb-15">
                        <h3 className="text-4xl flex flex-wrap font-oswald-regular justify-center text-ada-dark mb-6">
                            Nom du projet : <span className="text-4xl font-oswald-bold ml-2">{project.students_projects.name}</span>
                        </h3>

                        <div className="grid grid-cols-3 divide-x divide-gray-300">
                            {/* Promotion */}
                            <div className="text-center px-4">
                                <p className="text-sm text-gray-500 font-semibold mb-2">
                                    🎓 Promotion
                                </p>
                                <p className="text-lg font-bold text-ada-dark">
                                    {project.promotions?.name || "Non spécifiée"}
                                </p>
                            </div>

                            {/* Projet Ada */}
                            <div className="text-center px-4">
                                <p className="text-sm text-gray-500 font-semibold mb-2">
                                    📚 Projet Ada
                                </p>
                                <p className="text-lg font-bold text-ada-dark">
                                    {project.ada_projects?.name || "Non spécifié"}
                                </p>
                            </div>

                            {/* Date de publication */}
                            <div className="text-center px-4">
                                <p className="text-sm text-gray-500 font-semibold mb-2">
                                    📅 Publié le
                                </p>
                                <p className="text-lg font-bold text-ada-dark">
                                    {project.students_projects.published_at
                                        ? new Date(project.students_projects.published_at).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })
                                        : 'Date non disponible'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href={project.students_projects.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-ada-dark hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-center"
                    >
                        📂 Voir sur GitHub
                    </a>

                    {project.students_projects.demo_url && (
                        <a
                            href={project.students_projects.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-ada-red hover:bg-ada-coral text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-center"
                        >
                            🚀 Voir la démo
                        </a>
                    )}
                </div>
            </main>
        </div>
    )
}