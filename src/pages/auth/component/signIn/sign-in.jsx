import { CONFIG } from 'src/global-config';

import { SignInForm } from './SignInForm';

// ----------------------------------------------------------------------

const metadata = { title: `Sign in | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <SignInForm />
    </>
  );
}
