import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { verifyTurnstile } from "@/lib/turnstile";

export async function POST(req: Request) {
  try {
    const { email, turnstileToken } = await req.json();

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // Validate Turnstile token
    if (!turnstileToken || typeof turnstileToken !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Security verification is required.",
        },
        { status: 400 }
      );
    }

    // Get visitor IP
    const forwardedFor = req.headers.get("x-forwarded-for");

    const ip =
      req.headers.get("x-nf-client-connection-ip") ||
      forwardedFor?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "Unknown";

    // Verify Cloudflare Turnstile
    const turnstileValid = await verifyTurnstile(
      turnstileToken,
      ip
    );

    if (!turnstileValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Security verification failed. Please try again.",
        },
        { status: 403 }
      );
    }

    const cleanEmail = email.trim();

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      connectionTimeout: 10000,
      socketTimeout: 10000,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    /*
     * ADMIN EMAIL
     */
    try {
      const adminInfo = await transporter.sendMail({
        from: `"NexGenByte Website" <${process.env.SMTP_FROM}>`,
        to: "hadi@nexgenbyte.com",
        cc: "hadianjum278@gmail.com",
        replyTo: cleanEmail,
        subject: "New 50% Website Offer Lead",

        html: `
          <div style="
            margin:0;
            padding:40px 20px;
            background:#f4f4f5;
            font-family:Arial,Helvetica,sans-serif;
          ">

            <div style="
              max-width:600px;
              margin:auto;
              background:#ffffff;
              border-radius:18px;
              overflow:hidden;
            ">

              <div style="
                background:#111111;
                padding:35px;
                color:#ffffff;
              ">

                <p style="
                  margin:0 0 8px;
                  color:#999999;
                  font-size:12px;
                  letter-spacing:2px;
                  text-transform:uppercase;
                ">
                  NexGenByte
                </p>

                <h1 style="
                  margin:0;
                  font-size:28px;
                ">
                  New Promotional Lead
                </h1>

                <p style="
                  margin:10px 0 0;
                  color:#aaaaaa;
                ">
                  Someone claimed the 50% website offer.
                </p>

              </div>

              <div style="padding:35px;">

                <div style="
                  padding:20px;
                  background:#f7f7f7;
                  border-radius:12px;
                ">

                  <p style="
                    margin:0 0 8px;
                    color:#888888;
                    font-size:12px;
                    text-transform:uppercase;
                  ">
                    Potential Client Email
                  </p>

                  <p style="
                    margin:0;
                    font-size:18px;
                    font-weight:bold;
                    color:#111111;
                  ">
                    ${cleanEmail}
                  </p>

                </div>

                <div style="
                  margin-top:25px;
                  padding:20px;
                  border-left:4px solid #111111;
                ">

                  <p style="
                    margin:0;
                    color:#555555;
                    line-height:1.6;
                  ">
                    This visitor submitted their email through the
                    50% website development promotion on NexGenByte.
                  </p>

                </div>

                <div style="
                  margin-top:25px;
                  padding:20px;
                  background:#f7f7f7;
                  border-radius:12px;
                ">

                  <p style="
                    margin:0 0 8px;
                    color:#888888;
                    font-size:12px;
                    text-transform:uppercase;
                  ">
                    Visitor IP
                  </p>

                  <p style="
                    margin:0;
                    color:#111111;
                    font-size:15px;
                  ">
                    ${ip}
                  </p>

                </div>

                <p style="
                  margin-top:30px;
                  color:#999999;
                  font-size:12px;
                ">
                  Submitted through nexgenbyte.com
                </p>

              </div>

            </div>
          </div>
        `,
      });

      console.log("Promo admin email sent:", adminInfo.messageId);
    } catch (error) {
      console.error("Promo admin email error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to process your request. Please try again.",
        },
        { status: 500 }
      );
    }

    /*
     * CLIENT CONFIRMATION EMAIL
     */
    try {
      const clientInfo = await transporter.sendMail({
        from: `"NexGenByte" <${process.env.SMTP_FROM}>`,
        to: cleanEmail,
        subject: "Your 50% Website Offer — NexGenByte",

        html: `
          <div style="
            background:#f4f4f5;
            padding:40px 20px;
            font-family:Arial,Helvetica,sans-serif;
          ">

            <div style="
              max-width:600px;
              margin:auto;
              background:#ffffff;
              border-radius:18px;
              padding:40px;
            ">

              <p style="
                margin:0;
                color:#999999;
                font-size:12px;
                letter-spacing:2px;
                text-transform:uppercase;
              ">
                NEXGENBYTE
              </p>

              <h1 style="
                font-size:30px;
                margin:15px 0;
                color:#111111;
              ">
                Your 50% offer is confirmed.
              </h1>

              <p style="
                color:#555555;
                font-size:16px;
                line-height:1.7;
              ">
                Thanks for your interest in NexGenByte.
                You&apos;ve successfully claimed our
                <strong>50% website development offer.</strong>
              </p>

              <div style="
                margin:30px 0;
                padding:25px;
                background:#f7f7f7;
                border-radius:12px;
              ">

                <p style="
                  margin:0;
                  font-size:20px;
                  font-weight:bold;
                  color:#111111;
                ">
                  50% OFF
                </p>

                <p style="
                  margin:10px 0 0;
                  color:#666666;
                  line-height:1.6;
                ">
                  Our team will contact you to learn about your
                  project and explain the offer.
                </p>

              </div>

              <p style="
                color:#555555;
                line-height:1.7;
              ">
                We&apos;ll get back to you within
                <strong>24 hours.</strong>
              </p>

              <p style="
                margin-top:35px;
                line-height:1.7;
                color:#555555;
              ">
                Best regards,<br>
                <strong>NexGenByte Team</strong>
              </p>

            </div>
          </div>
        `,
      });

      console.log("Promo client email sent:", clientInfo.messageId);
    } catch (error) {
      console.error("Promo client email error:", error);

      // Admin notification succeeded, so don't tell the visitor
      // that the whole submission failed.
      return NextResponse.json({
        success: true,
        message: "Offer claimed successfully.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Offer claimed successfully.",
    });
  } catch (error) {
    console.error("Promo popup error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit your email. Please try again.",
      },
      { status: 500 }
    );
  }
}