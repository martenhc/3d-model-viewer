# Asset Management

This scaffold supports 3 different types of assets:

## Public

Found in `./public`.
The build process places these assets in the root folder.

Place assets like `robots.txt` and `sitemap.xml` here.

## Static

Found in`./public/static`.
For static files that are not imported by the app's modules.

Place assets like images or fonts here. `favicon.svg` is an example, and use them like so:

`<img src="/static/image.jpg" />`

## Asset

Found in `./src/asset`.
For static files that are imported somewhere in the app, and used like so:

`import * as image from './asset/image.jpg`

For the same type of files than `/static`.
