
"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, QrCode, Calculator, Gauge } from "lucide-react";

const tools = [
  {
    name: "QR Code Generator",
    description: "Create and download QR codes",
    href: "/tools/qr-code-generator",
    icon: QrCode,
    status: "Available",
  },
  {
    name: "Website Cost Calculator",
    description: "Estimate your website budget",
    href: "/tools//website-cost-calculator",
    icon: Calculator,
    status: "Available",
  },
  {
    name: "Website Audit",
    description: "Discover website improvements",
    href: "/tools/website-audit",
    icon: Gauge,
    status: "Coming soon",
  },
];

export default function ToolsDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        onFocus={() => setIsOpen(true)}
        className="flex items-center gap-2 py-3 font-medium transition-colors hover:text-blue-600"
      >
        Tools
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 w-80 rounded-2xl border border-gray-200 bg-white p-2 text-gray-900 shadow-xl">
          <p className="px-3 pb-2 pt-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Free Tools
          </p>

          {tools.map((tool) => {
            const Icon = tool.icon;
            const available = tool.status === "Available";

            return (
              <Link
                key={tool.href}
                href={available ? tool.href : "/tools"}
                onClick={() => setIsOpen(false)}
                className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50"
              >
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <Icon size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="block font-semibold">
                    {tool.name}
                  </span>
                  <span className="mt-1 block text-sm text-gray-500">
                    {tool.description}
                  </span>
                </div>

                <span
                  className={`mt-1 whitespace-nowrap text-xs ${
                    available ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {tool.status}
                </span>
              </Link>
            );
          })}

          <div className="my-1 border-t border-gray-100" />

          {/* <Link
            href="/tools"
            onClick={() => setIsOpen(false)}
            className="block rounded-xl px-3 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
          >
            Explore all tools →
          </Link> */}
        </div>
      )}
    </div>
  );
}
