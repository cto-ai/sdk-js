import chalk from 'chalk'

const labelledColors = {
  callOutCyan: chalk.hex('#0DE0CF'),
  actionBlue: chalk.hex('#87E3F8'),
  primary: chalk.hex('#f7f7f7'),
  secondary: chalk.hex('#7278ac'),
  tertiary: chalk.hex('#bbbed8'),
  successGreen: chalk.hex('#4cf679'),
  errorRed: chalk.hex('#dc6467'),
  multiPurple: chalk.hex('#9013F3'),
  multiBlue: chalk.hex('#1775FF'),
  multiOrange: chalk.hex('#F6934C'),
}

export default Object.assign(chalk, labelledColors)
