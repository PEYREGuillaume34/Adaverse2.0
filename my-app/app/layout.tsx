import type { Metadata } from "next";
import "./globals.css";
import SignUp from "./components/connection/SignUp";
import SignIn from "./components/connection/SignIn";
import SignOutButton from "./components/connection/SignOutButton";
import { auth } from "./lib/auth";
import { headers } from "next/headers";


export const metadata: Metadata = {
  title: "Adaverse",
  description: "Group project by Guigui, Ursula, Flo et Xinzhu",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({headers: await headers()});

  
  return (
    <html lang="en">
      <body
      > 
      <nav className= "flex flex-row justify-end gap-4 p-4">
           {session ? (
            // Si connecté : afficher le bouton de déconnexion
            <SignOutButton />
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
