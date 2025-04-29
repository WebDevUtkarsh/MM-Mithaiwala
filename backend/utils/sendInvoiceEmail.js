import nodemailer from 'nodemailer';
import fs from 'fs';

const sendInvoiceEmail = async (toEmail, userName, invoicePath, invoiceId) => {
  try {
    // 1. Configure transporter (use your own email + app password or SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD, // Use App Password (not your real password)
      },
    });

    // 2. Email options
    const mailOptions = {
      from: `"MM Mithaiwala" <${process.env.SMTP_EMAIL}>`,
      to: toEmail,
      subject: `Your Order Invoice (ID: ${invoiceId})`,
      text: `Hello ${userName},\n\nThank you for your order. Please find your invoice attached.`,
      attachments: [
        {
          filename: `Invoice-${invoiceId}.pdf`,
          path: invoicePath,
        },
      ],
    };

    // 3. Send mail
    await transporter.sendMail(mailOptions);
    console.log(`✅ Invoice sent to ${toEmail}`);
  } catch (error) {
    console.error('❌ Failed to send invoice email:', error);
  }
};

export default sendInvoiceEmail;
