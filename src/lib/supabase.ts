import { createClient } from "@supabase/supabase-js";

// Make sure that process.env isn't crashing by providing a strict URL.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xyzcompany.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy.dummy";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
