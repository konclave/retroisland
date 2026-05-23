import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

function desktopCssPlugin() {
  return {
    name: 'vite-plugin-desktop-css',
    transform(code, id) {
      if (id.endsWith('.d.css')) {
        return { code: `@media (min-width: 811px) {\n${code}\n}` };
      }
    },
  };
}

export default defineConfig({
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [desktopCssPlugin()],
    resolve: {
      alias: {
        '~': '/src',
      },
    },
  },
});
