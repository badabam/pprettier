import printPrettierrcSync from './printPrettierrcSync'

export default function exitWithMessage(message, prettierPath) {
  console.log(message)
  printPrettierrcSync(prettierPath)
  process.exit(0)
}
