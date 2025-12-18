"use server"

import { auth } from "@/app/lib/auth";
import {  headers } from "next/headers";
import { db } from "../lib/db/drizzle";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";
import { user } from "../lib/db/schema";

// Ban un user
export async function banishUser(userId: string) {
    // 1. Vérifier que l'utilisateur est connecté
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        throw new Error("Vous devez être connecté");
    }

    // 3. Vérifier l'id de l'utilisateur
    const userToBanish = await db.select()
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);

    if (!userToBanish[0]) {
        throw new Error("Utilisateur introuvable");
    }

    // 4. Mettre à jour le statut de l'utilisateur
    await db.update(user)
        .set({ isBanished: true })
        .where(eq(user.id, userId));
        
        revalidatePath("/project/[slug]");
    
    
}