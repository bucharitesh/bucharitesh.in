# @bucharitesh/mcp

Official Model Context Protocol (MCP) server for [bucharitesh.in](https://bucharitesh.in) components. This enables AI coding assistants to discover, browse, and get implementation details for Bucharitesh UI components.

## What is MCP?

Model Context Protocol (MCP) is an open standard that enables AI applications to securely connect to external data sources and tools. By installing this MCP server, your AI assistant can:

- **Discover Components**: Browse all available Bucharitesh components
- **Get Implementation Details**: Access complete component code, props, and types
- **View Examples**: See example implementations and usage patterns
- **Installation Instructions**: Receive proper commands to install components in your project

## Quick Start

The easiest way to install the Bucharitesh MCP server is using the [@bucharitesh/cli](https://www.npmjs.com/package/@bucharitesh/cli):

```bash
# For Claude Desktop
npx @bucharitesh/cli install claude

# For Cursor IDE
npx @bucharitesh/cli install cursor

# For Cline VS Code extension
npx @bucharitesh/cli install cline

# For other supported clients: roo-cline, windsurf
npx @bucharitesh/cli install <client>
```

After installation, restart your AI assistant to activate the MCP server.

## Manual Installation

If you prefer to configure MCP manually, you can add the server to your AI assistant's configuration file:

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "bucharitesh": {
      "command": "npx",
      "args": ["-y", "@bucharitesh/mcp"]
    }
  }
}
```

### Cursor

Add to `~/.cursor/mcp.json` or your Cursor settings:

```json
{
  "mcpServers": {
    "bucharitesh": {
      "command": "npx",
      "args": ["-y", "@bucharitesh/mcp"]
    }
  }
}
```

### Cline / Roo-Cline (VS Code)

Add to your VS Code settings or Cline's configuration:

```json
{
  "mcpServers": {
    "bucharitesh": {
      "command": "npx",
      "args": ["-y", "@bucharitesh/mcp"]
    }
  }
}
```

### Windsurf

Add to Windsurf's MCP configuration file:

```json
{
  "mcpServers": {
    "bucharitesh": {
      "command": "npx",
      "args": ["-y", "@bucharitesh/mcp"]
    }
  }
}
```

## Available Tools

The MCP server exposes the following tools to AI assistants:

### `getUIComponents`

Returns a comprehensive list of all available Bucharitesh components with their names, types, and descriptions.

**Example Usage by AI:**
```
Get all available Bucharitesh components
```

### `getComponents`

Provides detailed implementation information for specific components, including:
- Full component source code
- TypeScript types and interfaces
- Props documentation
- Installation instructions
- Example implementations
- Import statements

**Components Included:**
- `book` - Interactive 3D book component
- `game-of-life` - Conway's Game of Life
- `magical-mouse` - Magical mouse trail effect
- `modern-progress` - Modern progress bar
- `pixel-icon` - Pixelated icon component
- `view-magnifier` - View magnifier effect
- `split-text-effect` - Animated text splitting

**Example Usage by AI:**
```
Show me how to implement the magical-mouse component
```

## How It Works

When you ask your AI assistant about Bucharitesh components, the MCP server:

1. **Fetches Component Data**: Retrieves up-to-date component information from the Bucharitesh registry
2. **Provides Context**: Gives the AI assistant full context about component props, types, and usage
3. **Generates Instructions**: Provides accurate installation commands using the shadcn CLI
4. **Shows Examples**: Displays example implementations to help with integration

## Requirements

- Node.js 16 or higher
- An AI assistant that supports MCP (Claude Desktop, Cursor, Cline, etc.)

## Development

```bash
# Install dependencies
pnpm install

# Build the server
pnpm build

# Run the server
pnpm start

# Development mode with auto-rebuild
pnpm dev
```

## Architecture

The MCP server is built with:
- **@modelcontextprotocol/sdk**: Official MCP SDK for Node.js
- **Zod**: Runtime type validation for API responses
- **TypeScript**: Full type safety

The server fetches component data from `https://bucharitesh.in/r/{component}.json` endpoints and formats it for AI consumption.

## Troubleshooting

### Server Not Showing Up

1. Verify the configuration file path is correct for your AI assistant
2. Restart your AI assistant completely
3. Check that Node.js 16+ is installed: `node --version`

### Components Not Loading

1. Ensure you have an active internet connection
2. Check that the registry at `https://bucharitesh.in` is accessible
3. Try reinstalling: `npx @bucharitesh/cli install <client>`

## Links

- [Website](https://bucharitesh.in)
- [Component Registry](https://bucharitesh.in/craft)
- [GitHub](https://github.com/bucharitesh/bucharitesh.in)
- [CLI Package](https://www.npmjs.com/package/@bucharitesh/cli)
- [Model Context Protocol](https://modelcontextprotocol.io)

## License

Licensed under the [MIT license](https://github.com/bucharitesh/bucharitesh.in/blob/main/LICENSE).
