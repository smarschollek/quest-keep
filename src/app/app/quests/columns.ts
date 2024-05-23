"use client"
import { GridColDef } from "@mui/x-data-grid"

export const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'creator', headerName: 'Creator', flex: 1, valueGetter: (_, row) => row.creator.name },
    { field: 'place', headerName: 'Place', flex: 1, valueGetter: (_, row) => row.place.name },
]