'use client'

import { CalendarMonth, Home, LiveHelp, Person, Room, Settings } from "@mui/icons-material"
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import Link from "next/link"

const drawerWidth = 240

export const NavigationDrawer = () => {
    return (
        <Drawer
            open
            sx={{

                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    marginTop: '64px',
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton href="/app" LinkComponent={Link}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary={'Dasboard'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/app/sessions" LinkComponent={Link}>
                        <ListItemIcon>
                            <CalendarMonth />
                        </ListItemIcon>
                        <ListItemText primary={'Sessions'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/app/quests" LinkComponent={Link}>
                        <ListItemIcon>
                            <LiveHelp />
                        </ListItemIcon>
                        <ListItemText primary={'Quests'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/app/places" LinkComponent={Link}>
                        <ListItemIcon>
                            <Room />
                        </ListItemIcon>
                        <ListItemText primary={'Places'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/app/characters" LinkComponent={Link}>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary={'Characters'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/app/settings" LinkComponent={Link}>
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText primary={'Settings'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}