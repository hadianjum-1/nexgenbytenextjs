"use client";

import React, { useRef, useLayoutEffect } from "react";
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
      const getScrollAmount = () => {
        const maxScroll = track.scrollWidth - window.innerWidth;

        return Math.max(0, maxScroll);
      };

      const animation = gsap.to(track, {
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
        animation.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="
        relative
        w-full
        overflow-hidden
        bg-background
      "
    >

      {/* =====================================
          HEADER
      ===================================== */}

      <div
        className="
          portfolio-header
          w-full
          px-5
          sm:px-8
          md:px-12
          lg:px-16
          pt-20
          sm:pt-24
          md:pt-28
          lg:pt-32
          pb-12
          sm:pb-16
          lg:pb-20
        "
      >

        <div className="mx-auto max-w-[1200px] text-center">

          {/* Label */}

          <div className="mb-4 inline-flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-secondary" />

            <span
              className="
                font-space-grotesk
                text-xs
                uppercase
                tracking-[0.2em]
                text-text-secondary/60
                sm:text-sm
              "
            >
              Portfolio
            </span>

          </div>


          {/* Heading */}

          <h2
            className="
              font-space-grotesk
              text-4xl
              font-bold
              tracking-tight
              text-text
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              xl:text-8xl
            "
          >
            Explore Our
            <span className="text-secondary"> Real Work</span>
          </h2>


          {/* Description */}

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              font-space-grotesk
              text-sm
              leading-relaxed
              text-text-secondary/60
              sm:text-base
              lg:text-lg
            "
          >
            From high-converting websites to powerful digital experiences,
            explore some of the work we&apos;ve created for modern businesses.
          </p>

        </div>

      </div>


      {/* =====================================
          HORIZONTAL SCROLL AREA
      ===================================== */}

      <div
        ref={scrollAreaRef}
        className="
          portfolio-scroll
          relative
          w-full
          overflow-hidden
        "
      >

        {/* TRACK */}

        <div
          ref={trackRef}
          className="
            portfolio-track
            flex
            w-max
            gap-4
            px-5
            pb-20
            sm:gap-6
            sm:px-8
            sm:pb-24
            md:gap-8
            md:px-12
            lg:gap-10
            lg:px-16
            xl:gap-12
            2xl:px-20
          "
        >

          {projects.map((project, index) => (

            <article
              key={project.slug}
              className="
                portfolio-card
                group
                relative
                flex-shrink-0

                w-[86vw]

                sm:w-[74vw]

                md:w-[65vw]

                lg:w-[58vw]

                xl:w-[52vw]

                2xl:w-[48vw]

                max-w-[820px]
              "
            >

              {/* =====================================
                  IMAGE
              ===================================== */}

              <Link
                href={`/portfolio/${project.slug}`}
                className="block"
              >

                <div
                  className="
                    relative
                    aspect-[16/10]
                    w-full
                    overflow-hidden
                    rounded-2xl
                    bg-gray-100
                    sm:rounded-3xl
                  "
                >

                  <Image
                    src={project.image}
                    alt={`${project.title} project preview`}
                    fill
                    sizes="
                      (max-width: 640px) 86vw,
                      (max-width: 768px) 74vw,
                      (max-width: 1024px) 65vw,
                      (max-width: 1280px) 58vw,
                      (max-width: 1536px) 52vw,
                      48vw
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-[1.04]
                    "
                  />


                  {/* Overlay */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/0
                      transition-colors
                      duration-500
                      group-hover:bg-black/20
                    "
                  />


                  {/* Arrow */}

                  <div
                    className="
                      absolute
                      right-4
                      top-4
                      flex
                      h-10
                      w-10
                      translate-y-3
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-text
                      opacity-0
                      transition-all
                      duration-500
                      group-hover:translate-y-0
                      group-hover:opacity-100
                      sm:right-6
                      sm:top-6
                      sm:h-12
                      sm:w-12
                    "
                  >

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-5 w-5 sm:h-6 sm:w-6"
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


              {/* =====================================
                  PROJECT INFORMATION
              ===================================== */}

              <div className="mt-5 sm:mt-6">

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >

                  <div className="min-w-0">

                    <p
                      className="
                        mb-2
                        font-space-grotesk
                        text-xs
                        uppercase
                        tracking-widest
                        text-secondary
                        sm:text-sm
                      "
                    >
                      {project.category}
                    </p>


                    <h3
                      className="
                        font-space-grotesk
                        text-xl
                        font-semibold
                        text-text
                        sm:text-2xl
                        md:text-3xl
                      "
                    >
                      {project.title}
                    </h3>

                  </div>


                  {/* Project number */}

                  <span
                    className="
                      hidden
                      shrink-0
                      font-space-grotesk
                      text-sm
                      text-text-secondary/40
                      sm:block
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>


                <p
                  className="
                    mt-3
                    max-w-xl
                    font-space-grotesk
                    text-sm
                    leading-relaxed
                    text-text-secondary/60
                    sm:text-base
                  "
                >
                  {project.shortDescription}
                </p>

              </div>

            </article>

          ))}


          {/* =====================================
              EXTRA RIGHT SPACE
              Prevents last card from being clipped
          ===================================== */}

          <div
            aria-hidden="true"
            className="
              h-1
              w-[10vw]
              flex-shrink-0
              lg:w-[15vw]
            "
          />

        </div>

      </div>


      {/* =====================================
          BOTTOM
      ===================================== */}

      <div
        className="
          mx-auto
          flex
          max-w-[1400px]
          flex-col
          items-start
          justify-between
          gap-5
          px-5
          pb-16
          sm:flex-row
          sm:items-center
          sm:px-8
          sm:pb-20
          md:px-12
          lg:px-16
        "
      >

        <p
          className="
            font-space-grotesk
            text-sm
            text-text-secondary/50
          "
        >
          Scroll to explore our projects
        </p>


        <Link
          href="/portfolio"
          className="
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
          "
        >
          View All Projects
        </Link>

      </div>

    </section>
  );
};

export default Portfolio;

