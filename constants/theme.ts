/**
 * Reship Mobile App Color Theme
 */

import { Platform } from 'react-native';

export const ColorsV2 = {
  accent: "#3B1CFF",
  primary: "#06043F",
  special: "#1CADFF",
  secondary: "#FFF",
  extra: "#5A84D6",
  inactive: "#C4C4C430",
  lbl: "#6A6C6C",
  xspecial: "#15C8EF",
  selectedIcon: "#0554AD",
  bg: "#B4C6D7",
  err: "#FF0052",
  note: "#EF5924",
  success: "#42AD3B",
  warn: "#FFA300",
  transparentBlue: "rgba(59,28,255,0.5)",
  _primary: "#00255B",
  casper: "#B4C6D7",
  lightBlue: "#15C8EF",
  havBlue: "#5A84D6",
  reshipBlue: "#0554AD",
  chambray: "#3B1CFF",
  bluePantone: "#0000ED",
  bgPickBlue: "#2C354C",
  bgMidnight: "#011E48",
  bgDarkBlue: "#06043F",
};

export const Theme = {
  py: "10px",
  radius: "8px",
  fontSize: "14px",
  customSize: "24px",
  titleSize: "26px",
  subtitleSize: "12px",
  containerPadding: "12px",
  cardPadding: "13px",
  heightConst: "16px",
  buttonPadding: "18px",
  heroHeight: "34px",
  checkboxPadding: "5px",
};

// Legacy Colors object for backward compatibility
export const Colors = {
  light: {
    text: ColorsV2.primary,
    background: ColorsV2.secondary,
    tint: ColorsV2.reshipBlue,
    icon: ColorsV2.lbl,
    tabIconDefault: ColorsV2.inactive,
    tabIconSelected: ColorsV2.selectedIcon,
  },
  dark: {
    text: ColorsV2.secondary,
    background: ColorsV2.bgDarkBlue,
    tint: ColorsV2.lightBlue,
    icon: ColorsV2.lbl,
    tabIconDefault: ColorsV2.inactive,
    tabIconSelected: ColorsV2.selectedIcon,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
