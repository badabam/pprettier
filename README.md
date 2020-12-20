# pprettier

Quickly add your favorite .prettierrc to a project.

## Features

- Find next package.json 3 levels up in the project (in case you run the program in a subfolder of your project)

- Use content of a global config (`.pprettierrc`) in `$HOME`.

- Create `$HOME/.pprettierrc` with default settings

## Usage

```shell
$ npx pprettier <options>
```

## Help with this project

- Fork this repository
- `npm install` it
- Make a pull request

## Deploy a new version

```shell
$ # do changes
$ npm test
$ git add <changed files>
$ git commit # this runs "commitizen"
$ npm run release # Tests + automatic version bump
$ npm run deploy # Publish to npm
```
