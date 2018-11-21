#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const ejs = require('ejs');
const fs = require('fs');
const packageJson = require('./package.json');
const pathName = require.resolve(packageJson.name);
const folder = pathName.slice(0, pathName.lastIndexOf('/'));
const src = 'src';

program
  .arguments('<packageName>')
  .action(packageName => {
    const copyJobs = [{
      template: 'extension/editorconfig',
      target: `${packageName}/.editorconfig`,
    }, {
      template: 'extension/package.json.ejs',
      target: `${packageName}/package.json`,
    }, {
      template: 'extension/tsconfig.json',
      target: `${packageName}/tsconfig.json`,
    }, {
      template: 'extension/tslint.json',
      target: `${packageName}/tslint.json`,
    }, {
      template: 'extension/src/index.ts',
      target: `${packageName}/src/index.ts`,
    }];

    // create package folder
    if (!fs.existsSync(packageName)) {
      fs.mkdirSync(packageName);
    }
    // create src folder and index.ts
    if (!fs.existsSync(`${packageName}/${src}`)) {
      fs.mkdirSync(`${packageName}/${src}`);
    }

    copyJobs.map((job) => {
      ejs.renderFile(`${folder}/${job.template}`, { packageName }, (error, content) => {
        if (error) {
          console.error(chalk.red(`error: ${error}`));
          return;
        }
        fs.writeFileSync(job.target, content);
      })
    });
  })
  .parse(process.argv);

