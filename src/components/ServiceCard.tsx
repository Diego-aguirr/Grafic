"use client";

import { ServiceCardProps } from "@/interfaces/service";
import { motion } from "framer-motion";

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  const handleWhatsAppClick = () => {
    // Número de teléfono (reemplaza con tu número)
    const phoneNumber = "1234567890";

    // Mensaje predefinido
    const message = `¡Hola! Estoy interesado en el servicio: ${title}`;

    // Crear el enlace de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleWhatsAppClick}
      title="Hacer clic para contactar por WhatsApp"
    >
      <div className="flex items-start space-x-4">
        <span className="text-4xl">{icon}</span>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
