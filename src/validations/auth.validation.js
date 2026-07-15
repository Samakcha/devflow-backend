import { z } from "zod";

export const registerSchema = z.object({
    name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters long.")
    .max(50, "Name must not exceed 50 characters."),
    email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email"),
    password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
})
.strict();


export const loginSchema = z.object({
    email: z
            .string()
            .trim()
            .toLowerCase()
            .email("Invalid email"),
    password: z
            .string()
            .min(8, "Password must be at least 8 characters long.")
})
.strict();