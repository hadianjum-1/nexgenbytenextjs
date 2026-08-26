"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const progress = {
        value: 0,
      };

      // Initial state
      gsap.set(logoRef.current, {
        opacity: 0,
        y: 20,
      });

      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(progressRef.current, {
        width: "0%",
      });

      // Logo entrance
      gsap.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Progress animation
      gsap.to(progress, {
        value: 100,
        duration: 2.2,
        ease: "power2.inOut",

        onUpdate: () => {
          const value = Math.round(progress.value);

          if (percentageRef.current) {
            percentageRef.current.textContent = `${value}%`;
          }

          if (progressRef.current) {
            progressRef.current.style.width = `${value}%`;
          }

          if (lineRef.current) {
            gsap.set(lineRef.current, {
              scaleX: value / 100,
            });
          }
        },

        onComplete: () => {
          const exitTimeline = gsap.timeline({
            onComplete: () => {
              setLoading(false);
              document.body.style.overflow = "";
            },
          });

          exitTimeline
            .to(logoRef.current, {
              y: -20,
              opacity: 0,
              duration: 0.35,
              ease: "power2.in",
            })
            .to(
              loaderRef.current,
              {
                yPercent: -100,
                duration: 0.9,
                ease: "power4.inOut",
              },
              "-=0.05"
            );
        },
      });
    }, loaderRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      ref={loaderRef}
      className="
        fixed
        inset-0
        z-[9999]
        flex
        min-h-[100dvh]
        w-full
        items-center
        justify-center
        bg-background
        text-text
      "
    >
      <div className="flex w-[min(90%,520px)] flex-col">

        {/* BRAND */}

        <div
          ref={logoRef}
          className="flex flex-col items-center"
        >
          <p
            className="
              font-space-grotesk
              text-xs
              font-medium
              uppercase
              tracking-[0.35em]
              text-text-secondary
            "
          >
            NexGenByte
          </p>

          <h1
            className="
              mt-4
              font-space-grotesk
              text-4xl
              font-semibold
              tracking-tight
              sm:text-5xl
            "
          >
            Building digital
            <br />
            experiences.
          </h1>
        </div>

        {/* PROGRESS */}

        <div className="mt-16">

          <div className="mb-3 flex items-center justify-between">

            <span
              className="
                font-space-grotesk
                text-xs
                uppercase
                tracking-[0.2em]
                text-text-secondary
              "
            >
              Loading
            </span>

            <span
              ref={percentageRef}
              className="
                font-space-grotesk
                text-sm
                font-medium
              "
            >
              0%
            </span>

          </div>

          {/* BAR */}

          <div
            className="
              relative
              h-[2px]
              w-full
              overflow-hidden
              bg-text/10
            "
          >
            <div
              ref={progressRef}
              className="
                absolute
                left-0
                top-0
                h-full
                bg-text
              "
            />
          </div>

          {/* SECOND ANIMATED LINE */}

          <div
            ref={lineRef}
            className="
              mt-2
              h-[1px]
              w-full
              bg-secondary
            "
          />

        </div>

        {/* FOOTER */}

        <div className="mt-8 flex items-center justify-between">

          <span
            className="
              font-space-grotesk
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-text-secondary/50
            "
          >
            Web Development
          </span>

          <span
            className="
              font-space-grotesk
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-text-secondary/50
            "
          >
            2026
          </span>

        </div>

      </div>
    </div>
  );
}