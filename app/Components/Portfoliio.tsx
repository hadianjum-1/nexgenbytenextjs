"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/app/data/Projects";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const scrollArea = scrollAreaRef.current;
    const track = trackRef.current;

    if (!section || !scrollArea || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /*
       * ==========================================
       * DESKTOP / TABLET
       * GSAP horizontal scroll
       * ==========================================
       */

      mm.add("(min-width: 768px)", () => {
        const getScrollAmount = () => {
          const amount = track.scrollWidth - window.innerWidth;

          return Math.max(0, amount);
        };

        const tween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",

          scrollTrigger: {
            trigger: scrollArea,

            start: "top top",

            end: () => `+=${getScrollAmount()}`,

            pin: true,

            scrub: 1,

            invalidateOnRefresh: true,

            anticipatePin: 1,

            refreshPriority: 1,
          },
        });

        ScrollTrigger.refresh();

        return () => {
          tween.kill();
        };
      });

      /*
       * ==========================================
       * MOBILE
       *
       * No GSAP pinning.
       * Native horizontal scrolling is much
       * smoother and more reliable on phones.
       * ==========================================
       */

      mm.add("(max-width: 767px)", () => {
        gsap.set(track, {
          clearProps: "transform",
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
      id="portfolio"
      className={`
        relative
        w-full
        overflow-hidden
        bg-background
      `}
    >

      {/* ==========================================
          HEADER
      ========================================== */}

      <div
        className={`
          w-full
          px-5
          pt-16
          pb-10

          sm:px-8
          sm:pt-20
          sm:pb-12

          md:px-12
          md:pt-24
          md:pb-14

          lg:px-16
          lg:pt-28
          lg:pb-16
        `}
      >

        <div
          className={`
            mx-auto
            max-w-[1200px]
            text-center
          `}
        >

          {/* Label */}

          <div
            className={`
              mb-4
              inline-flex
              items-center
              gap-2
            `}
          >

            <span
              className={`
                h-2
                w-2
                rounded-full
                bg-secondary
              `}
            />

            <span
              className={`
                font-space-grotesk
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-text-secondary/60

                sm:text-xs

                md:text-sm
              `}
            >
              Portfolio
            </span>

          </div>


          {/* Heading */}

          <h2
            className={`
              mx-auto
              max-w-[900px]
              font-space-grotesk
              text-[2.35rem]
              font-bold
              leading-[1.05]
              tracking-tight
              text-text

              sm:text-5xl

              md:text-6xl

              lg:text-7xl

              xl:text-8xl
            `}
          >
            Explore Our{" "}
            <span className="text-secondary">
              Real Work
            </span>
          </h2>


          {/* Description */}

          <p
            className={`
              mx-auto
              mt-4
              max-w-xl
              font-space-grotesk
              text-sm
              leading-relaxed
              text-text-secondary/60

              sm:mt-5
              sm:text-base

              lg:text-lg
            `}
          >
            From high-converting websites to powerful digital
            experiences, explore some of the work we&apos;ve
            created for modern businesses.
          </p>

        </div>

      </div>


      {/* ==========================================
          HORIZONTAL PROJECT AREA
      ========================================== */}

      <div
        ref={scrollAreaRef}
        className={`
          portfolio-scroll
          relative
          w-full

          /* MOBILE */
          overflow-x-auto
          overflow-y-hidden
          overscroll-x-contain
          touch-pan-x
          scrollbar-none

          /* DESKTOP */
          md:overflow-hidden
        `}
      >

        <div
          ref={trackRef}
          className={`
            portfolio-track
            flex
            w-max
            items-start

            gap-4
            px-5
            pb-10

            sm:gap-6
            sm:px-8
            sm:pb-12

            md:gap-8
            md:px-12
            md:pb-20

            lg:gap-10
            lg:px-16
            lg:pb-24

            xl:gap-12

            2xl:px-20
          `}
        >

          {projects.map((project, index) => (

            <article
              key={project.slug}
              className={`
                portfolio-card
                group
                relative
                flex-shrink-0

                /* MOBILE */
                w-[86vw]

                /* SMALL TABLET */
                sm:w-[78vw]

                /* TABLET */
                md:w-[68vw]

                /* DESKTOP */
                lg:w-[58vw]

                xl:w-[52vw]

                2xl:w-[48vw]

                max-w-[820px]
              `}
            >

              {/* ==================================
                  PROJECT IMAGE
              ================================== */}

              <Link
                href={`/portfolio/${project.slug}`}
                className={`
                  block
                  w-full
                  focus:outline-none
                `}
              >

                <div
                  className={`
                    relative
                    aspect-[16/10]
                    w-full
                    overflow-hidden
                    rounded-2xl
                    bg-gray-100

                    sm:rounded-3xl
                  `}
                >

                  <Image
                    src={project.image}
                    alt={`${project.title} project preview`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 640px) 86vw, (max-width: 768px) 78vw, (max-width: 1024px) 68vw, (max-width: 1280px) 58vw, (max-width: 1536px) 52vw, 48vw"
                    className={`
                      object-cover
                      transition-transform
                      duration-700
                      ease-out

                      md:group-hover:scale-[1.04]
                    `}
                  />


                  {/* Overlay */}

                  <div
                    className={`
                      absolute
                      inset-0
                      bg-black/0
                      transition-colors
                      duration-500

                      md:group-hover:bg-black/20
                    `}
                  />


                  {/* ==================================
                      ARROW
                  ================================== */}

                  <div
                    className={`
                      absolute
                      right-3
                      top-3

                      flex
                      h-10
                      w-10
                      items-center
                      justify-center

                      rounded-full
                      bg-white
                      text-text

                      sm:right-5
                      sm:top-5
                      sm:h-11
                      sm:w-11

                      md:right-6
                      md:top-6
                      md:h-12
                      md:w-12

                      md:translate-y-3
                      md:opacity-0
                      md:transition-all
                      md:duration-500
                      md:group-hover:translate-y-0
                      md:group-hover:opacity-100
                    `}
                  >

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className={`
                        h-5
                        w-5

                        sm:h-[21px]
                        sm:w-[21px]

                        md:h-6
                        md:w-6
                      `}
                    >

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />

                    </svg>

                  </div>

                </div>

              </Link>


              {/* ==================================
                  PROJECT INFORMATION
              ================================== */}

              <div
                className={`
                  mt-4
                  sm:mt-5
                  md:mt-6
                `}
              >

                <div
                  className={`
                    flex
                    items-start
                    justify-between
                    gap-4
                  `}
                >

                  {/* Project title */}

                  <div className="min-w-0">

                    <p
                      className={`
                        mb-1.5
                        font-space-grotesk
                        text-[10px]
                        uppercase
                        tracking-[0.16em]
                        text-secondary

                        sm:mb-2
                        sm:text-xs

                        md:text-sm
                        md:tracking-widest
                      `}
                    >
                      {project.category}
                    </p>


                    <h3
                      className={`
                        font-space-grotesk
                        text-xl
                        font-semibold
                        leading-tight
                        text-text

                        sm:text-2xl

                        md:text-3xl
                      `}
                    >
                      {project.title}
                    </h3>

                  </div>


                  {/* Number */}

                  <span
                    className={`
                      shrink-0
                      font-space-grotesk
                      text-xs
                      text-text-secondary/40

                      sm:text-sm
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>


                {/* Description */}

                <p
                  className={`
                    mt-2
                    max-w-xl
                    font-space-grotesk
                    text-xs
                    leading-relaxed
                    text-text-secondary/60

                    sm:mt-3
                    sm:text-sm

                    md:text-base
                  `}
                >
                  {project.shortDescription}
                </p>

              </div>

            </article>

          ))}


          {/* ==================================
              RIGHT SIDE SPACING
          ================================== */}

          <div
            aria-hidden="true"
            className={`
              h-1
              w-[8vw]
              flex-shrink-0

              md:w-[12vw]
              lg:w-[15vw]
            `}
          />

        </div>

      </div>


      {/* ==========================================
          MOBILE SCROLL HINT
      ========================================== */}

      <div
        className={`
          flex
          items-center
          justify-between
          gap-4
          px-5
          pb-8
          pt-1

          sm:px-8

          md:hidden
        `}
      >

        <p
          className={`
            font-space-grotesk
            text-xs
            text-text-secondary/50
          `}
        >
          Swipe to explore
        </p>

        <span
          className={`
            font-space-grotesk
            text-xs
            text-text-secondary/40
          `}
        >
          →
        </span>

      </div>


      {/* ==========================================
          BOTTOM
      ========================================== */}

      <div
        className={`
          mx-auto
          flex
          max-w-[1400px]
          flex-col
          items-start
          justify-between
          gap-5

          px-5
          pb-14

          sm:flex-row
          sm:items-center
          sm:px-8
          sm:pb-20

          md:px-12

          lg:px-16
        `}
      >

        {/* Desktop message */}

        <p
          className={`
            hidden
            font-space-grotesk
            text-sm
            text-text-secondary/50

            md:block
          `}
        >
          Scroll to explore our projects
        </p>


        {/* View all */}

        <Link
          href="/portfolio"
          className={`
            border-b
            border-text
            pb-1
            font-space-grotesk
            text-sm
            font-medium
            text-text
            transition-colors

            hover:border-secondary
            hover:text-secondary

            sm:text-base
          `}
        >
          View All Projects
        </Link>

      </div>


      {/* ==========================================
          HIDE MOBILE SCROLLBAR
      ========================================== */}

      <style jsx>{`
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>

    </section>
  );
};

export default Portfolio;

