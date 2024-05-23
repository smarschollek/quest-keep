"use client"
import { ButtonGroup, Button } from "@mui/material"
import { GridCellParams } from "@mui/x-data-grid"

export const ActionButtonGroup = (props: GridCellParams) => {
    return (
        <ButtonGroup
            disableElevation
        >
            <Button
                variant="contained"
                color="primary"
                sx={{ width: 90 }}
                onClick={() => alert(JSON.stringify(props.row))}
            >
                Edit
            </Button>
            <Button
                variant="contained"
                color="error"
                sx={{ width: 90 }}
                onClick={() => alert(props.value)}
            >
                Delete
            </Button>
        </ButtonGroup>
    )
}