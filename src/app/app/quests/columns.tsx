"use client"
import { QuestStatusChip } from "@/components/QuestStatusChip"
import { Link as MuiLink } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import Link from "next/link"


export const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, renderCell: (params) => <MuiLink component={Link} href={`/app/quests/edit/${params.row.id}`}>{params.value}</MuiLink> },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'creator', headerName: 'Creator', flex: 1, valueGetter: (_, row) => row.user.name },
    { field: 'place', headerName: 'Place', flex: 1, valueGetter: (_, row) => row.place.name },
    { field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => <QuestStatusChip key={params.value} value={params.value} /> }
]