import cli from 'cli-ux'
import link from 'terminal-link'
import { Questions, Interfaces } from './types'
import colors from './colors'
import * as request from './request'
import { getInterfaceType } from './sdk'

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

async function prompt<A>(questions: Questions): Promise<A> {
  let answersObject = {} as A

  if (Array.isArray(questions)) {
    for (const question of questions) {
      const response = await request.prompt<A>(question)
      answersObject = {
        ...answersObject,
        ...response,
      }
    }

    return answersObject
  }

  answersObject = await request.prompt<A>(questions)
  return answersObject
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

function bold(text: string): string {
  return getInterfaceType() == Interfaces.Slack
    ? `*${text}*`
    : colors.bold(text)
}

function italic(text: string): string {
  return getInterfaceType() == Interfaces.Slack
    ? `_${text}_`
    : colors.italic(text)
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
  bold,
  italic,
  progress: { init },
}
