import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck } from "lucide-react";
import { ToolRunner, type FieldDef } from "@/components/ToolRunner";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Job-Search Task Planner | YouthWork AI" },
      {
        name: "description",
        content:
          "Turn your goals, deadlines and free hours into a realistic daily or weekly job-search schedule with clear priorities.",
      },
      { property: "og:title", content: "AI Task Planner | YouthWork AI" },
      {
        property: "og:description",
        content: "A realistic, prioritised job-search plan built around the time you actually have.",
      },
    ],
  }),
  component: PlannerPage,
});

const fields: FieldDef[] = [
  { name: "timeframe", label: "Plan for", type: "select", options: ["Today", "This week", "Next 2 weeks"] },
  {
    name: "hours",
    label: "Time you realistically have",
    type: "text",
    placeholder: "e.g. 3 hours a day, but only mornings",
  },
  {
    name: "tasks",
    label: "Tasks, goals and deadlines",
    type: "textarea",
    required: true,
    rows: 8,
    placeholder: "One per line, add deadlines where you know them…",
  },
  {
    name: "constraints",
    label: "Anything that limits you",
    type: "textarea",
    rows: 3,
    placeholder: "Limited data, share a laptop, part-time shifts Tue/Thu, travel costs…",
  },
];

const sample = {
  timeframe: "This week",
  hours: "About 2-3 hours a day, mostly late afternoon",
  tasks: `Fix my CV - no proper layout yet
Apply to at least 8 jobs on Indeed and SA Youth
Practice interview answers, interview on Friday 10am
Get a reference letter from my old volunteer supervisor
Finish free Excel course (3 modules left)
Register on the SA Youth portal`,
  constraints:
    "I only have data on my phone, laptop available at the library Mon/Wed/Fri, taxi fare is tight so I plan trips carefully.",
};

function PlannerPage() {
  return (
    <ToolRunner
      tool="planner"
      title="AI Task Planner & Scheduler"
      description="Give the assistant your goals, deadlines and free time. It ranks what matters most and builds a schedule you can actually keep."
      icon={<CalendarCheck className="size-5" />}
      fields={fields}
      sample={sample}
      cta="Build my plan"
    />
  );
}
