"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleSubmit = async (
  event: FormEvent<HTMLFormElement>
) => {
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

    // ✅ Safe because we saved the form before await
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

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div className="grid gap-6 sm:grid-cols-2">

        <label className="font-space-grotesk text-sm text-text-secondary">
          Name

          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className="mt-2 w-full border-b border-text/20 bg-transparent px-0 py-3 text-base text-text outline-none transition-colors placeholder:text-text-secondary/40 focus:border-secondary"
            placeholder="Your name"
          />
        </label>

        <label className="font-space-grotesk text-sm text-text-secondary">
          Email

          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className="mt-2 w-full border-b border-text/20 bg-transparent px-0 py-3 text-base text-text outline-none transition-colors placeholder:text-text-secondary/40 focus:border-secondary"
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
          className="mt-2 w-full border-b border-text/20 bg-transparent px-0 py-3 text-base text-text outline-none transition-colors placeholder:text-text-secondary/40 focus:border-secondary"
          placeholder="Your company"
        />

      </label>

      <label className="block font-space-grotesk text-sm text-text-secondary">

        Tell us about your project

        <textarea
          required
          name="message"
          rows={5}
          className="mt-2 w-full resize-y border-b border-text/20 bg-transparent px-0 py-3 text-base text-text outline-none transition-colors placeholder:text-text-secondary/40 focus:border-secondary"
          placeholder="What would you like to build?"
        />

      </label>

      <div className="flex flex-wrap items-center gap-5 pt-2">

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-text px-6 py-3.5 font-space-grotesk text-sm font-medium text-background transition-all hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60"
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