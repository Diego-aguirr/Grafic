"use client";
import { FaWhatsapp } from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";
import type { TargetAndTransition } from "framer-motion";

export const WhatsappButton = () => {
  const phone = "";
  const message =
    "¡Hola! Quisiera hacer una consulta sobre diseño gráfico u Pedido.";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const shouldReduceMotion = useReducedMotion();

  // Animaciones accesibles
  const floatingAnimation: TargetAndTransition = shouldReduceMotion
    ? { y: 0 }
    : {
        y: [0, -15, 0],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1],
        },
      };
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contactar por WhatsApp - Se abrirá en nueva ventana"
      role="button"
      className="fixed bottom-8 right-4 sm:bottom-10 sm:right-8 z-50
        bg-[#25D366] hover:bg-[#128C7E] text-white 
        p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl
        ring-2 ring-white/20 hover:ring-white/40
        focus:outline-none focus:ring-4 focus:ring-white/60
        transition-all duration-300 ease-out
        flex items-center gap-2 group"
      style={{
        // Tamaño accesible mínimo (WCAG)
        minWidth: "64px",
        minHeight: "64px",
      }}
    >
      {/* Animación de pulso accesible */}
      <motion.div animate={floatingAnimation} className="relative">
        <FaWhatsapp
          className="w-8 h-8 sm:w-10 sm:h-10 
            transform group-hover:rotate-12 transition-transform"
        />

        {/* Notificación animada */}
        <span className="absolute -top-1 -right-1 flex h-5 w-5 sm:h-6 sm:w-6">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-5 w-5 sm:h-6 sm:w-6 bg-red-500 text-xs sm:text-sm text-white items-center justify-center">
            1
          </span>
        </span>
      </motion.div>

      {/* Texto emergente para desktop */}
      <span
        className="hidden lg:inline-block bg-black/80 text-sm px-3 py-1 rounded-lg
        absolute right-full top-1/2 -translate-y-1/2 mr-4
        opacity-0 group-hover:opacity-100 transition-opacity
        pointer-events-none"
      >
        ¡Háblanos ahora!
      </span>
    </motion.a>
  );
};
