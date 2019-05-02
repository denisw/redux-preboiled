import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const extensions = ['.ts', '.js']

export default [
  {
    input: 'src/index.ts',
    output: {
      format: 'esm',
      file: 'esm/index.js'
    },
    plugins: [
      resolve({ extensions }),
      babel({ extensions })
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'esm',
      file: 'esnext/index.js'
    },
    plugins: [
      resolve({ extensions }),
      babel({
        extensions,
        configFile: false,
        presets: ['@babel/preset-typescript']
      })
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      file: 'umd/index.js',
      name: 'reduxPreboiled',
      sourcemap: true
    },
    plugins: [
      resolve({ extensions }),
      babel({ extensions }),
      terser()
    ]
  }
]
