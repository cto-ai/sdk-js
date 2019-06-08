import path from 'path'
import axios from 'axios'
import util from 'util'
import childProcess from 'child_process'
import isDocker from 'is-docker'
import os from 'os'
import { APIResponse, User, Team } from './types'
import { State } from './state'

interface UserResponse {
  me: User
  teams: Team[]
}
const stateDir = path.resolve(
  `${homeDir()}/.config/@cto.ai/ops/${process.env.OPS_TEAM_NAME}/${
    process.env.OPS_OP_NAME
  }`,
)

const pExec = util.promisify(childProcess.exec)

const API_HOST = process.env.OPS_API_HOST || 'https://cto.ai/'
const API_PATH = process.env.OPS_API_PATH || 'api/v1'

let currentUser: UserResponse | undefined
const apiPathName = path.join(API_HOST, API_PATH)

export async function exec(
  command: string,
): Promise<{ stdout: string; stderr: string } | Error> {
  try {
    return pExec(command)
  } catch (err) {
    return err
  }
}

export function homeDir(): string {
  return isContainer() ? '/root' : os.homedir()
}

// TODO: enable other checks besides docker container and host
export function isContainer(): boolean {
  return isDocker()
}

export function log(...args: any[]): void {
  console.log(...args)
}

export async function user(): Promise<UserResponse> {
  const meUrl = new URL(path.join(apiPathName, '/me'))

  const res = await axios
    .request<APIResponse<UserResponse>>({
      url: meUrl.href,
      method: 'GET',
      headers: {
        Authorization: process.env.OPS_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
    })
    .catch(err => {
      throw err
    })

  return res.data.data
}

export async function setState(key: string, value: any): Promise<void> {
  const state = new State(stateDir)
  await state.set(key, value)
}

export async function getState(key: string): Promise<any> {
  const state = new State(stateDir)
  return await state.get(key)
}

export async function track(
  tags: string[] | string,
  metadata: object,
): Promise<void> {
  const logUrl = new URL(path.join(apiPathName, '/log/event'))
  if (!currentUser) {
    try {
      currentUser = await user()
    } catch (err) {
      // TODO: currently we swallow this error but it should be reported to the server
    }
  }

  try {
    await axios({
      url: `${logUrl}`,
      method: 'POST',
      headers: {
        Authorization: process.env.OPS_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
      data: {
        opid: process.env.OPS_OP_ID,
        teamid: process.env.OPS_TEAM_ID,
        userid: currentUser !== undefined ? currentUser.me.id : undefined,
        metadata,
        tags,
      },
    })
  } catch (err) {
    // TODO: again, just swallowing the error for now. We should be reporting it
  }
}
