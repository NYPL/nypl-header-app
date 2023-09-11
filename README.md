# NYPL Header App

The NYPL Header App can be used for projects across the NYPL organization to import the Header and Footer components through embeddable Javascript scripts. The Header and Footer are built with the NYPL Reservoir Design System and are hosted in this repo as React components. Dark mode for these components is available to consuming applications that use [NYPL Reservoir DS](https://nypl.github.io/nypl-design-system/reservoir/v1/?path=/story/welcome--page).

## Available Routes

| Endpoint         | Feature                                                 |
| :--------------- | :------------------------------------------------------ |
| `/`              | Displays the rendered DS Header for QA and testing.     |
| `/header`        | Displays the rendered DS Header for QA and testing.     |
| `/footer`        | Displays the rendered DS Footer for QA and testing.     |
| `/header.min.js` | Returns the compiled DS Header JS for the embed script. |
| `/footer.min.js` | Returns the compiled DS Footer JS for the embed script. |

## Embeddable Scripts

Any app can pull in the Header and Footer through an embeddable standalone script tag that should be used in the <body> element of the main HTML file (or any other HTML files in the app). It is suggested that the components be imported as a whole with the following markup:

```HTML
<!-- Header -->
<div id="nypl-header"></div>
<script src="https://ds-header.nypl.org/header.min.js?containerId=nypl-header" async></script>

<!-- your app content here -->
<main>...</main>

<!-- Footer -->
<div id="nypl-footer"></div>
<script src="https://ds-header.nypl.org/footer.min.js?containerId=nypl-footer" async></script>
```

Note: this will render the components in place and will push the content down when it loads. To make it less noticeable, add placeholder styles defined below.

### Next.js App Implementation

For Next.js apps, it is recommended for the script to be added to the `_document.tsx` file for the Header and Footer components to render properly.

### Placeholder Styles

When adding the embed code snippets above, the `Header` and `Footer` will load and render in place. This means that the content below it (specifically for the `Header` since it is more visible) will be pushed down. This can be annoying but is not a bug. The app needs to call the URL, fetch the Javascript, and then render the component and how long it takes depends on the user machine's network. To help alleviate this, the app can add placeholder styles to the `Header` container to prevent the content from jumping around. The code snippet above can be updated to:

// @TODO

```HTML
<style>
   #Header-Placeholder {
      min-height: 62px;
   }
   @media screen and (min-width: 832px) {
      #Header-Placeholder {
         min-height: 130px;
      }
   }
</style>
<!-- .... -->
<div id="Header-Placeholder">
   <div id="nypl-header"></div>
   <script
      src="https://ds-header.nypl.org/header.min.js?containerId=nypl-header"
      async
   ></script>
</div>
```

#### Next.js Placement

For Next.js apps, it is recommended to add the script to the `_document.tsx` file. The above `<style>` snippet will throw an error and should be updated to:

```jsx
<style>{`
   #Header-Placeholder {
      min-height: 62px;
   }
   @media screen and (min-width: 832px) {
      #Header-Placeholder {
         min-height: 130px;
      }
   }
`}</style>
// ...
<div id="Header-Placeholder">
   <div id="nypl-header"></div>
   <script
      src="https://ds-header.nypl.org/header.min.js?containerId=nypl-header"
      async
   ></script>
</div>
```

## Running the app locally

Install all dependencies

```sh
$ npm install
```

Builds the app into `./dist` and preview the app at `localhost:3001`

```sh
$ npm run prod
```

### Running the app locally with Docker

Note: Docker needs to be installed and running on your machine in order to build the image and run the app through Docker

Build the Docker image

```sh
$ docker build -t nypl-header-app .
```

This command builds the Docker image using the Dockerfile, which does the following:

1. Creates an app directory
2. Installs the app's dependencies via `npm install`
3. Builds the app via `npm run prod`
   The Docker image will be named `nypl-header-app`

Run the Docker instance

```sh
$ docker run -p 3001:3001 -d nypl-header-app
```

This command runs the Docker container with port mapping on 3001 ([Port access from Browser]:[Port exposed from the container]) using the Docker image above. Access the app at `localhost:3001`.

## Vite Build

There are three separate Vite config files that are used for building the app:

- `vite.config.js` - used for building the `/`, `/header`, and `/footer` routes.
- `vite.config.footer.js` - used for building the minified footer embed script code on the `/footer.min.js` route.
- `vite.config.header.js` - used for building the minified header embed script code on the `/header.min.js` route.

Vite can build the app using ESM output format. This is generally recommended but there are systems in place where using ESM-based `Header` and `Footer` embed scripts fail and it is out of our control. In Vite, it is not easy to build multiple dist files with multiple entry points in CJS format. To get around this, the `Header` and `Footer` builds are separate files that build a single file from a single entry point.

The `Header` and `Footer` components render the same regardless of the build format.

## Unit Testing

To run all tests once:

```sh
$ npm test
```

If you're actively writing or updating tests, you can run the tests in watch mode. This will wait for any changes and run when a file is saved:

```sh
$ npm run test:watch
```

If you want to run tests on only one specific file, run:

```sh
$ npm test -- src/[path/to/file]
```
