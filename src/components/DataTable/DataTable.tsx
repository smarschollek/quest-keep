"use client"
import { Add, Create, Delete, Edit } from "@mui/icons-material"
import { Box, IconButton, Paper, Stack, Toolbar } from "@mui/material"
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid"

export type DataTableProps = {
    rows: GridRowsProp
    columns: GridColDef[]
}

export const DataTable = ({ columns, rows }: DataTableProps) => {
    const combinedColumns: GridColDef[] = [
        ...columns
    ]

    return (
        <Stack spacing={2}>
            <Paper>
                <Stack padding={1}>
                    <Box>
                        <IconButton>
                            <Add />
                        </IconButton>
                        <IconButton>
                            <Edit />
                        </IconButton>
                        <IconButton>
                            <Delete />
                        </IconButton>
                    </Box>
                </Stack>
            </Paper>

            <DataGrid
                disableRowSelectionOnClick
                checkboxSelection
                rows={rows}
                columns={combinedColumns}
            />
        </Stack>
    )
}