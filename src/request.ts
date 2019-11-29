import axios from 'axios'
import { readFileSync } from 'fs'

export const prompt = async (data: Object): Promise<any> => {
  const daemonResponse = await axios.post(
    `http://127.0.0.1:${process.env.SDK_SPEAK_PORT}/prompt`,
    data,
  )

  return JSON.parse(readFileSync(daemonResponse.data.replyFilename, 'utf8'))
}

function sendRequest(endpoint: string): (data: Object) => Promise<void> {
  const fullURL = `http://127.0.0.1:${process.env.SDK_SPEAK_PORT}/${endpoint}`

  return async (data: any): Promise<any> => {
    await axios.post(fullURL, data)
  }
}

export const print = sendRequest('print')
export const start = sendRequest('start-spinner')
export const stop = sendRequest('stop-spinner')
export const startProgress = sendRequest('progress-bar/start')
export const advanceProgress = sendRequest('progress-bar/advance')
export const stopProgress = sendRequest('progress-bar/stop')
export const track = sendRequest('track')
