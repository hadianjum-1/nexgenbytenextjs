import Link from "next/link";

const principles = [
  {
    number: "01",
    title: "Clarity before decoration",
    description: "Every page starts with a clear message and a frictionless path to action.",
  },
  {
    number: "02",
    title: "Built for real people",
    description: "We shape experiences around how customers actually browse, decide, and buy.",
  },
  {
    number: "03",
    title: "Designed to perform",
    description: "Strong visuals matter, but speed, accessibility, and measurable results matter more.",
  },
];

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-text text-background">
      <div className="mx-auto w-[92vw] max-w-[1200px] py-24 sm:py-32 lg:py-40">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <p className="font-space-grotesk text-sm font-medium uppercase tracking-[0.2em] text-secondary">
              About NexGenByte
            </p>
            <h2 className="mt-6 max-w-xl font-space-grotesk text-4xl font-bold leading-[0.98] sm:text-5xl md:text-6xl">
              Digital work with a point of view.
            </h2>
          </div>

          <div>
            <p className="max-w-2xl font-space-grotesk text-xl leading-relaxed text-white/75 sm:text-2xl">
              We are a web development agency for ambitious businesses that want their online presence to feel as capable as the work behind it.
            </p>
            <p className="mt-6 max-w-xl font-space-grotesk text-base leading-relaxed text-white/50">
              From first idea to final launch, we combine strategy, design, and dependable engineering to create websites that earn attention and turn it into momentum.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 border-b border-secondary pb-2 font-space-grotesk text-sm font-medium text-white transition-colors hover:text-secondary"
            >
              Start a conversation <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid border-t border-white/15 sm:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle.number} className="border-b border-white/15 py-7 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0">
              <span className="font-space-grotesk text-sm text-secondary">{principle.number}</span>
              <h3 className="mt-8 font-space-grotesk text-xl font-semibold text-white">{principle.title}</h3>
              <p className="mt-3 max-w-xs font-space-grotesk text-sm leading-relaxed text-white/50">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
