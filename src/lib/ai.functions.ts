import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { callGateway } from "./ai-gateway.server";
import { SYSTEM_PROMPTS, CHAT_SYSTEM_PROMPT, buildUserPrompt, type ToolId } from "./ai-prompts";

const GenerateInput = z.object({
  tool: z.enum(["email", "notes", "planner", "research"]),
  fields: z.record(z.string()),
});

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(8000),
      }),
    )
    .min(1)
    .max(40),
});

export const generateWithAI = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => GenerateInput.parse(input))
  .handler(async ({ data }) => {
    const tool = data.tool as ToolId;
    const text = await callGateway([
      { role: "system", content: SYSTEM_PROMPTS[tool] },
      { role: "user", content: buildUserPrompt(tool, data.fields) },
    ]);
    return { text };
  });

export const chatWithAI = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const text = await callGateway([
      { role: "system", content: CHAT_SYSTEM_PROMPT },
      ...data.messages,
    ]);
    return { text };
  });
