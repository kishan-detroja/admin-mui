import { z } from 'zod';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Box,
  Grid,
  Dialog,
  Button,
  MenuItem,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';

import { USER_ROLES, USER_STATUS } from 'src/utils/constants';

import { showSnackbar } from 'src/store/slices/uiSlice';
import { createUser, updateUser } from 'src/store/slices/usersSlice';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
  status: z.string().min(1, 'Status is required'),
  phone: z.string().optional(),
});

export default function UserFormDialog({ open, onClose, onSuccess, user }) {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      role: USER_ROLES.USER,
      status: USER_STATUS.ACTIVE,
      phone: '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        role: user.role || USER_ROLES.USER,
        status: user.status || USER_STATUS.ACTIVE,
        phone: user.phone || '',
      });
    } else {
      reset({
        name: '',
        email: '',
        role: USER_ROLES.USER,
        status: USER_STATUS.ACTIVE,
        phone: '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      if (user) {
        await dispatch(updateUser({ userId: user.id, userData: data })).unwrap();
        dispatch(showSnackbar({ message: 'User updated successfully', severity: 'success' }));
      } else {
        await dispatch(createUser(data)).unwrap();
        dispatch(showSnackbar({ message: 'User created successfully', severity: 'success' }));
      }
      onSuccess();
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error.message || 'Failed to save user',
          severity: 'error',
        })
      );
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone (Optional)"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Role"
                    fullWidth
                    error={!!errors.role}
                    helperText={errors.role?.message}
                  >
                    {Object.values(USER_ROLES).map((role) => (
                      <MenuItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Status"
                    fullWidth
                    error={!!errors.status}
                    helperText={errors.status?.message}
                  >
                    {Object.values(USER_STATUS).map((status) => (
                      <MenuItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} />
                Saving...
              </Box>
            ) : (
              'Save'
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
