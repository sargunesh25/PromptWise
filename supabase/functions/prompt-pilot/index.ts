import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { prompt, model } = await req.json();
    const apiKey = Deno.env.get("GEMINI_API_KEY");

    if (!apiKey) {
      return new Response(
        JSON.stringify({ content: "LLM not configured." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const geminiModel = model || "gemini-3.1-flash-lite";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`;

    const upstream = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    });

    const payload = await upstream.json().catch(() => ({}));
    const content =
      payload?.candidates?.[0]?.content?.parts?.map((part) => part.text).join("") ??
      payload?.candidates?.[0]?.content?.text ??
      payload?.text ??
      payload?.content ??
      "";

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ content: "Failed to generate response." }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
