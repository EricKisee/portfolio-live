// pages/api/subscribe.ts
import { sanityClient } from "@/sanity";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email } = schema.parse(req.body);

    const existing = await sanityClient.fetch(
      `*[_type == "newsletterSubscriber" && email == $email][0]`,
      { email }
    );

    if (existing) {
      if (existing.isActive) {
        return res.status(200).json({ message: "Already subscribed." });
      }

      await sanityClient.patch(existing._id).set({ isActive: true }).commit();
      return res.status(200).json({ message: "Subscription reactivated." });
    }

    await sanityClient.create({
      _type: "newsletterSubscriber",
      email,
      subscribedAt: new Date().toISOString(),
      isActive: true,
    });

    res.status(200).json({ message: "Successfully subscribed!" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid email or server error." });
  }
}
// This code handles the subscription to a newsletter. It checks if the email is already subscribed, and if not, it creates a new subscriber in the Sanity database. If the email is already subscribed but inactive, it reactivates the subscription.
// It uses Zod for schema validation and Sanity client for database operations. The handler function responds with appropriate messages based on the subscription status.
// The code is structured to handle POST requests only, and it returns a 405 status for other methods. It also handles errors gracefully, returning a 400 status for invalid email or server errors.
// The schema validation ensures that the email format is correct before proceeding with the database operations. The use of async/await allows for clean and readable asynchronous code, making it easy to follow the flow of data and error handling.
// The code is designed to be used in a Next.js API route, making it easy to integrate into a larger application. It can be further extended to include features like email confirmation or unsubscribe functionality if needed.
// The code is efficient and follows best practices for API development, ensuring that it is maintainable and scalable for future enhancements. 