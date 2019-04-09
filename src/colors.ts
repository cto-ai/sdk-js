import chalk from 'chalk';

const callOutCyan = (text: string): string => {
  return chalk.hex('#0DE0CF')(text);
};

const actionBlue = (text: string): string => {
  return chalk.hex('#87E3F8')(text);
};

const primary = (text: string): string => {
  return chalk.hex('#f7f7f7')(text);
};

const secondary = (text: string): string => {
  return chalk.hex('#7278ac')(text);
};

const tertiary = (text: string): string => {
  return chalk.hex('#bbbed8')(text);
};

const successGreen = (text: string): string => {
  return chalk.hex('#4cf679')(text);
};

const errorRed = (text: string): string => {
  return chalk.hex('#dc6467')(text);
};

const multiPurple = (text: string): string => {
  return chalk.hex('#9013F3')(text);
};

const multiBlue = (text: string): string => {
  return chalk.hex('#1775FF')(text);
};

const multiOrange = (text: string): string => {
  return chalk.hex('#F6934C')(text);
};

const labelledColors = {
  callOutCyan,
  actionBlue,
  primary,
  secondary,
  tertiary,
  successGreen,
  errorRed,
  multiPurple,
  multiBlue,
  multiOrange
};

export default Object.assign(chalk, labelledColors);
