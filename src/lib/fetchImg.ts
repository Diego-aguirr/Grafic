import { prisma } from "@/lib/prisma";

export async function fetchPublicImages() {
  try {
    const images = await prisma.image.findMany({
      orderBy: { createdAt: "desc" },
    });

    return images;
  } catch (error) {
    console.error("Error al obtener imágenes:", error);
    return [];
  }
}
