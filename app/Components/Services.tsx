"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

const services = [
  {
    number: "01",
    title: "Web Development",
    slug: "web-development",
    description:
      "Fast, scalable and conversion-focused websites built with modern technologies like Next.js, React and TypeScript.",
  },
  {
    number: "02",
    title: "Custom Website Design",
    slug: "custom-website-design",
    description:
      "Unique website experiences designed around your brand, audience and business goals — not generic templates.",
  },
  {
    number: "03",
    title: "E-commerce Development",
    slug: "ecommerce-development",
    description:
      "High-converting online stores designed to make browsing simple, checkout smooth and your products easier to sell.",
  },
  {
    number: "04",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "User-focused interfaces that look premium, feel intuitive and guide visitors toward meaningful actions.",
  },
  {
    number: "05",
    title: "SEO",
    slug: "seo",
    description:
      "Technical and on-page SEO foundations that help search engines understand your website and help customers find you.",
  },
  {
    number: "06",
    title: "AI Integrations",
    slug: "ai-integrations",
    description:
      "Add AI-powered chatbots, automation, content generation and intelligent workflows to your business.",
  },
  {
    number: "07",
    title: "Website Maintenance",
    slug: "website-maintenance",
    description:
      "Keep your website secure, updated, fast and reliable with ongoing technical maintenance and support.",
  },
  {
    number: "08",
    title: "Website Redesign",
    slug: "website-redesign",
    description:
      "Transform outdated websites into modern digital experiences designed for today's users and devices.",
  },
];

