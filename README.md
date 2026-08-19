# AI-help youth with job question and feedback — Assistant

**Product name: YouthWork AI**

## Project overview

Many young people leave school ready to work but unsure how to *apply* for work: what to write in
an email, what an interview note actually means, how to plan a job search, and whether an
opportunity is even legit. YouthWork AI is a responsive, dashboard-style web app that turns those
confusing steps into short, guided AI-assisted tasks — in plain, encouraging language aimed at
first-time job seekers (roughly ages 16–35).

Every AI result is structured, editable, copyable and ends with a concrete "Next step".

## Features

1. **Smart Email Generator** — job applications, follow-ups, thank-you notes, reference requests,
   accepting/declining offers. Tones: formal, friendly, persuasive, confident-but-humble. Returns a
   subject line, the email body, and a "Why this works" explainer so the user learns.
2. **Meeting & Interview Notes Summarizer** — paste messy notes and get a summary, decisions,
   an action-items table (task / owner / deadline), deadlines, and follow-up questions.
3. **AI Task Planner / Scheduler** — ranks tasks (Must / Should / Nice to do) and builds a realistic
   daily or weekly schedule around the user's actual free hours and constraints.
4. **AI Career Research Assistant** — summarises a topic, article or job advert with key facts,
   required skills, recommendations and a "Watch out for" section covering scams and mistakes.
5. **AI Chatbot Interface** — an interactive assistant for any job question, plus honest feedback on
   a pasted CV, cover letter or interview answer (What works / What to improve / Rewritten example).

Supporting features: dashboard layout with sidebar navigation, mobile + desktop responsive design,
separate input and output panels, editable AI output with copy and download, one-click examples,
loading and error states, and a Responsible AI disclaimer on every page.

## Tools used

- **TanStack Start** (React 19, TanStack Router, file-based routing, server functions)
- **Vite 7** build tooling, **TypeScript**
- **Tailwind CSS v4** with a semantic design-token system (`src/styles.css`) + shadcn/ui components
- **Lovable AI Gateway** — `google/gemini-3.7-flash` for all generation
- **react-markdown** for rendering AI output, **lucide-react** icons, **sonner** toasts, **zod** validation

## Prompt engineering

Prompts live in `src/lib/ai-prompts.ts`:

- A shared guardrail block sets audience, reading level, anti-hallucination rules (placeholders
  instead of invented facts), a ban on promising jobs or salaries, and a required "Next step" line.
- Each tool adds a role-specific system prompt that fixes the exact output structure (headings,
  tables, section names), so results are consistent and easy to act on.
- User input is sent as clearly labelled key/value pairs rather than a free-form blob.

## Responsible AI practices

- Visible disclaimer on every page: guidance only, results can be wrong, verify with official
  sources, never share ID numbers, banking details or passwords.
- The model is instructed never to invent employer, bursary or vacancy facts and to flag uncertainty.
- No personal data is stored — nothing is persisted to a database; state lives in the browser session.
- The AI key stays server-side inside server functions; gateway errors (rate limits, credits,
  blocked access) are surfaced honestly in the UI instead of being hidden behind a fake reply.

## Setup instructions

```bash
bun install      # or: npm install
bun run dev      # starts the dev server on http://localhost:8080
bun run build    # production build
```

Environment: `LOVABLE_API_KEY` is provided automatically by Lovable and is read only on the server
inside `src/lib/ai-gateway.server.ts`. No other configuration is required.

### Project structure

```
src/
  components/    AppShell (sidebar + responsive nav), ToolRunner, AiDisclaimer, ui/
  lib/           ai.functions.ts (server functions), ai-gateway.server.ts, ai-prompts.ts
  routes/        index (dashboard), email, notes, planner, research, chat
  styles.css     design tokens (colors, gradients, shadows, typography)
```

## Team members

- zodwa Zhou — concept, prompt design, implementation
