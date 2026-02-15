import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      // ALL API calls to /api will be forwarded to your backend
      "/api": {
        target: "https://rj9zfs-3000.csb.app", // ← your backend URL
        changeOrigin: true,
        secure: false, // CodeSandbox uses self-signed certs sometimes
        rewrite: (path) => path.replace(/^\/api/, ""), // /api/users → /users
      },
    },
  },
});
