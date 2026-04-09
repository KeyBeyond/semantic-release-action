const { spawn } = require('child_process');

module.exports = (cmd, args = [], options = {}) =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      shell: false, // kluczowe — brak powłoki = brak injection
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

    child.on('close', code => {
      if (code !== 0) {
        return reject(new Error(stderr || `Process exited with code ${code}`));
      }
      resolve({ stdout, stderr });
    });
  });
