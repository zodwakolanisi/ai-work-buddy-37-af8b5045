import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, NotebookPen, CalendarCheck, Compass, MessagesSquare, ArrowRight } from "lucide-react";
import { AiDisclaimer } from "@/components/AiDisclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YouthWork AI — Job Questions & Feedback Assistant" },
      {
        name: "description",
        content:
          "An AI assistant for young job seekers: write application emails, summarize interview notes, plan your week, research careers and get feedback on your CV.",
      },
      { property: "og:title", content: "YouthWork AI — Job Questions & Feedback Assistant" },
      {
        property: "og:description",
        content:
          "Five AI tools that help youth apply for jobs with confidence — emails, notes, planning, research and chat feedback.",
      },
    ],
  }),
  component: Dashboard,
});

const TOOLS = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    text: "Application emails, follow-ups and thank-you notes in the tone you choose.",
  },
  {
    to: "/notes",
    icon: NotebookPen,
    title: "Notes Summarizer",
    text: "Turn messy interview or meeting notes into decisions, action items and deadlines.",
  },
  {
    to: "/planner",
    icon: CalendarCheck,
    title: "AI Task Planner",
    text: "A prioritised daily or weekly job-search schedule built around your real free time.",
  },
  {
    to: "/research",
    icon: Compass,
    title: "Career Research",
    text: "Summaries, insights and scam warnings for careers, courses, employers and bursaries.",
  },
  {
    to: "/chat",
    icon: MessagesSquare,
    title: "Ask the Assistant",
    text: "Chat about any job question, or paste your CV and get honest, kind feedback.",
  },
] as const;

function Dashboard() {
  return (
    <div>
      <section className="gradient-hero shadow-lift relative overflow-hidden rounded-3xl px-6 py-10 text-primary-foreground sm:px-10 sm:py-14">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase opacity-80">
          AI assistant for young job seekers
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl leading-tight font-semibold sm:text-4xl">
          Job questions answered. Applications written. Feedback that actually helps.
        </h1>
        <p className="mt-4 max-w-xl text-sm opacity-90 sm:text-base">
          YouthWork AI turns the confusing parts of finding work — emails, interviews, planning and
          research — into simple, guided steps you can finish today.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
          >
            Ask a question <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/email"
            className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/30 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
          >
            Write an application email
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Your toolkit</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Five AI tools, all built around the questions young people actually ask.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {TOOLS.map(({ to, icon: Icon, title, text }) => (
            <Link
              key={to}
              to={to}
              className="shadow-soft group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary"
            >
              <span className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { k: "1. Tell it about you", v: "Add your skills, notes or question — plain language is fine." },
          { k: "2. Get a structured draft", v: "Clear headings, action items and a next step, never vague advice." },
          { k: "3. Edit and make it yours", v: "Every result is editable, copyable and downloadable before you send." },
        ].map((s) => (
          <div key={s.k} className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-sm font-semibold text-surface-foreground">{s.k}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.v}</p>
          </div>
        ))}
      </section>

      <AiDisclaimer />
    </div>
  );
}
