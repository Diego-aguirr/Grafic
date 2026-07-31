import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const images = await prisma.image.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Error al obtener imágenes" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, description, category } = await request.json();

    const image = await prisma.image.update({
      where: { id },
      data: { description, category },
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error("Error updating image:", error);
    return NextResponse.json(
      { error: "Error al actualizar imagen" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id, url } = await request.json();

    // 1. Delete from Supabase Storage
    const supabase = await createClient();
    const filePath = url.split("/").slice(-2).join("/");
    const { error: storageError } = await supabase.storage
      .from("images")
      .remove([filePath]);

    if (storageError) {
      console.error("Storage error:", storageError);
    }

    // 2. Delete from database via Prisma
    await prisma.image.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Error al eliminar imagen" },
      { status: 500 }
    );
  }
}
