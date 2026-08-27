import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    // -----------------------------------------
    // Check environment variables
    // -----------------------------------------

    const requiredEnv = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASSWORD",
      "SMTP_FROM",
      "CONTACT_EMAIL",
    ];

    const missingEnv = requiredEnv.filter(
      (key) => !process.env[key]
    );

    if (missingEnv.length > 0) {
      console.error(
        "Missing environment variables:",
        missingEnv
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Email service is not properly configured.",
        },
        { status: 500 }
      );
    }

    // -----------------------------------------
    // Get appointment data
    // -----------------------------------------

    const {
      name,
      email,
      phone,
      date,
      time,
      service,
      message,
    } = await req.json();

    // -----------------------------------------
    // Validate
    // -----------------------------------------

    if (!name || !email || !date || !time) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, email, date and time are required.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Create Hostinger SMTP transporter
    // -----------------------------------------

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),

      // Hostinger port 465 = SSL
      secure: true,

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },

      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
    });

    // -----------------------------------------
    // Verify SMTP connection
    // -----------------------------------------

    await transporter.verify();

    console.log("SMTP connection successful.");

    // -----------------------------------------
    // Email to YOU
    // -----------------------------------------

    await transporter.sendMail({
      from: `"NexGenByte Website" <${process.env.SMTP_FROM}>`,

      to: process.env.CONTACT_EMAIL,

      cc: process.env.CC_EMAIL,

      replyTo: email,

      subject: `New Appointment Booking - ${name}`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: 0 auto;
          padding: 30px;
          color: #222;
        ">

          <h2 style="margin-bottom: 10px;">
            New Appointment Request
          </h2>

          <p style="color:#666;">
            A visitor has booked an appointment through the
            NexGenByte website chatbot.
          </p>

          <hr style="margin:25px 0;" />

          <h3>Client Details</h3>

          <p>
            <strong>Name:</strong>
            ${name}
          </p>

          <p>
            <strong>Email:</strong>
            ${email}
          </p>

          <p>
            <strong>Phone:</strong>
            ${phone || "Not provided"}
          </p>

          <h3>Appointment Details</h3>

          <p>
            <strong>Date:</strong>
            ${date}
          </p>

          <p>
            <strong>Time:</strong>
            ${time}
          </p>

          <p>
            <strong>Service:</strong>
            ${service || "General Consultation"}
          </p>

          <h3>Project Message</h3>

          <p>
            ${message || "No additional message"}
          </p>

          <hr style="margin:25px 0;" />

          <p>
            Please contact the client to confirm the appointment.
          </p>

          <p>
            <strong>NexGenByte</strong>
          </p>

        </div>
      `,
    });

    console.log("Admin appointment email sent.");

    // -----------------------------------------
    // Confirmation email to CLIENT
    // -----------------------------------------

    await transporter.sendMail({
      from: `"NexGenByte" <${process.env.SMTP_FROM}>`,

      to: email,

      subject:
        "Your NexGenByte Appointment Request",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: 0 auto;
          padding: 30px;
          color: #222;
        ">

          <h2>
            Appointment Request Received
          </h2>

          <p>
            Hi ${name},
          </p>

          <p>
            Thank you for contacting NexGenByte.
            We've received your appointment request.
          </p>

          <h3>Your Appointment Request</h3>

          <p>
            <strong>Date:</strong>
            ${date}
          </p>

          <p>
            <strong>Time:</strong>
            ${time}
          </p>

          <p>
            <strong>Service:</strong>
            ${service || "General Consultation"}
          </p>

          <p>
            <strong>Phone:</strong>
            ${phone || "Not provided"}
          </p>

          <p>
            Our team will review your request and
            contact you within 24 hours to confirm
            the appointment.
          </p>

          <p>
            Best regards,<br />
            <strong>NexGenByte</strong>
          </p>

        </div>
      `,
    });

    console.log("Client confirmation email sent.");

    // -----------------------------------------
    // Success
    // -----------------------------------------

    return NextResponse.json({
      success: true,
      message:
        "Appointment request submitted successfully.",
    });

  } catch (error) {

    console.error(
      "Appointment API error:",
      error
    );

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unable to submit appointment.";

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}