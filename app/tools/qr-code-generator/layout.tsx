
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free QR Code Generator",
  description:
    "Create custom QR codes for websites, links, and text. Customize colors and download your QR code as a PNG for free.",
  alternates: {
    canonical: "/tools/qr-code-generator",
  },
  openGraph: {
    title: "Free QR Code Generator | NexGenByte",
    description:
      "Create and download custom QR codes for free with NexGenByte's online QR code generator.",
    url: "https://nexgenbyte.com/tools/qr-code-generator",
    siteName: "NexGenByte",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function QRCodeGeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
