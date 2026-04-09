const path = require('path');
const core = require('@actions/core');
const exec = require('./_exec');
const inputs = require('./inputs.json');

module.exports = async () => {
  const semantic_version = core.getInput(inputs.semantic_version);

  // Opcjonalna walidacja (polecam)
  if (semantic_version && !/^[a-zA-Z0-9._-]+$/.test(semantic_version)) {
    throw new Error('Invalid semantic_version input');
  }

  const pkg = semantic_version
    ? `github:KeyBeyond/semantic-release#${semantic_version}`
    : `github:KeyBeyond/semantic-release#master`;

  const { stdout, stderr } = await exec(
    'pnpm',
    ['add', pkg, '--save-dev'],
    {
      cwd: path.resolve(__dirname, '..')
    }
  );

  core.debug(stdout);
  core.error(stderr);
};