import nodemailer from 'nodemailer';

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

export async function sendContactNotification(data: ContactMailData) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('SMTP Config missing. Skipped sending contact email. Data:', data);
    return;
  }

  const mailOptions = {
    from: `"Atriowings Contact Form" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: 'New Contact Enquiry - Atriowings',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #008CFF; border-bottom: 2px solid #008CFF; padding-bottom: 10px; margin-top: 0;">New Contact Enquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px; font-weight: bold; width: 150px; border: 1px solid #e2e8f0;">Full Name:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Email:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Phone:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${data.mobile}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Subject:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">${data.subject}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Message:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${data.message}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Submission Date:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
          </tr>
        </table>
      </div>`,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendGeneralEnquiryNotification(data: QuoteMailData) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('SMTP Config missing. Skipped sending general enquiry email. Data:', data);
    return;
  }

  const mailOptions = {
    from: `"Atriowings General Enquiry" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: 'New Website Enquiry - Atriowings',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #008CFF; border-bottom: 2px solid #008CFF; padding-bottom: 10px; margin-top: 0;">New Website Enquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px; font-weight: bold; width: 170px; border: 1px solid #e2e8f0;">Full Name:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Email:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Phone Number:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${data.phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Company Name:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${data.companyName || 'N/A'}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Service Interested In:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold; color: #008CFF;">${data.service}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Message:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${data.message}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Submission Date:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
          </tr>
        </table>
      </div>`,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendCareerApplicationNotification(data: CareerMailData) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('SMTP Config missing. Skipped sending career application email. Data:', data);
    return;
  }

  const mailOptions = {
    from: `"Atriowings Careers" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `New Career Application - ${data.position}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #008CFF; border-bottom: 2px solid #008CFF; padding-bottom: 10px; margin-top: 0;">New Career Application</h2>
        <p>A new application has been submitted on the Atriowings Careers portal:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px; font-weight: bold; width: 180px; border: 1px solid #e2e8f0;">Candidate Name:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">${data.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Email Address:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Phone Number:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Position Applied:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; color: #008CFF; font-weight: bold;">${data.position}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Years of Experience:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${data.experience}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">LinkedIn Profile:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">
              ${data.linkedin ? `<a href="${data.linkedin}" target="_blank">${data.linkedin}</a>` : 'Not provided'}
            </td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Portfolio/GitHub:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">
              ${data.portfolio ? `<a href="${data.portfolio}" target="_blank">${data.portfolio}</a>` : 'Not provided'}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Cover Letter / Message:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${data.coverLetter}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0;">Application Date:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #e2e8f0; color: #008CFF;">Secure Resume Link:</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">
              <a href="${data.resumeDownloadUrl}" style="display: inline-block; padding: 6px 14px; background-color: #008CFF; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;" target="_blank">
                Download Candidate Resume
              </a>
            </td>
          </tr>
        </table>
      </div>`,
  };

  await transporter.sendMail(mailOptions);
}
