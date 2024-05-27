"use server"

import { auth } from "@/auth"
import { State } from "@/types"
import { createCharacter, deleteCharacters, updateCharacter } from "@/utils/db"
import { editCharacterFormSchema } from "@/utils/validation"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const redirectToUpdateCharacterPage = (id: number) => redirect('/app/characters/edit/' + id)

export const redirectToCreateCharacterPage = () => redirect('/app/characters/add')

export const deleteCharactersAction = async (ids: number[]) => {
    await deleteCharacters(ids)
    revalidatePath('/app/characters')
}

export const createCharacterAction = async (prevState : State, data : FormData) : Promise<State> => {
    
    const {name, description, info } = editCharacterFormSchema.parse(data)
    
    const session = await auth()
    const creatorId = session?.user?.id

    createCharacter(name, description ?? '', info ?? '', creatorId)

    return {
        status: 'success',
        message: 'Character created'
    }
}

export const updateCharacterAction = async (prevState : State, data : FormData) : Promise<State> => {
    
    const {id, name, description, info } = editCharacterFormSchema.parse(data)
    
    const session = await auth()
    const creatorId = session?.user?.id

    updateCharacter(id, name, description ?? '', info ?? '')

    return {
        status: 'success',
        message: 'Character updated'
    }
}