import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true" || true,
      connectionTimeout: 10000,
      socketTimeout: 10000,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email notification to you
    await transporter.sendMail({
      from: `"NexGenByte Website" <${process.env.SMTP_FROM}>`,
      to: "hadi@nexgenbyte.com",
      cc: "hadianjum278@gmail.com",
      replyTo: email,
      subject: "New 50% Website Offer Lead",

      html: `
        <div style="
          margin:0;
          padding:40px 20px;
          background:#f4f4f5;
          font-family:Arial,sans-serif;
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
                  ${email}
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

    // Optional confirmation email to visitor
    await transporter.sendMail({
      from: `"NexGenByte" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: "Your 50% Website Offer — NexGenByte",

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
            border-radius:18px;
            padding:40px;
          ">

            <p style="
              color:#999;
              font-size:12px;
              letter-spacing:2px;
              text-transform:uppercase;
            ">
              NEXGENBYTE
            </p>

            <h1 style="
              font-size:30px;
              margin:15px 0;
            ">
              Your 50% offer is confirmed.
            </h1>

            <p style="
              color:#555;
              font-size:16px;
              line-height:1.7;
            ">
              Thanks for your interest in NexGenByte.
              You&apos;ve successfully claimed our limited-time
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
              ">
                50% OFF
              </p>

              <p style="
                margin:10px 0 0;
                color:#666;
                line-height:1.6;
              ">
                Our team will contact you to learn about your
                project and explain the offer.
              </p>

            </div>

            <p style="
              color:#555;
              line-height:1.7;
            ">
              We&apos;ll get back to you within
              <strong>24 hours.</strong>
            </p>

            <p style="
              margin-top:35px;
              line-height:1.7;
            ">
              Best regards,<br>
              <strong>NexGenByte Team</strong>
            </p>

          </div>
        </div>
      `,
    });

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