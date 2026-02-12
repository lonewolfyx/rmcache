import { basename, dirname, sep } from 'node:path'
import { JUNK_DIRS, NODE_MODULES, NUXT } from '@/constants.ts'

export const getCacheDir = (framework: string): string[] => {
    switch (framework) {
        case 'nuxt':
            return [NODE_MODULES, NUXT]
        default:
            return JUNK_DIRS
    }
}

export const getFrameWorkDirName = (framework: string): string => {
    switch (framework) {
        case 'nuxt':
            return NUXT
        default:
            return ''
    }
}

export const filterAppPaths = (framework: string, paths: string[]) => {
    const appRoots = new Set(
        paths
            .filter(p => basename(p) === getFrameWorkDirName(framework))
            .map(p => dirname(p)),
    )

    return paths.filter((p) => {
        for (const root of appRoots) {
            if (p === root || p.startsWith(root + sep)) {
                return true
            }
        }
        return false
    })
}
