const path = require('path');
const fs = require('fs-extra');
const process = require('process');
const pkg = require('../package.json');
const { Command } = require('commander');
const { execSync } = require('child_process');
const { getBiggestVersionArr } = require('./utils');

const program = new Command();
program.version(pkg.version);

program
  .command('daily [version]')
  .description('新建一个daily分支')
  .action((version) => newbranchFn(version));

function newbranchFn(version) {
  execSync('git checkout master', { stdio: 'inherit' });

  execSync('git pull', { stdio: 'inherit' });

  const pkg = require(path.join(process.cwd(), './package.json'));
  if (!pkg) {
    console.error('\x1B[31m不在一个项目的根目录下');
    return;
  }

  let nextVersion = version;
  if (!nextVersion) {
    const nowVersionArr = getBiggestVersionArr('(publish|daily)');
    if (!nowVersionArr) {
      nextVersion = '1.0.0';
    } else {
      const [a, b, c] = nowVersionArr;
      nextVersion = [a, b, c + 1].join('.');
    }
  }

  // 创建新分支
  execSync(`git checkout -b daily/${nextVersion}`, {
    stdio: 'inherit',
  });

  // 更新package.json文件版本号version
  pkg.version = nextVersion;
  fs.outputFileSync('package.json', JSON.stringify(pkg, null, 2));

  execSync('git add . -A', {
    stdio: 'inherit',
  });

  execSync('git commit -m "newbranch"', {
    stdio: 'inherit',
  });

  execSync(`git push origin daily/${nextVersion}`, {
    stdio: 'inherit',
  });
}

program.parse(process.argv);
