import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import { Box, Card, Stack, Button, TextField, InputAdornment } from '@mui/material';

import { useDebounce } from 'src/hooks';
import { showSnackbar } from 'src/store/slices/uiSlice';
import UserFormDialog from 'src/pages/users/component/dialog/UserFormDialog';
import {
  setFilters,
  fetchUsers,
  deleteUser,
  selectUsers,
  selectUsersFilters,
  selectUsersLoading,
} from 'src/pages/users/slice/usersSlice';

import { Iconify } from 'src/components/iconify';

import { DataGridCustom } from 'src/sections/data-grid-view/data-grid-custom';

import { UserColumns } from './UserColumns';
import UserDetailDialog from '../dialog/UserDetailDialog';

export default function UsersListView() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const filters = useSelector(selectUsersFilters);
  const loading = useSelector(selectUsersLoading);

  const [localSearch, setLocalSearch] = useState(filters.search);
  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    dispatch(setFilters({ search: debouncedSearch }));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, filters]);

  const handleEdit = useCallback((user) => {
    setSelectedUser(user);
    setFormOpen(true);
  }, []);

  const handleView = useCallback((user) => {
    setSelectedUser(user);
    setDetailOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (userId) => {
      if (window.confirm('Are you sure you want to delete this user?')) {
        try {
          await dispatch(deleteUser(userId)).unwrap();
          dispatch(showSnackbar({ message: 'User deleted successfully', severity: 'success' }));
        } catch {
          dispatch(showSnackbar({ message: 'Failed to delete user', severity: 'error' }));
        }
      }
    },
    [dispatch]
  );

  const handleFormClose = useCallback(() => {
    setFormOpen(false);
    setSelectedUser(null);
  }, []);

  const handleDetailClose = useCallback(() => {
    setDetailOpen(false);
    setSelectedUser(null);
  }, []);

  const handleFormSuccess = useCallback(() => {
    handleFormClose();
    dispatch(fetchUsers());
  }, [dispatch, handleFormClose]);

  const columns = UserColumns({ handleView, handleEdit, handleDelete });

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <TextField
          placeholder="Search users..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" />
              </InputAdornment>
            ),
          }}
          sx={{ width: 320 }}
        />
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setFormOpen(true)}
        >
          Add User
        </Button>
      </Stack>

      <Card sx={{ height: 600 }}>
        <DataGridCustom
          columns={columns}
          rows={users?.list || []}
          loading={loading}
          getRowId={(row) => row._id}
          rowCount={users?.total || 0}
          paginationModel={{
            page: filters.page - 1,
            pageSize: filters.limit,
          }}
          onPaginationModelChange={(model) => {
            dispatch(setFilters({ page: model.page + 1, limit: model.pageSize }));
          }}
        />
      </Card>

      <UserFormDialog
        open={formOpen}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
        user={selectedUser}
      />

      <UserDetailDialog open={detailOpen} onClose={handleDetailClose} user={selectedUser} />
    </Box>
  );
}
