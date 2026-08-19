export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function callGateway(messages: ChatMessage[]): Promise<string> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured (missing API key).");

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
    },
    body: JSON.stringify({
      model: "google/gemini-3.7-flash",
      messages,
      stream: false,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    if (res.status === 429)
      throw new Error("Too many requests right now. Please wait a few seconds and try again.");
    if (res.status === 402)
      throw new Error("AI credits are exhausted. The app owner needs to top up Lovable AI credits.");
    if (res.status === 403)
      throw new Error("AI access is blocked for this workspace. Ask the app owner to re-enable it.");
    throw new Error(`AI request failed (${res.status}). ${detail.slice(0, 300)}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("The assistant returned an empty response. Try rephrasing your input.");
  return text;
}
