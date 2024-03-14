// vite.config.ts
import { defineConfig } from "file:///C:/Users/Mathis/dev/famille-challessin/node_modules/.pnpm/vite@5.1.5_@types+node@20.11.25_sass@1.71.1/node_modules/vite/dist/node/index.js";
import { getDirname } from "file:///C:/Users/Mathis/dev/famille-challessin/node_modules/.pnpm/@adonisjs+core@6.3.1_@adonisjs+assembler@7.2.3_@vinejs+vine@1.7.1_edge.js@6.0.1/node_modules/@adonisjs/core/build/src/helpers/main.js";
import inertia from "file:///C:/Users/Mathis/dev/famille-challessin/node_modules/.pnpm/@adonisjs+inertia@1.0.0-18_@adonisjs+core@6.3.1_@adonisjs+session@7.1.1_@adonisjs+vite@3.0.0-7_edge.js@6.0.1/node_modules/@adonisjs/inertia/build/src/plugins/vite.js";
import vue from "file:///C:/Users/Mathis/dev/famille-challessin/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.5_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import adonisjs from "file:///C:/Users/Mathis/dev/famille-challessin/node_modules/.pnpm/@adonisjs+vite@3.0.0-7_@adonisjs+core@6.3.1_@adonisjs+shield@8.1.1_edge.js@6.0.1_vite@5.1.5/node_modules/@adonisjs/vite/build/src/client/main.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Mathis/dev/famille-challessin/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: "inertia/app/ssr.ts" } }),
    vue(),
    adonisjs({ entrypoints: ["inertia/app/app.ts"], reload: ["resources/views/**/*.edge"] })
  ],
  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      "~/": `${getDirname(__vite_injected_original_import_meta_url)}/inertia/`
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxNYXRoaXNcXFxcZGV2XFxcXGZhbWlsbGUtY2hhbGxlc3NpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcTWF0aGlzXFxcXGRldlxcXFxmYW1pbGxlLWNoYWxsZXNzaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL01hdGhpcy9kZXYvZmFtaWxsZS1jaGFsbGVzc2luL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGdldERpcm5hbWUgfSBmcm9tICdAYWRvbmlzanMvY29yZS9oZWxwZXJzJ1xuaW1wb3J0IGluZXJ0aWEgZnJvbSAnQGFkb25pc2pzL2luZXJ0aWEvY2xpZW50J1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgYWRvbmlzanMgZnJvbSAnQGFkb25pc2pzL3ZpdGUvY2xpZW50J1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgaW5lcnRpYSh7IHNzcjogeyBlbmFibGVkOiB0cnVlLCBlbnRyeXBvaW50OiAnaW5lcnRpYS9hcHAvc3NyLnRzJyB9IH0pLFxuICAgIHZ1ZSgpLFxuICAgIGFkb25pc2pzKHsgZW50cnlwb2ludHM6IFsnaW5lcnRpYS9hcHAvYXBwLnRzJ10sIHJlbG9hZDogWydyZXNvdXJjZXMvdmlld3MvKiovKi5lZGdlJ10gfSksXG4gIF0sXG5cbiAgLyoqXG4gICAqIERlZmluZSBhbGlhc2VzIGZvciBpbXBvcnRpbmcgbW9kdWxlcyBmcm9tXG4gICAqIHlvdXIgZnJvbnRlbmQgY29kZVxuICAgKi9cbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnfi8nOiBgJHtnZXREaXJuYW1lKGltcG9ydC5tZXRhLnVybCl9L2luZXJ0aWEvYCxcbiAgICB9LFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFMsU0FBUyxvQkFBb0I7QUFDM1UsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sU0FBUztBQUNoQixPQUFPLGNBQWM7QUFKd0ssSUFBTSwyQ0FBMkM7QUFNOU8sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLE1BQU0sWUFBWSxxQkFBcUIsRUFBRSxDQUFDO0FBQUEsSUFDcEUsSUFBSTtBQUFBLElBQ0osU0FBUyxFQUFFLGFBQWEsQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztBQUFBLEVBQ3pGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU1BLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU0sR0FBRyxXQUFXLHdDQUFlLENBQUM7QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
