#!/usr/bin/env node

const fs = require('fs')
const fsp = fs.promises
const path = require('path')

const prettierrc = {
  arrowParens: 'avoid',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
}

init()

async function init() {
  const dirPath = await findProject()
  const filePath = path.resolve(dirPath, '.prettierrc')

  if (await doesExist(filePath)) {
    console.log('.prettierrc already exists:')
    printPrettierrcSync(filePath)
  } else {
    addPrettierrc(filePath).then(() => {
      console.log('Created a .prettierrc in\n"', dirPath, '":')
      printPrettierrcSync(filePath)
    })
  }
}

async function findProject() {
  let currentDir = process.cwd()
  let count = 0
  while (
    count++ < 3 &&
    !(await doesExist(path.resolve(currentDir, 'package.json')))
  ) {
    currentDir = path.resolve(currentDir, '..')
  }
  console.log('package.json found at', currentDir)
  return currentDir
}

function printPrettierrcSync(filePath) {
  console.log(fs.readFileSync(filePath, { encoding: 'utf-8' }))
}

function addPrettierrc(filePath) {
  return fsp
    .writeFile(filePath, JSON.stringify(prettierrc, null, 2))
    .catch(error => console.error(error))
}

function doesExist(filePath) {
  return fsp
    .access(filePath, fs.constants.F_OK)
    .then(() => Promise.resolve(true))
    .catch(() => Promise.resolve(false))
}

module.exports = {
  addPrettierrc,
  doesExist,
  findProject,
  printPrettierrcSync,
}
