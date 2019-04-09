import axios from 'axios';
import log from './log';
interface User {
  id: string;
}

const API_HOST = process.env.OPS_API_HOST || 'https://cto.ai/';
const API_PATH = process.env.OPS_API_PATH || 'api/v1';

// let currentUser: User;

async function user(): Promise<User> {
  const res = await axios({
    url: API_HOST+API_PATH+'/auth',
    method: 'post',
    headers: {
      Authorization: `Bearer ${process.env.OPS_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  }).catch(err => {
    throw err;
  });
  return res.data;
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
  user
  // track
};
