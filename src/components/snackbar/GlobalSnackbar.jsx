import { useDispatch, useSelector } from 'react-redux';

import { Alert, Snackbar } from '@mui/material';

import { hideSnackbar, selectSnackbar } from 'src/store/slices/uiSlice';

export default function GlobalSnackbar() {
  const dispatch = useDispatch();
  const snackbar = useSelector(selectSnackbar);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
