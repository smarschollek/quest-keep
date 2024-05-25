"use server"

import { auth } from "@/auth"
import { State } from "@/types"
import { addQuest, deleteQuests, getAllPlaces } from "@/utils/db"
import { convertZodErrorToState, editQuestFormSchema } from "@/utils/validation"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { ZodError } from "zod"

export const redirectToAddQuestAction = () => {
    redirect('/app/quests/add')
}

export const deleteQuestsAction = async (ids: number[]) => {
    await deleteQuests(ids)
    revalidatePath('/app/quests')
}

export const createQuestAction = async (prevState: State | null, data : FormData) : Promise<State> => {
    
    try {
        const { description, name, place } = editQuestFormSchema.parse(data)

        const session = await auth()
        
        await addQuest(
            name,
            description,
            place,
            parseInt(session?.user?.id)
        )

        return {
            status: 'success',
            message: 'Quest created'
        }
    } catch (error) {
        if(error instanceof ZodError) {
            return convertZodErrorToState(error)
        }

        return {
            status: 'error',
            message: 'An error occurred'
        }   
    }
    
}

export const getPlacesAsOptionsAction = async () : Promise<{id: number, name: string}[]> => {
    const places = await getAllPlaces()
    return places.map(place => ({id: place.id, name: place.name}))
}