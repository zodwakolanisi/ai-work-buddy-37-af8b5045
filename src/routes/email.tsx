import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { ToolRunner, type FieldDef } from "@/components/ToolRunner";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | YouthWork AI" },
      {
        name: "description",
        content:
          "Write job application emails, follow-ups and thank-you notes in a formal, friendly or persuasive tone.",
      },
      { property: "og:title", content: "Smart Email Generator | YouthWork AI" },
      {
        property: "og:description",
        content: "AI-written job emails for young job seekers, in the tone you choose.",
      },
    ],
  }),
  component: EmailPage,
});

const fields: FieldDef[] = [
  {
    name: "purpose",
    label: "What is the email for",
    type: "select",
    options: [
      "Applying for a job",
      "Following up after applying",
      "Thank-you note after an interview",
      "Asking someone to be a reference",
      "Asking about an internship or learnership",
      "Accepting an offer",
      "Politely declining an offer",
      "Asking for feedback after rejection",
    ],
  },
  { name: "tone", label: "Tone", type: "select", options: ["Formal", "Friendly", "Persuasive", "Confident but humble"] },
  { name: "recipient", label: "Who are you writing to", type: "text", placeholder: "e.g. Ms Dlamini, HR Officer at Shoprite" },
  { name: "role", label: "Role or opportunity", type: "text", placeholder: "e.g. Retail Sales Assistant (learnership)" },
  {
    name: "about",
    label: "About you (skills, studies, experience)",
    type: "textarea",
    required: true,
    rows: 5,
    placeholder: "Matric 2024, 6 months volunteering at a community library, good with customers, basic Excel…",
  },
  {
    name: "extra",
    label: "Anything else to mention",
    type: "textarea",
    rows: 3,
    placeholder: "Available immediately, can work weekends, I met the manager at a career fair…",
  },
];

const sample = {
  purpose: "Applying for a job",
  tone: "Confident but humble",
  recipient: "Mr Naidoo, Store Manager at Bright Foods",
  role: "Cashier / Sales Assistant",
  about:
    "Matric passed in 2025, no formal work experience yet. Helped run my aunt's spaza shop on weekends, handled cash and stock. Friendly with customers, punctual, learn fast.",
  extra: "Available immediately, can work weekends and public holidays. I live 15 minutes from the store.",
};

function EmailPage() {
  return (
    <ToolRunner
      tool="email"
      title="Smart Email Generator"
      description="Get a ready-to-send email with a subject line, plus a short explanation of why it works — so you learn while you apply."
      icon={<Mail className="size-5" />}
      fields={fields}
      sample={sample}
      cta="Write my email"
    />
  );
}
