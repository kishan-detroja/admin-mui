import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { showConfirmDialog, hideConfirmDialog } from 'src/store/slices/uiSlice';

/**
 * Custom hook for showing confirmation dialogs
 * @returns {Object} Object containing confirm dialog helper function
 */
export function useConfirmDialog() {
  const dispatch = useDispatch();

  /**
   * Show a confirmation dialog
   * @param {Object} options - Dialog options
   * @param {string} options.title - Dialog title
   * @param {string} options.message - Dialog message/description
   * @param {Function} options.onConfirm - Callback function when user confirms
   * @param {string} [options.confirmText='Confirm'] - Confirm button text
   * @param {string} [options.cancelText='Cancel'] - Cancel button text
   * @param {string} [options.confirmColor='error'] - Confirm button color
   */
  const confirm = useCallback(
    ({
      title,
      message,
      onConfirm,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      confirmColor = 'error',
    }) => {
      dispatch(
        showConfirmDialog({
          title,
          message,
          onConfirm,
          confirmText,
          cancelText,
          confirmColor,
        })
      );
    },
    [dispatch]
  );

  const hide = useCallback(() => {
    dispatch(hideConfirmDialog());
  }, [dispatch]);

  return {
    confirm,
    hide,
  };
}
