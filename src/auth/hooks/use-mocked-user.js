import { useSelector } from 'react-redux';

import { selectCurrentUser } from 'src/store/slices/authSlice';

// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = useSelector(selectCurrentUser);

  return { user };
}
