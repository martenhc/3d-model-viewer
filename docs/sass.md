## Adding SASS to a Project

### *WARNING: Lit doesn't support SASS natively, so introducing it could lead to unforeseen issues*

## Installation

Install SASS following these steps:

- Install packages `npm install --save-dev rollup-plugin-postcss-lit rollup-plugin-postcss sass`.
- In the `vite.config.js` file:
  -- Add `import litcss from 'rollup-plugin-postcss-lit';` and `import postcss from "rollup-plugin-postcss";`.
  -- Add `postcss({ exclude: "**/*.css", inject: false }), litcss({ include: "**/*.scss", exclude: "**/*.css" }),` as plugins in the `rollupOptions` object.
- Add `litcss()` as a plugin in the serve configuration.
- Declare .scss files as modules:
  -- Create a `types.d.ts` file in your root folder.
  -- Add the following line `declare module "*.scss";`, and save.
  -- Include the type declaration in `tsconfig.json`: `"include": ["src/**/*.ts", "/**/*.d.ts", "test/**/*.ts"]`
- Enable sass file generation in the plop template by going to the plopfile.js and uncomment the following lines:
  ```
    // {
    //   type: 'confirm',
    //   default: false,
    //   name: 'isUsingSassStyles',
    //   message: 'Do you want to use a sass file?',
    // },
  ```
- On every component:
  -- Add `import { css } from 'lit';` on the component.
  -- Import .scss .sass files as `import styles from './styles.scss';`.
  -- Set the styles within the class `static styles = css([styles] as ReadonlyArray<string> as TemplateStringsArray);`. You can add all the .scss and .sass files you need in the array wrapping them with lit's css function.

## Generate sass ready templates:

- To generate pages and components that use sass styles, confirm plop prompt while running `npm run plop`.


