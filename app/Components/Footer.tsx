import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-text text-white">

      {/* ================= NEWSLETTER ================= */}
      <div className="w-[90%] max-w-[1100px] mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Newsletter Text */}
        <div>
          <h2 className="font-space-grotesk text-2xl md:text-3xl font-semibold leading-tight max-w-[500px]">
            Get the latest tips for social media growth and marketing
            straight to your inbox!
          </h2>
        </div>

        {/* Newsletter Form */}
        <div className="flex items-end">
          <form className="w-full flex items-center border-b border-white/30 pb-4">

            <input
              type="email"
              placeholder="john@example.com"
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/90 font-space-grotesk text-lg"
            />

            <button
              type="submit"
              className="text-sm font-space-grotesk hover:text-secondary transition-colors"
            >
              Subscribe Now
              <span className="ml-2">➤</span>
            </button>

          </form>
        </div>

      </div>


      {/* ================= LINKS ================= */}
      <div className="w-[90%] max-w-[1100px] mx-auto py-12 grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/10">

        {/* Site Map */}
        <div>
          <h3 className="text-lg font-semibold mb-6 font-space-grotesk">
            Site Map
          </h3>

          <ul className="space-y-3 text-sm text-white/80 font-space-grotesk">
            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Home
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Services
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Pricing
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Blogs
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Projects
              </a>
            </li>
          </ul>
        </div>


        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-6 font-space-grotesk">
            Support
          </h3>

          <ul className="space-y-3 text-sm text-white/80 font-space-grotesk">
            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Contact Us
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                About Us
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Team Member
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Login Now
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Register Now
              </a>
            </li>
          </ul>
        </div>


        {/* Utilities */}
        <div>
          <h3 className="text-lg font-semibold mb-6 font-space-grotesk">
            Utilities
          </h3>

          <ul className="space-y-3 text-sm text-white/80 font-space-grotesk">
            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Licensing
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Style Guide
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Changelog
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Instructions
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                404 Not Found
              </a>
            </li>
          </ul>
        </div>


        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-6 font-space-grotesk">
            Contact Us
          </h3>

          <ul className="space-y-4 text-sm text-white/80 font-space-grotesk">

            <li className="flex gap-3">
              <span>☎</span>
              <a
                href="tel:+923159711237"
                className="hover:text-secondary transition-colors"
              >
                +92 315 9711237
              </a>
            </li>

            <li className="flex gap-3">
              <span>✉</span>

              <a
                href="mailto:contact@nexgenbyte.com"
                className="hover:text-secondary transition-colors"
              >
                Contact@nexgenbyte.com
              </a>
            </li>

            <li className="flex gap-3">
              <span>⌖</span>

              <span>
                Peshawar, KPK
                <br />
                Pakistan
              </span>
            </li>

          </ul>
        </div>

      </div>


      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-white/20">

        <div className="w-[90%] max-w-[1100px] mx-auto py-8 flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Credits */}
          <div className="text-sm font-space-grotesk text-white/80">
            Designed & Developed by{" "}
            <span className="text-secondary">
              Nexgenbyte
            </span>
          </div>


          {/* Socials */}
          <div className="flex items-center gap-5">

            <span className="font-space-grotesk font-semibold">
              Follow Us
            </span>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/people/Nexgenbyte/61586008494111/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-secondary transition-colors"
            >
              f
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/nexgenbyte1/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-secondary transition-colors"
            >
              ◎
            </a>

            {/* X */}
            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="hover:text-secondary transition-colors"
            >
              𝕏
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/nexgenbyte/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BClEAM4%2BlQ1yig39joAb3cg%3D%3D"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-secondary transition-colors"
            >
              in
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-secondary transition-colors"
            >
              Git
            </a>

          </div>

        </div>


        {/* ================= HUGE LOGO ================= */}
        <div className="w-full overflow-hidden opacity-25">

          <Image
            src="/footerlogo.png"
            alt="Agency Logo"
            width={1400}
            height={300}
            quality={100}
            className="w-full h-auto object-contain"
          />

        </div>

      </div>

    </footer>
  );
};

export default Footer;