"use client"
import { GridColDef } from "@mui/x-data-grid";
import { Link as MuiLink } from "@mui/material";
import Link from "next/link";

export const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, renderCell: (params) => <MuiLink component={Link} href={`/app/places/edit/${params.row.id}`}>{params.value}</MuiLink> },
    { field: 'description', headerName: 'Description', flex: 1 },
]