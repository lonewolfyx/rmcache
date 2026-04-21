<div align="center">
<h1>💨 rmcache</h1>

<p>Remove frontend junk files</p>

English | [中文](https://github.com/lonewolfyx/rmcache/blob/master/README_ZH.md)

<p>
  <a href="https://www.npmjs.com/package/rmcache"><img src="https://img.shields.io/npm/v/rmcache" alt="npm version"></a>
  <a href="https://github.com/lonewolfyx/rmcache"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license"></a>
</p>
</div>

## Introduction

rmcache is a CLI tool that helps you quickly clean up frontend project junk files and cache directories. It's perfect for freeing up disk space or preparing your project for sharing.

## Installation

```bash
npx rmcache
```

## Command Options

| Option | Description | Example |
|--------|-------------|---------|
| `[framework]` | Specify framework to clean only framework-related cache files. Currently supports `nuxt` | `rmcache nuxt` |
| `-c, --cwd <path>` | Specify working directory to clean junk files in | `rmcache -c /path/to/project` |
| `--lock` | Include lock files in cleanup (not included by default) | `rmcache --lock` |
| `--help` | Display help information | `rmcache --help` |
| `--version` | Display version number | `rmcache --version` |

## Usage Examples

### Clean Current Project

Run the command in your project directory to clean all junk files:

```bash
npx rmcache
```

### Clean Lock Files

By default, lock files are NOT cleaned. Use the `--lock` flag to include them:

```bash
npx rmcache --lock
```

### Clean Specific Framework

Clean cache files for a specific framework. Currently supports `nuxt`:

```bash
npx rmcache nuxt
```

When using framework mode, rmcache will only clean:
- `node_modules` - dependencies
- `.nuxt` - Nuxt cache directory
- `.output` - Nuxt build output

This mode is useful for monorepos where you only want to clean Nuxt-related files.

## What Gets Cleaned?

### Directories

rmcache removes the following directories:

- `node_modules` - npm/pnpm dependencies
- `dist` - build output
- `.nuxt` - Nuxt.js cache
- `.next` - Next.js cache
- `.output` - Nitro build output
- `jspm_packages` - JSPM dependencies
- `web_modules` - Snowpack dependencies
- `.cache` - generic cache
- `.parcel-cache` - Parcel bundler cache
- `.vuepress/dist` - VuePress build output
- `.temp` - temporary files
- `.svelte-kit` - SvelteKit
- `.docusaurus` - Docusaurus
- `.serverless` - Serverless Framework
- `.fusebox` - FuseBox bundler
- `.dynamodb` - DynamoDB Local
- `.firebase` - Firebase
- `.tern-port` - Tern
- `.turbo` - Turbo cache

### Lock Files

rmcache also removes package manager lock files:

- `package-lock.json` - npm
- `pnpm-lock.yaml` - pnpm
- `yarn.lock` - yarn
- `bun.lockb` - bun
- `deno.lock` - deno
- `vlt.json` - vlt

## License

[MIT](./LICENSE) License © [lonewolfyx](https://github.com/lonewolfyx)
