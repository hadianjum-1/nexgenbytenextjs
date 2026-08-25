import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, company, message } = await req.json();

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
      subject: `New Project Enquiry — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:40px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; padding:35px; border-radius:16px;">
            
            <h1 style="margin:0 0 10px;">
              New Project Enquiry
            </h1>

            <p style="color:#666;">
              Someone submitted the contact form on your NexGenByte website.
            </p>

            <hr style="border:none;border-top:1px solid #eee;margin:25px 0;">

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>

            <h3 style="margin-top:30px;">Project Details</h3>

            <p style="line-height:1.7;color:#444;">
              ${message.replace(/\n/g, "<br>")}
            </p>

            <hr style="border:none;border-top:1px solid #eee;margin:30px 0;">

            <p style="font-size:13px;color:#999;">
              Submitted through nexgenbyte.com
            </p>

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
        <div style="font-family:Arial,sans-serif;background:#f5f5f5;padding:40px;">
          <div style="max-width:600px;margin:auto;background:#fff;padding:40px;border-radius:16px;">

            <h1 style="margin:0 0 15px;">
              Thanks, ${name}.
            </h1>

            <p style="font-size:16px;line-height:1.7;color:#555;">
              We've received your project enquiry and our team at
              <strong>NexGenByte</strong> will review it shortly.
            </p>

            <div style="background:#f7f7f7;padding:20px;border-radius:12px;margin:25px 0;">
              <p style="margin:0;color:#555;">
                <strong>What happens next?</strong>
              </p>

              <p style="color:#666;line-height:1.6;">
                We'll review your requirements and get back to you
                within <strong>24 hours</strong>.
              </p>
            </div>

            <p style="color:#555;line-height:1.7;">
              We're looking forward to learning more about your project
              and seeing how we can help.
            </p>

            <p style="margin-top:35px;">
              Best regards,<br>
              <strong>NexGenByte Team</strong>
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