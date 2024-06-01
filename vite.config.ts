import { defineConfig } from "vite";
import path, { resolve } from "path";
import react from "@vitejs/plugin-react";
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl({
      certDir: resolve("certificates"),
      domains: ["tma.internal"],
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
