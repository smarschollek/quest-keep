import { Avatar, AvatarGroup, Box, Button, Chip, Grid, Paper, Stack, Tooltip, Typography } from "@mui/material"
import { Quest, WithUser } from "../../db/schema"
import { Api, CalendarMonth, Group, Label, Language, Person } from "@mui/icons-material"
import Link from "next/link"

export const QuestCard = ({ quest }: { quest: WithUser<Quest> }) => {
    return (
        <Paper
            sx={{
                height: 'fit-content',

            }}
        >
            <Stack
                direction={'row'}
            >
                <Box
                    width={300}
                    minWidth={300}
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
                <Stack
                    maxWidth={900}
                    padding={2}
                    display={'flex'}
                    justifyContent={'space-between'}
                    spacing={2}
                >
                    <Stack
                        spacing={2}
                    >
                        <Stack>
                            <Typography variant="h6" color={'primary'}>
                                {quest.name}
                            </Typography>
                        </Stack>

                        <Typography variant="body2" height={100} overflow={"auto"} sx={{ scrollbarWidth: 'thin' }}>
                            {quest.description}
                        </Typography>

                        <Stack
                            direction={'row'}
                            display={'flex'}
                            alignItems={'center'}
                            spacing={2}
                        >
                            <Language />
                            <Typography variant="body2" color={'primary'} component={Link} href=''>
                                Scifi - Starfinder
                            </Typography>
                        </Stack>

                        <Stack
                            direction={'row'}
                            spacing={2}
                        >
                            <Label />

                            <Stack
                                direction={'row'}
                                spacing={1}
                            >
                                <Chip label="Exploration" color="info" size="small" />
                                <Chip label="Fighting" color="error" size="small" />
                                <Chip label="Roleplay" color="warning" size="small" />
                            </Stack>
                        </Stack>

                        <Stack
                            direction={'row'}
                            display={'flex'}
                            alignItems={'center'}
                            spacing={2}
                        >
                            <Person />
                            <Typography variant="body2">
                                {quest.user.name}
                            </Typography>
                        </Stack>

                        <Stack
                            direction={'row'}
                            display={'flex'}
                            alignItems={'center'}
                            spacing={2}
                        >
                            <CalendarMonth />
                            <Typography variant="body2">
                                01.07.2024 - 01.08.2024
                            </Typography>
                        </Stack>

                        <Stack
                            direction={'row'}
                            display={'flex'}
                            alignItems={'center'}
                            spacing={2}
                        >
                            <Group />
                            <AvatarGroup
                                componentsProps={{
                                    additionalAvatar: {
                                        sx: {
                                            width: 24,
                                            height: 24,
                                            fontSize: 12
                                        }
                                    }
                                }}
                            >
                                <Tooltip title="Denise" arrow>
                                    <Avatar
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            fontSize: 12
                                        }}
                                        alt="Denise" src="/static/images/avatar/1.jpg" />
                                </Tooltip>

                                <Tooltip title="Tom" arrow>
                                    <Avatar
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            fontSize: 12
                                        }}
                                        alt="Tom" src="/static/images/avatar/1.jpg" />
                                </Tooltip>
                                <Avatar
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        fontSize: 12
                                    }}
                                    alt="Max" src="/static/images/avatar/1.jpg" />
                                <Avatar
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        fontSize: 12
                                    }}
                                    alt="Tom" src="/static/images/avatar/1.jpg" />
                                <Avatar
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        fontSize: 12
                                    }}
                                    alt="Max" src="/static/images/avatar/1.jpg" />
                            </AvatarGroup>
                        </Stack>

                    </Stack>

                    <Button variant='contained' size="small">Register</Button>
                </Stack>
            </Stack>
        </Paper>

        // <Card>
        //     <CardContent component={Stack} spacing={2} width={400} height={200}>
        //         <Stack
        //             direction={'row'}
        //             spacing={2}
        //         >
        //             <Box
        //                 height={64}
        //                 width={64}
        //                 borderRadius={'50%'}
        //                 display={'grid'}
        //                 sx={{
        //                     placeItems: 'center',
        //                     backgroundImage: quest.image ? `url(/uploads/quests/${quest.image})` : 'none',
        //                     backgroundPosition: 'center',
        //                     backgroundSize: 'cover',
        //                     backgroundRepeat: 'no-repeat',
        //                     backgroundColor: 'grey.600'
        //                 }}
        //             >
        //                 {!quest.image && (
        //                     <Api fontSize="large" />
        //                 )}
        //             </Box>

        //             <Stack>
        //                 <Typography variant="h6">
        //                     {quest.name}
        //                 </Typography>
        //                 <Typography variant="body2">
        //                     by {quest.user.name}
        //                 </Typography>
        //             </Stack>
        //         </Stack>

        //         <Typography variant="body2">
        //             {quest.description}
        //         </Typography>
        //     </CardContent>
        //     <CardActions>
        //         <Button size="small">Register</Button>
        //     </CardActions>
        // </Card>
    )
}