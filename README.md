# VuttrAPI
Very Useful Tools to Remember is an API to save your favorites tools made with Node.js.

## Pre-requisites
```
OpenSSL >= 1.1.1
MongoDB >= 3.6.8
Node.js  >= 10.23
Migrate-Mongo >= 8.1.4
```

## How To Install
Using your terminal:

```sh
git clone git@github.com:RenanGalvao/vuttr-api.git
```
Or download the zipped version [master](https://github.com/RenanGalvao/vuttr-api/archive/master.zip). 

Enter the root directory, then use the package manager of your preference, [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/get-npm), to install vuttr-api:

```sh
npm install
yarn
```

Make sure to have [migrate-mongo](https://www.npmjs.com/package/migrate-mongo) installed globally in your machine:
```sh
npm install -g migrate-mongo
``` 
## Preparing For First Use
Go to keys' directory and run:
```sh
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout access_private.pen -out access_public.pen && openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout refresh_private.pen -out refresh_public.pen
```
Then, inside `migration` directory run:
```sh
migrate-mongo up
```

### Optional
If you want to run the app in production enviroment, create a copy of `.env.sample` and rename it to `.env`. Modify the file with your Mongo connection data. It is located in the root dir. You may upload the database with migrate-mongo `NODE_ENV=production migrate-mongo up`.

## Adding or Removing Tools
First, run the app:
```sh
npm run dev
yarn dev
```

After that, log in to retrieve the access token. Send a `POST` request to `localhost:3000/login`:
```json
{
  "email": "admin@dev.com",
  "password": "admin"
}
```

Your response will be a confirmation with cookies. The access token expires in 15 minutes, the update token will regenerate both tokens after the access token expires up to 30 minutes after login.


You can now add a tool via the API. Send a `POST` request to `localhost:3000/tools`:
```json
{
  "title": "title",
  "link": "link",
  "description": "description",
  "tags": ["tag1", "tag2"]
}
```

## API Routes
```
[POST] /login -> Retrieves the JWT token

[GET] /tools -> Returns all tools saved
[GET] /tools/:id -> Returns a tool
[POST] /tools -> Creates a new tool
[PUT] /tools/:id -> Updates a tool
[DELETE] /tools/:id -> Removes a tool

[GET] /users -> Returns all users
[GET] /user/:id -> Returns an user
[POST] /user -> Creates a new user
[PUT] /user/:id -> Updates an user
[DELETE] /user/:id -> Removes an user
```

For more information on the routes, read [vuttr-blueprint.apib](https://github.com/RenanGalvao/vuttr-api/blob/master/vuttr-blueprint.apib).


## Development
### Debug
Several files have the option of debugging via terminal. To use it, just pass the debug environment variable with the name that has been configured. Examples: `NODE_DEBUG=config yarn dev` or `NODE_DEBUG=tools,tools-view,helpers yarn dev`.
``` 
debugname -> debugfile
config -> configs/main
auth -> controllers/authenticationController
tools -> controllers/toolsController
users -> controllers/usersController
errors -> errors/handler
helpers -> lib/helpers
load-jwt -> middlewares/loadJwtMiddleware
tools-view -> views/toolsView
users-view -> views/usersView

```

### Testing
You need the development dependencies to be installed.
```sh
npm test
yarn test
```
## License
[MIT](https://choosealicense.com/licenses/mit/)