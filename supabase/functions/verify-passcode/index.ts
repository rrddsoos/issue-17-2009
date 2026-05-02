import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const { passcode } = await req.json();
    if (typeof passcode !== "string" || passcode.length > 200) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid input" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const expected = Deno.env.get("BIRTHDAY_PASSCODE") ?? "";
    const ok = passcode.trim().toLowerCase() === expected.trim().toLowerCase() && expected.length > 0;
    if (!ok) {
      return new Response(JSON.stringify({ ok: false }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const token = crypto.randomUUID() + "." + Date.now();
    return new Response(JSON.stringify({ ok: true, token }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "Bad request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
