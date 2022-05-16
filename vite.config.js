import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { generateVersion } from './scripts/generateVersion.js';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

	const version = generateVersion("package.json");
	console.info("Building with action:", command, "| mode:", mode, "| version:", version);

	return {
		plugins: [
			svelte(),
			viteSingleFile()
		],
		define : {
			// Note: To get actual environment variables with Vite, use e.g. 'import.meta.env.MODE' in the code
			__BUILD_VERSION__ : JSON.stringify(version),
			__ENV__ : JSON.stringify(mode === "production" ? "live" : "dev"),
		},
		build: {
			target: "esnext",
			assetsInlineLimit: 100000000,
			chunkSizeWarningLimit: 100000000,
			cssCodeSplit: false,
			brotliSize: false,
			rollupOptions: {
				inlineDynamicImports: true,
				output: {
					manualChunks: () => "everything.js",
				},
			},
		},
	}
});