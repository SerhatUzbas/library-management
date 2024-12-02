import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'


export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	console.log(`ENVIRONMENT_VARIABLES:
	__APP_VERSION__\t: ${env.npm_package_version}
	__APP_ENV__\t: ${env.APP_ENV}
	__APP_BUILD__\t: ${mode}
	__API_URL__\t: ${env.API_URL}\n`)

	return {
		plugins: [react(), svgr(), tsconfigPaths()],
		build: {
			outDir: 'build',
		},
		server: {
			open: true,
			port: 3000,
			headers: {
				'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
				'X-Content-Type-Options': 'nosniff',
				'X-Frame-Options': 'DENY',
				'X-XSS-Protection': '1; mode=block',
			},
		},
		define: {
			__APP_VERSION__: JSON.stringify(env.npm_package_version),
			__APP_ENV__: JSON.stringify(env.APP_ENV),
			__APP_BUILD__: JSON.stringify(mode),
			__API_URL__: JSON.stringify(env.API_URL),
			
		},
	}
})
