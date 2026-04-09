import { Dialog, DialogActions, DialogContentText, DialogTitle, Button } from "@mui/material"

const DeleteDialog = ({open, handleClose, deleteHandler}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle
        p={"1.5rem"} width={"23rem"} spacing={"2rem"}>
           Confirm Delete
        </DialogTitle>

        <DialogContentText  p={"0.5rem"}>
            Are you sure to delete this Group ?
        </DialogContentText>
        <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button color="error" onClick={deleteHandler}>Yes</Button>
        </DialogActions>
        </Dialog> 

  )
}

export default DeleteDialog