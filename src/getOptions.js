import args from 'args'

export default function getOptions(rawArgs) {
  const usage = `

  Running just pprettier without a command creates a .prettierrc file in the current project (it searches a package.json file up to 3 levels up).
  This is what you usually want.`

  args
    .option(
      'ignoreGlobalConfig',
      'Ignore the global config file named .pprettierrc, if it exists  in the user directory',
      false
    )
    .option(
      'addGlobalConfig',
      'Adds a global config file in the user directory without asking',
      true
    )
    .option('silent', 'Does not output anything', false)

  return args.parse(rawArgs, {
    value: usage,
  })
}
