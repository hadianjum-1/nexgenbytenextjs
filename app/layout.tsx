import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import Preloader from "./Components/Preloader";
import PromoPopup from "./Components/PromoPopup";
import AIChatbot from "./Components/AIChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk-next",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexgenbyte.com"),

  title: {
    default: "NexGenByte | Web Development Agency",
    template: "%s | NexGenByte",
  },

  description:
    "NexGenByte is a web development agency helping ambitious businesses build fast, modern, high-converting websites that grow their online presence.",

  keywords: [
    "web development agency",
    "web development company",
    "website development",
    "custom website development",
    "Next.js development agency",
    "React development agency",
    "business website development",
    "modern website design",
    "responsive web development",
    "professional web development",
    "frontend development",
    "full stack web development",
    "website design and development",
    "NexGenByte",
  ],

  authors: [
    {
      name: "NexGenByte",
      url: "https://nexgenbyte.com",
    },
  ],

  creator: "NexGenByte",
  publisher: "NexGenByte",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexgenbyte.com",
    siteName: "NexGenByte",

    title: "NexGenByte | Web Development Agency",

    description:
      "We build fast, modern and high-converting websites for ambitious businesses.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NexGenByte - Web Development Agency",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "NexGenByte | Web Development Agency",

    description:
      "Modern websites built for ambitious businesses. Strategy, design and development by NexGenByte.",

    images: ["/og-image.png"],

    creator: "@NexGenByte",
  },

  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],

    apple: [
      {
        url: "/apple-touch-icon.png",
        type: "image/png",
      },
    ],
  },

  manifest: "/manifest.json",

  category: "technology",

  applicationName: "NexGenByte",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        <Preloader />

        {children}

        <PromoPopup />
        <AIChatbot />

      </body>
    </html>
  );
}