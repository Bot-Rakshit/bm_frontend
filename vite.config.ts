import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from "path";
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
      // to check working of pwa in dev mode
			devOptions: {
				enabled: true,
			},
			manifest: {
				name: 'BM Samay',
				short_name: 'BM Samay',
				description: 'Chess Community Of Samay Raina',
				theme_color: '#000000',
				icons: [
					{
						src: '/pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any',
					},
					{
						src: '/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any',
					},
					{
						src: '/pwa-maskable-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable',
					},
					{
						src: '/pwa-maskable-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
				],
			},
		}),
	],
	envPrefix: 'VITE_',
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
});

