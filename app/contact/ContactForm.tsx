"use client";

import { FormEvent, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const [projectType, setProjectType] = useState("");
  const [aiServices, setAiServices] = useState<string[]>([]);

  const handleAiServiceChange = (service: string) => {
    setAiServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSubmitted(false);
    setError("");

    // Turnstile check
    if (!turnstileToken) {
      setError("Please complete the security verification.");
      return;
    }

    // AI project validation
    if (
      projectType === "AI Integration" &&
      aiServices.length === 0
    ) {
      setError("Please select at least one AI service.");
      return;
    }

    const formElement = event.currentTarget;

    setLoading(true);

    const form = new FormData(formElement);

    // Honeypot
    const websiteCheck = String(
      form.get("websiteCheck") || ""
    );

    const data = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),

      projectType,

      projectStatus:
        projectType === "AI Integration"
          ? ""
          : String(form.get("projectStatus") || ""),

      website:
        projectType === "AI Integration"
          ? ""
          : String(form.get("website") || ""),

      pages:
        projectType === "AI Integration"
          ? ""
          : String(form.get("pages") || ""),

      features:
        projectType === "AI Integration"
          ? aiServices.join(", ")
          : String(form.get("features") || ""),

      targetAudience: String(
        form.get("targetAudience") || ""
      ),

      goals: String(
        form.get("goals") || ""
      ),

      timeline: String(
        form.get("timeline") || ""
      ),

      referral: String(
        form.get("referral") || ""
      ),

      message: String(
        form.get("message") || ""
      ),

      aiServices:
        projectType === "AI Integration"
          ? aiServices
          : [],

      // Security
      turnstileToken,
      websiteCheck,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Something went wrong."
        );
      }

      setSubmitted(true);
      setError("");

      // Reset states
      setAiServices([]);
      setProjectType("");
      setTurnstileToken("");

      // Reset form fields
      formElement.reset();

    } catch (error) {
      console.error("Contact form error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    mt-2
    w-full
    border-b
    border-text/20
    bg-transparent
    px-0
    py-3
    text-base
    text-text
    outline-none
    transition-colors
    placeholder:text-text-secondary/40
    focus:border-secondary
  `;

  const selectClass = `
    mt-2
    w-full
    border-b
    border-text/20
    bg-transparent
    px-0
    py-3
    text-base
    text-text
    outline-none
    focus:border-secondary
  `;

  const isAiProject =
    projectType === "AI Integration";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >

      {/* ================= HONEYPOT ================= */}

      <div
        className="absolute -left-[9999px]"
        aria-hidden="true"
      >
        <label htmlFor="websiteCheck">
          Website
        </label>

        <input
          id="websiteCheck"
          name="websiteCheck"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* ================= BASIC INFO ================= */}

      <div>
        <h3 className="font-space-grotesk text-xl font-semibold text-text">
          Let&apos;s get to know you
        </h3>

        <p className="mt-1 text-sm text-text-secondary/60">
          Tell us a little about yourself and your business.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">

        <label className="font-space-grotesk text-sm text-text-secondary">
          Name *

          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className={inputClass}
            placeholder="Your name"
          />
        </label>

        <label className="font-space-grotesk text-sm text-text-secondary">
          Email *

          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            placeholder="you@company.com"
          />
        </label>

      </div>

      <label className="block font-space-grotesk text-sm text-text-secondary">
        Company

        <input
          name="company"
          type="text"
          autoComplete="organization"
          className={inputClass}
          placeholder="Your company"
        />
      </label>

      {/* ================= PROJECT ================= */}

      <div className="pt-4">

        <h3 className="font-space-grotesk text-xl font-semibold text-text">
          About your project
        </h3>

        <p className="mt-1 text-sm text-text-secondary/60">
          The more we know, the better we can understand your needs.
        </p>

      </div>

      {/* ================= PROJECT TYPE ================= */}

      <label className="block font-space-grotesk text-sm text-text-secondary">

        What do you need? *

        <select
          required
          name="projectType"
          value={projectType}
          onChange={(e) => {
            setProjectType(e.target.value);
            setAiServices([]);
          }}
          className={selectClass}
        >

          <option value="" disabled>
            Select project type
          </option>

          <option value="New Website">
            New Website
          </option>

          <option value="Website Redesign">
            Website Redesign
          </option>

          <option value="Landing Page">
            Landing Page
          </option>

          <option value="E-commerce Website">
            E-commerce Website
          </option>

          <option value="Web Application">
            Web Application
          </option>

          <option value="AI Integration">
            AI Integrations
          </option>

          <option value="SEO Services">
            SEO Services
          </option>

          <option value="Other">
            Other
          </option>

        </select>

      </label>

      {/* ================= AI SERVICES ================= */}

      {isAiProject && (
        <div className="rounded-2xl border border-text/10 bg-black/[0.02] p-5 sm:p-6">

          <div>

            <h4 className="font-space-grotesk text-base font-semibold text-text">
              What would you like to automate?
            </h4>

            <p className="mt-1 text-sm leading-6 text-text-secondary/60">
              Select all AI services that are relevant to your business.
            </p>

          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">

            {[
              "AI Chatbot for Website",
              "WhatsApp Automation",
              "Email Automation",
              "AI Lead Generation",
              "AI Customer Support",
              "AI Voice Agent",
              "AI Sales Assistant",
              "Custom AI Integration",
            ].map((service) => (

              <label
                key={service}
                className={`
                  flex
                  cursor-pointer
                  items-center
                  gap-3
                  rounded-xl
                  border
                  p-3.5
                  text-sm
                  transition-all
                  ${
                    aiServices.includes(service)
                      ? "border-secondary bg-secondary/5"
                      : "border-text/10 hover:border-text/20"
                  }
                `}
              >

                <input
                  type="checkbox"
                  checked={aiServices.includes(service)}
                  onChange={() =>
                    handleAiServiceChange(service)
                  }
                  className="h-4 w-4 accent-secondary"
                />

                <span className="text-text">
                  {service}
                </span>

              </label>

            ))}

          </div>

          {aiServices.length === 0 && (
            <p className="mt-3 text-xs text-text-secondary/50">
              Choose at least one service.
            </p>
          )}

        </div>
      )}

      {/* ================= WEBSITE QUESTIONS ================= */}

      {!isAiProject && (
        <>
          {/* PROJECT STATUS */}

          <label className="block font-space-grotesk text-sm text-text-secondary">

            Current project status

            <select
              name="projectStatus"
              className={selectClass}
              defaultValue=""
            >

              <option value="">
                Select status
              </option>

              <option value="Just an idea">
                Just an idea
              </option>

              <option value="Planning">
                Planning
              </option>

              <option value="Design ready">
                Design ready
              </option>

              <option value="Already have a website">
                Already have a website
              </option>

              <option value="Need redesign">
                Need redesign
              </option>

            </select>

          </label>

          {/* CURRENT WEBSITE */}

          <label className="block font-space-grotesk text-sm text-text-secondary">

            Current website

            <span className="ml-2 text-xs text-text-secondary/50">
              Optional
            </span>

            <input
              name="website"
              type="url"
              className={inputClass}
              placeholder="https://yourwebsite.com"
            />

          </label>

          {/* PAGES */}

          <label className="block font-space-grotesk text-sm text-text-secondary">

            Approximately how many pages do you need?

            <select
              name="pages"
              className={selectClass}
              defaultValue=""
            >

              <option value="">
                Select number of pages
              </option>

              <option value="1-3 pages">
                1–3 pages
              </option>

              <option value="4-6 pages">
                4–6 pages
              </option>

              <option value="7-10 pages">
                7–10 pages
              </option>

              <option value="10+ pages">
                10+ pages
              </option>

              <option value="Not sure">
                Not sure
              </option>

            </select>

          </label>

          {/* FEATURES */}

          <label className="block font-space-grotesk text-sm text-text-secondary">

            What features do you need?

            <textarea
              name="features"
              rows={4}
              className={inputClass}
              placeholder="For example: CMS, online payments, booking system, dashboard, animations, contact forms..."
            />

          </label>

        </>
      )}

      {/* ================= TARGET AUDIENCE ================= */}

      <label className="block font-space-grotesk text-sm text-text-secondary">

        Who is your target audience?

        <textarea
          name="targetAudience"
          rows={3}
          className={inputClass}
          placeholder={
            isAiProject
              ? "Who will use the AI system? For example: customers, leads, employees..."
              : "Tell us who your customers or users are."
          }
        />

      </label>

      {/* ================= GOALS ================= */}

      <label className="block font-space-grotesk text-sm text-text-secondary">

        What are your main goals?

        <textarea
          name="goals"
          rows={4}
          className={inputClass}
          placeholder={
            isAiProject
              ? "For example: automate customer support, capture leads, save staff time, automate follow-ups..."
              : "For example: generate leads, increase sales, improve credibility, launch a new service..."
          }
        />

      </label>

      {/* ================= TIMELINE ================= */}

      <label className="block font-space-grotesk text-sm text-text-secondary">

        Desired timeline

        <select
          name="timeline"
          className={selectClass}
          defaultValue=""
        >

          <option value="">
            Select timeline
          </option>

          <option value="ASAP">
            ASAP
          </option>

          <option value="2-4 weeks">
            2–4 weeks
          </option>

          <option value="1-2 months">
            1–2 months
          </option>

          <option value="2-3 months">
            2–3 months
          </option>

          <option value="Flexible">
            Flexible
          </option>

        </select>

      </label>

      {/* ================= MESSAGE ================= */}

      <label className="block font-space-grotesk text-sm text-text-secondary">

        {isAiProject
          ? "Tell us about the automation you need *"
          : "Tell us about your project *"}

        <textarea
          required
          name="message"
          rows={6}
          className={inputClass}
          placeholder={
            isAiProject
              ? "Tell us what you want to automate, how your current process works, and what you'd like the AI system to accomplish..."
              : "Tell us what you're looking to build, the problem you're trying to solve, and anything else we should know..."
          }
        />

      </label>

      {/* ================= REFERRAL ================= */}

      <label className="block font-space-grotesk text-sm text-text-secondary">

        How did you hear about NexGenByte?

        <select
          name="referral"
          className={selectClass}
          defaultValue=""
        >

          <option value="">
            Select an option
          </option>

          <option value="Google">
            Google
          </option>

          <option value="Social Media">
            Social Media
          </option>

          <option value="Referral">
            Referral
          </option>

          <option value="LinkedIn">
            LinkedIn
          </option>

          <option value="Other">
            Other
          </option>

        </select>

      </label>

      {/* ================= TURNSTILE ================= */}

      <div className="pt-2">

        <Turnstile
          siteKey={
            process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""
          }

          onSuccess={(token) => {
            setTurnstileToken(token);
            setError("");
          }}

          onExpire={() => {
            setTurnstileToken("");
          }}

          onError={() => {
            setTurnstileToken("");

            setError(
              "Security verification failed. Please try again."
            );
          }}
        />

      </div>

      {/* ================= SUBMIT ================= */}

      <div className="flex flex-wrap items-center gap-5 pt-2">

        <button
          type="submit"
          disabled={
            loading ||
            !turnstileToken ||
            (isAiProject && aiServices.length === 0)
          }

          className="
            rounded-md
            bg-text
            px-6
            py-3.5
            font-space-grotesk
            text-sm
            font-medium
            text-background
            transition-all
            hover:-translate-y-1
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          {loading
            ? "Sending..."
            : isAiProject
              ? "Request AI Consultation"
              : "Send enquiry"}

        </button>

        {submitted && (
          <p className="font-space-grotesk text-sm text-green-600">
            Thanks! Your enquiry has been received.
          </p>
        )}

        {error && (
          <p className="font-space-grotesk text-sm text-red-500">
            {error}
          </p>
        )}

      </div>

    </form>
  );
}