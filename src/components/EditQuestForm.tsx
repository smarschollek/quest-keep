"use client"
import { AutocompleteOption, State } from "@/types"
import { editQuestFormSchema } from "@/utils/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Autocomplete, Button, Stack, TextField } from "@mui/material"
import { redirect } from "next/navigation"
import { use, useEffect } from "react"
import { useFormState } from "react-dom"
import { Controller, useForm } from "react-hook-form"

type EditQuestFormValues = {
    name: string
    description: string
    place: number
}

export type EditQuestFormProps = {
    action: (prevState: State | null, data: FormData) => Promise<State>
    placeOptions: AutocompleteOption[]
    defaultValues: EditQuestFormValues
}

export const EditQuestForm = ({
    action,
    defaultValues,
    placeOptions
}: EditQuestFormProps) => {
    const [state, formAction] = useFormState<State, FormData>(action, null)

    const { formState, control, setError } = useForm<EditQuestFormValues>({
        mode: 'all',
        resolver: zodResolver(editQuestFormSchema),
        defaultValues
    })

    useEffect(() => {
        if (state?.status === "success") {
            redirect('/app/quests')
        }
    }, [state])

    return (
        <Stack component={'form'} action={formAction} spacing={2}>
            <Controller
                name='name'
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
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
                name='place'
                control={control}
                render={({ field }) => (
                    <>
                        <input type="hidden" name={field.name} value={field.value} />
                        <Autocomplete
                            options={placeOptions}
                            value={placeOptions.find((option) => option.value === field.value)}
                            onChange={(e, value) => field.onChange(value?.value || null)}
                            renderInput={(params) => <TextField {...params} placeholder="Place" />}
                        />
                    </>
                )}
            />

            <Button
                type="submit"
                variant="contained"
                disabled={!formState.isValid}
            >
                Submit
            </Button>

            <>{JSON.stringify(formState)}</>
        </Stack>
    )
}