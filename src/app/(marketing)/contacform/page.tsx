import ContactForm from "@components/ContactForm";
import { Metadata } from "next";
import Link from "next/link";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contacto | CraftyCraft - Diseño Gráfico Profesional",
  description:
    "Contáctanos para transformar tus ideas en realidad visual. Consultas, presupuestos y colaboraciones.",
};

const ContactPage = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section con padding para el navbar */}
      <section className="bg-gradient-to-b from-teal-50 to-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-pink-500">
              Hablemos de tu proyecto
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Completa el formulario o utiliza nuestros canales directos
          </p>
        </div>
      </section>

      {/* Sección principal con grid responsivo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Formulario */}
          <div className="lg:sticky lg:top-24">
            {" "}
            {/* Hace sticky el formulario en desktop */}
            <ContactForm />
          </div>

          {/* Información de contacto */}
          <div className="space-y-10">
            {/* Tarjetas de contacto */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-teal-100 p-4 rounded-lg">
                    <FaMapMarkerAlt className="w-8 h-8 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Oficina Central
                    </h3>
                    <p className="text-gray-600">Av. Corrientes 1234</p>
                    <p className="text-gray-600">Buenos Aires, Argentina</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-pink-100 p-4 rounded-lg">
                    <FaPhoneAlt className="w-8 h-8 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Teléfonos
                    </h3>
                    <p className="text-gray-600">+54 11 1234-5678</p>
                    <p className="text-gray-600">Lunes a Viernes 9-18hs</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow md:col-span-2">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-4 rounded-lg">
                    <FaEnvelope className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Correo Electrónico
                    </h3>
                    <Link
                      href="mailto:hola@craftycraft.com"
                      className="text-teal-600 hover:text-teal-700 break-all"
                    >
                      empresa@empresa.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="aspect-video rounded-2xl shadow-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016887889474!2d-58.383759!3d-34.603734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf425a4a1f%3A0x9f4a1769e71eddb4!2sAv.%20Corrientes%201234%2C%20C1043%20CABA!5e0!3m2!1ses!2sar!4v1716853938709!5m2!1ses!2sar"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
