import React from "react";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-24 md:mt-32 py-6 md:py-8 px-4 sm:px-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Texto de derechos */}
          <p className="text-gray-600 text-sm order-2">
            &copy; {new Date().getFullYear()} Crafty Craft. Todos los derechos
            reservados.
          </p>

          <div className="order-1">
            <a
              href="https://www.instagram.com" // Reemplaza con tu URL
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#E1306C] transition-colors duration-300"
            >
              <FaInstagram size={32} className="shrink-0" />
            </a>
          </div>
        </div>

        {/* Texto adicional */}
        <div className="mt-6 md:mt-8 text-center text-xs text-gray-500">
          <p>Seguinos en Instagram para las últimas actualizaciones</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
