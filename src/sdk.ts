import path from 'path'
import axios from 'axios'

interface User {
  id: string
}

const API_HOST = process.env.OPS_API_HOST || 'https://cto.ai/'
const API_PATH = process.env.OPS_API_PATH || 'api/v1'

let currentUser: User
const apiPathName = path.join(API_HOST, API_PATH)

async function user(): Promise<User> {
  const meUrl = new URL(path.join(apiPathName, '/me'))

  const res = await axios({
    url: meUrl.href,
    method: 'GET',
    headers: {
      Authorization: `${process.env.OPS_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }).catch(err => {
    throw err
  })
  return res.data.data
}

async function track(tags: string[] | string, metadata: object): Promise<void> {
  const logUrl = new URL(path.join(apiPathName, '/log/event'))
  if (!currentUser) {
    currentUser = (await user().catch(err => {})) || { id: undefined }
  }
  await axios({
    url: `${logUrl}`,
    method: 'POST',
    headers: {
      Authorization: `${process.env.OPS_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      opid: process.env.OPS_OP_ID,
      teamid: process.env.OPS_TEAM_ID,
      userid: currentUser.id,
      metadata,
      tags,
    },
  }).catch(err => {
    throw err
  })
}

export default {
  user,
  track,
}
