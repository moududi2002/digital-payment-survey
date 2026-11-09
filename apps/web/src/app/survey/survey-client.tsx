"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* =========================================================
   TYPES
========================================================= */

type Answer = "1" | "2" | "3" | "4" | "5";
type SurveyStage = 1 | 2 | 3;
type ScreeningReason = "consent" | "mfs-usage" | null;

type DemographicAnswers = {
  gender: string;
  age: string;
  education: string;
  universityType: string;
  studyYear: string;
};

type UsageAnswers = {
  currentlyUses: string;
  services: string[];
  duration: string;
  frequency: string;
  fraudExperience: string;
};

type SurveyAnswers = {
  consent: string;
  demographics: DemographicAnswers;
  usage: UsageAnswers;
  likert: Record<number, Answer | "">;
};

type Question = {
  id: number;
  statement: string;
};

type QuestionGroup = {
  code: string;
  title: string;
  questions: Question[];
};

/* =========================================================
   QUESTIONNAIRE DATA
========================================================= */

const questionGroups: QuestionGroup[] = [
  {
    code: "A",
    title: "Cyber Fraud Awareness (CFA)",
    questions: [
      { id: 1, statement: "I am aware of common types of cyber fraud in digital payments (e.g., phishing, fake calls, OTP scams)." },
      { id: 2, statement: "I know how to identify fraudulent SMS messages, emails, and fake payment links." },
      { id: 3, statement: "I know where and how to file a complaint if I become a victim of fraud in digital payments." }
    ]
  },
  {
    code: "B",
    title: "Fraud Prevention Behaviour (FPB)",
    questions: [
      { id: 4, statement: "Before making a digital payment, I verify the recipient's identity and transaction details." },
      { id: 5, statement: "I do not share my OTP, PIN, or password with any unknown person." },
      { id: 6, statement: "I avoid using suspicious payment links or messages." }
    ]
  },
  {
    code: "C",
    title: "Perceived Cyber Risk (PCR)",
    questions: [
      { id: 7, statement: "I believe there is a risk of my personal and financial information being stolen when using digital payments." },
      { id: 8, statement: "I believe that I could suffer significant financial losses if I become a victim of fraud through digital payments." },
      { id: 9, statement: "I believe that cyber fraud risks may exist even when using popular digital payment applications." }
    ]
  },
  {
    code: "D",
    title: "Perceived Security (PS)",
    questions: [
      { id: 10, statement: "I feel secure when making financial transactions through digital payment applications." },
      { id: 11, statement: "I believe that the security measures of digital payment applications are capable of preventing unauthorized transactions." },
      { id: 12, statement: "I believe that my personal and financial information is adequately protected when using digital payment applications." }
    ]
  },
  {
    code: "E",
    title: "Trust in Digital Payment Services (TR)",
    questions: [
      { id: 13, statement: "I consider my digital payment service provider to be trustworthy." },
      { id: 14, statement: "I believe that my digital payment service provider is responsible for protecting customers' personal information and money." },
      { id: 15, statement: "I trust that my digital payment service provider will try to provide an appropriate solution if I encounter any problems." }
    ]
  },
  {
    code: "F",
    title: "Perceived Usefulness (PU)",
    questions: [
      { id: 16, statement: "Using digital payments enables me to complete my daily financial transactions more quickly." },
      { id: 17, statement: "Using digital payments saves me time and effort." },
      { id: 18, statement: "Using digital payments makes my daily financial transactions more convenient." }
    ]
  },
  {
    code: "G",
    title: "Perceived Ease of Use (PEOU)",
    questions: [
      { id: 19, statement: "Learning to use digital payment applications is easy for me." },
      { id: 20, statement: "I have no difficulty understanding the various functions and instructions of digital payment applications." },
      { id: 21, statement: "Making financial transactions using digital payment applications requires very little effort from me." }
    ]
  },
  {
    code: "H",
    title: "Spending Behaviour (SB)",
    questions: [
      { id: 22, statement: "I feel that my overall spending has increased as a result of using digital payments." },
      { id: 23, statement: "When using digital payments, I sometimes make additional purchases without prior planning." },
      { id: 24, statement: "When spending through digital payments, I sometimes exceed my planned budget." }
    ]
  },
  {
    code: "I",
    title: "User Satisfaction (US)",
    questions: [
      { id: 25, statement: "I am satisfied with my overall experience of using digital payment services." },
      { id: 26, statement: "Digital payment services perform according to my expectations." },
      { id: 27, statement: "I am satisfied with my decision to use digital payments." }
    ]
  },
  {
    code: "J",
    title: "Continuance Intention (CI)",
    questions: [
      { id: 28, statement: "I intend to continue using digital payments regularly in the future." },
      { id: 29, statement: "I intend to increase my use of digital payments in the coming days." },
      { id: 30, statement: "I am interested in continuing to use digital payments even when alternative payment methods are available." }
    ]
  }
];

