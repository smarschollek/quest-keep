"use server"

import { deletePlaces } from "@/utils/db"
import { revalidatePath } from "next/cache"

export const deletePlacesAction = async (ids: number[]) => {
    await deletePlaces(ids)
    revalidatePath('/app/places')
}