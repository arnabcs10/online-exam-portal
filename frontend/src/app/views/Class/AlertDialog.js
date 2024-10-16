import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const  AlertDialog = (props) => {

    const { 
        alertDialog, setAlertDialog
    } = props;
    
    const handleConfirm = () => {
        alertDialog.onConfirm();
        setAlertDialog({
            isOpen: false,
            title: "",
            content: ""
        });
    }
    const handleCancel = () => {

        setAlertDialog({
            isOpen: false,
            title: "",
            content: ""
        });
    }
    return (
        <div>
           
            <Dialog
                open={alertDialog.isOpen}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {alertDialog.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {alertDialog.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default  AlertDialog;