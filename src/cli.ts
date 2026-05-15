import type { IOptions } from '@/types.ts'
import * as process from 'node:process'
import { intro, log, note, outro, progress, spinner } from '@clack/prompts'
import cac from 'cac'
import { glob } from 'glob'
import pc from 'picocolors'
import { rimraf } from 'rimraf'
import { filterAppPaths, getCacheDir, getFrameWorkDirName } from '@/cacheDir.ts'
import { resolveConfig } from '@/config.ts'
import { ignoreFilename, JUNK_FILES } from '@/constants.ts'
import { name, version } from '../package.json'

const cli = cac(name)

cli.command('[framework]')
    .option('-c,--cwd <path>', 'working directory', { default: process.cwd() })
    .option('--lock', 'clean lock files', { default: false })
    .action(async (framework: string = '', options: IOptions) => {
        intro(pc.bgCyan(` ${name} [v${version}]`))

        if (framework && !getFrameWorkDirName(framework)) {
            log.error(`${pc.red('Error')}: Framework ${framework} is not supported`)
            process.exit(0)
        }

        const config = resolveConfig(options)

        const patterns = [
            ...getCacheDir(framework).map(d => `**/${d}/`),
            ...(framework ? [] : (options.lock ? JUNK_FILES.map(f => `**/${f}`) : [])),
        ]

        const s = spinner()
        s.start('Checking the "old stuff" in the project...')
        let folders = await glob(patterns, {
            cwd: config.cwd,
            absolute: true,
            nodir: false,
            dot: true,
            ignore: {
                ignored: (p) => {
                    const pathString = p.fullpath()

                    if (ignoreFilename.some(folder => pathString.includes(folder))) {
                        return true
                    }

                    return pathString.includes('node_modules/') && !pathString.endsWith('node_modules/')
                },
            },
        })

        if (framework) {
            folders = filterAppPaths(framework, folders)
        }
        s.stop(`Find ${pc.red(folders.length)} cleanable targets (e.g., node_modules, etc.)`)

        if (folders.length > 0) {
            const prog = progress({
                style: 'block',
                max: folders.length,
                size: folders.length >= 40 ? folders.length : 40,
            })

            prog.start('Freeing up disk space...')

            await Promise.all(folders.map(async (folder) => {
                prog.advance(1)
                try {
                    await rimraf(folder)
                }
                catch (err) {
                    log.error(`Error removing ${folder}`)
                }
            }))

            prog.stop('Clean up!')

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
