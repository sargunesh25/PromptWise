import { supabase, hasSupabaseConfig } from "@/api/supabaseClient";

export async function invokePromptPilot({ prompt, model }) {
  if (!hasSupabaseConfig) {
    return "Supabase is not configured. Add env vars to enable responses.";
  }

  const { data, error } = await supabase.functions.invoke("prompt-pilot", {
    body: { prompt, model },
  });

  if (error) {
    throw error;
  }

  if (typeof data === "string") {
    return data;
  }

  return data?.content ?? "";
}
