// lib/supabase/update-image.ts

import { createClient } from "@lib/supabase/client";

const supabase = createClient();

export async function updateImage(
  id: string,
  description: string,
  category: string
) {
  const { error } = await supabase
    .from("images")
    .update({ description, category })
    .eq("id", id);

  if (error) throw error;
}
