import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
} = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to you
    await transporter.sendMail({
  from: `"NexGenByte Website" <${process.env.SMTP_FROM}>`,
  to: "hadi@nexgenbyte.com",
  cc: "hadianjum278@gmail.com",
  replyTo: email,

  subject: `New Project Enquiry — ${name} — ${projectType || "Website Project"}`,

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
                    ? `<a href="${website}">${website}</a>`
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

    // Confirmation email to client
   await transporter.sendMail({
  from: `"NexGenByte" <${process.env.SMTP_FROM}>`,
  to: email,

  subject: "We've received your project enquiry — NexGenByte",

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

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
    });

  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send your enquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}