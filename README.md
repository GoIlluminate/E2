# webpack-express-elm-boilerplate
A boilerplate for building applications with the e-squared stack (Elm + Express).
Come packed with  a webpack workflow supporting hot module reload.

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
<br><br>

[ ] TODO: Please read the related blog post: [The ultimate Elm Webpack setup](TODO) to know more about this boilerplate.

**NOTE!** Use the latest version of Node, 6.x.x.

## Installation

1. `git clone`
2. `npm install`

## Usage
### Development workflow - Hot reload
1. `npm start`
2.  open http://localhost:3000 in your favorite browser.
3.  edit any file in `./src` (i.e .elm source files or sass/css files) and take it from there

### Production workflow
1. `npm run build` to build assets for production, this will:
  - compile elm
  - compile sass, extract css applying prefixer on postprocessing
  - copy all the related bundles and files into a `/dist` directory.
2. `npm run prod` to serve them
3.  open http://localhost:3000 in your favorite browser.

Production `dist` directory structure:
```
dist/
  index.html
  static/
    css/
      hash.css
    img/
      elm.png
    js/
      main-hash.min.js
```

### Tests
 [ ] TODO

### APIs
Routes are organized following the express [route separation example](https://github.com/expressjs/express/blob/master/examples/route-separation)
Allowing for a quick prototypation of API endpoints together with the elm client.

### Standards JS and Precommit hook
  [Elm-format](https://github.com/avh4/elm-format) will take care of everything related to elm. For anything javascript related we'll rely on [standardJS](https://github.com/feross/standard).
  On `npm test` standard will check every .js file inside the `/server` and `/src` directories making sure they all comply to the standard javascript style.

***

## Elm by default
The project runs with Elm by default and hot replacement of changes to the modules. Currently it is on 0.17.1
