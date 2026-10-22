"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import {
  Copy,
  RotateCcw,
  Link2,
  Type,
  Mail,
  Phone,
  Palette,
  Smartphone,
  FileImage,
  Download,
  QrCode,
  CheckCircle2,
} from "lucide-react";
import Header from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";
import Cta from "@/app/Components/Cta";

export default function QRCodeGeneratorPage() {
  const [value, setValue] = useState("");
  const [size, setSize] = useState(240);
  const [foreground, setForeground] = useState("#111827");
  const [background, setBackground] = useState("#ffffff");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [qrType, setQrType] = useState("website");
const [copied, setCopied] = useState(false);
const [transparent, setTransparent] = useState(false);

const svgRef = useRef<HTMLDivElement>(null);

const templates = [
  {
    id: "website",
    label: "Website",
    icon: Link2,
    placeholder: "https://example.com",
    sample: "https://nexgenbyte.com",
  },
  {
    id: "text",
    label: "Plain text",
    icon: Type,
    placeholder: "Enter your message...",
    sample: "Hello! Welcome to NexGenByte.",
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
    placeholder: "hello@example.com",
    sample: "hello@nexgenbyte.com",
  },
  {
    id: "phone",
    label: "Phone",
    icon: Phone,
    placeholder: "+1234567890",
    sample: "+1234567890",
  },
];

const colorPresets = [
  { foreground: "#111827", background: "#ffffff", label: "Classic" },
  { foreground: "#2563eb", background: "#eff6ff", label: "Ocean" },
  { foreground: "#047857", background: "#ecfdf5", label: "Forest" },
  { foreground: "#7c3aed", background: "#f5f3ff", label: "Violet" },
  { foreground: "#be123c", background: "#fff1f2", label: "Rose" },
  { foreground: "#ffffff", background: "#111827", label: "Dark" },
];

function selectTemplate(template: (typeof templates)[number]) {
  setQrType(template.id);

  if (template.id === "website") setValue("https://");
  if (template.id === "text") setValue("");
  if (template.id === "email") setValue("mailto:");
  if (template.id === "phone") setValue("tel:");

  setMessage("");
  setSuccess(false);
}

async function copyContent() {
  if (!value.trim()) return;

  try {
    await navigator.clipboard.writeText(value.trim());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  } catch {
    setMessage("Unable to copy. Please copy the content manually.");
  }
}

function resetGenerator() {
  setValue("");
  setSize(240);
  setForeground("#111827");
  setBackground("#ffffff");
  setEmail("");
  setQrType("website");
  setTransparent(false);
  setMessage("");
  setSuccess(false);
}

async function downloadSVG() {
  setMessage("");
  setSuccess(false);

  if (!value.trim()) {
    setMessage("Please enter a URL or text first.");
    return;
  }

  if (!email.trim()) {
    setMessage("Please enter your email address to download your QR code.");
    return;
  }

  const svg = svgRef.current?.querySelector("svg");

  if (!svg) {
    setMessage("Your QR code is not ready. Please try again.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("/api/qr-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        content: value.trim(),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Unable to process your request.");
    }

    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const blob = new Blob(
      [new XMLSerializer().serializeToString(clone)],
      { type: "image/svg+xml;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "nexgenbyte-qr-code.svg";
    link.click();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);

    setSuccess(true);
    setMessage("Your SVG QR code has been downloaded.");
  } catch (error) {
    setMessage(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
}

  const qrRef = useRef<HTMLDivElement>(null);

  async function downloadQR() {
    setMessage("");
    setSuccess(false);

    if (!value.trim()) {
      setMessage("Please enter a website URL or text.");
      return;
    }

    if (!email.trim()) {
      setMessage("Please enter your email address to download your QR code.");
      return;
    }

    const canvas = qrRef.current?.querySelector("canvas");

    if (!canvas) {
      setMessage("Your QR code is not ready. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/qr-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          content: value.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to process your request."
        );
      }

      const link = document.createElement("a");
      link.download = "nexgenbyte-qr-code.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

      setSuccess(true);
      setMessage("Your QR code is ready and has been downloaded.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      
<main className="min-h-screen overflow-hidden bg-[#fafbff] px-4 py-24 text-gray-900 sm:px-6 lg:py-28">
  <div className="mx-auto max-w-7xl">

    {/* Hero */}
    <header className="mx-auto mb-12 max-w-3xl text-center">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        Free Online Tool by NexGenByte
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
        Your QR Code.
        <span className="block bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text pb-2 text-transparent">
          Your Style.
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
        Create beautiful, custom QR codes in seconds. Personalize
        your colors, preview instantly, and download high-quality
        PNG or SVG files.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-500">
        <span className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-blue-600" />
          Instant preview
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-blue-600" />
          Custom colors
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-blue-600" />
          PNG & SVG
        </span>
      </div>
    </header>

    {/* Studio */}
    <div className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-200/50 lg:grid-cols-[1.05fr_0.95fr]">

      {/* Editor */}
      <section className="p-5 sm:p-8 lg:p-10">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              QR Studio
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Customize your code
            </h2>
          </div>

          <button
            type="button"
            onClick={resetGenerator}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-blue-200 hover:text-blue-600"
          >
            <RotateCcw size={15} />
            Reset
          </button>
        </div>

        {/* Content type */}
        <div className="mb-7">
          <label className="mb-3 block text-sm font-semibold text-gray-800">
            What would you like to share?
          </label>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {templates.map((template) => {
              const Icon = template.icon;
              const active = qrType === template.id;

              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => selectTemplate(template)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border px-2 py-4 text-xs font-semibold transition sm:text-sm ${
                    active
                      ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100"
                      : "border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} />
                  {template.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content input */}
        <div className="mb-7">
          <div className="mb-2 flex items-center justify-between gap-2">
            <label htmlFor="qr-content" className="text-sm font-semibold">
              Your content
            </label>
            <span className="text-xs text-gray-400">
              {value.length}/2000
            </span>
          </div>

          <textarea
            id="qr-content"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setMessage("");
              setSuccess(false);
            }}
            placeholder={
              templates.find((item) => item.id === qrType)?.placeholder
            }
            rows={3}
            maxLength={2000}
            required
            className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50/70 p-4 text-sm leading-7 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />

          <button
            type="button"
            onClick={copyContent}
            disabled={!value.trim()}
            className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-gray-500 transition hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Copy size={14} />
            {copied ? "Copied!" : "Copy content"}
          </button>
        </div>

        {/* Color presets */}
        <div className="mb-7">
          <div className="mb-3 flex items-center gap-2">
            <Palette size={17} className="text-blue-600" />
            <label className="text-sm font-semibold">
              Choose a color theme
            </label>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {colorPresets.map((preset) => {
              const active =
                foreground === preset.foreground &&
                background === preset.background;

              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setForeground(preset.foreground);
                    setBackground(preset.background);
                  }}
                  aria-label={`${preset.label} color theme`}
                  aria-pressed={active}
                  className={`rounded-xl border p-2 transition hover:-translate-y-0.5 ${
                    active
                      ? "border-blue-500 ring-2 ring-blue-100"
                      : "border-gray-200"
                  }`}
                >
                  <span
                    className="flex h-9 items-center justify-center rounded-md border border-black/5"
                    style={{ backgroundColor: preset.background }}
                  >
                    <span
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: preset.foreground }}
                    />
                  </span>
                  <span className="mt-2 block truncate text-[10px] font-medium text-gray-600">
                    {preset.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom colors */}
        <div className="mb-7 grid grid-cols-2 gap-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">
              QR color
            </span>
            <span className="flex items-center gap-2 rounded-xl border border-gray-200 p-2">
              <input
                aria-label="QR code color"
                type="color"
                value={foreground}
                onChange={(event) => setForeground(event.target.value)}
                className="h-9 w-10 cursor-pointer rounded-lg border-0 bg-transparent"
              />
              <span className="text-sm font-medium uppercase text-gray-600">
                {foreground}
              </span>
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">
              Background
            </span>
            <span className="flex items-center gap-2 rounded-xl border border-gray-200 p-2">
              <input
                aria-label="QR code background color"
                type="color"
                value={background}
                onChange={(event) => setBackground(event.target.value)}
                className="h-9 w-10 cursor-pointer rounded-lg border-0 bg-transparent"
              />
              <span className="text-sm font-medium uppercase text-gray-600">
                {background}
              </span>
            </span>
          </label>
        </div>

        {/* Size */}
        <div className="mb-7 rounded-xl border border-gray-200 p-4">
          <div className="mb-4 flex items-center justify-between">
            <label htmlFor="qr-size" className="text-sm font-semibold">
              Output size
            </label>
            <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-700">
              {size} × {size}px
            </span>
          </div>

          <input
            id="qr-size"
            type="range"
            min={160}
            max={400}
            step={20}
            value={size}
            onChange={(event) => setSize(Number(event.target.value))}
            className="w-full cursor-pointer accent-blue-600"
          />

          <div className="mt-2 flex justify-between text-xs text-gray-400">
            <span>160px</span>
            <span>280px</span>
            <span>400px</span>
          </div>
        </div>

        {/* Transparent background option */}
        <label className="mb-7 flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-200 p-4">
          <span>
            <span className="block text-sm font-semibold">
              Transparent background
            </span>
            <span className="mt-1 block text-xs leading-5 text-gray-500">
              Export with a transparent background
            </span>
          </span>

          <input
            type="checkbox"
            checked={transparent}
            onChange={(event) => setTransparent(event.target.checked)}
            className="h-5 w-5 shrink-0 cursor-pointer accent-blue-600"
          />
        </label>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="lead-email" className="mb-2 block text-sm font-semibold">
            Email address
          </label>

          <input
            id="lead-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage("");
              setSuccess(false);
            }}
            placeholder="you@example.com"
            maxLength={254}
            required
            className="w-full rounded-xl border border-gray-200 bg-white p-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          />

          <p className="mt-2 text-xs leading-5 text-gray-500">
            Your email is submitted when you request a download.
            See our privacy policy for details on how this data is handled.
          </p>
        </div>

        {/* Downloads */}
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={downloadQR}
            disabled={!value.trim() || !email.trim() || loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Download size={18} />
            {loading ? "Preparing..." : "Download PNG"}
          </button>

          <button
            type="button"
            onClick={downloadSVG}
            disabled={!value.trim() || !email.trim() || loading}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm font-bold text-gray-800 transition hover:border-blue-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FileImage size={18} />
            Download SVG
          </button>
        </div>

        {message && (
          <p
            role="status"
            aria-live="polite"
            className={`mt-4 flex items-start gap-2 text-sm leading-6 ${
              success ? "text-green-700" : "text-red-600"
            }`}
          >
            {success && <CheckCircle2 size={18} className="mt-1 shrink-0" />}
            {message}
          </p>
        )}

        <p className="mt-4 text-center text-xs leading-5 text-gray-400">
          Free to use · Generated in your browser · No account required
        </p>
      </section>

      {/* Live Preview */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden border-t border-gray-200 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/70 p-6 sm:p-10 lg:border-l lg:border-t-0">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="relative mb-8 flex w-full max-w-sm items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Live Preview
            </p>
            <h2 className="mt-2 text-xl font-bold text-gray-950">
              Your QR code
            </h2>
          </div>

          <span className="flex items-center gap-2 rounded-full border border-green-200 bg-white px-3 py-1.5 text-xs font-semibold text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Live
          </span>
        </div>

        <div
          className="relative flex min-h-[340px] w-full max-w-sm items-center justify-center overflow-hidden rounded-3xl border border-white bg-white/70 p-5 shadow-xl shadow-blue-950/[0.05] sm:min-h-[400px]"
          style={{
            backgroundColor: transparent ? "transparent" : `${background}30`,
            backgroundImage: transparent
              ? "linear-gradient(45deg, #e5e7eb 25%, transparent 25%, transparent 75%, #e5e7eb 75%), linear-gradient(45deg, #e5e7eb 25%, transparent 25%, transparent 75%, #e5e7eb 75%)"
              : undefined,
            backgroundSize: transparent ? "16px 16px" : undefined,
            backgroundPosition: transparent ? "0 0, 8px 8px" : undefined,
          }}
        >
          {value.trim() ? (
            <div
              ref={qrRef}
              className="max-w-full overflow-auto rounded-xl p-3"
              style={{
                backgroundColor: transparent ? "transparent" : background,
              }}
            >
              <QRCodeCanvas
                value={value.trim()}
                size={size}
                fgColor={foreground}
                bgColor={transparent ? "#ffffff00" : background}
                level="H"
                marginSize={2}
              />
            </div>
          ) : (
            <div className="px-4 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                <QrCode size={42} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Your design starts here
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-500">
                Enter your website or text to see your custom QR code
                appear instantly.
              </p>
            </div>
          )}
        </div>

        {/* Hidden SVG renderer for vector export */}
        <div
          ref={svgRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-[-10000px] top-0"
        >
          {value.trim() && (
            <QRCodeSVG
              value={value.trim()}
              size={size}
              fgColor={foreground}
              bgColor={transparent ? "transparent" : background}
              level="H"
              marginSize={2}
            />
          )}
        </div>

        <div className="relative mt-6 w-full max-w-sm rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Smartphone size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">
                Ready for your audience
              </p>
              <p className="mt-1 truncate text-xs text-gray-500">
                {value.trim() || "Your URL or text will appear here"}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-5 flex flex-wrap justify-center gap-2">
          <span className="rounded-lg border border-white bg-white/80 px-3 py-2 text-xs font-medium text-gray-600">
            {size}px
          </span>
          <span className="rounded-lg border border-white bg-white/80 px-3 py-2 text-xs font-medium text-gray-600">
            High error correction
          </span>
          <span className="rounded-lg border border-white bg-white/80 px-3 py-2 text-xs font-medium text-gray-600">
            {transparent ? "Transparent" : "Solid background"}
          </span>
        </div>

        <p className="relative mt-6 max-w-sm text-center text-xs leading-6 text-gray-500">
          Tip: Test your QR code with a smartphone before printing
          it on business cards, packaging, or marketing materials.
        </p>
      

          
</section>
      </div>

      {/* Modern SEO Article Section */}
<article className="relative mt-24 overflow-hidden rounded-3xl border border-gray-200 bg-white">

  {/* Article Header */}
  <div className="relative overflow-hidden bg-gray-950 px-6 py-12 text-white sm:px-12 sm:py-16">
    <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

    <div className="relative max-w-3xl">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
        <QrCode size={15} />
        The Complete Guide
      </span>

      <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        How to Create a QR Code{" "}
        <span className="text-blue-400">for Free</span>
      </h2>

      <p className="mt-5 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
        Create, customize, and download your own QR code in seconds.
        Learn how QR codes work, where to use them, and how to make
        sure they scan reliably across devices.
      </p>

      <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-300">
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          Free QR Generator
        </span>
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          Custom Colors
        </span>
        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          PNG Download
        </span>
      </div>
    </div>
  </div>

  <div className="px-6 py-10 sm:px-12 sm:py-14">

    {/* Introduction */}
    <div className="mx-auto max-w-3xl">
      <p className="text-lg leading-8 text-gray-700">
        A QR code (Quick Response code) is a two-dimensional barcode
        that stores information such as a website address, plain text,
        or a link. People can scan it using a compatible smartphone
        camera to access that information without typing it manually.
      </p>

      <p className="mt-5 leading-8 text-gray-600">
        With the free QR code generator from NexGenByte, you can turn
        any supported URL or text into a downloadable PNG image.
        Customize the size and colors to match your brand, business
        cards, marketing materials, product packaging, or printed signs.
      </p>
    </div>

    {/* How It Works */}
    <section className="mt-16">
      <div className="mb-8">
        <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Simple Process
        </span>
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
          How to Use Our Free QR Code Generator
        </h3>
        <p className="mt-3 max-w-2xl leading-7 text-gray-600">
          Follow these five simple steps to create a QR code that
          is ready to share or print.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            number: "01",
            title: "Enter Your Content",
            description:
              "Add the website URL or text you want people to access when they scan your QR code.",
          },
          {
            number: "02",
            title: "Customize Your Design",
            description:
              "Choose your preferred QR code color, background color, and image size.",
          },
          {
            number: "03",
            title: "Provide Your Email",
            description:
              "Enter a valid email address to process your PNG download request.",
          },
          {
            number: "04",
            title: "Download Your QR Code",
            description:
              "Click the download button to save your customized QR code as a PNG image.",
          },
          {
            number: "05",
            title: "Test Before Sharing",
            description:
              "Scan the downloaded image with a smartphone to confirm it opens the intended content.",
          },
        ].map((step) => (
          <div
            key={step.number}
            className="group rounded-2xl border border-gray-200 bg-gray-50/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-950/[0.04]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              {step.number}
            </span>

            <h4 className="mt-5 text-lg font-bold text-gray-900">
              {step.title}
            </h4>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* Use Cases */}
    <section className="mt-16">
      <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
        Everyday Applications
      </span>

      <h3 className="mt-3 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
        What Can You Use a QR Code For?
      </h3>

      <p className="mt-4 max-w-3xl leading-8 text-gray-600">
        QR codes connect printed materials and physical locations to
        digital information. Businesses can use them to help customers
        find services, explore products, access menus, or visit a
        website quickly.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          {
            icon: "01",
            title: "Business Cards & Flyers",
            description:
              "Direct potential customers to your website, portfolio, contact page, or quote request form.",
          },
          {
            icon: "02",
            title: "Restaurants & Cafes",
            description:
              "Let customers open a digital menu or visit your ordering page from their phones.",
          },
          {
            icon: "03",
            title: "Product Packaging",
            description:
              "Share product details, setup instructions, care guides, or support resources.",
          },
          {
            icon: "04",
            title: "Marketing & Promotions",
            description:
              "Connect posters, brochures, and promotional displays to relevant landing pages.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex gap-4 rounded-2xl border border-gray-200 p-5 transition-colors hover:border-blue-200"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xs font-bold text-gray-700">
              {item.icon}
            </span>

            <div>
              <h4 className="font-bold text-gray-900">
                {item.title}
              </h4>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Benefits */}
    <section className="mt-16 rounded-2xl border border-blue-100 bg-blue-50/50 p-6 sm:p-8">
      <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
        Why Use Custom QR Codes?
      </span>

      <h3 className="mt-3 text-2xl font-bold tracking-tight text-gray-950">
        A Simple Tool for Better Customer Experiences
      </h3>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        {[
          {
            title: "Quick Access",
            description:
              "Help visitors reach your content without manually entering a long web address.",
          },
          {
            title: "Brand-Friendly Design",
            description:
              "Choose colors that complement your business identity and marketing materials.",
          },
          {
            title: "Convenient Downloads",
            description:
              "Save your QR code as a PNG image for supported digital and print applications.",
          },
          {
            title: "Versatile Sharing",
            description:
              "Add QR codes to documents, presentations, packaging, websites, and promotional campaigns.",
          },
        ].map((benefit) => (
          <div key={benefit.title} className="flex gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-600" />
            <div>
              <h4 className="font-semibold text-gray-900">
                {benefit.title}
              </h4>
              <p className="mt-1 text-sm leading-7 text-gray-600">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Design Tips */}
    <section className="mt-16">
      <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
        Best Practices
      </span>

      <h3 className="mt-3 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
        QR Code Design Tips for Reliable Scanning
      </h3>

      <p className="mt-4 leading-8 text-gray-600">
        A well-designed QR code should be easy to scan in different
        environments. Follow these guidelines before printing or
        publishing your code.
      </p>

      <ul className="mt-6 space-y-4">
        {[
          {
            title: "Use strong contrast.",
            text: "Dark QR codes on light backgrounds are generally easier to scan.",
          },
          {
            title: "Keep enough clear space.",
            text: "Leave a clean margin around the code so scanners can identify its boundaries.",
          },
          {
            title: "Choose a suitable size.",
            text: "Make the code large enough for the intended scanning distance and printed material.",
          },
          {
            title: "Test on multiple devices.",
            text: "Scan the image before distributing it, especially if you plan to print it.",
          },
          {
            title: "Verify the destination.",
            text: "Check that the encoded website or resource is correct and trustworthy before sharing.",
          },
        ].map((tip, index) => (
          <li key={tip.title} className="flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
              {index + 1}
            </span>
            <p className="leading-7 text-gray-600">
              <strong className="text-gray-900">{tip.title}</strong>{" "}
              {tip.text}
            </p>
          </li>
        ))}
      </ul>
    </section>

    {/* Static QR Explanation */}
    <section className="mt-16 border-t border-gray-200 pt-10">
      <h3 className="text-2xl font-bold tracking-tight text-gray-950">
        Are QR Codes Created With This Tool Free?
      </h3>

      <p className="mt-4 leading-8 text-gray-600">
        Yes. The NexGenByte QR code generator lets you create and
        download a standard QR code PNG without paying for the
        generator. Your QR image is generated in your browser, while
        your email address and encoded content are submitted to our
        API when you request a download.
      </p>

      <p className="mt-4 leading-8 text-gray-600">
        This tool creates static QR codes, meaning the encoded
        information is stored directly in the image. The QR code
        itself does not expire, but its destination may become
        unavailable. To change the encoded content, you generally
        need to generate a new QR code. Using a redirect URL that
        you control can allow you to change the destination later.
      </p>
    </section>

    {/* Final CTA */}
    <div className="mt-16 overflow-hidden rounded-2xl bg-gray-950 p-7 text-white sm:p-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Create Your QR Code in Seconds
          </h3>

          <p className="mt-3 text-sm leading-7 text-gray-300 sm:text-base">
            Customize your colors, choose your size, and download
            your QR code for your next project.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            document.getElementById("qr-content")?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500"
        >
          <QrCode size={18} />
          Create QR Code
        </button>
      </div>
    </div>

  </div>
</article>


         {/* Modern FAQ Section */}
<section className="relative mt-24 overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white px-5 py-14 sm:px-10 sm:py-20">
  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl" />

  <div className="relative mx-auto max-w-3xl">
    <div className="mb-4 flex justify-center">
      <span className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
        Got Questions?
      </span>
    </div>

    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
      Frequently Asked{" "}
      <span className="text-blue-600">Questions</span>
    </h2>

    <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-7 text-gray-600 sm:text-base">
      Everything you need to know about creating, customizing,
      and downloading your QR code with NexGenByte.
    </p>

    <div className="mt-12 space-y-4">
      {[
        {
          question: "Is this QR code generator completely free?",
          answer:
            "Yes! You can create and download your QR code as a PNG image for free. An email address is required to process your download request.",
        },
        {
          question: "Can I customize the design of my QR code?",
          answer:
            "Absolutely. You can adjust the QR code size, choose a foreground color, and customize the background to match your brand or marketing materials.",
        },
        {
          question: "What file format will my QR code be downloaded in?",
          answer:
            "Your QR code is downloaded as a high-quality PNG image that you can use on websites, business cards, flyers, product packaging, presentations, and other digital or print materials.",
        },
        {
          question: "Do QR codes created with this tool expire?",
          answer:
            "No. This tool creates static QR codes that do not have an expiration date. However, the destination may stop working if the website or linked resource becomes unavailable.",
        },
        {
          question: "Can I change the destination after downloading?",
          answer:
            "A static QR code cannot be edited after creation. To change its encoded content, generate a new code. Alternatively, encode a redirect URL that you control so you can update its destination later.",
        },
        {
          question: "Is my QR code generated securely?",
          answer:
            "The QR code image is generated directly in your browser. When you request a download, your email address and QR code content are sent to our API to process the request. Only encode information you are comfortable submitting.",
        },
        {
          question: "Will my QR code work on all smartphones?",
          answer:
            "QR codes are supported by most modern smartphones. For the best results, use strong contrast, maintain clear space around the code, and test it on different devices before printing or sharing.",
        },
      ].map((faq, index) => (
        <details
          key={faq.question}
          className="group rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/[0.04] open:border-blue-200 open:shadow-lg open:shadow-blue-950/[0.04]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
            <span className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600 transition-colors group-open:bg-blue-600 group-open:text-white">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="pt-1 text-sm font-semibold leading-6 text-gray-900 sm:text-base">
                {faq.question}
              </span>
            </span>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 group-open:rotate-180 group-open:border-blue-600 group-open:bg-blue-600 group-open:text-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="m7 10 5 5 5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </summary>

          <div className="px-5 pb-6 sm:px-6">
            <div className="ml-12 border-l-2 border-blue-100 pl-4">
              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                {faq.answer}
              </p>
            </div>
          </div>
        </details>
      ))}
    </div>

    <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50/70 p-6 text-center sm:p-8">
      <h3 className="text-lg font-bold text-gray-900">
        Ready to create your QR code?
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        Customize your design, generate your code, and download
        it in seconds.
      </p>

      <button
        type="button"
        onClick={() =>
          document.getElementById("qr-content")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        }
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
      >
        <QrCode size={18} />
        Generate QR Code
      </button>
    </div>
  </div>
</section>
        </div>

        <Cta />
      </main>

      <Footer />
    </>
  );
}
