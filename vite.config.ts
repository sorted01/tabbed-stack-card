import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/tabbed-stack-card.ts",
      name: "TabbedStackCard",
      fileName: () => "tabbed-stack-card.js",
      formats: ["es"]
    },
    outDir: "dist",
    emptyOutDir: true
  }
});
