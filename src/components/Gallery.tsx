"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Importa tus imágenes aquí
import design1 from "../../public/img/logo.jpg";
import design2 from "../../public/img/logo.jpg";
import design3 from "../../public/img/logo.jpg";

const Gallery = () => {
  const designs = [
    { id: 1, src: design1, alt: "Diseño 1" },
    { id: 2, src: design2, alt: "Diseño 2" },
    { id: 3, src: design3, alt: "Diseño 3" },
    // Agrega más diseños aquí
  ];

  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();

    setTouchStart(0);
    setTouchEnd(0);
  };

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      setCurrentIndex(index);
      sliderRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? designs.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === designs.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transition =
        "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    }
  }, []);

  return (
    <section className="bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-8 md:mb-12"
      >
        Nuestros Diseños
      </motion.h2>

      <div
        className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div ref={sliderRef} className="flex">
          {designs.map((design) => (
            <div
              key={design.id}
              className="min-w-full flex-shrink-0 relative group"
            >
              <div className="aspect-square md:aspect-video overflow-hidden">
                <Image
                  src={design.src}
                  alt={design.alt}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  width={1920}
                  height={1080}
                  quality={95}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg md:text-xl lg:text-2xl font-medium">
                  {design.alt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Controles de navegación */}
        {designs.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white/95 text-gray-900 rounded-full p-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 md:left-6"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L9.83 12z"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white/95 text-gray-900 rounded-full p-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 md:right-6"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M10 6L8.59 7.41 14.17 12l-5.58 4.59L10 18l6-6z"
                />
              </svg>
            </button>
          </>
        )}

        {/* Indicadores de paginación */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {designs.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-white/90" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Grid responsivo para desktop */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {designs.map((design) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-xl shadow-lg"
          >
            <div className="aspect-square overflow-hidden">
              <Image
                src={design.src}
                alt={design.alt}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                width={600}
                height={600}
                quality={90}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
              <p className="text-white text-lg font-medium">{design.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
