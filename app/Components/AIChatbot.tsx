"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

/* =====================================================
   ICONS
===================================================== */

function ChatIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 11.5C20 16.194 16.194 20 11.5 20C10.026 20 8.643 19.625 7.438 18.969L4 20L5.031 16.562C4.375 15.357 4 13.974 4 12.5C4 7.806 7.806 4 12.5 4C17.194 4 20 6.806 20 11.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M8 12H8.01M12 12H12.01M16 12H16.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 3L10.5 13.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M21 3L14.5 21L10.5 13.5L3 9.5L21 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =====================================================
   ASSISTANT AVATAR
===================================================== */

function AssistantAvatar() {
  return (
    <div
      className="
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-xl
        bg-text
        text-background
      "
    >
      <ChatIcon size={17} />
    </div>
  );
}

/* =====================================================
   TYPING
===================================================== */

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <AssistantAvatar />

      <div
        className="
          flex
          items-center
          gap-1.5
          rounded-2xl
          rounded-bl-md
          bg-black/[0.045]
          px-4
          py-3.5
        "
      >
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text/40 [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text/40 [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text/40" />
      </div>
    </div>
  );
}

/* =====================================================
   MAIN
===================================================== */

export default function AIChatbot() {
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(false);
  const [ending, setEnding] = useState(false);
  const [error, setError] = useState("");

  const [booking, setBooking] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [appointment, setAppointment] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    service: "Free Strategy Call",
    message: "",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* =====================================================
     AUTO SCROLL
  ===================================================== */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  /* =====================================================
     ESCAPE
  ===================================================== */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  /* =====================================================
     BODY SCROLL
  ===================================================== */

  useEffect(() => {
    if (open && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* =====================================================
     START CHAT
  ===================================================== */

  const startChat = (event: FormEvent) => {
    event.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail) return;

    setEmail(cleanEmail);
    setEmailSubmitted(true);
    setBooking(false);
    setError("");

    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I'm here to help you with your website, SEO, lead generation, ecommerce, automation, or digital growth. What would you like to improve?",
      },
    ]);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  /* =====================================================
     SEND MESSAGE
  ===================================================== */

  const sendMessage = async () => {
    const cleanMessage = message.trim();

    if (!cleanMessage || loading || ending) return;

    const userMessage: Message = {
      role: "user",
      content: cleanMessage,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          messages: updatedMessages,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to process your message."
        );
      }

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: result.reply,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     END CHAT
  ===================================================== */

  const endChat = async () => {
    if (ending || messages.length === 0) return;

    setEnding(true);
    setError("");

    try {
      const response = await fetch("/api/chat/end", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          messages,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to submit conversation."
        );
      }

      setMessages([
        ...messages,
        {
          role: "assistant",
          content:
            "Thanks for reaching out to NexGenByte. We've received your enquiry. Our team will review your conversation and contact you within 24 hours.",
        },
      ]);
    } catch (error) {
      console.error("End chat error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to submit conversation."
      );
    } finally {
      setEnding(false);
    }
  };

  /* =====================================================
     BOOK APPOINTMENT
  ===================================================== */

  const bookAppointment = async (event: FormEvent) => {
    event.preventDefault();

    setBookingLoading(true);
    setError("");

    try {
      const response = await fetch("/api/appointment", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: appointment.name,
          email,
          phone: appointment.phone,
          date: appointment.date,
          time: appointment.time,
          service: appointment.service,
          message: appointment.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to book appointment."
        );
      }

      setBookingSuccess(true);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Your appointment request has been received. We've also sent a confirmation to your email. Our team will contact you within 24 hours to confirm the appointment.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to book appointment."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  /* =====================================================
     CLOSE BOOKING
  ===================================================== */

  const closeBooking = () => {
    setBooking(false);
    setBookingSuccess(false);
    setError("");
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <>
      {/* =================================================
          FLOATING BUTTON
      ================================================= */}

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="
            fixed
            bottom-4
            right-4
            z-[100]
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-text
            text-background
            shadow-[0_12px_35px_rgba(0,0,0,0.22)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:scale-105
            active:scale-95

            sm:bottom-6
            sm:right-6
            sm:h-16
            sm:w-16

            lg:bottom-8
            lg:right-8
          "
        >
          <ChatIcon size={25} />
        </button>
      )}

      {/* =================================================
          CHAT WINDOW
      ================================================= */}
{open && (
  <div
    className="
      fixed
      inset-0
      z-[100]
      flex
      flex-col
      overflow-hidden
      bg-background

      /* MOBILE */
      sm:inset-auto
      sm:bottom-5
      sm:right-5
      sm:h-[min(650px,calc(100vh-40px))]
      sm:w-[390px]
      sm:rounded-[22px]
      sm:border
      sm:border-text/10
      sm:shadow-[0_20px_60px_rgba(0,0,0,0.20)]

      /* DESKTOP */
      lg:bottom-6
      lg:right-6
      lg:h-[620px]
      lg:w-[390px]

      /* LARGE DESKTOP */
      xl:bottom-7
      xl:right-7
      xl:h-[620px]
      xl:w-[400px]
    "
  >
          {/* =================================================
              HEADER
          ================================================= */}

          <header
            className="
              flex
              h-[72px]
              shrink-0
              items-center
              justify-between
              bg-text
              px-4
              text-background
              sm:px-5
              lg:h-[76px]
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-background/10
                "
              >
                <ChatIcon size={21} />
              </div>

              <div>
                <p className="font-space-grotesk text-sm font-semibold">
                  NexGenByte
                </p>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                  <span className="text-[11px] text-background/60">
                    Online assistant
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                text-background/60
                transition
                hover:bg-background/10
                hover:text-background
              "
            >
              <CloseIcon />
            </button>
          </header>

          {/* =================================================
              EMAIL SCREEN
          ================================================= */}

          {!emailSubmitted ? (
            <form
              onSubmit={startChat}
              className="
                flex
                min-h-0
                flex-1
                items-center
                overflow-y-auto
                px-5
                py-8
                sm:px-7
                lg:px-8
              "
            >
              <div className="mx-auto w-full max-w-md">
                <div
                  className="
                    mb-6
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-text
                    text-background
                    shadow-lg
                  "
                >
                  <ChatIcon size={27} />
                </div>

                <h2
                  className="
                    font-space-grotesk
                    text-[27px]
                    font-semibold
                    leading-[1.08]
                    tracking-tight
                    text-text
                    sm:text-3xl
                    lg:text-[32px]
                  "
                >
                  Let's build something better.
                </h2>

                <p
                  className="
                    mt-4
                    max-w-md
                    text-sm
                    leading-6
                    text-text-secondary
                    lg:text-[15px]
                  "
                >
                  Tell us what you're working on and get
                  guidance around websites, SEO, lead
                  generation, ecommerce and digital growth.
                </p>

                <div className="mt-8">
                  <label
                    htmlFor="chat-email"
                    className="
                      mb-2
                      block
                      text-xs
                      font-medium
                      uppercase
                      tracking-wider
                      text-text-secondary
                    "
                  >
                    Your email
                  </label>

                  <input
                    id="chat-email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-text/10
                      bg-black/[0.025]
                      px-4
                      py-3.5
                      text-sm
                      text-text
                      outline-none
                      transition
                      placeholder:text-text-secondary/50
                      focus:border-secondary
                      focus:bg-transparent
                      focus:ring-4
                      focus:ring-secondary/10
                    "
                  />
                </div>

                <button
                  type="submit"
                  className="
                    mt-4
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-text
                    px-5
                    py-3.5
                    text-sm
                    font-medium
                    text-background
                    shadow-lg
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-xl
                  "
                >
                  Start conversation
                  <ArrowIcon />
                </button>

                <p
                  className="
                    mt-4
                    text-center
                    text-[11px]
                    leading-5
                    text-text-secondary/60
                  "
                >
                  Your email helps our team follow up
                  with your enquiry.
                </p>
              </div>
            </form>
          ) : booking ? (
            /* =================================================
               BOOKING SCREEN
            ================================================= */

            <div
              className="
                flex
                min-h-0
                flex-1
                flex-col
                overflow-hidden
              "
            >
              {/* Booking top bar */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  justify-between
                  border-b
                  border-text/10
                  px-5
                  py-4
                  lg:px-6
                "
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-secondary">
                    Free Consultation
                  </p>

                  <h2 className="mt-1 font-space-grotesk text-xl font-semibold">
                    Book a strategy call
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={closeBooking}
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    text-text-secondary
                    transition
                    hover:bg-black/5
                    hover:text-text
                  "
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Booking body */}

              {bookingSuccess ? (
                <div
                  className="
                    flex
                    flex-1
                    flex-col
                    items-center
                    justify-center
                    px-6
                    text-center
                  "
                >
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-text
                      text-background
                    "
                  >
                    ✓
                  </div>

                  <h3 className="mt-5 font-space-grotesk text-2xl font-semibold">
                    Request received
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-text-secondary">
                    Your appointment request has been
                    received. We've also sent a confirmation
                    to your email.
                  </p>

                  <button
                    type="button"
                    onClick={closeBooking}
                    className="
                      mt-6
                      rounded-xl
                      bg-text
                      px-6
                      py-3
                      text-sm
                      font-medium
                      text-background
                    "
                  >
                    Back to conversation
                  </button>
                </div>
              ) : (
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <form
                    onSubmit={bookAppointment}
                    className="
                      space-y-4
                      p-5
                      sm:p-6
                      lg:p-7
                    "
                  >
                    <div>
                      <label className="mb-2 block text-xs font-medium text-text-secondary">
                        Name
                      </label>

                      <input
                        required
                        type="text"
                        placeholder="Your name"
                        value={appointment.name}
                        onChange={(e) =>
                          setAppointment({
                            ...appointment,
                            name: e.target.value,
                          })
                        }
                        className="
                          w-full
                          rounded-xl
                          border
                          border-text/10
                          bg-black/[0.03]
                          px-4
                          py-3
                          text-sm
                          outline-none
                          transition
                          focus:border-secondary
                          focus:ring-4
                          focus:ring-secondary/10
                        "
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium text-text-secondary">
                        Email
                      </label>

                      <input
                        type="email"
                        value={email}
                        disabled
                        className="
                          w-full
                          rounded-xl
                          border
                          border-text/10
                          bg-black/[0.03]
                          px-4
                          py-3
                          text-sm
                          opacity-60
                        "
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium text-text-secondary">
                        Phone
                      </label>

                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={appointment.phone}
                        onChange={(e) =>
                          setAppointment({
                            ...appointment,
                            phone: e.target.value,
                          })
                        }
                        className="
                          w-full
                          rounded-xl
                          border
                          border-text/10
                          bg-black/[0.03]
                          px-4
                          py-3
                          text-sm
                          outline-none
                          focus:border-secondary
                        "
                      />
                    </div>

                    {/* Date + Time */}

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-2 block text-xs font-medium text-text-secondary">
                          Date
                        </label>

                        <input
                          required
                          type="date"
                          value={appointment.date}
                          onChange={(e) =>
                            setAppointment({
                              ...appointment,
                              date: e.target.value,
                            })
                          }
                          className="
                            w-full
                            min-w-0
                            rounded-xl
                            border
                            border-text/10
                            bg-black/[0.03]
                            px-3
                            py-3
                            text-sm
                            outline-none
                            focus:border-secondary
                          "
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-medium text-text-secondary">
                          Time
                        </label>

                        <input
                          required
                          type="time"
                          value={appointment.time}
                          onChange={(e) =>
                            setAppointment({
                              ...appointment,
                              time: e.target.value,
                            })
                          }
                          className="
                            w-full
                            min-w-0
                            rounded-xl
                            border
                            border-text/10
                            bg-black/[0.03]
                            px-3
                            py-3
                            text-sm
                            outline-none
                            focus:border-secondary
                          "
                        />
                      </div>
                    </div>

                    {/* Service */}

                    <div>
                      <label className="mb-2 block text-xs font-medium text-text-secondary">
                        Service
                      </label>

                      <select
                        value={appointment.service}
                        onChange={(e) =>
                          setAppointment({
                            ...appointment,
                            service: e.target.value,
                          })
                        }
                        className="
                          w-full
                          rounded-xl
                          border
                          border-text/10
                          bg-background
                          px-4
                          py-3
                          text-sm
                          outline-none
                          focus:border-secondary
                        "
                      >
                        <option>Free Strategy Call</option>
                        <option>Website Development</option>
                        <option>Website Audit</option>
                        <option>SEO</option>
                        <option>AI Chatbot</option>
                        <option>Automation</option>
                        <option>Ecommerce Development</option>
                        <option>Business Growth System</option>
                        <option>Other</option>
                      </select>
                    </div>

                    {/* Message */}

                    <div>
                      <label className="mb-2 block text-xs font-medium text-text-secondary">
                        Project details
                      </label>

                      <textarea
                        placeholder="Tell us about your project..."
                        value={appointment.message}
                        onChange={(e) =>
                          setAppointment({
                            ...appointment,
                            message: e.target.value,
                          })
                        }
                        rows={4}
                        className="
                          w-full
                          resize-none
                          rounded-xl
                          border
                          border-text/10
                          bg-black/[0.03]
                          px-4
                          py-3
                          text-sm
                          outline-none
                          focus:border-secondary
                        "
                      />
                    </div>

                    {error && (
                      <p className="rounded-xl bg-red-500/5 px-3 py-2 text-sm text-red-500">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        rounded-xl
                        bg-text
                        px-5
                        py-3.5
                        text-sm
                        font-medium
                        text-background
                        transition
                        hover:-translate-y-0.5
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      {bookingLoading
                        ? "Submitting..."
                        : "Request appointment →"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            /* =================================================
               CHAT SCREEN
            ================================================= */

            <div className="flex min-h-0 flex-1 flex-col">
              {/* =================================================
                  MESSAGES
              ================================================= */}

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-y-auto
                  overscroll-contain
                  px-4
                  py-5
                  sm:px-5
                  lg:px-6
                  lg:py-6
                "
              >
                <div className="mx-auto w-full max-w-2xl space-y-5">
                  {messages.map((item, index) => (
                    <div
                      key={`${index}-${item.role}`}
                      className={`
                        flex
                        items-end
                        gap-2
                        ${
                          item.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }
                      `}
                    >
                      {item.role === "assistant" && (
                        <AssistantAvatar />
                      )}

                      <div
                        className={`
                          max-w-[82%]
                          px-4
                          py-3
                          text-[13px]
                          leading-6
                          shadow-sm
                          sm:max-w-[78%]
                          lg:max-w-[76%]

                          ${
                            item.role === "user"
                              ? `
                                rounded-2xl
                                rounded-br-md
                                bg-text
                                text-background
                              `
                              : `
                                rounded-2xl
                                rounded-bl-md
                                bg-black/[0.045]
                                text-text
                              `
                          }
                        `}
                      >
                        {item.content}
                      </div>
                    </div>
                  ))}

                  {loading && <TypingIndicator />}

                  {error && (
                    <div
                      className="
                        rounded-xl
                        border
                        border-red-500/10
                        bg-red-500/5
                        px-3
                        py-2.5
                        text-xs
                        leading-5
                        text-red-500
                      "
                    >
                      {error}
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* =================================================
                  INPUT
              ================================================= */}

              <div
                className="
                  shrink-0
                  border-t
                  border-text/10
                  bg-background
                  px-3
                  pb-[max(12px,env(safe-area-inset-bottom))]
                  pt-3
                  sm:px-4
                  sm:pb-4
                  lg:px-5
                  lg:pb-5
                "
              >
                {/* Booking CTA */}

                <button
                  type="button"
                  onClick={() => {
                    setBooking(true);
                    setError("");
                  }}
                  className="
                    mb-3
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-text/10
                    px-4
                    py-2.5
                    text-xs
                    font-medium
                    transition
                    hover:border-secondary
                    hover:text-secondary
                  "
                >
                  Book a free strategy call
                  <span>→</span>
                </button>

                {/* Input */}

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-text/10
                    bg-black/[0.025]
                    p-1.5
                    transition
                    focus-within:border-secondary
                    focus-within:bg-transparent
                    focus-within:ring-4
                    focus-within:ring-secondary/10
                  "
                >
                  <input
                    ref={inputRef}
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        !e.shiftKey
                      ) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    disabled={loading || ending}
                    placeholder="Type your message..."
                    className="
                      min-w-0
                      flex-1
                      bg-transparent
                      px-3
                      py-2.5
                      text-sm
                      text-text
                      outline-none
                      placeholder:text-text-secondary/50
                      disabled:opacity-50
                    "
                  />

                  <button
                    type="button"
                    onClick={sendMessage}
                    disabled={
                      loading ||
                      ending ||
                      !message.trim()
                    }
                    aria-label="Send message"
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-text
                      text-background
                      transition
                      hover:scale-105
                      active:scale-95
                      disabled:pointer-events-none
                      disabled:opacity-30
                    "
                  >
                    <SendIcon />
                  </button>
                </div>

                {/* Bottom actions */}

                <div className="mt-2 flex items-center justify-between px-1">
                  <span className="text-[10px] text-text-secondary/50">
                    Press Enter to send
                  </span>

                  <button
                    type="button"
                    onClick={endChat}
                    disabled={ending || loading}
                    className="
                      text-[11px]
                      text-text-secondary
                      underline-offset-2
                      transition
                      hover:text-text
                      hover:underline
                      disabled:opacity-40
                    "
                  >
                    {ending
                      ? "Submitting..."
                      : "End conversation"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}