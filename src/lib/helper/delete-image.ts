// lib/supabase/delete-image.ts
import { createClient } from "@lib/supabase/client";

const supabase = createClient();

export async function deleteImage(id: string, url: string) {
  // Obtener el path del archivo desde la URL
  const filePath = url.split("/").slice(-2).join("/"); // images/123456.jpg

  // 1. Eliminar del bucket
  const { error: storageError } = await supabase.storage
    .from("images")
    .remove([filePath]);

  if (storageError) throw new Error("Error al eliminar la imagen del storage");

  // 2. Eliminar de la tabla
  const { error: dbError } = await supabase
    .from("images")
    .delete()
    .eq("id", id);

  if (dbError)
    throw new Error("Error al eliminar la imagen de la base de datos");
}
