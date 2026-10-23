
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Calculator, ArrowRight, X, Clock3 } from "lucide-react";

export default function CalculatorPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Show the popup only on the homepage
    if (pathname !== "/") return;

    // Don't show it again during this tab session
    if (sessionStorage.getItem("calculator-popup-shown")) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("calculator-popup-shown", "true");
    }, 10000);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Prevent background scrolling while the popup is open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="calculator-popup-title"
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#fafaf9] text-[#0b0d10] shadow-2xl animate-in fade-in zoom-in-95 duration-300"
      >
        {/* Accent decoration */}
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#5b7cfa]/20 blur-3xl" />

        {/* Close button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close popup"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-600 transition hover:bg-gray-200 hover:text-black"
        >
          <X size={20} />
        </button>

        <div className="relative p-7 sm:p-10">
          {/* Icon */}
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5b7cfa]/10 text-[#5b7cfa]">
            <Calculator size={29} strokeWidth={1.8} />
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#5b7cfa]">
            Plan Your Next Project
          </p>

          <h2
            id="calculator-popup-title"
            className="max-w-sm text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
          >
            What will your website cost?
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600">
            Get a quick estimate for your website project. Choose your
            requirements, explore your options, and plan your budget before
            getting started.
          </p>

          {/* Benefits */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5b7cfa]/10 text-[#5b7cfa]">
                ✓
              </span>
              Personalized project cost estimate
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-700">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5b7cfa]/10 text-[#5b7cfa]">
                ✓
              </span>
              Choose features that fit your needs
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-700">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5b7cfa]/10 text-[#5b7cfa]">
                ✓
              </span>
              No obligation to get started
            </div>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={() => router.push("/tools/website-cost-calculator")}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#5b7cfa] px-6 py-4 font-semibold text-white transition duration-200 hover:bg-[#4565e8] hover:shadow-lg hover:shadow-[#5b7cfa]/20"
          >
            Calculate Your Project Cost
            <ArrowRight size={19} />
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-3 w-full rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition hover:text-[#0b0d10]"
          >
            Maybe later
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Clock3 size={14} />
            Takes just a few minutes
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#5b7cfa] via-[#8b9fff] to-[#5b7cfa]" />
      </div>
    </div>
  );
}
