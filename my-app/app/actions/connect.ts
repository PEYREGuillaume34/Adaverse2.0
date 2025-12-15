"use server";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signup = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name) {
        redirect("/?form=signup&error=name-missing");
    }

    if (!email) {
        redirect("/?form=signup&error=email-missing");
    }

    if (!password) {
        redirect("/?form=signup&error=password-missing");
    }

    const response = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
        },
        asResponse: true,
    });

    if (!response.ok) {
        const errorData = await response.json();
console.log("ERREUR API :", errorData);
        if (errorData.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
            console.error("Ce compte existe déjà");
            redirect("/?form=signup&error=USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL");
        } 
        else if (errorData.code === "PASSWORD_TOO_SHORT"){
            console.error("Mot de passe trop court ");
            redirect("/?form=signup&error='PASSWORD_TOO_SHORT'")

        }
        
        else
         {
            console.error("Echec de l'inscription:", errorData.message);
            redirect("/?form=signup&error=generic");
        }
    }

    redirect("/"); // on redirige vers la home page une fois connecté
};

export const signin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email) {
        redirect("/?form=signin&error=email-missing");
    }

    if (!password) {
        redirect("/?form=signin&error=password-missing");
    }

    const response = await auth.api.signInEmail({
        body: {
            email,
            password,
        },
        asResponse: true,
    });

    if (!response.ok) {
        const errorData = await response.json();
console.log("ERREUR API :", errorData);
       if (errorData.code === "INVALID_EMAIL_OR_PASSWORD") {
        redirect("/?form=signin&error=invalid-credentials"); 
    } 
 else {
            console.error("Echec de la connexion:", errorData.message);
            redirect("/?form=signin&error=generic");
        }
    }

    redirect("/"); // on redirige vers la home page une fois connecté
};

export const signout = async () => {
    await auth.api.signOut({ headers: await headers() }); // attention à bien passer les headers!
};