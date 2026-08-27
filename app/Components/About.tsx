import Link from "next/link";

const principles = [
  {
    number: "01",
    title: "Clarity before decoration",
    description:
      "Every page starts with a clear message and a frictionless path to action.",
  },
  {
    number: "02",
    title: "Built for real people",
    description:
      "We shape experiences around how customers actually browse, decide, and buy.",
  },
  {
    number: "03",
    title: "Designed to perform",
    description:
      "Strong visuals matter, but speed, accessibility, and measurable results matter more.",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-text text-background"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full border border-white/[0.04]" />
      <div className="pointer-events-none absolute -right-20 top-40 h-[350px] w-[350px] rounded-full border border-white/[0.04]" />

      <div className="relative mx-auto w-[92vw] max-w-[1200px] py-24 sm:py-32 lg:py-40">

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">

          {/* LEFT */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-secondary" />

              <p className="font-space-grotesk text-xs font-medium uppercase tracking-[0.22em] text-secondary sm:text-sm">
                About NexGenByte
              </p>
            </div>

            <h2
              className="
                mt-7
                max-w-xl
                font-space-grotesk
                text-4xl
                font-bold
                leading-[0.95]
                tracking-tight
                sm:text-5xl
                md:text-6xl
                lg:text-[4.5rem]
              "
            >
              Digital work
              <br />
              <span className="text-white/40">
                with a point of view.
              </span>
            </h2>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-end">

            <p
              className="
                max-w-2xl
                font-space-grotesk
                text-xl
                leading-relaxed
                text-white/80
                sm:text-2xl
                lg:text-[1.65rem]
              "
            >
              We are a web development agency for ambitious businesses
              that want their online presence to feel as capable as the
              work behind it.
            </p>

            <p
              className="
                mt-7
                max-w-xl
                font-space-grotesk
                text-base
                leading-relaxed
                text-white/45
              "
            >
              From first idea to final launch, we combine strategy,
              design, and dependable engineering to create websites
              that earn attention and turn it into momentum.
            </p>

            <Link
              href="/contact"
              className="
                group
                mt-9
                inline-flex
                w-fit
                items-center
                gap-4
                border-b
                border-secondary/60
                pb-2.5
                font-space-grotesk
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:border-secondary
                hover:text-secondary
              "
            >
              Start a conversation

              <span
                aria-hidden="true"
                className="
                  inline-block
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </Link>
          </div>
        </div>

        {/* =====================================================
            PRINCIPLES
        ===================================================== */}

        <div className="mt-20 border-t border-white/10 sm:mt-28">

          <div className="grid sm:grid-cols-3">

            {principles.map((principle, index) => (
              <div
                key={principle.number}
                className={`
                  group
                  relative
                  border-b
                  border-white/10
                  py-8
                  transition-all
                  duration-300
                  sm:border-b-0
                  sm:px-7
                  sm:py-9
                  ${
                    index !== principles.length - 1
                      ? "sm:border-r sm:border-white/10"
                      : ""
                  }
                  ${index === 0 ? "sm:pl-0" : ""}
                  ${index === principles.length - 1 ? "sm:pr-0" : ""}
                `}
              >

                {/* Number */}
                <div className="flex items-center justify-between">
                  <span
                    className="
                      font-space-grotesk
                      text-xs
                      font-medium
                      tracking-widest
                      text-secondary
                    "
                  >
                    {principle.number}
                  </span>

                  <span
                    className="
                      text-xl
                      text-white/10
                      transition-all
                      duration-300
                      group-hover:translate-x-1
                      group-hover:text-secondary
                    "
                  >
                    →
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="
                    mt-10
                    max-w-xs
                    font-space-grotesk
                    text-lg
                    font-semibold
                    leading-snug
                    text-white
                    transition-colors
                    duration-300
                    group-hover:text-secondary
                    sm:text-xl
                  "
                >
                  {principle.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-4
                    max-w-xs
                    font-space-grotesk
                    text-sm
                    leading-7
                    text-white/45
                  "
                >
                  {principle.description}
                </p>

                {/* Bottom hover line */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-px
                    w-0
                    bg-secondary
                    transition-all
                    duration-500
                    group-hover:w-full
                    sm:hidden
                  "
                />
              </div>
            ))}

          </div>
        </div>

        {/* =====================================================
            BOTTOM STATEMENT
        ===================================================== */}

        <div
          className="
            mt-20
            border-t
            border-white/10
            pt-8
            sm:mt-24
            sm:flex
            sm:items-center
            sm:justify-between
          "
        >
          <p className="max-w-md font-space-grotesk text-sm leading-6 text-white/35">
            Strategy, design and engineering working together to
            create digital experiences built for growth.
          </p>

          <div className="mt-6 flex items-center gap-3 sm:mt-0">
            <span className="h-2 w-2 rounded-full bg-secondary" />

            <span className="font-space-grotesk text-xs uppercase tracking-[0.2em] text-white/40">
              Built for growth
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;