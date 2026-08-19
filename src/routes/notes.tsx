import { createFileRoute } from "@tanstack/react-router";
import { NotebookPen } from "lucide-react";
import { ToolRunner, type FieldDef } from "@/components/ToolRunner";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting & Interview Notes Summarizer | YouthWork AI" },
      {
        name: "description",
        content:
          "Turn messy notes from interviews, mentorship sessions or meetings into a summary with action items and deadlines.",
      },
      { property: "og:title", content: "Notes Summarizer | YouthWork AI" },
      {
        property: "og:description",
        content: "Summaries, decisions, action items and deadlines from your rough notes.",
      },
    ],
  }),
  component: NotesPage,
});

const fields: FieldDef[] = [
  {
    name: "context",
    label: "What kind of session was this",
    type: "select",
    options: [
      "Job interview",
      "Mentorship or coaching session",
      "Team or work meeting",
      "Career fair conversation",
      "Class or training session",
      "Group project meeting",
    ],
  },
  { name: "date", label: "Date (optional)", type: "text", placeholder: "e.g. 12 March" },
  {
    name: "notes",
    label: "Paste your rough notes",
    type: "textarea",
    required: true,
    rows: 12,
    placeholder: "Type or paste everything, even if it is messy…",
  },
];

const sample = {
  context: "Job interview",
  date: "12 March",
  notes: `panel of 2 - Thabo (team lead) and Aisha (HR)
role is junior data capturer, 6 month contract, maybe permanent after
asked about excel - said i know basics, they want vlookup, said i must practice
they said typing speed test next week thursday, send availability by monday
salary range 8500-9500, they will confirm with finance
Aisha said send my matric certificate and ID copy by friday
i forgot to ask about working hours and if training is provided
they mention start date probably 1 april`,
};

function NotesPage() {
  return (
    <ToolRunner
      tool="notes"
      title="Meeting & Interview Notes Summarizer"
      description="Paste your messy notes and get a clean summary, the decisions made, action items with owners and deadlines, and the questions you still need to ask."
      icon={<NotebookPen className="size-5" />}
      fields={fields}
      sample={sample}
      cta="Summarize my notes"
    />
  );
}
