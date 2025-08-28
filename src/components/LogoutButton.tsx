"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@lib/supabase/client";

const supabase = createClient();

export default function LogoutButton() {
    const [loading, setLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleLogout = async () => {
        setLoading(true);

        // Animación de salida
        if (buttonRef.current) {
            buttonRef.current.style.transform = "translateY(100px)";
            buttonRef.current.style.opacity = "0";
        }

        await new Promise(resolve => setTimeout(resolve, 800));
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    return (
        <motion.button
            ref={buttonRef}
            onClick={handleLogout}
            disabled={loading}
            className="relative overflow-hidden px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            {/* Efecto de fondo animado */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </AnimatePresence>

            {/* Efecto de partículas al hacer hover */}
            <AnimatePresence>
                {isHovered && (
                    <>
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white rounded-full opacity-70"
                                initial={{
                                    scale: 0,
                                    x: Math.random() * 100 - 50,
                                    y: Math.random() * 100 - 50
                                }}
                                animate={{
                                    scale: 1,
                                    x: Math.random() * 100 - 50,
                                    y: Math.random() * 100 - 50
                                }}
                                exit={{ scale: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.1
                                }}
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                }}
                            />
                        ))}
                    </>
                )}
            </AnimatePresence>

            {/* Contenido del botón */}
            <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                    <>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full"
                        />
                        Cerrando...
                    </>
                ) : (
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        Cerrar Sesión
                    </>
                )}
            </div>

            {/* Efecto de pulso al hacer hover */}
            <AnimatePresence>
                {isHovered && !loading && (
                    <motion.div
                        className="absolute inset-0 border-2 border-white rounded-lg"
                        initial={{ scale: 1, opacity: 0.7 }}
                        animate={{ scale: 1.3, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                )}
            </AnimatePresence>
        </motion.button>
    );
}