import path from 'path'
import axios from 'axios'
interface User {
  id: string
}

const API_HOST = process.env.OPS_API_HOST || 'https://cto.ai/'
const API_PATH = process.env.OPS_API_PATH || 'api/v1'

// let currentUser: User;

async function user(): Promise<User> {
  const apiPathName = path.join(API_HOST, API_PATH, '/me')
  const meUrl = new URL(apiPathName)

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

// async function track(tag: string[] | string, metaData: object): Promise<void> {
//   if (!currentUser)
//     currentUser = (await user().catch(err => {})) || { id: undefined };
//   const event = {
//     userId: currentUser.id,
//     teamId: process.env.OPS_TEAM_ID,
//     opId: process.env.OPS_OP_ID,
//     metaData
//   };
//   log.info({ event, tags: tag });
// }

export default {
  user,
  // track
}
