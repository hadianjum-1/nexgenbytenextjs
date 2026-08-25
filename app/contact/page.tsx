import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./ContactForm";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell NexGenByte about your next website project and start a conversation.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="bg-background text-text">
        <section className="mx-auto grid min-h-[calc(100vh-5rem)] w-[92vw] max-w-300 items-center gap-12 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p className="font-space-grotesk text-sm uppercase tracking-widest text-secondary">
              Start a conversation
            </p>

            <h1 className="mt-4 max-w-3xl font-space-grotesk text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-8xl">
              Let&apos;s build something that works.
            </h1>

            <p className="mt-7 max-w-xl font-space-grotesk text-base leading-relaxed text-text-secondary/70 sm:text-lg">
              Tell us what you are working on, where you want to go, and what
              needs to improve. We&apos;ll take it from there.
            </p>
          </div>

          <div className="border-t border-text/15 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <ContactForm />

            <div className="mt-10 border-t border-text/15 pt-6">
              <p className="font-space-grotesk text-sm uppercase tracking-widest text-text-secondary/50">
                Prefer email?
              </p>

              <a
                href="mailto:contact@nexgenbyte.com"
                className="mt-2 block wrap-break-word font-space-grotesk text-lg font-semibold text-text transition-colors hover:text-secondary"
              >
                contact@nexgenbyte.com
              </a>

              <Link
                href="/"
                className="mt-6 inline-flex rounded-full bg-text px-6 py-3 font-space-grotesk text-background transition-transform hover:scale-105"
              >
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
