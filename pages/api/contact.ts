import { z } from "zod";
import { formSchema } from "@/utils/schema";
import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";
import { sanityClient } from "@/sanity";
import type { NextApiRequest, NextApiResponse } from 'next';


const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const emailFormdata = formSchema.parse(req.body);

    const { firstname, lastname, email, message } = emailFormdata;
    const createdAt = new Date().toISOString();
    const name = `${firstname} ${lastname}`;
    const subject = `New message from ${name}`;

    const data = {
      _type: "message",
      name,
      email,
      subject,
      message,
      createdAt,
    };

    // Save to Sanity
    await sanityClient.create(data);

    // Send email
    const { error } = await resend.emails.send({
      from: `Eric Kisee <${process.env.RESEND_FROM_EMAIL}>`,
      to: [email],
      subject: "Thanks for contacting us!",
      react: EmailTemplate({ 
        firstName: firstname,
        verificationLink: 'https://example.com/verify',
        newsletterLink: 'https://example.com/newsletter',
        servicesLink: 'https://example.com/services',
      }),
    });

    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Email failed to send." });
    }

    res.status(200).json({ success: true });

  } catch (err) {
    console.error("Contact form submission failed:", err);
    res.status(400).json({ message: "Invalid input or server error." });
  }
}
