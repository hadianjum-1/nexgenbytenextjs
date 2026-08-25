"use client";

import { FormEvent, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Header />
      <main className="bg-background text-text">
        <section className="w-[92vw] max-w-6xl mx-auto py-16 sm:py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="lg:pt-8">
              <p className="font-space-grotesk text-sm font-medium uppercase tracking-[0.2em] text-secondary">
                Contact us
              </p>
              <h1 className="mt-5 font-space-grotesk text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Let&apos;s create what is next.
              </h1>
              <p className="mt-7 max-w-md font-space-grotesk text-lg leading-relaxed text-text-secondary/70">
                Tell us about your goals, timeline, and vision. We will respond with a focused plan for bringing it to life.
              </p>

              <div className="mt-12 space-y-7 border-t border-dashed border-black/20 pt-8 font-space-grotesk">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-text-secondary/55">Email</p>
                  <a className="mt-2 inline-block text-lg font-medium transition-colors hover:text-secondary" href="mailto:hello@nexgenbyte.com">
                    hello@nexgenbyte.com
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-text-secondary/55">Response time</p>
                  <p className="mt-2 text-lg font-medium">Within 1 business day</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-text p-6 text-background shadow-2xl sm:p-10">
              <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/15 pb-6">
                <div>
                  <p className="font-space-grotesk text-2xl font-semibold">Start a conversation</p>
                  <p className="mt-1 font-space-grotesk text-sm text-white/60">Share a few details and we will take it from there.</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-xl" aria-hidden="true">?</span>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-white/15 bg-white/10 p-8 font-space-grotesk">
                  <p className="text-sm uppercase tracking-[0.16em] text-secondary">Message ready</p>
                  <h2 className="mt-3 text-3xl font-semibold">Thank you for reaching out.</h2>
                  <p className="mt-4 leading-relaxed text-white/70">Your project details have been noted. Our team will be in touch within one business day.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="mt-7 rounded-full border border-white/30 px-5 py-3 text-sm font-medium transition-colors hover:bg-white hover:text-text">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block font-space-grotesk text-sm text-white/70">
                      Your name
                      <input required name="name" autoComplete="name" placeholder="Jane Smith" className="mt-2 w-full border-b border-white/25 bg-transparent px-0 py-3 text-base text-white outline-none placeholder:text-white/35 focus:border-secondary" />
                    </label>
                    <label className="block font-space-grotesk text-sm text-white/70">
                      Work email
                      <input required type="email" name="email" autoComplete="email" placeholder="jane@company.com" className="mt-2 w-full border-b border-white/25 bg-transparent px-0 py-3 text-base text-white outline-none placeholder:text-white/35 focus:border-secondary" />
                    </label>
                  </div>
                  <label className="block font-space-grotesk text-sm text-white/70">
                    Company or brand
                    <input name="company" autoComplete="organization" placeholder="Your company" className="mt-2 w-full border-b border-white/25 bg-transparent px-0 py-3 text-base text-white outline-none placeholder:text-white/35 focus:border-secondary" />
                  </label>
                  <label className="block font-space-grotesk text-sm text-white/70">
                    What can we help with?
                    <select required name="service" defaultValue="" className="mt-2 w-full border-b border-white/25 bg-text px-0 py-3 text-base text-white outline-none focus:border-secondary">
                      <option value="" disabled>Select a service</option>
                      <option>Custom website design</option>
                      <option>Web development</option>
                      <option>E-commerce development</option>
                      <option>UI and UX design</option>
                      <option>Something else</option>
                    </select>
                  </label>
                  <label className="block font-space-grotesk text-sm text-white/70">
                    Project details
                    <textarea required name="message" rows={4} placeholder="Tell us about the project, your goals, and ideal timeline." className="mt-2 w-full resize-none border-b border-white/25 bg-transparent px-0 py-3 text-base leading-relaxed text-white outline-none placeholder:text-white/35 focus:border-secondary" />
                  </label>
                  <button type="submit" className="w-full rounded-full bg-secondary px-6 py-4 font-space-grotesk text-base font-medium text-white transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-text">
                    Send project inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
