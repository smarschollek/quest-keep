import { EditQuestForm } from "@/components/EditQuestForm";
import { createQuestAction } from "@/utils/actions/questActions";
import { getAllPlaces } from "@/utils/db";
import { Stack } from "@mui/material";

export default async function AddQuestPage() {

    const placeOptions = (await getAllPlaces()).map(place => ({ value: place.id, label: place.name }))

    return (
        <Stack>
            <EditQuestForm
                action={createQuestAction}
                defaultValues={{
                    name: '',
                    description: '',
                    place: 0
                }}
                placeOptions={placeOptions}
            />

        </Stack>
    )
}