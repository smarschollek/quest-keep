import { DataTable } from "@/components/DataTable";
import { Stack } from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

export default function PlacesPags() {

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'description', headerName: 'Description', width: 450 },
    ]

    const rows: GridRowsProp = [
        { id: 1, name: 'Place 1', description: 'Description 1' },
        { id: 2, name: 'Place 2', description: 'Description 2' },
        { id: 3, name: 'Place 3', description: 'Description 3' },
        { id: 4, name: 'Place 4', description: 'Description 4' },
        { id: 5, name: 'Place 5', description: 'Description 5' },
    ]

    return (
        <main>
            <Stack
                padding={2}
                height={'calc(100vh - 64px)'}
            >
                <DataTable
                    columns={columns}
                    rows={rows}
                />
            </Stack>
        </main>
    )
}