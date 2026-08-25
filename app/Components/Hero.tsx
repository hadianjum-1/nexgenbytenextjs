"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const Hero = () => {

  // =========================
  // REFS
  // =========================

  const heroRef = useRef<HTMLElement>(null);

  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const buttonsRef = useRef<HTMLDivElement>(null);
  const technologiesRef = useRef<HTMLDivElement>(null);

  const imageRef = useRef<HTMLDivElement>(null);

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const decorationRef = useRef<HTMLDivElement>(null);


  // =========================
  // HERO ENTRANCE ANIMATION
  // =========================

  useEffect(() => {

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });


      // Initial states

      gsap.set(
        [
          labelRef.current,
          headingRef.current,
          descriptionRef.current,
          buttonsRef.current,
          technologiesRef.current,
        ],
        {
          opacity: 0,
          y: 40,
        }
      );


      gsap.set(imageRef.current, {
        opacity: 0,
        x: 80,
        scale: 0.9,
      });


      gsap.set(
        [
          card1Ref.current,
          card2Ref.current,
          card3Ref.current,
        ],
        {
          opacity: 0,
          scale: 0.7,
          y: 30,
        }
      );


      // =========================
      // LEFT SIDE
      // =========================

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      })

      .to(
        headingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.3"
      )

      .to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.4"
      )

      .to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.3"
      )

      .to(
        technologiesRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.3"
      );


      // =========================
      // RIGHT IMAGE
      // =========================

      tl.to(
        imageRef.current,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power4.out",
        },
        "-=1.5"
      );


      // =========================
      // STAT CARDS
      // =========================

      tl.to(
        [
          card1Ref.current,
          card2Ref.current,
          card3Ref.current,
        ],
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );


      // =========================
      // DECORATION
      // =========================

      gsap.to(decorationRef.current, {
        y: -15,
        x: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });


      // =========================
      // IMAGE FLOATING
      // =========================

      gsap.to(imageRef.current, {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

    }, heroRef);


    return () => ctx.revert();

  }, []);


  return (
    <section
      ref={heroRef}
      className="hero-section w-[98vw] min-h-[90vh] mx-auto mt-[80px]"
    >

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center py-12 sm:py-16 lg:py-10">


        {/* ================= LEFT CONTENT ================= */}

        <div className="flex flex-col justify-center px-5 sm:px-8 md:px-10 lg:px-12">


          {/* Small Label */}

          <span
            ref={labelRef}
            className="font-space-grotesk text-sm md:text-base font-medium text-secondary mb-5"
          >
            Web Development Agency
          </span>


          {/* Heading */}

          <h1
            ref={headingRef}
            className="font-space-grotesk text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-text max-w-[650px]"
          >
            Websites That Turn

            <span className="block text-secondary">
              Visitors Into Customers.
            </span>

          </h1>


          {/* Description */}

          <p
            ref={descriptionRef}
            className="font-space-grotesk text-base md:text-lg text-text-secondary leading-relaxed max-w-[550px] mt-7"
          >
            NexGenByte designs and builds premium websites for businesses
            that need more qualified leads, more conversions, and a stronger
            online presence — not just a prettier homepage.
          </p>


          {/* Buttons */}

          <div
            ref={buttonsRef}
            className="flex flex-wrap items-center gap-4 mt-8"
          >

            <a
              href="#contact"
              className="bg-text text-background font-space-grotesk px-6 sm:px-7 py-3.5 sm:py-4 rounded-full hover:scale-105 transition-transform"
            >
              Get Your Free Quote
            </a>


            <a
              href="#projects"
              className="flex items-center gap-3 font-space-grotesk font-medium group"
            >

              <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-secondary text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                →
              </span>

              View Our Work

            </a>

          </div>


          {/* Trust Text */}

          <div
            ref={technologiesRef}
            className="mt-12 sm:mt-16"
          >

            <p className="font-space-grotesk text-sm text-text-secondary/60 mb-5">
              Built with modern technologies
            </p>


            <div className="flex flex-wrap gap-5 sm:gap-6 items-center">

              <span className="font-space-grotesk font-semibold text-text-secondary/40">
                Next.js
              </span>

              <span className="font-space-grotesk font-semibold text-text-secondary/40">
                React
              </span>

              <span className="font-space-grotesk font-semibold text-text-secondary/40">
                TypeScript
              </span>

              <span className="font-space-grotesk font-semibold text-text-secondary/40">
                Node.js
              </span>

            </div>

          </div>

        </div>


        {/* ================= RIGHT VISUAL ================= */}

        <div className="relative w-full flex items-center justify-center px-2 sm:px-6 lg:px-0">

          <div
            ref={imageRef}
            className="relative w-full sm:w-[90%] lg:w-[90%] max-w-[650px]"
          >


            {/* ================= IMAGE ================= */}

            <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">

              <Image
                src="/Heroimage.png"
                alt="NexGenByte website showing business growth and analytics"
                width={1536}
                height={1024}
                priority
                quality={90}
                sizes="(max-width: 640px) 96vw, (max-width: 1024px) 80vw, 650px"
                className="w-full h-auto object-contain"
              />

            </div>


            {/* ================= STAT CARD 1 ================= */}

            <div
              ref={card1Ref}
              className="hidden sm:block absolute -left-5 md:-left-10 top-8 md:top-12 bg-secondary text-white rounded-2xl p-4 md:p-5 shadow-xl w-[130px] md:w-[150px]"
            >

              <div className="text-xl md:text-2xl font-bold font-space-grotesk">
                98%
              </div>

              <p className="text-[10px] md:text-xs mt-1 font-space-grotesk">
                Client satisfaction
              </p>

            </div>


            {/* ================= STAT CARD 2 ================= */}

            <div
              ref={card2Ref}
              className="hidden sm:block absolute -right-3 md:-right-8 top-[35%] bg-text text-white rounded-2xl p-4 md:p-5 shadow-xl w-[130px] md:w-[145px]"
            >

              <div className="text-xl md:text-2xl font-bold font-space-grotesk">
                2.5X
              </div>

              <p className="text-[10px] md:text-xs mt-1 text-white/70 font-space-grotesk">
                Better conversions
              </p>

            </div>


            {/* ================= STAT CARD 3 ================= */}

            <div
              ref={card3Ref}
              className="hidden sm:block absolute -left-3 md:-left-5 bottom-5 md:bottom-8 bg-white rounded-2xl p-4 md:p-5 shadow-xl border border-black/5 w-[140px] md:w-[165px]"
            >

              <div className="text-xl md:text-2xl font-bold font-space-grotesk text-text">
                50+
              </div>

              <p className="text-[10px] md:text-xs mt-1 text-text-secondary font-space-grotesk">
                Projects delivered
              </p>

            </div>


            {/* ================= DECORATION ================= */}

            <div
              ref={decorationRef}
              className="absolute -right-4 -top-5 w-16 h-16 bg-secondary rounded-full opacity-20 blur-xl pointer-events-none"
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;