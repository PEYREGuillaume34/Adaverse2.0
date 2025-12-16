import type { Metadata } from "next";
import "./globals.css";
import { auth } from "./lib/auth";
import { headers } from "next/headers";
import FormModal from "./components/Formulaire/FormModal";
import NavSelect from "./components/NavSelect";
import SignIn from "./components/connection/SignIn";
import SignOutButton from "./components/connection/SignOutButton";
import SignUp from "./components/connection/SignUp";
import UserSession from "./components/connection/UserSession";

export const metadata: Metadata = {
  title: "Adaverse",
  description: "Group project by Guigui, Ursula, Flo et Xinzhu",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rawSession = await auth.api.getSession({ headers: await headers() });
 const session = rawSession?.user
  ? { id: rawSession.user.id, name: rawSession.user.name, email: rawSession.user.email }
  : null;

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
            <UserSession session={session}/>
          
        </nav>

        {children}
      </body>
    </html>
  );
}
