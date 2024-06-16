import { EditCharacterForm } from "@/components/EditCharacterForm";
import { createCharacterAction } from "@/actions/characterActions";
import { Box, Stack } from "@mui/material";

export default function AddCharacterPage() {
    return (
        <Stack padding={2}>
            <h2>Add new Quest</h2>

            <Box width={800}>
                <EditCharacterForm
                    action={createCharacterAction}
                    defaultValues={{
                        id: -1,
                        name: '',
                        description: '',
                        info: ''
                    }}
                />
            </Box>

        </Stack>
    )
}