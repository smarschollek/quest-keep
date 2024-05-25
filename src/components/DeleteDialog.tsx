import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export type DeleteDialogProps = {
    open: boolean
    onAccept: () => void
    onClose: () => void
    listItems: string[]
}

export const DeleteDialog = ({ open, onAccept, onClose, listItems }: DeleteDialogProps) => {

    const triggerOnAccept = () => {
        onAccept()
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                Confirm deletion
            </DialogTitle>
            <DialogContent>
                <DialogContentText paddingBottom={2}>
                    Are you sure you want to delete the following items?
                </DialogContentText>

                {listItems.map(item => (<DialogContentText key={item}>{item}</DialogContentText>))}
            </DialogContent>
            <DialogActions>
                <Button onClick={triggerOnAccept}>Yes</Button>
                <Button onClick={onClose}>No</Button>
            </DialogActions>
        </Dialog>
    )
}