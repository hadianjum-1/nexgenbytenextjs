"use client";

import { FormEvent, useEffect, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  useEffect(() => {
    const alreadyShown = localStorage.getItem("nexgenbyte-promo-shown");

    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("nexgenbyte-promo-shown", "true");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!turnstileToken) {
      setError("Please complete the security verification.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/promo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }

      setSuccess(true);

      localStorage.setItem("nexgenbyte-promo-shown", "true");

      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      setTurnstileToken("");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[520px] overflow-hidden rounded-3xl bg-background shadow-2xl">

        {/* CLOSE */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close promotion"
          className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-text/10 bg-background/80 text-2xl text-text transition hover:bg-text hover:text-background"
        >
          ×
        </button>

        {/* TOP SECTION */}
        <div className="bg-text px-7 py-10 text-background sm:px-10 sm:py-12">
          <p className="mb-4 font-space-grotesk text-xs uppercase tracking-[0.25em] text-background/60">
            Limited-time offer
          </p>

          <h2 className="max-w-[400px] font-space-grotesk text-4xl font-semibold leading-tight sm:text-5xl">
            Get 50% off your new website.
          </h2>

          <p className="mt-5 max-w-[400px] text-sm leading-6 text-background/70 sm:text-base">
            Launch a modern, high-performing website for your business at half
            the usual development cost.
          </p>
        </div>

        {/* FORM */}
        <div className="px-7 py-8 sm:px-10 sm:py-10">
          {!success ? (
            <>
              <p className="mb-5 font-space-grotesk text-sm text-text-secondary">
                Enter your email and we&apos;ll send you the offer details.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  disabled={loading}
                  className="w-full rounded-xl border border-text/15 bg-transparent px-4 py-4 text-sm text-text outline-none transition focus:border-secondary disabled:opacity-60"
                />

                {/* TURNSTILE */}
                <div className="flex justify-center pt-1">
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

                <button
                  type="submit"
                  disabled={loading || !turnstileToken}
                  className="w-full rounded-xl bg-text px-5 py-4 font-space-grotesk text-sm font-medium text-background transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Claiming offer..." : "Claim 50% Off"}
                </button>
              </form>

              {error && (
                <p className="mt-4 text-sm text-red-500">
                  {error}
                </p>
              )}

              <p className="mt-5 text-center text-xs text-text-secondary/50">
                No spam. We&apos;ll only contact you about your website
                project.
              </p>
            </>
          ) : (
            <div className="py-6 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
                ✓
              </div>

              <h3 className="font-space-grotesk text-2xl font-semibold text-text">
                Offer claimed!
              </h3>

              <p className="mt-3 text-sm leading-6 text-text-secondary">
                Thanks for your interest. We&apos;ll contact you shortly with
                the next steps.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}