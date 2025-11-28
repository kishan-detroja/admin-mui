import {
  Box,
  Grid,
  Chip,
  Stack,
  Dialog,
  Button,
  Avatar,
  Divider,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { formatDate, getInitials } from 'src/utils';

export default function UserDetailDialog({ open, onClose, user }) {
  if (!user) return null;

  const DetailRow = ({ label, value }) => (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={4}>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body2">{value || '-'}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 64, height: 64, fontSize: '1.5rem' }}>
              {getInitials(user.name || user.email)}
            </Avatar>
            <Box>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box>
            <DetailRow label="User ID" value={user.id} />
            <DetailRow label="Email" value={user.email} />
            <DetailRow label="Phone" value={user.phone} />
            <DetailRow
              label="Role"
              value={
                <Chip
                  label={user.role || 'user'}
                  size="small"
                  sx={{ textTransform: 'capitalize' }}
                />
              }
            />
            <DetailRow
              label="Status"
              value={
                <Chip
                  label={user.status || 'active'}
                  size="small"
                  color={
                    user.status === 'active'
                      ? 'success'
                      : user.status === 'suspended'
                        ? 'error'
                        : 'default'
                  }
                  sx={{ textTransform: 'capitalize' }}
                />
              }
            />
            <DetailRow label="Created At" value={formatDate(user.createdAt, 'datetime')} />
            <DetailRow label="Updated At" value={formatDate(user.updatedAt, 'datetime')} />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
