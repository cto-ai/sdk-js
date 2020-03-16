import path from 'path'
import util from 'util'
import childProcess from 'child_process'
import * as request from './request'
import { Interfaces } from './types'

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

export function getInterfaceType(): Interfaces {
  return (process.env.SDK_INTERFACE_TYPE as Interfaces) || Interfaces.Terminal
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
  await request.setState({ key, value })
  return request.getKVAll('state/get-all')
}

export async function getAllState(): Promise<any> {
  return request.getKVAll('state/get-all')
}

export async function getState(key: string): Promise<any> {
  return request.getKV('state/get', key)
}

export async function setConfig(key: string, value: any): Promise<void> {
  await request.setConfig({ key, value })
  return request.getKVAll('config/get-all')
}

export async function getConfig(key: string): Promise<any> {
  return request.getKV('config/get', key)
}

export async function getAllConfig(): Promise<any> {
  return request.getKVAll('config/get-all')
}

export async function getSecret(key: string): Promise<any> {
  return await request.getSecret(key)
}

export async function setSecret(key: string, value: string): Promise<any> {
  return await request.setSecret(key, value)
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
