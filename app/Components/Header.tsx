"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const drawerRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLLIElement[]>([]);
  const drawerQuoteRef = useRef<HTMLLIElement>(null);

  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);

  // =====================================================
  // STORE MENU ITEMS
  // =====================================================

  const addMenuItem = (el: HTMLLIElement | null) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el);
    }
  };

  // =====================================================
  // HEADER ENTRANCE
  // =====================================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(headerRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          logoRef.current,
          {
            x: -30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          navRef.current,
          {
            y: -20,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .from(
          quoteRef.current,
          {
            x: 30,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.35"
        );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // =====================================================
  // LOCK BODY SCROLL WHEN MENU IS OPEN
  // =====================================================

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // =====================================================
  // ESCAPE KEY
  // =====================================================

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // =====================================================
  // MOBILE MENU ANIMATION
  // =====================================================

  useEffect(() => {
    const drawer = drawerRef.current;

    if (!drawer) return;

    const items = menuItemsRef.current;

    // Kill previous animations
    gsap.killTweensOf([
      drawer,
      ...items,
      drawerQuoteRef.current,
      line1Ref.current,
      line2Ref.current,
      line3Ref.current,
    ]);

    if (menuOpen) {
      // ================================================
      // OPEN DRAWER
      // ================================================

      gsap.set(drawer, {
        display: "block",
        y: "100%",
      });

      gsap.to(drawer, {
        y: "0%",
        duration: 0.65,
        ease: "power4.out",
      });

      // ================================================
      // MENU ITEMS
      // ================================================

      gsap.fromTo(
        items,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.2,
          ease: "power3.out",
        }
      );

      // ================================================
      // CTA
      // ================================================

      if (drawerQuoteRef.current) {
        gsap.fromTo(
          drawerQuoteRef.current,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.5,
            ease: "power3.out",
          }
        );
      }

      // ================================================
      // MENU ICON → X
      // ================================================

      gsap.to(line1Ref.current, {
        rotate: 45,
        y: 6,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(line2Ref.current, {
        opacity: 0,
        duration: 0.2,
      });

      gsap.to(line3Ref.current, {
        rotate: -45,
        y: -6,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      // ================================================
      // CLOSE DRAWER
      // ================================================

      gsap.to(drawer, {
        y: "100%",
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(drawer, {
            display: "none",
          });
        },
      });

      // Reset items

      gsap.set(items, {
        y: 30,
        opacity: 0,
      });

      if (drawerQuoteRef.current) {
        gsap.set(drawerQuoteRef.current, {
          y: 20,
          opacity: 0,
        });
      }

      // ================================================
      // X → MENU
      // ================================================

      gsap.to(line1Ref.current, {
        rotate: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(line2Ref.current, {
        opacity: 1,
        duration: 0.2,
      });

      gsap.to(line3Ref.current, {
        rotate: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <header
        ref={headerRef}
        className="
          fixed
          left-0
          top-0
          z-[80]

          h-20
          w-full

          border-b
          border-dashed
          border-gray-400

          bg-background/95
          backdrop-blur-md
        "
      >
        <div
          className="
            mx-auto
            flex
            h-full
            w-full
            items-center
            justify-between
          "
        >
          {/* =================================================
              LOGO
          ================================================= */}

          <div
            ref={logoRef}
            className="
              flex
              h-full

              w-auto
              min-w-0
              shrink-0

              items-center
              justify-center

              px-4
              sm:px-6
              md:w-[20%]

              border-r
              border-dashed
              border-gray-400
            "
          >
            <Link
              href="/"
              aria-label="Go to home"
              className="flex items-center"
            >
              <Image
                src="/logo.png"
                alt="NexGenByte Logo"
                width={150}
                height={50}
                priority
                className="
                  h-auto
                  w-[100px]
                  xs:w-[110px]
                  sm:w-[125px]
                  md:w-[140px]
                  lg:w-[150px]
                "
              />
            </Link>
          </div>

          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <nav
            ref={navRef}
            className="
              hidden
              md:block
            "
          >
            <ul
              className="
                flex
                items-center
                justify-center
                gap-6

                font-space-grotesk
                text-base

                lg:gap-10
                lg:text-lg

                xl:text-xl
              "
            >
              <li>
                <Link
                  href="/"
                  className="
                    transition-colors
                    duration-300
                    hover:text-secondary
                  "
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/#about"
                  className="
                    transition-colors
                    duration-300
                    hover:text-secondary
                  "
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/#services"
                  className="
                    transition-colors
                    duration-300
                    hover:text-secondary
                  "
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="
                    transition-colors
                    duration-300
                    hover:text-secondary
                  "
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* =================================================
              DESKTOP CTA
          ================================================= */}

          <div
            ref={quoteRef}
            className="
              hidden
              h-full

              w-[25%]
              shrink-0

              items-center
              justify-center

              border-l
              border-dashed
              border-gray-400

              md:flex
              lg:w-[20%]
            "
          >
            <Link
              href="/contact"
              className="
                flex
                h-[52px]

                w-[80%]
                max-w-[180px]

                items-center
                justify-center

                rounded-full

                bg-text
                text-background

                font-space-grotesk
                text-sm

                transition-transform
                duration-300

                hover:scale-105

                lg:text-base
              "
            >
              Get Quote
            </Link>
          </div>

          {/* =================================================
              MODERN MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              relative
              mr-3
              flex

              h-11
              min-w-[88px]

              shrink-0

              items-center
              justify-center
              gap-2

              rounded-full

              border
              border-text/20

              bg-background/80

              px-3

              font-space-grotesk
              text-xs
              font-medium
              text-text

              backdrop-blur-md

              transition-all
              duration-300

              active:scale-95

              sm:mr-5
              sm:min-w-[96px]
              sm:text-sm

              md:hidden
            "
            aria-label={
              menuOpen ? "Close navigation" : "Open navigation"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {/* TEXT */}

            <span
              className="
                relative
                h-5
                w-[38px]
                overflow-hidden
              "
            >
              <span
                className={`
                  absolute
                  left-0
                  top-0
                  w-full

                  transition-transform
                  duration-300

                  ${
                    menuOpen
                      ? "-translate-y-5"
                      : "translate-y-0"
                  }
                `}
              >
                Menu
              </span>

              <span
                className={`
                  absolute
                  left-0
                  top-5
                  w-full

                  transition-transform
                  duration-300

                  ${
                    menuOpen
                      ? "-translate-y-5"
                      : "translate-y-0"
                  }
                `}
              >
                Close
              </span>
            </span>

            {/* ICON */}

            <span
              className="
                relative
                flex
                h-4
                w-5
                items-center
                justify-center
              "
            >
              <span
                ref={line1Ref}
                className="
                  absolute
                  left-0

                  h-[1.5px]
                  w-5

                  rounded-full
                  bg-current
                "
              />

              <span
                ref={line2Ref}
                className="
                  absolute
                  left-0

                  h-[1.5px]
                  w-5

                  rounded-full
                  bg-current
                "
              />

              <span
                ref={line3Ref}
                className="
                  absolute
                  left-0

                  h-[1.5px]
                  w-5

                  rounded-full
                  bg-current
                "
              />
            </span>
          </button>
        </div>
      </header>

      {/* =====================================================
          FULL SCREEN MOBILE MENU
      ===================================================== */}

      <div
        ref={drawerRef}
        id="mobile-navigation"
        className="
          fixed
          inset-0

          z-[70]

          hidden

          h-[100dvh]
          min-h-[100svh]
          w-full

          overflow-y-auto
          overscroll-contain

          bg-background

          md:hidden
        "
      >
        {/* =================================================
            DRAWER HEADER
        ================================================= */}

        <div
          className="
            flex
            h-20
            w-full

            items-center
            justify-between

            border-b
            border-dashed
            border-gray-400

            px-5
            sm:px-8
          "
        >
          {/* LOGO */}

          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Go to home"
            className="flex items-center"
          >
            <Image
              src="/logo.png"
              alt="NexGenByte Logo"
              width={140}
              height={45}
              className="
                h-auto
                w-[105px]
                sm:w-[125px]
              "
            />
          </Link>

          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={closeMenu}
            className="
              flex
              h-11
              w-11

              items-center
              justify-center

              rounded-full

              border
              border-text/20

              text-text

              transition-all
              duration-300

              hover:border-secondary
              hover:bg-secondary
              hover:text-white

              active:scale-90
            "
            aria-label="Close menu"
          >
            <span
              className="
                relative
                block
                h-5
                w-5
              "
            >
              <span
                className="
                  absolute
                  left-1/2
                  top-1/2

                  h-[1.5px]
                  w-5

                  -translate-x-1/2
                  -translate-y-1/2
                  rotate-45

                  rounded-full
                  bg-current
                "
              />

              <span
                className="
                  absolute
                  left-1/2
                  top-1/2

                  h-[1.5px]
                  w-5

                  -translate-x-1/2
                  -translate-y-1/2
                  -rotate-45

                  rounded-full
                  bg-current
                "
              />
            </span>
          </button>
        </div>

        {/* =================================================
            MOBILE NAVIGATION
        ================================================= */}

        <nav
          className="
            flex
            min-h-[calc(100dvh-80px)]

            flex-col

            px-6
            py-10

            sm:px-10
            sm:py-14
          "
        >
          <ul
            className="
              flex
              flex-col

              gap-2

              font-space-grotesk
            "
          >
            {/* HOME */}

            <li ref={addMenuItem}>
              <Link
                href="/"
                onClick={closeMenu}
                className="
                  group

                  flex
                  items-center
                  justify-between

                  border-b
                  border-text/10

                  py-5

                  text-3xl
                  font-medium
                  text-text

                  transition-colors
                  duration-300

                  hover:text-secondary

                  sm:py-6
                  sm:text-4xl
                "
              >
                <span>Home</span>

                <span
                  className="
                    text-xl
                    text-text/30

                    transition-transform
                    duration-300

                    group-hover:translate-x-2
                    group-hover:text-secondary

                    sm:text-2xl
                  "
                >
                  ↗
                </span>
              </Link>
            </li>

            {/* ABOUT */}

            <li ref={addMenuItem}>
              <Link
                href="/#about"
                onClick={closeMenu}
                className="
                  group

                  flex
                  items-center
                  justify-between

                  border-b
                  border-text/10

                  py-5

                  text-3xl
                  font-medium
                  text-text

                  transition-colors
                  duration-300

                  hover:text-secondary

                  sm:py-6
                  sm:text-4xl
                "
              >
                <span>About</span>

                <span
                  className="
                    text-xl
                    text-text/30

                    transition-transform
                    duration-300

                    group-hover:translate-x-2
                    group-hover:text-secondary

                    sm:text-2xl
                  "
                >
                  ↗
                </span>
              </Link>
            </li>

            {/* SERVICES */}

            <li ref={addMenuItem}>
              <Link
                href="/#services"
                onClick={closeMenu}
                className="
                  group

                  flex
                  items-center
                  justify-between

                  border-b
                  border-text/10

                  py-5

                  text-3xl
                  font-medium
                  text-text

                  transition-colors
                  duration-300

                  hover:text-secondary

                  sm:py-6
                  sm:text-4xl
                "
              >
                <span>Services</span>

                <span
                  className="
                    text-xl
                    text-text/30

                    transition-transform
                    duration-300

                    group-hover:translate-x-2
                    group-hover:text-secondary

                    sm:text-2xl
                  "
                >
                  ↗
                </span>
              </Link>
            </li>

            {/* CONTACT */}

            <li ref={addMenuItem}>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="
                  group

                  flex
                  items-center
                  justify-between

                  border-b
                  border-text/10

                  py-5

                  text-3xl
                  font-medium
                  text-text

                  transition-colors
                  duration-300

                  hover:text-secondary

                  sm:py-6
                  sm:text-4xl
                "
              >
                <span>Contact</span>

                <span
                  className="
                    text-xl
                    text-text/30

                    transition-transform
                    duration-300

                    group-hover:translate-x-2
                    group-hover:text-secondary

                    sm:text-2xl
                  "
                >
                  ↗
                </span>
              </Link>
            </li>

            {/* CTA */}

            <li
              ref={drawerQuoteRef}
              className="pt-8 sm:pt-10"
            >
              <Link
                href="/contact"
                onClick={closeMenu}
                className="
                  flex
                  w-full

                  items-center
                  justify-center

                  rounded-full

                  bg-text
                  py-4

                  font-space-grotesk
                  text-base
                  text-background

                  transition-transform
                  duration-300

                  hover:scale-[1.02]

                  sm:py-5
                  sm:text-lg
                "
              >
                Get Quote
              </Link>
            </li>
          </ul>

          {/* =================================================
              BOTTOM MESSAGE
          ================================================= */}

          <div
            className="
              mt-auto
              pt-12
            "
          >
            <p
              className="
                font-space-grotesk
                text-sm
                leading-relaxed
                text-text-secondary/60

                sm:text-base
              "
            >
              Let&apos;s build something
              <br />
              that grows your business.
            </p>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;