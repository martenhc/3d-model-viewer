import {defineConfig} from 'vite';
import del from 'rollup-plugin-delete';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';
import tsconfigPaths from 'vite-tsconfig-paths';
import {resolve as pathResolve} from 'path';

export default defineConfig(({command, mode}) => {
  const isPwa = process.env.buildType === 'pwa';

  isPwa &&
    console.log(
      '\x1b[32m',
      `>> You are running the PWA build process.
       >> Your build will containt a service worker to provide the necessary behavior.`
    );

  const vitePlugins = [tsconfigPaths()];

  const rollupOptions = {
    plugins: [
      del({targets: 'build/*'}),
      replace({
        // change the value to 'development' if you want to log more errors once built.
        'process.env.NODE_ENV': JSON.stringify(mode),
        preventAssignment: true,
      }),
      resolve(),
      summary(),
    ],
  };

  if (command === 'build') {
    return {
      plugins: [...vitePlugins],
      build: {
        rollupOptions,
        lib: {
          entry: pathResolve('./main.js'),
          name: '3DModelViewer',
          fileName: '3d-model-viewer',
        },
        outDir: 'build',
        assetsDir: 'asset',
        minify: 'terser',
        TerserOptions: {
          ecma: 2020,
          module: true,
          warnings: true,
        },
      },
      envPrefix: 'VAR_',
    };
  } else if (command === 'serve') {
    return {
      plugins: vitePlugins,
      envPrefix: 'VAR_',
      build: {
        outDir: 'build',
      },
    };
  }
});
