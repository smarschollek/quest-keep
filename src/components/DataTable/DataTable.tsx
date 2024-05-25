"use client"
import { DeleteDialog } from "@/components/DeleteDialog"
import { Add, Delete, Edit } from "@mui/icons-material"
import { Box, IconButton, Paper, Stack, Toolbar } from "@mui/material"
import { DataGrid, GridColDef, GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid"
import { useState } from "react"

export type DataTableProps = {
    rows: GridRowsProp
    columns: GridColDef[]

    deleteAction: (ids: number[]) => Promise<void>
}

export const DataTable = ({ columns, rows, deleteAction }: DataTableProps) => {
    const combinedColumns: GridColDef[] = [
        ...columns
    ]

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const isDeleteActive = rowSelectionModel.length > 0
    const isEditActive = rowSelectionModel.length === 1

    const selectedItems = rowSelectionModel.reduce<string[]>((acc, name) => {
        const item = rows.find(row => row.id === name)
        if (item) {
            acc.push(item.name as string)
        }
        return acc
    }, [])

    return (
        <>
            <DeleteDialog
                open={showDeleteDialog}
                onAccept={() => deleteAction(rowSelectionModel as number[])}
                onClose={() => setShowDeleteDialog(false)}
                listItems={selectedItems}
            />
            <Stack spacing={2}>
                <Paper>
                    <Stack padding={1}>
                        <Box>
                            <IconButton>
                                <Add />
                            </IconButton>
                            <IconButton
                                disabled={!isEditActive}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton
                                disabled={!isDeleteActive}
                                onClick={() => setShowDeleteDialog(true)}
                            >
                                <Delete />
                            </IconButton>
                        </Box>
                    </Stack>
                </Paper>

                <DataGrid
                    autoHeight
                    checkboxSelection

                    disableRowSelectionOnClick

                    rows={rows}
                    columns={combinedColumns}

                    onRowSelectionModelChange={setRowSelectionModel}


                />
            </Stack>
        </>
    )
}