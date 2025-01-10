import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [TanStackRouterVite(), react()],
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "./src/components"),
			"@lib": path.resolve(__dirname, "./src/lib"),
			"@validation": path.resolve(__dirname, "./src/validation"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@providers": path.resolve(__dirname, "./src/providers"),
			"@src": path.resolve(__dirname, "./src"),
			"@store": path.resolve(__dirname, "./src/store"),
		},
	},
	server: {
		port: 5173,
	},
});
