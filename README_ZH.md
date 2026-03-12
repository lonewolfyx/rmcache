<h1 align="center">💨 rmcache</h1>
<p align="center">清理前端项目垃圾文件</p>

[English](https://github.com/lonewolfyx/rmcache/blob/master/README.md) | 中文

<p align="center">
  <a href="https://www.npmjs.com/package/rmcache"><img src="https://img.shields.io/npm/v/rmcache" alt="npm version"></a>
  <a href="https://github.com/lonewolfyx/rmcache"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license"></a>
</p>

## 简介

rmcache 是一个命令行工具，帮助你快速清理前端项目的垃圾文件和缓存目录。非常适合用于释放磁盘空间或在分享项目前清理不必要的文件。

## 安装

```bash
npx rmcache
```

## 命令参数

| 参数 | 说明 | 示例 |
|------|------|------|
| `[framework]` | 指定框架，只清理该框架相关的缓存文件。目前支持 `nuxt` | `rmcache nuxt` |
| `-c, --cwd <path>` | 指定工作目录，清理该目录下的垃圾文件 | `rmcache -c /path/to/project` |
| `--lock` | 清理时包含锁文件（默认不包含） | `rmcache --lock` |
| `--help` | 显示帮助信息 | `rmcache --help` |
| `--version` | 显示版本号 | `rmcache --version` |

## 使用示例

### 清理当前项目

在项目目录下运行命令，清理所有垃圾文件：

```bash
npx rmcache
```

### 清理锁文件

默认情况下不会清理锁文件，使用 `--lock` 参数来包含它们：

```bash
npx rmcache --lock
```

### 清理特定框架

只清理 Nuxt 框架相关的缓存文件：

```bash
npx rmcache nuxt
```

框架模式下，只会清理以下内容：
- `node_modules` - 依赖包
- `.nuxt` - Nuxt 缓存目录
- `.output` - Nuxt 构建输出

此模式适用于 Monorepo 项目，当你只想清理 `Nuxt` 框架的文件时非常有用。

## 会清理什么内容？

### 目录

rmcache 会删除以下目录：

- `node_modules` - npm/pnpm 依赖
- `dist` - 构建输出目录
- `.nuxt` - Nuxt.js 缓存
- `.next` - Next.js 缓存
- `.output` - Nitro 构建输出
- `jspm_packages` - JSPM 依赖
- `web_modules` - Snowpack 依赖
- `.cache` - 通用缓存
- `.parcel-cache` - Parcel 打包器缓存
- `.vuepress/dist` - VuePress 构建输出
- `.temp` - 临时文件
- `.svelte-kit` - SvelteKit
- `.docusaurus` - Docusaurus
- `.serverless` - Serverless Framework
- `.fusebox` - FuseBox 打包器
- `.dynamodb` - DynamoDB Local
- `.firebase` - Firebase
- `.tern-port` - Tern
- `.turbo` - Turbo 缓存

### 锁文件

rmcache 还会删除包管理器锁文件：

- `package-lock.json` - npm
- `pnpm-lock.yaml` - pnpm
- `yarn.lock` - yarn
- `bun.lockb` - bun
- `deno.lock` - deno
- `vlt.json` - vlt

## License

[MIT](./LICENSE) License © [lonewolfyx](https://github.com/lonewolfyx)
