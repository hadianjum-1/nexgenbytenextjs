import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is required.",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // SMTP transporter
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

    // =====================================================
    // EMAIL TO NEXGENBYTE
    // =====================================================

    await transporter.sendMail({
      from: `"NexGenByte Newsletter" <${process.env.SMTP_FROM}>`,
      to: "hadi@nexgenbyte.com",
      cc: "hadianjum278@gmail.com",
      replyTo: email,

      subject: `New Newsletter Subscriber — ${email}`,

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

            <!-- HEADER -->

            <div style="
              background:#111111;
              padding:32px;
              color:#ffffff;
            ">

              <p style="
                margin:0 0 8px;
                color:#999999;
                font-size:12px;
                letter-spacing:2px;
              ">
                NEXGENBYTE
              </p>

              <h1 style="
                margin:0;
                font-size:26px;
              ">
                New Newsletter Subscriber
              </h1>

            </div>

            <!-- CONTENT -->

            <div style="padding:35px;">

              <p style="
                margin:0 0 25px;
                color:#555555;
                line-height:1.7;
              ">
                Someone has subscribed to the NexGenByte newsletter.
              </p>

              <div style="
                background:#f7f7f7;
                padding:22px;
                border-radius:12px;
              ">

                <p style="
                  margin:0 0 8px;
                  color:#999999;
                  font-size:12px;
                  text-transform:uppercase;
                  letter-spacing:1px;
                ">
                  Subscriber Email
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

    // =====================================================
    // WELCOME EMAIL TO SUBSCRIBER
    // =====================================================

    await transporter.sendMail({
      from: `"NexGenByte" <${process.env.SMTP_FROM}>`,
      to: email,

      subject: "Welcome to the NexGenByte newsletter",

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

            <!-- HEADER -->

            <div style="
              background:#111111;
              padding:40px 35px;
              color:#ffffff;
            ">

              <p style="
                margin:0 0 10px;
                color:#999999;
                font-size:12px;
                letter-spacing:2px;
              ">
                NEXGENBYTE
              </p>

              <h1 style="
                margin:0;
                font-size:30px;
                line-height:1.2;
              ">
                You're officially subscribed.
              </h1>

            </div>

            <!-- CONTENT -->

            <div style="padding:40px 35px;">

              <p style="
                font-size:17px;
                line-height:1.7;
                color:#444444;
              ">
                Thanks for joining the NexGenByte newsletter.
              </p>

              <p style="
                font-size:15px;
                line-height:1.8;
                color:#666666;
              ">
                You'll receive useful insights about web development,
                website strategy, digital experiences, marketing,
                and growing your online presence.
              </p>

              <div style="
                margin:30px 0;
                padding:24px;
                background:#f7f7f7;
                border-radius:12px;
              ">

                <p style="
                  margin:0 0 10px;
                  font-size:13px;
                  color:#999999;
                  text-transform:uppercase;
                  letter-spacing:1px;
                ">
                  What you'll get
                </p>

                <p style="
                  margin:0;
                  color:#555555;
                  line-height:1.8;
                ">
                  • Website development tips<br>
                  • Marketing insights<br>
                  • Conversion strategies<br>
                  • Useful digital resources<br>
                  • NexGenByte updates
                </p>

              </div>

              <p style="
                color:#555555;
                line-height:1.7;
              ">
                We're glad to have you with us.
              </p>

              <p style="
                margin-top:35px;
                line-height:1.7;
              ">
                Best regards,<br>
                <strong>NexGenByte Team</strong>
              </p>

            </div>

            <!-- FOOTER -->

            <div style="
              padding:20px 35px;
              border-top:1px solid #eeeeee;
            ">

              <p style="
                margin:0;
                font-size:12px;
                color:#999999;
              ">
                NexGenByte — Web Development & Digital Experiences
              </p>

            </div>

          </div>

        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "You're successfully subscribed!",
    });

  } catch (error) {
    console.error("Newsletter error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to subscribe right now. Please try again.",
      },
      { status: 500 }
    );
  }
}