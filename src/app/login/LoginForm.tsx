"use client"
import { emailLogin } from "@/utils/session"
import { VisibilityOff, Visibility } from "@mui/icons-material"
import { Box, Button, Card, IconButton, InputAdornment, OutlinedInput, Stack, TextField, Typography } from "@mui/material"
import Image from "next/image"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

type LoginFormValues = {
    email: string
    password: string
}

export const LoginForm = () => {

    const { formState, control, handleSubmit } = useForm<LoginFormValues>()
    const { isValid } = formState

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
            <Stack spacing={2} component={'form'} action={emailLogin}>
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
                    rules={{
                        required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                    }}
                    render={({ field }) => (
                        <OutlinedInput
                            {...field}
                            placeholder="Email"
                            error={!!formState.errors.email}
                        />
                    )}
                />

                <Controller
                    name='password'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            placeholder="Password"
                            type={showPassword ? 'text' : 'password'}
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
                    Login
                </Button>
                <Button href="/register" color='secondary' variant="contained" size="large">
                    Register
                </Button>
            </Stack>
        </Card >
    )
}