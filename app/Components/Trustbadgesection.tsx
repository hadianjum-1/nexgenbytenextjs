"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Trustbadgesection = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;

    const animation = gsap.to(track, {
      xPercent: -50,
      duration: 25,
      ease: "none",
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, []);

  const technologies = [
    "ParkSide Dental",
    "Meridian Analytics",
    "SaaSify",
    "HealthTech Solutions",
    "Volta Energy",
    "Aura Cod",
  
  ];

  return (
    <section className="w-[98vw] mx-auto py-10 sm:py-14 border-y border-dashed border-gray-300 overflow-hidden">

      {/* Heading */}

      <div className="text-center mb-8">

        <p className="font-space-grotesk text-xs sm:text-sm uppercase tracking-[0.2em] text-text-secondary/50">
         Trusted by growing businesses across healthcare, SaaS, and professional services
        </p>

      </div>


      {/* Marquee */}

      <div className="relative w-full overflow-hidden">

        {/* Left Fade */}

        <div className="absolute left-0 top-0 z-10 h-full w-16 sm:w-28 bg-gradient-to-r from-background to-transparent pointer-events-none" />


        {/* Right Fade */}

        <div className="absolute right-0 top-0 z-10 h-full w-16 sm:w-28 bg-gradient-to-l from-background to-transparent pointer-events-none" />


        {/* Moving Track */}

        <div
          ref={trackRef}
          className="flex w-max"
        >

          {/* First Set */}

          <div className="flex items-center">

            {technologies.map((technology, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center gap-8 sm:gap-12 px-6 sm:px-10"
              >

                <span className="font-space-grotesk text-xl sm:text-2xl md:text-3xl font-semibold text-text-secondary/30 whitespace-nowrap">
                  {technology}
                </span>

                <span className="w-2 h-2 rounded-full bg-secondary/40" />

              </div>
            ))}

          </div>


          {/* Duplicate Set */}

          <div className="flex items-center">

            {technologies.map((technology, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center gap-8 sm:gap-12 px-6 sm:px-10"
              >

                <span className="font-space-grotesk text-xl sm:text-2xl md:text-3xl font-semibold text-text-secondary/30 whitespace-nowrap">
                  {technology}
                </span>

                <span className="w-2 h-2 rounded-full bg-secondary/40" />

              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Trustbadgesection;