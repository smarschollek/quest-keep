import { NavigationDrawer } from "@/components/AppLayout/NavigationDrawer";
import { TopBar } from "@/components/AppLayout/TopBar";
import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren<{}>) {
    return (
        <>
            <TopBar />
            <NavigationDrawer />

            <Box
                sx={{
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