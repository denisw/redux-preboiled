import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const extensions = ['.ts', '.mjs', '.js']

export default [
  {
    input: 'src/index.ts',
    output: {
      format: 'esm',
      file: 'esm/index.js',
    },
    plugins: [nodeResolve({ extensions }), babel({ extensions })],
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'esm',
      file: 'esnext/index.js',
    },
    plugins: [
      nodeResolve({ extensions }),
      babel({
        babelHelpers: 'bundled',
        extensions,
        configFile: false,
        presets: ['@babel/preset-typescript'],
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      file: 'umd/index.js',
      name: 'reduxPreboiled',
      sourcemap: true,
    },
    plugins: [
      nodeResolve({ extensions }),
      babel({
        babelHelpers: 'bundled',
        extensions,
      }),
      terser(),
    ],
  },
]
