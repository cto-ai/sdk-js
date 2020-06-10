import path from 'path'
import util from 'util'
import childProcess from 'child_process'
import * as request from './request'
import { Interfaces } from './types'

const pExec = util.promisify(childProcess.exec)

export async function exec(
  command: string,
): Promise<{ stdout: string; stderr: string }> {
  return await pExec(command)
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

// DEPRECATED: not useful without deprecated workflows feature
export function getStatePath(): string {
  return path.resolve(process.env.SDK_STATE_DIR || '')
}

// DEPRECATED: not useful with the current config API
export function getConfigPath(): string {
  return path.resolve(process.env.SDK_CONFIG_DIR || '')
}

// DEPRECATED: not useful without deprecated workflows feature
export async function setState(key: string, value: any): Promise<void> {
  await request.setState({ key, value })
  return request.getKVAll('state/get-all')
}

// DEPRECATED: not useful without deprecated workflows feature
export async function getAllState(): Promise<any> {
  return request.getKVAll('state/get-all')
}

// DEPRECATED: not useful without deprecated workflows feature
export async function getState(key: string): Promise<any> {
  return request.getKV('state/get', key)
}

export async function setConfig(key: string, value: string): Promise<void> {
  await request.setConfig({ key, value })
  return request.getKVAll('config/get-all')
}

export async function getConfig(key: string): Promise<string> {
  return request.getKV('config/get', key)
}

export async function getAllConfig(): Promise<object> {
  return request.getKVAll('config/get-all')
}

export async function deleteConfig(key: string): Promise<boolean> {
  return request.deleteKV('config/delete', key)
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

export async function events(start: string, end?: string): Promise<any> {
  return await request.events(start, end || new Date().toISOString())
}
