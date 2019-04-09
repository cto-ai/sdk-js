import cli from 'cli-ux';
import inquirer from './packages/inquirer/lib/inquirer';
import _cliProgress from 'cli-progress';
import notifier from 'node-notifier';
import colors from './colors';
import sdk from './sdk';

const link = require('terminal-link');

const { table, tree, action } = cli;

function url(text: string, url: string): void {
  // sdk.track(['UX', 'url'], { text, url });
  return link(colors.multiBlue(text), url);
}
function annotation(text: string, annotation: string): void {
  // sdk.track(['UX', 'annotation'], { text, annotation });
  cli.annotation(text, annotation);
}
function notify(options: object): void {
  // sdk.track(['UX', 'notify'], options);
  notifier.notify(options);
}

async function prompt(questions: object[] | object): Promise<object> {
  // sdk.track(['UX', 'prompt'], questions);
  const answers = await inquirer.prompt(questions);
  return answers;
}

function start(text: string): void {
  // sdk.track(['UX', 'spiner-start']);
  action.start(text);
}

function stop(text: string): void {
  // sdk.track(['UX', 'spiner-stop']);
  action.stop(text);
}

async function wait(duration: number): Promise<void> {
  // sdk.track(['UX', 'wait'], { duration });
  await cli.wait(duration);
}

const present = {
  format: colors.callOutCyan(' {bar} {percentage}% '),
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591'
};

function init(options: object = present) {
  // sdk.track(['UX', 'progress bar'], { options });
  return new _cliProgress.Bar(options);
}

export default {
  prompt,
  colors,
  spinner: {
    start,
    stop
  },
  wait,
  url,
  annotation,
  table,
  tree,
  progress: { init },
  notify
};
