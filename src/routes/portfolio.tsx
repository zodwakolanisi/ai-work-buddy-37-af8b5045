import { createFileRoute } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  MapPin,
  BadgeCheck,
  GraduationCap,
  Briefcase,
  Users,
  Quote,
} from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Zodwa Kolanisi — Professional Educator Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Zodwa Kolanisi, SACE-registered Professional Educator teaching Accounting, Business Studies, EMS, Life Skills and Creative Arts across Intermediate, GET and FET phases.",
      },
      { property: "og:title", content: "Zodwa Kolanisi — Professional Educator Portfolio" },
      {
        property: "og:description",
        content:
          "Qualified SACE-registered educator: teaching experience, qualifications, extra-mural leadership and references.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

const EXPERIENCE = [
  {
    role: "Examination Invigilator",
    org: "Stellenbosch University",
    period: "May 2026 – June 2026",
    text: "Maintained strict examination integrity, enforced university academic protocols, provided candidate support and managed secure assessment administration processes.",
  },
  {
    role: "GET Phase Educator (Grade 8 & 9)",
    org: "Luhlaaza High School",
    period: "June 2025 – December 2025",
    text: "Specialised in Economic & Management Sciences (EMS) and Creative Arts. Focused on foundational financial literacy, introduction to entrepreneurship and artistic expression, aligned with CAPS guidelines.",
  },
  {
    role: "Intersen Phase Educator (Grade 5 & 8)",
    org: "Yomelela Primary School",
    period: "September 2021 – September 2024",
    text: "Instructed learners in Life Skills, EMS and Creative Arts. Facilitated socio-emotional development, life orientation frameworks, basic economic concepts and cultural expression.",
  },
  {
    role: "FET Phase Educator (Grade 10 & 11)",
    org: "Nkosemntu Motman Senior Secondary School",
    period: "December 2020 – April 2021",
    text: "Delivered rigorous, syllabus-focused instruction in Accounting and Business Studies, equipping senior learners with critical financial accounting competencies and strategic analytical skills.",
  },
];

const EDUCATION = [
  {
    title: "Bachelor of Education (B.Ed)",
    meta: "Walter Sisulu University · Graduated 2019",
    text: "Initial professional teacher qualification covering foundational frameworks, modern pedagogical strategies and holistic classroom methodology.",
  },
  {
    title: "Grade 12 National Senior Certificate (Matric)",
    meta: "Nkosemntu Motman Senior Secondary School · Passed 2013",
    text: "Completed the National Senior Certificate with a focus on commerce subjects.",
  },
];

const EXTRA_MURAL = [
  {
    title: "Netball",
    text: "Organising team training, strategic coordination, physical fitness development and leading match mentorship.",
  },
  {
    title: "Debate",
    text: "Mentoring public speaking fluency, critical structured thinking, socio-political research capability and competitive tournament preparation.",
  },
];

const REFERENCES = [
  { name: "Mr Mqikela", role: "Deputy Principal & Mentor, Yomelela Primary School", phone: "063 260 6750" },
  { name: "Mr Sididi", role: "Principal, Yomelela Primary School", phone: "082 708 8943" },
];

const SUBJECTS = [
  "Accounting",
  "Business Studies",
  "Economic & Management Sciences",
  "Life Skills",
  "Creative Arts",
  "CAPS Curriculum Delivery",
  "Classroom Management",
  "Assessment & Moderation",
];

function PortfolioPage() {
  return (
    <div>
      <section className="gradient-hero shadow-lift relative overflow-hidden rounded-3xl px-6 py-10 text-primary-foreground sm:px-10 sm:py-14">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase opacity-80">
          Professional teaching portfolio
        </p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">Zodwa Kolanisi</h1>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-sm font-medium">
          <BadgeCheck className="size-4" aria-hidden /> Professional Qualified Educator · SACE Registered
        </p>
        <div className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
          <a href="tel:0782557550" className="inline-flex items-center gap-2 hover:underline">
            <Phone className="size-4" aria-hidden /> 078 255 7550
          </a>
          <a href="mailto:zhoukolanisi@gmail.com" className="inline-flex items-center gap-2 hover:underline">
            <Mail className="size-4" aria-hidden /> zhoukolanisi@gmail.com
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4" aria-hidden /> L322 Sigkoti Street
          </span>
          <span className="inline-flex items-center gap-2">
            <BadgeCheck className="size-4" aria-hidden /> SACE Status: Registered
          </span>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-lg font-semibold">Professional profile</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Dedicated, qualified and SACE-registered Professional Educator with extensive experience
          teaching across the Intermediate, GET and FET phases. Proven track record of delivering
          high-quality education in Accounting, Business Studies, Economic and Management Sciences,
          Life Skills and Creative Arts. Highly adept at managing dynamic classrooms, implementing
          the CAPS curriculum and fostering holistic student growth through both academic excellence
          and extra-mural engagement.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <li
              key={s}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
            >
              {s}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Briefcase className="size-5 text-primary" aria-hidden /> Professional teaching experience
        </h2>
        <ol className="mt-4 space-y-4 border-l border-border pl-5">
          {EXPERIENCE.map((e) => (
            <li key={e.role} className="relative rounded-2xl border border-border bg-card p-5 shadow-soft">
              <span className="absolute -left-[1.65rem] top-7 size-3 rounded-full bg-primary" aria-hidden />
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-base font-semibold">{e.role}</h3>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {e.period}
                </span>
              </div>
              <p className="text-sm font-medium text-primary">{e.org}</p>
              <p className="mt-2 text-sm text-muted-foreground">{e.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <GraduationCap className="size-5 text-primary" aria-hidden /> Education & qualifications
          </h2>
          <div className="mt-4 space-y-4">
            {EDUCATION.map((q) => (
              <div key={q.title} className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="text-base font-semibold text-surface-foreground">{q.title}</h3>
                <p className="text-xs text-muted-foreground">{q.meta}</p>
                <p className="mt-2 text-sm text-muted-foreground">{q.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Users className="size-5 text-primary" aria-hidden /> Co-curricular & extra-mural leadership
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Committed to the holistic development of learners outside the standard academic classroom.
            Active facilitator and coach in:
          </p>
          <div className="mt-4 space-y-4">
            {EXTRA_MURAL.map((x) => (
              <div key={x.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <h3 className="text-base font-semibold">{x.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{x.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Professional references</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {REFERENCES.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h3 className="text-base font-semibold">{r.name}</h3>
              <p className="text-sm text-muted-foreground">{r.role}</p>
              <a
                href={`tel:${r.phone.replace(/\s/g, "")}`}
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Phone className="size-4" aria-hidden /> {r.phone}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-border bg-surface p-6 text-center">
        <Quote className="mx-auto size-6 text-primary" aria-hidden />
        <p className="mt-3 font-display text-lg font-semibold text-surface-foreground">
          Inspiring minds. Building futures. Transforming lives.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Passionate about education. Committed to excellence. Driven by purpose.
        </p>
      </section>
    </div>
  );
}
