# VuttrAPI
Very Useful Tools to Remember is an API to save your favorites tools made in NodeJS.

## Pre-requisites
```
OpenSSL >= 1.1.1
MongoDB >= 3.6.8
NodeJS >= 10.23
migrate-mongo >= 8.1.4
```

## How To Install
Using your terminal:
```
git clone git@github.com:RenanGalvao/vuttr-api.git
```
Or download the zipped version [here](https://github.com/RenanGalvao). 

Enter the root directory, then use the package manager of your preference, [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/get-npm), to install vuttr-api:
```
npm install
yarn
```

Make sure to have [migrate-mongo](https://www.npmjs.com/package/migrate-mongo) installed globally in your machine:
```
npm install -g migrate-mongo
``` 
## Preparing For First Use
Go to keys directory and run:
```sh
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout private.pen -out public.pen
```
Then, inside `migration` directory run:
```
NODE_ENV=development migrate-mongo up
```

### Optional
If you want to run the app in production enviroment, create a copy of `.env.sample` and rename it to `.env`. Modify the file with your Mongo connection data. It is located in the root dir.

## Adding or Removing Tools
First, run the app:
```
npm run dev
yarn dev
```

After that, log in and retrieve the JWT token. Send a `POST` request to `localhost:3000/login` with these fields:
```json
{
  "email": "admin@dev.com",
  "password": "admin"
}
```

Your response (If your credentials are correct) will be something like this:
```json
{
  "auth": true,
  "acess_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.e...",
  "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.e..."
}
```
Use the `acess_token` in all subsequents requests as Bearer token, it expires in 1 hour. 

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
[GET] /tools/:id -> Returns a specific tool
[POST] /tools -> Saves a new tool
[PUT] /tools/:id -> Updates a specific tool
[DELETE] /tools/:id -> Removes a specific tool
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