import { supabase, hasSupabaseConfig } from "./supabaseClient";

export async function invokeDecisionEngine({ message, answers = [] }) {
  if (!hasSupabaseConfig || !supabase) {
    return { content: "Supabase is not configured. Add env vars to enable responses." };
  }

  const { data, error } = await supabase.functions.invoke("decision-engine", {
    body: { message, answers },
  });

  if (error) {
    throw error;
  }

  return data;
}
