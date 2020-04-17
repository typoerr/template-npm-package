import * as path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

const base = path.resolve(__dirname)
const tsconfig = path.join(base, 'tsconfig.json')

// Prevent bundling (peer)dependencies in package.json
const keys = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }).map(RegExp)
const external = (id) => keys.some((key) => key.test(id))

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      dir: 'dist',
      entryFileNames: '[name].module.js',
      format: 'es',
      sourcemap: true,
    },
    {
      dir: 'dist',
      // name: '',
      entryFileNames: '[name].umd.js',
      format: 'umd',
      sourcemap: true,
    },
  ],
  context: 'this',
  external,
  plugins: [
    typescript({
      tsconfig,
      // [Issue #287 · rollup/plugins](https://github.com/rollup/plugins/issues/287)
      rootDir: './src',
    }),
    resolve(),
  ],
}
