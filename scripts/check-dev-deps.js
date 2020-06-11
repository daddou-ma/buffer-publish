/* eslint no-console: "off" */

// const inquirer = require('inquirer');
// const rp = require('request-promise');
const fs = require('fs');
const path = require('path');

async function run() {
  const packagesPath = path.join(__dirname, '..', 'packages');
  fs.readdirSync(packagesPath).forEach(f => {
    const dirPath = path.join(packagesPath, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      try {
        const packageJson = fs.readFileSync(
          path.join(dirPath, 'package.json'),
          'UTF-8'
        );
        const parsedPackageJson = JSON.parse(packageJson);
        console.log(dirPath, parsedPackageJson.devDependencies);
      } catch (e) {
        // --
      }
    }
  });
}

run().catch(e => console.log('Something went wrong!\n\n', e));
