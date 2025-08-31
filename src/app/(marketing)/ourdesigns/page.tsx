export const revalidate = 60;
import BackToAdminButton from "@components/BackToAdminButton";
import CategoryNav from "@components/CategoryNav";
import { DesignCard } from "@components/DesignCard";
import { fetchPublicImages } from "@lib/fetchImg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuestros Diseños | CraftyCraft - Portafolio Creativo",
  description:
    "Explora nuestro portafolio de diseños innovadores: branding, material gráfico y soluciones visuales impactantes.",
};

export default async function DesignsPage() {
  const images = await fetchPublicImages();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-50 to-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-pink-500">
              Galería de Diseños
            </span>
            <br />
            Donde la creatividad toma forma
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Más de 1,000 proyectos que demuestran nuestro enfoque innovador.
          </p>
        </div>
      </section>
      <BackToAdminButton />
      {/* Navegación de Categorías */}
      <section className="bg-white sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <CategoryNav />
        </div>
      </section>

      {/* Grid de Diseños */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {images.map((img) => (
            <DesignCard
              key={img.id}
              design={{
                id: Number(img.id),
                category: img.category,
                title: img.description,
                image: img.url,
                tags: [],
              }}
            />
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gray-50 py-20">
        <div className="flex flex-col items-center justify-center bg-center max-w-4xl mx-auto text-center px-4 py-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            ¿Listo para transformar tu marca?
          </h2>
        </div>
      </section>
    </main>
  );
}
