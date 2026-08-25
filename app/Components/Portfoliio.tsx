"use client";

import React, { useRef  ,useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/app/data/Projects";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
  const ctx = gsap.context(() => {

    const track = trackRef.current;

    if (!track) return;

    const getScrollAmount = () => {
      return track.scrollWidth - window.innerWidth;
    };

    gsap.to(track, {
      x: () => -getScrollAmount(),

      ease: "none",

      scrollTrigger: {
        trigger: sectionRef.current,

        start: "top top",

        end: () => `+=${getScrollAmount()}`,

        pin: true,

        scrub: 1,

        invalidateOnRefresh: true,

        anticipatePin: 1,
      },
    });

  }, sectionRef);

  return () => ctx.revert();

}, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full overflow-hidden bg-background"
    >
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="portfolio-header w-full px-5 sm:px-8 md:px-12 lg:px-16 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16">
        <div className="max-w-[1200px] mx-auto text-center">

          {/* Label */}

          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-secondary" />

            <span className="font-space-grotesk text-xs sm:text-sm uppercase tracking-[0.2em] text-text-secondary/60">
              Portfolio
            </span>
          </div>

          {/* Heading */}

          <h2 className="font-space-grotesk font-bold text-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
            Explore Our
            <span className="text-secondary"> Real Work</span>
          </h2>

          <p className="font-space-grotesk text-text-secondary/60 text-sm sm:text-base max-w-xl mx-auto mt-5 leading-relaxed">
            From high-converting websites to powerful digital experiences,
            explore some of the work we&apos;ve created for modern businesses.
          </p>

        </div>
      </div>


      {/* =====================================
          HORIZONTAL SCROLL AREA
      ===================================== */}

      <div
        ref={sectionRef}
        className="portfolio-scroll relative"
      >

        <div
          ref={trackRef}
          className="
            portfolio-track
            flex
            gap-4
            sm:gap-6
            md:gap-8
            px-5
            sm:px-8
            md:px-12
            lg:px-16
            pb-20
            sm:pb-24
            w-max
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
                w-[82vw]
                sm:w-[70vw]
                md:w-[62vw]
                lg:w-[55vw]
                xl:w-[50vw]
                max-w-[760px]
              "
            >

              {/* Image */}

              <Link
                href={`/portfolio/${project.slug}`}
                className="block"
              >

                <div
                  className="
                    relative
                    w-full
                    aspect-[16/10]
                    overflow-hidden
                    rounded-2xl
                    sm:rounded-3xl
                    bg-gray-100
                  "
                >

                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="
                      (max-width: 640px) 82vw,
                      (max-width: 768px) 70vw,
                      (max-width: 1024px) 62vw,
                      55vw
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-105
                    "
                  />

                  {/* Dark overlay */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/0
                      group-hover:bg-black/20
                      transition-colors
                      duration-500
                    "
                  />

                  {/* Arrow */}

                  <div
                    className="
                      absolute
                      right-4
                      top-4
                      sm:right-6
                      sm:top-6
                      w-10
                      h-10
                      sm:w-12
                      sm:h-12
                      rounded-full
                      bg-white
                      text-text
                      flex
                      items-center
                      justify-center
                      opacity-0
                      translate-y-3
                      group-hover:opacity-100
                      group-hover:translate-y-0
                      transition-all
                      duration-500
                    "
                  >
                    Ã¢â€ â€”
                  </div>

                </div>

              </Link>


              {/* Project Information */}

              <div className="mt-5 sm:mt-6">

                <div className="flex items-center justify-between gap-4">

                  <div>

                    <p
                      className="
                        font-space-grotesk
                        text-xs
                        sm:text-sm
                        uppercase
                        tracking-widest
                        text-secondary
                        mb-2
                      "
                    >
                      {project.category}
                    </p>

                    <h3
                      className="
                        font-space-grotesk
                        text-xl
                        sm:text-2xl
                        md:text-3xl
                        font-semibold
                        text-text
                      "
                    >
                      {project.title}
                    </h3>

                  </div>

                  <span
                    className="
                      hidden
                      sm:block
                      font-space-grotesk
                      text-sm
                      text-text-secondary/40
                    "
                  >
                    0{index + 1}
                  </span>

                </div>


                <p
                  className="
                    font-space-grotesk
                    text-sm
                    sm:text-base
                    text-text-secondary/60
                    max-w-lg
                    mt-3
                    leading-relaxed
                  "
                >
                  {project.shortDescription}
                </p>

              </div>

            </article>

          ))}

        </div>

      </div>


      {/* =====================================
          BOTTOM
      ===================================== */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          items-start
          sm:items-center
          justify-between
          gap-5
          px-5
          sm:px-8
          md:px-12
          lg:px-16
          pb-16
          sm:pb-20
          max-w-[1400px]
          mx-auto
        "
      >

        <p className="font-space-grotesk text-sm text-text-secondary/50">
          Scroll to explore our projects Ã¢â€ â€™
        </p>

        <Link
          href="/portfolio"
          className="
            font-space-grotesk
            text-sm
            sm:text-base
            font-medium
            text-text
            border-b
            border-text
            pb-1
            hover:text-secondary
            hover:border-secondary
            transition-colors
          "
        >
          View All Projects
        </Link>

      </div>

    </section>
  );
};

export default Portfolio;