"use server"

import { signIn } from "@/auth"

export const emailLogin = async (formData: any) => {
    await signIn('credentials', formData)
}

