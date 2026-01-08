# Axis eBoard

A modern web application built with Deno and Hono framework.

## Prerequisites

- Deno 2.0+ installed ([Install Deno](https://deno.land/))

## Quick Start

```bash
# Run the web server
deno task server

# Or run the main application
deno task dev

# Format code
deno fmt

# Check for issues
deno lint
```

The server will run on `http://localhost:3000`

## Available Commands

| Command | Description |
|---------|------------|
| `deno task dev` | Run main application with auto-reload |
| `deno task server` | Start web server with auto-reload |
| `deno task practice` | Run learning examples |
| `deno run --allow-net server-example.ts` | Run server directly |
| `deno fmt` | Format all code |
| `deno lint` | Check code for issues |
| `deno add <package>` | Add a new dependency |

## Project Structure

```
├── main.ts              # Main application entry point
├── server-example.ts    # Example REST API server
├── practice.ts          # Learning exercises
├── deno.json           # Configuration and dependencies
└── README.md           # This file
```

## Technologies

- **Runtime:** Deno 2.6.4+
- **Framework:** Hono (lightweight web framework)
- **Language:** TypeScript
- **Package Registry:** JSR & NPM

## Adding Dependencies

```bash
# From JSR (Deno registry - preferred)
deno add jsr:@std/http
deno add jsr:@oak/oak

# From NPM (Node.js packages)
deno add npm:mongoose
deno add npm:zod
```

Dependencies are automatically added to `deno.json` under `imports`.

## Development Workflow

1. **Write code** in TypeScript (`.ts` files)
2. **Save the file** (auto-reload triggers)
3. **Check browser/terminal** for results
4. **Format code:** `deno fmt`
5. **Check errors:** `deno lint`

## API Examples

### Get All Todos
```bash
curl http://localhost:3000/todos
```

### Create New Todo
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"task":"Learn Deno"}'
```

### Greet Someone
```bash
curl http://localhost:3000/hello/YourName
```

## Deployment

### Option 1: Deno Deploy (Recommended)

1. Push code to GitHub
2. Connect at [Deno Deploy](https://deno.deploy)
3. Select repository and deployment file
4. Your app is live!

### Option 2: Compile to Executable

```bash
deno compile --allow-net --output=myapp server-example.ts
./myapp  # Run standalone executable
```

### Option 3: Docker

```dockerfile
FROM denoland/deno:latest

WORKDIR /app
COPY . .

CMD ["deno", "run", "--allow-net", "server-example.ts"]
```

## Permissions

Deno requires explicit permissions. Common flags:

- `--allow-net` - Network access
- `--allow-read` - Read files
- `--allow-write` - Write files
- `--allow-env` - Access environment variables
- `-A` - Allow all permissions (use with caution)

## Learning Resources

- [Deno Manual](https://docs.deno.com/runtime/manual)
- [Hono Documentation](https://hono.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Troubleshooting

**Module not found error?**
```bash
# Clear Deno cache
deno clean

# Re-run your code
deno run main.ts
```

**Permission denied?**
```bash
# Run with required permissions
deno run --allow-net --allow-read server-example.ts
```

**Port already in use?**
Change port in server code or kill existing process:
```powershell
Get-Process -Name "node" | Stop-Process -Force
```

## Next Steps

1. **Modify `server-example.ts`** - Add your own routes
2. **Add dependencies** - Use `deno add` for packages
3. **Deploy** - Use Deno Deploy for free hosting
4. **Learn more** - Check official documentation

## License

MIT
