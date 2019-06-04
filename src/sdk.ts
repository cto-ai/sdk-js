import path from 'path'
import axios from 'axios'
import { APIResponse, User, Team } from './types';

interface UserResponse {
  me: User;
  teams: Team[]
}

const API_HOST = process.env.OPS_API_HOST || 'https://cto.ai/'
const API_PATH = process.env.OPS_API_PATH || 'api/v1'

let currentUser: UserResponse | undefined;
const apiPathName = path.join(API_HOST, API_PATH)

export async function user(): Promise<UserResponse> {
  const meUrl = new URL(path.join(apiPathName, '/me'))

  const res = await axios.request<APIResponse<UserResponse>>({
    url: meUrl.href,
    method: 'GET',
    headers: {
      Authorization: process.env.OPS_ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
  }).catch((err) => {
    throw err
  })

  return res.data.data
}

export async function track(tags: string[] | string, metadata: object): Promise<void> {
  const logUrl = new URL(path.join(apiPathName, '/log/event'))
  if (!currentUser) {
    try {
      currentUser = await user();
    } catch(err) {
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
    });
  } catch (err) {
    // TODO: again, just swallowing the error for now. We should be reporting it
  }
}
