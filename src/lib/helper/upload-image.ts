// lib/supabase/upload-image.ts
import { createClient } from "@lib/supabase/client";

const supabase = createClient();

export async function uploadImage(file: File) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `images/${fileName}`;

  const { error } = await supabase.storage
    .from("images") // Asegurate de tener un bucket llamado "images"
    .upload(filePath, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("images")
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}
