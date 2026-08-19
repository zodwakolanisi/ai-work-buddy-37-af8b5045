import { createFileRoute } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { ToolRunner, type FieldDef } from "@/components/ToolRunner";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Career Research Assistant | YouthWork AI" },
      {
        name: "description",
        content:
          "Research careers, industries, employers, courses and bursaries. Get plain-language summaries, insights and warnings about scams.",
      },
      { property: "og:title", content: "AI Career Research Assistant | YouthWork AI" },
      {
        property: "og:description",
        content: "Plain-language research on careers, courses, employers and bursaries.",
      },
    ],
  }),
  component: ResearchPage,
});

const fields: FieldDef[] = [
  {
    name: "topic",
    label: "Topic, article or question",
    type: "textarea",
    required: true,
    rows: 6,
    placeholder:
      "Paste an article, a job advert, or ask something like: What does a junior data analyst actually do?",
  },
  {
    name: "goal",
    label: "What do you want out of this",
    type: "select",
    options: [
      "Understand the basics",
      "Decide if this career suits me",
      "Prepare for an interview",
      "Compare study or training options",
      "Check if this opportunity is legit",
    ],
  },
  {
    name: "background",
    label: "Your background (optional)",
    type: "textarea",
    rows: 3,
    placeholder: "Matric with maths lit, no work experience, interested in tech but no laptop yet…",
  },
];

const sample = {
  topic:
    "I keep seeing 'data analyst' jobs online. What does the work actually involve, what do I need to learn, and can I start without a degree?",
  goal: "Decide if this career suits me",
  background: "Matric 2024, good with numbers, currently unemployed, using a phone and library computers.",
};

function ResearchPage() {
  return (
    <ToolRunner
      tool="research"
      title="AI Career Research Assistant"
      description="Summarise a topic or article, get the skills that actually matter, practical recommendations, and warnings about common scams and mistakes."
      icon={<Compass className="size-5" />}
      fields={fields}
      sample={sample}
      cta="Research this for me"
    />
  );
}
