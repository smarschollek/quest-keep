import { LogoutButton } from "@/components/LogoutButton";
import { QuestCard } from "@/components/QuestCard";
import { getActiveQuests } from "@/utils/db";
import { Stack, Typography } from "@mui/material";

export default async function Dashboard() {

    const activeQuests = await getActiveQuests()

    return (
        <main>
            <Stack padding={2} spacing={3}>
                <Typography variant="h5">Quests </Typography>

                <Stack spacing={2} direction={'row'} overflow={'auto'}>
                    {activeQuests.map(quest => (
                        <QuestCard key={quest.id} quest={quest} />
                    ))}
                </Stack>

                <Typography variant="h5">Sessions </Typography>
            </Stack>
        </main>
    )
}