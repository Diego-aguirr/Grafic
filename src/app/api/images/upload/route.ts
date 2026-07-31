import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const description = (formData.get("description") as string) || "";
    const category = (formData.get("category") as string) || "";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // 1. Upload to Supabase Storage
    const supabase = await createClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Storage error:", uploadError);
      return NextResponse.json(
        { error: "Error uploading to storage" },
        { status: 500 }
      );
    }

    const { data: urlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    // 2. Save metadata to database via Prisma
    const image = await prisma.image.create({
      data: {
        url: urlData.publicUrl,
        description,
        category,
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Error al subir imagen" },
      { status: 500 }
    );
  }
}
