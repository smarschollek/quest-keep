import { LoginForm } from "@/app/login/LoginForm";
import { Box } from "@mui/material";

export default function LoginPage() {
    return (
        <Box
            sx={{
                display: 'grid',
                placeItems: 'center',
                height: '100vh',
            }}
        >
            <LoginForm />
        </Box>
    )
}