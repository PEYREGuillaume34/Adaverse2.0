"use client"
import SignIn from "./SignIn";
import SignOutButton from "./SignOutButton";
import SignUp from "./SignUp";
import { CircleUserRound } from "lucide-react";
import FormModal from "../Formulaire/FormModal";

export default function UserSession({session}){
     if(!session){
        return (
            <div className="flex gap-4">
                <SignIn/>
                <SignUp/>
            </div>
        )
     }
     return(
        <div className="flex items-center gap-2">
            <CircleUserRound className="w-6 h-6 text-ada-red"/> 
            <span>{session.name}</span>
             <FormModal />
            <SignOutButton/>
        </div>
     )
}