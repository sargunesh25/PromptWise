import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MODEL_NAME = "gemini-3.1-flash-lite";
const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

function buildPrompt(message: string) {
  return `You are an AI shopping decision engine. Use live prices and current products via grounding.
Return ONLY this format:

Top 3 Brands
- Brand A
- Brand B
- Brand C

Top 3 Picks
- Product name … (Brand)
- Product name … (Brand)
- Product name … (Brand)

Best Overall
...

Best Value
...

Trade-Offs
- ...
- ...

Alternatives to Consider
- ...
- ...

Buy Now or Wait
...

Keep every line short and simple. No extra sections.

User request: ${message}`;
}

function extractText(data: any) {
  return (
    data?.candidates?.[0]?.content?.parts?.map((part: any) => part?.text ?? "").join("") ||
    data?.candidates?.[0]?.content?.text ||
    data?.text ||
    ""
  );
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing GEMINI_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Missing message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const prompt = buildPrompt(message);

    const response = await fetch(`${GEMINI_API_BASE}/${MODEL_NAME}:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        tools: [{ google_search: {} }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 512,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: errorText || "Gemini request failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = extractText(data).trim();

    return new Response(JSON.stringify({ type: "recommendation", content }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error?.message || "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
