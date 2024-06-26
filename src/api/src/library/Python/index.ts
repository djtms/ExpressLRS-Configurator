/* eslint-disable no-await-in-loop */
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import Commander, { CommandResult, NoOpFunc, OnOutputFunc } from '../Commander';
import { LoggerService } from '../../logger';

export default class Python {
  constructor(
    public PATH: string,
    private env: NodeJS.ProcessEnv,
    private logger: LoggerService
  ) {}

  async runPythonScript(
    script: string,
    args: string[],
    onUpdate: OnOutputFunc = NoOpFunc,
    options: child_process.SpawnOptions = {}
  ): Promise<CommandResult> {
    const pyExec = await this.findPythonExecutable(this.PATH);
    if (pyExec === null) {
      throw new Error('python executable not found');
    }
    let spawnOptions = {
      env: this.env,
    };
    if (options !== undefined) {
      spawnOptions = {
        env: this.env,
        ...options,
      };
    }
    return new Commander().runCommand(
      pyExec,
      [script, ...args],
      spawnOptions,
      onUpdate
    );
  }

  async findPythonExecutable(envPath: string): Promise<string> {
    const IS_WINDOWS = process.platform.startsWith('win');
    const exenames = IS_WINDOWS
      ? ['python3.exe', 'python.exe']
      : ['python3', 'python', 'python2'];
    const pythonAssertCode = [
      'import sys',
      'assert sys.version_info >= (3, 6)',
      'print(sys.executable)',
    ];
    // eslint-disable-next-line no-restricted-syntax
    for (const location of envPath.split(path.delimiter)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const exename of exenames) {
        const executable = path
          .normalize(path.join(location, exename))
          .replace(/"/g, '');
        try {
          let res: CommandResult | null = null;
          if (
            fs.existsSync(executable) &&
            // eslint-disable-next-line no-cond-assign
            (res = await new Commander().runCommand(executable, [
              '-c',
              pythonAssertCode.join(';'),
            ]))
          ) {
            this.logger.log('testing python exec', {
              executable,
              stdout: res.stdout,
              stderr: res.stderr,
              success: res.success,
            });
            if (res.success) {
              return executable;
            }
          }
        } catch (err) {
          this.logger.warn('got an exception in python search', {
            executable,
            err,
          });
        }
      }
    }

    throw new Error('python not found');
  }
}
