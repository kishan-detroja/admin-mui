import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import { Box, Card, Chip, Stack, Avatar, Button, TextField, InputAdornment } from '@mui/material';

import { useDebounce } from 'src/hooks';
import { formatDate, getInitials } from 'src/utils';
import { showSnackbar } from 'src/store/slices/uiSlice';
import UserFormDialog from 'src/pages/users/component/dialog/UserFormDialog';
import {
  setPage,
  setLimit,
  fetchUsers,
  deleteUser,
  selectUsers,
  setSearchQuery,
  selectUsersPage,
  selectUsersTotal,
  selectUsersLimit,
  selectUsersLoading,
  selectUsersSearchQuery,
} from 'src/pages/users/slice/usersSlice';

import { Iconify } from 'src/components/iconify';
import { CustomGridActionsCellItem } from 'src/components/custom-data-grid';

import { DataGridCustom } from 'src/sections/data-grid-view/data-grid-custom';

import UserDetailDialog from '../dialog/UserDetailDialog';

export default function UsersListView() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const total = useSelector(selectUsersTotal);
  const page = useSelector(selectUsersPage);
  const limit = useSelector(selectUsersLimit);
  const loading = useSelector(selectUsersLoading);
  const searchQuery = useSelector(selectUsersSearchQuery);

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    dispatch(fetchUsers({ page, limit, search: searchQuery }));
  }, [dispatch, page, limit, searchQuery]);

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
    dispatch(fetchUsers({ page, limit, search: searchQuery }));
  }, [dispatch, page, limit, searchQuery, handleFormClose]);

  const getUserStatusColor = (status) => {
    const colors = {
      active: 'success',
      inactive: 'default',
      suspended: 'error',
      pending: 'warning',
    };
    return colors[status] || 'default';
  };

  const columns = [
    {
      field: 'name',
      headerName: 'User',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar>{getInitials(params.row.name || params.row.email)}</Avatar>
          <Box>
            <Box sx={{ fontWeight: 600 }}>{params.row.name}</Box>
          </Box>
        </Stack>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      renderCell: (params) => <Chip label={params.row.role || 'user'} size="small" />,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.row.status || 'active'}
          size="small"
          color={getUserStatusColor(params.row.status)}
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 180,
      renderCell: (params) => formatDate(params.row.createdAt),
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: 'Actions',
      align: 'right',
      headerAlign: 'right',
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <CustomGridActionsCellItem
          showInMenu
          label="View"
          icon={<Iconify icon="solar:eye-bold" />}
          onClick={() => handleView(params.row)}
        />,
        <CustomGridActionsCellItem
          showInMenu
          label="Edit"
          icon={<Iconify icon="solar:pen-bold" />}
          onClick={() => handleEdit(params.row)}
        />,
        <CustomGridActionsCellItem
          showInMenu
          label="Delete"
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          onClick={() => handleDelete(params.row.id)}
          style={{ color: 'var(--palette-error-main)' }}
        />,
      ],
    },
  ];

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
          rowCount={total}
          paginationModel={{
            page: page - 1,
            pageSize: limit,
          }}
          onPaginationModelChange={(model) => {
            dispatch(setPage(model.page + 1));
            dispatch(setLimit(model.pageSize));
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
