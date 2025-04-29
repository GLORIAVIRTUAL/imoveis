// src/lib/email.ts
import sgMail from "@sendgrid/mail";

// Ensure you have SENDGRID_API_KEY and SENDGRID_FROM_EMAIL in your .env file
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "YOUR_SENDGRID_API_KEY");
const fromEmail = process.env.SENDGRID_FROM_EMAIL || "noreply@gloriaimoveis.com";

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments?: {
    content: string; // base64 encoded content
    filename: string;
    type: string;
    disposition: string;
  }[];
}

export const sendEmail = async (options: EmailOptions) => {
  const msg = {
    to: options.to,
    from: fromEmail, // Use the verified sender
    subject: options.subject,
    text: options.text,
    html: options.html,
    attachments: options.attachments,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent successfully to ${options.to}`);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    // Log detailed error if available
    if ((error as any).response) {
      console.error((error as any).response.body);
    }
    return { success: false, error };
  }
};

// Example Usage (within an API route):
/*
import { sendEmail } from "@/lib/email";

await sendEmail({
  to: "user@example.com",
  subject: "Bem-vindo à Glória Imóveis!",
  text: "Seu cadastro foi realizado com sucesso.",
  html: "<strong>Seu cadastro foi realizado com sucesso.</strong>",
});
*/

