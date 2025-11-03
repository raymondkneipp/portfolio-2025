export const DEFAULT_CONFIG = {
  viewport: { width: 1600, height: 900 },
  colorScheme: "no-preference" as const,
  themeColor: "#1971c2",
  borderRadius: 10,
  padding: 60,
  shadow: {
    offsetX: 5,
    offsetY: 5,
    blur: 20,
    color: "#000000",
    opacity: 0.3,
  },
  columns: 2,
  columnAngle: 0,
};

export const DEFAULT_VIEWPORT_DESKTOP = DEFAULT_CONFIG.viewport;

// Directory configuration
export const DEFAULT_COOKIE_FILE = "cookies.json";
