import 'src/global.css';

import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { usePathname } from 'src/routes/hooks';

import { store } from 'src/store';
import { themeConfig, ThemeProvider } from 'src/theme';

import { GlobalSnackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

export default function App({ children }) {
  useScrollToTop();

  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <SettingsProvider defaultSettings={defaultSettings}>
          <ThemeProvider
            modeStorageKey={themeConfig.modeStorageKey}
            defaultMode={themeConfig.defaultMode}
          >
            <MotionLazy>
              <ProgressBar />
              <SettingsDrawer defaultSettings={defaultSettings} />
              <GlobalSnackbar />
              {children}
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}

// ----------------------------------------------------------------------

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
