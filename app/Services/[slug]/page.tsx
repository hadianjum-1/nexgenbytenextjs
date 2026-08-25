import Footer from "@/app/Components/Footer";
import Header from "@/app/Components/Header";
import Link from "next/link";

const services = {
  "web-development": {
    title: "Web Development",
    subtitle: "Websites engineered to perform.",
    description:
      "We build fast, scalable and conversion-focused websites using modern technologies and development practices.",

    included: [
      "Custom website development",
      "Responsive design implementation",
      "Next.js / React development",
      "API integrations",
      "CMS integration",
      "Performance optimization",
      "Deployment and hosting setup",
    ],

    whoItsFor: [
      "Startups",
      "Small businesses",
      "Growing companies",
      "Service businesses",
      "Agencies",
      "Personal brands",
    ],
  },

  "custom-website-design": {
    title: "Custom Website Design",
    subtitle: "Design that makes your business stand out.",
    description:
      "We create unique digital experiences designed around your brand, customers and business objectives.",

    included: [
      "Custom UI design",
      "Responsive layouts",
      "Landing page design",
      "Design systems",
      "Conversion-focused sections",
      "Interactive experiences",
      "Mobile-first design",
    ],

    whoItsFor: [
      "Businesses with outdated websites",
      "Startups",
      "Personal brands",
      "Service providers",
      "Growing companies",
    ],
  },

  "ecommerce-development": {
    title: "E-commerce Development",
    subtitle: "Online stores built to sell.",
    description:
      "We create high-performance e-commerce websites that make it easier for customers to discover, trust and purchase your products.",

    included: [
      "Custom storefront",
      "Product pages",
      "Shopping cart",
      "Checkout integration",
      "Payment gateway integration",
      "Order management",
      "Mobile optimization",
    ],

    whoItsFor: [
      "Product businesses",
      "Online stores",
      "DTC brands",
      "Retail businesses",
      "Entrepreneurs",
    ],
  },

  "ui-ux-design": {
    title: "UI/UX Design",
    subtitle: "Experiences people enjoy using.",
    description:
      "We design intuitive interfaces that guide users naturally through your website or digital product.",

    included: [
      "User research",
      "Wireframes",
      "User flows",
      "UI design",
      "Prototypes",
      "Design systems",
      "Responsive design",
    ],

    whoItsFor: [
      "SaaS companies",
      "Startups",
      "Web applications",
      "Mobile products",
      "Digital businesses",
    ],
  },

  seo: {
    title: "SEO",
    subtitle: "Get discovered by the right people.",
    description:
      "We optimize your website's technical structure and content so search engines can better understand and rank your pages.",

    included: [
      "Technical SEO",
      "On-page SEO",
      "Keyword research",
      "Metadata optimization",
      "Site structure optimization",
      "Performance optimization",
      "SEO-friendly development",
    ],

    whoItsFor: [
      "Local businesses",
      "Service businesses",
      "E-commerce stores",
      "Startups",
      "Content-driven websites",
    ],
  },

  "ai-integrations": {
    title: "AI Integrations",
    subtitle: "Turn AI into a business advantage.",
    description:
      "We integrate AI into websites and business workflows to automate repetitive tasks and improve customer experiences.",

    included: [
      "AI chatbots",
      "AI customer support",
      "AI API integrations",
      "Content automation",
      "Lead qualification",
      "Business automation",
      "Custom AI workflows",
    ],

    whoItsFor: [
      "SaaS businesses",
      "E-commerce businesses",
      "Agencies",
      "Startups",
      "Businesses looking to automate",
    ],
  },

  "website-maintenance": {
    title: "Website Maintenance",
    subtitle: "Keep your website running at its best.",
    description:
      "We continuously maintain and improve your website so you can focus on running your business.",

    included: [
      "Security updates",
      "Bug fixes",
      "Performance monitoring",
      "Content updates",
      "Technical support",
      "Backup management",
      "Ongoing improvements",
    ],

    whoItsFor: [
      "Existing website owners",
      "Businesses without developers",
      "Agencies",
      "E-commerce stores",
      "Growing businesses",
    ],
  },

  "website-redesign": {
    title: "Website Redesign",
    subtitle: "Turn an outdated website into a modern experience.",
    description:
      "We redesign existing websites to improve their appearance, usability, performance and conversion rate.",

    included: [
      "UX audit",
      "Visual redesign",
      "Responsive redesign",
      "Performance optimization",
      "Conversion optimization",
      "SEO-friendly structure",
      "Modern development",
    ],

    whoItsFor: [
      "Businesses with outdated websites",
      "Low-converting websites",
      "Businesses rebranding",
      "Growing companies",
    ],
  },
};

