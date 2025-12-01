import { Box, Chip, Stack, Avatar } from '@mui/material';

import { formatDate, getInitials } from 'src/utils';

import { Iconify } from 'src/components/iconify';
import { CustomGridActionsCellItem } from 'src/components/custom-data-grid';

export const UserColumns = ({ handleView, handleEdit, handleDelete }) => {
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

  return columns;
};
