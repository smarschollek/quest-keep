"use client"
import { ImageUpload } from "@/components/ImageUpload"
import { State } from "@/types"
import { editPlaceFormSchema } from "@/utils/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Grid, Link, Stack, TextField } from "@mui/material"
import { redirect } from "next/navigation"

import { useEffect } from "react"
import { useFormState } from "react-dom"
import { Controller, useForm } from "react-hook-form"

type EditPlaceFormValues = {
    id: number
    name: string
    description: string
    image?: string
}

export type EditPlaceFormProps = {
    defaultValues: EditPlaceFormValues
    action: (prevState: State | null, data: FormData) => Promise<State>
}

export const EditPlaceForm = ({ defaultValues, action }: EditPlaceFormProps) => {
    const [state, formAction] = useFormState<State, FormData>(action, null)

    const { control, formState, setError } = useForm<EditPlaceFormValues>({
        mode: 'all',
        resolver: zodResolver(editPlaceFormSchema),
        defaultValues
    })

    useEffect(() => {
        if (state) {
            if (state.status === 'success') {
                redirect('/app/places')
            }

            if (state.status === 'error') {
                state.errors?.forEach(error => {
                    setError(error.path as keyof EditPlaceFormValues, { message: error.message })
                })
            }
        }
    }, [setError, state])

    return (
        <Grid container component={'form'} action={formAction} spacing={2}>
            <Grid item xs={6}>
                <Stack spacing={2}>
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
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Box marginTop={2}>
                    <ImageUpload
                        folder='places'
                        imageName={defaultValues?.image ?? undefined}
                    />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={2}>
                    <hr />
                    <Button
                        size="large"
                        type="submit"
                        variant="contained"
                        disabled={!formState.isValid}
                    >
                        Submit
                    </Button>
                    <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                        LinkComponent={Link}
                        href="/app/places"
                    >
                        Cancel
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    )
}