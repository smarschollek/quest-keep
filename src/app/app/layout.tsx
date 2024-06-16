import { auth } from "@/auth";
import { NavigationDrawer } from "@/components/AppLayout/NavigationDrawer";
import { TopBar } from "@/components/AppLayout/TopBar";
import { Box, Container } from "@mui/material";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AppLayout({ children }: PropsWithChildren<{}>) {
    const session = await auth()
    if (!session) redirect('/login')

    return (
        <>
            <TopBar />
            <NavigationDrawer />

            <Box
                sx={{
                    maxWidth: '1200px',
                    marginLeft: 30,
                    height: 'calc(100vh - 64px)',
                    overflow: 'hidden',
                }}
            >
                {children}
            </Box>


        </>
    )
}