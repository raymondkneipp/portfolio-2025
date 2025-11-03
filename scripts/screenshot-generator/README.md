# Screenshot Generator

An automated screenshot generator for web projects that creates beautiful, styled screenshots with theme colors, borders, shadows, and custom cover images.

## Features

- 📸 Automated screenshots of multiple URLs per project
- 🎨 Custom styling with theme colors, border radius, and shadows
- 🔐 Cookie-based authentication support
- 🎭 Interactive screenshots with click/tap actions
- 🖼️ Composite cover images with column layouts
- 🌓 Dark/light mode support
- 🎯 Per-project configuration

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Chrome Cookie Extension

For projects that require authentication, you'll need to export cookies from your browser:

1. Install the [Get cookies.txt LOCALLY](https://chromewebstore.google.com/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc) Chrome extension
2. Log into your application in Chrome
3. Visit the URL you want to capture
4. Click the extension icon and export cookies as JSON
5. Save the JSON file in the `cookies/` directory with a project-specific name (e.g., `alpost-cookies.json`)

## Configuration

### Adding a New Project

Edit `src/data.ts` and add your project configuration to the `projects` array:

```typescript
{
  name: "My Project",
  liveUrl: "https://example.com",
  cookieFile: "my-cookies.json",  // Optional, for authenticated pages
  imagesConfig: {
    themeColor: "#6366f1",           // Background color for screenshots
    colorScheme: "dark",              // Optional: "light", "dark", or "no-preference"
    viewport: { width: 1600, height: 900 },  // Optional: default is 1600x900
    borderRadius: 10,                 // Optional: border radius in pixels
    padding: 60,                      // Optional: padding around screenshots
  },
  screenshots: [
    "https://example.com/",
    "https://example.com/about",
    {
      url: "https://example.com/interactive",
      steps: [
        { type: "click", text: "Get Started", waitAfter: 1000 },
        { type: "wait", duration: 2000 },
      ],
    },
  ],
  coverImage: {
    columnAngle: 20,                  // Rotation angle for columns
    columns: 2,                        // Number of columns
    screenshots: [
      "https://example.com/",
      "https://example.com/about",
      "https://example.com/services",
    ],
  },
}
```

### Configuration Options

- **`name`**: Project display name
- **`liveUrl`**: Main project URL
- **`cookieFile`**: Optional filename in `cookies/` directory for authentication
- **`imagesConfig`**: Styling configuration
  - `themeColor`: Background color for screenshots
  - `colorScheme`: Browser color scheme preference
  - `viewport`: Browser viewport size (default: 1600x900)
  - `borderRadius`: Border radius in pixels (default: 10)
  - `padding`: Padding around screenshots (default: 60)
- **`screenshots`**: Array of URLs or screenshot configurations
  - Simple string URLs: `"https://example.com"`
  - Objects with options:
    - `url`: Page URL
    - `steps`: Array of interactions (click, wait, type)
    - `crop`: Crop dimensions (x, y, width, height)
    - `viewport`: Custom viewport size
- **`coverImage`**: Optional composite cover image
  - `columnAngle`: Rotation angle for columns
  - `columns`: Number of columns (default: 2)
  - `screenshots`: Array of screenshot URLs/configs

### Interactive Screenshots

You can create interactive screenshots that perform actions:

```typescript
{
  url: "https://example.com",
  steps: [
    { type: "click", text: "Button Text", waitAfter: 1000 },
    { type: "click", role: "button", name: "Submit" },
    { type: "click", ariaLabel: "Close" },
    { type: "wait", duration: 2000 },
    { type: "type", selector: "#input", text: "Hello" },
  ],
}
```

## Usage

### Generate All Screenshots

```bash
npm run generate
```

This will:
1. Process all projects defined in `src/data.ts`
2. Generate individual screenshots (saved as `screenshots/{project-name}/1.webp`, etc.)
3. Generate cover images (saved as `screenshots/{project-name}/cover.webp`)
4. Skip already-existing screenshots for faster re-runs

### Output

Screenshots are saved in the `screenshots/` directory:

```
screenshots/
  ├── my-project/
  │   ├── 1.webp
  │   ├── 2.webp
  │   └── cover.webp
  └── another-project/
      ├── 1.webp
      └── cover.webp
```

## Examples

Check out the `projects` array in `src/data.ts` for examples of:
- Basic screenshots with theme colors
- Interactive screenshots with click actions
- Dark mode support
- Custom cover images with rotation
- Cropped screenshots
- Per-project authentication

## Project Structure

```
.
├── src/
│   ├── config.ts      # Default configuration
│   ├── data.ts        # Project definitions
│   ├── types.ts       # TypeScript interfaces
│   ├── utils.ts       # Utility functions
│   └── index.ts       # Main script
├── cookies/           # Cookie files for authentication
├── screenshots/        # Generated screenshot output
└── package.json
```

## Technologies

- **Playwright**: Browser automation
- **Sharp**: Image processing and styling
- **TypeScript**: Type safety

## License

MIT
