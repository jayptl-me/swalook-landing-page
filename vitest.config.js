import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
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
