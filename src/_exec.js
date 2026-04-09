const { spawn } = require('child_process');

module.exports = (cmd, args = [], options = {}) =>
  new Promise((resolve, reject) => {
    if (!Array.isArray(args)) {
      return reject(new Error(`Invalid args passed to exec: ${args}`));
    }

    const child = spawn(cmd, args, {
      shell: false,
      ...options
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', data => {
      stdout += data.toString();
    });

    child.stderr.on('data', data => {
      stderr += data.toString();
    });

    child.on('error', err => {
      reject(err);
    });

    child.on('close', code => {
      if (code !== 0) {
        return reject(new Error(stderr || `Process exited with code ${code}`));
      }
      resolve({ stdout, stderr });
    });
  });