/* =========================================================
   LIKERT SCALE
========================================================= */

const likertOptions: { value: Answer; label: string }[] = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "Agree" },
  { value: "5", label: "Strongly Agree" }
];

/* =========================================================
   INITIAL ANSWERS
========================================================= */

const initialAnswers: SurveyAnswers = {
  consent: "",
  demographics: {
    gender: "",
    age: "",
    education: "",
    universityType: "",
    studyYear: ""
  },
  usage: {
    currentlyUses: "",
    services: [],
    duration: "",
    frequency: "",
    fraudExperience: ""
  },
  likert: {}
};

/* =========================================================
   REUSABLE RADIO FIELD
========================================================= */

function RadioField({
  name,
  label,
  value,
  options,
  onChange,
  required = true
}: {
  name: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold leading-6 text-[#34495e]">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </legend>

      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = value === option;

          return (
            <label
              key={option}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                selected
                  ? "border-[#315b78] bg-[#edf4f8] text-[#294f6b]"
                  : "border-[#e2e9f0] bg-white text-[#526274] hover:border-[#b8cbd9]"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={selected}
                onChange={() => onChange(option)}
                className="h-4 w-4 accent-[#315b78]"
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* =========================================================
   REUSABLE SELECT FIELD
========================================================= */

function SelectField({
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option"
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-semibold text-[#34495e]">
        {label}
        <span className="ml-1 text-red-500">*</span>
      </span>

      <select
        value={value}
        required
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 w-full rounded-lg border border-[#dce5ec] bg-white px-4 text-sm text-[#34495e] outline-none transition focus:border-[#315b78] focus:ring-2 focus:ring-[#315b78]/10"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

/* =========================================================
   PROGRESS HEADER
========================================================= */

function ProgressHeader({
  stage,
  completed
}: {
  stage: SurveyStage;
  completed: number;
}) {
  const stages = [
    "Respondent Information",
    "Questionnaire 1–15",
    "Questionnaire 16–30"
  ];

  return (
    <div className="rounded-xl border border-[#e2e9f0] bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-wider text-[#9a786f]">
            SURVEY PROGRESS
          </p>
          <h2 className="mt-1 text-base font-bold text-[#294f6b]">
            Stage {stage} of 3
          </h2>
        </div>

        <span className="text-sm font-semibold tabular-nums text-[#315b78]">
          {completed}%
        </span>
      </div>

      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-[#edf1f5]"
        role="progressbar"
        aria-label="Survey progress"
        aria-valuenow={completed}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-[#315b78] transition-all duration-300"
          style={{ width: `${completed}%` }}
        />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {stages.map((label, index) => {
          const number = index + 1;
          const active = stage === number;
          const passed = stage > number;

          return (
            <div key={label} className="min-w-0">
              <div
                className={`mb-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  passed || active
                    ? "bg-[#315b78] text-white"
                    : "bg-[#edf1f5] text-[#8391a0]"
                }`}
              >
                {passed ? "✓" : number}
              </div>

              <p
                className={`text-[10px] leading-4 sm:text-xs ${
                  active
                    ? "font-bold text-[#315b78]"
                    : "text-[#8290a0]"
                }`}
              >
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   LIKERT QUESTION CARD
========================================================= */

function QuestionCard({
  question,
  value,
  onChange
}: {
  question: Question;
  value: Answer | "";
  onChange: (value: Answer) => void;
}) {
  return (
    <article className="rounded-xl border border-[#e2e9f0] bg-white p-4 sm:p-5">
      <div className="flex gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#edf4f8] text-xs font-bold text-[#315b78]">
          Q{question.id}
        </span>

        <p className="pt-1 text-sm leading-6 font-medium text-[#34495e]">
          {question.statement}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-1.5 sm:gap-2">
        {likertOptions.map((option) => {
          const selected = value === option.value;

          return (
            <label
              key={option.value}
              className={`flex min-w-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border px-1 py-3 text-center transition ${
                selected
                  ? "border-[#315b78] bg-[#edf4f8] text-[#294f6b]"
                  : "border-[#e5ebf0] bg-white text-[#718096] hover:border-[#b8cbd9]"
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                aria-label={`${option.value}: ${option.label}`}
                className="h-4 w-4 accent-[#315b78]"
              />

              <span className="text-sm font-bold">{option.value}</span>

              <span className="hidden text-[10px] leading-4 sm:block">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-2 flex justify-between text-[10px] text-[#9aa5b1] sm:hidden">
        <span>1 = Strongly Disagree</span>
        <span>5 = Strongly Agree</span>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN SURVEY CLIENT
========================================================= */

export default function SurveyClient() {
  const [stage, setStage] = useState<SurveyStage>(1);
  const [answers, setAnswers] = useState<SurveyAnswers>(initialAnswers);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiConnected, setApiConnected] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [screeningReason, setScreeningReason] =
    useState<ScreeningReason>(null);
  const [finished, setFinished] = useState(false);

  /* -------------------------------------------------------
     CHECK API CONNECTION
  ------------------------------------------------------- */

  useEffect(() => {
    let active = true;

    async function checkApiConnection() {
      try {
        const response = await fetch("/api/v1/survey/config", {
          method: "GET",
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error("Unable to load survey configuration.");
        }

        const config = await response.json();

        if (
          !config ||
          !Array.isArray(config.constructs) ||
          config.constructs.length !== 10
        ) {
          throw new Error("Invalid survey configuration received.");
        }

        const questionCount = config.constructs.reduce(
          (total: number, group: { questions?: unknown[] }) =>
            total + (group.questions?.length || 0),
          0
        );

        if (questionCount !== 30) {
          throw new Error("Survey configuration is incomplete.");
        }

        if (active) {
          setApiConnected(true);
          setApiError("");
        }
      } catch {
        if (active) {
          setApiConnected(false);
          setApiError(
            "Unable to connect to the survey server. Please try again later."
          );
        }
      }
    }

    checkApiConnection();

    return () => {
      active = false;
    };
  }, []);

  /* -------------------------------------------------------
     PROGRESS AND QUESTION COUNTER
  ------------------------------------------------------- */

  const allQuestions = questionGroups.flatMap(
    (group) => group.questions
  );

  const answeredCount = Object.values(answers.likert).filter(
    Boolean
  ).length;

  const progress =
    stage === 1 ? 0 : stage === 2 ? 50 : 75;

  /* -------------------------------------------------------
     UPDATE DEMOGRAPHIC ANSWERS
  ------------------------------------------------------- */

  function updateDemographic(
    key: keyof DemographicAnswers,
    value: string
  ) {
    setAnswers((previous) => ({
      ...previous,
      demographics: {
        ...previous.demographics,
        [key]: value
      }
    }));

    setError("");
  }

  /* -------------------------------------------------------
     UPDATE MFS USAGE ANSWERS
  ------------------------------------------------------- */

  function updateUsage<K extends keyof UsageAnswers>(
    key: K,
    value: UsageAnswers[K]
  ) {
    setAnswers((previous) => ({
      ...previous,
      usage: {
        ...previous.usage,
        [key]: value
      }
    }));

    setError("");
  }

  /* -------------------------------------------------------
     UPDATE CONSENT
  ------------------------------------------------------- */

  function handleConsent(value: string) {
    setAnswers((previous) => ({
      ...previous,
      consent: value
    }));

    setError("");

    if (value === "No, I do not agree") {
      setScreeningReason("consent");
      return;
    }

    setScreeningReason(null);
  }

  /* -------------------------------------------------------
     UPDATE MFS SCREENING ANSWER
  ------------------------------------------------------- */

  function handleMfsUsage(value: string) {
    updateUsage("currentlyUses", value);

    if (value === "No") {
      setScreeningReason("mfs-usage");
      return;
    }

    setScreeningReason(null);
  }

  /* -------------------------------------------------------
     MULTIPLE MFS SERVICE SELECTION
  ------------------------------------------------------- */

  function toggleService(service: string) {
    setAnswers((previous) => {
      const currentServices = previous.usage.services;

      const updatedServices = currentServices.includes(service)
        ? currentServices.filter((item) => item !== service)
        : [...currentServices, service];

      return {
        ...previous,
        usage: {
          ...previous.usage,
          services: updatedServices
        }
      };
    });

    setError("");
  }

  /* -------------------------------------------------------
     UPDATE LIKERT ANSWER
  ------------------------------------------------------- */

  function updateLikert(id: number, value: Answer) {
    setAnswers((previous) => ({
      ...previous,
      likert: {
        ...previous.likert,
        [id]: value
      }
    }));

    setError("");
  }

  /* -------------------------------------------------------
     VALIDATE STAGE 1
  ------------------------------------------------------- */

  function validateStageOne(): boolean {
    const { demographics, usage } = answers;

    if (answers.consent !== "Yes, I agree") {
      setError("Please provide your consent before continuing.");
      return false;
    }

    if (
      !demographics.gender ||
      !demographics.age ||
      !demographics.education ||
      !demographics.universityType ||
      !demographics.studyYear
    ) {
      setError("Please complete all demographic questions.");
      return false;
    }

    if (!usage.currentlyUses) {
      setError("Please answer whether you currently use any MFS.");
      return false;
    }

    if (usage.currentlyUses !== "Yes") {
      setError("Only current MFS users are eligible to continue.");
      return false;
    }

    if (usage.services.length === 0) {
      setError("Please select at least one MFS service.");
      return false;
    }

    if (
      !usage.duration ||
      !usage.frequency ||
      !usage.fraudExperience
    ) {
      setError("Please complete all MFS usage questions.");
      return false;
    }

    return true;
  }

  /* -------------------------------------------------------
     VALIDATE LIKERT QUESTIONS
  ------------------------------------------------------- */

  function validateQuestions(start: number, end: number): boolean {
    const unanswered = allQuestions.filter(
      (question) =>
        question.id >= start &&
        question.id <= end &&
        !answers.likert[question.id]
    );

    if (unanswered.length > 0) {
      setError(
        `Please answer all questions. ${unanswered.length} question(s) remain unanswered.`
      );
      return false;
    }

    return true;
  }

  /* -------------------------------------------------------
     NAVIGATION: STAGE 1 TO STAGE 2
  ------------------------------------------------------- */

  function continueFromStageOne() {
    if (!validateStageOne()) return;

    setStage(2);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  /* -------------------------------------------------------
     NAVIGATION: STAGE 2 TO STAGE 3
  ------------------------------------------------------- */

  function continueFromStageTwo() {
    if (!validateQuestions(1, 15)) return;

    setStage(3);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  /* -------------------------------------------------------
     SUBMIT SURVEY TO API
  ------------------------------------------------------- */

  async function finishSurvey() {
    if (submitting) return;

    if (!validateQuestions(16, 30)) return;

    if (!apiConnected) {
      setError(
        "The survey server is not available right now. Please try again later."
      );
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const submissionToken = crypto.randomUUID();

      const likertAnswers = Object.fromEntries(
        Array.from({ length: 30 }, (_, index) => {
          const questionNumber = index + 1;

          return [
            `Q${questionNumber}`,
            Number(answers.likert[questionNumber])
          ];
        })
      );

      const payload = {
        submissionToken,
        consent: true,

        gender: answers.demographics.gender,
        ageGroup: answers.demographics.age,
        education: answers.demographics.education,
        universityType: answers.demographics.universityType,
        studyYear: answers.demographics.studyYear,

        currentlyUsesMfs: true,
        mfsServices: answers.usage.services,
        usageDuration: answers.usage.duration,
        usageFrequency: answers.usage.frequency,
        fraudExperience: answers.usage.fraudExperience,

        answers: likertAnswers
      };

      const response = await fetch("/api/v1/survey/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const serverMessage = Array.isArray(result.message)
          ? result.message.join(", ")
          : result.message;

        throw new Error(
          serverMessage ||
            result.error ||
            "Your response could not be submitted. Please try again."
        );
      }

      // Show completion screen only after successful API submission.
      setFinished(true);
      setError("");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* =======================================================
     SCREENING TERMINATION
  ======================================================= */

  if (screeningReason !== null) {
    const declinedConsent = screeningReason === "consent";

    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-12">
        <section className="w-full max-w-xl rounded-2xl border border-[#e2e9f0] bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf4f8] text-2xl font-bold text-[#315b78]">
            i
          </div>

          <h1 className="mt-6 text-2xl font-bold text-[#294f6b]">
            Thank you for your response
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#718096]">
            {declinedConsent
              ? "You have chosen not to participate in this survey. Your decision is respected. Thank you for your time."
              : "Based on your response to the MFS usage screening question, you are not eligible to continue with this survey. Thank you for your time and consideration."}
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#315b78] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#24465f]"
          >
            Return to home
          </Link>
        </section>
      </main>
    );
  }

  /* =======================================================
     COMPLETION SCREEN
  ======================================================= */

  if (finished) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-12">
        <section className="w-full max-w-xl rounded-2xl border border-[#e2e9f0] bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edf4f8] text-3xl text-[#315b78]">
            ✓
          </div>

          <h1 className="mt-6 text-2xl font-bold text-[#294f6b]">
            Thank you for participating
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#718096]">
            You have completed all 30 research statements.
            Thank you for participating in this academic
            research survey.
          </p>

          <p className="mt-5 rounded-lg border border-[#dce9e1] bg-[#f2f8f4] px-4 py-3 text-sm text-[#38664a]">
            Your response has been successfully submitted and
            recorded.
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#315b78] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#24465f]"
          >
            Return to home
          </Link>
        </section>
      </main>
    );
  }

  /* =======================================================
     MAIN SURVEY INTERFACE
  ======================================================= */

  return (
    <main className="min-h-screen pb-14">
      {/* HEADER */}

      <header className="border-b border-[#e2e9f0] bg-white">
        <div className="survey-shell flex min-h-[68px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#315b78] text-sm font-bold text-white">
              RU
            </span>

            <span>
              <span className="block text-xs font-bold tracking-wide text-[#294f6b]">
                RESEARCH QUESTIONNAIRE
              </span>
              <span className="block text-[10px] text-[#8793a1]">
                MFS Fraud Awareness Study
              </span>
            </span>
          </Link>

          <Link
            href="/"
            className="text-xs font-semibold text-[#718096] transition hover:text-[#315b78]"
          >
            Exit survey
          </Link>
        </div>
      </header>

      <div className="survey-shell max-w-4xl pt-8">
        {/* PAGE INTRODUCTION */}

        <div className="mb-6">
          <p className="text-xs font-bold tracking-[0.18em] text-[#b47e73]">
            ACADEMIC RESEARCH
          </p>

          <h1 className="mt-2 text-2xl leading-tight font-bold text-[#294f6b] sm:text-3xl">
            The Influence of Mobile Financial Services (MFS)
            Fraud Awareness on Continuance Intention among
            University Students in Bangladesh
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#718096]">
            The Roles of Perceived Risk and Trust
          </p>

          <p className="mt-3 text-sm leading-6 text-[#718096]">
            Please read each question carefully and select
            the response that best represents your experience
            or opinion.
          </p>
        </div>

        {/* PROGRESS HEADER */}

        <ProgressHeader stage={stage} completed={progress} />

        {/* API CONNECTION ERROR */}

        {apiError && (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            {apiError}
          </div>
        )}

        {/* =================================================
            STAGE 1
        ================================================= */}

        {stage === 1 && (
          <div className="mt-6 space-y-6">
            {/* SECTION A: CONSENT */}

            <section className="rounded-xl border border-[#e2e9f0] bg-white p-5 sm:p-7">
              <div className="border-b border-[#edf1f5] pb-4">
                <p className="text-xs font-bold tracking-wider text-[#b47e73]">
                  SECTION A
                </p>

                <h2 className="mt-1 text-lg font-bold text-[#294f6b]">
                  Introduction and Consent
                </h2>
              </div>

              <p className="mt-5 text-sm leading-7 text-[#526274]">
                This survey is conducted for academic research
                to understand how fraud awareness, perceived
                risk, security, and trust influence university
                students&apos; intention to continue using Mobile
                Financial Services (MFS) in Bangladesh.
                Participation is voluntary. Responses will be
                kept confidential and used only for academic
                research. Estimated completion time: 5–7
                minutes. Do not provide any PIN, OTP, password,
                or account number.
              </p>

              <div className="mt-6 rounded-xl bg-[#f5f8fb] p-4">
                <RadioField
                  name="consent"
                  label="Do you voluntarily agree to participate in this survey?"
                  value={answers.consent}
                  options={[
                    "Yes, I agree",
                    "No, I do not agree"
                  ]}
                  onChange={handleConsent}
                />
              </div>
            </section>

            {/* SHOW FOLLOWING SECTIONS ONLY AFTER CONSENT */}

            {answers.consent === "Yes, I agree" && (
              <>
                {/* SECTION B: DEMOGRAPHICS */}

                <section className="rounded-xl border border-[#e2e9f0] bg-white p-5 sm:p-7">
                  <div className="border-b border-[#edf1f5] pb-4">
                    <p className="text-xs font-bold tracking-wider text-[#b47e73]">
                      SECTION B
                    </p>

                    <h2 className="mt-1 text-lg font-bold text-[#294f6b]">
                      Demographic Information
                    </h2>
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <SelectField
                      label="D1. Gender"
                      value={answers.demographics.gender}
                      options={[
                        "Male",
                        "Female",
                        "Prefer not to say",
                        "Other"
                      ]}
                      onChange={(value) =>
                        updateDemographic("gender", value)
                      }
                    />

                    <SelectField
                      label="D2. Age"
                      value={answers.demographics.age}
                      options={[
                        "Below 18",
                        "18–20",
                        "21–23",
                        "24–26",
                        "Above 26"
                      ]}
                      onChange={(value) =>
                        updateDemographic("age", value)
                      }
                    />

                    <SelectField
                      label="D3. Education"
                      value={answers.demographics.education}
                      options={[
                        "Undergraduate",
                        "Postgraduate",
                        "Other"
                      ]}
                      onChange={(value) =>
                        updateDemographic("education", value)
                      }
                    />

                    <SelectField
                      label="D4. University type"
                      value={answers.demographics.universityType}
                      options={[
                        "Public University",
                        "Private University",
                        "Other"
                      ]}
                      onChange={(value) =>
                        updateDemographic("universityType", value)
                      }
                    />

                    <SelectField
                      label="D5. Current year of study"
                      value={answers.demographics.studyYear}
                      options={[
                        "1st Year",
                        "2nd Year",
                        "3rd Year",
                        "4th Year",
                        "5th Year or above"
                      ]}
                      onChange={(value) =>
                        updateDemographic("studyYear", value)
                      }
                    />
                  </div>
                </section>

                {/* SECTION C: MFS USAGE */}

                <section className="rounded-xl border border-[#e2e9f0] bg-white p-5 sm:p-7">
                  <div className="border-b border-[#edf1f5] pb-4">
                    <p className="text-xs font-bold tracking-wider text-[#b47e73]">
                      SECTION C
                    </p>

                    <h2 className="mt-1 text-lg font-bold text-[#294f6b]">
                      MFS Usage Information
                    </h2>
                  </div>

                  <div className="mt-6 space-y-7">
                    {/* U1 */}

                    <RadioField
                      name="currentlyUses"
                      label="U1. Do you currently use any MFS?"
                      value={answers.usage.currentlyUses}
                      options={["Yes", "No"]}
                      onChange={handleMfsUsage}
                    />

                    {/* U2 TO U5 */}

                    {answers.usage.currentlyUses === "Yes" && (
                      <>
                        {/* U2 */}

                        <fieldset className="space-y-3">
                          <legend className="text-sm font-semibold text-[#34495e]">
                            U2. Which MFS services do you use? Select all that apply:
                            <span className="ml-1 text-red-500">*</span>
                          </legend>

                          <div className="grid gap-2 sm:grid-cols-2">
                            {[
                              "bKash",
                              "Nagad",
                              "Rocket",
                              "Upay",
                              "Other"
                            ].map((service) => {
                              const selected =
                                answers.usage.services.includes(service);

                              return (
                                <label
                                  key={service}
                                  className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                                    selected
                                      ? "border-[#315b78] bg-[#edf4f8] text-[#294f6b]"
                                      : "border-[#e2e9f0] text-[#526274] hover:border-[#b8cbd9]"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={selected}
                                    onChange={() =>
                                      toggleService(service)
                                    }
                                    className="h-4 w-4 accent-[#315b78]"
                                  />
                                  {service}
                                </label>
                              );
                            })}
                          </div>
                        </fieldset>

                        {/* U3 */}

                        <SelectField
                          label="U3. How long have you been using MFS?"
                          value={answers.usage.duration}
                          options={[
                            "Less than 6 months",
                            "6 months–1 year",
                            "1–2 years",
                            "2–3 years",
                            "More than 3 years"
                          ]}
                          onChange={(value) =>
                            updateUsage("duration", value)
                          }
                        />

                        {/* U4 */}

                        <SelectField
                          label="U4. How frequently do you use MFS?"
                          value={answers.usage.frequency}
                          options={[
                            "Daily",
                            "Several times a week",
                            "Once a week",
                            "Several times a month",
                            "Rarely"
                          ]}
                          onChange={(value) =>
                            updateUsage("frequency", value)
                          }
                        />

                        {/* U5 */}

                        <RadioField
                          name="fraudExperience"
                          label="U5. Have you ever experienced/encountered attempted MFS fraud?"
                          value={answers.usage.fraudExperience}
                          options={[
                            "Yes, I lost money",
                            "Yes, but I did not lose money",
                            "No",
                            "Not sure"
                          ]}
                          onChange={(value) =>
                            updateUsage("fraudExperience", value)
                          }
                        />
                      </>
                    )}
                  </div>
                </section>
              </>
            )}

            {/* VALIDATION ERROR */}

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {/* CONTINUE BUTTON */}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={continueFromStageOne}
                disabled={answers.consent !== "Yes, I agree"}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#315b78] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#24465f] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue to questionnaire
                <span aria-hidden="true" className="ml-3 text-lg">
                  →
                </span>
              </button>
            </div>
          </div>
        )}

        {/* =================================================
            STAGE 2 AND STAGE 3
        ================================================= */}

        {stage >= 2 && (
          <div className="mt-6 space-y-6">
            {/* QUESTIONNAIRE INTRODUCTION */}

            <div className="rounded-xl border border-[#e2e9f0] bg-white p-5 sm:p-6">
              <p className="text-xs font-bold tracking-wider text-[#b47e73]">
                SECTION D
              </p>

              <h2 className="mt-1 text-lg font-bold text-[#294f6b]">
                Main Research Questionnaire
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#718096]">
                Please indicate your level of agreement with
                each statement using the following scale.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-5">
                {likertOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center gap-3 rounded-lg bg-[#f5f8fb] px-3 py-2 sm:flex-col sm:gap-1 sm:text-center"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#315b78] text-xs font-bold text-white">
                      {option.value}
                    </span>

                    <span className="text-xs text-[#526274]">
                      {option.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* QUESTION GROUPS */}

            {questionGroups.map((group) => {
              const visibleQuestions = group.questions.filter(
                (question) =>
                  stage === 2
                    ? question.id >= 1 && question.id <= 15
                    : question.id >= 16 && question.id <= 30
              );

              if (visibleQuestions.length === 0) return null;

              return (
                <section key={group.code} className="space-y-3">
                  <div className="rounded-lg border-l-4 border-[#c99589] bg-white px-5 py-4">
                    <p className="text-[10px] font-bold tracking-widest text-[#b47e73]">
                      CONSTRUCT {group.code}
                    </p>

                    <h3 className="mt-1 text-base font-bold text-[#294f6b]">
                      {group.title}
                    </h3>
                  </div>

                  {visibleQuestions.map((question) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      value={answers.likert[question.id] || ""}
                      onChange={(value) =>
                        updateLikert(question.id, value)
                      }
                    />
                  ))}
                </section>
              );
            })}

            {/* ANSWER COUNTER */}

            <div className="rounded-xl border border-[#e2e9f0] bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-[#718096]">
                  {stage === 2
                    ? "Questions 1–15"
                    : "Questions 16–30"}
                </span>

                <span className="text-sm font-bold text-[#315b78]">
                  {answeredCount} / 30 answered
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#edf1f5]">
                <div
                  className="h-full rounded-full bg-[#315b78] transition-all"
                  style={{
                    width: `${(answeredCount / 30) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* VALIDATION ERROR */}

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {/* NAVIGATION BUTTONS */}

            <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setStage(stage === 2 ? 1 : 2);
                  setError("");

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                  });
                }}
                disabled={submitting}
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#dce5ec] bg-white px-6 py-3 text-sm font-semibold text-[#526274] transition hover:bg-[#f5f8fb] disabled:cursor-not-allowed disabled:opacity-50"
              >
                ← Previous
              </button>

              {stage === 2 ? (
                <button
                  type="button"
                  onClick={continueFromStageTwo}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#315b78] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#24465f]"
                >
                  Continue to Q16–Q30 →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={finishSurvey}
                  disabled={submitting || !apiConnected}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#315b78] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#24465f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      Submitting response...
                      <span className="ml-3 animate-spin">◌</span>
                    </>
                  ) : (
                    <>
                      Complete questionnaire
                      <span aria-hidden="true" className="ml-3">
                        ✓
                      </span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* FOOTER */}

        <p className="mt-10 text-center text-xs leading-6 text-[#9aa5b1]">
          Academic research questionnaire · Bangladesh
          <br />
          Your participation is voluntary.
        </p>
      </div>
    </main>
  );
}