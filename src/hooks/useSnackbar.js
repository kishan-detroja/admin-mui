import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { showSnackbar as showSnackbarAction } from 'src/store/slices/uiSlice';

/**
 * Custom hook for showing snackbar notifications
 * @returns {Object} Object containing snackbar helper functions
 */
export function useSnackbar() {
  const dispatch = useDispatch();

  const showSnackbar = useCallback(
    (message, severity = 'info') => {
      dispatch(showSnackbarAction({ message, severity }));
    },
    [dispatch]
  );

  const showSuccess = useCallback(
    (message) => {
      dispatch(showSnackbarAction({ message, severity: 'success' }));
    },
    [dispatch]
  );

  const showError = useCallback(
    (message) => {
      dispatch(showSnackbarAction({ message, severity: 'error' }));
    },
    [dispatch]
  );

  const showWarning = useCallback(
    (message) => {
      dispatch(showSnackbarAction({ message, severity: 'warning' }));
    },
    [dispatch]
  );

  const showInfo = useCallback(
    (message) => {
      dispatch(showSnackbarAction({ message, severity: 'info' }));
    },
    [dispatch]
  );

  return {
    showSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
}
