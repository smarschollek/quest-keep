import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material"
import Image from "next/image"

export const LoginForm = () => {
    return (
        <Card
            elevation={2}
            sx={{
                padding: 3,
                width: 400,
            }}
        >
            <Stack spacing={2}>
                <Box
                    display={'flex'}
                    justifyContent={'center'}
                >
                    <Image
                        alt="QuestKeep Logo"
                        src='/quest-keep.png'
                        width={212}
                        height={212}
                    />
                </Box>

                <Typography align="center" variant="h6">
                    Login
                </Typography>

                <TextField id='email-input' label='Email' />
                <TextField id='password-input' label='Password' />

                <Button variant="contained" size="large">
                    Login
                </Button>
                <Button href="/register" color='secondary' variant="contained" size="large">
                    Register
                </Button>
            </Stack>
        </Card >
    )
}