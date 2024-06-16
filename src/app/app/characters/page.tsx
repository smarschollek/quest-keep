import { auth } from "@/auth";
import { DataTable } from "@/components/DataTable";
import { deleteCharactersAction, redirectToCreateCharacterPage, redirectToUpdateCharacterPage } from "@/actions/characterActions";
import { getCharactersForUser } from "@/utils/db";
import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'info', headerName: 'Info', flex: 1 },
]


export default async function CharactersPage() {
    const session = await auth()
    const characters = await getCharactersForUser(session?.user?.id)

    return (
        <Stack padding={2}>
            <DataTable
                rows={characters}
                columns={columns}
                addAction={redirectToCreateCharacterPage}
                editAction={redirectToUpdateCharacterPage}
                deleteAction={deleteCharactersAction}
            />
        </Stack>
    )
}