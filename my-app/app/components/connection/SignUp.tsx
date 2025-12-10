"use client"
import { signup } from "@/app/actions/connect";
import { useState } from "react";

export default function SignUp() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button onClick={() => setIsOpen(true)}>s'inscrire</button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in"><button onClick={() => setIsOpen(false)}>x</button>
                    <form action={signup}>
                        <input type="text" name="name"></input>
                        <input type="email" name="email"></input>
                        <input type="password" name="password"></input>
                        <button type="submit">s'inscrire</button>
                    </form>
                </div>)}
        </>
    );
}