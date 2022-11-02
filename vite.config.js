import {defineConfig} from 'vite';
import {resolve as pathResolve} from 'path';
import del from 'rollup-plugin-delete';
import resolve from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({command}) => {
  const vitePlugins = [tsconfigPaths()];

  const rollupOptions = {
    plugins: [del({targets: 'build/*'}), resolve(), summary()],
  };

  if (command === 'build') {
    return {
      plugins: [...vitePlugins],
      publicDir: false,
      build: {
        rollupOptions,
        lib: {
          entry: pathResolve('./main.js'),
          name: '3DModelViewer',
          fileName: '3d-model-viewer',
        },
        outDir: 'build',
        minify: 'terser',
        TerserOptions: {
          ecma: 2020,
          module: true,
          warnings: true,
        },
      },
    };
  } else if (command === 'serve') {
    return {
      plugins: vitePlugins,
      build: {
        outDir: 'build',
      },
    };
  }
});
