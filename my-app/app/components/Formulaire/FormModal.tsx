"use client"

import { getPromotions, getAdaProjects } from "../../actions/project";
import { useState, useEffect } from "react";
import Formulaire from "./Formulaire";
import type { Promotion, AdaProject } from "@/app/types";

export default function FormModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [promos, setPromos] = useState<Promotion[]>([]);
    const [adaProjects, setAdaProjects] = useState<AdaProject[]>([]);

    useEffect(() => {
        if (isOpen) {
            getPromotions().then(setPromos)
            getAdaProjects().then(setAdaProjects)
        }
    }, [isOpen])

    return (
        <div>
            {/* Bouton style Ada avec effet hover */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-ada-red hover:bg-ada-coral text-white font-oswald font-oswald-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
                <span>✨</span>
                PROPOSER UN PROJET
            </button>
            
            {isOpen && (
                <Formulaire 
                    promos={promos} 
                    adaProjects={adaProjects} 
                    setIsOpen={setIsOpen} 
                />
            )}
        </div>
    )
}

