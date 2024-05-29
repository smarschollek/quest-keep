"use server"

import { auth } from "@/auth"
import { State } from "@/types"
import { addQuest, checkIfQuestNameIsFree, deleteQuests, getAllPlaces, getQuestById, updateQUest } from "@/utils/db"
import { convertZodErrorToState, editQuestFormSchema } from "@/utils/validation"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import sharp from "sharp"
import { ZodError } from "zod"

export const redirectToEditQuestAction = (id: number) => {
    redirect('/app/quests/edit/' + id)
}

export const redirectToAddQuestAction = () => {
    redirect('/app/quests/add')
}

export const deleteQuestsAction = async (ids: number[]) => {
    await deleteQuests(ids)
    revalidatePath('/app/quests')
}

export const updateQuestAction = async (prevState: State | null, data : FormData) : Promise<State> => {
    try {
        const { id, description, name, place } = editQuestFormSchema.parse(data)

        const oldQuest = await getQuestById(id)

        if(!oldQuest) {
            return {
                status: 'error',
                message: 'Quest not found'
            }
        }

        const isNameFree = await checkIfQuestNameIsFree(name)
        if(!isNameFree && oldQuest.name !== name) {
            return {
                status: 'error',
                message: 'Name is already in use',
                errors: [{
                    path: 'name',
                    message: 'Name is already in use'
                }]
            }
        }

        let imageName = oldQuest.image
        const image = data.get('image') as File

        if(image) {
            const hasImageChanged = image && image.name !== 'undefined'
         
            if(hasImageChanged) {
                const buffer = await image.arrayBuffer()
                await sharp(buffer, { failOnError: false }).toFile(`./public/uploads/quests/${image.name}`)
                imageName = image.name
            }
        }

        await updateQUest(
            id,
            name,
            description ?? '',
            place,
            imageName ?? ''
        )

        return {
            status: 'success',
            message: 'Quest updated'
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

export const createQuestAction = async (prevState: State | null, data : FormData) : Promise<State> => {
    try {
        const { description, name, place } = editQuestFormSchema.parse(data)

        const session = await auth()
        
        const isNameFree = await checkIfQuestNameIsFree(name)
        if(!isNameFree) {
            return {
                status: 'error',
                message: 'Name is already in use',
                errors: [{
                    path: 'name',
                    message: 'Name is already in use'
                }]
            }
        }

        const image = data.get('image') as File

        await addQuest(
            name,
            description ?? '',
            place,
            parseInt(session?.user?.id),
            image?.name ?? ''
        )

        if(image) {
            const buffer = await image.arrayBuffer()
            await sharp(buffer, { failOnError: false }).toFile(`./public/uploads/quests/${image.name}`)
        }

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