export const NODE_MODULES = 'node_modules'
export const DIST = 'dist'
export const NUXT = '.nuxt'
export const NEXT = '.next'

export const JUNK_DIRS = [
    NODE_MODULES,
    DIST,
    NUXT,
    NEXT,
    'jspm_packages',
    'web_modules',
    '.cache',
    '.parcel-cache',
    'out',
    '.vuepress/dist',
    '.temp',
    '.svelte-kit',
    '.docusaurus',
    '.serverless',
    '.fusebox',
    '.dynamodb',
    '.firebase',
    '.tern-port',
    '.turbo',
]

export const JUNK_FILES = [
    'package-lock.json', // npm
    'pnpm-lock.yaml', // pnpm
    'yarn.lock', //  yarn
    'bun.lockb', // bun
    'deno.lock', // deno
    'vlt.json', // vlt
]
