"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
type Props = {
  isAdmin: boolean;
};


export default function Sidebar({ isAdmin }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cerrar menú al redimensionar en pantallas grandes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cerrar menú con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const linkClass =
    "flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors";

  return (
    <div className="md:hidden">
      {/* Botón para abrir el menú */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="text-gray-600 hover:text-teal-500 p-2"
        aria-label="Abrir menú de navegación"
      >
        <FiMenu className="w-7 h-7" />
      </button>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 transition-opacity duration-300 opacity-100">
          {/* Fondo oscuro */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Contenido del menú */}
          <div
            role="dialog"
            aria-modal="true"
            className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 translate-x-0"
          >
            <div className="p-6 h-full flex flex-col">
              {/* Encabezado */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-semibold text-gray-800">Menú</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-500 hover:text-teal-500"
                  aria-label="Cerrar menú"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Enlaces */}
              <nav className="flex-1">
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/aboutus"
                      className={linkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Quienes Somos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ourdesigns"
                      className={linkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Nuestros Diseños
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contacform"
                      className={linkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contáctanos
                    </Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link
                        href="/login"
                        className={linkClass}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Ingresar
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


