import axios from 'axios'
import { readFileSync } from 'fs'
import { Questions } from './types'
import colors from './colors'

const baseUrl = (): String => {
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

    throw 'Error contacting daemon!'
  }
}

function processAxiosError(err: any): any {
  if (err.response) {
    return {
      status: err.response.status,
      data: err.response.data,
    }
  }
  return err
}

export const prompt = async <A>(data: Questions): Promise<A> => {
  let daemonResponse
  try {
    daemonResponse = await axios.post(baseUrl() + '/prompt', data)
  } catch (err) {
    throw processAxiosError(err)
  }

  return JSON.parse(readFileSync(daemonResponse.data.replyFilename, 'utf8'))
}

export const getSecret = async <A>(key: string): Promise<A> => {
  let daemonResponse
  try {
    daemonResponse = await axios.post(baseUrl() + '/secret/get', { key })
  } catch (err) {
    throw processAxiosError(err)
  }

  return JSON.parse(readFileSync(daemonResponse.data.replyFilename, 'utf8'))
}

export const setSecret = async <A>(key: string, value: string): Promise<A> => {
  let daemonResponse
  try {
    daemonResponse = await axios.post(baseUrl() + '/secret/set', { key, value })
  } catch (err) {
    throw processAxiosError(err)
  }

  return JSON.parse(readFileSync(daemonResponse.data.replyFilename, 'utf8'))
}

export const getKV = async <A>(endpoint: string, key: string): Promise<A> => {
  let daemonResponse
  try {
    daemonResponse = await axios.post(baseUrl() + '/' + endpoint, { key })
  } catch (err) {
    throw processAxiosError(err)
  }

  return daemonResponse.data.value
}

export const getKVAll = async <A>(endpoint: string): Promise<A> => {
  let daemonResponse
  try {
    daemonResponse = await axios.post(baseUrl() + '/' + endpoint, {})
  } catch (err) {
    throw processAxiosError(err)
  }

  return daemonResponse.data.value
}

export const deleteKV = async <A>(
  endpoint: string,
  key: string,
): Promise<A> => {
  let daemonResponse
  try {
    daemonResponse = await axios.post(baseUrl() + '/' + endpoint, { key })
  } catch (err) {
    throw processAxiosError(err)
  }

  return daemonResponse.data.value
}

export const events = async <A>(start: string, end: string): Promise<A> => {
  let daemonResponse
  try {
    daemonResponse = await axios.post(baseUrl() + '/events', { start, end })
  } catch (err) {
    throw processAxiosError(err)
  }

  return daemonResponse.data.value
}

function sendRequest(endpoint: string): (data: any) => Promise<void> {
  return async (data: any): Promise<any> => {
    try {
      await axios.post(`${baseUrl()}/${endpoint}`, data)
    } catch (err) {
      throw processAxiosError(err)
    }
  }
}

export const print = sendRequest('print')
export const start = sendRequest('start-spinner')
export const stop = sendRequest('stop-spinner')
export const startProgress = sendRequest('progress-bar/start')
export const advanceProgress = sendRequest('progress-bar/advance')
export const stopProgress = sendRequest('progress-bar/stop')
export const track = sendRequest('track')
export const setState = sendRequest('state/set')
export const setConfig = sendRequest('config/set')
