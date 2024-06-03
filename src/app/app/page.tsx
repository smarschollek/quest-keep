import { LogoutButton } from "@/components/LogoutButton";
import { Stack, Typography } from "@mui/material";

export default function Dashboard() {
    return (
        <main>
            <Stack padding={2}>
                <Typography variant="h5">Quests </Typography>
                <Typography variant="h5">Sessions </Typography>
            </Stack>
        </main>
    )
}