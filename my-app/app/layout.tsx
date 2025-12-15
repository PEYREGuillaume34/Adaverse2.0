import type { Metadata } from "next";
import "./globals.css";
import SignUp from "./components/connection/SignUp";
import SignIn from "./components/connection/SignIn";
import SignOutButton from "./components/connection/SignOutButton";
import { auth } from "./lib/auth";
import { headers } from "next/headers";
import FormModal from "./components/Formulaire/FormModal";
import NavSelect from "./components/NavSelect";

export const metadata: Metadata = {
  title: "Adaverse",
  description: "Group project by Guigui, Ursula, Flo et Xinzhu",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <html lang="en">
      <body>
        <nav className="flex justify-end items-baseline gap-4 p-4">
          {/* Logo/Titre style Ada */}
          <h1 className="text-5xl font-futura mr-auto">
            <a href="/">
              <span className="text-ada-dark font-bold">ada</span>
              <span className="text-ada-red font-normal text-5xl">verse</span>
            </a>
          </h1>

          <NavSelect />

          {/* Si connecté : afficher le bouton de déconnexion */}
          {session ? (
            <>
            <FormModal />
              <SignOutButton />
            </>
          ) : (
            // Si non connecté : afficher inscription + connexion
            <>
              <SignUp />
              <SignIn />
            </>
          )}
        </nav>

        {children}
      </body>
    </html>
  );
}
