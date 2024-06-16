import { deletePlacesAction } from "@/app/app/places/actions";
import { columns } from "@/app/app/places/columns";
import { DataTable } from "@/components/DataTable";
import { redirectToAddPlacePageAction, redirectToEditPlacePageAction } from "@/actions/placesActions";
import { getPlacesPaged } from "@/utils/db";
import { Stack } from "@mui/material";

export default async function PlacesPags() {
    const rows = await getPlacesPaged({ pageIndex: 0, pageSize: 10 })

    return (
        <main>
            <Stack
                padding={2}
                height={'calc(100vh - 64px)'}
            >
                <DataTable
                    columns={columns}
                    rows={rows}
                    addAction={redirectToAddPlacePageAction}
                    deleteAction={deletePlacesAction}
                    editAction={redirectToEditPlacePageAction}
                />
            </Stack>
        </main>
    )
}