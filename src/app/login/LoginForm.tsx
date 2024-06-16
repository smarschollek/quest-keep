"use client"
import { State } from "@/types"
import { loginUser } from "@/actions/authActions"
import { loginFormSchema } from "@/utils/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { VisibilityOff, Visibility } from "@mui/icons-material"
import { Alert, Box, Button, Card, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import Image from "next/image"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { Controller, useForm } from "react-hook-form"

type LoginFormValues = {
    email: string
    password: string
}

export const LoginForm = () => {

    const [state, formAction] = useFormState<State, FormData>(loginUser, null)

    const { formState, control } = useForm<LoginFormValues>({
        mode: 'all',
        resolver: zodResolver(loginFormSchema)
    })
    const { isValid } = formState

    const [showPassword, setShowPassword] = useState(false)
    const [showError, setShowError] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        if (!state) {
            return;
        }

        if (state.status === "error") {
            setShowError(true)
        }

        if (state.status === "success") {
            redirect('/app')
        }
    }, [state])

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
                    Login
                </Typography>

                <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            placeholder="Email"
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

                {showError && (
                    <Alert severity="error">
                        Invalid Email or Password
                    </Alert>
                )}


                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={!isValid}
                >
                    Login
                </Button>
                <Button href="/register" color='secondary' variant="contained" size="large">
                    Register
                </Button>
            </Stack>
        </Card >
    )
}