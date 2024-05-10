'use client'

import { Home, Settings } from "@mui/icons-material"
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material"

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
                    <ListItemButton>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary={'Dasboard'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
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