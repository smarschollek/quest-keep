import { z } from "zod";
import { zfd } from "zod-form-data";

export const registerUserFormSchema = zfd.formData({
    username: zfd.text(z.string().min(4, 'Username to short').max(64, 'Username to long')),
    email: zfd.text(z.string().email()),
    password: zfd.text(z.string().min(8, 'Password to short'))
})

export const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string()
})