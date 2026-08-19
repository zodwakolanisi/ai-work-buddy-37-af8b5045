import { useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2, Copy, Check, Pencil, Eye, Download, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { generateWithAI } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiDisclaimer } from "@/components/AiDisclaimer";

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
  required?: boolean;
  rows?: number;
};

type Props = {
  tool: "email" | "notes" | "planner" | "research";
  title: string;
  description: string;
  icon: ReactNode;
  fields: FieldDef[];
  sample: Record<string, string>;
  cta: string;
};

export function ToolRunner({ tool, title, description, icon, fields, sample, cta }: Props) {
  const initial = Object.fromEntries(
    fields.map((f) => [f.name, f.type === "select" ? (f.options?.[0] ?? "") : ""]),
  ) as Record<string, string>;

  const [values, setValues] = useState<Record<string, string>>(initial);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));

  async function run() {
    const missing = fields.find((f) => f.required && !values[f.name]?.trim());
    if (missing) {
      toast.error(`Please fill in "${missing.label}" first.`);
      return;
    }
    setLoading(true);
    setEditing(false);
    try {
      const res = await generateWithAI({
        data: { tool, fields: Object.fromEntries(fields.map((f) => [f.label, values[f.name] ?? ""])) },
      });
      setOutput(res.text);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1800);
  }

  function download() {
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tool}-youthwork-ai.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <header className="mb-8">
        <span className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
          {icon}
        </span>
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{description}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Your input
          </h2>
          <div className="space-y-4">
            {fields.map((f) => (
              <div key={f.name} className="space-y-1.5">
                <Label htmlFor={f.name}>{f.label}</Label>
                {f.type === "textarea" ? (
                  <Textarea
                    id={f.name}
                    rows={f.rows ?? 5}
                    placeholder={f.placeholder}
                    value={values[f.name] ?? ""}
                    onChange={(e) => set(f.name, e.target.value)}
                  />
                ) : f.type === "select" ? (
                  <Select value={values[f.name]} onValueChange={(v) => set(f.name, v)}>
                    <SelectTrigger id={f.name}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {f.options?.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={f.name}
                    placeholder={f.placeholder}
                    value={values[f.name] ?? ""}
                    onChange={(e) => set(f.name, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button onClick={run} disabled={loading} className="flex-1 sm:flex-none">
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Wand2 className="size-4" /> {cta}
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => setValues({ ...initial, ...sample })}>
              Try an example
            </Button>
          </div>
        </section>

        {/* Output */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              AI result
            </h2>
            {output ? (
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => setEditing((v) => !v)}>
                  {editing ? <Eye className="size-4" /> : <Pencil className="size-4" />}
                  {editing ? "Preview" : "Edit"}
                </Button>
                <Button variant="ghost" size="sm" onClick={copy}>
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={download}>
                  <Download className="size-4" />
                </Button>
              </div>
            ) : null}
          </div>

          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-3.5 animate-pulse rounded-full bg-muted" />
              ))}
            </div>
          ) : output ? (
            editing ? (
              <Textarea
                value={output}
                rows={18}
                onChange={(e) => setOutput(e.target.value)}
                aria-label="Edit AI output"
              />
            ) : (
              <div className="ai-prose">
                <ReactMarkdown>{output}</ReactMarkdown>
              </div>
            )
          ) : (
            <p className="text-sm text-muted-foreground">
              Fill in the form and your AI draft will appear here. You can edit, copy or download it
              afterwards.
            </p>
          )}
        </section>
      </div>

      <AiDisclaimer />
    </div>
  );
}
