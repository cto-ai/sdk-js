import cli from 'cli-ux'
import link from 'terminal-link'
import { Questions } from './types'
import colors from './colors'
import * as request from './request'

const { table, tree } = cli

function url(text: string, url: string): string {
  // sdk.track(['UX', 'url'], { text, url });
  return link(colors.multiBlue(text), url)
}

async function print(text: string): Promise<void> {
  await request.print({
    text,
  })
}

async function prompt(questions: Questions): Promise<any> {
  if (Array.isArray(questions)) {
    return questions.reduce(async (results: Object, question) => {
      return Object.assign(results, await request.prompt(question))
    }, {})
  }
  return request.prompt(questions)
}

async function start(text: string): Promise<void> {
  await request.start({
    text,
  })
}

async function stop(text: string): Promise<void> {
  await request.stop({
    text,
  })
}

async function wait(duration: number): Promise<void> {
  await cli.wait(duration)
}

function init() {
  return { start: startProgress, increment: advance, stop: stopProgress }
}

async function startProgress(
  length: number,
  initial?: number,
  message?: string,
): Promise<void> {
  await request.startProgress({ length, initial, text: message })
}

async function advance(increment?: number): Promise<void> {
  await request.advanceProgress({ increment })
}

async function stopProgress(message?: string): Promise<void> {
  await request.stopProgress({ text: message })
}

export default {
  print,
  prompt,
  colors,
  spinner: {
    start,
    stop,
  },
  wait,
  url,
  table,
  tree,
  progress: { init },
}
