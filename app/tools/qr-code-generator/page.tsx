
"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, QrCode } from "lucide-react";
import Header from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";

export default function QRCodeGeneratorPage() {
  const [value, setValue] = useState("https://nexgenbyte.com");
  const [size, setSize] = useState(240);
  const [foreground, setForeground] = useState("#111827");
  const [background, setBackground] = useState("#ffffff");
  const qrRef = useRef<HTMLDivElement>(null);

  function downloadQR() {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas || !value.trim()) return;

    const link = document.createElement("a");
    link.download = "nexgenbyte-qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <>
    <Header/>
    <main className="min-h-screen bg-white px-5 py-16 text-gray-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-2xl bg-blue-50 p-4 text-blue-600">
              <QrCode size={32} />
            </div>
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Free NexGenByte Tool
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Free QR Code Generator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Create custom QR codes for websites, links, and text.
            Download your QR code for free, with no account required.
          </p>
        </header>

        <div className="grid gap-8 rounded-2xl border border-gray-200 p-6 sm:p-8 md:grid-cols-2">
          <section className="space-y-6">
            <div>
              <label
                htmlFor="qr-content"
                className="mb-2 block font-medium"
              >
                Website URL or text
              </label>

              <textarea
                id="qr-content"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="https://nexgenbyte.com"
                rows={4}
                maxLength={2000}
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="qr-size" className="mb-2 block font-medium">
                QR code size: {size}px
              </label>

              <input
                id="qr-size"
                type="range"
                min={160}
                max={400}
                step={20}
                value={size}
                onChange={(event) => setSize(Number(event.target.value))}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="block font-medium">QR color</span>
                <input
                  aria-label="QR code color"
                  type="color"
                  value={foreground}
                  onChange={(event) => setForeground(event.target.value)}
                  className="h-12 w-full cursor-pointer rounded-lg border p-1"
                />
              </label>

              <label className="space-y-2">
                <span className="block font-medium">Background</span>
                <input
                  aria-label="QR code background color"
                  type="color"
                  value={background}
                  onChange={(event) => setBackground(event.target.value)}
                  className="h-12 w-full cursor-pointer rounded-lg border p-1"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={downloadQR}
              disabled={!value.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Download size={18} />
              Download QR Code PNG
            </button>
          </section>

          <section className="flex min-h-80 flex-col items-center justify-center rounded-xl bg-gray-50 p-6 text-center">
            {value.trim() ? (
              <>
                <div
                  ref={qrRef}
                  className="max-w-full overflow-auto rounded-xl bg-white p-4 shadow-sm"
                >
                  <QRCodeCanvas
                    value={value.trim()}
                    size={size}
                    fgColor={foreground}
                    bgColor={background}
                    level="H"
                    marginSize={2}
                  />
                </div>

                <p className="mt-5 max-w-full break-all text-sm text-gray-600">
                  {value}
                </p>
              </>
            ) : (
              <div className="text-gray-500">
                <QrCode size={44} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">
                  Your QR code appears here
                </p>
                <p className="mt-2 text-sm">
                  Enter a URL or text to get started.
                </p>
              </div>
            )}
          </section>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Free to use. No account required. QR codes are generated in
          your browser.
        </p>
      </div>
    </main>
    <Footer/>
    </>
  );
}
