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
  const overlayRef = useRef<HTMLDivElement>(null);

  const menuItemsRef = useRef<HTMLLIElement[]>([]);
  const drawerQuoteRef = useRef<HTMLLIElement>(null);

  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);

  // Store menu items safely
  const addMenuItem = (el: HTMLLIElement | null) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el);
    }
  };

  // =========================
  // HEADER ENTRANCE ANIMATION
  // =========================
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(headerRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          logoRef.current,
          {
            x: -40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          navRef.current,
          {
            y: -20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          quoteRef.current,
          {
            x: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // =========================
  // MOBILE DRAWER ANIMATION
  // =========================
  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    const drawer = drawerRef.current;
    const overlay = overlayRef.current;

    const ctx = gsap.context(() => {
      if (menuOpen) {
        // Overlay
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          pointerEvents: "auto",
        });

        // Drawer
        gsap.to(drawer, {
          x: "0%",
          duration: 0.6,
          ease: "power4.out",
        });

        // Menu items
        gsap.fromTo(
          menuItemsRef.current,
          {
            x: 40,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.08,
            delay: 0.2,
            ease: "power3.out",
          }
        );

        // Quote button
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
              duration: 0.45,
              delay: 0.5,
              ease: "power3.out",
            }
          );
        }

        // Hamburger -> X
        gsap.to(line1Ref.current, {
          rotate: 45,
          y: 7,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(line2Ref.current, {
          opacity: 0,
          duration: 0.2,
        });

        gsap.to(line3Ref.current, {
          rotate: -45,
          y: -7,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Overlay
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          pointerEvents: "none",
        });

        // Drawer
        gsap.to(drawer, {
          x: "100%",
          duration: 0.5,
          ease: "power3.inOut",
        });

        // Reset menu items
        gsap.set(menuItemsRef.current, {
          x: 40,
          opacity: 0,
        });

        // Reset quote
        if (drawerQuoteRef.current) {
          gsap.set(drawerQuoteRef.current, {
            y: 20,
            opacity: 0,
          });
        }

        // X -> Hamburger
        gsap.to(line1Ref.current, {
          rotate: 0,
          y: 0,
          duration: 0.3,
        });

        gsap.to(line2Ref.current, {
          opacity: 1,
          duration: 0.2,
        });

        gsap.to(line3Ref.current, {
          rotate: 0,
          y: 0,
          duration: 0.3,
        });
      }
    }, headerRef);

    return () => ctx.revert();
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* ================= HEADER ================= */}

      <header
  ref={headerRef}
  className="fixed left-1/2 top-0 z-50 min-h-[80px] w-[98vw] -translate-x-1/2 border-b border-dashed border-gray-400 bg-background/95 backdrop-blur-md"
>
  <div className="flex h-[80px] items-center justify-between">

    {/* LOGO */}
    <div
      ref={logoRef}
      className="flex h-full w-[30%] items-center justify-center border-r border-dashed border-gray-400 md:w-[20%] lg:w-[20%]"
    >
      <Link
        href="/"
        aria-label="Go to home"
        className="inline-flex"
      >
        <Image
          src="/logo.png"
          alt="NexGenByte Logo"
          width={150}
          height={50}
          priority
          className="h-auto w-[120px] md:w-[140px] lg:w-[150px]"
        />
      </Link>
    </div>

    {/* DESKTOP NAV */}
    <nav ref={navRef} className="hidden md:block">
      <ul className="flex items-center justify-center gap-6 font-space-grotesk text-base lg:gap-10 lg:text-xl">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-secondary"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/#about"
            className="transition-colors hover:text-secondary"
          >
            About
          </Link>
        </li>

        <li>
          <Link
            href="/#services"
            className="transition-colors hover:text-secondary"
          >
            Services
          </Link>
        </li>

        <li>
          <Link
            href="/contact"
            className="transition-colors hover:text-secondary"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>

    {/* CTA */}
    <div
      ref={quoteRef}
      className="hidden h-full w-[25%] items-center justify-center border-l border-dashed border-gray-400 md:flex lg:w-[20%]"
    >
      <Link
        href="/contact"
        className="flex h-[55px] w-[80%] max-w-[180px] items-center justify-center rounded-full bg-text text-base text-background transition-transform hover:scale-105 lg:text-lg"
      >
        Get Quote
      </Link>
    </div>

    {/* MOBILE MENU */}
    <button
      type="button"
      onClick={() => setMenuOpen((prev) => !prev)}
      className="relative z-[70] mr-5 flex h-10 w-10 flex-col items-center justify-center md:hidden"
      aria-label={menuOpen ? "Close navigation" : "Open navigation"}
      aria-expanded={menuOpen}
    >
      <span
        ref={line1Ref}
        className="absolute block h-0.5 w-6 bg-text"
      />

      <span
        ref={line2Ref}
        className="absolute block h-0.5 w-6 bg-text"
      />

      <span
        ref={line3Ref}
        className="absolute block h-0.5 w-6 bg-text"
      />
    </button>

  </div>
</header>

      {/* ================= OVERLAY ================= */}

      <div
        ref={overlayRef}
        onClick={closeMenu}
        className="pointer-events-none fixed inset-0 z-[55] bg-black/40 opacity-0 backdrop-blur-sm md:hidden"
      />

      {/* ================= RIGHT SIDE DRAWER ================= */}

      <div
        ref={drawerRef}
        className="fixed right-0 top-0 z-[60] h-screen w-[85%] translate-x-full bg-background shadow-2xl sm:w-[400px] md:hidden"
      >
        {/* Drawer Header */}

        <div className="flex h-[80px] items-center justify-between border-b border-dashed border-gray-400 px-6">

          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Go to home"
            className="inline-flex"
          >
            <Image
              src="/logo.png"
              alt="NexGenByte Logo"
              width={130}
              height={45}
              className="h-auto w-[120px]"
            />
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            className="font-space-grotesk text-3xl transition-colors hover:text-secondary"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Drawer Navigation */}

        <nav className="px-8 py-12">
          <ul className="flex flex-col gap-7 font-space-grotesk text-2xl">

            <li ref={addMenuItem}>
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center justify-between transition-colors hover:text-secondary"
              >
                Home
                <span>→</span>
              </Link>
            </li>

            <li ref={addMenuItem}>
              <Link
                href="/#about"
                onClick={closeMenu}
                className="flex items-center justify-between transition-colors hover:text-secondary"
              >
                About
                <span>→</span>
              </Link>
            </li>

            <li ref={addMenuItem}>
              <Link
                href="/#services"
                onClick={closeMenu}
                className="flex items-center justify-between transition-colors hover:text-secondary"
              >
                Services
                <span>→</span>
              </Link>
            </li>

            <li ref={addMenuItem}>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex items-center justify-between transition-colors hover:text-secondary"
              >
                Contact
                <span>→</span>
              </Link>
            </li>

            <li
              ref={drawerQuoteRef}
              className="pt-5"
            >
              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex w-full items-center justify-center rounded-full bg-text py-4 text-lg text-background transition-transform hover:scale-[1.02]"
              >
                Get Quote
              </Link>
            </li>

          </ul>
        </nav>

        {/* Drawer Bottom */}

        <div className="absolute bottom-8 left-8 right-8">
          <p className="font-space-grotesk text-sm text-text-secondary/60">
            Let's build something
            <br />
            that grows your business.
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;