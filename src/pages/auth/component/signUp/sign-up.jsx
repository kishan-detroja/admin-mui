import { CONFIG } from 'src/global-config';

import { SignUpForm } from './SignUpForm';

// ----------------------------------------------------------------------

const metadata = { title: `Sign up | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <SignUpForm />
    </>
  );
}
