"use server"

import { deleteQuests } from "@/utils/db"
import { revalidatePath } from "next/cache"

export const deleteQuestsAction = async (ids: number[]) => {
    await deleteQuests(ids)
    revalidatePath('/app/quests')
}