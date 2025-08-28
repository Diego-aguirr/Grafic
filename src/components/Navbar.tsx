"use client";

import Link from "next/link";
import Sidebar from "./Sidebar";
import { FiUser } from "react-icons/fi";

type Props = {
  isAdmin: boolean;
};

export default function Navbar({ isAdmin }: Props) {
  return (
    <header className="bg-white py-4 px-6 md:py-6 md:px-8 flex justify-between items-center shadow-md fixed w-full z-50">
      {/* Logo   */}
      <Link href="/" className="flex items-center">
        <div className="bg-pink-100 px-4 py-2 rounded-2xl shadow-sm hover:bg-pink-200 transition-all duration-300 group relative">
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tighter">
              Lo
            </span>
            <span className="text-2xl md:text-3xl font-semibold text-gray-700 -ml-1">
              GO
            </span>
          </div>
          <div className="absolute -bottom-1 right-4 w-3 h-1 bg-pink-400 rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      {/* Navegación Desktop  */}

      <nav aria-label="Navegación principal" className="hidden md:block">
        <ul className="flex space-x-6 lg:space-x-8 xl:space-x-10">
          <li>
            <Link
              href="/aboutus"
              className="relative inline-block py-2 px-1 text-gray-700 hover:text-teal-600 transition-colors
                        text-sm lg:text-base xl:text-lg font-medium
                        before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 
                        before:h-[2px] before:bg-teal-500 before:transition-all before:duration-300
                        hover:before:w-full"
            >
              Quienes Somos
            </Link>
          </li>

          <li>
            <Link
              href="/ourdesigns/"
              className="relative inline-block py-2 px-1 text-gray-700 hover:text-teal-600 transition-colors
                        text-sm lg:text-base xl:text-lg font-medium
                        before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 
                        before:h-[2px] before:bg-teal-500 before:transition-all before:duration-300
                        hover:before:w-full"
            >
              Nuestros Diseños
            </Link>
          </li>

          <li>
            <Link
              href="/contacform"
              className="relative inline-block py-2 px-1 text-gray-700 hover:text-teal-600 transition-colors
                        text-sm lg:text-base xl:text-lg font-medium
                        before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 
                        before:h-[2px] before:bg-teal-500 before:transition-all before:duration-300
                        hover:before:w-full"
            >
              Contáctanos
            </Link>
          </li>
        </ul>
      </nav>

      {isAdmin && (
        <Link
          href="/login"
          className="p-2 text-gray-600 hover:text-teal-500 transition-colors hidden md:inline-flex"
          aria-label="Iniciar sesión"
        >
          <FiUser className="w-6 h-6" />
        </Link>
      )}

      <Sidebar isAdmin={isAdmin} />
    </header>
  );
}
