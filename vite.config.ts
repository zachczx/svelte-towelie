import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

export default defineConfig({
	// server: {
	// 	port: 5273
	// },
	plugins: [enhancedImages(), tailwindcss(), sveltekit()]
});
