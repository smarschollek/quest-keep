import { EditQuestForm } from "@/components/EditQuestForm";
import { updateQuestAction, createQuestAction } from "@/utils/actions/questActions";
import { getAllPlaces, getQuestById } from "@/utils/db";
import { Box, Stack } from "@mui/material";

export default async function AddQuestPage({ params }: { params: { slug: string } }) {

    const placeOptions = (await getAllPlaces()).map(place => ({ value: place.id, label: place.name }))
    const quest = await getQuestById(parseInt(params.slug))

    if (!quest) {
        return <h2>Quest not found</h2>
    }

    return (
        <Stack padding={2}>
            <h2>Edit Quest : {quest.name} </h2>

            <Box width={800}>
                <EditQuestForm
                    action={updateQuestAction}
                    defaultValues={{
                        id: quest.id,
                        name: quest.name,
                        description: quest.description ?? '',
                        place: quest.placeId
                    }}
                    placeOptions={placeOptions}
                />
            </Box>

        </Stack>
    )
}