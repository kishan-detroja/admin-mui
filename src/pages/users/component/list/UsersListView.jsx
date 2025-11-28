import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Card,
  Chip,
  Table,
  Stack,
  Avatar,
  Button,
  Tooltip,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  IconButton,
  TableContainer,
  InputAdornment,
  TablePagination,
} from '@mui/material';

import { useDebounce } from 'src/hooks';
import { formatDate, getInitials } from 'src/utils';
import { showSnackbar } from 'src/store/slices/uiSlice';
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

import UserFormDialog from '../dialog/UserFormDialog';
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

  const handleChangePage = useCallback(
    (event, newPage) => {
      dispatch(setPage(newPage + 1));
    },
    [dispatch]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      dispatch(setLimit(parseInt(event.target.value, 10)));
      dispatch(setPage(1));
    },
    [dispatch]
  );

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

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar>{getInitials(user.name || user.email)}</Avatar>
                        <Box>
                          <Box sx={{ fontWeight: 600 }}>{user.name}</Box>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip label={user.role || 'user'} size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status || 'active'}
                        size="small"
                        color={getUserStatusColor(user.status)}
                      />
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="View">
                        <IconButton onClick={() => handleView(user)}>
                          <Iconify icon="eva:eye-fill" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(user)}>
                          <Iconify icon="eva:edit-fill" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(user.id)} color="error">
                          <Iconify icon="eva:trash-2-fill" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={total}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
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
