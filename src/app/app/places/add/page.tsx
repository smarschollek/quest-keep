import { EditPlaceForm } from "@/components/EditPlaceForm";
import { createPlaceAction } from "@/utils/actions/placesActions";
import { Box, Stack } from "@mui/material";

export default function AddPlacePage() {
    return (
        <Stack padding={2}>
            <h2>Add Place</h2>

            <Box width={800}>
                <EditPlaceForm
                    action={createPlaceAction}
                    defaultValues={{
                        id: -1,
                        name: '',
                        description: '',
                    }}
                />
            </Box>

        </Stack>
    )
}