import { useSelector } from 'react-redux';

import { selectCurrentUser } from 'src/pages/auth/slice/authSlice';

// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = useSelector(selectCurrentUser);

  return { user };
}
