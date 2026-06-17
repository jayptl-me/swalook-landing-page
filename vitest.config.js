import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "."),
        },
    },
    test: {
        environment: "happy-dom",
        globals: true,
        setupFiles: ["./__tests__/setup.js"],
        include: ["__tests__/**/*.test.{js,jsx}"],
        server: {
            deps: {
                inline: ["app", "components"],
            },
        },
        coverage: {
            provider: "v8",
            reporter: ["text", "lcov"],
            reportsDirectory: "./coverage",
        },
    },
});
