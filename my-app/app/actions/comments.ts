"use server"


import { revalidatePath } from "next/cache";
import { db } from "../lib/db/drizzle";
import { commentsTable, user } from "../lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "../lib/auth";
import { headers } from "next/headers";

// Ajouter un commentaire
export async function addComment (formData: FormData) {
    const comment = formData.get("comment") as string
    const userId = formData.get("userId") as string
    const projectId = formData.get("projectId") as string

    if (!comment || !userId || !projectId) {
        throw new Error ("Le message ne peut pas être vide")
    }

    try {
        await db.insert(commentsTable).values({
            message: comment,
            user_id: userId,
            project_id: Number(projectId)
        })
    revalidatePath('/project', 'layout')
    } catch (error) {
        console.error("Erreur lors de publication de message", error)
    }
}

// Supprimer un commentaire
export async function deleteComment(commentId: number) {
    // 1. Vérifier que l'utilisateur est connecté
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        throw new Error("Vous devez être connecté");
    }

    // 2. Vérifier que le commentaire appartient à l'utilisateur
    const comment = await db.select()
        .from(commentsTable)
        .where(eq(commentsTable.id, commentId))
        .limit(1);

    if (!comment[0]) {
        throw new Error("Commentaire introuvable");
    }

    if (comment[0].user_id !== session.user.id) {
        throw new Error("Vous ne pouvez supprimer que vos propres commentaires");
    }

    // 3. Supprimer le commentaire
    await db.delete(commentsTable)
        .where(eq(commentsTable.id, commentId));

    revalidatePath("/project/[slug]");
}

// Modifier un commentaire
export async function updateComment(commentId: number, newMessage: string) {
    // 1. Vérifier que l'utilisateur est connecté
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        throw new Error("Vous devez être connecté");
    }

    // 2. Vérifier que le message n'est pas vide
    if (!newMessage || newMessage.trim() === "") {
        throw new Error("Le commentaire ne peut pas être vide");
    }

    // 3. Vérifier que le commentaire appartient à l'utilisateur
    const comment = await db.select()
        .from(commentsTable)
        .where(eq(commentsTable.id, commentId))
        .limit(1);

    if (!comment[0]) {
        throw new Error("Commentaire introuvable");
    }

    if (comment[0].user_id !== session.user.id) {
        throw new Error("Vous ne pouvez modifier que vos propres commentaires");
    }

    // 4. Mettre à jour le commentaire
    await db.update(commentsTable)
        .set({ message: newMessage })
        .where(eq(commentsTable.id, commentId));

    revalidatePath("/project/[slug]");
}


// Supprimer un commentaire (admin uniquement)
export async function deleteCommentAdmin(commentId: number) {
    // 1. Vérifier que l'utilisateur est connecté
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        throw new Error("Vous devez être connecté");
    }

    // 2. Vérifier que l'utilisateur est admin
    const userInfo = await db.select()
        .from(user)
        .where(eq(user.id, session.user.id))
        .limit(1);

    if (!userInfo[0]?.isAdmin) {
        throw new Error("Action réservée aux administrateurs");
    }

    // 3. Vérifier que le commentaire existe
    const comment = await db.select()
        .from(commentsTable)
        .where(eq(commentsTable.id, commentId))
        .limit(1);

    if (!comment[0]) {
        throw new Error("Commentaire introuvable");
    }

    // 4. Supprimer le commentaire (pas de vérification du propriétaire)
    await db.delete(commentsTable)
        .where(eq(commentsTable.id, commentId));

    revalidatePath("/project/[slug]");
}

