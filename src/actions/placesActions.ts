"use server"
import { auth } from "@/auth";
import { State } from "@/types";
import { addPlace, checkIfPlaceNameIsFree, getPlaceById, updatePlace } from "@/utils/db";
import { saveImage } from "@/utils/image";
import { convertZodErrorToState, editPlaceFormSchema } from "@/utils/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

export const redirectToEditPlacePageAction = (id: number) => redirect(`/app/places/edit/${id}`)

export const redirectToAddPlacePageAction = () => redirect('/app/places/add')

export const createPlaceAction = async (prevState: State | null, data: FormData) : Promise<State> => {
    try {
        const { name, description} = editPlaceFormSchema.parse(data)

        const isNameFree = await checkIfPlaceNameIsFree(name)
        if(isNameFree === false) {
            return {
                status: 'error',
                message: 'Name is already in use',
                errors: [{
                    path: 'name',
                    message: 'Name is already in use'
                }]
            }
        }

        const imageName = await saveImage({
            image: data.get('image') as File,
            folder: 'places',
            changed: true
        })

        const session = await auth()
        const userId = parseInt(session?.user.id)

        addPlace({
            name, 
            description: description ?? '', 
            image: imageName, 
            userId
        })

        revalidatePath('/app/places')

        return {
            status: 'success',
            message: 'Place created',
        }
    } catch (error) {
        if(error instanceof ZodError) {
            return convertZodErrorToState(error)
        }
        
        return {
            status: 'error',
            message: 'Error creating place',
            errors: []
        }   
    }
}

export const updatePlaceAction = async (prevState: State | null, data: FormData) : Promise<State> => {
    try {
        const { id, name, description} = editPlaceFormSchema.parse(data)

        const oldPlace = await getPlaceById(id)

        if(!oldPlace) {
            return {
                status: 'error',
                message: 'Place not found',
            }
        }

        const imageChanged = data.get('imageChanged') === 'on'
        const imageName = await saveImage({
            image: data.get('image') as File,
            folder: 'places',
            oldImageName: oldPlace.image ?? undefined,
            changed: imageChanged
       })

        updatePlace(id, {
            name, 
            description: description ?? '', 
            image: imageName
        })

        revalidatePath('/app/places')

        return {
            status: 'success',
            message: 'Place updated',
        }
    } catch (error) {
        if(error instanceof ZodError) {
            return convertZodErrorToState(error)
        }
        
        return {
            status: 'error',
            message: 'Error updating place',
            errors: []
        }   
    }
}