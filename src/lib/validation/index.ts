import * as z from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, { message: "Too Short" }),
    username: z.string().min(2, { message: "Too Short" }),
    email: z.string().email(),
    passcode: z.string().min(8, { message: "passcode must be atleast 8 characters." }),
})

export const SigninValidation = z.object({
    email: z.string().email(),
    passcode: z.string().min(8, { message: "passcode must be atleast 8 characters." }),
})

export const ProfileValidation = z.object({
    file: z.custom<File[]>(),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    bio: z.string(),
});