"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Globe2,
  Layers3,
  ShoppingBag,
  Code2,
  RotateCcw,
  Send,
  MessageCircle,
} from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import Link from "next/link";

const projects = [
  {
    id: "business",
    title: "Business website",
    description: "A professional website for your company.",
    price: 700,
    icon: Globe2,
  },
  {
    id: "landing",
    title: "Landing page",
    description: "One focused page designed to convert.",
    price: 350,
    icon: Layers3,
  },
  {
    id: "ecommerce",
    title: "E-commerce store",
    description: "Sell products with a tailored storefront.",
    price: 1400,
    icon: ShoppingBag,
  },
  {
    id: "webapp",
    title: "Custom web application",
    description: "A tailored platform with custom functionality.",
    price: 2200,
    icon: Code2,
  },
] as const;

const designs = [
  {
    id: "essential",
    title: "Essential",
    description: "Clean, simple, and focused.",
    multiplier: 1,
  },
  {
    id: "custom",
    title: "Custom design",
    description: "Distinctive design tailored to your brand.",
    multiplier: 1.35,
  },
  {
    id: "premium",
    title: "Premium experience",
    description: "Refined interactions and detailed art direction.",
    multiplier: 1.7,
  },
] as const;

const pageOptions = [
  { label: "1–3 pages", value: 1, price: 0 },
  { label: "4–6 pages", value: 5, price: 180 },
  { label: "7–10 pages", value: 8, price: 420 },
  { label: "11–15 pages", value: 12, price: 750 },
  { label: "16+ pages", value: 16, price: 1100 },
] as const;

const contentOptions = [
  {
    id: "ready",
    title: "Content is ready",
    description: "I'll provide the copy and images.",
    price: 0,
  },
  {
    id: "help",
    title: "Help refining content",
    description: "Help polish and organize my content.",
    price: 180,
  },
  {
    id: "full",
    title: "Create content for me",
    description: "Writing and content direction included.",
    price: 400,
  },
] as const;

const features = [
  { id: "cms", title: "Content management", price: 250 },
  { id: "booking", title: "Booking & appointments", price: 300 },
  { id: "payments", title: "Online payments", price: 350 },
  { id: "languages", title: "Multiple languages", price: 220 },
  { id: "chatbot", title: "AI chatbot / receptionist", price: 450 },
  { id: "seo", title: "SEO foundations", price: 180 },
  { id: "motion", title: "Animations & interactions", price: 220 },
  { id: "integrations", title: "Third-party integrations", price: 250 },
] as const;

const timelines = [
  {
    id: "flexible",
    title: "Flexible",
    description: "A schedule that prioritizes careful planning.",
    multiplier: 1,
  },
  {
    id: "standard",
    title: "Standard timeline",
    description: "A balanced design, development, and review process.",
    multiplier: 1.05,
  },
  {
    id: "priority",
    title: "Priority delivery",
    description: "A faster turnaround, subject to availability.",
    multiplier: 1.2,
  },
] as const;

const money = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const steps = ["Project", "Design", "Features", "Timeline", "Enquiry"];

type FeatureId = (typeof features)[number]["id"];

