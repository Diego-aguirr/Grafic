"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Capa de overlay para mejor contraste */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      <Image
        src="/img/hero.jpeg"
        alt="Fondo visual craftycraft17"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        className="object-cover object-center" // Asegura enfoque en el centro
        priority
        quality={90}
      />

      {/* Contenido con márgenes controlados */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4 md:px-8 lg:px-16 z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-white max-w-4xl lg:max-w-6xl xl:max-w-7xl space-y-6 md:space-y-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-bold drop-shadow-2xl leading-tight md:leading-[1.15]">
            “El diseño no es solo cómo se ve,
            <br className="hidden lg:block" />
            es cómo se siente tu marca.”
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl font-medium max-w-3xl mx-auto mt-6 md:mt-10 px-4 lg:px-0"
          >
            Transformamos ideas en experiencias visuales memorables
          </motion.p>
        </motion.div>
      </div>

      {/* Flecha mejor posicionada */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 hidden md:block z-20"
      >
        <div className="animate-bounce w-10 h-10 border-4 border-white/80 rounded-full"></div>
      </motion.div>
    </section>
  );
};
