import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'

export default {
	input: 'src/main.js',
	output: {
		file: 'build/bundle.js',
		format: 'iife',
		name: 'bundle',
	},
	plugins: [
		copy({
			targets: [
				{ src: 'src/index.html', dest: 'build/' },
				{ src: 'src/styles/app.css', dest: 'build/styles' }
			],
			hook: 'writeBundle',
			copyOnce: true
		}),
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
