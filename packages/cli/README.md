# @bucharitesh/cli

A CLI tool for adding components from [bucharitesh.in](https://bucharitesh.in/craft) and configuring MCP (Model Context Protocol) for AI coding assistants.

## Installation

```bash
# Using npm
npx @bucharitesh/cli

# Or install globally
npm install -g @bucharitesh/cli
```

## Commands

### `add`

Add Bucharitesh components to your project. This command integrates with the shadcn CLI to install components along with all required dependencies.

**Usage:**

```bash
# Add a single component
npx @bucharitesh/cli add [component]

# Add multiple components
npx @bucharitesh/cli add [component1] [component2] [component3]
```

**Examples:**

```bash
# Add the magical-mouse component
npx @bucharitesh/cli add magical-mouse

# Add multiple components at once
npx @bucharitesh/cli add book game-of-life pixel-icon
```

**Available Components:**

- `book` - An interactive 3D book component
- `game-of-life` - Conway's Game of Life implementation
- `magical-mouse` - Magical mouse trail effect
- `modern-progress` - Modern progress bar component
- `pixel-icon` - Pixelated icon component
- `view-magnifier` - View magnifier effect
- `split-text-effect` - Animated text splitting effect

### `install`

Configure MCP (Model Context Protocol) for AI coding assistants. This enables AI assistants like Claude, Cursor, Cline, and others to access Bucharitesh components directly.

**Usage:**

```bash
npx @bucharitesh/cli install <client>
```

**Supported Clients:**

- `claude` - Claude Desktop
- `cursor` - Cursor IDE
- `cline` - Cline VS Code extension
- `roo-cline` - Roo-Cline VS Code extension
- `windsurf` - Windsurf IDE

**Examples:**

```bash
# Configure MCP for Claude Desktop
npx @bucharitesh/cli install claude

# Configure MCP for Cursor IDE
npx @bucharitesh/cli install cursor

# Configure MCP for Cline
npx @bucharitesh/cli install cline
```

After installation, you may need to restart your AI assistant to see the Bucharitesh MCP server.

## What is MCP?

Model Context Protocol (MCP) allows AI coding assistants to access external tools and data sources. By installing the Bucharitesh MCP server, your AI assistant can:

- Browse available components
- Get detailed implementation information
- View example code
- Receive proper installation instructions

This makes it easier to discover and implement Bucharitesh components in your projects.

## Requirements

- Node.js 16+
- A project initialized with shadcn/ui (for the `add` command)

## Links

- [Website](https://bucharitesh.in)
- [Component Registry](https://bucharitesh.in/craft)
- [GitHub](https://github.com/bucharitesh/bucharitesh.in)

## License

Licensed under the [MIT license](https://github.com/bucharitesh/bucharitesh.in/blob/main/LICENSE).
