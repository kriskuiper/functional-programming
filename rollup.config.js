import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'

export default {
	input: 'src/app.js',
	output: {
		file: 'public/scripts/bundle.js',
		format: 'iife',
		name: 'bundle',
	},
	plugins: [
		babel({
			exclude: 'node_modules/**'
		}),
		resolve({
			main: true,
			browser: true
		}),
		json(),
		commonjs(),
		terser()
	]
}