type ServiceSlug = keyof typeof services;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate all service pages
export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({
    slug,
  }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;

  const service = services[slug as ServiceSlug];

  // =========================
  // SERVICE NOT FOUND
  // =========================

  if (!service) {
    return (
      <>
      <Header />

        <main className="flex min-h-screen items-center justify-center bg-background text-text">
          <div className="text-center">
            <p className="font-space-grotesk text-sm uppercase tracking-widest text-secondary">
              NEXGENBYTE
            </p>

            <h1 className="mt-4 font-space-grotesk text-5xl font-bold">
              Service Not Found
            </h1>

            <p className="mx-auto mt-4 max-w-md font-space-grotesk text-text-secondary">
              The service you&apos;re looking for doesn&apos;t exist.
            </p>

            <Link
              href="/"
              className="mt-8 inline-block rounded-full bg-text px-6 py-3 font-space-grotesk text-background transition-transform hover:scale-105"
            >
              Back Home
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background text-text">

        {/* ================= HERO ================= */}

        <section className="mx-auto w-[92vw] max-w-[1200px] pb-20 pt-28">

          <Link
            href="/#services"
            className="font-space-grotesk text-sm text-text-secondary/60 transition-colors hover:text-secondary"
          >
            ← Back to Services
          </Link>

          <div className="mt-14 max-w-4xl">

            <p className="font-space-grotesk font-medium text-secondary">
              NEXGENBYTE SERVICES
            </p>

            <h1 className="mt-5 font-space-grotesk text-5xl font-bold leading-[0.95] sm:text-6xl md:text-7xl">
              {service.title}
            </h1>

            <h2 className="mt-7 font-space-grotesk text-2xl text-text-secondary sm:text-3xl">
              {service.subtitle}
            </h2>

            <p className="mt-7 max-w-2xl font-space-grotesk text-lg leading-relaxed text-text-secondary/70">
              {service.description}
            </p>

          </div>
        </section>

        {/* ================= DETAILS ================= */}

        <section className="bg-text py-20 text-background">

          <div className="mx-auto grid w-[92vw] max-w-[1200px] gap-16 md:grid-cols-2">

            {/* INCLUDED */}

            <div>
              <p className="font-space-grotesk text-sm uppercase tracking-widest text-secondary">
                What&apos;s Included
              </p>

              <h2 className="mt-4 font-space-grotesk text-3xl font-bold sm:text-4xl">
                Everything you need.
              </h2>

              <div className="mt-10">

                {service.included.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-5 border-b border-white/10 py-5"
                  >
                    <span className="font-space-grotesk text-secondary">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="font-space-grotesk text-lg">
                      {item}
                    </span>
                  </div>
                ))}

              </div>
            </div>

            {/* WHO IT&apos;S FOR */}

            <div>
              <p className="font-space-grotesk text-sm uppercase tracking-widest text-secondary">
                Service Overview
              </p>

              <h2 className="mt-4 font-space-grotesk text-3xl font-bold sm:text-4xl">
                Who it&apos;s for.
              </h2>

              <div className="mt-10">

                {service.whoItsFor.map((item) => (
                  <div
                    key={item}
                    className="border-b border-white/10 py-5 font-space-grotesk text-lg text-white/70"
                  >
                    {item}
                  </div>
                ))}

              </div>
            </div>

          </div>
        </section>

        {/* ================= CTA ================= */}

        <section className="mx-auto w-[92vw] max-w-[1200px] py-24">

          <div className="rounded-3xl bg-secondary p-8 text-white sm:p-12 md:p-16">

            <p className="font-space-grotesk text-white/70">
              Ready to get started?
            </p>

            <h2 className="mt-3 max-w-2xl font-space-grotesk text-4xl font-bold sm:text-5xl">
              Let&apos;s build something that grows your business.
            </h2>

            <Link
              href="/#contact"
              className="mt-8 inline-block rounded-full bg-white px-7 py-4 font-space-grotesk text-text transition-transform hover:scale-105"
            >
              Start Your Project →
            </Link>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}