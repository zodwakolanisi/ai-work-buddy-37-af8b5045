import { ShieldCheck } from "lucide-react";

export function AiDisclaimer() {
  return (
    <aside className="mt-10 flex gap-3 rounded-2xl border border-border bg-surface p-4 text-sm text-surface-foreground">
      <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
      <p className="leading-relaxed">
        <strong className="font-semibold">Responsible AI notice.</strong> YouthWork AI gives
        guidance, drafts and practice feedback — not legal, financial or guaranteed career advice.
        Responses can be wrong or outdated, so check facts (deadlines, salaries, bursary rules) with
        the official source before acting. Never share ID numbers, banking details or passwords
        here, and always review and edit any draft so it sounds like you.
      </p>
    </aside>
  );
}
