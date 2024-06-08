import { supabase } from "~/lib/supabase";

export async function getProfilePhotoUrl(path: string) {
  try {
    const {
      data: { publicUrl },
    } = supabase.storage.from("yaswami").getPublicUrl(path);

    return publicUrl;
  } catch (e) {
    throw new Error("Failed to fetch profile photo URL");
  }
}
