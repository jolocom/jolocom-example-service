# Jolocom Example Service

The **"Jolocom Example Service"** is a reference application created to show how
to develop applications using *['Jolocom SDK'][1]* along with *['Express framework'][2]*
or even be the starting point for your concrete solution.

:information_source: *This application uses "API First" approach
by defining contract with help of "OpenAPI Specification 3.0" located in ['openapi.yaml'][5].*

## Requirements

  * "node": ">=10"

## Usage

To build your application on top of **"Jolocom Example Service"** you need just follow 5 simple steps:
1. Fork it (rename if required).
2. Clone forked repository.
3. [Install](#installation) dependencies.
4. [Configure](#configuration) application.
5. [Run](#running-the-application) it.

#### **Installation**
Npm:
```bash
npm install
```

Yarn:
```bash
yarn
```

#### **Configuration**
First of all you need to create `.env` file with required environment variables
(`.env.dist` is an example of `.env`).

For simplification of creation default `.env` file, was added command under the *"scripts"* definition:

Npm:
```bash
npm run dotenv-init
```

Yarn:
```bash
yarn run dotenv-init
```

:warning: *The main application configuration definition located in ['./src/config/config.ts'][4]*

#### **Running the application**

Npm:
```bash
npm run start
```

Yarn:
```bash
yarn run start
```

Or run in debug mode (after run in debug mode you can attach debugger):

Npm:
```bash
npm run debug
```

Yarn:
```bash
yarn run debug
```

:tada: At this point you have configured and working application with set of predefined endpoints
which are covering most of available interactions supported by the *['Jolocom SDK'][1]*.

To see list of all available endpoints you can use *['Swagger UI'][6]* (sandbox)
which can be reached on http://localhost:9000/docs (with default server configuration).

## License

[Apache-2.0][3]

[1]: https://github.com/jolocom/jolocom-sdk
[2]: https://expressjs.com/
[3]: https://www.apache.org/licenses/LICENSE-2.0.txt
[4]: src/config/config.ts
[5]: src/api/openapi.yaml
[6]: https://swagger.io/tools/swagger-ui/
