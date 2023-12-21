import { createClient } from "@supabase/supabase-js";
import { Database } from "database.types";
const supabaseUrl = "https://alcjwpfysvgscnmuwnuj.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
