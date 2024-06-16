import { DashboardCard } from "@/components/DashboardCard";
import { EventTimeline } from "@/components/EventTimeline";
import { getActiveQuests } from "@/utils/db";
import { Api } from "@mui/icons-material";
import { Avatar, Grid, List, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Typography } from "@mui/material";

export default async function Dashboard() {

    const activeQuests = await getActiveQuests()

    return (
        <main>
            <Grid container spacing={1} padding={1}>
                <Grid item xs={6} height={400}>
                    <DashboardCard
                        title="Quests"
                    >
                        <List
                            sx={{
                                height: 300,
                                overflow: 'auto',
                                scrollbarWidth: 'thin',
                            }}
                        >
                            {activeQuests.map((quest) => (
                                <ListItemButton key={quest.id} href={`/app/quests/details/${quest.id}`}>
                                    {quest.image ? (
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={quest.name}
                                                src={`uploads/quests/${quest.image}`}
                                                sx={{
                                                    width: 56,
                                                    height: 56
                                                }}
                                            />
                                        </ListItemAvatar>
                                    ) : (
                                        <ListItemAvatar

                                        >
                                            <Avatar
                                                sx={{
                                                    width: 56,
                                                    height: 56,

                                                }}
                                            >
                                                <Api
                                                    htmlColor="white"
                                                    fontSize="large"
                                                />
                                            </Avatar>
                                        </ListItemAvatar>
                                    )}

                                    <ListItemText
                                        secondaryTypographyProps={{
                                            fontSize: 10
                                        }}
                                        primary={quest.name}
                                        secondary={quest.user.name}
                                        sx={{ paddingLeft: 1 }}
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    </DashboardCard>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Stack padding={1}>
                            <Typography variant="h6">Sessions</Typography>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </main >
    )
}