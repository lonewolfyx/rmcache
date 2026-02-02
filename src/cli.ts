import type { IOptions } from '@/types.ts'
import * as process from 'node:process'
import { intro, log, outro } from '@clack/prompts'
import cac from 'cac'
import { glob } from 'glob'
import pc from 'picocolors'
import { rimraf } from 'rimraf'
import { resolveConfig } from '@/config.ts'
import { JUNK_DIRS, JUNK_FILES } from '@/constants.ts'
import { name, version } from '../package.json'

const cli = cac(name)

cli.command('')
    .option('-c,--cwd <path>', 'working directory', { default: process.cwd() })
    .action(async (options: IOptions) => {
        intro(pc.bgCyan(` ${name} [v${version}]`))

        const config = resolveConfig(options)

        const patterns = [
            ...JUNK_DIRS.map(d => `**/${d}/`),
            ...JUNK_FILES.map(f => `**/${f}`),
        ]

        const folders = await glob(patterns, {
            cwd: config.cwd,
            absolute: true,
            nodir: false,
            ignore: {
                ignored: (p) => {
                    // If the path already contains node_modules and does not end with node_modules, it is going deeper and can be ignored
                    const pathString = p.fullpath()
                    return pathString.includes('node_modules/') && !pathString.endsWith('node_modules/')
                },
            },
        })

        if (folders.length > 0) {
            await Promise.all(folders.map(async (folder) => {
                try {
                    await rimraf(folder)
                    log.success(`${pc.yellow('-')} ${pc.cyan(folder.replace(config.cwd, ''))}`)
                }
                catch (err) {
                    log.error(`Error removing ${folder}`)
                }
            }))
        }

        outro(`Done.`)
    })

cli.help()
cli.version(version)
cli.parse()
