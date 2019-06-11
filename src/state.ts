import { outputJson, readJson } from 'fs-extra'
import * as path from 'path'

export class State {
  constructor(private stateDir: string) {}

  getAll = async (): Promise<Record<string, any>> => {
    return readJson(path.join(this.stateDir, 'state.json')).catch(() => ({}))
  }

  get = async (key: string): Promise<any> => {
    const origConfigObj = await this.getAll()
    return origConfigObj[key]
  }

  set = async (key: string, value: any): Promise<any> => {
    const origConfigObj = await this.getAll()

    const mergedConfigObj = {
      ...origConfigObj,
      [key]: value,
    }
    await outputJson(path.join(this.stateDir, 'state.json'), mergedConfigObj)
    return mergedConfigObj
  }
}
