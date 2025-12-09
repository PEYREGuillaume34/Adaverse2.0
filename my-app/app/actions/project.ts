"use server"

import { revalidatePath } from "next/cache";
import { db } from "../lib/db/drizzle";
import { projectsTable, adaTable, promotionsTable } from "../lib/db/schema";
import { eq, desc } from "drizzle-orm";

// ==================== HELPER ====================

// Fonction pour générer un slug depuis un texte
function generateSlug(text: string): string {
    return text
        .toLowerCase()                    // minuscules
        .normalize('NFD')                 // décompose les accents
        .replace(/[\u0300-\u036f]/g, '')  // enlève les accents
        .replace(/[^a-z0-9]+/g, '-')      // remplace caractères spéciaux par -
        .replace(/^-+|-+$/g, '')          // enlève les - au début/fin
}

// ==================== MUTATIONS ====================

export async function addProject(formData: FormData) {
    const name = formData.get("name") as string
    const githubLink = formData.get("github_url") as string
    const demoLink = formData.get("demo_url") as string
    const promoId = formData.get("promoId") as string
    const adaProjectId = formData.get("adaProjectId") as string

    if (!name || !githubLink || !demoLink || !promoId || !adaProjectId) {
        throw new Error("Tous les champs sont obligatoires")
    }

    await db.insert(projectsTable).values({
        name,
        slug: generateSlug(name),
        github_url: githubLink,
        demo_url: demoLink,
        promotion_id: Number(promoId),
        ada_project_id: Number(adaProjectId),
        published_at: null, // Par défaut non publié
    })

    revalidatePath("/")
}

export async function publishProject(projectId: number) {
    await db.update(projectsTable)
        .set({ published_at: new Date() })
        .where(eq(projectsTable.id, projectId))
    
    revalidatePath("/")
}

export async function deleteProject(projectId: number) {
    await db.delete(projectsTable)
        .where(eq(projectsTable.id, projectId))
    
    revalidatePath("/")
}

// ==================== QUERIES ====================

// Récupérer TOUS les projets (publiés ET non publiés)
export async function getAllProjects() {
    return await db.select()
        .from(projectsTable)
        .leftJoin(promotionsTable, eq(promotionsTable.id, projectsTable.promotion_id))
        .leftJoin(adaTable, eq(adaTable.id, projectsTable.ada_project_id))
        .orderBy(desc(projectsTable.published_at)) // Plus récents en premier
}

export async function getProjectBySlug(slug: string) {
    const result = await db.select()
        .from(projectsTable)
        .leftJoin(promotionsTable, eq(promotionsTable.id, projectsTable.promotion_id))
        .leftJoin(adaTable, eq(adaTable.id, projectsTable.ada_project_id))
        .where(eq(projectsTable.slug, slug))
    console.log("voir result ", result[0]);
    return result[0] || null
}


export async function getPromotions() {
    return await db.select().from(promotionsTable)
}

export async function getAdaProjects() {
    return await db.select().from(adaTable)
}

