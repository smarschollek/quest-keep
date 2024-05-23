"use client"
import { ActionButtonGroup } from "@/components/DataTable/ActionButtonGroup"
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid"

export type DataTableProps = {
    rows: GridRowsProp
    columns: GridColDef[]
}

export const DataTable = ({ columns, rows }: DataTableProps) => {
    const combinedColumns: GridColDef[] = [
        { field: 'id', headerName: 'Actions', width: 200, disableColumnMenu: true, sortable: false, renderCell: ActionButtonGroup },
        ...columns
    ]

    return (
        <DataGrid
            rows={rows}
            columns={combinedColumns}
        />
    )
}