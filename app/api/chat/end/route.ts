import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(value: string = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    // ==========================================
    // CHECK SMTP CONFIGURATION
    // ==========================================

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASSWORD,
      SMTP_FROM,
      CONTACT_EMAIL,
    } = process.env;

    if (
      !SMTP_HOST ||
      !SMTP_PORT ||
      !SMTP_USER ||
      !SMTP_PASSWORD ||
      !SMTP_FROM
    ) {
      console.error("Missing SMTP environment variables:", {
        SMTP_HOST: !!SMTP_HOST,
        SMTP_PORT: !!SMTP_PORT,
        SMTP_USER: !!SMTP_USER,
        SMTP_PASSWORD: !!SMTP_PASSWORD,
        SMTP_FROM: !!SMTP_FROM,
      });

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not properly configured.",
        },
        { status: 500 }
      );
    }

    // ==========================================
    // READ REQUEST
    // ==========================================

    const { email, messages } = await req.json();

    // ==========================================
    // VALIDATE EMAIL
    // ==========================================

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "A valid email is required.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // VALIDATE MESSAGES
    // ==========================================

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Conversation is empty.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // CREATE HOSTINGER SMTP TRANSPORTER
    // ==========================================

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),

      // Hostinger SMTP port 465 uses SSL
      secure: Number(SMTP_PORT) === 465,

      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },

      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
    });

    // ==========================================
    // OPTIONAL SMTP CONNECTION TEST
    // ==========================================

    await transporter.verify();

    // ==========================================
    // CREATE CONVERSATION HTML
    // ==========================================

    const conversationHtml = messages
      .map(
        (message: {
          role: string;
          content: string;
        }) => {
          const isUser = message.role === "user";

          return `
            <div style="
              margin-bottom:16px;
              padding:16px;
              border-radius:12px;
              background:${isUser ? "#111111" : "#f5f5f5"};
              color:${isUser ? "#ffffff" : "#333333"};
            ">

              <div style="
                font-size:11px;
                text-transform:uppercase;
                letter-spacing:1px;
                opacity:.6;
                margin-bottom:6px;
              ">
                ${isUser ? "Visitor" : "NexGenByte AI"}
              </div>

              <div style="
                line-height:1.7;
                white-space:pre-wrap;
              ">
                ${escapeHtml(message.content)}
              </div>

            </div>
          `;
        }
      )
      .join("");

    // ==========================================
    // EMAIL 1
    // SEND CONVERSATION TO NEXGENBYTE
    // ==========================================

    await transporter.sendMail({
      from: `"NexGenByte AI Chatbot" <${SMTP_FROM}>`,

      // Your Hostinger business email
      to: CONTACT_EMAIL || SMTP_USER,

      // Your Gmail CC
      cc: "hadianjum278@gmail.com",

      // Clicking Reply will reply to visitor
      replyTo: email,

      subject: `New AI Chatbot Lead — ${email}`,

      html: `
        <div style="
          background:#f4f4f5;
          padding:40px 20px;
          font-family:Arial,sans-serif;
        ">

          <div style="
            max-width:700px;
            margin:auto;
            background:#ffffff;
            border-radius:18px;
            overflow:hidden;
          ">

            <!-- HEADER -->

            <div style="
              background:#111111;
              color:#ffffff;
              padding:30px;
            ">

              <div style="
                color:#999999;
                font-size:11px;
                letter-spacing:2px;
                text-transform:uppercase;
                margin-bottom:8px;
              ">
                NEXGENBYTE
              </div>

              <h1 style="
                margin:0;
                font-size:26px;
              ">
                New AI Chatbot Conversation
              </h1>

              <p style="
                color:#aaaaaa;
                margin-bottom:0;
                line-height:1.6;
              ">
                A visitor completed a conversation with
                the NexGenByte AI assistant.
              </p>

            </div>

            <!-- CONTENT -->

            <div style="padding:35px;">

              <h2 style="
                font-size:18px;
                margin-top:0;
              ">
                Visitor Information
              </h2>

              <div style="
                background:#f7f7f7;
                padding:18px;
                border-radius:12px;
                margin-bottom:30px;
              ">

                <strong>Email:</strong>

                <a
                  href="mailto:${escapeHtml(email)}"
                  style="color:#111111;"
                >
                  ${escapeHtml(email)}
                </a>

              </div>

              <h2 style="
                font-size:18px;
                margin-bottom:20px;
              ">
                Conversation
              </h2>

              ${conversationHtml}

              <div style="
                border-top:1px solid #eeeeee;
                margin-top:30px;
                padding-top:20px;
                font-size:12px;
                color:#999999;
              ">
                Submitted through nexgenbyte.com AI chatbot.
              </div>

            </div>

          </div>

        </div>
      `,
    });

    // ==========================================
    // EMAIL 2
    // CONFIRMATION TO VISITOR
    // ==========================================

    await transporter.sendMail({
      from: `"NexGenByte" <${SMTP_FROM}>`,

      to: email,

      subject: "We've received your NexGenByte enquiry",

      html: `
        <div style="
          background:#f4f4f5;
          padding:40px 20px;
          font-family:Arial,sans-serif;
        ">

          <div style="
            max-width:600px;
            margin:auto;
            background:#ffffff;
            padding:40px;
            border-radius:18px;
          ">

            <div style="
              color:#999999;
              font-size:11px;
              letter-spacing:2px;
              text-transform:uppercase;
            ">
              NEXGENBYTE
            </div>

            <h1 style="
              font-size:30px;
              margin:12px 0 18px;
            ">
              Thanks for reaching out.
            </h1>

            <p style="
              color:#555555;
              line-height:1.8;
              font-size:16px;
            ">
              We've received your conversation with our
              AI assistant.
            </p>

            <p style="
              color:#555555;
              line-height:1.8;
              font-size:16px;
            ">
              Our team will review your enquiry and get
              back to you within
              <strong>24 hours</strong>.
            </p>

            <div style="
              margin:30px 0;
              padding:20px;
              background:#f7f7f7;
              border-radius:12px;
            ">

              <strong>
                What happens next?
              </strong>

              <p style="
                color:#666666;
                line-height:1.7;
                margin-bottom:0;
              ">
                A member of the NexGenByte team will
                review your requirements and contact you
                regarding the next steps.
              </p>

            </div>

            <p style="
              color:#555555;
              line-height:1.7;
            ">
              We appreciate your interest in NexGenByte
              and look forward to learning more about
              your project.
            </p>

            <p style="
              margin-top:35px;
              line-height:1.7;
            ">
              Best regards,<br>
              <strong>NexGenByte Team</strong>
            </p>

            <div style="
              margin-top:30px;
              color:#999999;
              font-size:12px;
            ">
              Web Development • AI • SEO • Digital Growth
            </div>

          </div>

        </div>
      `,
    });

    // ==========================================
    // SUCCESS
    // ==========================================

    return NextResponse.json({
      success: true,
      message: "Conversation submitted successfully.",
    });

  } catch (error) {
    console.error("Chat end error:", error);

    let errorMessage = "Unable to submit conversation.";

    if (error instanceof Error) {
      console.error("SMTP error:", error.message);

      if (error.message.includes("Greeting never received")) {
        errorMessage =
          "Could not connect to the Hostinger mail server.";
      } else if (
        error.message.includes("Invalid login") ||
        error.message.includes("authentication")
      ) {
        errorMessage =
          "Hostinger email authentication failed. Check SMTP_USER and SMTP_PASSWORD.";
      } else if (
        error.message.includes("ECONNREFUSED")
      ) {
        errorMessage =
          "Hostinger SMTP connection was refused. Check SMTP_HOST and SMTP_PORT.";
      } else if (
        error.message.includes("ETIMEDOUT")
      ) {
        errorMessage =
          "Connection to Hostinger SMTP timed out.";
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}