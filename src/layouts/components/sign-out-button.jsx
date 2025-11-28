import { useCallback } from 'react';

import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSnackbar, useConfirmDialog } from 'src/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { signOut } from 'src/auth/context/jwt/action';

// ----------------------------------------------------------------------

export function SignOutButton({ onClose, sx, ...other }) {
  const router = useRouter();
  const { showSuccess } = useSnackbar();
  const { confirm } = useConfirmDialog();

  const { checkUserSession } = useAuthContext();

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      await checkUserSession?.();
      showSuccess('Successfully signed out!');
      onClose?.();
      router.replace(paths.auth.jwt.signIn);
    } catch (error) {
      console.error(error);
    }
  }, [checkUserSession, onClose, router, showSuccess]);

  const handleClick = () => {
    confirm({
      title: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      confirmText: 'Logout',
      cancelText: 'Cancel',
      confirmColor: 'error',
      onConfirm: handleLogout,
    });
  };

  return (
    <Button
      fullWidth
      variant="soft"
      size="large"
      color="error"
      onClick={handleClick}
      sx={sx}
      {...other}
    >
      Logout
    </Button>
  );
}
