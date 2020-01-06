import axios from 'axios'
import { readFileSync } from 'fs'
import { Questions } from './types'
import colors from './colors'

const baseUrl = ((): String => {
  const port = process.env.SDK_SPEAK_PORT
  if (port) {
    return `http://127.0.0.1:${port}`
  } else {
    console.log(`
Looks like you don't have the SDK ${colors.errorRed(
      'daemon',
    )} running, which this SDK version needs to function. This generally means one of two things:

${colors.bold('1)')} Your ${colors.callOutCyan(
      'ops.yml',
    )} file has the wrong SDK level for the current command. Make sure that it includes the line:

${colors.actionBlue('    sdk: "2"')}

${colors.bold('2)')} Your ${colors.callOutCyan(
      'Dockerfile',
    )} does not specify a ${colors.callOutCyan(
      'CTO.ai',
    )} base image for your final container. For this SDK, it should be:

${colors.actionBlue('FROM registry.cto.ai/official_images/node:latest')}
`)

    throw 'Fatal error!'
  }
})()

export const prompt = async <A>(data: Questions): Promise<A> => {
  const daemonResponse = await axios.post(baseUrl + '/prompt', data)

  return JSON.parse(readFileSync(daemonResponse.data.replyFilename, 'utf8'))
}

function sendRequest(endpoint: string): (data: any) => Promise<void> {
  const fullURL = `${baseUrl}/${endpoint}`

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
