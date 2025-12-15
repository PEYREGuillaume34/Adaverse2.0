"use client";
import { signin } from "@/app/actions/connect";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import React from "react";

export default function SignIn() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const form = searchParams.get("form")

  React.useEffect(() => {
    if (error&& form==="signin") {
      setIsOpen(true);
    }
  }, [error, form]);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await signin(formData);
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="w-full bg-ada-red hover:bg-ada-coral text-white font-black py-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all mt-6 font-oswald-bold text-2xl"
        onClick={() => setIsOpen(true)}
      >
        se connecter
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in">
          <form
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all relative"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSubmit(formData);
            }}
          >
            <button
              type="button"
              className="absolute top-4 right-4 w-10 h-10 bg-ada-red hover:bg-ada-coral text-white font-black rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all font-oswald-bold text-xl"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>

            <h2 className="text-2xl font-oswald-bold text-ada-red mb-6">Connexion</h2>

{error === "invalid-credentials" && (
  <div className="mb-4 p-3 bg-red-100 border-2 border-ada-red text-ada-red rounded-lg text-sm font-bold">
    Email ou mot de passe incorrect !
  </div>
)}

            {error === "generic" && (
              <div className="mb-4 p-3 bg-red-100 border-2 border-ada-red text-ada-red rounded-lg text-sm font-bold">
                Une erreur est survenue
              </div>
            )}

            <label className="block font-oswald-regular mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="font-oswald-regular w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-ada-red focus:ring-2 focus:ring-ada-red/20 transition-all mb-4"
              required
            />

            <label className="block font-oswald-regular mb-2">Mot de passe</label>
            <input
              type="password"
              name="password"
              className="font-oswald-regular w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-ada-red focus:ring-2 focus:ring-ada-red/20 transition-all mb-4"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ada-red hover:bg-ada-coral text-white font-black py-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all mt-6 font-oswald-bold text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Chargement..." : "valider"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}