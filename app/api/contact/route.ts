import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { verifyTurnstile } from "@/lib/turnstile";
import { contactRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      company,
      projectType,
      projectStatus,
      website,
      pages,
      features,
      targetAudience,
      goals,
      timeline,
      referral,
      message,
      turnstileToken,

      // Honeypot field
      websiteCheck,
    } = await req.json();

    // =====================================================
    // HONEYPOT PROTECTION
    // =====================================================

    // Real users should never fill this hidden field.
    // Bots often do.
    if (websiteCheck) {
      console.warn("Contact form honeypot triggered");

      return NextResponse.json(
        {
          success: false,
          message: "Unable to submit this form.",
        },
        { status: 400 }
      );
    }

    // =====================================================
    // BASIC VALIDATION
    // =====================================================

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // Email validation
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

    // =====================================================
    // GET VISITOR IP
    // =====================================================

    const forwardedFor = req.headers.get("x-forwarded-for");

    const ip =
      req.headers.get("x-nf-client-connection-ip") ||
      forwardedFor?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "Unknown";

    // =====================================================
    // GET USER AGENT
    // =====================================================

    const userAgent =
      req.headers.get("user-agent") || "Unknown";

    // =====================================================
    // TURNSTILE VERIFICATION
    // =====================================================

    if (!turnstileToken) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please complete the security verification.",
        },
        { status: 403 }
      );
    }

    const turnstileValid = await verifyTurnstile(
      turnstileToken,
      ip !== "Unknown" ? ip : undefined
    );

    if (!turnstileValid) {
      console.warn(
        "Turnstile verification failed for IP:",
        ip
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Security verification failed. Please try again.",
        },
        { status: 403 }
      );
    }

    // =====================================================
    // IP GEOLOCATION
    // =====================================================

    let location = {
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
      timezone: "Unknown",
      latitude: "Unknown",
      longitude: "Unknown",
    };

    if (ip !== "Unknown") {
      try {
        const geoResponse = await fetch(
          `https://ipapi.co/${encodeURIComponent(ip)}/json/`,
          {
            cache: "no-store",
          }
        );

        if (geoResponse.ok) {
          const geo = await geoResponse.json();

          location = {
            country: geo.country_name || "Unknown",
            region: geo.region || "Unknown",
            city: geo.city || "Unknown",
            timezone: geo.timezone || "Unknown",
            latitude:
              geo.latitude !== undefined
                ? String(geo.latitude)
                : "Unknown",
            longitude:
              geo.longitude !== undefined
                ? String(geo.longitude)
                : "Unknown",
          };
        }
      } catch (geoError) {
        console.error(
          "IP geolocation failed:",
          geoError
        );
      }
    }

    const { success, limit, remaining, reset } =
  await contactRateLimit.limit(ip);

