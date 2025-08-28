import React from "react";

const QuickContact = () => {
  return (
    <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        ¿Listo para comenzar?
      </h2>
      <p className="text-gray-600 mb-8">
        Cuéntanos sobre tu proyecto y te enviaremos una propuesta en 24 horas
      </p>
      <a
        href="/contacto"
        className="inline-block bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors"
      >
        Solicitar Presupuesto
      </a>
    </div>
  );
};

export default QuickContact;
