# Table of contents

1. [Prerequisite](#prerequisite)
2. [Installation](#installation)
3. [Commands](#commands)
4. [Features](#features)
5. [Major plugins](#major-plugins)
6. [Documentation](#documentation)

## Prerequisite

- [Node v16.x.x](https://nodejs.org/en/download/) or higher
- [NPM v8.x.x](https://nodejs.org/en/download/) or higher
- Yarn is not supported

## Installation

`git clone git@bitbucket.org:mediamonks/lit-scaffold.git`

After cloning run `npm install` and `npm run dev` in the project root to get started.

## Commands

- `npm run dev`: start the development server.
- `npm run dev -- --host 0.0.0.0`: start development server and expose on network
- `npm run plop` generate empty component file.
- `npm run build` build app for deployment.
- `npm run deploy`: build app and deploy to gcp app engine.
- `npm run lint` lint app with all linters.
- `npm run lint:eslint` lint app with only esLint.
- `npm run lint:lit-analyzer` to lint app with only lit-analyzer.
- `npm run format` to format app with prettier.
- `npm run locale:extract`: to extract localized strings and generate files for translations.
- `npm run pwa:build`: to build a PWA app

## Features

- [Lit](https://github.com/lit/lit/)
- [TypeScript](https://github.com/Microsoft/TypeScript)
- [Redux](https://github.com/reduxjs/redux)
- [lit-redux-router](https://github.com/fernandopasik/lit-redux-router)
- [pwa-helpers](https://github.com/polymer/pwa-helpers)
- [Vite](https://github.com/vitejs/vite)
- [Rollup](https://github.com/rollup/rollup)
- [Plop](https://github.com/plopjs/plop)
- [lit-analyzer](https://github.com/runem/lit-analyzer)
- [Google TypeScript Style](https://github.com/google/gts)

## Documentation

- [Generate component from template](./docs/template-generation.md);
- [State management](./docs/state-management.md)
- [Asset management](./docs/asset-management.md)
- [Routing](./docs/routing.md)
- [Localization](./docs/localization.md)
- [Environment variables](./docs/environments.md)
- [Device State Management](./docs/device-state.md)
- [Configuring SEO, Analytics, and site metadata files](./docs/seo-analytics-metadata.md)
- [Adding SASS to a Project](./docs/sass.md)
