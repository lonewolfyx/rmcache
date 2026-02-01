import type { IConfig, IOptions } from '@/types.ts'
import { isAbsolute, resolve } from 'node:path'

export const resolveConfig = (options: IOptions): IConfig => {
    return {
        cwd: isAbsolute(options.cwd) ? options.cwd : resolve(process.cwd(), options.cwd),
    }
}
