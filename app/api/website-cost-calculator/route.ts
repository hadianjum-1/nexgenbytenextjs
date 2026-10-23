
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const ADMIN_EMAIL = "hadi@nexgenbyte.com";
const MAX_TEXT_LENGTH = 5000;

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function textValue(value: unknown, max = 300): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) &&
    value.length <= 254;
}

function emailLayout(content: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NexGenByte</title>
      </head>
      <body style="margin:0;padding:0;background:#f4f5f8;font-family:Arial,Helvetica,sans-serif;color:#0b0d10;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f5f8;padding:32px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e7e8ed;border-radius:14px;overflow:hidden;">
                <tr>
                  <td style="padding:24px 30px;border-bottom:1px solid #eceef2;">
                    <a href="https://nexgenbyte.com" style="font-size:22px;font-weight:700;letter-spacing:-1px;color:#0b0d10;text-decoration:none;">
                      NexGenByte<span style="color:#5b7cfa;">.</span>
                    </a>
                    <div style="margin-top:5px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#737987;">
                      Websites built around your business
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px;">
                    ${content}
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 30px;background:#fafaf9;border-top:1px solid #eceef2;">
                    <p style="margin:0;font-size:12px;line-height:1.7;color:#697080;">
                      NexGenByte · Web Development & Digital Solutions<br />
                      <a href="https://nexgenbyte.com" style="color:#5b7cfa;text-decoration:none;">nexgenbyte.com</a>
                      &nbsp;·&nbsp;
                      <a href="mailto:hadi@nexgenbyte.com" style="color:#5b7cfa;text-decoration:none;">Contact us</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function detailRow(label: string, value: unknown): string {
  return `
    <tr>
      <td style="padding:11px 0;border-bottom:1px solid #eceef2;color:#697080;font-size:13px;vertical-align:top;width:42%;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:11px 0;border-bottom:1px solid #eceef2;color:#0b0d10;font-size:13px;font-weight:600;vertical-align:top;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const {
      name: rawName,
      email: rawEmail,
      project,
      design,
      pages,
      content,
      features: rawFeatures,
      timeline,
      estimate,
      details: rawDetails,
    } = await request.json();

    const name = textValue(rawName, 120);
    const email = textValue(rawEmail, 254).toLowerCase();
    const projectName = textValue(project, 150);
    const designName = textValue(design, 100);
    const pageCount = textValue(pages, 80);
    const contentName = textValue(content, 100);
    const timelineName = textValue(timeline, 100);
    const details = textValue(rawDetails, MAX_TEXT_LENGTH);

    if (name.length < 2 || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid name and email address." },
        { status: 400 },
      );
    }

    if (!projectName || !designName || !pageCount || !timelineName) {
      return NextResponse.json(
        { success: false, message: "Some project details are missing. Please review your estimate." },
        { status: 400 },
      );
    }

    if (!Array.isArray(rawFeatures) || rawFeatures.length > 20) {
      return NextResponse.json(
        { success: false, message: "The selected features are invalid." },
        { status: 400 },
      );
    }

    const features = rawFeatures
      .filter((item): item is string => typeof item === "string")
      .slice(0, 20)
      .map((item) => textValue(item, 100));

    const low = Number(estimate?.low);
    const high = Number(estimate?.high);
    const total = Number(estimate?.total);

    if (
      !Number.isFinite(low) ||
      !Number.isFinite(high) ||
      !Number.isFinite(total) ||
      low < 0 ||
      high < low ||
      total < 0 ||
      high > 10_000_000
    ) {
      return NextResponse.json(
        { success: false, message: "The estimate values are invalid." },
        { status: 400 },
      );
    }

    const formatMoney = (amount: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(amount);

    const host = process.env.SMTP_HOST || "smtp.hostinger.com";
    const port = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || smtpUser;

    if (!smtpUser || !smtpPass || !from || ![465, 587].includes(port)) {
      console.error("Calculator email configuration is missing or invalid.");

      return NextResponse.json(
        { success: false, message: "Email service is not configured. Please try again later." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeProject = escapeHtml(projectName);
    const safeDetails = escapeHtml(details).replace(/\n/g, "<br />");
    const safeFeatures = features.length
      ? features.map(escapeHtml).join(", ")
      : "No optional features selected";

    // Email 1: New enquiry for NexGenByte
    const adminHtml = emailLayout(`
      <div style="display:inline-block;padding:7px 10px;border-radius:5px;background:#edf0ff;color:#405fd8;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">
        New website enquiry
      </div>

      <h1 style="margin:20px 0 8px;font-size:27px;line-height:1.25;letter-spacing:-0.7px;">
        A new project is on the table.
      </h1>

      <p style="margin:0 0 24px;font-size:14px;line-height:1.8;color:#697080;">
        ${safeName} has completed the NexGenByte website cost calculator.
        Reply directly to this email to contact the client.
      </p>

      <div style="padding:20px;border-radius:10px;background:#fafaf9;border:1px solid #eceef2;margin-bottom:24px;">
        <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#697080;">
          Estimated project budget
        </div>
        <div style="margin-top:8px;font-size:29px;font-weight:700;letter-spacing:-1px;">
          ${formatMoney(low)} – ${formatMoney(high)}
        </div>
        <div style="margin-top:6px;font-size:12px;color:#697080;">
          Calculator midpoint: ${formatMoney(total)} · USD
        </div>
      </div>

      <h2 style="font-size:15px;margin:0 0 8px;">Client details</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        ${detailRow("Name", name)}
        ${detailRow("Email", email)}
        ${detailRow("Project", projectName)}
        ${detailRow("Design", designName)}
        ${detailRow("Pages", pageCount)}
        ${detailRow("Content", contentName || "Not specified")}
        ${detailRow("Features", features.join(", ") || "None selected")}
        ${detailRow("Timeline", timelineName)}
      </table>

      ${
        details
          ? `<h2 style="font-size:15px;margin:24px 0 8px;">Project notes</h2>
             <div style="padding:15px;background:#fafaf9;border:1px solid #eceef2;border-radius:8px;font-size:13px;line-height:1.8;color:#1f2937;">${safeDetails}</div>`
          : ""
      }

      <p style="margin:24px 0 0;font-size:12px;line-height:1.7;color:#697080;">
        The estimate is preliminary and should be confirmed after reviewing the project scope.
      </p>
    `);

    const adminText = [
      "New NexGenByte website enquiry",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Project: ${projectName}`,
      `Design: ${designName}`,
      `Pages: ${pageCount}`,
      `Content: ${contentName || "Not specified"}`,
      `Features: ${features.join(", ") || "None selected"}`,
      `Timeline: ${timelineName}`,
      `Estimate range: ${formatMoney(low)} - ${formatMoney(high)}`,
      `Estimate midpoint: ${formatMoney(total)}`,
      "",
      `Project notes: ${details || "Not provided"}`,
    ].join("\n");

    await transporter.sendMail({
      from,
      to: ADMIN_EMAIL,
      replyTo: { name, address: email },
      subject: `New website enquiry: ${projectName} — ${name}`,
      text: adminText,
      html: adminHtml,
    });

    // Email 2: Confirmation to the client
    const clientHtml = emailLayout(`
      <div style="display:inline-block;padding:7px 10px;border-radius:5px;background:#edf0ff;color:#405fd8;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">
        Enquiry received
      </div>

      <h1 style="margin:20px 0 12px;font-size:29px;line-height:1.2;letter-spacing:-0.8px;">
        Thanks, ${safeName}.
      </h1>

      <p style="margin:0 0 16px;font-size:15px;line-height:1.8;color:#414958;">
        Your project enquiry has been received by NexGenByte. Thanks for
        considering us for your website project.
      </p>

      <p style="margin:0 0 24px;font-size:14px;line-height:1.8;color:#697080;">
        Our team will review your requirements and follow up to discuss
        the best approach, scope, and final pricing.
      </p>

      <div style="padding:20px;border-radius:10px;background:#fafaf9;border:1px solid #eceef2;">
        <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#697080;">
          Your project estimate
        </div>
        <h2 style="margin:8px 0;font-size:27px;letter-spacing:-0.7px;">
          ${formatMoney(low)} – ${formatMoney(high)}
        </h2>
        <p style="margin:0 0 18px;font-size:12px;color:#697080;">
          Preliminary estimate in USD, subject to scope review.
        </p>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          ${detailRow("Project", projectName)}
          ${detailRow("Design direction", designName)}
          ${detailRow("Page range", pageCount)}
          ${detailRow("Timeline", timelineName)}
        </table>
      </div>

      <p style="margin:24px 0 0;font-size:14px;line-height:1.8;color:#414958;">
        If you have additional information to share, simply reply to this email.
        We look forward to learning more about your business.
      </p>

      <p style="margin:22px 0 0;font-size:14px;line-height:1.8;color:#0b0d10;">
        Best regards,<br />
        <strong>The NexGenByte Team</strong>
      </p>
    `);

    const clientText = [
      `Hi ${name},`,
      "",
      "Thanks for contacting NexGenByte. Your website project enquiry has been received.",
      "Our team will review your requirements and follow up to discuss scope and final pricing.",
      "",
      `Project: ${projectName}`,
      `Design: ${designName}`,
      `Pages: ${pageCount}`,
      `Timeline: ${timelineName}`,
      `Preliminary estimate: ${formatMoney(low)} - ${formatMoney(high)} USD`,
      "",
      "This estimate is preliminary and is not a fixed quote.",
      "If you have additional information, simply reply to this email.",
      "",
      "Best regards,",
      "The NexGenByte Team",
    ].join("\n");

    try {
      await transporter.sendMail({
        from,
        to: email,
        subject: "We've received your project enquiry | NexGenByte",
        text: clientText,
        html: clientHtml,
      });
    } catch (confirmationError) {
      // The admin email has already been delivered. Do not tell the client
      // that their enquiry failed just because the confirmation email failed.
      console.error("Client confirmation email failed:", confirmationError);

      return NextResponse.json({
        success: true,
        confirmationSent: false,
        message: "Your enquiry was received, but we couldn't send the confirmation email.",
      });
    }

    return NextResponse.json({
      success: true,
      confirmationSent: true,
      message: "Your enquiry was submitted successfully.",
    });
  } catch (error) {
    console.error("Website calculator enquiry error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "We couldn't submit your enquiry. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
