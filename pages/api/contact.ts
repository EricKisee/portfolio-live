import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from "zod";
import { formSchema } from "@/utils/schema";
import { sanityClient } from "@/sanity";
import { EmailTemplate } from "@/components/email-template";
// import { VerifiedUserEmailTemplate } from "@/components/verified-user-template"; // You’ll need to make this
import { Resend } from "resend";
import { v4 as uuidv4 } from 'uuid';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const emailFormdata = formSchema.parse(req.body);
    const { firstname, lastname, email, message } = emailFormdata;

    const normalizedEmail = email.trim().toLowerCase();
    const name = `${firstname} ${lastname}`;
    const subject = `New message from ${name}`;
    const createdAt = new Date().toISOString();
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

    // Always save message
    await sanityClient.create({
      _type: "message",
      name,
      email: normalizedEmail,
      subject,
      message,
      createdAt,
    });

    // Lookup user
    const existingUser = await sanityClient.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email: normalizedEmail }
    );

    let emailSubject = "Thanks for contacting us!";
    let emailContent;

    if (existingUser) {
      if (existingUser.isVerified) {
        // ✅ Already verified
        emailSubject = "Welcome back!";
        emailContent = EmailTemplate({
          firstName: firstname,
          verificationLink: '',
          newsletterLink: `${process.env.NEXT_PUBLIC_BASE_URL}/newsletter`,
          servicesLink: `${process.env.NEXT_PUBLIC_BASE_URL}/services`,
        });
      } else {
        // ❌ Not yet verified: update token ------
        await sanityClient
          .patch(existingUser._id)
          .set({ token, createdAt, expiresAt })
          .commit();

        emailContent = EmailTemplate({
          firstName: firstname,
          verificationLink: `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify?token=${token}`,
          newsletterLink: `${process.env.NEXT_PUBLIC_BASE_URL}/newsletter`,
          servicesLink: `${process.env.NEXT_PUBLIC_BASE_URL}/services`,
        });
      }
    } else {
      // 🆕 New user
      await sanityClient.create({
        _type: "user",
        name,
        email: normalizedEmail,
        token,
        isVerified: false,
        createdAt,
        expiresAt,
      });

      emailContent = EmailTemplate({
        firstName: firstname,
        verificationLink: `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify?token=${token}`,
        newsletterLink: `${process.env.NEXT_PUBLIC_BASE_URL}/newsletter`,
        servicesLink: `${process.env.NEXT_PUBLIC_BASE_URL}/services`,
      });
    }

    // ✅ Always send email
    const { error } = await resend.emails.send({
      from: `Eric Kisee <${process.env.RESEND_FROM_EMAIL}>`,
      to: [normalizedEmail],
      subject: emailSubject,
      react: emailContent,
    });

    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email." });
    }

    return res.status(200).json({ success: true, message: "Email sent." });

  } catch (err) {
    console.error("Submission error:", err);
    return res.status(400).json({ message: "Invalid input or internal error." });
  }
}
