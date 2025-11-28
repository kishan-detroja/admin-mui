import { Stack, Container, Typography } from '@mui/material';

import UsersListView from './component/list/UsersListView';

export default function UsersPage() {
  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
      </Stack>

      <UsersListView />
    </Container>
  );
}
