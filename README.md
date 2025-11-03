# Portfolio 2025

A modern, responsive portfolio website showcasing my work, experience, and skills. Built with the latest web technologies and featuring a clean, professional design with dark mode support.

## 🚀 Features

- **Portfolio Showcase**: Interactive project carousel with detailed descriptions and live links
- **Work Experience Timeline**: Comprehensive professional history with detailed achievements
- **Resume Generation**: PDF resume export functionality
- **Dark Mode**: System-aware theme switching
- **Responsive Design**: Fully responsive across all device sizes
- **Screenshot Generation**: Automated screenshot capture for projects
- **Type-Safe**: Built with TypeScript for type safety throughout

## 🛠️ Tech Stack

- **Framework**: [TanStack Router](https://tanstack.com/router) + [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Generation**: [@react-pdf/renderer](https://react-pdf.org/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Validation**: [Zod](https://zod.dev/)
- **Linting & Formatting**: [Biome](https://biomejs.dev/)
- **Fonts**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)

## 📦 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

## 🏃 Getting Started

### Installation

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Build the application for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm serve
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server on port 3000 |
| `pnpm build` | Build for production |
| `pnpm serve` | Preview production build |
| `pnpm test` | Run tests with Vitest |
| `pnpm lint` | Lint code with Biome |
| `pnpm format` | Format code with Biome |
| `pnpm check` | Run linting and formatting checks |
| `pnpm generate:screenshots` | Generate project screenshots |

## 🎨 UI Components

This project uses shadcn/ui components. To add new components:

```bash
pnpx shadcn@latest add [component-name]
```

For example:

```bash
pnpx shadcn@latest add button
```

## 📁 Project Structure

```
portfolio-2025/
├── public/                # Static assets and screenshots
├── scripts/               # Utility scripts (screenshot generator)
├── src/
│   ├── components/       # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── icons/        # Custom icon components
│   ├── routes/           # TanStack Router file-based routes
│   ├── resume/           # Resume/PDF generation components
│   ├── lib/              # Utility functions
│   ├── config.ts         # Portfolio configuration
│   └── styles.css        # Global styles
└── vite.config.ts        # Vite configuration
```

## 🔧 Configuration

All portfolio data (projects, experience, skills, etc.) is configured in `src/config.ts`. Update this file to customize your portfolio content.

### Adding Projects

Projects are configured in the `config.ts` file. Each project includes:
- Name and description
- Live URL and code URL
- Technologies used
- Screenshot configuration

### Generating Screenshots

To generate screenshots for your projects:

1. Configure screenshot URLs and steps in `src/config.ts`
2. Run: `pnpm generate:screenshots`
3. Screenshots will be saved in `public/screenshots/[project-name]/`

## 🌐 Environment Variables

This project uses [T3Env](https://env.t3.gg/) for type-safe environment variables.

### Required Variables

Create a `.env` file in the root directory with the following variables:

```bash
CONTACT_EMAIL=your-email@example.com
CONTACT_PHONE=+15555555555
```

The phone number must be in [E.164 format](https://en.wikipedia.org/wiki/E.164) (e.g., `+15555555555`).

### Usage

Environment variables are defined in `src/env/server.ts` and validated at build time. Import and use them in your code:

```typescript
import { env } from "@/env/server";

const email = env.CONTACT_EMAIL;
const phone = env.CONTACT_PHONE;
```

**Note**: Never commit your `.env` file. It's already included in `.gitignore`.

## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) for testing:

```bash
pnpm test
```

## 🎯 Code Quality

- **Linting**: Biome
- **Formatting**: Biome
- **Type Checking**: TypeScript

Run all checks:

```bash
pnpm check
```

## 📝 Routes

This project uses TanStack Router's file-based routing. Routes are defined in `src/routes/`:

- `/` - Home page with portfolio
- `/projects` - Projects page (if exists)
- `/resume` - Resume/PDF view

### Adding a New Route

Simply create a new file in `src/routes/` directory:

```typescript
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/your-route")({
  component: YourComponent,
});
```

### Navigation

Use the `Link` component from TanStack Router:

```typescript
import { Link } from "@tanstack/react-router";

<Link to="/your-route">Your Link</Link>
```

## 📄 License

This project is private and personal portfolio content.

## 👤 Author

**Raymond Kneipp**

- Website: [raymondkneipp.com](https://raymondkneipp.com)
- LinkedIn: [@raymondkneipp](https://www.linkedin.com/in/raymondkneipp)
- GitHub: [@raymondkneipp](https://github.com/raymondkneipp)

---

Built with ❤️ using modern web technologies
