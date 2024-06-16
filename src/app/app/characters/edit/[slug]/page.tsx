import { auth } from "@/auth";
import { EditCharacterForm } from "@/components/EditCharacterForm";
import { updateCharacterAction } from "@/actions/characterActions";
import { getCharacterById } from "@/utils/db";
import { Box, Stack } from "@mui/material";
import { redirect } from "next/navigation";

export default async function EditCharacterPage({ params }: { params: { slug: string } }) {
    const session = await auth()
    const userId = session?.user?.id
    const character = await getCharacterById(parseInt(params.slug), userId)

    if (!character) {
        redirect('/app/characters')
    }

    return (
        <Stack padding={2}>
            <h2>Add {character?.name}</h2>

            <Box width={800}>
                <EditCharacterForm
                    action={updateCharacterAction}
                    defaultValues={character}
                />
            </Box>

        </Stack>
    )
}