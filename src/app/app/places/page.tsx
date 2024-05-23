import { DataTable } from "@/components/DataTable";
import { getPlaces } from "@/utils/db";
import { Stack } from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'description', headerName: 'Description', flex: 1 },
]

export default async function PlacesPags() {
    const rows = await getPlaces({ pageIndex: 0, pageSize: 10 })

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