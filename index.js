#!/usr/bin/env node

const path = require('path')
const addPrettierrc = require('./scripts/addPrettierrc')
const doesExist = require('./scripts/doesExist')
const findProject = require('./scripts/findProject')
const printPrettierrcSync = require('./scripts/printPrettierrcSync')
const checkForGlobalConfig = require('./scripts/checkForGlobalConfig')

init()

async function init() {
  let currentDir = process.cwd()
  const dirPath = await findProject(currentDir)
  const filePath = path.resolve(dirPath, '.prettierrc')

  if (await doesExist(filePath)) {
    console.log('.prettierrc already exists:')
    printPrettierrcSync(filePath)
  } else {
    checkForGlobalConfig()
    addPrettierrc(filePath).then(() => {
      console.log('Created a .prettierrc in\n"', dirPath, '":')
      printPrettierrcSync(filePath)
    })
  }
}
