
import { sanityClient } from "@/sanity";
import type { NextApiRequest, NextApiResponse } from 'next';
// /pages/api/verify.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { token }  = req.query;

    if (!token || Array.isArray(token)) {
    return res.status(400).json({ message: "Invalid token" });
    }

  const user = await sanityClient.fetch(
    `*[_type == "user" && token == $token && !isVerified][0]`,
    { token: token as string }
  );

  if (!user || new Date(user.expiresAt) < new Date()) {
    return res.status(400).json({ message: "Token expired or invalid" });
  }

  await sanityClient
    .patch(user._id)
    .set({ isVerified: true, token: null })
    .commit();

  return res.status(200).json({ message: "Email verified successfully!" });
}
