"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const processes = [
  {
    number: "01",
    title: "Discover",
    week: "Week 1",
    description:
      "We learn your business, your buyers, and your competition. In-depth discovery sessions, analytics review, competitor audit, and user research form the foundation every decision is built on.",
    deliverable:
      "Discovery document, competitive audit, agreed KPIs.",
    need:
      "Brand assets, analytics access, core positioning files.",
  },
  {
    number: "02",
    title: "Strategy",
    week: "Week 1–2",
    description:
      "Data from discovery shapes the site architecture, content hierarchy, and conversion strategy. We define the user journey, decide on the technical stack, and align on the project roadmap.",
    deliverable:
      "Sitemap, user journey map, technical specification, content brief.",
    need:
      "Feedback round approval, content draft sign-offs.",
  },
  {
    number: "03",
    title: "Design",
    week: "Week 2–5",
    description:
      "Wireframes first, high-fidelity design second. We share each phase for review before advancing. The design system built here becomes the foundation for every page.",
    deliverable:
      "Wireframes, design system, full high-fidelity mockups in Figma.",
    need:
      "Design approval, confirmation of tech stack paths.",
  },
  {
    number: "04",
    title: "Build",
    week: "Week 5–9",
    description:
      "Development starts from an approved design. We build in weekly sprint cycles with staging reviews, so you see real progress — not a big reveal at the end.",
    deliverable:
      "Staging site, code repository, CMS configuration.",
    need:
      "Copy review & integration credentials.",
  },
  {
    number: "05",
    title: "Launch & Optimize",
    week: "Week 9+",
    description:
      "We launch your website, monitor performance, fix issues, and continuously improve the experience based on real user behavior and conversion data.",
    deliverable:
      "Production launch, analytics setup, performance optimization.",
    need:
      "Final approval, domain access, analytics confirmation.",
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* =====================================================
         DESKTOP / TABLET
      ===================================================== */

      mm.add("(min-width: 768px)", () => {
        const cards =
          gsap.utils.toArray<HTMLElement>(".process-card");

        if (!cards.length) return;

        /*
         * Stack all cards.
         */

        gsap.set(cards, {
          position: "absolute",
          inset: 0,
        });

        /*
         * First card visible.
         */

        gsap.set(cards[0], {
          y: 0,
          opacity: 1,
          scale: 1,
          zIndex: cards.length,
        });

        /*
         * Remaining cards hidden.
         */

        gsap.set(cards.slice(1), {
          y: 45,
          opacity: 0,
          scale: 0.975,
          zIndex: 1,
        });

        /*
         * Main timeline.
         */

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,

            start: "top top",

            /*
             * Use the viewport height so the animation
             * scales naturally on different monitors.
             */
            end: () => {
              const viewportHeight = window.innerHeight;

              return `+=${Math.max(
                viewportHeight * 2.8,
                cards.length * 320
              )}`;
            },

            pin: true,

            scrub: 0.7,

            anticipatePin: 1,

            invalidateOnRefresh: true,

            onUpdate: (self) => {
              if (!progressRef.current) return;

              gsap.set(progressRef.current, {
                scaleX: self.progress,
              });
            },
          },
        });

        /*
         * Card transitions.
         */

        cards.forEach((card, index) => {
          if (index === 0) return;

          const previousCard = cards[index - 1];

          const label = `step-${index}`;

          /*
           * Previous card exits.
           */

          timeline.to(
            previousCard,
            {
              y: -45,
              opacity: 0,
              scale: 0.975,
              duration: 0.8,
              ease: "power2.inOut",
            },
            label
          );

          /*
           * New card enters.
           */

          timeline.to(
            card,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            label
          );
        });

        /*
         * Refresh after everything has been created.
         */

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });


      /* =====================================================
         MOBILE
      ===================================================== */

      mm.add("(max-width: 767px)", () => {
        const cards =
          gsap.utils.toArray<HTMLElement>(".process-card");

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              y: 35,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: "power3.out",

              scrollTrigger: {
                trigger: card,

                start: "top 88%",

                toggleActions:
                  "play none none reverse",
              },
            }
          );
        });
      });

    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-text
        text-background
      "
    >

      {/* =====================================================
          DESKTOP / TABLET
      ===================================================== */}

      <div
        className="
          relative
          hidden
          min-h-screen
          md:block
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            absolute
            left-0
            top-0
            z-30
            w-full
            pointer-events-none
          "
        >

          <div
            className="
              mx-auto
              w-[88%]
              max-w-[1400px]

              pt-10

              lg:pt-12

              xl:pt-14

              2xl:pt-16
            "
          >

            <span
              className="
                font-space-grotesk
                text-sm
                text-secondary

                lg:text-base
              "
            >
              Our Process
            </span>


            <h2
              className="
                mt-3
                font-space-grotesk
                text-4xl
                font-bold
                leading-[0.95]

                md:text-5xl

                lg:text-6xl

                xl:text-7xl
              "
            >
              How We Build
            </h2>


            <p
              className="
                mt-4
                max-w-xl
                font-space-grotesk
                text-sm
                leading-relaxed
                text-white/50

                lg:text-base
              "
            >
              A proven process designed to turn your ideas
              into a website that performs, converts, and
              grows with your business.
            </p>

          </div>

        </div>


        {/* =================================================
            CARD AREA
        ================================================= */}

        <div
          ref={cardsRef}
          className="
            absolute
            left-1/2
            top-[235px]
            h-[calc(100vh-335px)]
            w-[88%]
            max-w-[1400px]
            -translate-x-1/2

            lg:top-[255px]
            lg:h-[calc(100vh-355px)]

            xl:top-[275px]
            xl:h-[calc(100vh-375px)]

            2xl:top-[290px]
            2xl:h-[calc(100vh-390px)]
          "
        >

          <div className="relative h-full w-full">

            {processes.map((process) => (

              <article
                key={process.number}
                className="
                  process-card
                  absolute
                  inset-0

                  flex
                  h-full
                  w-full
                  flex-col
                  justify-between

                  overflow-hidden

                  rounded-2xl
                  border
                  border-white/10
                  bg-[#111111]

                  p-6

                  shadow-2xl

                  md:p-7

                  lg:rounded-3xl
                  lg:p-9

                  xl:p-11

                  2xl:p-12
                "
              >

                {/* =========================================
                    CARD TOP
                ========================================= */}

                <div>

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-6
                    "
                  >

                    <div className="min-w-0">

                      <span
                        className="
                          font-space-grotesk
                          text-xs
                          tracking-widest
                          text-secondary

                          md:text-sm
                        "
                      >
                        {process.number}
                      </span>


                      <h3
                        className="
                          mt-2
                          font-space-grotesk
                          text-3xl
                          font-bold
                          leading-tight

                          md:text-4xl

                          lg:text-5xl

                          xl:text-6xl
                        "
                      >
                        {process.title}
                      </h3>


                      <p
                        className="
                          mt-2
                          font-space-grotesk
                          text-xs
                          text-secondary

                          md:text-sm
                        "
                      >
                        {process.week}
                      </p>

                    </div>


                    {/* Arrow */}

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/20
                        text-base
                        transition-all
                        duration-300

                        md:h-11
                        md:w-11
                        md:text-lg

                        hover:border-secondary
                        hover:bg-secondary
                      "
                    >
                      ↗
                    </div>

                  </div>


                  {/* Description */}

                  <p
                    className="
                      mt-6
                      max-w-3xl
                      font-space-grotesk
                      text-sm
                      leading-relaxed
                      text-white/60

                      md:mt-7
                      md:text-base

                      lg:mt-8
                      lg:text-lg
                    "
                  >
                    {process.description}
                  </p>

                </div>


                {/* =========================================
                    CARD BOTTOM
                ========================================= */}

                <div
                  className="
                    mt-6
                    grid
                    grid-cols-1
                    gap-6
                    border-t
                    border-white/10
                    pt-5

                    md:gap-8

                    lg:grid-cols-2
                    lg:gap-12
                    lg:pt-6
                  "
                >

                  {/* Deliverable */}

                  <div>

                    <span
                      className="
                        font-space-grotesk
                        text-[10px]
                        uppercase
                        tracking-[0.18em]
                        text-secondary

                        md:text-xs
                      "
                    >
                      Deliverable
                    </span>


                    <p
                      className="
                        mt-2
                        max-w-xl
                        font-space-grotesk
                        text-xs
                        leading-relaxed
                        text-white/60

                        md:text-sm

                        lg:mt-3
                        lg:text-base
                      "
                    >
                      {process.deliverable}
                    </p>

                  </div>


                  {/* What we need */}

                  <div>

                    <span
                      className="
                        font-space-grotesk
                        text-[10px]
                        uppercase
                        tracking-[0.18em]
                        text-secondary

                        md:text-xs
                      "
                    >
                      What we need from you
                    </span>


                    <p
                      className="
                        mt-2
                        max-w-xl
                        font-space-grotesk
                        text-xs
                        leading-relaxed
                        text-white/60

                        md:text-sm

                        lg:mt-3
                        lg:text-base
                      "
                    >
                      {process.need}
                    </p>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>


        {/* =================================================
            PROGRESS
        ================================================= */}

        <div
          className="
            absolute
            bottom-5
            left-[6%]
            right-[6%]
            z-40
            h-[2px]
            overflow-hidden
            bg-white/10

            lg:bottom-7
          "
        >

          <div
            ref={progressRef}
            className="
              h-full
              w-full
              origin-left
              scale-x-0
              bg-secondary
            "
          />

        </div>

      </div>


      {/* =====================================================
          MOBILE
      ===================================================== */}

      <div
        className="
          w-full
          px-5
          py-16

          sm:px-6
          sm:py-20

          md:hidden
        "
      >

        {/* Mobile Header */}

        <div className="mb-10 sm:mb-12">

          <span
            className="
              font-space-grotesk
              text-sm
              text-secondary
            "
          >
            Our Process
          </span>


          <h2
            className="
              mt-3
              font-space-grotesk
              text-4xl
              font-bold
              leading-[0.95]

              sm:text-5xl
            "
          >
            How We Build
          </h2>


          <p
            className="
              mt-5
              max-w-md
              font-space-grotesk
              text-sm
              leading-relaxed
              text-white/50
            "
          >
            A proven process designed to turn your ideas
            into a website that performs and converts.
          </p>

        </div>


        {/* Mobile Cards */}

        <div className="flex flex-col gap-5">

          {processes.map((process) => (

            <article
              key={process.number}
              className="
                process-card
                flex
                min-h-[450px]
                w-full
                flex-col
                justify-between

                overflow-hidden

                rounded-2xl
                border
                border-white/10
                bg-[#111111]

                p-6

                sm:min-h-[470px]
                sm:p-7
              "
            >

              <div>

                {/* Header */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >

                  <div>

                    <span
                      className="
                        font-space-grotesk
                        text-sm
                        text-secondary
                      "
                    >
                      {process.number}
                    </span>


                    <h3
                      className="
                        mt-2
                        font-space-grotesk
                        text-3xl
                        font-bold
                        leading-tight

                        sm:text-4xl
                      "
                    >
                      {process.title}
                    </h3>


                    <p
                      className="
                        mt-2
                        font-space-grotesk
                        text-sm
                        text-secondary
                      "
                    >
                      {process.week}
                    </p>

                  </div>


                  <span
                    className="
                      flex
                      h-9
                      w-9
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      text-white/40
                    "
                  >
                    ↗
                  </span>

                </div>


                {/* Description */}

                <p
                  className="
                    mt-7
                    font-space-grotesk
                    text-sm
                    leading-relaxed
                    text-white/60

                    sm:text-base
                  "
                >
                  {process.description}
                </p>

              </div>


              {/* Bottom */}

              <div
                className="
                  mt-8
                  border-t
                  border-white/10
                  pt-6
                "
              >

                {/* Deliverable */}

                <div>

                  <span
                    className="
                      font-space-grotesk
                      text-[10px]
                      uppercase
                      tracking-widest
                      text-secondary
                    "
                  >
                    Deliverable
                  </span>


                  <p
                    className="
                      mt-2
                      font-space-grotesk
                      text-sm
                      leading-relaxed
                      text-white/60
                    "
                  >
                    {process.deliverable}
                  </p>

                </div>


                {/* Need */}

                <div className="mt-5">

                  <span
                    className="
                      font-space-grotesk
                      text-[10px]
                      uppercase
                      tracking-widest
                      text-secondary
                    "
                  >
                    What we need from you
                  </span>


                  <p
                    className="
                      mt-2
                      font-space-grotesk
                      text-sm
                      leading-relaxed
                      text-white/60
                    "
                  >
                    {process.need}
                  </p>

                </div>

              </div>

            </article>

          ))}

        </div>


        {/* Mobile CTA */}

        <div
          className="
            mt-12
            border-t
            border-white/10
            pt-7

            sm:mt-14
          "
        >

          <p
            className="
              font-space-grotesk
              text-sm
              text-white/40
            "
          >
            Ready to build something that grows?
          </p>


          <Link
            href="/contact"
            className="
              mt-4
              inline-flex
              rounded-full
              bg-secondary
              px-6
              py-3
              font-space-grotesk
              text-sm
              text-white
              transition-opacity
              hover:opacity-90
            "
          >
            Start a Project →
          </Link>

        </div>

      </div>

    </section>
  );
};

export default Process;

