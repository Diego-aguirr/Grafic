"use client";

import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{
    loading: boolean;
    message: string;
    type: "success" | "error" | "";
  }>({
    loading: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    // Inicializar EmailJS con tu Public Key
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus({ loading: true, message: "", type: "" });

    // Validación básica
    if (!name || !email || !message) {
      setStatus({
        loading: false,
        message: "Por favor, completa todos los campos obligatorios.",
        type: "error",
      });
      return;
    }

    try {
      // Enviar email usando EmailJS
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: name,
          from_email: email,
          message: message,
          to_email: "empresasrlarg@gmail.com", // Email donde recibirás los mensajes
        }
      );

      if (response.status === 200) {
        setStatus({
          loading: false,
          message: "¡Mensaje enviado con éxito! Te contactaremos pronto.",
          type: "success",
        });
        // Limpiar formulario
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus({
          loading: false,
          message: "Error al enviar el mensaje. Intenta nuevamente.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error enviando email:", error);
      setStatus({
        loading: false,
        message: "Error al enviar el mensaje. Intenta nuevamente.",
        type: "error",
      });
    }
  };

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12">
          Contáctanos
        </h2>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Nombre */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre completo
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  placeholder="Ej: María González"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo electrónico
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  placeholder="hola@ejemplo.com"
                />
              </div>
            </div>

            {/* Mensaje */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Tu mensaje
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                placeholder="Cuéntanos cómo podemos ayudarte..."
              />
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={status.loading}
              className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-teal-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status.loading ? "Enviando..." : "Enviar mensaje"}
            </button>

            {/* Mensaje de estado */}
            {status.message && (
              <div
                className={`p-4 rounded-lg text-center ${
                  status.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {status.message}
              </div>
            )}
          </form>
        </div>

        {/* Texto de ayuda accesible */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Todos los campos marcados con <span className="text-red-500">*</span>{" "}
          son obligatorios
        </p>
      </div>
    </section>
  );
};

export default ContactForm;
