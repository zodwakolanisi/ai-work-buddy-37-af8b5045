import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2, SendHorizonal, MessagesSquare } from "lucide-react";
import { toast } from "sonner";
import { chatWithAI } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiDisclaimer } from "@/components/AiDisclaimer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Ask the Assistant | YouthWork AI" },
      {
        name: "description",
        content:
          "Chat with an AI career assistant about CVs, interviews, applications and workplace questions — and get honest feedback on your own writing.",
      },
      { property: "og:title", content: "Ask the Assistant | YouthWork AI" },
      {
        property: "og:description",
        content: "An AI chatbot for youth job questions, CV feedback and interview practice.",
      },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Give me feedback on this CV summary I wrote",
  "How do I answer 'tell me about yourself' with no work experience?",
  "What should I wear to an interview at a retail store?",
  "Is this job advert a scam? It asks for a registration fee",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await chatWithAI({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: res.text }]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setMessages(next);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <header className="mb-6">
        <span className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
          <MessagesSquare className="size-5" />
        </span>
        <h1 className="text-2xl font-semibold sm:text-3xl">Ask the Assistant</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Ask anything about jobs, applications, interviews or your first days at work — or paste
          your CV, cover letter or interview answer for honest, kind feedback.
        </p>
      </header>

      <section className="flex h-[60vh] min-h-100 flex-col rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Not sure where to start? Try one of these:</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setInput(s)}
                    className="rounded-xl border border-border bg-surface px-3 py-2.5 text-left text-sm text-surface-foreground transition-colors hover:border-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {messages.map((m, i) => (
            <div
              key={i}
              className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface text-surface-foreground",
                )}
              >
                {m.role === "assistant" ? (
                  <div className="ai-prose">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{m.content}</p>
                )}
              </div>
            </div>
          ))}

          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Thinking…
            </div>
          ) : null}
          <div ref={endRef} />
        </div>

        <form
          className="flex items-end gap-2 border-t border-border p-3"
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          <Textarea
            value={input}
            rows={2}
            placeholder="Type your question…"
            aria-label="Your message"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
            className="min-h-0 resize-none"
          />
          <Button type="submit" disabled={loading || !input.trim()} size="icon" aria-label="Send">
            <SendHorizonal className="size-4" />
          </Button>
        </form>
      </section>

      <AiDisclaimer />
    </div>
  );
}
