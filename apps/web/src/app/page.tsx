import Link from "next/link";

const researchDetails = [
  {
    number: "01",
    title: "Fraud Awareness",
    description:
      "Understanding awareness of common cyber fraud methods in digital payments."
  },
  {
    number: "02",
    title: "Perceived Risk & Security",
    description:
      "Exploring how students perceive digital payment risks and security measures."
  },
  {
    number: "03",
    title: "Trust & Continuance Intention",
    description:
      "Examining trust, satisfaction, and intention to continue using digital payments."
  }
];

const surveyFacts = [
  { value: "5–7 min", label: "Estimated time" },
  { value: "30", label: "Research statements" },
  { value: "18+", label: "Intended respondents" }
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-[#e2e9f0] bg-white">
        <div className="survey-shell flex min-h-[76px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#315b78] text-lg font-bold text-white">
              RU
            </span>
            <span>
              <span className="block text-sm font-bold tracking-wide text-[#263d52]">
                RESEARCH SURVEY
              </span>
              <span className="block text-xs text-[#718096]">
                Academic Research Project
              </span>
            </span>
          </Link>

          <span className="hidden rounded-full border border-[#dce7ef] bg-[#f5f8fb] px-4 py-2 text-xs font-semibold text-[#315b78] sm:inline-flex">
            BANGLADESH
          </span>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#294f6b] text-white">
        <div className="hero-pattern absolute inset-0 opacity-60" />
        <div className="survey-shell relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white/90">
              <span className="h-2 w-2 rounded-full bg-[#d8a99d]" />
              ACADEMIC RESEARCH QUESTIONNAIRE
            </div>

            <h1 className="max-w-3xl text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-[46px]">
              The Influence of Mobile Financial Services (MFS) Fraud Awareness
              on Continuance Intention among University Students in Bangladesh
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              The Roles of Perceived Risk and Trust
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              This academic survey aims to understand how fraud awareness,
              perceived risk, security, and trust influence university
              students&apos; intention to continue using Mobile Financial
              Services (MFS) in Bangladesh.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/survey"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-7 py-3 text-sm font-bold text-[#294f6b] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#f3f6f9]"
              >
                Start the survey
                <span aria-hidden="true" className="ml-3 text-lg">
                  →
                </span>
              </Link>

              <span className="text-xs text-white/65">
                Voluntary participation · Confidential responses
              </span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-sm sm:p-7">
              <p className="text-xs font-semibold tracking-[0.18em] text-white/65">
                SURVEY OVERVIEW
              </p>

              <div className="mt-6 space-y-5">
                {surveyFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-center justify-between border-b border-white/15 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-white/75">
                      {fact.label}
                    </span>
                    <span className="text-xl font-bold text-white">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-xl bg-white/10 p-4">
                <p className="text-sm font-semibold text-white">
                  Your privacy matters
                </p>
                <p className="mt-2 text-xs leading-6 text-white/70">
                  Never provide your PIN, OTP, password, or financial account
                  number in this survey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="survey-shell py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-[#b47e73]">
            ABOUT THIS STUDY
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#263d52] sm:text-3xl">
            Help us understand digital payment behaviour
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#687789] sm:text-base">
            Your participation will contribute to academic research on the
            relationship between fraud awareness and the continued use of
            mobile financial services among university students in Bangladesh.
          </p>
        </div>

        <div className="mt-11 grid gap-5 md:grid-cols-3">
          {researchDetails.map((item) => (
            <article
              key={item.number}
              className="rounded-2xl border border-[#e2e9f0] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-sm font-bold tracking-widest text-[#c99589]">
                {item.number}
              </span>
              <h3 className="mt-5 text-lg font-bold text-[#294f6b]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#718096]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="survey-details" className="survey-shell pb-16">
        <div className="rounded-2xl border border-[#e2e9f0] bg-white p-6 sm:p-9">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-xl font-bold text-[#294f6b]">
                Before you participate
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#687789]">
                <li className="flex gap-3">
                  <span className="font-bold text-[#c99589]">01</span>
                  Participation is entirely voluntary.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-[#c99589]">02</span>
                  Responses will be kept confidential and used only for
                  academic research.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-[#c99589]">03</span>
                  Estimated completion time is 5–7 minutes.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-[#c99589]">04</span>
                  Do not share any PIN, OTP, password, or account number.
                </li>
              </ul>
            </div>

            <Link
              href="/survey"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#315b78] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#24465f]"
            >
              Continue to survey
              <span aria-hidden="true" className="ml-3 text-lg">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e2e9f0] bg-white">
        <div className="survey-shell flex flex-col gap-2 py-7 text-center text-xs text-[#8793a1] sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>Academic Research Questionnaire</p>
          <p>Mobile Financial Services Fraud Awareness Study · Bangladesh</p>
        </div>
      </footer>
    </main>
  );
}