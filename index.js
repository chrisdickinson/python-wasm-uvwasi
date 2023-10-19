const { readFile } = require('node:fs/promises');
const { argv, env } = require('node:process');
const { join } = require('node:path');
const { WASI } = require('wasi');

const wasi = new WASI({
  version: 'preview1',
  args: process.argv.slice(2),
  env,
  stdin: 1,
  preopens: {
    '/': '.',
  },
});

async function main() {
  const wasm = await WebAssembly.compile(
    await readFile(join(__dirname, 'bin', 'python-3.11.4.wasm'))
  );

  process.stdin.resume();
  const instance = await WebAssembly.instantiate(wasm, wasi.getImportObject());
  wasi.start(instance);
  process.stdin.pause();
}

main().catch(err => console.error(err))
