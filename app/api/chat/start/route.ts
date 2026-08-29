import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email || "").trim();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"NexGenByte Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,

      subject: `New Chat Started — ${email}`,

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px;">

          <h2 style="margin-bottom: 10px;">
            New Chat Started
          </h2>

          <p style="color: #555;">
            Someone just started a conversation with NexGenByte.
          </p>

          <div style="
            margin-top: 25px;
            padding: 20px;
            background: #f7f7f7;
            border-radius: 12px;
          ">
            <strong>Visitor Email</strong>
            <p>${email}</p>
          </div>

          <p style="margin-top: 25px; color: #777;">
            The visitor may continue chatting with the AI assistant.
          </p>

        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Chat started successfully.",
    });
  } catch (error) {
    console.error("Start chat email error:", error);

    return NextResponse.json(
      {
        message: "Unable to start conversation.",
      },
      { status: 500 }
    );
  }
}