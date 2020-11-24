# VuttrAPI
Very Useful Tools to Remember is an API to save your favorites tools made in NodeJS.

## Pre-requisites
OpenSSL >= 1.1.1
MongoDB >= 3.6.8
NodeJS >= 10.23

## How To Install
Using your terminal:
```sh
git clone git@github.com:RenanGalvao/vuttr-api.git
```
Or download the zipped version [here](https://github.com/RenanGalvao). 

Enter the root directory, then use the package manager of your preference, [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/get-npm), to install vuttr-api:
```sh
npm install
yarn
```
## Preparing For First Use
Go to keys directory and run:
```sh
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout private.pen -out public.pen
```

Then, modify the configuration file with your Mongo connection data if you want to start the application in production enviroment. It is located in dist/config/main.js. If you want to run on a local server, skip this part and start the application in development enviroment.
```sh
npm run start
yarn start

npm run dev
yarn dev
```

## Adding or Removing Tools
The first step is to create a credential. Send a POST request to localhost:3000/first-time with these fields (only in development enviroment):
```json
{
  "name": "your name",
  "email": "your email",
  "password": "your password"
}
```
After that, log in and retrieve the JWT token. Send a POST request to localhost:3000/login with these fields:
```json
{
  "email": "your email",
  "password": "your password"
}
```

Your response (If your credentials are correct) will be something like this:
```json
{
  "auth": true,
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.e..."
}
```
Use this token in all subsequents requests as Bearer token, it expires in 1 hour. If for any reason you have lost your access, send a DELETE request to /drop-database/yes (only in development enviroment). Then restart the application and you will be able to create another credential following the previous steps.

You can now add a tool via the API. Send a POST request to localhost:3000/tools:
```json
{
  "title": "title",
  "link": "link",
  "description:": "description",
  "tags": ["tag1", "tag2"]
}
```

## API Routes
```
POST /first-time -> Creates a user for authentication purposes
POST /login -> Retrieves the JWT token
POST /drop-database/yes -> Deletes the current database (if you have forgotten your email and/or password)

GET /tools -> Returns all tools saved
GET /tools/:id -> Returns a specific tool
POST /tools -> Saves a new tool
PUT /tools/:id -> Updates a specific tool
DELETE /tools/:id -> Removes a specific tool
```

For more information on the tools route, read [vuttr-blueprint.apib](https://github.com/RenanGalvao/vuttr-api/blob/master/vuttr-blueprint.apib).


## Testing
You need development dependencies to be installed.
```sh
npm test
yarn test
```

## License
[MIT](https://choosealicense.com/licenses/mit/)