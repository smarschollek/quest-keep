import { columns } from "@/app/app/quests/columns";
import { DataTable } from "@/components/DataTable";
import { deleteQuestsAction, redirectToAddQuestAction, redirectToEditQuestAction } from "@/utils/actions/questActions";
import { getQuests } from "@/utils/db";
import { Stack } from "@mui/material";

export default async function PlacesPags() {
    const rows = await getQuests({ pageIndex: 0, pageSize: 10 })

    return (
        <main>
            <Stack
                padding={2}
                height={'calc(100vh - 64px)'}
            >
                <DataTable
                    columns={columns}
                    rows={rows}

                    addAction={redirectToAddQuestAction}
                    deleteAction={deleteQuestsAction}
                    editAction={redirectToEditQuestAction}
                />
            </Stack>
        </main>
    )
}