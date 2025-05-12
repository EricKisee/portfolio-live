import { z } from "zod";

export const formSchema = z.object({
    firstname: z.string().min(2, { message: "First name is required" }),
    lastname: z.string().min(2, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    message: z.string().min(10, { message: "Message is required" }),
})
