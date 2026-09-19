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

const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_TO || process.env.SMTP_USER || 'info@techghuru.in';

// Reusable premium wrapper for the email HTML in a trending dashboard-style layout
function getEmailHtml(title: string, category: string, tableRowsHtml: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; padding: 40px 10px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
              
              <!-- Decorative Top Glowing Accent -->
              <tr style="height: 6px; background: linear-gradient(90deg, #F97316, #49200B, #49200B);">
                <td style="height: 6px; line-height: 1; font-size: 1px;">&nbsp;</td>
              </tr>
              
              <!-- Header Section -->
              <tr style="background-color: #0b1e3f;">
                <td style="padding: 28px 32px; text-align: center;">
                  <img src="cid:techghuruLogo" alt="Tech Ghuru" style="height: 40px; width: auto; display: block; margin: 0 auto 12px auto;" />
                  <h1 style="color: #ffffff; font-size: 21px; font-weight: 700; margin: 0; letter-spacing: -0.2px;">${title}</h1>
                  <span style="display: inline-block; background-color: rgba(249, 115, 22, 0.18); color: #49200B; border: 1px solid rgba(249, 115, 22, 0.3); border-radius: 50px; padding: 4px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-top: 10px; letter-spacing: 0.5px;">
                    ${category}
                  </span>
                </td>
              </tr>
              
              <!-- Content Section -->
              <tr>
                <td style="padding: 32px 32px 24px 32px;">
                  <p style="margin: 0 0 20px 0; color: #64748b; font-size: 14.5px; line-height: 1.6; text-align: left;">
                    Hello Admin, a new submission was received on the Tech Ghuru portal:
                  </p>
                  
                  <!-- Metadata Card Table -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: separate; border-spacing: 0; margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
                    ${tableRowsHtml}
                  </table>
                  
                  <p style="margin: 0; color: #94a3b8; font-size: 11.5px; line-height: 1.5; text-align: center;">
                    This is an automated notification. Please log into the portal to manage applications.
                  </p>
                </td>
              </tr>
              
              <!-- Footer Section -->
              <tr style="background-color: #f8fafc; border-top: 1px solid #f1f5f9;">
                <td style="padding: 20px 32px; text-align: center;">
                  <p style="margin: 0 0 4px 0; color: #334155; font-size: 13px; font-weight: 700;">Tech Ghuru</p>
                  <p style="margin: 0; color: #94a3b8; font-size: 11px; line-height: 1.4;">No. 1, Gurudev Complex, 57th St, Venkatraman Nagar, Korattur, Chennai - 600 080.</p>
                  <p style="margin: 12px 0 0 0; color: #cbd5e1; font-size: 10px;">© ${new Date().getFullYear()} Tech Ghuru. All rights reserved.</p>
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
    path: path.join(process.cwd(), 'public/img/techghuru white logo.png'),
    cid: 'techghuruLogo'
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
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; width: 140px; border-bottom: 1px solid #edf2f7;">Full Name</td>
      <td style="padding: 15px 20px; font-size: 14px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #edf2f7;">${data.name}</td>
    </tr>
    <tr>
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7;">Email</td>
      <td style="padding: 15px 20px; font-size: 14px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${data.email}" style="color: #49200B; text-decoration: none; font-weight: 600;">${data.email}</a></td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7;">Phone</td>
      <td style="padding: 15px 20px; font-size: 14px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #edf2f7;">${data.mobile}</td>
    </tr>
    <tr>
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7;">Subject</td>
      <td style="padding: 15px 20px; font-size: 14px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #edf2f7;">${data.subject}</td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7; vertical-align: top;">Message</td>
      <td style="padding: 15px 20px; font-size: 13.5px; color: #334155; line-height: 1.5; border-bottom: 1px solid #edf2f7; white-space: pre-wrap;">${data.message}</td>
    </tr>
    <tr>
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Received At</td>
      <td style="padding: 15px 20px; font-size: 13px; color: #64748b; font-weight: 500;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
    </tr>
  `;

  const mailOptions = {
    from: `"Tech Ghuru Contact Form" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: 'New Contact Enquiry - Tech Ghuru',
    html: getEmailHtml('New Contact Enquiry', 'Contact Enquiry', tableRows),
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
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; width: 140px; border-bottom: 1px solid #edf2f7;">Full Name</td>
      <td style="padding: 15px 20px; font-size: 14px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #edf2f7;">${data.name}</td>
    </tr>
    <tr>
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7;">Email</td>
      <td style="padding: 15px 20px; font-size: 14px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${data.email}" style="color: #49200B; text-decoration: none; font-weight: 600;">${data.email}</a></td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7;">Phone</td>
      <td style="padding: 15px 20px; font-size: 14px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #edf2f7;">${data.phone || 'N/A'}</td>
    </tr>
    <tr>
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7;">Company</td>
      <td style="padding: 15px 20px; font-size: 14px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #edf2f7;">${data.companyName || 'N/A'}</td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7;">Service</td>
      <td style="padding: 15px 20px; font-size: 14px; color: #49200B; font-weight: bold; border-bottom: 1px solid #edf2f7;">${data.service}</td>
    </tr>
    <tr>
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7; vertical-align: top;">Message</td>
      <td style="padding: 15px 20px; font-size: 13.5px; color: #334155; line-height: 1.5; border-bottom: 1px solid #edf2f7; white-space: pre-wrap;">${data.message}</td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Received At</td>
      <td style="padding: 15px 20px; font-size: 13px; color: #64748b; font-weight: 500;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
    </tr>
  `;

  const mailOptions = {
    from: `"Tech Ghuru General Enquiry" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: 'New Website Enquiry - Tech Ghuru',
    html: getEmailHtml('New Website Enquiry', 'Quote request', tableRows),
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
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; width: 150px; border-bottom: 1px solid #edf2f7;">Candidate</td>
      <td style="padding: 15px 20px; font-size: 14px; color: #0f172a; font-weight: 700; border-bottom: 1px solid #edf2f7;">${data.fullName}</td>
    </tr>
    <tr>
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7;">Email</td>
      <td style="padding: 15px 20px; font-size: 14px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${data.email}" style="color: #49200B; text-decoration: none; font-weight: 600;">${data.email}</a></td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7;">Phone</td>
      <td style="padding: 15px 20px; font-size: 14px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #edf2f7;">${data.phone}</td>
    </tr>
    <tr>
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7;">Position</td>
      <td style="padding: 15px 20px; font-size: 14px; color: #49200B; font-weight: bold; border-bottom: 1px solid #edf2f7;">${data.position}</td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7;">Experience</td>
      <td style="padding: 15px 20px; font-size: 14px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #edf2f7;">${data.experience}</td>
    </tr>
    <tr>
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7;">LinkedIn</td>
      <td style="padding: 15px 20px; font-size: 13.5px; border-bottom: 1px solid #edf2f7;">
        ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" style="color: #49200B; text-decoration: none; font-weight: 600;">View Profile →</a>` : '<span style="color: #cbd5e1; font-weight: 500;">Not provided</span>'}
      </td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7;">Portfolio/GitHub</td>
      <td style="padding: 15px 20px; font-size: 13.5px; border-bottom: 1px solid #edf2f7;">
        ${data.portfolio ? `<a href="${data.portfolio}" target="_blank" style="color: #49200B; text-decoration: none; font-weight: 600;">View Portfolio →</a>` : '<span style="color: #cbd5e1; font-weight: 500;">Not provided</span>'}
      </td>
    </tr>
    <tr>
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7; vertical-align: top;">Cover Letter</td>
      <td style="padding: 15px 20px; font-size: 13.5px; color: #334155; line-height: 1.5; border-bottom: 1px solid #edf2f7; white-space: pre-wrap;">${data.coverLetter}</td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #edf2f7;">Applied On</td>
      <td style="padding: 15px 20px; font-size: 13px; color: #64748b; font-weight: 500; border-bottom: 1px solid #edf2f7;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
    </tr>
    <tr>
      <td style="padding: 15px 20px; font-weight: 600; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: none; vertical-align: middle;">Resume File</td>
      <td style="padding: 15px 20px; border-bottom: none;">
        <a href="${data.resumeDownloadUrl}" style="display: inline-block; padding: 10px 22px; background: linear-gradient(135deg, #F97316 0%, #49200B 100%); color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(249, 115, 22, 0.25);" target="_blank">
          <i class="fas fa-download" style="margin-right: 6px;"></i> Download Resume
        </a>
      </td>
    </tr>
  `;

  const mailOptions = {
    from: `"Tech Ghuru Careers" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `New Career Application - ${data.position}`,
    html: getEmailHtml('New Career Application', 'Job Application', tableRows),
    attachments: getLogoAttachment()
  };

  await transporter.sendMail(mailOptions);
}


