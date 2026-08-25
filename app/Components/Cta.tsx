"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

const Cta = () => {
  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      
      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1400px]
          overflow-hidden
          rounded-2xl
          bg-[#111111]
          px-6
          py-20
          sm:px-10
          sm:py-24
          lg:rounded-3xl
          lg:py-28
        "
      >

        {/* ================= LEFT GLOW ================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            h-full
            w-[18%]
            opacity-80
          "
        >
          <div className="absolute left-0 top-[8%] h-[2px] w-full bg-white/10 blur-[1px]" />
          <div className="absolute left-0 top-[18%] h-[8px] w-full bg-white/[0.05] blur-md" />
          <div className="absolute left-0 top-[30%] h-[3px] w-full bg-white/10 blur-sm" />
          <div className="absolute left-0 top-[42%] h-[10px] w-full bg-white/[0.04] blur-lg" />
          <div className="absolute left-0 top-[56%] h-[3px] w-full bg-white/10 blur-sm" />
          <div className="absolute left-0 top-[68%] h-[9px] w-full bg-white/[0.04] blur-md" />
          <div className="absolute left-0 top-[82%] h-[3px] w-full bg-white/10 blur-sm" />
          <div className="absolute left-0 top-[94%] h-[8px] w-full bg-white/[0.04] blur-md" />

          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.08] to-transparent" />
        </div>


        {/* ================= RIGHT GLOW ================= */}

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            h-full
            w-[18%]
            opacity-80
          "
        >
          <div className="absolute right-0 top-[8%] h-[2px] w-full bg-white/10 blur-[1px]" />
          <div className="absolute right-0 top-[18%] h-[8px] w-full bg-white/[0.05] blur-md" />
          <div className="absolute right-0 top-[30%] h-[3px] w-full bg-white/10 blur-sm" />
          <div className="absolute right-0 top-[42%] h-[10px] w-full bg-white/[0.04] blur-lg" />
          <div className="absolute right-0 top-[56%] h-[3px] w-full bg-white/10 blur-sm" />
          <div className="absolute right-0 top-[68%] h-[9px] w-full bg-white/[0.04] blur-md" />
          <div className="absolute right-0 top-[82%] h-[3px] w-full bg-white/10 blur-sm" />
          <div className="absolute right-0 top-[94%] h-[8px] w-full bg-white/[0.04] blur-md" />

          <div className="absolute inset-0 bg-gradient-to-l from-white/[0.08] to-transparent" />
        </div>


        {/* ================= CENTER CONTENT ================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            max-w-4xl
            flex-col
            items-center
            text-center
          "
        >

          {/* SMALL TEXT */}

          <p
            className="
              font-space-grotesk
              text-sm
              font-semibold
              text-white
              sm:text-base
            "
          >
            Have a project in mind? Just let us know!
          </p>


          {/* HEADING */}

          <h2
            className="
              mt-5
              font-space-grotesk
              text-5xl
              font-bold
              leading-[0.95]
              tracking-[-0.04em]
              text-white
              sm:text-6xl
              md:text-7xl
              lg:text-[6.5rem]
            "
          >
            Let's Start Talk
          </h2>


          {/* BUTTON */}

          <a
            href="/contact"
            className="
              group
              mt-10
              inline-flex
              items-center
              gap-2
              rounded-md
              bg-white
              px-6
              py-3.5
              font-space-grotesk
              text-sm
              font-medium
              text-black
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-secondary
              hover:text-white
              sm:mt-12
              sm:px-7
            "
          >
            Connect With Us

            <ArrowUpRight
              size={16}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </a>

        </div>

      </div>

    </section>
  );
};

export default Cta;