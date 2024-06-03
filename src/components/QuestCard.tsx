import { Box, Button, Card, CardActions, CardContent, Paper, Stack, Typography } from "@mui/material"
import { Quest } from "../../db/schema"
import { Api } from "@mui/icons-material"

export const QuestCard = ({ quest }: { quest: Quest }) => {
    return (
        <Card>
            <CardContent component={Stack} spacing={2} width={400} height={200}>
                <Stack
                    direction={'row'}
                    spacing={2}
                >
                    <Box
                        height={64}
                        width={64}
                        borderRadius={'50%'}
                        display={'grid'}
                        sx={{
                            placeItems: 'center',
                            backgroundImage: quest.image ? `url(/uploads/quests/${quest.image})` : 'none',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: 'grey.600'
                        }}
                    >
                        {!quest.image && (
                            <Api fontSize="large" />
                        )}
                    </Box>

                    <Stack>
                        <Typography variant="h6">
                            {quest.name}
                        </Typography>
                        <Typography variant="body2">
                            by {quest.creator.name}
                        </Typography>
                    </Stack>
                </Stack>

                <Typography variant="body2">
                    {quest.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Register</Button>
            </CardActions>
        </Card>
    )
}