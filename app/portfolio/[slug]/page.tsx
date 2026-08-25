import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/app/data/Projects";
import Header from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({
  params,
}: PageProps) {

  const { slug } = await params;

  const project = projects.find(
    (project) => project.slug === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="bg-background text-text">

      {/* =================================
          HERO
      ================================= */}

      <section className="w-[calc(100%-32px)] sm:w-[94vw] mx-auto pt-24 sm:pt-32">

        <div className="max-w-[1100px] mx-auto">

          <p className="font-space-grotesk text-secondary text-sm uppercase tracking-[0.2em]">
            {project.category}
          </p>

          <h1
            className="
              font-space-grotesk
              font-bold
              text-5xl
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
              leading-[0.95]
              tracking-tight
              mt-5
            "
          >
            {project.title}
          </h1>

          <p
            className="
              font-space-grotesk
              text-text-secondary/70
              text-base
              sm:text-lg
              md:text-xl
              max-w-2xl
              leading-relaxed
              mt-7
            "
          >
            {project.shortDescription}
          </p>

        </div>


        {/* Project Image */}

        <div
          className="
            relative
            w-full
            max-w-[1300px]
            mx-auto
            aspect-[16/9]
            mt-14
            sm:mt-20
            overflow-hidden
            rounded-2xl
            sm:rounded-3xl
          "
        >

          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />

        </div>

      </section>


      {/* =================================
          PROBLEM
      ================================= */}

      <section className="w-[calc(100%-32px)] sm:w-[90vw] max-w-[1100px] mx-auto py-24 sm:py-32">

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 md:gap-16">

          <div>
            <span className="font-space-grotesk text-secondary text-sm uppercase tracking-widest">
              01
            </span>

            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold mt-3">
              The Problem
            </h2>
          </div>


          <div>

            <p
              className="
                font-space-grotesk
                text-lg
                sm:text-xl
                md:text-2xl
                text-text-secondary/70
                leading-relaxed
              "
            >
              {project.problem}
            </p>

          </div>

        </div>

      </section>


      {/* =================================
          STRATEGY
      ================================= */}

      <section className="bg-text text-background">

        <div
          className="
            w-[calc(100%-32px)]
            sm:w-[90vw]
            max-w-[1100px]
            mx-auto
            py-24
            sm:py-32
          "
        >

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 md:gap-16">

            <div>

              <span className="font-space-grotesk text-secondary text-sm uppercase tracking-widest">
                02
              </span>

              <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold mt-3">
                Our Strategy
              </h2>

            </div>


            <div>

              <div className="space-y-0">

                {project.strategy.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="
                        flex
                        gap-5
                        py-6
                        border-b
                        border-white/10
                      "
                    >

                      <span className="font-space-grotesk text-white/30">
                        0{index + 1}
                      </span>

                      <p className="font-space-grotesk text-base sm:text-lg text-white/70">
                        {item}
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================
          SOLUTION
      ================================= */}

      <section className="w-[calc(100%-32px)] sm:w-[90vw] max-w-[1100px] mx-auto py-24 sm:py-32">

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 md:gap-16">

          <div>

            <span className="font-space-grotesk text-secondary text-sm uppercase tracking-widest">
              03
            </span>

            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold mt-3">
              What We Built
            </h2>

          </div>


          <p
            className="
              font-space-grotesk
              text-lg
              sm:text-xl
              md:text-2xl
              text-text-secondary/70
              leading-relaxed
            "
          >
            {project.solution}
          </p>

        </div>

      </section>


      {/* =================================
          RESULTS
      ================================= */}

      <section className="bg-background border-y border-black/10">

        <div
          className="
            w-[calc(100%-32px)]
            sm:w-[90vw]
            max-w-[1100px]
            mx-auto
            py-24
            sm:py-32
          "
        >

          <div className="mb-14">

            <span className="font-space-grotesk text-secondary text-sm uppercase tracking-widest">
              04
            </span>

            <h2 className="font-space-grotesk text-4xl sm:text-5xl md:text-6xl font-bold mt-3">
              The Results
            </h2>

          </div>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            {project.results.map(
              (result, index) => (

                <div
                  key={index}
                  className="
                    border
                    border-black/10
                    rounded-2xl
                    p-5
                    sm:p-7
                  "
                >

                  <div
                    className="
                      font-space-grotesk
                      text-3xl
                      sm:text-4xl
                      md:text-5xl
                      font-bold
                      text-secondary
                    "
                  >
                    {result.value}
                  </div>

                  <p
                    className="
                      font-space-grotesk
                      text-xs
                      sm:text-sm
                      text-text-secondary/60
                      mt-3
                    "
                  >
                    {result.label}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </section>


      {/* =================================
          TESTIMONIAL
      ================================= */}

      <section className="bg-text text-background">

        <div
          className="
            w-[calc(100%-32px)]
            sm:w-[90vw]
            max-w-[1000px]
            mx-auto
            py-24
            sm:py-32
            text-center
          "
        >

          <span className="font-space-grotesk text-secondary text-sm uppercase tracking-widest">
            Client Testimonial
          </span>


          <blockquote
            className="
              font-space-grotesk
              text-2xl
              sm:text-3xl
              md:text-5xl
              font-medium
              leading-tight
              mt-8
            "
          >
            "{project.testimonial.quote}"
          </blockquote>


          <div className="mt-10">

            <p className="font-space-grotesk font-semibold">
              {project.testimonial.name}
            </p>

            <p className="font-space-grotesk text-sm text-white/50 mt-1">
              {project.testimonial.role}
            </p>

          </div>

        </div>

      </section>


      {/* =================================
          CTA
      ================================= */}

      <section className="w-[calc(100%-32px)] sm:w-[90vw] max-w-[1100px] mx-auto py-24 sm:py-32">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

          <div>

            <p className="font-space-grotesk text-secondary text-sm uppercase tracking-widest">
              Have a similar project?
            </p>

            <h2 className="font-space-grotesk text-4xl sm:text-5xl font-bold mt-3">
              Let's build something
              <br className="hidden sm:block" />
              great together.
            </h2>

          </div>


          <Link
            href="/#contact"
            className="
              bg-text
              text-background
              px-7
              py-4
              rounded-full
              font-space-grotesk
              hover:bg-secondary
              transition-colors
            "
          >
            Start a Project â†’
          </Link>

        </div>

      </section>

      </main>

      <Footer />
    </>
  );
}