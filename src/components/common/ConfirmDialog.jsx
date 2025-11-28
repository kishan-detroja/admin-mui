import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { hideConfirmDialog, selectConfirmDialog } from 'src/store/slices/uiSlice';

/**
 * Global Confirmation Dialog Component
 * Controlled by Redux state via useConfirmDialog hook
 */
export default function ConfirmDialog() {
  const dispatch = useDispatch();
  const dialog = useSelector(selectConfirmDialog);

  const handleClose = () => {
    dispatch(hideConfirmDialog());
  };

  const handleConfirm = () => {
    if (dialog.onConfirm) {
      dialog.onConfirm();
    }
    handleClose();
  };

  return (
    <Dialog
      open={dialog.open}
      onClose={handleClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="confirm-dialog-title">{dialog.title}</DialogTitle>

      <DialogContent>
        <DialogContentText id="confirm-dialog-description">{dialog.message}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {dialog.cancelText}
        </Button>
        <Button onClick={handleConfirm} variant="contained" color={dialog.confirmColor} autoFocus>
          {dialog.confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
