import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default {
	input: 'src/scripts/app.js',
	output: {
		file: 'build/scripts/app.js',
		format: 'iife',
		name: 'app',
	},
	plugins: [
		babel({
			exclude: 'node_modules/**'
		}),
		resolve({
			main: true,
			browser: true
		}),
		commonjs(),
		terser()
	]
}
