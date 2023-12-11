import * as z from "zod"

export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Name provided is too short." }),
  username: z.string().min(2, { message: "Username provided is too short." }).max(50),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." })
})
