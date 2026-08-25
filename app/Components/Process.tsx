"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    const cardsContainer = cardsRef.current;
    const progress = progressRef.current;

    if (!section || !cardsContainer) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =====================================================
      // DESKTOP
      // =====================================================

     mm.add("(min-width: 768px)", () => {
  const cards =
    gsap.utils.toArray<HTMLElement>(".process-card");

  // Stack cards
  gsap.set(cards, {
    position: "absolute",
    inset: 0,
  });

  // First card
  gsap.set(cards[0], {
    y: 0,
    opacity: 1,
    scale: 1,
    zIndex: 5,
  });

  // Other cards
  gsap.set(cards.slice(1), {
    y: 50,
    opacity: 0,
    scale: 0.97,
    zIndex: 1,
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,

      start: "top top",

      // SHORTER SCROLL
      end: () =>
        `+=${window.innerHeight * 2.5}`,

      pin: true,

      // FASTER RESPONSE
      scrub: 0.3,

      anticipatePin: 1,

      invalidateOnRefresh: true,

      onUpdate: (self) => {
        if (progress) {
          gsap.set(progress, {
            scaleX: self.progress,
          });
        }
      },
    },
  });

  cards.forEach((card, index) => {
    if (index === 0) return;

    const previousCard = cards[index - 1];

    const label = `card-${index}`;

    // Previous card exits
    timeline.to(
      previousCard,
      {
        y: -50,
        opacity: 0,
        scale: 0.97,
        duration: 0.6,
        ease: "power2.inOut",
      },
      label
    );

    // New card enters
    timeline.to(
      card,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      label
    );
  });

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
  };
});
      // =====================================================
      // MOBILE
      // =====================================================

      mm.add("(max-width: 767px)", () => {
        const cards =
          gsap.utils.toArray<HTMLElement>(".process-card");

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",

              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions:
                  "play none none reverse",
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        bg-text
        text-background
        overflow-hidden
      "
    >

      {/* =====================================================
          DESKTOP
      ===================================================== */}

      <div
        className="
          hidden
          md:block

          relative
          h-screen
          min-h-[700px]
        "
      >

        {/* ================= HEADER ================= */}

        <div
          className="
            absolute
            top-0
            left-0

            w-full

            z-30
            pointer-events-none
          "
        >

          <div
            className="
              w-[90%]
              max-w-[1400px]
              mx-auto

              pt-10
              lg:pt-14
              xl:pt-16
            "
          >

            <span
              className="
                font-space-grotesk
                text-secondary
                text-sm
                md:text-base
              "
            >
              Our Process
            </span>

            <h2
              className="
                font-space-grotesk

                text-4xl
                md:text-5xl
                lg:text-6xl
                xl:text-7xl

                font-bold

                mt-3

                leading-[0.95]
              "
            >
              How We Build
            </h2>

            <p
              className="
                font-space-grotesk

                text-white/50

                text-sm
                md:text-base

                max-w-xl

                mt-4

                leading-relaxed
              "
            >
              A proven process designed to turn your ideas
              into a website that performs, converts, and
              grows with your business.
            </p>

          </div>

        </div>


        {/* =================================================
            CARD CONTAINER
        ================================================= */}

        <div
          ref={cardsRef}
          className="
            absolute

            left-1/2
            -translate-x-1/2

            top-[275px]
            lg:top-[300px]
            xl:top-[320px]

            w-[90%]
            max-w-[1200px]

            h-[calc(100vh-370px)]
            min-h-[380px]

            pb-20
          "
        >

          <div
            className="
              relative

              w-full
              h-full
            "
          >

            {processes.map((process) => (

              <article
                key={process.number}
                className="
                  process-card

                  absolute
                  inset-0

                  w-full
                  h-full

                  rounded-2xl
                  lg:rounded-3xl

                  border
                  border-white/10

                  bg-[#111111]

                  p-7
                  md:p-8
                  lg:p-10
                  xl:p-12

                  flex
                  flex-col
                  justify-between

                  shadow-2xl
                "
              >

                {/* ================= TOP ================= */}

                <div>

                  <div
                    className="
                      flex
                      items-start
                      justify-between

                      gap-5
                    "
                  >

                    <div>

                      <span
                        className="
                          process-number

                          font-space-grotesk

                          text-secondary

                          text-xs
                          md:text-sm

                          tracking-widest
                        "
                      >
                        {process.number}
                      </span>

                      <h3
                        className="
                          process-title

                          font-space-grotesk

                          text-3xl
                          md:text-4xl
                          lg:text-5xl
                          xl:text-6xl

                          font-bold

                          mt-2
                          md:mt-3

                          leading-tight
                        "
                      >
                        {process.title}
                      </h3>

                      <p
                        className="
                          font-space-grotesk

                          text-secondary

                          text-xs
                          md:text-sm

                          mt-2
                        "
                      >
                        {process.week}
                      </p>

                    </div>


                    {/* ARROW */}

                    <div
                      className="
                        flex-shrink-0

                        w-10
                        h-10
                        md:w-11
                        md:h-11

                        rounded-full

                        border
                        border-white/20

                        flex
                        items-center
                        justify-center

                        text-lg

                        transition-all
                        duration-300

                        hover:bg-secondary
                        hover:border-secondary
                      "
                    >
                      ↗
                    </div>

                  </div>


                  {/* ================= DESCRIPTION ================= */}

                  <p
                    className="
                      font-space-grotesk

                      text-white/60

                      text-sm
                      md:text-base
                      lg:text-lg

                      leading-relaxed

                      max-w-2xl

                      mt-7
                      lg:mt-9
                    "
                  >
                    {process.description}
                  </p>

                </div>


                {/* ================= BOTTOM ================= */}

                <div
                  className="
                    grid
                    grid-cols-2

                    gap-8
                    lg:gap-12

                    pt-6
                    lg:pt-7

                    border-t
                    border-white/10

                    mt-8
                  "
                >

                  {/* DELIVERABLE */}

                  <div>

                    <span
                      className="
                        text-secondary

                        text-[10px]
                        md:text-xs

                        uppercase

                        tracking-[0.18em]
                      "
                    >
                      Deliverable
                    </span>

                    <p
                      className="
                        font-space-grotesk

                        text-white/60

                        text-xs
                        md:text-sm
                        lg:text-base

                        leading-relaxed

                        mt-2
                        lg:mt-3

                        max-w-md
                      "
                    >
                      {process.deliverable}
                    </p>

                  </div>


                  {/* WHAT WE NEED */}

                  <div>

                    <span
                      className="
                        text-secondary

                        text-[10px]
                        md:text-xs

                        uppercase

                        tracking-[0.18em]
                      "
                    >
                      What we need from you
                    </span>

                    <p
                      className="
                        font-space-grotesk

                        text-white/60

                        text-xs
                        md:text-sm
                        lg:text-base

                        leading-relaxed

                        mt-2
                        lg:mt-3

                        max-w-md
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
            PROGRESS BAR
        ================================================= */}

        <div
          className="
            absolute

            bottom-6
            lg:bottom-8

            left-[5%]
            right-[5%]

            h-[2px]

            bg-white/10

            z-40
          "
        >

          <div
            ref={progressRef}
            className="
              h-full
              w-full

              bg-secondary

              origin-left

              scale-x-0
            "
          />

        </div>

      </div>


      {/* =====================================================
          MOBILE
      ===================================================== */}

      <div
        className="
          md:hidden

          w-full

          px-5
          sm:px-6

          py-16
          sm:py-20
        "
      >

        {/* HEADER */}

        <div className="mb-10 sm:mb-12">

          <span
            className="
              font-space-grotesk

              text-secondary

              text-sm
            "
          >
            Our Process
          </span>

          <h2
            className="
              font-space-grotesk

              text-4xl
              sm:text-5xl

              font-bold

              mt-3

              leading-[0.95]
            "
          >
            How We Build
          </h2>

          <p
            className="
              font-space-grotesk

              text-white/50

              text-sm

              leading-relaxed

              mt-5

              max-w-md
            "
          >
            A proven process designed to turn your ideas
            into a website that performs and converts.
          </p>

        </div>


        {/* MOBILE CARDS */}

        <div className="flex flex-col gap-5">

          {processes.map((process) => (

            <article
              key={process.number}
              className="
                process-card

                w-full

                min-h-[470px]

                rounded-2xl

                border
                border-white/10

                bg-white/[0.025]

                p-6

                flex
                flex-col
                justify-between
              "
            >

              <div>

                <div
                  className="
                    flex
                    justify-between
                    gap-4
                  "
                >

                  <div>

                    <span
                      className="
                        text-secondary

                        font-space-grotesk

                        text-sm
                      "
                    >
                      {process.number}
                    </span>

                    <h3
                      className="
                        process-title

                        font-space-grotesk

                        text-3xl

                        font-bold

                        mt-2
                      "
                    >
                      {process.title}
                    </h3>

                    <p
                      className="
                        text-secondary

                        text-sm

                        mt-2
                      "
                    >
                      {process.week}
                    </p>

                  </div>

                  <span
                    className="
                      text-xl
                      text-white/40
                    "
                  >
                    ↗
                  </span>

                </div>


                <p
                  className="
                    font-space-grotesk

                    text-white/60

                    text-sm

                    leading-relaxed

                    mt-7
                  "
                >
                  {process.description}
                </p>

              </div>


              {/* BOTTOM */}

              <div
                className="
                  pt-6

                  mt-8

                  border-t
                  border-white/10
                "
              >

                <div>

                  <span
                    className="
                      text-secondary

                      text-[10px]

                      uppercase

                      tracking-widest
                    "
                  >
                    Deliverable
                  </span>

                  <p
                    className="
                      text-white/60

                      text-sm

                      leading-relaxed

                      mt-2
                    "
                  >
                    {process.deliverable}
                  </p>

                </div>


                <div className="mt-5">

                  <span
                    className="
                      text-secondary

                      text-[10px]

                      uppercase

                      tracking-widest
                    "
                  >
                    What we need from you
                  </span>

                  <p
                    className="
                      text-white/60

                      text-sm

                      leading-relaxed

                      mt-2
                    "
                  >
                    {process.need}
                  </p>

                </div>

              </div>

            </article>

          ))}

        </div>


        {/* MOBILE CTA */}

        <div
          className="
            mt-14

            pt-7

            border-t
            border-white/10
          "
        >

          <p className="text-white/40 text-sm">
            Ready to build something that grows?
          </p>

          <a
            href="#contact"
            className="
              inline-flex

              mt-4

              bg-secondary
              text-white

              px-6
              py-3

              rounded-full

              font-space-grotesk

              text-sm
            "
          >
            Start a Project →
          </a>

        </div>

      </div>

    </section>
  );
};

export default Process;