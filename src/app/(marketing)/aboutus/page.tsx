import ServiceCard from "@components/ServiceCard";
import { Metadata } from "next";
import Image from "next/image";
import { WhatsappButton } from "../../../components/WhatAppButton";

export const metadata: Metadata = {
  title: "Sobre Nosotros | CraftyCraft - Experiencia en Diseño Gráfico",
  description:
    "Más de 10 años transformando ideas en soluciones visuales profesionales. Especialistas en identidad corporativa y material promocional.",
};

const AboutPage = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50 to-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-pink-500">
              Más de una década
            </span>
            <br />
            dando vida a marcas memorables
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Combinando arte, estrategia y tecnología para crear soluciones
            visuales impactantes
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Columna de Experiencia */}
            <article className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Nuestra Trayectoria
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Desde 2013, hemos evolucionado junto a las necesidades del
                mercado digital, posicionándonos como referentes en diseño
                gráfico estratégico. Nuestra experiencia abarca:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-teal-500 mt-1 mr-3">▸</span>
                  <span className="text-gray-700">
                    <strong>500+ proyectos</strong> ejecutados con éxito
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mt-1 mr-3">▸</span>
                  <span className="text-gray-700">
                    <strong>40+ industrias</strong> diferentes atendidas
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mt-1 mr-3">▸</span>
                  <span className="text-gray-700">
                    <strong>98% de satisfacción</strong> cliental
                  </span>
                </li>
              </ul>
            </article>

            {/* Columna de Servicios */}
            <div className="grid grid-cols-1 gap-6">
              <ServiceCard
                icon="🎨"
                title="Diseño Corporativo"
                description="Tarjetas profesionales, talonarios personalizados y papelería ejecutiva"
              />
              <ServiceCard
                icon="📱"
                title="Marketing Digital"
                description="Flyers interactivos, invitaciones animadas y contenido para redes"
              />
              <ServiceCard
                icon="📄"
                title="Desarrollo Profesional"
                description="CVs creativos, portafolios digitales y presentaciones ejecutivas"
              />
              <ServiceCard
                icon="🎉"
                title="Eventos Especiales"
                description="Cotillón personalizado, souvenirs creativos y kits temáticos"
              />
            </div>
          </div>

          <div className="mt-16">
            <WhatsappButton />
          </div>
        </div>
      </section>

      {/* Sección Filosofía */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Image
              src="/img/pro1.png"
              alt="Equipo de diseño CraftyCraft"
              width={800}
              height={600}
              className="rounded-2xl shadow-xl"
            />

            <article>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Filosofía Creativa
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Nuestra metodología se basa en 3 pilares fundamentales:
              </p>
              <ul className="space-y-6">
                <li className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-teal-600 mb-2">
                    Innovación Guiada
                  </h3>
                  <p className="text-gray-600">
                    Tecnología de vanguardia aplicada a soluciones reales
                  </p>
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-teal-600 mb-2">
                    Estrategia Visual
                  </h3>
                  <p className="text-gray-600">
                    Diseño con propósito y objetivos medibles
                  </p>
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-teal-600 mb-2">
                    Compromiso Total
                  </h3>
                  <p className="text-gray-600">
                    Desde el concepto hasta la entrega final
                  </p>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
