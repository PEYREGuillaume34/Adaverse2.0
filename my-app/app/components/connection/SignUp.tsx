"use client";
import { signup } from "@/app/actions/connect";
import { useState } from "react";

export default function SignUp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="w-full bg-ada-red hover:bg-ada-coral text-white font-black py-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all mt-6 font-oswald-bold text-2xl"
        onClick={() => setIsOpen(true)}
      >
        s'inscrire
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in">
          <form
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all relative"
            action={signup}
          >
            <button
              className="w-full bg-ada-red hover:bg-ada-coral text-white font-black py-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all mt-6 font-oswald-bold text-2xl"
              onClick={() => setIsOpen(false)}
            >
              x
            </button>
            <label>Nom</label>
            <input
              type="text"
              name="name"
              className="font-oswald-regular w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-ada-red focus:ring-2 focus:ring-ada-red/20 transition-all"
            ></input>
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="font-oswald-regular w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-ada-red focus:ring-2 focus:ring-ada-red/20 transition-all"
            ></input>
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              className="font-oswald-regular w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-ada-red focus:ring-2 focus:ring-ada-red/20 transition-all"
            ></input>
            <button
              type="submit"
              className="w-full bg-ada-red hover:bg-ada-coral text-white font-black py-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all mt-6 font-oswald-bold text-2xl"
            >
              valider
            </button>
          </form>
        </div>
      )}
    </>
  );
}
