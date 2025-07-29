# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Plan & Review

### Before starting work
- Always in plan mode to make a plan.
- After getting the plan, make sure you write the plan to `.claude/tasks/TASK_NAME.md`.
- The plan should be a detailed implementation plan and the reasoning behind it, as well as tasks broken down.
- If the task requires external knowledge or a certain package, also research to get the latest knowledge (use Task tool for research).
- Don't over plan it, always think MVP.
- Once you write the plan, firstly ask me to review it. Do not continue until I approve the plan.

### While implementing
- You should update the plan as you work.
- After you complete tasks in the plan, you should update and append detailed descriptions of the changes you made, so following tasks can be easily handed over to other engineers.

## Development Commands

### Package Management
- **Package Manager**: pnpm (enforced via `preinstall` script)
- **Node Version**: >=20.6.1, pnpm >=9

### Core Development Commands
```bash
# Development server (runs on port 6969)
pnpm dev

# Email development server (runs on port 3333) 
pnpm email:dev

# Build project (includes docs and registry build)
pnpm build

# Type checking (includes docs build)
pnpm typecheck

# Linting and formatting
pnpm lint
pnpm lint:fix
pnpm format

# Testing
pnpm test
```

### Specialized Build Commands
```bash
# Build component registry (for /r API endpoint)
pnpm build:registry

# Build content collections (MDX content)
pnpm build:docs

# Clear Next.js cache
pnpm clear-cache
```

## Project Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Content**: Content Collections for MDX processing
- **UI**: Radix UI components with custom implementations
- **State**: Jotai for state management
- **Database**: Neon (PostgreSQL) with Drizzle ORM
- **Auth**: NextAuth.js v5 beta
- **3D**: React Three Fiber with Drei
- **Email**: React Email components

### Directory Structure

#### `/app` - Next.js App Router
- **Route-based file system** with nested layouts
- Key routes: `/`, `/craft`, `/guestbook`, `/blog`, `/cal`, `/resume`
- API routes in `/api` (auth, weather)
- Each route can have `page.tsx`, `layout.tsx`, and component files

#### `/components` - Reusable Components
- **Organized by feature/domain**:
  - `ui/` - Base UI components (Radix-based)
  - `navigation/` - Navigation components (dock, floating header)
  - `guestbook/` - Guestbook-specific components
  - `command-menu/` - Command palette with apps
  - `layout/` - Layout-level components and easter eggs
- **Component patterns**: Each component exports default, uses TypeScript interfaces

#### `/lib` - Utilities and Configuration
- **Core utilities**: `utils.ts`, `config.ts`
- **Services**: GitHub, Spotify, Raindrop integrations
- **Database**: Drizzle schemas and actions
- **Auth**: NextAuth configuration
- **Hooks**: Custom React hooks
- **Theme**: CSS variables and theme management

#### `/content` - MDX Content
- **Content Collections structure**:
  - `crafts/` - Interactive components and demos
  - `posts/` - Blog posts
  - `uses/` - Tools and equipment pages
- **Schema validation** with Zod for type safety

#### `/registry` - Component Registry System
- **Shareable component system** accessible via `/r` API
- **Structure**: `default/bucharitesh/` for custom components
- **Build process**: Generates JSON registry with file contents
- **Schema**: Type-safe registry entries with metadata

### Key Patterns

#### Content Management
- **Content Collections**: MDX files with frontmatter, processed at build time
- **Code highlighting**: Shiki with rehype plugins for syntax highlighting
- **Component embedding**: Custom rehype plugins for component imports

#### Component Registry
- **Self-hosting components**: Components are built into JSON files served at `/r/*`
- **Metadata-driven**: Components include dependencies, CSS variables, examples
- **Type-safe schemas**: Zod validation for registry entries

#### Theming & Styling
- **CSS-in-JS approach**: Tailwind with CSS variables
- **Design tokens**: Centralized color and spacing system
- **Custom animations**: Extensive keyframe definitions in Tailwind config
- **Responsive layouts**: Custom grid classes for different layouts

#### Authentication & Database
- **NextAuth v5**: Session-based auth with providers
- **Drizzle ORM**: Type-safe database queries
- **Server actions**: Form handling with server-side validation

## Development Guidelines

### File Organization
- **Co-locate related files**: Keep components, styles, and types together
- **Use TypeScript**: All components should have proper type definitions
- **Export patterns**: Default exports for components, named exports for utilities

### Component Development
- **Radix UI base**: Build on top of Radix primitives for accessibility
- **Tailwind styling**: Use utility classes with CSS variables for theming
- **Server/Client boundaries**: Mark client components explicitly

### Content Development
- **MDX structure**: Use proper frontmatter schema for content types
- **Component imports**: Use registry components in MDX via custom plugins
- **Asset optimization**: Use next/image for optimized images

### Registry System
- **Component registration**: Add new components to `registry/` with proper metadata
- **Build integration**: Run `pnpm build:registry` after registry changes
- **Type safety**: Follow registry schema patterns for consistency

## Testing & Quality

### Code Quality
- **TypeScript strict mode**: Enabled with null checks
- **ESLint**: Next.js configuration with custom rules
- **Prettier**: Consistent code formatting with Tailwind plugin
- **Husky**: Git hooks for pre-commit validation

### Testing Framework
- **Vitest**: Testing framework (single-threaded for stability)
- **Component testing**: Focus on component behavior and integration

## Deployment Considerations

### Build Process
1. Content collections build (docs)
2. Registry build (component system)
3. Next.js build
4. Type checking validation

### Environment Requirements
- **Node.js**: Version 20.6.1 or higher
- **pnpm**: Version 9 or higher
- **Database**: Neon PostgreSQL connection
- **External APIs**: GitHub, Spotify, weather services