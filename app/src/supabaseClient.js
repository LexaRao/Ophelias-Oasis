import { createClient } from "@supabase/supabase-js";

export const liveBackend = import.meta.env.VITE_LIVE_BACKEND === "true";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Offline previews never initialize an auth connection.
export const supabase =
  liveBackend && supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;
