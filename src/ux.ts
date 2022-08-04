import cli from 'cli-ux'
import inquirer = require('inquirer')
import * as cliProgress from 'cli-progress'
import notifier from 'node-notifier'
import link from 'terminal-link'
import colors from './colors'

const { table, tree, action } = cli

function url(text: string, url: string): string {
  // sdk.track(['UX', 'url'], { text, url });
  return link(colors.multiBlue(text), url)
}
function annotation(text: string, annotation: string): void {
  // sdk.track(['UX', 'annotation'], { text, annotation });
  cli.annotation(text, annotation)
}
function notify(options: object): void {
  // sdk.track(['UX', 'notify'], options);
  notifier.notify(options)
}

async function print(text: string): Promise<void> {
  return new Promise(resolve => {
    console.log(text)
    resolve()
  })
}

async function prompt<A>(questions: inquirer.QuestionCollection<A>): Promise<A> {
  // sdk.track(['UX', 'prompt'], questions);
  return inquirer.prompt<A>(questions)
}

function start(text: string): void {
  // sdk.track(['UX', 'spiner-start']);
  action.start(text)
}

function stop(text: string): void {
  // sdk.track(['UX', 'spiner-stop']);
  action.stop(text)
}

async function wait(duration: number): Promise<void> {
  // sdk.track(['UX', 'wait'], { duration });
  await cli.wait(duration)
}

const present: cliProgress.Options = {
  format: colors.callOutCyan(' {bar} {percentage}% '),
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
}

function init(options: cliProgress.Options = present) {
  // sdk.track(['UX', 'progress bar'], { options });
  return new cliProgress.Bar(options)
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
  annotation,
  table,
  tree,
  progress: { init },
  notify,
  inquirer,
}
