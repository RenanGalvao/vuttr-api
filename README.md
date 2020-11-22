# VuttrAPI
Very Useful Tools to Remember is an API to save your favorites tools made in NodeJS.
![GitHub package.json version](https://img.shields.io/github/package-json/v/RenanGalvao/vuttr-api) ![GitHub](https://img.shields.io/github/license/RenanGalvao/vuttr-api) 

## How To Install
Run:
```sh
git clone git@github.com:RenanGalvao/vuttr-api.git
```
Or download the zipped version [here](https://github.com/RenanGalvao). 

Enter the root directory, then use the package manager of your preference, [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/get-npm), to install vuttr-api:
```sh
cd vuttr-api

npm install --production
yarn --production
```
## Preparing For First Use
Go to keys directory and run:
```sh
cd keys

openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout private.pen -out public.pen
```

Then, modify the configuration file with your Mongo connection data if you want to start the application in production enviroment. It is located in dist/config/main.js. If you want to run on a local server, skip this part and start the application in development enviroment.
```sh
npm run dev
yarn dev
```

## Adding or Removing Information From The Database.
If you want to modify the resources of the API you need to create a credential. Send a POST request to localhost:3000/first-time with these fields (only in development enviroment):
```json
{
  "name": "your name",
  "email": "your email",
  "password": "your password"
}
```
After that, log in and retrieve the jwt token. Send a POST request to localhost:3000/login with these fields:
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
Use this token in all subsequents requests as Bearer token, it expires in 1 hour .If for any reason you have lost your access, send a DELETE request to /drop-database/yes (only in development enviroment). Then restart the application and you will be able to create another credential following the previous steps.

## Simple Usage
If you want to add a resource to the API, Send a POST request to localhost:3000/tools:
```json
{
  "title": "title",
  "link": "link",
  "description:": "description",
  "tags": ["tag1", "tag2"]
}
```
For more information read the file [vuttr-blueprint.apib](https://github.com/RenanGalvao/vuttr-api/blob/master/vuttr-blueprint.apib).

## API Routes
```
POST /first-time -> Creates a user for authentication purposes
POST /login -> Retrieves the JWT token to be able to create and modify resources in the API
POST /drop-database/yes -> Deletes the current database (if you have forgotten your email and/or password)

GET /tools -> Returns all tools that are saved in the database
GET /tools/:id -> Returns the tool indicated by the id in the database
POST /tools -> Saves a new tool in the database
PUT /tools/:id -> Updates the tool indicated by the id in the database
DELETE /tools/:id -> Removes the tool indicated by the id in the database
```

## Testing
Requires dev dependencies.
```sh
npm test
yarn test
```

## License
[MIT](https://choosealicense.com/licenses/mit/)