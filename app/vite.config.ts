import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
	base: '/static/',
	plugins: [
		solid(),
		cssInjectedByJsPlugin(),
	],
	build: {
		copyPublicDir: false,
		outDir: '../static',
		target: 'es2015',
		cssTarget: 'chrome61',
	},
})