if (!success) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Too many submissions. Please try again later.",
    },
    {
      status: 429,
      headers: {
        "X-RateLimit-Limit": String(limit),
        "X-RateLimit-Remaining": String(remaining),
        "X-RateLimit-Reset": String(reset),
      },
    }
  );
}

    // =====================================================
    // SMTP
    // =====================================================

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),

      // IMPORTANT:
      // Do not use "|| true" here.
      secure: process.env.SMTP_SECURE === "true",

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
      from: `"NexGenByte Website" <${process.env.SMTP_FROM}>`,

      to: "hadi@nexgenbyte.com",

      cc: "hadianjum278@gmail.com",

      replyTo: email,

      subject: `New Project Enquiry — ${name} — ${
        projectType || "Website Project"
      }`,

      html: `
        <div style="
          font-family:Arial,sans-serif;
          background:#f4f4f5;
          padding:40px 20px;
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

              <p style="
                margin:0 0 8px;
                color:#999999;
                font-size:12px;
                text-transform:uppercase;
                letter-spacing:2px;
              ">
                NexGenByte
              </p>

              <h1 style="
                margin:0;
                font-size:28px;
              ">
                New Project Enquiry
              </h1>

              <p style="
                margin:10px 0 0;
                color:#aaaaaa;
              ">
                A new potential client has submitted the project form.
              </p>

            </div>


            <div style="padding:35px;">

              <!-- CLIENT -->

              <h2 style="
                font-size:18px;
                margin:0 0 20px;
              ">
                Client Information
              </h2>

              <table style="
                width:100%;
                border-collapse:collapse;
                font-size:14px;
              ">

                <tr>
                  <td style="padding:10px 0;color:#888;">
                    Name
                  </td>

                  <td style="padding:10px 0;font-weight:bold;">
                    ${name}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#888;">
                    Email
                  </td>

                  <td style="padding:10px 0;">
                    ${email}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#888;">
                    Company
                  </td>

                  <td style="padding:10px 0;">
                    ${company || "Not provided"}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#888;">
                    Current Website
                  </td>

                  <td style="padding:10px 0;">
                    ${
                      website
                        ? `<a href="${website}" target="_blank">${website}</a>`
                        : "Not provided"
                    }
                  </td>
                </tr>

              </table>


              <hr style="
                border:none;
                border-top:1px solid #eeeeee;
                margin:30px 0;
              " />


              <!-- PROJECT -->

              <h2 style="
                font-size:18px;
                margin:0 0 20px;
              ">
                Project Overview
              </h2>

              <table style="
                width:100%;
                border-collapse:collapse;
                font-size:14px;
              ">

                <tr>
                  <td style="padding:10px 0;color:#888;">
                    Project Type
                  </td>

                  <td style="padding:10px 0;font-weight:bold;">
                    ${projectType || "Not provided"}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#888;">
                    Project Status
                  </td>

                  <td style="padding:10px 0;">
                    ${projectStatus || "Not provided"}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#888;">
                    Number of Pages
                  </td>

                  <td style="padding:10px 0;">
                    ${pages || "Not provided"}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#888;">
                    Timeline
                  </td>

                  <td style="padding:10px 0;">
                    ${timeline || "Not provided"}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#888;">
                    Referral
                  </td>

                  <td style="padding:10px 0;">
                    ${referral || "Not provided"}
                  </td>
                </tr>

              </table>


              <!-- FEATURES -->

              <div style="
                margin-top:30px;
                padding:20px;
                background:#f7f7f7;
                border-radius:12px;
              ">

                <h3 style="margin:0 0 10px;">
                  Required Features
                </h3>

                <p style="
                  margin:0;
                  color:#555;
                  line-height:1.7;
                  white-space:pre-line;
                ">
                  ${features || "Not provided"}
                </p>

              </div>


              <!-- AUDIENCE -->

              <div style="
                margin-top:20px;
                padding:20px;
                background:#f7f7f7;
                border-radius:12px;
              ">

                <h3 style="margin:0 0 10px;">
                  Target Audience
                </h3>

                <p style="
                  margin:0;
                  color:#555;
                  line-height:1.7;
                  white-space:pre-line;
                ">
                  ${targetAudience || "Not provided"}
                </p>

              </div>


              <!-- GOALS -->

              <div style="
                margin-top:20px;
                padding:20px;
                background:#f7f7f7;
                border-radius:12px;
              ">

                <h3 style="margin:0 0 10px;">
                  Project Goals
                </h3>

                <p style="
                  margin:0;
                  color:#555;
                  line-height:1.7;
                  white-space:pre-line;
                ">
                  ${goals || "Not provided"}
                </p>

              </div>


              <!-- MESSAGE -->

              <div style="
                margin-top:20px;
                padding:20px;
                background:#f7f7f7;
                border-radius:12px;
              ">

                <h3 style="margin:0 0 10px;">
                  Client Message
                </h3>

                <p style="
                  margin:0;
                  color:#444;
                  line-height:1.8;
                  white-space:pre-line;
                ">
                  ${message}
                </p>

              </div>


              <!-- VISITOR INFORMATION -->

              <div style="
                margin-top:30px;
                padding:20px;
                background:#111111;
                border-radius:12px;
                color:#ffffff;
              ">

                <h3 style="
                  margin:0 0 15px;
                  color:#ffffff;
                ">
                  Visitor Information
                </h3>

                <table style="
                  width:100%;
                  border-collapse:collapse;
                  font-size:14px;
                ">

                  <tr>
                    <td style="
                      padding:7px 0;
                      color:#999999;
                    ">
                      IP Address
                    </td>

                    <td style="
                      padding:7px 0;
                      color:#ffffff;
                    ">
                      ${ip}
                    </td>
                  </tr>

                  <tr>
                    <td style="
                      padding:7px 0;
                      color:#999999;
                    ">
                      Country
                    </td>

                    <td style="
                      padding:7px 0;
                      color:#ffffff;
                    ">
                      ${location.country}
                    </td>
                  </tr>

                  <tr>
                    <td style="
                      padding:7px 0;
                      color:#999999;
                    ">
                      Region
                    </td>

                    <td style="
                      padding:7px 0;
                      color:#ffffff;
                    ">
                      ${location.region}
                    </td>
                  </tr>

                  <tr>
                    <td style="
                      padding:7px 0;
                      color:#999999;
                    ">
                      City
                    </td>

                    <td style="
                      padding:7px 0;
                      color:#ffffff;
                    ">
                      ${location.city}
                    </td>
                  </tr>

                  <tr>
                    <td style="
                      padding:7px 0;
                      color:#999999;
                    ">
                      Timezone
                    </td>

                    <td style="
                      padding:7px 0;
                      color:#ffffff;
                    ">
                      ${location.timezone}
                    </td>
                  </tr>

                  <tr>
                    <td style="
                      padding:7px 0;
                      color:#999999;
                    ">
                      Coordinates
                    </td>

                    <td style="
                      padding:7px 0;
                      color:#ffffff;
                    ">
                      ${location.latitude},
                      ${location.longitude}
                    </td>
                  </tr>

                  <tr>
                    <td style="
                      padding:7px 0;
                      color:#999999;
                    ">
                      User Agent
                    </td>

                    <td style="
                      padding:7px 0;
                      color:#ffffff;
                      word-break:break-word;
                    ">
                      ${userAgent}
                    </td>
                  </tr>

                </table>

              </div>


              <!-- FOOTER -->

              <div style="
                margin-top:35px;
                padding-top:25px;
                border-top:1px solid #eeeeee;
              ">

                <p style="
                  margin:0;
                  color:#999;
                  font-size:12px;
                ">
                  Submitted through nexgenbyte.com
                </p>

              </div>

            </div>

          </div>

        </div>
      `,
    });

    // =====================================================
    // CONFIRMATION EMAIL TO CLIENT
    // =====================================================

    await transporter.sendMail({
      from: `"NexGenByte" <${process.env.SMTP_FROM}>`,

      to: email,

      subject:
        "We've received your project enquiry — NexGenByte",

      html: `
        <div style="
          font-family:Arial,sans-serif;
          background:#f4f4f5;
          padding:40px 20px;
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
              margin:10px 0 15px;
            ">
              Thanks, ${name}.
            </h1>

            <p style="
              font-size:16px;
              line-height:1.7;
              color:#555;
            ">
              We've received your project enquiry and our team
              will review your requirements carefully.
            </p>


            <div style="
              margin:30px 0;
              padding:22px;
              background:#f7f7f7;
              border-radius:12px;
            ">

              <p style="
                margin:0 0 10px;
                color:#888;
                font-size:13px;
              ">
                PROJECT
              </p>

              <p style="
                margin:0;
                font-size:18px;
                font-weight:bold;
              ">
                ${projectType || "Website Project"}
              </p>

              ${
                timeline
                  ? `
                    <p style="
                      margin:12px 0 0;
                      color:#666;
                    ">
                      Desired timeline: ${timeline}
                    </p>
                  `
                  : ""
              }

            </div>


            <h3>
              What happens next?
            </h3>

            <p style="
              color:#555;
              line-height:1.7;
            ">
              We'll review your requirements and get back to you
              within <strong>24 hours</strong>.
            </p>

            <p style="
              color:#555;
              line-height:1.7;
            ">
              If your project looks like a good fit, we'll discuss
              the next steps, timeline, and project scope with you.
            </p>


            <p style="
              margin-top:35px;
              line-height:1.7;
            ">
              Best regards,<br>
              <strong>NexGenByte Team</strong>
            </p>


            <p style="
              margin-top:30px;
              font-size:12px;
              color:#999;
            ">
              Web Development • Design • Digital Experiences
            </p>

          </div>

        </div>
      `,
    });

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json({
      success: true,
      message:
        "Your enquiry has been submitted successfully.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to send your enquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}