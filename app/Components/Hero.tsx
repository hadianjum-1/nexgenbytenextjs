"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";


const Hero = () => {

  // =========================
  // REFS
  // =========================

  const heroRef = useRef<HTMLElement>(null);

  const labelRef = useRef<HTMLAnchorElement>(null);
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


         
{/* Clutch Rating Badge */}
<a ref={labelRef}
  href="https://clutch.co/profile/nexgenbyte"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit NexGenByte on Clutch — rated 4.9 out of 5"
  className="mb-5 inline-flex w-fit items-center gap-3 rounded-xl
    border border-white/10 bg-white px-4 py-3
    font-space-grotesk transition-all duration-300
    hover:border-[#e62415]/40 hover:shadow-lg
    hover:shadow-[#e62415]/10"
>
  {/* Official Clutch Logo */}
  <img
    src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 405.7 115'%3E%3Ccircle cx='299.2' cy='75.3' r='13.3' fill='%23e62415'/%3E%3Cpath fill='%2317313b' d='M105.6 0h17.6v113.5h-17.6zm81.7 78.5c0 17.6-14.4 19-18.8 19-11 0-12.6-10.3-12.6-16.5V37.1h-17.7v43.8c-.1 10.9 3 19.9 9 25.9a32.1 32.1 0 0 0 40.1 2.1v4.6H205V37.1h-17.7zm55.9-67.1h-17.7v25.7h-12.3v16.7h12.3v59.7h17.7V53.8h14.5V37.1h-14.5zM315 91.8c-4 3.6-9.3 5.6-15.1 5.6a21.6 21.6 0 0 1-22.2-22.3c0-12.9 9.1-21.9 22.2-21.9 5.7 0 11.1 1.9 15.2 5.5l2.8 2.4 12.4-12.4-3.1-2.8a40.6 40.6 0 0 0-27.3-10.3c-23 0-39.7 16.6-39.7 39.4a39 39 0 0 0 39.7 39.9c10.5 0 20.3-3.7 27.5-10.4l3-2.8-12.6-12.4zm81.7-48a32.1 32.1 0 0 0-40.1-2.1V0h-17.7v113.5h17.7V72.2c0-17.6 14.4-19 18.8-19 11 0 12.6 10.3 12.6 16.5v43.9h17.7V69.7a36 36 0 0 0-9-25.9M79.5 86.3A36.7 36.7 0 0 1 53 97.4c-20.5 0-35.4-16.1-35.4-38.2C17.6 37 32.5 20.9 53 20.9c9.9 0 19.3 3.9 26.4 11l2.8 2.8 12.3-12.3-2.7-2.8A54.2 54.2 0 0 0 52.9 3.4C22.8 3.4 0 27.4 0 59.3 0 91 22.8 115 52.9 115c14.9 0 28.7-5.8 38.9-16.3l2.7-2.8-12.2-12.5z'/%3E%3C/svg%3E"
    alt="Clutch"
    className="h-7 w-auto sm:h-8"
  />

  {/* Divider */}
  <span className="h-8 w-px bg-gray-200" aria-hidden="true" />

  {/* Rating */}
  <span className="flex flex-col gap-1">
    <span className="flex items-center gap-1.5">
      <span className="text-xl font-bold leading-none text-[#17313b]">
        4.9
      </span>
      <span className="text-xs font-medium text-gray-500">/ 5</span>
    </span>

    <span
      className="flex gap-0.5 text-sm leading-none text-[#e62415]"
      aria-label="Five stars"
    >
      ★★★★★
    </span>
  </span>
</a>



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
            <Link href="/contact"
              className="bg-text text-background font-space-grotesk px-6 sm:px-7 py-3.5 sm:py-4 rounded-full hover:scale-105 transition-transform">
              Get Your Free Quote
            
            </Link>

            <Link
              href="#portfolio"
              className="flex items-center gap-3 font-space-grotesk font-medium group"
            >

              <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-secondary text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                →
              </span>

              View Our Work

            </Link>

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