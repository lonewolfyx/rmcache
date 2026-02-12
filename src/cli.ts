import type { IOptions } from '@/types.ts'
import * as process from 'node:process'
import { intro, log, note, outro } from '@clack/prompts'
import cac from 'cac'
import { glob } from 'glob'
import pc from 'picocolors'
import { rimraf } from 'rimraf'
import { filterAppPaths, getCacheDir, getFrameWorkDirName } from '@/cacheDir.ts'
import { resolveConfig } from '@/config.ts'
import { JUNK_FILES } from '@/constants.ts'
import { name, version } from '../package.json'

const cli = cac(name)

cli.command('[framework]')
    .option('-c,--cwd <path>', 'working directory', { default: process.cwd() })
    .action(async (framework: string = '', options: IOptions) => {
        intro(pc.bgCyan(` ${name} [v${version}]`))

        if (framework && !getFrameWorkDirName(framework)) {
            log.error(`${pc.red('Error')}: Framework ${framework} is not supported`)
            process.exit(0)
        }

        const config = resolveConfig(options)

        const patterns = [
            ...getCacheDir(framework).map(d => `**/${d}/`),
            ...(framework ? [] : JUNK_FILES.map(f => `**/${f}`)),
        ]

        let folders = await glob(patterns, {
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

        if (framework) {
            folders = filterAppPaths(framework, folders)
        }

        if (folders.length > 0) {
            await Promise.all(folders.map(async (folder) => {
                try {
                    await rimraf(folder)
                }
                catch (err) {
                    log.error(`Error removing ${folder}`)
                }
            }))

            note(
                folders
                    .map(f => `${pc.yellow('-')} ${pc.cyan(f.replace(config.cwd, ''))}`)
                    .join('\n'),
                'Delete directory:',
            )
        }

        outro(`🎉 Done.`)
    })

cli.help()
cli.version(version)
cli.parse()
