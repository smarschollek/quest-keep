'use client'
import { register } from "@/app/register/actions"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Button, Card, IconButton, InputAdornment, OutlinedInput, Stack, TextField, Typography } from "@mui/material"
import Image from "next/image"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

export type RegisterFormValues = {
    username: string
    email: string
    password: string
}

export const RegisterForm = () => {

    const { formState, control, handleSubmit } = useForm<RegisterFormValues>(
        {
            mode: 'onChange'
        }
    )
    const { isValid } = formState

    const triggerRegisterServerAction = (values: RegisterFormValues) => {
        register(values.username, values.email, values.password)
    }

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
            <Stack spacing={2} component={'form'} onSubmit={handleSubmit(triggerRegisterServerAction)}>
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
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            placeholder="Username"
                            error={!!formState.errors.username}
                            helperText={formState.errors.username ? 'Username is required' : ' '}
                        />
                    )}
                />

                <Controller
                    name='email'
                    control={control}
                    rules={{
                        required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            placeholder="Email"
                            error={!!formState.errors.email}
                            helperText={formState.errors.email ? 'Invalid email' : ' '}
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
                            helperText={formState.errors.password ? 'Password is required' : ' '}
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