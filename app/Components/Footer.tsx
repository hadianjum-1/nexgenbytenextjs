"use client";

import Image from "next/image";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";
import { FormEvent, useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleNewsletterSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSuccess("");
    setError("");

    // Turnstile validation
    if (!turnstileToken) {
      setError("Please complete the security verification.");
      return;
    }

    setLoading(true);

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    // Honeypot
    const websiteCheck = String(
      form.get("websiteCheck") || ""
    );

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email.trim(),
          turnstileToken,
          websiteCheck,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Something went wrong."
        );
      }

      setSuccess(
        "You're subscribed! Check your inbox."
      );

      setEmail("");
      setTurnstileToken("");

      formElement.reset();

    } catch (error) {
      console.error(
        "Newsletter error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to subscribe. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full bg-text text-white">

      {/* ================= NEWSLETTER ================= */}

      <div className="mx-auto grid w-[90%] max-w-[1100px] grid-cols-1 gap-10 py-10 md:grid-cols-2">

        {/* Newsletter Text */}

        <div>
          <p className="mb-3 font-space-grotesk text-xs uppercase tracking-[0.2em] text-white/50">
            NexGenByte Newsletter
          </p>

          <h2 className="max-w-[500px] font-space-grotesk text-2xl font-semibold leading-tight md:text-3xl">
            Get the latest tips for social media growth and marketing
            straight to your inbox!
          </h2>

          <p className="mt-4 max-w-[470px] text-sm leading-6 text-white/50">
            Get practical insights about web development, digital
            marketing, website strategy and growing your online presence.
          </p>
        </div>

        {/* Newsletter Form */}

        <div className="flex items-end">

          <form
            onSubmit={handleNewsletterSubmit}
            className="w-full"
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

            {/* ================= EMAIL ================= */}

            <div className="flex items-center border-b border-white/30 pb-4">

              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                disabled={loading}
                placeholder="john@example.com"
                aria-label="Email address"
                autoComplete="email"
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  font-space-grotesk
                  text-lg
                  text-white
                  outline-none
                  placeholder:text-white/40
                  disabled:opacity-50
                "
              />

              <button
                type="submit"
                disabled={
                  loading ||
                  !turnstileToken
                }
                className="
                  ml-4
                  whitespace-nowrap
                  font-space-grotesk
                  text-sm
                  transition-colors
                  hover:text-secondary
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Subscribing..."
                  : "Subscribe Now"}

                {!loading && (
                  <span className="ml-2">
                    →
                  </span>
                )}
              </button>

            </div>

            {/* ================= TURNSTILE ================= */}

            <div className="mt-5">

              <Turnstile
                siteKey={
                  process.env
                    .NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""
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

            {/* ================= SUCCESS ================= */}

            {success && (
              <p
                role="status"
                className="mt-4 font-space-grotesk text-sm text-green-400"
              >
                {success}
              </p>
            )}

            {/* ================= ERROR ================= */}

            {error && (
              <p
                role="alert"
                className="mt-4 font-space-grotesk text-sm text-red-400"
              >
                {error}
              </p>
            )}

          </form>

        </div>

      </div>

      {/* ================= LINKS ================= */}

      <div className="mx-auto grid w-[90%] max-w-[1100px] grid-cols-2 gap-10 border-t border-white/10 py-12 md:grid-cols-4">

        {/* Site Map */}

        <div>
          <h3 className="mb-6 font-space-grotesk text-lg font-semibold">
            Site Map
          </h3>

          <ul className="space-y-3 font-space-grotesk text-sm text-white/80">

            <li>
              <Link
                href="/"
                className="transition-colors hover:text-secondary"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/#services"
                className="transition-colors hover:text-secondary"
              >
                Services
              </Link>
            </li>

            <li>
              <Link
                href="/#about"
                className="transition-colors hover:text-secondary"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="transition-colors hover:text-secondary"
              >
                Contact
              </Link>
            </li>

          </ul>
        </div>

        {/* Support */}

        <div>
          <h3 className="mb-6 font-space-grotesk text-lg font-semibold">
            Support
          </h3>

          <ul className="space-y-3 font-space-grotesk text-sm text-white/80">

            <li>
              <Link
                href="/contact"
                className="transition-colors hover:text-secondary"
              >
                Contact Us
              </Link>
            </li>

            <li>
              <Link
                href="/#about"
                className="transition-colors hover:text-secondary"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="/privacy"
                className="transition-colors hover:text-secondary"
              >
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link
                href="/terms"
                className="transition-colors hover:text-secondary"
              >
                Terms & Conditions
              </Link>
            </li>

          </ul>
        </div>

        {/* Services */}

        <div>
          <h3 className="mb-6 font-space-grotesk text-lg font-semibold">
            Services
          </h3>

          <ul className="space-y-3 font-space-grotesk text-sm text-white/80">

            <li>
              <Link
                href="/#services"
                className="transition-colors hover:text-secondary"
              >
                Website Development
              </Link>
            </li>

            <li>
              <Link
                href="/#services"
                className="transition-colors hover:text-secondary"
              >
                Website Design
              </Link>
            </li>

            <li>
              <Link
                href="/#services"
                className="transition-colors hover:text-secondary"
              >
                Landing Pages
              </Link>
            </li>

            <li>
              <Link
                href="/#services"
                className="transition-colors hover:text-secondary"
              >
                E-commerce
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact */}

        <div>
          <h3 className="mb-6 font-space-grotesk text-lg font-semibold">
            Contact Us
          </h3>

          <ul className="space-y-4 font-space-grotesk text-sm text-white/80">

            <li className="flex gap-3">
              <span>☎</span>

              <a
                href="tel:+923159711237"
                className="transition-colors hover:text-secondary"
              >
                +92 315 9711237
              </a>
            </li>

            <li className="flex gap-3">
              <span>✉</span>

              <a
                href="mailto:hadi@nexgenbyte.com"
                className="break-all transition-colors hover:text-secondary"
              >
                hadi@nexgenbyte.com
              </a>
            </li>

            <li className="flex gap-3">
              <span>⌖</span>

              <span>
                Peshawar, KPK
                <br />
                Pakistan
              </span>
            </li>

          </ul>
        </div>

      </div>

      {/* ================= BOTTOM BAR ================= */}

      <div className="border-t border-white/20">

        <div className="mx-auto flex w-[90%] max-w-[1100px] flex-col items-center justify-between gap-6 py-8 md:flex-row">

          {/* Credits */}

          <div className="font-space-grotesk text-sm text-white/80">

            Designed & Developed by{" "}

            <Link
              href="/"
              className="text-secondary transition-opacity hover:opacity-80"
            >
              NexGenByte
            </Link>

          </div>

          {/* Socials */}

          <div className="flex items-center gap-5">

            <span className="font-space-grotesk font-semibold">
              Follow Us
            </span>

            {/* Facebook */}

            <a
              href="https://www.facebook.com/people/Nexgenbyte/61586008494111/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-colors hover:text-secondary"
            >
              f
            </a>

            {/* Instagram */}

            <a
              href="https://www.instagram.com/nexgenbyte1/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-secondary"
            >
              ◎
            </a>

            {/* X */}

            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="transition-colors hover:text-secondary"
            >
              𝕏
            </a>

            {/* LinkedIn */}

            <a
              href="https://www.linkedin.com/company/nexgenbyte/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-secondary"
            >
              in
            </a>

            {/* GitHub */}

            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-secondary"
            >
              Git
            </a>

          </div>

        </div>

        {/* ================= HUGE LOGO ================= */}

        <div className="w-full overflow-hidden opacity-25">

          <Image
            src="/footerlogo.png"
            alt="NexGenByte"
            width={1400}
            height={300}
            quality={75}
            className="h-auto w-full object-contain"
          />

        </div>

      </div>

    </footer>
  );
};

export default Footer;