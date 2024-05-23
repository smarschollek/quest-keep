'use client'
import { State, registerNewUser } from "@/app/register/actions"
import { registerUserFormSchema } from "@/utils/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Button, Card, IconButton, InputAdornment, OutlinedInput, Stack, TextField, Typography } from "@mui/material"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { Controller, useForm } from "react-hook-form"

export type RegisterFormValues = {
    username: string
    email: string
    password: string
}

export const RegisterForm = () => {

    const [state, formAction] = useFormState<State, FormData>(registerNewUser, null)

    const { formState, control, setError } = useForm<RegisterFormValues>(
        {
            mode: 'all',
            resolver: zodResolver(registerUserFormSchema)
        }
    )

    const { isValid } = formState

    useEffect(() => {
        if (!state) {
            return;
        }

        if (state.status === "error") {
            state.errors?.forEach(error => {
                setError(error.path as keyof RegisterFormValues, { message: error.message })
            })
        }

        if (state.status === "success") {
            alert(state.message);
        }
    }, [setError, state]);

    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (

        <Card
            elevation={2}
            sx={{
                padding: 3,
                width: 400,
            }}
        >
            <Stack spacing={2} component={'form'} action={formAction}>
                <Box
                    display={'flex'}
                    justifyContent={'center'}
                >
                    <Image
                        alt="QuestKeep Logo"
                        src='/logo.svg'
                        width={212}
                        height={212}
                    />
                </Box>
                <Typography align="center" variant="h6">
                    Register
                </Typography>

                <Controller
                    name='username'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            placeholder="Username"
                            error={!!formState.errors.username}
                            helperText={formState.errors.username ? formState.errors.username.message : ' '}
                        />
                    )}
                />

                <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            placeholder="Email"
                            error={!!formState.errors.email}
                            helperText={formState.errors.email ? formState.errors.email.message : ' '}
                        />
                    )}
                />

                <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            placeholder="Password"
                            type={showPassword ? 'text' : 'password'}
                            helperText={formState.errors.password ? formState.errors.password.message : ' '}
                            error={!!formState.errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={toggleShowPassword}
                                            onMouseDown={toggleShowPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />

                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={!isValid}
                >
                    Register
                </Button>
            </Stack>
        </Card >
    )
}   