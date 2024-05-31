import { State } from "@/types";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const loginUserFormShema = zfd.formData({
    email: zfd.text(z.string().email()),
    password: zfd.text(z.string())
})

export const registerUserFormSchema = zfd.formData({
    username: zfd.text(z.string().min(4, 'Username to short').max(64, 'Username to long')),
    email: zfd.text(z.string().email()),
    password: zfd.text(z.string().min(8, 'Password to short'))
})

export const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const editQuestFormSchema = zfd.formData({
    id: zfd.numeric(z.number().int()),
    name: zfd.text(z.string().min(4, 'Name to short').max(64, 'Name to long')),
    description: zfd.text(z.string().min(4, 'Description to short').optional()),
    place: zfd.numeric(z.number().min(0, 'Place must be selected')),
    status: zfd.numeric(z.number().int()),
})

export const editCharacterFormSchema = zfd.formData({
    id: zfd.numeric(z.number().int()),
    name: zfd.text(z.string().min(4, 'Name to short').max(64, 'Name to long')),
    description: zfd.text(z.string().min(4, 'Description to short').optional()),
    info: zfd.text(z.string().optional())
})

export const editPlaceFormSchema = zfd.formData({
    id: zfd.numeric(z.number().int()),
    name: zfd.text(z.string().min(4, 'Name to short').max(64, 'Name to long')),
    description: zfd.text(z.string().min(4, 'Description to short').optional()),
})

// helper functions

export const convertZodErrorToState = (error: z.ZodError) : State => {
    return {
        status: 'error',
        message: 'Validation error',
        errors: error.errors.map((e) => ({
            path: e.path.join('.'),
            message: e.message
        }))
    }
}