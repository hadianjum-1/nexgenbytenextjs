"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const company = String(form.get("company") || "");
    const message = String(form.get("message") || "");

    const subject = encodeURIComponent(`New project enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`
    );

    window.location.href = `mailto:contact@nexgenbyte.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
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
          className="rounded-md bg-text px-6 py-3.5 font-space-grotesk text-sm font-medium text-background transition-transform hover:-translate-y-1"
        >
          Send enquiry
        </button>

        {submitted && (
          <p className="font-space-grotesk text-sm text-text-secondary/70">
            Your email app should open with the enquiry ready to send.
          </p>
        )}
      </div>
    </form>
  );
}
