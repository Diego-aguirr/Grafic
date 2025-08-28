import { createClient } from "@/lib/supabase/server";

export async function fetchPublicImages() {
  const supabase =  await createClient(); // No uses await aquí

  const { data, error } = await supabase.from("images").select("*");

  if (error) {
    console.error("Error al obtener imágenes:", error.message);
    return [];
  }

  return data ?? [];
}
