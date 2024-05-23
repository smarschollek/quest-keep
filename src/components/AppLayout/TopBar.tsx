import { LogoutButton } from "@/components/LogoutButton"
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material"
import Image from "next/image"

export const TopBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Stack spacing={2} direction={'row'} sx={{ flexGrow: 1 }} display={'flex'} alignItems={'center'}>
                    <Image
                        width={50}
                        height={50}
                        src="/logo.svg"
                        alt="QuestKeep Logo"
                    />
                    <Typography variant="h6" component="div">
                        QuestKeep
                    </Typography>
                </Stack>
                <LogoutButton />
            </Toolbar>
        </AppBar>
    )
}