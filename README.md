# Axis eBoard

![CI Status](https://github.com/pohlai88/eBoard/actions/workflows/deno-ci.yml/badge.svg)

A modern web application built with Deno. This repo is optimized for Deno-first workflows in VS Code
with tasks, debugging, linting, tests, and CI coverage.

## Prerequisites

- Deno 2.0+ installed ([Install Deno](https://deno.land/))

## Quick Start

```bash
# Run admin API and main app (watch)
deno task dev:admin
deno task dev:app

# Format code
deno fmt

# Check for issues
deno lint
```

The app runs under Deno tasks; see [deno.json](deno.json) for available scripts.

## Available Commands

| Command                   | Description             |
| ------------------------- | ----------------------- |
| `deno task dev:admin`     | Run Admin API (watch)   |
| `deno task dev:app`       | Run Main App (watch)    |
| `deno task docs:serve`    | Serve PRD docs          |
| `deno task docs:validate` | Validate PRD docs       |
| `deno task analyze:prd`   | Analyze PRD docs        |
| `deno fmt`                | Format all code         |
| `deno lint`               | Check code for issues   |
| `deno task check`         | Format + Lint + Test    |
| `deno task test:coverage` | Run tests with coverage |
| `deno add <package>`      | Add a new dependency    |

## Project Structure (Deno Workspace)

```
├── admin-api/           # Admin API service
├── main-app/            # Frontend app (Fresh/Preact/Twind planned)
├── shared/              # Shared types, utils, validation
├── tools/               # PRD analysis/serve/cleanup scripts
├── .PRD/                # Product requirements and docs
├── deno.json            # Workspace tasks & import map
└── README.md            # This file
```

## Technologies

- **Runtime:** Deno 2.x
- **Frontend:** Fresh + Preact + Twind (per PRD strategy)
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
6. **Run tests:** `deno test`
7. **Aggregate checks:** `deno task check`

### VS Code Integration

- Deno extension enabled; see [.vscode/settings.json](.vscode/settings.json)
- Debug configs available; see [.vscode/launch.json](.vscode/launch.json)
- Common tasks; see [.vscode/tasks.json](.vscode/tasks.json)

### Coverage

Generate coverage locally:

```powershell
deno task test:coverage
deno coverage coverage --lcov > coverage.lcov
```

HTML coverage is available at `coverage/html/index.html` if generated.

### Pre-commit Hook

This repo uses a Git pre-commit hook to keep code quality high. It runs format (check), lint, and
tests before allowing a commit.

Setup (already configured by the repo):

- Hooks path is set to `.githooks`.
- Script: `.githooks/pre-commit` (shell script).

If hooks don’t run, set the hooks path manually:

```powershell
git config core.hooksPath .githooks
```

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

**Port already in use?** Change port in server code or kill existing process:

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
