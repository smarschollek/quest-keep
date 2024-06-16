import { QuestCard } from "@/components/QuestCard";
import { SessionDatePicker } from "@/components/SessionDatePicker";
import { getQuestById } from "@/utils/db";
import { Grid, Paper, Stack } from "@mui/material";
import { notFound } from "next/navigation";

export default async function QuestDetailsPage({ params }: { params: { slug: string } }) {
    const quest = await getQuestById(parseInt(params.slug))

    if (!quest || quest.status !== 1) {
        return notFound()
    }

    return (
        <Stack
            padding={1}
            spacing={1}
        >
            <QuestCard quest={quest} />

            {/* <Grid container spacing={1} padding={1}>
                <Grid item xs={6}>
                    
                </Grid>
                <Grid item xs={6}>
                    <Paper
                        sx={{
                            padding: 1,
                        }}
                    >

                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper
                        sx={{
                            padding: 1,
                        }}
                    >
                        <SessionDatePicker />
                    </Paper>
                </Grid>
            </Grid> */}
        </ Stack >
    )
}