const Services = () => {
  const [activeService, setActiveService] = useState<number | null>(null);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ==========================================
  // DESKTOP HOVER OPEN
  // ==========================================

  const openDesktop = (index: number) => {
    // Don't use hover animation on mobile
    if (window.innerWidth < 768) return;

    const item = itemRefs.current[index];

    if (!item) return;

    const description = item.querySelector(
      ".service-description"
    );

    const arrow = item.querySelector(
      ".service-arrow"
    );

    gsap.killTweensOf([
      item,
      description,
      arrow,
    ]);

    gsap.to(item, {
      height: 190,
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.to(description, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      delay: 0.08,
      ease: "power2.out",
    });

    gsap.to(arrow, {
      rotation: 45,
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
    });
  };


  // ==========================================
  // DESKTOP HOVER CLOSE
  // ==========================================

  const closeDesktop = (index: number) => {
    if (window.innerWidth < 768) return;

    const item = itemRefs.current[index];

    if (!item) return;

    const description = item.querySelector(
      ".service-description"
    );

    const arrow = item.querySelector(
      ".service-arrow"
    );

    gsap.killTweensOf([
      item,
      description,
      arrow,
    ]);

    gsap.to(item, {
      height: 96,
      duration: 0.4,
      ease: "power3.inOut",
    });

    gsap.to(description, {
      opacity: 0,
      y: 10,
      duration: 0.2,
    });

    gsap.to(arrow, {
      rotation: 0,
      scale: 1,
      duration: 0.25,
    });
  };


  // ==========================================
  // MOBILE TAP
  // ==========================================

  const toggleMobile = (index: number) => {
    if (window.innerWidth >= 768) return;

    setActiveService(
      activeService === index ? null : index
    );
  };


  return (
    <section
      id="services"
      className="
        w-[calc(100%-16px)]
        sm:w-[98vw]
        mx-auto
        bg-text
        text-background
        px-4
        sm:px-8
        md:px-12
        lg:px-16
        py-16
        sm:py-20
        md:py-24
        lg:py-28
        overflow-hidden
      "
    >

      {/* =====================================
          SECTION HEADER
      ===================================== */}

      <div
        className="
          max-w-4xl
          mx-auto
          text-center
          mb-12
          sm:mb-14
          md:mb-16
        "
      >

        <p
          className="
            font-space-grotesk
            text-xs
            sm:text-sm
            uppercase
            tracking-[0.18em]
            text-secondary
            font-medium
            mb-3
            sm:mb-4
          "
        >
          What We Do
        </p>


        <h2
          className="
            font-space-grotesk
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-bold
            tracking-tight
            leading-tight
          "
        >
          Your Needs, Our Expertise
        </h2>


        <p
          className="
            font-space-grotesk
            text-sm
            sm:text-base
            text-white/60
            max-w-2xl
            mx-auto
            mt-4
            sm:mt-5
            leading-relaxed
            px-2
          "
        >
          Your vision, our expertise. We build digital experiences
          that combine thoughtful design, powerful technology and
          measurable business results.
        </p>

      </div>


      {/* =====================================
          SERVICES LIST
      ===================================== */}

      <div
        className="
          w-full
          max-w-[1100px]
          mx-auto
          border-t
          border-white/15
        "
      >

        {services.map((service, index) => {

          const isActive =
            activeService === index;

          return (

            <div
              key={service.slug}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}

              onMouseEnter={() =>
                openDesktop(index)
              }

              onMouseLeave={() =>
                closeDesktop(index)
              }

              onClick={() =>
                toggleMobile(index)
              }

              className={`
                service-item
                relative
                w-full
                border-b
                border-white/15
                overflow-hidden
                cursor-pointer
                transition-colors
                duration-300

                ${isActive
                  ? "bg-white/[0.03]"
                  : ""
                }
              `}

              style={{
                height:
                  isActive
                    ? "230px"
                    : "88px",
              }}
            >

              <div
                className="
                  absolute
                  inset-0
                  flex
                  flex-col
                  justify-start
                  pt-5
                  sm:pt-6
                  px-1
                  sm:px-3
                "
              >

                {/* =================================
                    SERVICE TOP ROW
                ================================= */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    min-w-0
                  "
                >

                  {/* Number + Title */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      sm:gap-5
                      min-w-0
                      flex-1
                    "
                  >

                    <span
                      className="
                        flex-shrink-0
                        font-space-grotesk
                        text-[10px]
                        sm:text-xs
                        md:text-sm
                        text-white/40
                      "
                    >
                      {service.number}
                    </span>


                    <h3
                      className="
                        font-space-grotesk
                        text-lg
                        sm:text-2xl
                        md:text-3xl
                        lg:text-4xl
                        font-semibold
                        leading-tight
                        truncate
                        sm:whitespace-normal
                      "
                    >
                      {service.title}
                    </h3>

                  </div>


                  {/* =================================
                      ARROW
                  ================================= */}

                  <Link
                    href={`/services/${service.slug}`}
                    onClick={(e) =>
                      e.stopPropagation()
                    }
                    className="
                      service-arrow
                      flex-shrink-0
                      w-9
                      h-9
                      sm:w-10
                      sm:h-10
                      md:w-11
                      md:h-11
                      rounded-full
                      border
                      border-white/20
                      flex
                      items-center
                      justify-center
                      text-sm
                      sm:text-base
                      hover:bg-secondary
                      hover:border-secondary
                      transition-colors
                    "
                    aria-label={`Explore ${service.title}`}
                  >
                    ↗
                  </Link>

                </div>


                {/* =================================
                    DESCRIPTION
                ================================= */}

                <div
                  className={`
                    service-description
                    ml-7
                    sm:ml-9
                    md:ml-[55px]
                    mt-5
                    max-w-[700px]

                    ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-3"
                    }

                    transition-all
                    duration-300
                  `}
                >

                  <p
                    className="
                      font-space-grotesk
                      text-xs
                      sm:text-sm
                      md:text-base
                      text-white/60
                      leading-relaxed
                      pr-2
                    "
                  >
                    {service.description}
                  </p>


                  <Link
                    href={`/services/${service.slug}`}
                    onClick={(e) =>
                      e.stopPropagation()
                    }
                    className="
                      inline-block
                      mt-3
                      font-space-grotesk
                      text-xs
                      sm:text-sm
                      text-secondary
                      hover:text-white
                      transition-colors
                    "
                  >
                    Explore Service →
                  </Link>

                </div>

              </div>

            </div>

          );
        })}

      </div>


      {/* =====================================
          BOTTOM CTA
      ===================================== */}

      <div
        className="
          max-w-[1100px]
          mx-auto
          mt-10
          sm:mt-12
          flex
          flex-col
          sm:flex-row
          justify-between
          items-start
          sm:items-center
          gap-5
        "
      >

        <p
          className="
            font-space-grotesk
            text-xs
            sm:text-sm
            text-white/50
            max-w-md
            leading-relaxed
          "
        >
          Don't see exactly what you need?
          We can build a custom solution around
          your business.
        </p>


        <Link
          href="/contact"
          className="
            bg-background
            text-text
            px-6
            sm:px-7
            py-3
            sm:py-3.5
            rounded-full
            font-space-grotesk
            text-sm
            sm:text-base
            whitespace-nowrap
            hover:bg-secondary
            hover:text-white
            transition-colors
          "
        >
          Discuss Your Project →
        </Link>

      </div>

    </section>
  );
};

export default Services;