import { EditPlaceForm } from "@/components/EditPlaceForm";
import { updatePlaceAction } from "@/utils/actions/placesActions";
import { getPlaceById } from "@/utils/db";
import { Box, Stack } from "@mui/material";

export default async function EditPlacePage({ params }: { params: { slug: string } }) {
    const place = await getPlaceById(parseInt(params.slug))

    if (!place) {
        return <h2>Place not found</h2>
    }

    return (
        <Stack padding={2}>
            <h2>Edit PLace : {place.name} </h2>

            <Box width={800}>
                <EditPlaceForm
                    action={updatePlaceAction}
                    defaultValues={{
                        id: place.id,
                        name: place.name,
                        description: place.description ?? '',
                        image: place.image ?? undefined
                    }}
                />
            </Box>

        </Stack>
    )
}