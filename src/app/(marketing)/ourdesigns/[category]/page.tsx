
// app/category/[category]/page.tsx

import { DesignCard } from "@components/DesignCard";
import { fetchPublicImages } from "@lib/fetchImg";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryNav from "@components/CategoryNav";
import BackToAdminButton from '@components/BackToAdminButton';




type Props = {
  params: Promise<{
    category: string;
  }>
};
export const metadata: Metadata = {
  title: "Categoría | CraftyCraft - Portafolio Creativo",
};

export const dynamicParams = true;
export const revalidate = 60; // Revalida cada 60 segundos


const CATEGORY_MAP = {
  branding: { name: "Branding", slug: "branding" },
  digital: { name: "Digital", slug: "digital" },
  impresion: { name: "Impresión", slug: "Impresion" },
  eventos: { name: "Eventos", slug: "eventos" },
  packaging: { name: "Packaging", slug: "packaging" },
};


type CategoryKey = keyof typeof CATEGORY_MAP;


// Función de normalización optimizada
const normalizeCategory = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};



export default async function CategoryPage({ params }: Props) {

  const { category: urlCategory } = await params;


  const categorySlug = normalizeCategory(urlCategory);

  const categoryKey = Object.keys(CATEGORY_MAP).find(
    key => normalizeCategory(key) === categorySlug
  ) as CategoryKey | undefined;

  if (!categoryKey) return notFound();


  const categoryData = CATEGORY_MAP[categoryKey];
  const categoryName = categoryData.name;

  const allImages = await fetchPublicImages();

  const images = allImages.filter(img => {
    const imgCategoryNormalized = normalizeCategory(img.category);
    return imgCategoryNormalized === normalizeCategory(categoryData.slug);
  });

  return (
    <main className="min-h-screen">
      {/* Título */}
      <section className="bg-gradient-to-b from-teal-50 to-white pt-32 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 capitalize">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-pink-500">
              {categoryName}
            </span>
          </h1>
        </div>
      </section>

      <BackToAdminButton />

      {/* Navegación */}
      <section className="bg-white sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <CategoryNav />
        </div>
      </section>

      {/* Diseños filtrados */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {images.map((img) => (
            <DesignCard
              key={`${img.id}-${categorySlug}`}
              design={{
                id: Number(img.id),
                category: img.category,
                title: img.description,
                image: img.url,
                tags: [],
              }}
            />
          ))}

          {images.length === 0 && (
            <div className="col-span-full text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-500">
                No se encontraron diseños en esta categoría
              </h3>
              <p className="mt-4 text-gray-400">
                Prueba seleccionando otra categoría
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

// Generar rutas estáticas
export async function generateStaticParams() {
  return Object.values(CATEGORY_MAP).map((category) => ({
    category: category.slug,
  }));
}