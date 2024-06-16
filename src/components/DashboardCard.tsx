import { Api } from "@mui/icons-material"
import { Paper, Stack, Typography, List, ListItemButton, ListItemAvatar, Avatar, ListItemText } from "@mui/material"
import { PropsWithChildren } from "react"

export type DashboardCardProps = {
    title: string
}

export const DashboardCard = (
    { children, title }: PropsWithChildren<DashboardCardProps>
) => {
    return (
        <Paper>
            <Stack spacing={1} padding={1}>
                <Typography variant="h6">{title}</Typography>
                <Stack>
                    {children}
                </Stack>
            </Stack>
        </Paper>
    )
}