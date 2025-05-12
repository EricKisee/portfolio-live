// "use server"

// import { z } from "zod";
// import { formSchema } from "./schema"; 
// import { EmailTemplate } from "@/components/email-template"; 
// import { Resend } from 'resend';
// import { sanityClient } from "@/sanity";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const handleContactForm = async (emailFormdata: z.infer<typeof formSchema>) => {
//   const { firstname, lastname, email, message } = emailFormdata;
//   const createdAt = new Date().toISOString();
//   const name = `${firstname} ${lastname}`;
//   const subject = `New message from ${name}`;

//   const data = {
//     _type: "message",
//     name,
//     email,
//     subject,
//     message,
//     createdAt,
//   };

//   try {
//     // ✅ 1. Save to Sanity
//     await sanityClient.create(data);

//     // ✅ 2. Then send the email
//     const { error } = await resend.emails.send({
//       from: `Eric Kisee <${process.env.RESEND_FROM_EMAIL}>`,
//       to: [email], // You could also send to yourself or a team inbox
//       subject: 'Thanks for contacting us!',
//       react: EmailTemplate({ firstName: firstname }),
//     });

//     if (error) {
//       console.error("Error sending email:", error);
//       throw new Error("Email sending failed.");
//     }

//     return { success: true };

//   } catch (error) {
//     console.error("Contact form error:", error);
//     throw new Error("Something went wrong. Please try again later.");
//   }
// };
