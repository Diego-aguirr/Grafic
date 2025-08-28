"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "Todos", slug: "todos" },
  { name: "Branding", slug: "branding" },
  { name: "Digital", slug: "digital" },
  { name: "Impresión", slug: "Impresion" },
  { name: "Eventos", slug: "eventos" },
  { name: "Packaging", slug: "packaging" },
];

export default function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap justify-center gap-3">
        {categories.map(({ name, slug }) => (
          <Link
            key={slug}
            href={slug === "todos" ? "/ourdesigns" : `/ourdesigns/${slug}`}
            className={`px-6 py-2 rounded-full border border-gray-200 hover:border-teal-500 
              text-gray-600 hover:text-teal-600 transition-all duration-300
              ${
                pathname.endsWith(`/${slug}`) ||
                (slug === "todos" && pathname === "/ourdesigns")
                  ? "border-teal-500 text-teal-600 font-semibold"
                  : ""
              }`}
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
