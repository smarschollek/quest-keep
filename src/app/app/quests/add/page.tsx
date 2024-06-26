import { EditQuestForm } from "@/components/EditQuestForm";
import { createQuestAction } from "@/actions/questActions";
import { getAllPlaces } from "@/utils/db";
import { Box, Stack } from "@mui/material";

export default async function AddQuestPage() {

    const placeOptions = (await getAllPlaces()).map(place => ({ value: place.id, label: place.name }))

    return (
        <Stack padding={2}>
            <h2>Add new Quest</h2>

            <Box width={800}>
                <EditQuestForm
                    action={createQuestAction}
                    defaultValues={{
                        id: -1,
                        name: '',
                        description: '',
                        place: -1,
                        status: 0
                    }}
                    placeOptions={placeOptions}
                />
            </Box>

        </Stack>
    )
}