export default function WebsiteCostCalculator() {
  const [step, setStep] = useState(0);
  const [projectId, setProjectId] = useState("business");
  const [designId, setDesignId] = useState("custom");
  const [pages, setPages] = useState(5);
  const [contentId, setContentId] = useState("help");
  const [selectedFeatures, setSelectedFeatures] = useState<FeatureId[]>([
    "seo",
  ]);
  const [timelineId, setTimelineId] = useState("flexible");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmationSent, setConfirmationSent] = useState(false);

  const project = projects.find((item) => item.id === projectId)!;
  const design = designs.find((item) => item.id === designId)!;
  const pageOption = pageOptions.find((item) => item.value === pages)!;
  const content = contentOptions.find((item) => item.id === contentId)!;
  const timeline = timelines.find((item) => item.id === timelineId)!;

  const featureTotal = selectedFeatures.reduce((total, id) => {
    return total + (features.find((feature) => feature.id === id)?.price ?? 0);
  }, 0);

  const subtotal = useMemo(
    () =>
      project.price * design.multiplier +
      pageOption.price +
      content.price +
      featureTotal,
    [project, design, pageOption, content, featureTotal],
  );

  const total = Math.round((subtotal * timeline.multiplier) / 50) * 50;

  const estimateLow = Math.round((total * 0.9) / 50) * 50;
  const estimateHigh = Math.round((total * 1.15) / 50) * 50;

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = name.trim().length > 1 && emailValid;

  function toggleFeature(id: FeatureId) {
    setSelectedFeatures((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function resetCalculator() {
    setStep(0);
    setProjectId("business");
    setDesignId("custom");
    setPages(5);
    setContentId("help");
    setSelectedFeatures(["seo"]);
    setTimelineId("flexible");
    setName("");
    setEmail("");
    setDetails("");
    setSubmitted(false);
  }

  async function sendEnquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit || sending || submitted) return;

    setSending(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/website-cost-calculator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          project: project.title,
          design: design.title,
          pages: pageOption.label,
          content: content.title,
          features: selectedFeatures
            .map((id) => features.find((feature) => feature.id === id)?.title)
            .filter(Boolean),
          timeline: timeline.title,
          estimate: {
            total,
            low: estimateLow,
            high: estimateHigh,
          },
          details: details.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to submit your enquiry. Please try again.",
        );
      }

      setConfirmationSent(Boolean(result.confirmationSent));
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-[#0b0d10]/15 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#1f2937]/40 focus:border-[#5b7cfa] focus:ring-2 focus:ring-[#5b7cfa]/15";

  return (
    <main className="min-h-screen bg-[#fafaf9] font-space-grotesk text-[#0b0d10]">
      {/* Header */}
      {/* <header className="border-b border-[#0b0d10]/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <a
            href="/"
            className="text-xl font-bold tracking-[-0.06em]"
          >
            NexGenByte<span className="text-[#5b7cfa]">.</span>
          </a>

          <a
            href="mailto:hello@nexgenbyte.com"
            className="hidden text-sm font-medium text-[#1f2937] transition hover:text-[#5b7cfa] sm:block"
          >
            Have a question?{" "}
            <span className="underline underline-offset-4">
              Talk to us
            </span>
          </a>

          <a
            href="mailto:hello@nexgenbyte.com"
            aria-label="Contact NexGenByte"
            className="rounded-full border border-[#0b0d10]/15 p-2 sm:hidden"
          >
            <MessageCircle size={18} />
          </a>
        </div>
      </header> */}
      <Header />

      {/* Main */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-30 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12 lg:py-30">
        {/* Intro and live price */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.17em] text-[#5b7cfa]">
            <span className="h-2 w-2 rounded-full bg-[#5b7cfa]" />
            Project estimator
          </p>

          <h1 className="max-w-xl text-4xl font-semibold leading-[1.06] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
            Great websites start with a clear plan.
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-[#1f2937]/75">
            Tell us what you need. Build your estimate in a few quick steps and
            get a realistic starting point for your project.
          </p>

          <div className="mt-9 border-t border-[#0b0d10]/10 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1f2937]/55">
              Your estimated project cost
            </p>

            <p className="mt-3 text-5xl font-semibold tracking-[-0.06em]">
              {money(total)}
            </p>

            <p className="mt-3 text-sm leading-6 text-[#1f2937]/65">
              Typical working range:{" "}
              <span className="font-semibold text-[#0b0d10]">
                {money(estimateLow)}–{money(estimateHigh)}
              </span>
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Custom-built", "Conversion-focused", "No obligation"].map(
                (label) => (
                  <span
                    key={label}
                    className="rounded-full border border-[#0b0d10]/10 px-3 py-1.5 text-xs text-[#1f2937]/75"
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="mt-8 hidden rounded-xl bg-[#0b0d10] p-5 text-white sm:block">
            <p className="text-sm font-semibold">Not sure what you need?</p>
            <p className="mt-2 text-sm leading-6 text-white/65">
              We can help define the right scope for your business before
              confirming a proposal.
            </p>
            <Link href={"/contact"}  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
    
              Talk to our team <ArrowRight size={15} />
              </Link>
           
          </div>
        </aside>

        {/* Calculator card */}
        <section className="overflow-hidden rounded-2xl border border-[#0b0d10]/10 bg-white shadow-[0_12px_50px_rgba(11,13,16,0.045)]">
          <div className="border-b border-[#0b0d10]/10 px-5 py-5 sm:px-8 sm:py-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Build your estimate</p>
                <p className="mt-1 text-xs text-[#1f2937]/60">
                  Step {step + 1} of {steps.length}
                </p>
              </div>

              <button
                type="button"
                onClick={resetCalculator}
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-[#1f2937]/65 transition hover:bg-[#fafaf9] hover:text-[#0b0d10]"
              >
                <RotateCcw size={13} /> Reset
              </button>
            </div>

            <div className="mt-5 grid grid-cols-5 gap-1.5">
              {steps.map((label, index) => (
                <div key={label}>
                  <div
                    className={`h-1 rounded-full ${
                      index <= step ? "bg-[#5b7cfa]" : "bg-[#0b0d10]/10"
                    }`}
                  />
                  <span
                    className={`mt-2 hidden text-[10px] sm:block ${
                      index === step
                        ? "font-semibold text-[#0b0d10]"
                        : "text-[#1f2937]/45"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={sendEnquiry}>
            <div className="min-h-[440px] px-5 py-6 sm:px-8 sm:py-8">
              {/* STEP 1 */}
              {step === 0 && (
                <div>
                  <StepLabel>01 / The project</StepLabel>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    What are we building?
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#1f2937]/65">
                    Choose the closest match. We can refine the scope later.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {projects.map((item) => {
                      const Icon = item.icon;
                      const active = projectId === item.id;

                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setProjectId(item.id)}
                          aria-pressed={active}
                          className={`min-h-[150px] rounded-xl border p-4 text-left transition ${
                            active
                              ? "border-[#5b7cfa] bg-[#5b7cfa]/[0.055] ring-1 ring-[#5b7cfa]/20"
                              : "border-[#0b0d10]/10 hover:border-[#0b0d10]/25 hover:bg-[#fafaf9]"
                          }`}
                        >
                          <span className="flex items-center justify-between">
                            <span
                              className={`grid h-9 w-9 place-items-center rounded-lg ${
                                active
                                  ? "bg-[#5b7cfa] text-white"
                                  : "bg-[#fafaf9] text-[#1f2937]"
                              }`}
                            >
                              <Icon size={18} />
                            </span>
                            <span
                              className={`grid h-5 w-5 place-items-center rounded-full border ${
                                active
                                  ? "border-[#5b7cfa] bg-[#5b7cfa] text-white"
                                  : "border-[#0b0d10]/20 text-transparent"
                              }`}
                            >
                              <Check size={12} />
                            </span>
                          </span>
                          <span className="mt-4 block font-semibold">
                            {item.title}
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-[#1f2937]/65">
                            {item.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <label
                    htmlFor="page-count"
                    className="mt-6 block text-sm font-medium"
                  >
                    How many pages do you need?
                  </label>
                  <select
                    id="page-count"
                    value={pages}
                    onChange={(event) => setPages(Number(event.target.value))}
                    className={`${fieldClass} mt-2`}
                  >
                    {pageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* STEP 2 */}
              {step === 1 && (
                <div>
                  <StepLabel>02 / Visual direction</StepLabel>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    How should it feel?
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#1f2937]/65">
                    Choose the design level that fits your brand.
                  </p>

                  <div className="mt-6 space-y-3">
                    {designs.map((item, index) => {
                      const active = designId === item.id;

                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setDesignId(item.id)}
                          aria-pressed={active}
                          className={`flex w-full items-start gap-4 rounded-xl border p-5 text-left transition ${
                            active
                              ? "border-[#5b7cfa] bg-[#5b7cfa]/[0.055]"
                              : "border-[#0b0d10]/10 hover:border-[#0b0d10]/25"
                          }`}
                        >
                          <SelectionMark active={active} />
                          <span className="flex-1">
                            <span className="flex flex-wrap items-center gap-2 font-semibold">
                              {item.title}
                              {index === 1 && (
                                <span className="rounded-full bg-[#5b7cfa]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#5b7cfa]">
                                  Popular
                                </span>
                              )}
                            </span>
                            <span className="mt-1 block text-sm leading-6 text-[#1f2937]/65">
                              {item.description}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-7 border-t border-[#0b0d10]/10 pt-6">
                    <p className="text-sm font-medium">
                      What about the content?
                    </p>
                    <div className="mt-3 space-y-2">
                      {contentOptions.map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setContentId(item.id)}
                          aria-pressed={contentId === item.id}
                          className={`flex w-full items-center justify-between gap-3 rounded-lg border p-4 text-left transition ${
                            contentId === item.id
                              ? "border-[#5b7cfa] bg-[#5b7cfa]/[0.045]"
                              : "border-[#0b0d10]/10 hover:border-[#0b0d10]/25"
                          }`}
                        >
                          <span>
                            <span className="block text-sm font-medium">
                              {item.title}
                            </span>
                            <span className="mt-1 block text-xs text-[#1f2937]/60">
                              {item.description}
                            </span>
                          </span>
                          <span className="shrink-0 text-xs font-semibold">
                            {item.price ? `+${money(item.price)}` : "Included"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 2 && (
                <div>
                  <StepLabel>03 / Functionality</StepLabel>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    What should it do?
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#1f2937]/65">
                    Add features that will make your website more useful.
                  </p>

                  <div className="mt-6 divide-y divide-[#0b0d10]/10">
                    {features.map((item) => {
                      const active = selectedFeatures.includes(item.id);

                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => toggleFeature(item.id)}
                          aria-pressed={active}
                          className="flex w-full items-center gap-3 py-4 text-left"
                        >
                          <span
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded border ${
                              active
                                ? "border-[#5b7cfa] bg-[#5b7cfa] text-white"
                                : "border-[#0b0d10]/20 text-transparent"
                            }`}
                          >
                            <Check size={12} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium">
                              {item.title}
                            </span>
                            <span className="mt-1 block text-xs text-[#1f2937]/60">
                              Optional project feature
                            </span>
                          </span>
                          <span className="shrink-0 text-sm font-medium">
                            +{money(item.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 flex items-center justify-between rounded-lg bg-[#fafaf9] px-4 py-3">
                    <span className="text-sm text-[#1f2937]/70">
                      {selectedFeatures.length} selected
                    </span>
                    <span className="text-sm font-semibold">
                      {money(featureTotal)}
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 3 && (
                <div>
                  <StepLabel>04 / Delivery</StepLabel>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    When do you need it?
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#1f2937]/65">
                    Choose your preferred pace. We’ll confirm a realistic
                    schedule before starting.
                  </p>

                  <div className="mt-6 space-y-3">
                    {timelines.map((item, index) => {
                      const active = timelineId === item.id;

                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setTimelineId(item.id)}
                          aria-pressed={active}
                          className={`flex w-full items-start gap-4 rounded-xl border p-5 text-left transition ${
                            active
                              ? "border-[#5b7cfa] bg-[#5b7cfa]/[0.055]"
                              : "border-[#0b0d10]/10 hover:border-[#0b0d10]/25"
                          }`}
                        >
                          <SelectionMark active={active} />
                          <span>
                            <span className="flex flex-wrap items-center gap-2 font-semibold">
                              {item.title}
                              {index === 1 && (
                                <span className="rounded-full bg-[#fafaf9] px-2 py-1 text-[10px] text-[#1f2937]/60">
                                  Recommended
                                </span>
                              )}
                            </span>
                            <span className="mt-1 block text-sm leading-6 text-[#1f2937]/65">
                              {item.description}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-7 rounded-xl border border-[#0b0d10]/10 p-5">
                    <p className="text-sm font-semibold">Estimate summary</p>
                    <div className="mt-4 space-y-3 text-sm">
                      <SummaryRow label="Project" amount={project.price} />
                      <SummaryRow
                        label="Design upgrade"
                        amount={Math.round(
                          project.price * (design.multiplier - 1),
                        )}
                      />
                      <SummaryRow
                        label="Additional pages"
                        amount={pageOption.price}
                      />
                      <SummaryRow label="Content" amount={content.price} />
                      <SummaryRow label="Features" amount={featureTotal} />
                      <SummaryRow
                        label="Timeline adjustment"
                        amount={Math.round(
                          subtotal * (timeline.multiplier - 1),
                        )}
                      />
                    </div>

                    <div className="mt-4 border-t border-[#0b0d10]/10 pt-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold">
                          Estimated total
                        </span>
                        <span className="text-2xl font-semibold tracking-[-0.04em]">
                          {money(total)}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-[#1f2937]/55">
                        Planning estimate only. Final pricing depends on agreed
                        scope, content, and integrations.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5 */}
              {step === 4 && (
                <div>
                  <StepLabel>05 / Next step</StepLabel>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    Let’s discuss your project.
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#1f2937]/65">
                    Share your details and we’ll prepare an enquiry with your
                    selected requirements.
                  </p>

                  {submitted ? (
                    <div
                      role="status"
                      className="mt-7 rounded-xl border border-[#5b7cfa]/25 bg-[#5b7cfa]/[0.06] p-6"
                    >
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-[#5b7cfa]/10 text-[#5b7cfa]">
                        <Check size={22} />
                      </div>

                      <h3 className="mt-4 text-xl font-semibold tracking-tight">
                        Your enquiry has been submitted.
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#1f2937]/70">
                        Thank you for considering NexGenByte. We've received
                        your project details and will review your requirements.
                      </p>

                      {confirmationSent ? (
                        <p className="mt-4 text-sm font-medium text-[#1f2937]">
                          A confirmation email has been sent to {email}.
                        </p>
                      ) : (
                        <p className="mt-4 text-sm leading-6 text-[#1f2937]/70">
                          Your enquiry was received, but we couldn't send the
                          confirmation email. Please check your inbox later or
                          contact hadi@nexgenbyte.com.
                        </p>
                      )}

                      <p className="mt-4 text-sm text-[#1f2937]/60">
                        Estimated project range: {money(estimateLow)}–
                        {money(estimateHigh)}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-7 space-y-5">
                      <div>
                        <label
                          htmlFor="customer-name"
                          className="mb-2 block text-sm font-medium"
                        >
                          Your name
                        </label>
                        <input
                          id="customer-name"
                          autoComplete="name"
                          required
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          placeholder="Jane Smith"
                          className={fieldClass}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="customer-email"
                          className="mb-2 block text-sm font-medium"
                        >
                          Work email
                        </label>
                        <input
                          id="customer-email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="you@company.com"
                          className={fieldClass}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="project-details"
                          className="mb-2 block text-sm font-medium"
                        >
                          Tell us about your project{" "}
                          <span className="font-normal text-[#1f2937]/50">
                            (optional)
                          </span>
                        </label>
                        <textarea
                          id="project-details"
                          rows={4}
                          value={details}
                          onChange={(event) => setDetails(event.target.value)}
                          placeholder="Your business, goals, reference websites, or specific requirements..."
                          className={`${fieldClass} resize-y`}
                        />
                      </div>

                      <div className="rounded-xl bg-[#fafaf9] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm text-[#1f2937]/65">
                            Estimated range
                          </span>
                          <span className="text-sm font-semibold">
                            {money(estimateLow)}–{money(estimateHigh)}
                          </span>
                        </div>
                        <p className="mt-2 text-xs leading-5 text-[#1f2937]/55">
                          This is an initial estimate, not a fixed quote.
                          There’s no obligation to proceed.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-3 border-t border-[#0b0d10]/10 px-5 py-4 sm:px-8">
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep((current) => Math.max(0, current - 1))}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-[#1f2937]/70 transition hover:bg-[#fafaf9] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowLeft size={16} /> Back
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep((current) => Math.min(4, current + 1))}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#5b7cfa] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4969e7] focus:outline-none focus:ring-4 focus:ring-[#5b7cfa]/20"
                >
                  Continue <ArrowRight size={16} />
                  {submitError && (
  <p
    role="alert"
    className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
  >
    {submitError}
  </p>
)}
                </button>
              ) : submitted ? (
                <button
                  type="button"
                  onClick={resetCalculator}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0b0d10] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
                >
                  New estimate <RotateCcw size={15} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canSubmit || sending}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#5b7cfa] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4969e7] focus:outline-none focus:ring-4 focus:ring-[#5b7cfa]/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {sending ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Sending enquiry...
                    </>
                  ) : (
                    <>
                      Send my enquiry <Send size={15} />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </section>
      </section>

      {/* Footer */}
      {/* <footer className="border-t border-[#0b0d10]/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-[#1f2937]/55 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span>
            © {new Date().getFullYear()} NexGenByte. Built around your business.
          </span>
          <a
            href="mailto:hello@nexgenbyte.com"
            className="transition hover:text-[#5b7cfa]"
          >
            hello@nexgenbyte.com
          </a>
        </div>
      </footer> */}

      <Footer />
    </main>
  );
}

function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5b7cfa]">
      {children}
    </p>
  );
}

function SelectionMark({ active }: { active: boolean }) {
  return (
    <span
      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
        active
          ? "border-[#5b7cfa] bg-[#5b7cfa] text-white"
          : "border-[#0b0d10]/20 text-transparent"
      }`}
    >
      <Check size={12} />
    </span>
  );
}

function SummaryRow({ label, amount }: { label: string; amount: number }) {
  if (!amount) return null;

  return (
    <div className="flex justify-between gap-4">
      <span className="text-[#1f2937]/65">{label}</span>
      <span className="font-medium">{money(amount)}</span>
    </div>
  );
}
