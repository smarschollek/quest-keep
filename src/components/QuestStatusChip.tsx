import { Chip } from "@mui/material"

export type QuestStatusChipProps = {
    value: 0 | 1 | 2
}

const text = [
    'Planned',
    'Active',
    'Completed'
]

const color = [
    'primary',
    'info',
    'success'
]

export const QuestStatusChip = ({ value }: QuestStatusChipProps) => {

    const label = text[value]

    return (
        <Chip
            label={text[value]}
            color={color[value] as any}
        />
    )
}