"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;

    setLoading(true);
    setSubmitted(false);
    setError("");

    const form = new FormData(formElement);

    const data = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),

      projectType: String(form.get("projectType") || ""),
      projectStatus: String(form.get("projectStatus") || ""),
      website: String(form.get("website") || ""),

      pages: String(form.get("pages") || ""),
      features: String(form.get("features") || ""),
      targetAudience: String(form.get("targetAudience") || ""),
      goals: String(form.get("goals") || ""),

      timeline: String(form.get("timeline") || ""),
      referral: String(form.get("referral") || ""),

      message: String(form.get("message") || ""),
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
      formElement.reset();

    } catch (error) {
      console.error(error);

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

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

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

      {/* PROJECT TYPE + STATUS */}

      <div className="grid gap-6 sm:grid-cols-2">

        <label className="font-space-grotesk text-sm text-text-secondary">
          What do you need? *

          <select
            required
            name="projectType"
            className={selectClass}
            defaultValue=""
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

            <option value="Other">
              Other
            </option>
          </select>
        </label>

        <label className="font-space-grotesk text-sm text-text-secondary">
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

      </div>

      {/* CURRENT WEBSITE - OPTIONAL */}

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
          placeholder="For example: CMS, online payments, booking system, dashboard, animations, contact forms, user accounts..."
        />
      </label>

      {/* TARGET AUDIENCE */}

      <label className="block font-space-grotesk text-sm text-text-secondary">
        Who is your target audience?

        <textarea
          name="targetAudience"
          rows={3}
          className={inputClass}
          placeholder="Tell us who your customers or users are."
        />
      </label>

      {/* GOALS */}

      <label className="block font-space-grotesk text-sm text-text-secondary">
        What are your main goals?

        <textarea
          name="goals"
          rows={4}
          className={inputClass}
          placeholder="For example: generate leads, increase sales, improve credibility, launch a new service..."
        />
      </label>

      {/* TIMELINE */}

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

      {/* MESSAGE */}

      <label className="block font-space-grotesk text-sm text-text-secondary">

        Tell us about your project *

        <textarea
          required
          name="message"
          rows={6}
          className={inputClass}
          placeholder="Tell us what you're looking to build, the problem you're trying to solve, and anything else we should know..."
        />

      </label>

      {/* REFERRAL */}

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

      {/* SUBMIT */}

      <div className="flex flex-wrap items-center gap-5 pt-2">

        <button
          type="submit"
          disabled={loading}
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
          {loading ? "Sending..." : "Send enquiry"}
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