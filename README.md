# NYPL Header App
The NYPL Header App can be used for projects across the NYPL organization to import the Header and Footer components.

# Running the app locally
Install all dependencies
```sh
$ npm install
```
Builds the app into `./dist` and preview the app at `localhost:4173`
```sh
$ npm run prod
```

## Running the locally app with Docker
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

# Available Routes
| Endpoint      | Feature|
|:--------------|:--------------------------------|
| `/header`     | Displays the rendered DS Header |
| `/footer`     | Displays the rendered DS Footer |

# Unit Testing
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
