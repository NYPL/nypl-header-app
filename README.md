# NYPL Header App
The NYPL Header App can be used for projects across the NYPL organization to import the Header and Footer components through embeddable Javascript scripts. The Header and Footer are built with the NYPL Reservoir Design System and are hosted in this repo as React components. Dark mode for these components is available to consuming applications that use [NYPL Reservoir DS](https://nypl.github.io/nypl-design-system/reservoir/v1/?path=/story/welcome--page).

## Running the app locally
Install all dependencies
```sh
$ npm install
```
Builds the app into `./dist` and preview the app at `localhost:4173`
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
$ docker run -p 4173:4173 -d nypl-header-app
```
This command runs the Docker container with port mapping on 4173 ([Port access from Browser]:[Port exposed from the container]) using the Docker image above. Access the app at `localhost:4173`.

## Available Routes
| Endpoint          | Feature|
|:------------------|:--------------------------------------------------------|
| `/header`         | Displays the rendered DS Header                         |
| `/footer`         | Displays the rendered DS Footer                         |
| `/header.min.js`  | Returns the compiled DS Header JS for the embed script. |
| `/footer.min.js`  | Returns the compiled DS Footer JS for the embed script. |

## Embeddable Scripts
Any app can pull in the Header and Footer through an embeddable standalone script tag that should be used in the <body> element of the main HTML file (or any other HTML files in the app). It is suggested that the components be imported as a whole with the following markup:

```HTML
<!-- Header -->
<div id="nypl-header">
<script type="module" src="https://ds-header.nypl.org/header.min.js?containerId=nypl-header" async></script> 

<!-- your app content here --> 
<main>...</main>

<!-- Footer -->
<div id="nypl-footer">
<script type="module" src="https://ds-header.nypl.org/footer.min.js?containerId=nypl-footer" async></script> 
```

For Next.js apps, it is recommended for the script to be added to the `_document.tsx` file for the Header and Footer components to render properly. 

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
