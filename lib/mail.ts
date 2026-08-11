import nodemailer from 'nodemailer';
import path from 'path';

interface ContactMailData {
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}

interface QuoteMailData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  service: string;
  message: string;
}

interface CareerMailData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  linkedin?: string;
  portfolio?: string;
  coverLetter: string;
  resumeDownloadUrl: string;
}

function getTransporter() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    return nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || '465'),
      secure: smtpPort === '465',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }
  return null;
}

const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_TO || 'info@atriowings.in';

// Reusable premium wrapper for the email HTML
function getEmailHtml(title: string, tableRowsHtml: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f7fa; font-family: 'Segoe UI', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f7fa; padding: 30px 10px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 20px rgba(0, 114, 206, 0.04); border: 1px solid #eef2f6;">
              <!-- Header Section -->
              <tr style="background: linear-gradient(135deg, #091e3e 0%, #0b254b 100%);">
                <td style="padding: 24px 30px; text-align: center;">
                  <img src="cid:atriowingsLogo" alt="Atriowings Technologies" style="height: 38px; width: auto; display: block; margin: 0 auto 12px auto;" />
                  <h1 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0; letter-spacing: 0.5px;">${title}</h1>
                </td>
              </tr>
              
              <!-- Content Section -->
              <tr>
                <td style="padding: 30px 40px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: separate; border-spacing: 0; margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                    ${tableRowsHtml}
                  </table>
                  
                  <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.5; text-align: center;">
                    This is an automated system notification. Please do not reply directly to this message.
                  </p>
                </td>
              </tr>
              
              <!-- Footer Section -->
              <tr style="background-color: #f8fafc; border-top: 1px solid #edf2f7;">
                <td style="padding: 20px 40px; text-align: center;">
                  <p style="margin: 0 0 4px 0; color: #334155; font-size: 13px; font-weight: 600;">Atriowings Technologies</p>
                  <p style="margin: 0; color: #94a3b8; font-size: 11px; line-height: 1.4;">No. 1, Gurudev Complex, 57th St, Venkatraman Nagar, Korattur, Chennai - 600 080.</p>
                  <p style="margin: 10px 0 0 0; color: #cbd5e1; font-size: 10px;">© ${new Date().getFullYear()} Atriowings. All rights reserved.</p>
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

// Helper to attach the brand logo safely
function getLogoAttachment() {
  return [{
    filename: 'logo.png',
    path: path.join(process.cwd(), 'public/img/atriowings white logo.png'),
    cid: 'atriowingsLogo'
  }];
}

export async function sendContactNotification(data: ContactMailData) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('SMTP Config missing. Skipped sending contact email. Data:', data);
    return;
  }

  const tableRows = `
    <tr style="background-color: #f8fafc;">
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; width: 140px; border-bottom: 1px solid #e2e8f0;">Full Name:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0;">${data.name}</td>
    </tr>
    <tr>
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0;">Email:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${data.email}" style="color: #0072ce; text-decoration: none; font-weight: 500;">${data.email}</a></td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0;">Phone:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0;">${data.mobile}</td>
    </tr>
    <tr>
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0;">Subject:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0; font-weight: 500;">${data.subject}</td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0; vertical-align: top;">Message:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0; white-space: pre-wrap; line-height: 1.5;">${data.message}</td>
    </tr>
    <tr>
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155;">Received:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
    </tr>
  `;

  const mailOptions = {
    from: `"Atriowings Contact Form" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: 'New Contact Enquiry - Atriowings',
    html: getEmailHtml('New Contact Enquiry', tableRows),
    attachments: getLogoAttachment()
  };

  await transporter.sendMail(mailOptions);
}

export async function sendGeneralEnquiryNotification(data: QuoteMailData) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('SMTP Config missing. Skipped sending general enquiry email. Data:', data);
    return;
  }

  const tableRows = `
    <tr style="background-color: #f8fafc;">
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; width: 150px; border-bottom: 1px solid #e2e8f0;">Full Name:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0;">${data.name}</td>
    </tr>
    <tr>
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0;">Email:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${data.email}" style="color: #0072ce; text-decoration: none; font-weight: 500;">${data.email}</a></td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0;">Phone Number:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0;">${data.phone || 'N/A'}</td>
    </tr>
    <tr>
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0;">Company Name:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0;">${data.companyName || 'N/A'}</td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0;">Service Requested:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #0072ce; font-weight: bold; border-bottom: 1px solid #e2e8f0;">${data.service}</td>
    </tr>
    <tr>
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0; vertical-align: top;">Message:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0; white-space: pre-wrap; line-height: 1.5;">${data.message}</td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155;">Received:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
    </tr>
  `;

  const mailOptions = {
    from: `"Atriowings General Enquiry" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: 'New Website Enquiry - Atriowings',
    html: getEmailHtml('New Website Enquiry', tableRows),
    attachments: getLogoAttachment()
  };

  await transporter.sendMail(mailOptions);
}

export async function sendCareerApplicationNotification(data: CareerMailData) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('SMTP Config missing. Skipped sending career application email. Data:', data);
    return;
  }

  const tableRows = `
    <tr style="background-color: #f8fafc;">
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; width: 170px; border-bottom: 1px solid #e2e8f0;">Candidate Name:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0; font-weight: bold;">${data.fullName}</td>
    </tr>
    <tr>
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0;">Email Address:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${data.email}" style="color: #0072ce; text-decoration: none; font-weight: 500;">${data.email}</a></td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0;">Phone Number:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0;">${data.phone}</td>
    </tr>
    <tr>
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0;">Position Applied:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #0072ce; font-weight: bold; border-bottom: 1px solid #e2e8f0;">${data.position}</td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0;">Years of Experience:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0;">${data.experience}</td>
    </tr>
    <tr>
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0;">LinkedIn Profile:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0;">
        ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" style="color: #0072ce; text-decoration: none;">${data.linkedin}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}
      </td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0;">Portfolio/GitHub:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0;">
        ${data.portfolio ? `<a href="${data.portfolio}" target="_blank" style="color: #0072ce; text-decoration: none;">${data.portfolio}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}
      </td>
    </tr>
    <tr>
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0; vertical-align: top;">Cover Letter / Message:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0; white-space: pre-wrap; line-height: 1.5;">${data.coverLetter}</td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: 1px solid #e2e8f0;">Application Date:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; color: #475569; border-bottom: 1px solid #e2e8f0;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
    </tr>
    <tr>
      <td style="padding: 14px 18px; font-weight: 600; font-size: 13.5px; color: #334155; border-bottom: none; vertical-align: middle;">Resume Download:</td>
      <td style="padding: 14px 18px; font-size: 13.5px; border-bottom: none;">
        <a href="${data.resumeDownloadUrl}" style="display: inline-block; padding: 8px 16px; background-color: #0072ce; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 12.5px; box-shadow: 0 4px 12px rgba(0, 114, 206, 0.15);" target="_blank">
          <i class="fas fa-download" style="margin-right: 6px;"></i> Download Resume
        </a>
      </td>
    </tr>
  `;

  const mailOptions = {
    from: `"Atriowings Careers" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `New Career Application - ${data.position}`,
    html: getEmailHtml('New Career Application', tableRows),
    attachments: getLogoAttachment()
  };

  await transporter.sendMail(mailOptions);
}

