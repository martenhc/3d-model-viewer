# Environments

This scaffold uses `.env` files to set variables per environment. More info on how Vite uses those files
to configure the variables for a specific environment can be found [here](https://vitejs.dev/guide/env-and-mode.html).

The `.env` and `.env.*` files are ignored by git to prevent sensitive information from being pushed to the repository.

## Setup

To create the `.env` file, copy and rename `.env.example` or remove `.example` from `.env.example`.

`.env` will always be loaded, regardless of the environment.

To create environment specific files, please use `.env.development`, `.env.staging` or `.env.production`.

## Adding variables

Prefix every variable in order to expose it in the app.

The default prefix for this scaffold is set to `VAR_`. You can change it in the `vite.config.js` file.

Whenever you add a new variable or change the prefix, also update it in `src/@type/import-meta.d.ts`.

## Accessing variables

Access the specified variables this way: `import.meta.env.VAR_IS_LOCALE_ENABLED`.
You can find an example in `./src/router/router.ts`.
