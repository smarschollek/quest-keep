"use client"
import { ImageUpload } from "@/components/ImageUpload"
import { AutocompleteOption, State } from "@/types"
import { editQuestFormSchema } from "@/utils/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Autocomplete, Box, Button, Grid, MenuItem, Select, Stack, TextField } from "@mui/material"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { Controller, useForm } from "react-hook-form"

type EditQuestFormValues = {
    id: number
    name: string
    description: string
    place: number
    image?: string
    status: 0 | 1 | 2
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

    const { formState, control, setError, watch } = useForm<EditQuestFormValues>({
        mode: 'all',
        resolver: zodResolver(editQuestFormSchema),
        defaultValues
    })

    useEffect(() => {
        if (state?.status === "success") {
            redirect('/app/quests')
        }

        if (state?.status === "error") {
            state.errors?.forEach((error) => {
                setError(error.path as keyof EditQuestFormValues, { message: error.message })
            })
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

                    <Controller
                        name='status'
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="StatusLabel"
                                id="Status"
                            >
                                <MenuItem value={0}>Planned</MenuItem>
                                <MenuItem value={1}>Active</MenuItem>
                                <MenuItem value={2}>Completed</MenuItem>
                            </Select>
                        )} />
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Box marginTop={2}>
                    <ImageUpload
                        folder="quests"
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
                        href="/app/quests"
                    >
                        Cancel
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    )
}