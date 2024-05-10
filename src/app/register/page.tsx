import { RegisterForm } from "@/app/register/RegisterForm";
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
            <RegisterForm />
        </Box>
    )
}