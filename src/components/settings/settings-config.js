import { CONFIG } from 'src/global-config';
import { themeConfig } from 'src/theme/theme-config';

// ----------------------------------------------------------------------

export const SETTINGS_STORAGE_KEY = 'app-settings';

export const defaultSettings = {
  mode: themeConfig.defaultMode,
  direction: themeConfig.direction,
  contrast: 'default',
  navLayout: 'vertical',
  primaryColor: 'default',
  navColor: 'apparent', //Change to integrate if you want light mode
  compactLayout: true,
  fontSize: 16,
  fontFamily: themeConfig.fontFamily.primary,
  version: CONFIG.appVersion,
};
