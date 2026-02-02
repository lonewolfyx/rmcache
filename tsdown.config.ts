import { defineConfig } from 'tsdown'

export default defineConfig({
    entry: 'src/cli.ts',
    dts: true,
    clean: true,
    sourcemap: true,
    platform: 'node',
    inlineOnly: false,
})
