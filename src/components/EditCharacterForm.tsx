"use client"
import { State } from "@/types"
import { editCharacterFormSchema } from "@/utils/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Stack, TextField } from "@mui/material"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { Controller, useForm } from "react-hook-form"

type EditCharacterFormValues = {
    id: number
    name: string
    description: string | null
    info: string | null
}

export type EditCharacterFormProps = {
    action: (prevState: State | null, data: FormData) => Promise<State>
    defaultValues: EditCharacterFormValues
}

export const EditCharacterForm = ({
    action,
    defaultValues
}: EditCharacterFormProps) => {
    const [state, formAction] = useFormState<State, FormData>(action, null)

    const { formState, control, setError } = useForm<EditCharacterFormValues>({
        mode: 'all',
        resolver: zodResolver(editCharacterFormSchema),
        defaultValues
    })

    useEffect(() => {
        if (state?.status === "success") {
            redirect('/app/characters')
        }

        if (state?.status === "error") {
            state.errors?.forEach((error) => {
                setError(error.path as keyof EditCharacterFormValues, { message: error.message })
            })
        }

    }, [setError, state])

    return (
        <Stack component={'form'} action={formAction} spacing={2}>
            <Controller
                name='id'
                control={control}
                render={({ field }) => (<input type="hidden" name={field.name} value={field.value} />)}
            />

            <Controller
                name='name'
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        autoComplete="off"
                        placeholder="Name"
                        error={!!formState.errors.name}
                        helperText={formState.errors.name ? formState.errors.name.message : ' '}
                    />
                )}
            />

            <Controller
                name='description'
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        multiline
                        rows={4}
                        placeholder="Description"
                        error={!!formState.errors.description}
                        helperText={formState.errors.description ? formState.errors.description.message : ' '}
                    />
                )}
            />

            <Controller
                name='info'
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        multiline
                        rows={4}
                        placeholder="Info"
                        error={!!formState.errors.info}
                        helperText={formState.errors.info ? formState.errors.info.message : ' '}
                    />
                )}
            />

            <Button size="large" type="submit" variant="contained" color="primary">
                Submit
            </Button>
            <Button
                size="large"
                variant="contained"
                color="secondary"
                LinkComponent={Link}
                href="/app/characters"
            >
                Cancel
            </Button>
        </Stack>
    )
}