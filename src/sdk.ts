import path from 'path'
import util from 'util'
import childProcess from 'child_process'
import { State } from './state'
import { Config } from './config'
import * as request from './request'

const pExec = util.promisify(childProcess.exec)

export async function exec(
  command: string,
): Promise<{ stdout: string; stderr: string } | Error> {
  try {
    return pExec(command)
  } catch (err) {
    return err
  }
}

export function getHostOS(): string {
  return process.env.OPS_HOST_PLATFORM || 'unknown'
}

export function homeDir(): string {
  return process.env.SDK_HOME_DIR || '/root'
}

export function log(...args: any[]): void {
  console.log(...args)
}

export function getStatePath(): string {
  return path.resolve(process.env.SDK_STATE_DIR || '')
}

export function getConfigPath(): string {
  return path.resolve(process.env.SDK_CONFIG_DIR || '')
}

export async function setState(key: string, value: any): Promise<void> {
  const state = new State(getStatePath())
  await state.set(key, value)
}

export async function getState(key: string): Promise<any> {
  const state = new State(getStatePath())
  return await state.get(key)
}

export async function setConfig(key: string, value: any): Promise<void> {
  const config = new Config(getConfigPath())
  await config.set(key, value)
}

export async function getConfig(key: string): Promise<any> {
  const config = new Config(getConfigPath())
  return await config.get(key)
}

// We expect to add an 'event' field soon
export async function track(
  tags: string[] | string,
  metadata: object,
): Promise<void> {
  try {
    await request.track({
      tags: Array.isArray(tags) ? tags : [tags],
      ...metadata,
    })
  } catch (e) {
    // Do something with this error eventually
  }
}
