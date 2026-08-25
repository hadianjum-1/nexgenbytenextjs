"use client";

import React from "react";
import { Star, BadgeCheck } from "lucide-react";

const testimonials = [
  {
    text: "Working with them was a true pleasure. They were responsive, communicative, and always willing to go the extra mile. I especially appreciated their attention to detail.",
    name: "Jordan Walk",
    role: "Software Engineer at Briks",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    text: "Throughout the process, they kept me informed and involved, ensuring I was happy with the direction. I came to them with a vague idea, and they helped me refine it into a concrete plan.",
    name: "Ema Watson",
    role: "Founder at Ritof",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=47",
  },
  {
    text: "Was initially hesitant about the project, but they quickly put my mind at ease. Their expertise and creative solutions were impressive. The final product exceeded my expectations.",
    name: "Jakob Alison",
    role: "Project Manager at Triko",
    rating: 4,
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    text: "They understood our requirements perfectly and transformed our ideas into something much better than we imagined. Communication throughout the project was excellent.",
    name: "Olivia Smith",
    role: "CEO at Ritovex",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=32",
  },
  {
    text: "The entire process was smooth and professional. They listened carefully to our feedback and delivered a website that perfectly represents our brand.",
    name: "Daniel Ross",
    role: "Marketing Director",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=68",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full overflow-hidden bg-white py-16 sm:py-20">

      {/* ================= HEADER ================= */}

      <div className="mx-auto mb-12 max-w-3xl px-5 text-center">

        <span
          className="
            inline-flex
            items-center
            rounded-md
            bg-gray-100
            px-2.5
            py-1
            text-[10px]
            font-medium
            text-gray-700
          "
        >
        <BadgeCheck size={12} strokeWidth={2} />
<span>Testimonial</span>
        </span>

        <h2
          className="
            mt-5
            font-space-grotesk
            text-4xl
            font-bold
            tracking-tight
            text-black
            sm:text-5xl
            lg:text-6xl
          "
        >
          What Our Clients are Saying
        </h2>

        <p
          className="
            mx-auto
            mt-4
            max-w-xl
            font-space-grotesk
            text-sm
            leading-relaxed
            text-gray-500
            sm:text-base
          "
        >
          Hear directly from our clients about their experiences and
          the results we&apos;ve delivered. Explore Client Feedback.
        </p>

      </div>


      {/* ================= SLIDER ================= */}

      <div
        className="
          relative
          w-full
          overflow-hidden
        "
      >

        {/* LEFT FADE */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            h-full
            w-16
            bg-gradient-to-r
            from-white
            to-transparent
            sm:w-24
          "
        />

        {/* RIGHT FADE */}

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-10
            h-full
            w-16
            bg-gradient-to-l
            from-white
            to-transparent
            sm:w-24
          "
        />


        {/* TRACK */}

        <div
          className="
            flex
            w-max
            gap-5
            animate-testimonial-scroll
            hover:[animation-play-state:paused]
          "
        >

          {/* FIRST SET */}

          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`first-${index}`}
              testimonial={testimonial}
            />
          ))}

          {/* DUPLICATE SET FOR INFINITE LOOP */}

          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`second-${index}`}
              testimonial={testimonial}
            />
          ))}

        </div>

      </div>


      {/* ================= ANIMATION ================= */}

      

    </section>
  );
};


/* =====================================================
   TESTIMONIAL CARD
===================================================== */

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: {
    text: string;
    name: string;
    role: string;
    rating: number;
    image: string;
  };
}) => {
  return (
    <article
      className="
        group
        flex
        h-[245px]
        w-[320px]
        flex-shrink-0
        flex-col
        justify-between
        rounded-2xl
        bg-[#f7f7fa]
        p-6
        transition-transform
        duration-300
        hover:-translate-y-1
        sm:h-[250px]
        sm:w-[365px]
        sm:p-7
        lg:w-[390px]
      "
    >

      {/* ================= RATING ================= */}

      <div>

        <div className="mb-3 flex gap-1">

        {[1, 2, 3, 4, 5].map((star) => (
  <Star
    key={star}
    size={15}
    strokeWidth={1.8}
    className={
      star <= testimonial.rating
        ? "fill-black text-black"
        : "fill-gray-200 text-gray-300"
    }
  />
))}

        </div>


        {/* TEXT */}

        <p
          className="
            font-space-grotesk
            text-sm
            leading-[1.55]
            text-gray-800
            sm:text-[15px]
          "
        >
          {testimonial.text}
        </p>

      </div>


      {/* ================= USER ================= */}

      <div>

        <div className="mb-4 border-t border-dashed border-gray-300" />

        <div className="flex items-center gap-3">

          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="
              h-11
              w-11
              rounded-full
              object-cover
              ring-2
              ring-white
            "
          />

          <div>

            <h4
              className="
                font-space-grotesk
                text-sm
                font-semibold
                text-black
              "
            >
              {testimonial.name}
            </h4>

            <p
              className="
                mt-0.5
                font-space-grotesk
                text-[11px]
                text-gray-500
              "
            >
              {testimonial.role}
            </p>

          </div>

        </div>

      </div>

    </article>
  );
};

export default Testimonials;